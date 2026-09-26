const express = require('express');
const router = express.Router();
const Address = require('../models/Address');

// 1. Add new address (Create)
router.post('/add', async (req, res) => {
    try {
        const newAddress = new Address(req.body);
        const savedAddress = await newAddress.save();
        res.status(201).json(savedAddress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. Get all addresses of a specific user (Read)
router.get('/:user_id', async (req, res) => {
    try {
        const addresses = await Address.find({ user_id: req.params.user_id });
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Update an address (Update)
router.put('/:id', async (req, res) => {
    try {
        const updatedAddress = await Address.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({ message: "Address not found" });
        }

        res.status(200).json(updatedAddress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. Delete an address (Delete)
router.delete('/:id', async (req, res) => {
    try {
        const deletedAddress = await Address.findByIdAndDelete(req.params.id);

        if (!deletedAddress) {
            return res.status(404).json({ message: "Address not found" });
        }

        res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 5. Set an address as default (extra useful route)
router.put('/set-default/:id/:user_id', async (req, res) => {
    try {
        // Sab addresses ka is_default false karo pehle
        await Address.updateMany(
            { user_id: req.params.user_id },
            { $set: { is_default: false } }
        );

        // Fir selected wala true karo
        const updated = await Address.findByIdAndUpdate(
            req.params.id,
            { $set: { is_default: true } },
            { new: true }
        );

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;