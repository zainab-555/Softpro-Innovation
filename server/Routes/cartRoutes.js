const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// 1. Add item to cart (Create)
router.post('/add', async (req, res) => {
    try {
        const { product_id, user_id, guest_id, quantity = 1, status = 'active' } = req.body;
        const owner = user_id ? { user_id } : { guest_id };
        if (!product_id || (!user_id && !guest_id)) {
            return res.status(400).json({ message: 'Product and cart owner are required' });
        }

        const existingItem = await Cart.findOne({ product_id, ...owner, status: 'active' });
        const savedItem = existingItem
            ? await Cart.findByIdAndUpdate(existingItem._id, { $inc: { quantity: Number(quantity) }, status }, { new: true })
            : await Cart.create({ product_id, ...owner, quantity: Number(quantity), status });

        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/guest/:guest_id', async (req, res) => {
    try {
        const cartItems = await Cart.find({ guest_id: req.params.guest_id, status: 'active' })
            .populate('product_id');
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. Get all cart items for a specific user (Read)
router.get('/:user_id', async (req, res) => {
    try {
        const cartItems = await Cart.find({ user_id: req.params.user_id, status: 'active' })
            .populate('product_id')
            .populate('user_id');

        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Update quantity or status of a cart item (Update)
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await Cart.findByIdAndUpdate(
            req.params.id,
            { $set: { quantity: Math.max(1, Number(req.body.quantity)), status: req.body.status || 'active' } },
            { new: true }
        ).populate('product_id');

        if (!updatedItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. Remove item from cart (Delete)
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Cart.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 5. Clear all cart items for a user or guest
router.delete('/clear/:owner_id', async (req, res) => {
    try {
        await Cart.deleteMany({
            $or: [{ guest_id: req.params.owner_id }, { user_id: req.params.owner_id }]
        });
        res.status(200).json({ success: true, message: "Cart cleared" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;