
const stats = [
  { icon: "📦", value: 72, label: "Total Products", color: "#FBEADB" },
  { icon: "🏷️", value: 10, label: "Categories", color: "#DDEAF7" },
  { icon: "🛒", value: 0, label: "Total Orders", color: "#DCF3E4" },
  { icon: "👥", value: 9, label: "Total Users", color: "#E9E1F7" },
];

const menuItems = ["Overview", "Categories", "Products", "Orders", "Users List", "Inventory", "Complaints"];

const Admin = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#EEEBE3", color: "#1C1B22" }}>
      <header style={{ background: "#F2EFE7", borderBottom: "1px solid #ddd8cc", padding: "14px 24px" }}>
        <strong style={{ fontSize: "20px" }}>Softpro<span style={{ color: "#D9622B" }}>Innovation</span></strong>
      </header>

      <div style={{ display: "flex" }}>
        <aside style={{ width: "240px", minHeight: "calc(100vh - 59px)", background: "#12111C", padding: "28px 16px", color: "white" }}>
          <div style={{ marginBottom: "28px" }}>
            <div style={{ background: "#D9622B", borderRadius: "50%", width: "48px", height: "48px", display: "grid", placeItems: "center", marginBottom: "10px" }}>AD</div>
            <strong>Administrator</strong>
            <small style={{ display: "block", color: "#aaa7b8", marginTop: "4px" }}>admin@softpro.com</small>
          </div>
          <nav style={{ display: "grid", gap: "8px" }}>
            {menuItems.map((item, index) => (
              <a key={item} href="#" style={{ color: "white", textDecoration: "none", padding: "10px 12px", borderRadius: "6px", background: index === 0 ? "#D9622B" : "transparent" }}>
                {item}
              </a>
            ))}
          </nav>
        </aside>

        <main style={{ flex: 1, padding: "32px" }}>
          <h1 style={{ margin: 0 }}>Admin <em style={{ color: "#D9622B" }}>Overview</em></h1>
          <p style={{ color: "#8A8678" }}>Real-time statistics and summary of Softpro Innovation</p>

          <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "20px", marginTop: "28px" }}>
            {stats.map((stat) => (
              <article key={stat.label} style={{ background: stat.color, border: "1px solid #ddd8cc", borderRadius: "10px", padding: "20px" }}>
                <div style={{ fontSize: "24px" }}>{stat.icon}</div>
                <strong style={{ display: "block", fontSize: "30px", marginTop: "18px" }}>{stat.value}</strong>
                <small style={{ color: "#8A8678" }}>{stat.label}</small>
              </article>
            ))}
          </section>

          <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginTop: "28px" }}>
            <article style={{ background: "white", borderRadius: "10px", padding: "24px" }}>
              <h2>Quick Administration Actions</h2>
              <button style={{ width: "100%", padding: "12px", background: "#D9622B", color: "white", border: 0, borderRadius: "6px", marginBottom: "10px" }}>+ Add New Product</button>
              <button style={{ width: "100%", padding: "12px", background: "white", border: "1px solid #ddd8cc", borderRadius: "6px" }}>🏷️ Add Category</button>
            </article>
            <article style={{ background: "white", borderRadius: "10px", padding: "24px" }}>
              <h2>System Health &amp; Notifications</h2>
              <p style={{ color: "#2E7D4F" }}>🛡️ Security enabled</p>
              <p style={{ color: "#1E6E93" }}>💬 2 customer inquiries received</p>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Admin;





































































































