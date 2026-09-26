import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/category";


export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const getImageUrl = (image) => {
    if (!image) return "";
    if (image.startsWith("http://") || image.startsWith("https://")) return image;
    if (image.startsWith("/uploads/")) return `http://localhost:5000${image}`;
    return `http://localhost:5000/uploads/categories/${image}`;
  };

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/show`);
      console.log(response);

      const categoryList = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      setCategories(categoryList);
    } catch {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      setCategories(categories.filter((category) => category._id !== id));
      setMessage("Category deleted successfully.");
    } catch {
      setCategories(categories.filter((category) => category._id !== id));
      setMessage("Category deleted from local state.");
    }
  };

  const filtered = categories.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.description?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visibleCategories = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="admin-categories-page">
      <div className="admin-header-row">
        <div>
          <h1 className="admin-page-title">Category <em>Management</em></h1>
          <p className="admin-page-subtitle">Organize and structure your hardware catalog hierarchy.</p>
        </div>
        <div className="admin-top-actions">
          <div className="admin-search-box">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link to="/admin/categories/add" className="admin-btn-action-primary" style={{ textDecoration: "none" }}>
            <i className="bi bi-plus-lg"></i> + Add Category
          </Link>
        </div>
      </div>

      <div className="admin-table-container admin-categories-container">
        <div className="admin-table-header">
          <h2 style={{ fontSize: "16px", margin: 0, color: "var(--admin-text-primary)" }}>
            All Categories ({filtered.length})
          </h2>
          <span style={{ fontSize: "12px", color: "var(--admin-text-muted)" }}>Showing {filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}</span>
        </div>

        {loading ? (
          <p style={{ color: "var(--admin-text-muted)", padding: "20px 0" }}>Loading categories...</p>
        ) : (
          <table className="admin-table admin-categories-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleCategories.map((category) => (
                <tr key={category._id}>
                  <td>
                    {category.images && category.images.length > 0 ? (
                      <img
                        src={getImageUrl(category.images[0])}
                        alt={category.name}
                        className="admin-category-image"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="admin-category-image admin-category-placeholder">
                        🏷️
                      </div>
                    )}
                  </td>
                  <td style={{ fontWeight: 600, color: "var(--admin-text-primary)" }}>{category.name}</td>
                  <td className="admin-category-description">{category.description || "—"}</td>
                  <td>
                    <span className={`admin-status-pill ${category.status === "inactive" ? "inactive" : "active"}`}>
                      {category.status || "active"}
                    </span>
                  </td>
                  <td>
                    <div className="admin-category-actions">
                      <Link
                        to={`/admin/categories/edit/${category._id}`}
                        style={{ color: "#38bdf8", textDecoration: "none", fontSize: "12px", fontWeight: 600 }}
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(category._id)}
                        style={{
                          background: "none",
                          border: 0,
                          color: "#f87171",
                          cursor: "pointer",
                          fontSize: "12px",
                          padding: 0,
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && filtered.length > 0 && (
          <div className="admin-categories-pagination">
            <span>Page {currentPage} of {totalPages}</span>
            <div className="admin-pagination-controls">
              <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)} aria-label="Previous category page">
                <i className="bi bi-chevron-left"></i>
              </button>
              <strong>{currentPage} / {totalPages}</strong>
              <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => page + 1)} aria-label="Next category page">
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        )}

        {message && (
          <p style={{ color: "#34d399", marginTop: "16px", fontSize: "13px" }}>{message}</p>
        )}
      </div>
    </div>
  );
}
