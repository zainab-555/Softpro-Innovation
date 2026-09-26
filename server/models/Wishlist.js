const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  guest_id: { type: String, trim: true, index: true },
}, { timestamps: true });

wishlistSchema.index({ product_id: 1, guest_id: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("Wishlist", wishlistSchema);
