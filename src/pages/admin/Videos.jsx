import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import api from "../../lib/api";
import "./admin.css";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState({ title: "", youtube_url: "" });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchVideos();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate("/admin/login");
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
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingVideo) {
        await api.put(`/videos/${editingVideo.id}`, formData);
      } else {
        await api.post("/videos", formData);
      }
      setShowForm(false);
      setEditingVideo(null);
      setFormData({ title: "", youtube_url: "" });
      fetchVideos();
    } catch (error) {
      console.error("Error saving video:", error);
      alert(error.response?.data?.error || "Failed to save video");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setFormData({ title: video.title, youtube_url: video.youtube_url });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      await api.delete(`/videos/${id}`);
      fetchVideos();
    } catch (error) {
      console.error("Error deleting video:", error);
      alert(error.response?.data?.error || "Failed to delete video");
    }
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
          <h1>Videos Management</h1>
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => {
            setEditingVideo(null);
            setFormData({ title: "", youtube_url: "" });
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Cancel" : "+ Add Video"}
        </button>
      </div>

      {/* Content */}
      <div className="admin-container">
        {/* Form */}
        {showForm && (
          <div className="admin-form-card">
            <h2>{editingVideo ? "Edit Video" : "Add New Video"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label>Video Title</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter a title for this video"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>YouTube URL</label>
                <input
                  type="url"
                  className="admin-form-input"
                  value={formData.youtube_url}
                  onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  required
                />
              </div>

              <div className="admin-form-actions">
                <button
                  type="button"
                  className="admin-btn"
                  style={{ background: "var(--admin-border)", color: "var(--admin-text)" }}
                  onClick={() => {
                    setShowForm(false);
                    setEditingVideo(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? "Saving..." : editingVideo ? "Update Video" : "Save Video"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Videos Grid */}
        <div className="admin-cards-grid">
          {videos.length === 0 && (
            <div className="admin-card-empty">
              No videos yet. Click "Add Video" to get started!
            </div>
          )}
          {videos.map((video) => (
            <div key={video.id} className="admin-card">
              <iframe
                src={getYouTubeEmbedUrl(video.youtube_url)}
                title={video.title}
                className="admin-video-iframe"
                allowFullScreen
              />
              <div className="admin-card-body">
                <h3 className="admin-card-title">{video.title}</h3>
                <div className="admin-card-actions">
                  <button
                    className="admin-btn admin-btn-edit"
                    onClick={() => handleEdit(video)}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-btn admin-btn-danger"
                    onClick={() => handleDelete(video.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;
