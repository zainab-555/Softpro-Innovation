import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import "./admin.css";

const menuItems = [
  { name: "Overview", path: "/admin", icon: "bi-grid-fill", badge: null, disabled: false },
  { name: "Categories", path: "/admin/categories", icon: "bi-tags", badge: "10", disabled: false },
  { name: "Products", path: "/admin/products", icon: "bi-box-seam", badge: "72", disabled: false },
  { name: "Orders", path: "/admin/orders", icon: "bi-cart3", badge: null, disabled: false },
  { name: "Users List", path: "/admin/users", icon: "bi-people", badge: null, disabled: false },
  { name: "Inventory", path: "/admin/inventory", icon: "bi-boxes", badge: null, disabled: false },
  { name: "Complaints", path: "/admin/complaints", icon: "bi-chat-left-dots", badge: null, disabled: false },
];

export default function Admin() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("softpro-admin-theme") || "dark";
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-admin-theme", theme);
    localStorage.setItem("softpro-admin-theme", theme);
  }, [theme]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className="admin-shell" data-admin-theme={theme}>
      {/* Mobile Top Navbar */}
      <div
        className="d-md-none"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          background: "var(--admin-sidebar-bg)",
          borderBottom: "1px solid var(--admin-border)",
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="admin-avatar admin-avatar-image-wrap" style={{ width: "36px", height: "36px", fontSize: "14px" }}>
            <span className="admin-avatar-fallback">AD</span>
            <img src="/admin-profile.jpg" alt="" className="admin-avatar-image" onError={(event) => { event.currentTarget.style.display = "none"; }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: "15px", color: "var(--admin-text-primary)" }}>
            Admin Dashboard
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "transparent",
            border: "1px solid var(--admin-border)",
            color: "var(--admin-text-primary)",
            borderRadius: "6px",
            padding: "6px 10px",
            fontSize: "18px",
          }}
        >
          <i className={`bi ${mobileOpen ? "bi-x-lg" : "bi-list"}`}></i>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`admin-sidebar ${mobileOpen ? "d-flex" : "d-none d-md-flex"}`}
        style={{
          position: mobileOpen ? "fixed" : "sticky",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 999,
        }}
      >
        <div>
          {/* Administrator Profile Card (Matching Image) */}
          <div className="admin-sidebar-profile">
            <div className="admin-avatar admin-avatar-image-wrap">
              <span className="admin-avatar-fallback">AD</span>
              <img src="/admin-profile.jpg" alt="" className="admin-avatar-image" onError={(event) => { event.currentTarget.style.display = "none"; }} />
              <span className="admin-status-dot" title="Online"></span>
            </div>
            <div className="admin-user-info">
              <p className="admin-user-name">
                Administrator
                <span className="admin-badge">ADMIN</span>
              </p>
              <p className="admin-user-email">admin@softpro.com</p>
            </div>
          </div>

          {/* ADMIN CONTROLS Section Title */}
          <div className="admin-nav-section-title">ADMIN CONTROLS</div>

          {/* Menu Items */}
          <nav className="admin-nav-menu">
            {menuItems.map((item) => {
              const isOverview = item.path === "/admin";

              return (
                <NavLink
                  key={item.name}
                  to={item.disabled ? "/admin" : item.path}
                  end={isOverview}
                  onClick={(e) => {
                    if (item.disabled) {
                      e.preventDefault();
                    }
                  }}
                  className={({ isActive: linkIsActive }) => {
                    const activeMatch = item.disabled
                      ? false
                      : isOverview
                        ? linkIsActive || location.pathname === "/admin/overview"
                        : linkIsActive || location.pathname.startsWith(`${item.path}/`);

                    return `admin-nav-item ${activeMatch ? "active" : ""} ${item.disabled ? "disabled" : ""}`;
                  }}
                >
                  <div className="admin-nav-link-content">
                    <span className="admin-nav-icon">
                      <i className={`bi ${item.icon}`}></i>
                    </span>
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="admin-nav-pill-badge">{item.badge}</span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Controls: Theme Switcher & Storefront Link */}
        <div className="admin-sidebar-footer">
          <div className="admin-theme-switch-group">
            <span className="admin-theme-label">Theme</span>
            <div className="admin-theme-options">
              <button
                type="button"
                className={`admin-theme-btn ${theme === "dark" ? "active" : ""}`}
                onClick={() => handleThemeChange("dark")}
                title="Midnight Dark"
              >
                <i className="bi bi-moon-stars-fill"></i> Dark
              </button>
              <button
                type="button"
                className={`admin-theme-btn ${theme === "nebula" ? "active" : ""}`}
                onClick={() => handleThemeChange("nebula")}
                title="Nebula Purple"
              >
                <i className="bi bi-stars"></i> Nebula
              </button>
              <button
                type="button"
                className={`admin-theme-btn ${theme === "light" ? "active" : ""}`}
                onClick={() => handleThemeChange("light")}
                title="Clean Light"
              >
                <i className="bi bi-sun-fill"></i> Light
              </button>
            </div>
          </div>

          <Link to="/" className="admin-storefront-btn">
            <i className="bi bi-box-arrow-left"></i>
            <span>Back to Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
