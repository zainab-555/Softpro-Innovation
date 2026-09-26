const express = require("express");
const router = express.Router();
const Product = require("../models/ProductModel.js");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });
// Create product
router.post("/register", upload.array("images", 6), async (req, res) => {
  try {
    const imageFiles = req.files
      ? req.files.map((file) => file.filename)
      : [];

    const product = await Product.create({
      ...req.body,
      images: imageFiles,
    });

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

// Get all products (with pagination + category filter)
router.get("/show", async (req, res) => {
  try {
    const { page = 1, limit = 10, category_id, status } = req.query;
    const filter = {};
    if (category_id) filter.category_id = category_id;
    if (status) filter.status = status
    const products = await Product.find(filter)
      .populate("category_id", "name")
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);
    res.json({
      success: true,
      data: products,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
// Get all products (with pagination + category filter)
router.get("/home/active", async (req, res) => {
  try {
    const { page = 1, limit = 10, category_id, status } = req.query;
    const filter = {};
    if (category_id) filter.category_id = category_id;
    if (status) filter.status = status
    const products = await Product.find(filter)
      .populate("category_id", "name")
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);
    res.json({
      success: true,
      data: products,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
// Get single product by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category_id", "name");
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update product

router.put("/:id", upload.array("images", 6), async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.filename);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

// Update stock from the admin inventory screen.
router.patch("/stock/:id", async (req, res) => {
  try {
    const stock_quantity = Math.max(0, Number(req.body.stock_quantity));
    if (!Number.isFinite(stock_quantity)) {
      return res.status(400).json({ success: false, message: "Valid stock quantity is required" });
    }

    const stock_status = stock_quantity === 0
      ? "out_of_stock"
      : stock_quantity <= 5 ? "low_stock" : "in_stock";
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock_quantity, stock_status },
      { new: true, runValidators: true }
    ).populate("category_id", "name");

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
// Delete product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;