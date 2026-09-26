import axios from "axios";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  });
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      await axios.post("http://localhost:5000/api/complaint/create", form);
      setMessage("Your message has been submitted. We will contact you soon.");
      setForm({ fullName: "", email: "", category: "", subject: "", message: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Message submit nahi ho paaya.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero banner */}
      <div className="contact-hero">
        <p className="contact-breadcrumb">
          <a href="/">Home</a> <span>›</span> Contact Us
        </p>
        <h1 className="contact-title">
          We'd Love to <em>Hear</em> from You
        </h1>
        <p className="contact-subtitle">
          Got a technical question, need help with an order, or just want to
          say hi? We respond to every message within one business day.
        </p>
      </div>

      <div className="container-fluid contact-body">
        <div className="row g-4">
          {/* Left column */}
          <div className="col-12 col-lg-4">
            <div className="contact-card mb-4">
              <h2 className="contact-card-title">
                Contact <em>Info</em>
              </h2>

              <div className="contact-info-item">
                <span className="contact-icon">📍</span>
                <div>
                  <p className="contact-info-label">Address</p>
                  <p className="contact-info-value">
                    Softpro House
                    <br />
                    3/213, Sec-J, Jankipuram, Kursi Road
                    <br />
                    Near Gudamba Police Station
                    <br />
                    Lucknow - 226021,
                    <br />
                    Uttar Pradesh, India
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <span className="contact-icon">📞</span>
                <div>
                  <p className="contact-info-label">Phone</p>
                  <p className="contact-info-value">
                    <a href="tel:+916391276203">+91 63912 76203</a>
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <span className="contact-icon">✉️</span>
                <div>
                  <p className="contact-info-label">Email</p>
                  <p className="contact-info-value">
                    <a href="mailto:info@softproinnovation.com">
                      info@softproinnovation.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <span className="contact-icon">🕐</span>
                <div>
                  <p className="contact-info-label">Business Hours</p>
                  <p className="contact-info-value">
                    Mon – Sat: 9:00 AM – 7:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-card">
              <h2 className="contact-card-title">Quick Help</h2>
              <ul className="quick-help-list">
                <li>
                  <a href="#">
                    <span>📦 Track your order</span>
                    <span className="arrow">→</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>💳 Return & refund policy</span>
                    <span className="arrow">→</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>🛠️ Technical support</span>
                    <span className="arrow">→</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>📦 Bulk / B2B orders</span>
                    <span className="arrow">→</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right column - form */}
          <div className="col-12 col-lg-8">
            <div className="contact-card">
              <h2 className="contact-card-title">
                Send Us a <em>Message</em>
              </h2>
              <p className="contact-card-subtitle">
                Fill in the form and our team will get back to you within 24
                hours.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label-custom">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Arjun Sharma"
                      className="form-input-custom"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label-custom">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="form-input-custom"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label-custom">Category</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="form-input-custom"
                    >
                      <option value="">Select a topic...</option>
                      <option value="order">Order Support</option>
                      <option value="technical">Technical Support</option>
                      <option value="bulk">Bulk / B2B Orders</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label-custom">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Brief summary"
                      className="form-input-custom"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label-custom">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      rows="5"
                      className="form-input-custom"
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn-send" disabled={submitting}>
                      {submitting ? "Submitting..." : "Send Message"}
                    </button>
                    {message && <p>{message}</p>}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}