import axios from "axios";
import { useEffect, useState } from "react";
import { getImageUrl } from "../../utils/media";

const API_BASE = "http://localhost:5000/api/order";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPayment, setFilterPayment] = useState("All");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_BASE}/show`, {
        params: {
          limit: 50,
          status: filterStatus === "All" ? undefined : filterStatus,
          payment_status: filterPayment === "All" ? undefined : filterPayment,
          search: search.trim() || undefined,
        },
      });
      setOrders(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (requestError) {
      setOrders([]);
      setError(requestError.response?.data?.message || "Orders load nahi ho paaye.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filterStatus, filterPayment, search]);

  const updateOrderStatus = async (orderId, orderStatus) => {
    try {
      await axios.put(`${API_BASE}/update-status/${orderId}`, { order_status: orderStatus });
      setOrders((currentOrders) => currentOrders.map((order) => (
        order._id === orderId ? { ...order, order_status: orderStatus } : order
      )));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Order status update nahi ho paaya.");
    }
  };

  const filteredOrders = orders;

  return (
    <div>
      <div className="admin-header-row">
        <div>
          <h1 className="admin-page-title">Orders <em>Management</em></h1>
          <p className="admin-page-subtitle">Track, update and fulfill all customer orders in real-time.</p>
        </div>
        <div className="admin-top-actions">
          <div className="admin-search-box">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search by order ID or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="admin-refresh-btn" onClick={fetchOrders} title="Refresh orders">
            <i className="bi bi-arrow-repeat"></i>
          </button>
          <select
            className="admin-order-filter"
            value={filterPayment}
            onChange={(event) => setFilterPayment(event.target.value)}
            aria-label="Filter orders by payment status"
          >
            <option value="All">All payments</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`admin-chart-pill-btn ${filterStatus === status ? "active" : ""}`}
            style={{
              background: filterStatus === status ? "var(--admin-primary)" : "var(--admin-bg-card)",
              color: filterStatus === status ? "#fff" : "var(--admin-text-secondary)",
              border: "1px solid var(--admin-border)",
              padding: "7px 16px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h2 style={{ fontSize: "16px", margin: 0, color: "var(--admin-text-primary)" }}>
            Showing {filteredOrders.length} Orders
          </h2>
          <span style={{ fontSize: "12px", color: "var(--admin-text-muted)" }}>Live MongoDB Sync</span>
        </div>

        {loading ? (
          <p style={{ color: "var(--admin-text-muted)", padding: "20px 0" }}>Loading orders...</p>
        ) : error ? (
          <p style={{ color: "#f87171", padding: "20px 0" }}>{error}</p>
        ) : filteredOrders.length === 0 ? (
          <p style={{ color: "var(--admin-text-muted)", padding: "20px 0" }}>No orders found matching this filter.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Customer</th>
                <th>Products</th>
                <th>Date</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((ord) => (
                <tr key={ord._id}>
                  <td style={{ fontWeight: 600, color: "#38bdf8" }}>{ord.order_number}</td>
                  <td>
                    <div style={{ fontWeight: 500, color: "var(--admin-text-primary)" }}>{ord.customer?.name || "Anonymous"}</div>
                    <div style={{ fontSize: "11px", color: "var(--admin-text-muted)" }}>{ord.customer?.email}</div>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                      {(ord.items || []).slice(0, 3).map((item, index) => {
                        const image = item.thumbnail || item.product_id?.thumbnail || item.product_id?.images?.[0];
                        return image ? <img key={`${ord._id}-${index}`} src={getImageUrl(image)} alt={item.name || "Product"} title={item.name} style={{ width: "34px", height: "34px", objectFit: "contain", background: "#fff", borderRadius: "5px" }} /> : null;
                      })}
                      {!ord.items?.length && <span style={{ color: "var(--admin-text-muted)", fontSize: "12px" }}>No items</span>}
                    </div>
                  </td>
                  <td>{new Date(ord.createdAt || Date.now()).toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</td>
                  <td style={{ fontWeight: 700, color: "var(--admin-text-primary)" }}>₹{Number(ord.total_amount || 0).toLocaleString("en-IN")}</td>
                  <td>
                    <span className={`admin-status-pill ${String(ord.payment_status || "Pending").toLowerCase() === "paid" ? "completed" : "pending"}`}>
                      {ord.payment_status || "Pending"}
                    </span>
                  </td>
                  <td>
                    <select
                      className={`admin-order-status-select ${(ord.order_status || "Pending").toLowerCase()}`}
                      value={ord.order_status || "Pending"}
                      onChange={(event) => updateOrderStatus(ord._id, event.target.value)}
                      aria-label={`Update status for ${ord.order_number}`}
                    >
                      {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(ord)}
                      style={{
                        background: "rgba(56, 189, 248, 0.1)",
                        border: "1px solid rgba(56, 189, 248, 0.3)",
                        color: "#38bdf8",
                        padding: "5px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedOrder && (
        <div className="admin-order-detail-panel">
          <div className="admin-order-detail-header">
            <div>
              <span className="admin-detail-eyebrow">Order details</span>
              <h2>{selectedOrder.order_number}</h2>
            </div>
            <button type="button" onClick={() => setSelectedOrder(null)} aria-label="Close order details">
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="admin-order-detail-grid">
            <div><span>Customer</span><strong>{selectedOrder.customer?.name || "Anonymous"}</strong></div>
            <div><span>Email</span><strong>{selectedOrder.customer?.email || "-"}</strong></div>
            <div><span>Phone</span><strong>{selectedOrder.customer?.phone || "-"}</strong></div>
            <div><span>Payment method</span><strong>{selectedOrder.payment_method || "-"}</strong></div>
            <div><span>Total</span><strong>₹{Number(selectedOrder.total_amount || 0).toLocaleString("en-IN")}</strong></div>
            <div><span>Items</span><strong>{selectedOrder.items?.length || 0}</strong></div>
          </div>
        </div>
      )}
    </div>
  );
}
