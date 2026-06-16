import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    youtube_url: "",
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchVideos();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
    }
  };

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingVideo) {
        await axios.put(`${API_BASE_URL}/api/videos/${editingVideo.id}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/api/videos`, formData);
      }
      setShowForm(false);
      setEditingVideo(null);
      setFormData({ title: "", youtube_url: "" });
      fetchVideos();
    } catch (error) {
      console.error("Error saving video:", error);
      alert("Failed to save video");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      youtube_url: video.youtube_url,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/videos/${id}`);
      fetchVideos();
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete video");
    }
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
          <h1 className="text-2xl font-bold text-[#D4AF37]">Videos Management</h1>
        </div>
        <button
          onClick={() => {
            setEditingVideo(null);
            setFormData({ title: "", youtube_url: "" });
            setShowForm(!showForm);
          }}
          className="bg-[#D4AF37] text-[#1a1a1a] px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {showForm ? "Cancel" : "Add Video"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="p-6 max-w-2xl mx-auto">
          <div className="bg-[#2a2a2a] p-6 rounded-xl">
            <h2 className="text-xl font-bold text-[#D4AF37] mb-4">
              {editingVideo ? "Edit Video" : "Add New Video"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[#ededed] mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-3 text-[#ededed] focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#ededed] mb-2">YouTube URL</label>
                <input
                  type="url"
                  value={formData.youtube_url}
                  onChange={(e) =>
                    setFormData({ ...formData, youtube_url: e.target.value })
                  }
                  className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-3 text-[#ededed] focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#D4AF37] text-[#1a1a1a] font-bold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Video"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-[#2a2a2a] rounded-xl overflow-hidden">
              <iframe
                src={getYouTubeEmbedUrl(video.youtube_url)}
                title={video.title}
                className="w-full aspect-video"
                allowFullScreen
              />
              <div className="p-4">
                <h3 className="text-[#D4AF37] font-semibold mb-3">{video.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(video)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {videos.length === 0 && (
          <div className="text-center text-[#ededed] py-12">
            No videos yet. Add your first video!
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;
