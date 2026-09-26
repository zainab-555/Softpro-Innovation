const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Category = require("../models/Category");
const Product = require("../models/ProductModel");

const stagingRoot = path.join(require("os").tmpdir(), "softpro-import");
const sourceRoot = process.argv[2] || fs.readdirSync(stagingRoot, { withFileTypes: true })
  .find((entry) => entry.isDirectory()) && path.join(stagingRoot, fs.readdirSync(stagingRoot, { withFileTypes: true })
    .find((entry) => entry.isDirectory()).name);
const uploadRoot = path.join(__dirname, "..", "uploads");
const productUploadRoot = path.join(uploadRoot, "products");
const categoryUploadRoot = path.join(uploadRoot, "categories");
const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp"]);

if (!sourceRoot) {
  console.error("Usage: npm run import:catalog -- <extracted-catalog-folder>");
  process.exit(1);
}

const cleanName = (value) => value
  .replace(/^\d+\s+/, "")
  .replace(/\s+/g, " ")
  .trim();

const safeFileName = (value) => value
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const copyImage = (sourceFile, targetDirectory, prefix) => {
  const extension = path.extname(sourceFile).toLowerCase();
  const targetName = `${safeFileName(prefix)}${extension}`;
  const targetPath = path.join(targetDirectory, targetName);
  fs.copyFileSync(sourceFile, targetPath);
  return targetName;
};

const getImages = (directory) => fs.readdirSync(directory, { withFileTypes: true })
  .filter((entry) => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
  .map((entry) => path.join(directory, entry.name));

const run = async () => {
  if (!fs.existsSync(sourceRoot)) throw new Error(`Source folder not found: ${sourceRoot}`);
  fs.mkdirSync(productUploadRoot, { recursive: true });
  fs.mkdirSync(categoryUploadRoot, { recursive: true });
  await mongoose.connect("mongodb://localhost:27017/Softproinnovation");

  let categoryCount = 0;
  let productCount = 0;
  const categoryFolders = fs.readdirSync(sourceRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory());

  for (const categoryFolder of categoryFolders) {
    const categoryPath = path.join(sourceRoot, categoryFolder.name);
    const nestedFolders = fs.readdirSync(categoryPath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory());
    const productFolders = nestedFolders.length ? nestedFolders : [categoryFolder];
    const categoryName = cleanName(categoryFolder.name);
    const categoryImages = productFolders.flatMap((folder) => {
      const folderPath = folder === categoryFolder ? categoryPath : path.join(categoryPath, folder.name);
      return getImages(folderPath);
    });
    const categoryImageNames = categoryImages.slice(0, 5).map((file) =>
      copyImage(file, categoryUploadRoot, `category-${categoryName}-${path.basename(file, path.extname(file))}`));
    const category = await Category.findOneAndUpdate(
      { name: categoryName },
      { name: categoryName, description: `Quality ${categoryName.toLowerCase()} for makers and engineers.`, status: "active", images: categoryImageNames },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    categoryCount += 1;

    for (const productFolder of productFolders) {
      const productPath = productFolder === categoryFolder ? categoryPath : path.join(categoryPath, productFolder.name);
      for (const sourceImage of getImages(productPath)) {
        const productName = path.basename(sourceImage, path.extname(sourceImage)).replace(/\s+/g, " ").trim();
        const imageName = copyImage(sourceImage, productUploadRoot, `${categoryName}-${productName}`);
        await Product.findOneAndUpdate(
          { name: productName, category_id: category._id },
          {
            name: productName,
            short_description: `Reliable ${productName} for IoT, robotics and embedded projects.`,
            description: `Explore ${productName} from the ${categoryName} collection.`,
            price: 99,
            original_price: 129,
            stock_quantity: 50,
            stock_status: "in_stock",
            is_cod_available: true,
            is_free_delivery: true,
            images: [imageName],
            thumbnail: imageName,
            category_id: category._id,
            tags: [categoryName, "IoT", "Robotics", "Embedded"],
            is_featured: productCount < 8,
            status: "active"
          },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        productCount += 1;
      }
    }
  }

  console.log(`Imported ${categoryCount} categories and ${productCount} products.`);
  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error("Catalog import failed:", error.message);
  await mongoose.disconnect();
  process.exit(1);
});