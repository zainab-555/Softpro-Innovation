import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../utils/apiConfig";

const PRODUCT_API = `${API_BASE_URL}/api/product`;
const CATEGORY_API = `${API_BASE_URL}/api/category`;

const initialForm = {
  name: "",
  short_description: "",
  description: "",
  price: "",
  cost_price: "",
  original_price: "",
  stock_quantity: 0,
  stock_status: "in_stock",
  refund_policy: "",
  is_cod_available: true,
  is_refundable_replacable: true,
  is_free_delivery: false,
  refund_days: 7,
  is_replacable: true,
  images: [],
  thumbnail: "",
  category_id: "",
  tags: "",
  is_featured: false,
  status: "active",
};

const numberFields = ["price", "cost_price", "original_price", "stock_quantity", "refund_days"];
const booleanFields = ["is_cod_available", "is_refundable_replacable", "is_free_delivery", "is_replacable", "is_featured"];

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoryResponse = await axios.get(`${CATEGORY_API}/show`);
        const cats = Array.isArray(categoryResponse.data)
          ? categoryResponse.data
          : categoryResponse.data.data || [];
        setCategories(cats);

        if (!id) return;
        const productResponse = await axios.get(`${PRODUCT_API}/${id}`);
        const product = productResponse.data.data;
        if (product) {
          setForm({
            ...initialForm,
            ...product,
            category_id: product.category_id?._id || product.category_id || "",
            images: [],
            tags: (product.tags || []).join(", "),
          });
        }
      } catch {
        setMessage("Product data load nahi ho paaya.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);


const handleChange = (event) => {
  const { name, type, value, checked, files } = event.target;

  if (type === "file") {
    setForm({
      ...form,
      [name]: files,
    });
  } else {
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }
};

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

Object.keys(form).forEach((key) => {
  if (key === "images") {
    for (const file of form.images) {
      formData.append("images", file);
    }
  } else {
    formData.append(key, form[key]);
  }
});

    setSaving(true);
    setMessage("");
    try {
      if (id) await axios.put(`${PRODUCT_API}/${id}`, formData);
      else await axios.post(`${PRODUCT_API}/register`, formData);
      navigate("/admin/products");
    } catch (error) {
      setMessage(error.response?.data?.message || "Product save nahi ho paaya.");
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="admin-header-row">
        <div>
          <Link
            to="/admin/products"
            style={{ color: "#38bdf8", textDecoration: "none", fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}
          >
            ← Back to Products
          </Link>
          <h1 className="admin-page-title">
            {id ? "Edit" : "Add New"} <em>Product</em>
          </h1>
          <p className="admin-page-subtitle">Configure specifications, stock, pricing, and media.</p>
        </div>
      </div>

      <div className="admin-table-container">
        <form onSubmit={handleSubmit}>
          {loading ? (
            <p style={{ color: "var(--admin-text-muted)" }}>Loading product...</p>
          ) : (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "20px",
                  marginBottom: "24px",
                }}
              >
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--admin-text-primary)", marginBottom: "6px" }}>
                    Product Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. ESP32 Development Board"
                    required
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      background: "var(--admin-bg-base)",
                      border: "1px solid var(--admin-border)",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      color: "var(--admin-text-primary)",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--admin-text-primary)", marginBottom: "6px" }}>
                    Category *
                  </label>
                  <select
                    name="category_id"
                    value={form.category_id}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      background: "var(--admin-bg-base)",
                      border: "1px solid var(--admin-border)",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      color: "var(--admin-text-primary)",
                      fontSize: "14px",
                    }}
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--admin-text-primary)", marginBottom: "6px" }}>
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    min="0"
                    placeholder="e.g. 540"
                    required
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      background: "var(--admin-bg-base)",
                      border: "1px solid var(--admin-border)",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      color: "var(--admin-text-primary)",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--admin-text-primary)", marginBottom: "6px" }}>
                    Original / MRP Price (₹)
                  </label>
                  <input
                    type="number"
                    name="original_price"
                    value={form.original_price}
                    onChange={handleChange}
                    min="0"
                    placeholder="e.g. 650"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      background: "var(--admin-bg-base)",
                      border: "1px solid var(--admin-border)",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      color: "var(--admin-text-primary)",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--admin-text-primary)", marginBottom: "6px" }}>
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock_quantity"
                    value={form.stock_quantity}
                    onChange={handleChange}
                    min="0"
                    placeholder="e.g. 50"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      background: "var(--admin-bg-base)",
                      border: "1px solid var(--admin-border)",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      color: "var(--admin-text-primary)",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--admin-text-primary)", marginBottom: "6px" }}>
                    Stock Status
                  </label>
                  <select
                    name="stock_status"
                    value={form.stock_status}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      background: "var(--admin-bg-base)",
                      border: "1px solid var(--admin-border)",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      color: "var(--admin-text-primary)",
                      fontSize: "14px",
                    }}
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="low_stock">Low Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              {/* Descriptions */}
              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--admin-text-primary)", marginBottom: "6px" }}>
                  Short Summary
                </label>
                <input
                  name="short_description"
                  value={form.short_description}
                  onChange={handleChange}
                  placeholder="Quick highlight of product features"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    background: "var(--admin-bg-base)",
                    border: "1px solid var(--admin-border)",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    color: "var(--admin-text-primary)",
                    fontSize: "14px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--admin-text-primary)", marginBottom: "6px" }}>
                  Full Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Technical specifications, operating voltage, pinouts..."
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    background: "var(--admin-bg-base)",
                    border: "1px solid var(--admin-border)",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    color: "var(--admin-text-primary)",
                    fontSize: "14px",
                    resize: "vertical",
                  }}
                />
              </div>
              {/* photos */}
              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--admin-text-primary)", marginBottom: "6px" }}>
                  Full Description
                </label>

                <input type="file" name="images" multiple id="" onChange={handleChange} />
              </div>

              {/* Checkbox Options */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", margin: "20px 0" }}>
                {booleanFields.map((field) => (
                  <label key={field} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--admin-text-primary)", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      name={field}
                      checked={form[field]}
                      onChange={handleChange}
                      style={{ accentColor: "#0284c7", width: "16px", height: "16px" }}
                    />
                    {field.replaceAll("_", " ")}
                  </label>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                <button
                  type="submit"
                  disabled={saving}
                  className="admin-btn-action-primary"
                  style={{ padding: "11px 24px" }}
                >
                  {saving ? "Saving..." : id ? "Update Product" : "+ Save Product"}
                </button>
                <Link
                  to="/admin/products"
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