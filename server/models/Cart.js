const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    guest_id: {
        type: String,
        trim: true,
        index: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    status: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);