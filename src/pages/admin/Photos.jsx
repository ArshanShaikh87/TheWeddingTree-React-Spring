import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import api from "../../lib/api";
import "./admin.css";

const CATEGORIES = ["Wedding", "Pre-Wedding", "Haldi", "Mehendi", "Reception", "Engagement"];

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [formData, setFormData] = useState({ title: "", category: CATEGORIES[0], image: null });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchPhotos();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate("/admin/login");
  };

  const fetchPhotos = async () => {
    try {
      const response = await api.get("/photos");
      setPhotos(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      if (editingPhoto) {
        await api.put(`/photos/${editingPhoto.id}`, {
          title: formData.title,
          category: formData.category,
        });
      } else {
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("image", formData.image);
        await api.post("/photos", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setShowForm(false);
      setEditingPhoto(null);
      setFormData({ title: "", category: CATEGORIES[0], image: null });
      fetchPhotos();
    } catch (error) {
      console.error("Error saving photo:", error);
      alert(error.response?.data?.error || "Failed to save photo");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (photo) => {
    setEditingPhoto(photo);
    setFormData({ title: photo.title, category: photo.category, image: null });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;
    try {
      await api.delete(`/photos/${id}`);
      fetchPhotos();
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert(error.response?.data?.error || "Failed to delete photo");
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
          <h1>Photos Management</h1>
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => {
            setEditingPhoto(null);
            setFormData({ title: "", category: CATEGORIES[0], image: null });
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Cancel" : "+ Add Photo"}
        </button>
      </div>

      {/* Content */}
      <div className="admin-container">
        {/* Form */}
        {showForm && (
          <div className="admin-form-card">
            <h2>{editingPhoto ? "Edit Photo" : "Add New Photo"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label>Photo Title</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter a title for this photo"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Category</label>
                <select
                  className="admin-form-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {!editingPhoto && (
                <div className="admin-form-group">
                  <label>Upload Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="admin-form-input"
                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                    required
                  />
                </div>
              )}

              <div className="admin-form-actions">
                <button
                  type="button"
                  className="admin-btn"
                  style={{ background: "var(--admin-border)", color: "var(--admin-text)" }}
                  onClick={() => {
                    setShowForm(false);
                    setEditingPhoto(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={uploading}>
                  {uploading ? "Saving..." : editingPhoto ? "Update Photo" : "Upload Photo"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Photos Grid */}
        <div className="admin-cards-grid">
          {photos.length === 0 && (
            <div className="admin-card-empty">
              No photos yet. Click "Add Photo" to get started!
            </div>
          )}
          {photos.map((photo) => (
            <div key={photo.id} className="admin-card">
              <img src={photo.image_url} alt={photo.title} className="admin-card-image" />
              <div className="admin-card-body">
                <h3 className="admin-card-title">{photo.title}</h3>
                <p className="admin-card-category">{photo.category}</p>
                <div className="admin-card-actions">
                  <button
                    className="admin-btn admin-btn-edit"
                    onClick={() => handleEdit(photo)}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-btn admin-btn-danger"
                    onClick={() => handleDelete(photo.id)}
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

export default Photos;
