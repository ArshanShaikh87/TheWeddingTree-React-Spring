import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

const CATEGORIES = [
  "Wedding",
  "Pre-Wedding",
  "Haldi",
  "Mehendi",
  "Reception",
  "Engagement",
];

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: CATEGORIES[0],
    image: null,
  });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchPhotos();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
    }
  };

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setPhotos(data);
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
        // Edit photo
        await axios.put(`${API_BASE_URL}/api/photos/${editingPhoto.id}`, {
          title: formData.title,
          category: formData.category,
        });
      } else {
        // Add photo
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("image", formData.image);

        await axios.post(`${API_BASE_URL}/api/photos`, formDataToSend, {
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
      alert("Failed to save photo");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (photo) => {
    setEditingPhoto(photo);
    setFormData({
      title: photo.title,
      category: photo.category,
      image: null,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/photos/${id}`);
      fetchPhotos();
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert("Failed to delete photo");
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
          <h1 className="text-2xl font-bold text-[#D4AF37]">Photos Management</h1>
        </div>
        <button
          onClick={() => {
            setEditingPhoto(null);
            setFormData({ title: "", category: CATEGORIES[0], image: null });
            setShowForm(!showForm);
          }}
          className="bg-[#D4AF37] text-[#1a1a1a] px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {showForm ? "Cancel" : "Add Photo"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="p-6 max-w-2xl mx-auto">
          <div className="bg-[#2a2a2a] p-6 rounded-xl">
            <h2 className="text-xl font-bold text-[#D4AF37] mb-4">
              {editingPhoto ? "Edit Photo" : "Add New Photo"}
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
                <label className="block text-[#ededed] mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-3 text-[#ededed] focus:outline-none focus:border-[#D4AF37]"
                  required
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {!editingPhoto && (
                <div>
                  <label className="block text-[#ededed] mb-2">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.files[0] })
                    }
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-3 text-[#ededed] focus:outline-none focus:border-[#D4AF37]"
                    required={!editingPhoto}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-[#D4AF37] text-[#1a1a1a] font-bold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
              >
                {uploading ? "Saving..." : "Save Photo"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Photos Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-[#2a2a2a] rounded-xl overflow-hidden">
              <img
                src={photo.image_url}
                alt={photo.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-[#D4AF37] font-semibold mb-1">{photo.title}</h3>
                <p className="text-[#ededed] text-sm mb-3">{photo.category}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(photo)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {photos.length === 0 && (
          <div className="text-center text-[#ededed] py-12">
            No photos yet. Add your first photo!
          </div>
        )}
      </div>
    </div>
  );
};

export default Photos;
