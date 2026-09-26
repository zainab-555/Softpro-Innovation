import axios from "axios";
import { useEffect, useState } from "react";
import { getImageUrl } from "../../utils/media";
import { API_BASE_URL } from "../../utils/apiConfig";

const API_BASE = `${API_BASE_URL}/api/user`;

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_BASE}/show`, {
        params: { search: search.trim() || undefined, status: filterStatus === "All" ? undefined : filterStatus },
      });
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (requestError) {
      setUsers([]);
      setError(requestError.response?.data?.message || "Users load nahi ho paaye.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, filterStatus]);

  const updateUserStatus = async (user) => {
    const nextStatus = user.status === "inactive" ? "active" : "inactive";
    try {
      const res = await axios.put(`${API_BASE}/update/${user._id}`, { status: nextStatus });
      const updatedUser = res.data?.user || { ...user, status: nextStatus };
      setUsers((currentUsers) => currentUsers.map((item) => item._id === user._id ? updatedUser : item));
      setSelectedUser(updatedUser);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "User status update nahi ho paaya.");
    }
  };

  const deleteUser = async (user) => {
    if (!window.confirm(`Delete ${user.name || "this user"}?`)) return;
    try {
      await axios.delete(`${API_BASE}/delete/${user._id}`);
      setUsers((currentUsers) => currentUsers.filter((item) => item._id !== user._id));
      setSelectedUser(null);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "User delete nahi ho paaya.");
    }
  };

  const activeUsers = users.filter((user) => (user.status || "active") === "active").length;
  const inactiveUsers = users.length - activeUsers;

  return (
    <div className="admin-users-page">
      <div className="admin-header-row">
        <div>
          <h1 className="admin-page-title">Users <em>List</em></h1>
          <p className="admin-page-subtitle">Manage registered customers, view account statuses and details.</p>
        </div>
        <div className="admin-top-actions">
          <div className="admin-search-box">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search user name, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="admin-refresh-btn" onClick={fetchUsers} title="Refresh users">
            <i className="bi bi-arrow-repeat"></i>
          </button>
          <select className="admin-order-filter" value={filterStatus} onChange={(event) => setFilterStatus(event.target.value)} aria-label="Filter users by status">
            <option value="All">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="admin-user-summary-grid">
        <div><span>Total users</span><strong>{users.length}</strong></div>
        <div><span>Active</span><strong className="admin-user-stat-active">{activeUsers}</strong></div>
        <div><span>Inactive</span><strong className="admin-user-stat-inactive">{inactiveUsers}</strong></div>
      </div>

      <div className="admin-table-container admin-users-container">
        <div className="admin-table-header">
          <h2 style={{ fontSize: "16px", margin: 0, color: "var(--admin-text-primary)" }}>
            Registered Users ({users.length})
          </h2>
          <span style={{ fontSize: "12px", color: "var(--admin-text-muted)" }}>Live MongoDB Sync</span>
        </div>

        {loading ? (
          <p style={{ color: "var(--admin-text-muted)", padding: "20px 0" }}>Loading users...</p>
        ) : error ? (
          <p style={{ color: "#f87171", padding: "20px 0" }}>{error}</p>
        ) : users.length === 0 ? (
          <p style={{ color: "var(--admin-text-muted)", padding: "20px 0" }}>No users found.</p>
        ) : (
          <table className="admin-table admin-users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Contact</th>
                <th>Gender</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="admin-user-identity">
                      {user.picture ? <img src={getImageUrl(user.picture)} alt="" className="admin-user-avatar" /> : <div className="admin-user-avatar admin-user-avatar-fallback">{user.name ? user.name[0].toUpperCase() : "U"}</div>}
                      <div>
                        <div className="admin-user-name">{user.name || "Unnamed user"}</div>
                        <div className="admin-user-email">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.mobile || "N/A"}</td>
                  <td>{user.gender || "Not Specified"}</td>
                  <td>{new Date(user.createdAt || Date.now()).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</td>
                  <td>
                    <span className={`admin-status-pill ${user.status === "inactive" ? "inactive" : "active"}`}>
                      {user.status || "active"}
                    </span>
                  </td>
                  <td>
                    <div className="admin-user-actions">
                      <button type="button" onClick={() => setSelectedUser(user)}>View</button>
                      <button type="button" onClick={() => updateUserStatus(user)}>{user.status === "inactive" ? "Activate" : "Disable"}</button>
                      <button type="button" className="danger" onClick={() => deleteUser(user)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedUser && (
        <div className="admin-user-profile-panel">
          <div className="admin-user-profile-header">
            <div>
              <span>User profile</span>
              <h2>{selectedUser.name || "Unnamed user"}</h2>
            </div>
            <button type="button" onClick={() => setSelectedUser(null)} aria-label="Close user profile">
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="admin-user-profile-grid">
            <div><span>Email</span><strong>{selectedUser.email || "-"}</strong></div>
            <div><span>Mobile</span><strong>{selectedUser.mobile || "-"}</strong></div>
            <div><span>Gender</span><strong>{selectedUser.gender || "Not specified"}</strong></div>
            <div><span>Status</span><strong>{selectedUser.status || "active"}</strong></div>
          </div>
        </div>
      )}
    </div>
  );
}
