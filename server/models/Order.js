const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: false
    },
    name: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const orderSchema = new mongoose.Schema({
    order_number: {
        type: String,
        required: true,
        unique: true
    },
    customer: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            default: ""
        },
        address: {
            street: { type: String, default: "" },
            city: { type: String, default: "" },
            state: { type: String, default: "" },
            pincode: { type: String, default: "" }
        }
    },
    items: [orderItemSchema],
    total_amount: {
        type: Number,
        required: true
    },
    payment_method: {
        type: String,
        enum: ["COD", "Online", "Card", "UPI"],
        default: "Online"
    },
    payment_status: {
        type: String,
        enum: ["Paid", "Pending", "Failed", "Refunded"],
        default: "Pending"
    },
    order_status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    },
    notes: {
        type: String,
        default: ""
    },
    razorpay_order_id: {
        type: String,
        default: ""
    },
    razorpay_payment_id: {
        type: String,
        default: ""
    },
    razorpay_signature: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);
