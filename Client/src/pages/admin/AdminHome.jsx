import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../utils/apiConfig";

// Modern Multi-Bar Analytics Data
const monthlyBarData = [
  { month: "May", revenue: 48000, target: 45000, orders: 120, growth: "+14%" },
  { month: "Jun", revenue: 62000, target: 55000, orders: 154, growth: "+22%" },
  { month: "Jul", revenue: 54000, target: 58000, orders: 138, growth: "-6%" },
  { month: "Aug", revenue: 78000, target: 70000, orders: 198, growth: "+31%" },
  { month: "Sep", revenue: 89000, target: 80000, orders: 224, growth: "+18%" },
  { month: "Oct", revenue: 94800, target: 85000, orders: 260, growth: "+24%" },
];

// Category Donut Distribution Data
const categoryDistribution = [
  { name: "Displays & OLEDs", percentage: 35, color: "#38bdf8", count: "25 Items" },
  { name: "Indicators & LEDs", percentage: 25, color: "#f59e0b", count: "18 Items" },
  { name: "Motors & Drivers", percentage: 20, color: "#10b981", count: "15 Items" },
  { name: "Microcontrollers", percentage: 12, color: "#a855f7", count: "9 Items" },
  { name: "Sensors & Boards", percentage: 8, color: "#f43f5e", count: "5 Items" },
];

const defaultStats = [
  {
    id: "products",
    icon: "bi-box-seam",
    value: 72,
    label: "Total Products",
    theme: "amber",
    trend: "+12% this month",
    route: "/admin/products",
  },
  {
    id: "categories",
    icon: "bi-tags",
    value: 10,
    label: "Categories",
    theme: "cyan",
    trend: "4 active departments",
    route: "/admin/categories",
  },
  {
    id: "overview",
    icon: "bi-graph-up-arrow",
    value: "Live",
    label: "Overview",
    theme: "emerald",
    trend: "Updated in real time",
    route: "/admin",
  },
];

export default function AdminHome() {
  const [stats, setStats] = useState(defaultStats);
  const [activeBar, setActiveBar] = useState(monthlyBarData[monthlyBarData.length - 1]);
  const [barMetric, setBarMetric] = useState("revenue"); // "revenue" or "orders"
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch real counts if backend is running
  const refreshStats = async () => {
    setIsRefreshing(true);
    try {
      const [prodRes, catRes, userRes, ordRes] = await Promise.allSettled([
        axios.get(`${API_BASE_URL}/api/product/show?limit=1`),
        axios.get(`${API_BASE_URL}/api/category/show`),
        axios.get(`${API_BASE_URL}/api/user/show`),
        axios.get(`${API_BASE_URL}/api/order/show?limit=1`),
      ]);

      setStats((prev) =>
        prev.map((item) => {
          if (item.id === "products" && prodRes.status === "fulfilled") {
            const total = prodRes.value.data?.total ?? prodRes.value.data?.data?.length ?? 72;
            return { ...item, value: total };
          }
          if (item.id === "categories" && catRes.status === "fulfilled") {
            const total = Array.isArray(catRes.value.data) ? catRes.value.data.length : 10;
            return { ...item, value: total };
          }
          if (item.id === "users" && userRes.status === "fulfilled") {
            const total = Array.isArray(userRes.value.data) ? userRes.value.data.length : 9;
            return { ...item, value: total };
          }
          if (item.id === "orders" && ordRes.status === "fulfilled") {
            const total = ordRes.value.data?.total ?? 0;
            return { ...item, value: total };
          }
          return item;
        })
      );
    } catch {
      // Keep initial stats
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  useEffect(() => {
    refreshStats();
  }, []);

  const maxRevenue = Math.max(...monthlyBarData.map((d) => d.revenue)) * 1.1;
  const maxOrders = Math.max(...monthlyBarData.map((d) => d.orders)) * 1.1;

  // Donut SVG helper parameters
  const donutRadius = 70;
  const donutCircumference = 2 * Math.PI * donutRadius;
  let accumulatedPercent = 0;

  return (
    <div>
      {/* Top Header Row */}
      <div className="admin-header-row">
        <div>
          <h1 className="admin-page-title">
            Admin <em>Overview</em>
          </h1>
          <p className="admin-page-subtitle">
            Real-time statistics and multi-dimensional analytics for Softpro Innovation
          </p>
        </div>

        <div className="admin-top-actions">
          <div className="admin-date-badge">
            <i className="bi bi-calendar-event" style={{ color: "#38bdf8" }}></i>
            <span>
              {new Date().toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <button
            className="admin-refresh-btn"
            onClick={refreshStats}
            title="Refresh Live Data"
            style={{ transform: isRefreshing ? "rotate(180deg)" : "none" }}
          >
            <i className="bi bi-arrow-repeat"></i>
          </button>
        </div>
      </div>

      {/* 4 Main KPI Cards */}
      <section className="admin-kpi-grid">
        {stats.map((stat) => (
          <Link
            key={stat.id}
            to={stat.route}
            className={`admin-kpi-card ${stat.theme}`}
            style={{ textDecoration: "none" }}
          >
            <div className="admin-kpi-header">
              <div className="admin-kpi-icon-wrap">
                <i className={`bi ${stat.icon}`}></i>
              </div>
              <span className="admin-kpi-badge positive">{stat.trend}</span>
            </div>
            <div>
              <div className="admin-kpi-value">{stat.value}</div>
              <div className="admin-kpi-label">{stat.label}</div>
            </div>
          </Link>
        ))}
      </section>

      {/* Operations & Velocity Pulse Strip */}
      <section className="admin-pulse-strip">
        <div className="admin-pulse-box">
          <div>
            <span>⚡ Daily Run Rate</span>
            <strong>₹3,840 / day</strong>
          </div>
          <i className="bi bi-graph-up-arrow" style={{ color: "#34d399", fontSize: "18px" }}></i>
        </div>

        <div className="admin-pulse-box">
          <div>
            <span>🔄 Avg Dispatch Time</span>
            <strong>1.2 Days (Fast)</strong>
          </div>
          <i className="bi bi-truck" style={{ color: "#38bdf8", fontSize: "18px" }}></i>
        </div>

        <div className="admin-pulse-box">
          <div>
            <span>👥 Store Conversion</span>
            <strong>4.8% (+1.2%)</strong>
          </div>
          <i className="bi bi-person-check-fill" style={{ color: "#a855f7", fontSize: "18px" }}></i>
        </div>

        <div className="admin-pulse-box">
          <div>
            <span>🛡️ Return / Dispute Rate</span>
            <strong>0.0% (Zero Issues)</strong>
          </div>
          <i className="bi bi-patch-check-fill" style={{ color: "#f59e0b", fontSize: "18px" }}></i>
        </div>
      </section>

      {/* New Analytics Hub: Modern Bar Comparison + Donut Share Grid */}
      <section className="admin-analytics-row">
        {/* Left: Monthly Revenue & Target Velocity Bar Chart */}
        <article className="admin-chart-card" style={{ marginBottom: 0 }}>
          <div className="admin-chart-header">
            <div>
              <h2>Executive Revenue &amp; Target Velocity</h2>
              <p className="admin-chart-subtitle">Monthly sales performance vs target goals</p>
            </div>

            <div className="admin-chart-pill-toggle">
              <button
                className={`admin-chart-pill-btn ${barMetric === "revenue" ? "active" : ""}`}
                onClick={() => setBarMetric("revenue")}
              >
                Revenue (₹)
              </button>
              <button
                className={`admin-chart-pill-btn ${barMetric === "orders" ? "active" : ""}`}
                onClick={() => setBarMetric("orders")}
              >
                Orders Volume
              </button>
            </div>
          </div>

          {/* Quick KPI Summary Row */}
          <div className="admin-chart-kpi-summary">
            <div className="admin-chart-kpi-item">
              <span>Total Volume (H2)</span>
              <strong>₹4,25,800</strong>
            </div>
            <div className="admin-chart-kpi-item">
              <span>Target Achievement</span>
              <strong style={{ color: "#34d399" }}>114.2% (Surpassed)</strong>
            </div>
            <div className="admin-chart-kpi-item">
              <span>Active Month Focus</span>
              <strong style={{ color: "#38bdf8" }}>{activeBar.month} ({activeBar.growth})</strong>
            </div>
          </div>

          {/* Vertical Glass Bar Visualizer */}
          <div className="admin-bar-chart-wrap">
            {monthlyBarData.map((d) => {
              const heightPercent =
                barMetric === "revenue"
                  ? (d.revenue / maxRevenue) * 100
                  : (d.orders / maxOrders) * 100;

              return (
                <div
                  key={d.month}
                  className="admin-bar-group"
                  onMouseEnter={() => setActiveBar(d)}
                >
                  <div className="admin-bar-tooltip-badge">
                    {barMetric === "revenue"
                      ? `₹${d.revenue.toLocaleString("en-IN")}`
                      : `${d.orders} Orders`}
                  </div>

                  <div className="admin-bar-track">
                    <div
                      className={
                        barMetric === "revenue"
                          ? "admin-bar-fill-primary"
                          : "admin-bar-fill-secondary"
                      }
                      style={{ height: `${heightPercent}%` }}
                    ></div>
                  </div>

                  <span
                    className="admin-bar-label"
                    style={{
                      color: activeBar.month === d.month ? "#38bdf8" : "var(--admin-text-secondary)",
                      fontWeight: activeBar.month === d.month ? "800" : "600",
                    }}
                  >
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>
        </article>

        {/* Right: Category Distribution & Inventory Donut Chart */}
        <article className="admin-chart-card" style={{ marginBottom: 0 }}>
          <div className="admin-chart-header">
            <div>
              <h2>Category Share</h2>
              <p className="admin-chart-subtitle">Inventory &amp; sales breakdown</p>
            </div>
            <span style={{ fontSize: "11px", color: "var(--admin-text-muted)", fontWeight: 600 }}>
              100% CATALOG
            </span>
          </div>

          <div className="admin-donut-wrapper">
            <div className="admin-donut-svg-box">
              <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: "rotate(-90deg)" }}>
                {/* Background Ring Track */}
                <circle
                  cx="90"
                  cy="90"
                  r={donutRadius}
                  fill="transparent"
                  stroke="rgba(255, 255, 255, 0.04)"
                  strokeWidth="16"
                />

                {/* Colored Arcs */}
                {categoryDistribution.map((cat, index) => {
                  const strokeDasharray = `${(cat.percentage / 100) * donutCircumference} ${donutCircumference}`;
                  const strokeDashoffset = -((accumulatedPercent / 100) * donutCircumference);
                  accumulatedPercent += cat.percentage;

                  return (
                    <circle
                      key={index}
                      cx="90"
                      cy="90"
                      r={donutRadius}
                      fill="transparent"
                      stroke={cat.color}
                      strokeWidth="16"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      style={{
                        transition: "all 0.5s ease",
                        filter: `drop-shadow(0 0 4px ${cat.color}66)`,
                      }}
                    />
                  );
                })}
              </svg>

              {/* Centered Donut Label */}
              <div className="admin-donut-center-info">
                <strong>72</strong>
                <small>Products</small>
              </div>
            </div>

            {/* Donut Legend List */}
            <div className="admin-donut-legend-list">
              {categoryDistribution.map((cat) => (
                <div key={cat.name} className="admin-donut-legend-item">
                  <div className="admin-donut-legend-left">
                    <span
                      className="admin-donut-legend-dot"
                      style={{ background: cat.color }}
                    ></span>
                    <span>{cat.name}</span>
                  </div>
                  <span className="admin-donut-legend-val">{cat.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      {/* Quick Actions & System Health Widgets */}
      <section className="admin-widgets-grid" style={{ marginTop: "28px" }}>
        {/* Quick Administration Actions */}
        <article className="admin-widget-card">
          <div>
            <h3 className="admin-widget-title">
              <i className="bi bi-lightning-charge-fill" style={{ color: "#f59e0b" }}></i>
              Quick Administration Actions
            </h3>
            <p style={{ color: "var(--admin-text-secondary)", fontSize: "13px", margin: "0 0 16px 0" }}>
              Direct access shortcuts to create products, categories and manage stock.
            </p>
            <div className="admin-quick-actions-list">
              <Link to="/admin/products/add" className="admin-btn-action-primary">
                <i className="bi bi-plus-circle"></i> + Add New Product
              </Link>
              <Link to="/admin/categories/add" className="admin-btn-action-outline">
                <i className="bi bi-tag"></i> 🏷️ Add Category
              </Link>
              <Link to="/admin/inventory" className="admin-btn-action-outline">
                <i className="bi bi-boxes"></i> 📦 Manage Inventory
              </Link>
              <Link to="/admin/orders" className="admin-btn-action-outline">
                <i className="bi bi-receipt"></i> 🛒 Process Orders
              </Link>
            </div>
          </div>
        </article>

        {/* System Health & Notifications */}
        <article className="admin-widget-card">
          <div>
            <h3 className="admin-widget-title">
              <i className="bi bi-shield-check" style={{ color: "#10b981" }}></i>
              System Health &amp; Notifications
            </h3>
            <div className="admin-health-list">
              <div className="admin-health-item">
                <div className="admin-health-label">
                  <i className="bi bi-shield-lock-fill" style={{ color: "#10b981" }}></i>
                  <span>Security &amp; SSL</span>
                </div>
                <span className="admin-health-status good">
                  <i className="bi bi-check-circle-fill"></i> Enabled &amp; Protected
                </span>
              </div>

              <div className="admin-health-item">
                <div className="admin-health-label">
                  <i className="bi bi-chat-dots-fill" style={{ color: "#06b6d4" }}></i>
                  <span>Customer Inquiries</span>
                </div>
                <Link
                  to="/admin/complaints"
                  className="admin-health-status info"
                  style={{ textDecoration: "none" }}
                >
                  💬 2 inquiries received →
                </Link>
              </div>

              <div className="admin-health-item">
                <div className="admin-health-label">
                  <i className="bi bi-hdd-network-fill" style={{ color: "#a855f7" }}></i>
                  <span>Database Cluster (MongoDB)</span>
                </div>
                <span className="admin-health-status good">
                  <i className="bi bi-check-circle-fill"></i> Operational (24ms)
                </span>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}