const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  ticket_id: { type: String, unique: true },
  customer: {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
  },
  category: { type: String, default: "General" },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  status: { type: String, enum: ["open", "in_review", "resolved"], default: "open" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  reply: { type: String, default: "" },
}, { timestamps: true });

complaintSchema.pre("save", async function setTicketId(next) {
  if (!this.ticket_id) {
    const count = await mongoose.model("Complaint").countDocuments();
    this.ticket_id = `INQ-${String(201 + count).padStart(3, "0")}`;
  }
  next();
});

module.exports = mongoose.model("Complaint", complaintSchema);
