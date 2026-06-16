import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate, Link } from "react-router-dom";

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
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-[#D4AF37] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="bg-[#2a2a2a] border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#D4AF37]">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* Stats Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/photos"
          className="bg-[#2a2a2a] p-8 rounded-xl hover:transform hover:translate-y-[-4px] transition"
        >
          <h3 className="text-4xl font-bold text-[#D4AF37] mb-2">{stats.photos}</h3>
          <p className="text-[#ededed] text-lg">Total Photos</p>
        </Link>

        <Link
          to="/admin/videos"
          className="bg-[#2a2a2a] p-8 rounded-xl hover:transform hover:translate-y-[-4px] transition"
        >
          <h3 className="text-4xl font-bold text-[#D4AF37] mb-2">{stats.videos}</h3>
          <p className="text-[#ededed] text-lg">Total Videos</p>
        </Link>

        <Link
          to="/admin/contacts"
          className="bg-[#2a2a2a] p-8 rounded-xl hover:transform hover:translate-y-[-4px] transition"
        >
          <h3 className="text-4xl font-bold text-[#D4AF37] mb-2">{stats.contacts}</h3>
          <p className="text-[#ededed] text-lg">Total Leads</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
