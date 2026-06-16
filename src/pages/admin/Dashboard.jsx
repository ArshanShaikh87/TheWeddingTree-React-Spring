import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import "./admin.css";

const Dashboard = () => {
  const [stats, setStats] = useState({ photos: 0, videos: 0, contacts: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
    }
  };

  const fetchStats = async () => {
    try {
      const [photosRes, videosRes, contactsRes] = await Promise.all([
        supabase.from("photos").select("id", { count: "exact" }),
        supabase.from("videos").select("id", { count: "exact" }),
        supabase.from("contacts").select("id", { count: "exact" }),
      ]);

      setStats({
        photos: photosRes.count || 0,
        videos: videosRes.count || 0,
        contacts: contactsRes.count || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
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
          <h1>Dashboard</h1>
        </div>
        <button className="admin-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="admin-container">
        <div className="admin-stats-grid">
          <Link to="/admin/photos" className="admin-stat-card">
            <h3>{stats.photos}</h3>
            <p>Total Photos</p>
          </Link>

          <Link to="/admin/videos" className="admin-stat-card">
            <h3>{stats.videos}</h3>
            <p>Total Videos</p>
          </Link>

          <Link to="/admin/contacts" className="admin-stat-card">
            <h3>{stats.contacts}</h3>
            <p>New Leads</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
