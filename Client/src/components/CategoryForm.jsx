import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../utils/apiConfig";

const API_URL = `${API_BASE_URL}/api/category`;
const emptyForm = { name: "", description: "", status: "active", images: [] };

export default function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    const loadCategory = async () => {
      try {
        const response = await axios.get(`${API_URL}/show`);
        const categories = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

        const category = categories.find((item) => item._id === id);
        if (!category) {
          setMessage("Category not found.");
          return;
        }
        setForm({
          name: category.name || "",
          description: category.description || "",
          status: category.status || "active",
          images: [],
        });
        setExistingImages(category.images || []);
      } catch {
        setMessage("Category load nahi ho paayi. Server check karein.");
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [id]);

  const handleChange = (event) => {
    const { name, type, value, files } = event.target;

    if (type === "file") {
      setForm({ ...form, images: Array.from(files || []) });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim()) {
      setMessage("Category name is required.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description || "");
      formData.append("status", form.status || "active");

      if (form.images && form.images.length > 0) {
        form.images.forEach((file) => formData.append("images", file));
      }

      if (id) {
        await axios.put(`${API_URL}/update/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${API_URL}/register`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/admin/categories");
    } catch (error) {
      const apiMessage = error.response?.data?.message || error.response?.data?.error || error.message || "Category save nahi ho paayi.";
      setMessage(apiMessage);
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="admin-header-row">
        <div>
          <Link
            to="/admin/categories"
            style={{ color: "#38bdf8", textDecoration: "none", fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}
          >
            ← Back to Categories
          </Link>
          <h1 className="admin-page-title">
            {id ? "Edit" : "Add New"} <em>Category</em>
          </h1>
          <p className="admin-page-subtitle">
            {id ? "Update category information and status." : "Create a new department for categorizing products."}
          </p>
        </div>
      </div>

      <div className="admin-table-container" style={{ maxWidth: "700px" }}>
        <form onSubmit={handleSubmit}>
          {loading ? (
            <p style={{ color: "var(--admin-text-muted)" }}>Loading category...</p>
          ) : (
            <>
              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--admin-text-primary)", marginBottom: "6px" }}>
                  Category Name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Microcontrollers"
                  required
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    background: "var(--admin-bg-base)",
                    border: "1px solid var(--admin-border)",
                    borderRadius: "8px",
                    padding: "11px 14px",
                    color: "var(--admin-text-primary)",
                    fontSize: "14px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--admin-text-primary)", marginBottom: "6px" }}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Provide brief details about this category..."
                  rows="4"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    background: "var(--admin-bg-base)",
                    border: "1px solid var(--admin-border)",
                    borderRadius: "8px",
                    padding: "11px 14px",
                    color: "var(--admin-text-primary)",
                    fontSize: "14px",
                    resize: "vertical",
                  }}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--admin-text-primary)", marginBottom: "6px" }}>
                  Upload Category Image
                </label>
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    background: "var(--admin-bg-base)",
                    border: "1px solid var(--admin-border)",
                    borderRadius: "8px",
                    padding: "11px 14px",
                    color: "var(--admin-text-primary)",
                    fontSize: "14px",
                  }}
                />
                {form.images && form.images.length > 0 && (
                  <p style={{ marginTop: "8px", color: "var(--admin-text-muted)", fontSize: "12px" }}>
                    Selected file(s): {form.images.map((file) => file.name).join(", ")}
                  </p>
                )}
                {existingImages.length > 0 && form.images.length === 0 && (
                  <div style={{ display: "flex", gap: "12px", marginTop: "12px", flexWrap: "wrap" }}>
                    {existingImages.map((image, index) => (
                      <img
                        key={`${image}-${index}`}
                        src={image.startsWith("http") ? image : `${API_BASE_URL}/uploads/categories/${image}`}
                        alt="Current category"
                        style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "10px", border: "1px solid rgba(148,163,184,0.25)" }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--admin-text-primary)", marginBottom: "6px" }}>
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    background: "var(--admin-bg-base)",
                    border: "1px solid var(--admin-border)",
                    borderRadius: "8px",
                    padding: "11px 14px",
                    color: "var(--admin-text-primary)",
                    fontSize: "14px",
                  }}
                >
                  <option value="active">Active (Visible in Store)</option>
                  <option value="inactive">Inactive (Hidden)</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  type="submit"
                  disabled={saving || loading}
                  className="admin-btn-action-primary"
                  style={{ padding: "11px 24px" }}
                >
                  {saving ? "Saving..." : id ? "Update Category" : "+ Save Category"}
                </button>
                <Link
                  to="/admin/categories"
                  className="admin-btn-action-outline"
                  style={{ padding: "11px 20px" }}
                >
                  Cancel
                </Link>
              </div>

              {message && (
                <p style={{ color: "#f87171", marginTop: "16px", fontSize: "13px" }}>{message}</p>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
}
