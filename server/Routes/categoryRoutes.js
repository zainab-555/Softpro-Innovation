const Category = require('../models/Category');
const express = require('express');
const Router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "..", "uploads", "categories");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "_");
    const uniqueName = `${Date.now()}-${safeName}`;
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

Router.post('/register', upload.array("images", 5), async (req, res) => {
  try {
    const { name, description, status = "active" } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const a = await Category.findOne({ name: name.trim() });
    if (a) {
      return res.status(409).json({ message: "Category already registered" });
    }

    const imageFiles = req.files ? req.files.map((file) => file.filename) : [];

    const data = new Category({
      name: name.trim(),
      description: description || "",
      status: status || "active",
      images: imageFiles
    });

    await data.save();
    return res.status(201).json({ message: "Category registered", data });
  } catch (error) {
    console.error("Category register error:", error);
    return res.status(500).json({ message: error.message || "Category not registered" });
  }
});

Router.get('/show', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const data = await Category.find(filter).sort({ createdAt: -1 });

    res.json({
      "message": "success",
      "data": data
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching categories" });
  }
});

Router.put('/update/:id', upload.array("images", 5), async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.filename);
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json({ message: 'Category updated', category: updatedCategory });
  } catch (error) {
    console.error("Category update error:", error);
    res.status(500).json({ message: "Error updating category", error: error.message });
  }
});

Router.patch('/patch/:id', upload.array("images", 5), async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.filename);
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json({ message: 'Category patched', category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Error patching category", error: error.message });
  }
});

Router.delete('/delete/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error: error.message });
  }
});

module.exports = Router;