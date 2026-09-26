const express = require("express");
const Complaint = require("../models/Complaint");

const router = express.Router();

router.get("/show", async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status && status !== "All") filter.status = status;
    if (search) {
      filter.$or = [
        { ticket_id: { $regex: search, $options: "i" } },
        { "customer.name": { $regex: search, $options: "i" } },
        { "customer.email": { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }
    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching complaints", error: error.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { fullName, email, category, subject, message } = req.body;
    const complaint = await Complaint.create({
      customer: { name: fullName, email },
      category: category || "General",
      subject,
      message,
    });
    res.status(201).json({ success: true, data: complaint });
  } catch (error) {
    res.status(400).json({ success: false, message: "Complaint submit nahi ho paayi", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { status, reply } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { ...(status ? { status } : {}), ...(reply !== undefined ? { reply } : {}) },
      { new: true, runValidators: true }
    );
    if (!complaint) return res.status(404).json({ success: false, message: "Complaint not found" });
    res.json({ success: true, data: complaint });
  } catch (error) {
    res.status(400).json({ success: false, message: "Complaint update nahi ho paaya", error: error.message });
  }
});

module.exports = router;
