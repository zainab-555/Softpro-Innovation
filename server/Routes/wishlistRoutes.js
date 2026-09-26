const express = require("express");
const Wishlist = require("../models/Wishlist");

const router = express.Router();

router.get("/guest/:guest_id", async (req, res) => {
  try {
    const items = await Wishlist.find({ guest_id: req.params.guest_id }).populate("product_id").sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/toggle", async (req, res) => {
  try {
    const { product_id, guest_id } = req.body;
    if (!product_id || !guest_id) return res.status(400).json({ message: "Product and guest id are required" });
    const existing = await Wishlist.findOne({ product_id, guest_id });
    if (existing) {
      await Wishlist.findByIdAndDelete(existing._id);
      return res.json({ active: false, product_id });
    }
    const item = await Wishlist.create({ product_id, guest_id });
    res.status(201).json({ active: true, product_id, data: item });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.json({ message: "Wishlist item removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
