import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import api from "../../lib/api";
import "./admin.css";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchContacts();
  }, [search]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate("/admin/login");
  };

  const fetchContacts = async () => {
    try {
      const response = await api.get("/contacts", { params: { search: search || undefined } });
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await api.delete(`/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert(error.response?.data?.error || "Failed to delete contact");
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
          <p style={{ color: "var(--admin-muted)", fontSize: "1.2rem" }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-left">
          <Link to="/admin/dashboard" className="admin-back-btn">← Dashboard</Link>
          <h1>Contact Leads</h1>
        </div>
        <div style={{ width: "300px" }}>
          <input
            type="text"
            className="admin-form-input"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="admin-container">
        <div className="admin-table-container">
          {contacts.length === 0 && (
            <div style={{ padding: "4rem", textAlign: "center", color: "var(--admin-muted)" }}>
              {search ? "No leads found matching your search" : "No contact leads yet"}
            </div>
          )}
          {contacts.length > 0 && (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Event Type</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone || "-"}</td>
                    <td>{contact.event_type || "-"}</td>
                    <td style={{ maxWidth: "250px" }} title={contact.message}>
                      {contact.message ? (contact.message.length > 50 ? contact.message.substring(0, 50) + "..." : contact.message) : "-"}
                    </td>
                    <td>{formatDate(contact.created_at)}</td>
                    <td>
                      <button
                        className="admin-btn admin-btn-danger"
                        style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }}
                        onClick={() => handleDelete(contact.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
