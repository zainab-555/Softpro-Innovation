import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../utils/apiConfig";

const API_BASE = `${API_BASE_URL}/api/complaint`;
const statuses = ["All", "open", "in_review", "resolved"];

export default function AdminComplaints() {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchComplaints = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_BASE}/show`, {
        params: { status: status === "All" ? undefined : status, search: search.trim() || undefined },
      });
      const data = Array.isArray(response.data?.data) ? response.data.data : [];
      setInquiries(data);
      setSelectedInquiry((current) => data.find((item) => item._id === current?._id) || data[0] || null);
    } catch (requestError) {
      setInquiries([]);
      setSelectedInquiry(null);
      setError(requestError.response?.data?.message || "Complaints load nahi ho paayi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchComplaints(); }, [status, search]);

  const updateInquiry = async (updates) => {
    if (!selectedInquiry) return;
    try {
      const response = await axios.put(`${API_BASE}/${selectedInquiry._id}`, updates);
      const updated = response.data.data;
      setInquiries((current) => current.map((item) => item._id === updated._id ? updated : item));
      setSelectedInquiry(updated);
      if (updates.reply !== undefined) setReplyText("");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Complaint update nahi ho paaya.");
    }
  };

  return (
    <div className="admin-complaints-page">
      <div className="admin-header-row">
        <div>
          <h1 className="admin-page-title">Complaints <em>&amp; Inquiries</em></h1>
          <p className="admin-page-subtitle">Review customer requests, respond quickly, and track resolution status.</p>
        </div>
        <div className="admin-top-actions">
          <div className="admin-search-box"><i className="bi bi-search"></i><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search ticket, customer or subject..." /></div>
          <button type="button" className="admin-refresh-btn" onClick={fetchComplaints} title="Refresh complaints"><i className="bi bi-arrow-repeat"></i></button>
        </div>
      </div>

      <div className="admin-complaints-layout">
        <section className="admin-table-container admin-complaint-inbox">
          <div className="admin-table-header"><h2>Support inbox ({inquiries.length})</h2><div className="admin-complaint-filters">{statuses.map((item) => <button key={item} type="button" className={status === item ? "active" : ""} onClick={() => setStatus(item)}>{item.replace("_", " ")}</button>)}</div></div>
          {loading ? <p className="admin-complaint-message">Loading complaints...</p> : error ? <p className="admin-complaint-message error">{error}</p> : inquiries.length === 0 ? <p className="admin-complaint-message">No complaints or inquiries found.</p> : <div className="admin-complaint-list">{inquiries.map((inquiry) => <button type="button" key={inquiry._id} className={`admin-complaint-item ${selectedInquiry?._id === inquiry._id ? "selected" : ""}`} onClick={() => setSelectedInquiry(inquiry)}><span className={`admin-complaint-priority ${inquiry.priority}`}>{inquiry.priority}</span><strong>{inquiry.subject}</strong><small>{inquiry.customer?.name} · {inquiry.ticket_id}</small><span className={`admin-status-pill ${inquiry.status === "resolved" ? "completed" : inquiry.status === "open" ? "pending" : "active"}`}>{inquiry.status.replace("_", " ")}</span></button>)}</div>}
        </section>

        <section className="admin-table-container admin-complaint-detail">
          {!selectedInquiry ? <div className="admin-complaint-empty-detail"><i className="bi bi-chat-square-text"></i><strong>Select a ticket to view details</strong><span>Customer messages and response actions will appear here.</span></div> : <><div className="admin-complaint-detail-header"><div><span>{selectedInquiry.ticket_id} · {selectedInquiry.category}</span><h2>{selectedInquiry.subject}</h2><p>From <strong>{selectedInquiry.customer?.name}</strong> ({selectedInquiry.customer?.email})</p></div><select value={selectedInquiry.status} onChange={(event) => updateInquiry({ status: event.target.value })} aria-label="Complaint status">{statuses.filter((item) => item !== "All").map((item) => <option key={item} value={item}>{item.replace("_", " ")}</option>)}</select></div><div className="admin-complaint-message-box">{selectedInquiry.message}</div><div className="admin-complaint-reply"><label htmlFor="complaint-reply">Reply to customer</label><textarea id="complaint-reply" rows="4" value={replyText} onChange={(event) => setReplyText(event.target.value)} placeholder="Write an official response..." /><button type="button" className="admin-btn-action-primary" disabled={!replyText.trim()} onClick={() => updateInquiry({ reply: replyText, status: "in_review" })}><i className="bi bi-send-fill"></i> Save Response</button></div>{selectedInquiry.reply && <div className="admin-complaint-existing-reply"><span>Latest response</span><p>{selectedInquiry.reply}</p></div>}</>}
        </section>
      </div>
    </div>
  );
}
