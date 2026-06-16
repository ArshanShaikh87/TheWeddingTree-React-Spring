import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

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
    if (!session) {
      navigate("/admin/login");
    }
  };

  const fetchContacts = async () => {
    axios
      .get(`${API_BASE_URL}/api/contacts`, {
        params: { search: search || undefined },
      })
      .then((res) => setContacts(res.data))
      .catch((err) => console.error("Error fetching contacts:", err))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact");
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-[#D4AF37] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="bg-[#2a2a2a] border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/admin/dashboard" className="text-[#D4AF37] hover:underline">← Back</Link>
          <h1 className="text-2xl font-bold text-[#D4AF37]">Contact Leads</h1>
        </div>
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2 text-[#ededed] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full bg-[#2a2a2a] rounded-xl overflow-hidden">
            <thead className="bg-[#252525]">
              <tr>
                <th className="text-left px-6 py-4 text-[#D4AF37] font-semibold">Name</th>
                <th className="text-left px-6 py-4 text-[#D4AF37] font-semibold">Email</th>
                <th className="text-left px-6 py-4 text-[#D4AF37] font-semibold">Phone</th>
                <th className="text-left px-6 py-4 text-[#D4AF37] font-semibold">Event Type</th>
                <th className="text-left px-6 py-4 text-[#D4AF37] font-semibold">Message</th>
                <th className="text-left px-6 py-4 text-[#D4AF37] font-semibold">Date</th>
                <th className="text-left px-6 py-4 text-[#D4AF37] font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-[#252525]">
                  <td className="px-6 py-4 text-[#ededed]">{contact.name}</td>
                  <td className="px-6 py-4 text-[#ededed]">{contact.email}</td>
                  <td className="px-6 py-4 text-[#ededed]">{contact.phone || "-"}</td>
                  <td className="px-6 py-4 text-[#ededed]">{contact.event_type || "-"}</td>
                  <td className="px-6 py-4 text-[#ededed] max-w-xs truncate" title={contact.message}>
                    {contact.message || "-"}
                  </td>
                  <td className="px-6 py-4 text-[#ededed] text-sm">
                    {formatDate(contact.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {contacts.length === 0 && (
          <div className="text-center text-[#ededed] py-12">
            No leads yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
