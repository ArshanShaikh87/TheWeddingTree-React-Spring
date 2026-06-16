import "./Gallery.css";
import { useState } from "react";

const Gallery = () => {

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);


  const galleryImages = [
    { src: "/src/assets/Gallery1.jpg", category: "Wedding" },
    { src: "/src/assets/Gallery2.jpg", category: "Reception" },
    { src: "/src/assets/Gallery3.jpg", category: "Mehendi" },
    { src: "/src/assets/Gallery4.jpg", category: "Decor" },
    { src: "/src/assets/Gallery5.jpg", category: "Wedding" },
    { src: "/src/assets/hero.jpeg", category: "Reception" },
  ];

  const galleryVideos = [
  {
    thumbnail: "/src/assets/Gallery1.jpg",
    embed: "https://www.youtube.com/embed/d2o68kDFTaw?si=7FgQknRRxFzY5BbE"
  },
  {
    thumbnail: "/src/assets/Gallery2.jpg",
    embed: "https://www.youtube.com/embed/YOUTUBE_ID_2"
  },
  {
    thumbnail: "/src/assets/Gallery3.jpg",
    embed: "https://www.youtube.com/embed/YOUTUBE_ID_3"
  },
  {
    thumbnail: "/src/assets/Gallery3.jpg",
    embed: "https://www.youtube.com/embed/YOUTUBE_ID_3"
  },
  {
    thumbnail: "/src/assets/Gallery1.jpg",
    embed: "https://www.youtube.com/embed/d2o68kDFTaw?si=7FgQknRRxFzY5BbE"
  },
  {
    thumbnail: "/src/assets/Gallery2.jpg",
    embed: "https://www.youtube.com/embed/YOUTUBE_ID_2"
  },
];


  const handleSwipe = () => {
  if (!touchStart || !touchEnd) return;

  const distance = touchStart - touchEnd;

  if (distance > 50) {
    // Swipe Left → Next
    setSelectedIndex(
      selectedIndex === galleryImages.length - 1
        ? 0
        : selectedIndex + 1
    );
  }

  if (distance < -50) {
    // Swipe Right → Previous
    setSelectedIndex(
      selectedIndex === 0
        ? galleryImages.length - 1
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
          {["All", "Wedding", "Reception", "Mehendi", "Decor"].map((cat) => (
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

            {galleryImages
              .filter((img) =>
                activeCategory === "All"
                  ? true
                  : img.category === activeCategory
              )
              .map((img, index) => (
                <div className="gallery-page-item" key={index}>
                  <img
                    src={img.src}
                    alt="Wedding Event"
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
            ? galleryImages.length - 1
            : selectedIndex - 1
        )
      }
    >
      ‹
    </span>
     <img
  src={galleryImages[selectedIndex].src}
  alt="Full View"
  onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
  onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
  onTouchEnd={handleSwipe}
/>
   <span
      className="navbar-btn right"
      onClick={() =>
        setSelectedIndex(
          selectedIndex === galleryImages.length - 1
            ? 0
            : selectedIndex + 1
        )
      }
    >
      ›
    </span></div>


    
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

      {galleryVideos.map((video, index) => (
        <div
          className="video-card"
          key={index}
          onClick={() => setSelectedVideo(video.embed)}

        >
          <img src={video.thumbnail} alt="Wedding Film" />
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
