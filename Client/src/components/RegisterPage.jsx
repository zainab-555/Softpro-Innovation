import { useState } from "react";
import { Link } from "react-router";
import Header from "./Header";
import axios from "axios"  
import { useNavigate } from "react-router";
export default function RegisterPage() {
  const navigate=useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit =async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user/register", form);
      console.log(res.data);
      alert("user is register");
      navigate("/")
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
    <Header />
    <div className="register-page">
      <div className="register-card">
        <p className="register-breadcrumb">
          <Link to="/">Home</Link> <span>›</span> Register
        </p>
        <h1 className="register-title">
          Create Your <em>Account</em>
        </h1>
        <p className="register-subtitle">
          Join us to track orders, save favorites, and checkout faster.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label-custom">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Arjun Sharma"
              className="form-input-custom"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label-custom">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="form-input-custom"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label-custom">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="form-input-custom"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label-custom">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="form-input-custom"
              required
            />
          </div>

          <button type="submit" className="btn-send w-100">
            Register
          </button>
        </form>

        <p className="register-footer-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
    </>
  );
}