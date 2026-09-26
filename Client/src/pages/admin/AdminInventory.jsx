import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/media";

const API_BASE = "http://localhost:5000/api/product";

export default function AdminInventory() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInventory = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_BASE}/show`, { params: { limit: 100 } });
      setItems(Array.isArray(response.data?.data) ? response.data.data : []);
    } catch (requestError) {
      setItems([]);
      setError(requestError.response?.data?.message || "Inventory load nahi ho paayi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const filteredItems = items.filter((item) => {
    const category = item.category_id?.name || item.category || "General";
    const status = item.stock_status || "in_stock";
    const matchSearch =
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item._id?.toLowerCase().includes(search.toLowerCase()) ||
      category.toLowerCase().includes(search.toLowerCase());
    return (filter === "all" || status === filter) && matchSearch;
  });

  const updateStock = async (item, delta) => {
    const newStock = Math.max(0, Number(item.stock_quantity || 0) + delta);
    try {
      const response = await axios.patch(`${API_BASE}/stock/${item._id}`, { stock_quantity: newStock });
      setItems((currentItems) => currentItems.map((currentItem) => (
        currentItem._id === item._id ? response.data.data : currentItem
      )));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Stock update nahi ho paaya.");
    }
  };

  const inStock = items.filter((item) => (item.stock_status || "in_stock") === "in_stock").length;
  const lowStock = items.filter((item) => item.stock_status === "low_stock").length;
  const outOfStock = items.filter((item) => item.stock_status === "out_of_stock").length;
  const totalUnits = items.reduce((total, item) => total + Number(item.stock_quantity || 0), 0);

  return (
    <div className="admin-inventory-page">
      <div className="admin-header-row">
        <div>
          <h1 className="admin-page-title">Inventory <em>Management</em></h1>
          <p className="admin-page-subtitle">Monitor stock levels, re-order thresholds, and low-stock alerts.</p>
        </div>
        <div className="admin-top-actions">
          <div className="admin-search-box">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search product or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="admin-refresh-btn" onClick={fetchInventory} title="Refresh inventory">
            <i className="bi bi-arrow-repeat"></i>
          </button>
          <Link to="/admin/products/add" className="admin-btn-action-primary" style={{ textDecoration: "none" }}>
            <i className="bi bi-plus-lg"></i> Add Product
          </Link>
        </div>
      </div>

      {/* Stock Health Badges */}
      <div className="admin-inventory-summary">
        <div className="admin-inventory-stat total">
          <div><span>Total SKUs</span><strong>{items.length}</strong></div>
          <i className="bi bi-box-seam"></i>
        </div>
        <div className="admin-inventory-stat units">
          <div><span>Stock units</span><strong>{totalUnits.toLocaleString("en-IN")}</strong></div>
          <i className="bi bi-layers"></i>
        </div>
        <div className="admin-inventory-stat warning">
          <div><span>Low stock</span><strong>{lowStock}</strong></div>
          <i className="bi bi-exclamation-triangle"></i>
        </div>
        <div className="admin-inventory-stat danger">
          <div><span>Out of stock</span><strong>{outOfStock}</strong></div>
          <i className="bi bi-x-octagon"></i>
        </div>
      </div>

      <div className="admin-table-container admin-inventory-container">
        <div className="admin-table-header admin-inventory-toolbar">
          <div className="admin-inventory-filters">
            {["all", "in_stock", "low_stock", "out_of_stock"].map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`admin-inventory-filter ${filter === st ? "active" : ""}`}
              >
                {st.replace("_", " ")}
              </button>
            ))}
          </div>
          <span style={{ fontSize: "12px", color: "var(--admin-text-muted)" }}>Showing {filteredItems.length} items</span>
        </div>

        {loading ? (
          <p style={{ color: "var(--admin-text-muted)", padding: "20px 0" }}>Loading inventory...</p>
        ) : error ? (
          <p style={{ color: "#f87171", padding: "20px 0" }}>{error}</p>
        ) : filteredItems.length === 0 ? (
          <p style={{ color: "var(--admin-text-muted)", padding: "20px 0" }}>No inventory items found.</p>
        ) : (
        <table className="admin-table admin-inventory-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Unit Price</th>
              <th>Available Qty</th>
              <th>Status</th>
              <th>Quick Adjust</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => {
              const category = item.category_id?.name || item.category || "General";
              const stock = Number(item.stock_quantity || 0);
              const status = item.stock_status || "in_stock";
              return (
              <tr key={item._id}>
                <td data-label="Product" className="admin-inventory-product">
                  <div className="admin-inventory-product-main">
                  {item.images?.[0] && <img src={getImageUrl(item.images[0])} alt="" className="admin-inventory-image" />}
                  <div>
                  <strong>{item.name}</strong>
                  <small>ID: {item._id?.slice(-6)}</small>
                  </div>
                  </div>
                </td>
                <td data-label="Category"><span className="admin-product-category">{category}</span></td>
                <td data-label="Unit Price">₹{Number(item.price || 0).toLocaleString("en-IN")}</td>
                <td data-label="Available Qty" className={`admin-inventory-quantity ${stock <= 5 ? "attention" : ""}`}>
                  {stock} units
                </td>
                <td data-label="Status">
                  <span className={`admin-status-pill ${status}`}>{status.replace("_", " ")}</span>
                </td>
                <td data-label="Quick Adjust">
                  <div className="admin-inventory-actions">
                    <button
                      onClick={() => updateStock(item, -1)}
                      className="admin-stock-minus"
                      disabled={stock === 0}
                    >
                      -
                    </button>
                    <button
                      onClick={() => updateStock(item, +5)}
                      className="admin-stock-restock"
                    >
                      +5 Restock
                    </button>
                  </div>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
        )}
      </div>
    </div>
  );
}
