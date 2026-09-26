import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/media";

const PRODUCT_API = "http://localhost:5000/api/product";

const defaultProducts = [
  { _id: "prod_1", name: "7-Segment Displays", category_id: { name: "Displays" }, price: 2300, stock_quantity: 120, stock_status: "in_stock", status: "active" },
  { _id: "prod_2", name: "TFT 2.4 Display", category_id: { name: "Displays" }, price: 476, stock_quantity: 45, stock_status: "in_stock", status: "active" },
  { _id: "prod_3", name: "0.96 OLED LCD", category_id: { name: "Indicators" }, price: 6300, stock_quantity: 8, stock_status: "low_stock", status: "active" },
  { _id: "prod_4", name: "20x4 LCD", category_id: { name: "Indicators" }, price: 540, stock_quantity: 78, stock_status: "in_stock", status: "active" },
  { _id: "prod_5", name: "16x2 LCD", category_id: { name: "Indicators" }, price: 4030, stock_quantity: 0, stock_status: "out_of_stock", status: "active" },
  { _id: "prod_6", name: "WS2812 RGB LED", category_id: { name: "Indicators" }, price: 4077, stock_quantity: 65, stock_status: "in_stock", status: "active" },
  { _id: "prod_7", name: "DRV8825 Stepper Motor Driver", category_id: { name: "Motors" }, price: 3105, stock_quantity: 5, stock_status: "low_stock", status: "active" },
  { _id: "prod_8", name: "L298N Motor Driver", category_id: { name: "Motors" }, price: 3060, stock_quantity: 92, stock_status: "in_stock", status: "active" },
];

export default function Product() {
  const [products, setProducts] = useState(defaultProducts);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${PRODUCT_API}/show?limit=100`);
      if (res.data?.data && res.data.data.length > 0) {
        setProducts(res.data.data);
      }
    } catch {
      // Fallback gracefully
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${PRODUCT_API}/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      setProducts((prev) => prev.filter((p) => p._id !== id));
    }
  };

  const filtered = products.filter((p) => {
    const catName = p.category_id?.name || p.category || "General";
    const matchesCat = selectedCategory === "All" || catName === selectedCategory;
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });
  const categories = [...new Set(products.map((p) => p.category_id?.name || p.category || "General"))].sort();
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visibleProducts = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  return (
    <div className="admin-products-page">
      <div className="admin-header-row admin-products-header">
        <div className="admin-products-heading">
          <h1 className="admin-page-title">Products <em>Management</em></h1>
          <p className="admin-page-subtitle">Add, edit, manage prices and stock for your hardware catalog.</p>
        </div>
        <div className="admin-top-actions admin-products-actions">
          <div className="admin-search-box admin-products-search">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="admin-products-category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter products by category"
          >
            <option value="All">All categories</option>
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
          <Link to="/admin/products/add" className="admin-btn-action-primary" style={{ textDecoration: "none" }}>
            <i className="bi bi-plus-lg"></i> + Add New Product
          </Link>
        </div>
      </div>

      <div className="admin-table-container admin-products-container">
        <div className="admin-table-header admin-products-table-header">
          <h2 style={{ fontSize: "16px", margin: 0, color: "var(--admin-text-primary)" }}>
            Product Catalog ({filtered.length})
          </h2>
          <span style={{ fontSize: "12px", color: "var(--admin-text-muted)" }}>Total {products.length} in system</span>
        </div>

        {loading ? (
          <p style={{ color: "var(--admin-text-muted)", padding: "20px 0" }}>Loading products...</p>
        ) : (
          <table className="admin-table admin-products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock Qty</th>
                <th>Stock Status</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleProducts.map((prod) => {
                const cat = prod.category_id?.name || prod.category || "General";
                return (
                  <tr key={prod._id}>
                    <td data-label="Product" className="admin-product-name-cell">
                      <div className="admin-product-identity">
                        {prod.images?.[0] && (
                          <img src={getImageUrl(prod.images[0])} alt="" className="admin-product-image" />
                        )}
                        <span className="admin-product-name" title={prod.name}>{prod.name}</span>
                      </div>
                    </td>
                    <td data-label="Category">
                      <span className="admin-product-category">
                        {cat}
                      </span>
                    </td>
                    <td data-label="Price" className="admin-product-price">₹{Number(prod.price || 0).toLocaleString("en-IN")}</td>
                    <td data-label="Stock Qty">{prod.stock_quantity ?? prod.stock ?? 0} units</td>
                    <td data-label="Stock Status">
                      <span className={`admin-status-pill ${prod.stock_status || "in_stock"}`}>
                        {(prod.stock_status || "in_stock").replace("_", " ")}
                      </span>
                    </td>
                    <td data-label="Status">
                      <span className={`admin-status-pill ${prod.status || "active"}`}>
                        {prod.status || "active"}
                      </span>
                    </td>
                    <td data-label="Actions">
                      <div className="admin-product-actions">
                        <Link
                          to={`/admin/products/edit/${prod._id}`}
                          className="admin-product-edit"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(prod._id)}
                          className="admin-product-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {!loading && (
          <div className="admin-products-pagination">
            <span>Showing {filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} products</span>
            <div className="admin-pagination-controls">
              <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)} aria-label="Previous page">
                <i className="bi bi-chevron-left"></i>
              </button>
              <strong>{currentPage} / {totalPages}</strong>
              <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => page + 1)} aria-label="Next page">
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
