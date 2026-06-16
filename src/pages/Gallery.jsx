import "./Gallery.css";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const CATEGORIES = ["All", "Wedding", "Pre-Wedding", "Haldi", "Mehendi", "Reception", "Engagement"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setPhotos(data);
    };
    fetchPhotos();

    const fetchVideos = async () => {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setVideos(data);
    };
    fetchVideos();
  }, []);

  const getYouTubeEmbedUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  const filteredPhotos = activeCategory === "All"
    ? photos
    : photos.filter(p => p.category === activeCategory);

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      setSelectedIndex(
        selectedIndex === filteredPhotos.length - 1
          ? 0
          : selectedIndex + 1
      );
    }
    if (distance < -50) {
      setSelectedIndex(
        selectedIndex === 0
          ? filteredPhotos.length - 1
          : selectedIndex - 1
      );
    }
  };

  return (
    <main>
      {/* 1️⃣ Gallery Hero */}
      <section className="section gallery-page-hero">
        <div className="about-overlay">
          <div className="container">
            <h1>Moments We’ve Crafted</h1>
            <p>
              A curated showcase of our signature celebrations,
              refined aesthetics, and timeless wedding experiences.
            </p>
          </div>
        </div>
      </section>

      {/* 2️⃣ Gallery Filters */}
      <section className="gallery-page-filters">
        <div className="container filter-container">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3️⃣ Gallery Grid */}
      <section className="section gallery-page-section">
        <div className="container">
          <div className="gallery-page-grid">
            {filteredPhotos.map((photo, index) => (
              <div className="gallery-page-item" key={photo.id}>
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  onClick={() => setSelectedIndex(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedIndex !== null && (
        <div className="gallery-lightbox">
          <span
            className="close-btn"
            onClick={() => setSelectedIndex(null)}
          >
            ×
          </span>

          <span
            className="navbar-btn left"
            onClick={() =>
              setSelectedIndex(
                selectedIndex === 0
                  ? filteredPhotos.length - 1
                  : selectedIndex - 1
              )
            }
          >
            ‹
          </span>
          <img
            src={filteredPhotos[selectedIndex].image_url}
            alt="Full View"
            onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
            onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
            onTouchEnd={handleSwipe}
          />
          <span
            className="navbar-btn right"
            onClick={() =>
              setSelectedIndex(
                selectedIndex === filteredPhotos.length - 1
                  ? 0
                  : selectedIndex + 1
              )
            }
          >
            ›
          </span>
        </div>
      )}

      {/* 🎬 Video Lightbox */}
      {selectedVideo && (
        <div className="video-lightbox">
          <div
            className="video-overlay"
            onClick={() => setSelectedVideo(null)}
          ></div>
          <div className="video-modal">
            <span
              className="video-close"
              onClick={() => setSelectedVideo(null)}
            >
              ×
            </span>
            <iframe
              src={selectedVideo}
              title="Wedding Film"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* 🎬 Wedding Films Section */}
      <section className="section gallery-video-section">
        <div className="container">
          <h2 className="section-title">Films</h2>
          <div className="gallery-video-grid">
            {videos.map((video) => (
              <div
                className="video-card"
                key={video.id}
                onClick={() => setSelectedVideo(getYouTubeEmbedUrl(video.youtube_url))}
              >
                <img
                  src={`https://img.youtube.com/vi/${getYouTubeEmbedUrl(video.youtube_url)?.split("/").pop()}/maxresdefault.jpg`}
                  alt={video.title}
                />
                <div className="play-overlay">▶</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Gallery;
