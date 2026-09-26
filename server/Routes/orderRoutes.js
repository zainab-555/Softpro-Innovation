const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Get all orders with filtering and pagination
router.get("/show", async (req, res) => {
    try {
        const { status, payment_status, search, limit = 50, page = 1 } = req.query;
        const filter = {};

        if (status && status !== "All") {
            filter.order_status = status;
        }

        if (payment_status && payment_status !== "All") {
            filter.payment_status = payment_status;
        }

        if (search) {
            filter.$or = [
                { order_number: { $regex: search, $options: "i" } },
                { "customer.name": { $regex: search, $options: "i" } },
                { "customer.email": { $regex: search, $options: "i" } }
            ];
        }

        const orders = await Order.find(filter)
            .populate("items.product_id", "name images thumbnail")
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const total = await Order.countDocuments(filter);

        res.json({
            success: true,
            data: orders,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching orders", error: error.message });
    }
});

// Create new order
router.post("/create", async (req, res) => {
    try {
        const count = await Order.countDocuments();
        const order_number = `ORD-${new Date().getFullYear()}-${1001 + count}`;
        const newOrder = await Order.create({
            ...req.body,
            order_number: req.body.order_number || order_number
        });
        res.status(201).json({ success: true, data: newOrder });
    } catch (error) {
        res.status(400).json({ success: false, message: "Error creating order", error: error.message });
    }
});

// Get single order
router.get("/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("items.product_id", "name images thumbnail");
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching order", error: error.message });
    }
});

// Update order status
router.put("/update-status/:id", async (req, res) => {
    try {
        const { order_status, payment_status } = req.body;
        const updateData = {};
        if (order_status) updateData.order_status = order_status;
        if (payment_status) updateData.payment_status = payment_status;

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.json({ success: true, message: "Order updated successfully", data: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating order status", error: error.message });
    }
});

// Delete order
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting order", error: error.message });
    }
});

module.exports = router;
