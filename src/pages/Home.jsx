import "./Home.css";
import { useEffect, useState, useRef } from "react";
import t1 from "../assets/t1.png";
import t2 from "../assets/t2.png";

import p1 from "../assets/p1.jpeg";
import p2 from "../assets/p2.jpeg";
import p3 from "../assets/p3.jpeg";
import p4 from "../assets/p4.jpeg";
import p5 from "../assets/p5.jpeg";
import p6 from "../assets/p6.jpeg";

import g1 from "../assets/gallery1.jpg";
import g2 from "../assets/gallery2.jpg";
import g3 from "../assets/gallery3.jpg";
import g4 from "../assets/gallery4.jpg";
import g5 from "../assets/gallery5.jpg";
import g6 from "../assets/hero.jpeg";


const Home = () => {

  // ✅ First declare states
  const [years, setYears] = useState(0);
  const [weddings, setWeddings] = useState(0);
  const [venues, setVenues] = useState(0);

  const aboutRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  // ✅ Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.4 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  // ✅ Count Animation
  useEffect(() => {
    if (!startCount) return;

    let y = 0;
    let w = 0;
    let v = 0;

    const interval = setInterval(() => {
      if (y < 10) y += 1;
      if (w < 500) w += 10;
      if (v < 50) v += 1;

      setYears(y);
      setWeddings(w);
      setVenues(v);

      if (y >= 10 && w >= 500 && v >= 50) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [startCount]);
  

const [currentIndex, setCurrentIndex] = useState(0);

const testimonials = [
  {
    name: "Aisha & Rahim",
    text: "The Wedding Tree turned our dream into reality. Every detail was perfectly curated and beautifully executed.",
    image: t1,
  },
  {
    name: "Meera & Arjun",
    text: "From planning to decoration, everything was seamless. Truly a luxury experience we will cherish forever.",
    image: t2,
  },
  {
    name: "Sana & Imran",
    text: "Professional, elegant, and stress-free. The team made our special day unforgettable.",
    image: t1,
  },
];

const prevSlide = () => {
  setCurrentIndex((prev) =>
    prev === 0 ? testimonials.length - 1 : prev - 1
  );
};

const nextSlide = () => {
  setCurrentIndex((prev) =>
    prev === testimonials.length - 1 ? 0 : prev + 1
  );
};


 const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {

    const targetDate = new Date(2026, 11, 31, 23, 59, 59).getTime();
    console.log("Timer running");
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) return;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    updateTimer();
    console.log("Timer running"); 
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);

  }, []);

return (
    <main>


      {/* 1️⃣ Hero Section */}
      
<section className="hero-section">
  <div className="hero-overlay">
    <div className="container hero-content">
      <h1>
        Crafting Timeless <br /> Wedding Memories
      </h1>
      <p>
        Where love meets luxury and every detail tells a story.
      </p>
      <a href="/contact" className="btn">
        Plan Your Dream Wedding
      </a>
    </div>
  </div>
</section>



     {/* 2️⃣ About Section */}
<section ref={aboutRef} className="section about-section">
  <div className="container about-container">

    <div className="about-text">
      <h2>About The Wedding Tree</h2>
      <p>
        At The Wedding Tree, we believe every love story deserves
        a celebration that is elegant, timeless, and unforgettable.
        With a passion for perfection and luxury design,
        we craft weddings that reflect your unique journey.
      </p>
      <a href="/About" className="btn">
        Learn More
      </a>
    </div>

    <div className="about-stats">
      <div className="stat-box">
        <h3>{years}+</h3>
        <p>Years Experience</p>
      </div>

      <div className="stat-box">
        <h3>{weddings}+</h3>
        <p>Weddings Planned</p>
      </div>

      <div className="stat-box">
        <h3>{venues}+</h3>
        <p>Luxury Venues</p>
      </div>
    </div>

  </div>
</section>

      {/* 3️⃣ Why Choose Us */}
<section className="section why-section">
  <div className="container">
    <h2 className="section-title">Why Choose Us</h2>

    <div className="why-grid">

      <div className="why-box">
        <h3>10+ Years Experience</h3>
        <p>
          A decade of crafting unforgettable luxury wedding celebrations.
        </p>
      </div>

      <div className="why-box">
        <h3>500+ Weddings</h3>
        <p>
          Successfully planned and executed with elegance and precision.
        </p>
      </div>

      <div className="why-box">
        <h3>Luxury Design Focus</h3>
        <p>
          Every detail is thoughtfully curated to reflect timeless beauty.
        </p>
      </div>

      <div className="why-box">
        <h3>Dedicated Planner</h3>
        <p>
          Personalized attention ensuring your special day is stress-free.
        </p>
      </div>

    </div>
  </div>
</section>


     {/* 4️⃣ Services Section */}
<section className="section services-section">
  <div className="container">
    <h2 className="section-title">Our Services</h2>

    <div className="services-grid">

      <div className="service-card">
        <h3>Wedding Planning</h3>
        <p>
          Complete planning from concept to execution with elegance.
        </p>
      </div>

      <div className="service-card">
        <h3>Luxury Decoration</h3>
        <p>
          Bespoke decor designs tailored to your dream celebration.
        </p>
      </div>

      <div className="service-card">
        <h3>Photography & Films</h3>
        <p>
          Capturing timeless memories with artistic perfection.
        </p>
      </div>

      <div className="service-card">
        <h3>Venue Styling</h3>
        <p>
          Transforming venues into breathtaking wedding destinations.
        </p>
      </div>

      <div className="service-card">
        <h3>Catering Services</h3>
        <p>
          Exquisite culinary experiences curated for your special day.
        </p>
      </div>

      <div className="service-card">
        <h3>Bridal Styling</h3>
        <p>
          Personalized styling ensuring elegance and sophistication.
        </p>
      </div>

    </div>
    <div className="services-cta">
  <a href="/services" className="btn">
    Explore All Services
  </a>
</div>
  </div>
</section>


      {/* 5️⃣ Gallery Section */}
<section className="section gallery-section">
  <div className="container">
    <h2 className="section-title">Featured Gallery</h2>

    <div className="gallery-grid">
  <div className="gallery-item">
    <img src={g1} alt="Wedding 1" />
  </div>
  <div className="gallery-item">
    <img src={g2} alt="Wedding 2" />
  </div>
  <div className="gallery-item">
    <img src={g3} alt="Wedding 3" />
  </div>
  <div className="gallery-item">
    <img src={g4} alt="Wedding 4" />
  </div>
  <div className="gallery-item">
    <img src={g5} alt="Wedding 5" />
  </div>
  <div className="gallery-item">
    <img src={g6} alt="Wedding 6" />
  </div>
</div>


    <div className="gallery-cta">
      <a href="/gallery" className="btn">
        View Full Gallery
      </a>
    </div>

  </div>
</section>


      {/* 6️⃣ Testimonials */}
<section className="section testimonial-section">
  <div className="container">
    <h2 className="section-title">What Our People Say</h2>

    <div className="testimonial-wrapper">

      <div className="testimonial-card single">
        <div className="testimonial-header">
          <img src={testimonials[currentIndex].image} alt="" />
          <h4>{testimonials[currentIndex].name}</h4>
        </div>

        <p>{testimonials[currentIndex].text}</p>
      </div>

      <div className="testimonial-controls">
        <button onClick={prevSlide}>◀</button>
        <button onClick={nextSlide}>▶</button>
      </div>

    </div>
  </div>
</section>


   {/* 7️⃣ Partners Section */}
<section className="section partners-section">
  <div className="container">
    <h2 className="section-title">Our Trusted Partners</h2>

    <div className="logo-slider">
      <div className="logo-track">

        {/* First Set */}
        <img src={p1} alt="Partner 1" />
        <img src={p2} alt="Partner 2" />
        <img src={p3} alt="Partner 3" />
        <img src={p4} alt="Partner 4" />
        <img src={p5} alt="Partner 5" />
        <img src={p6} alt="Partner 6" />

        {/* Duplicate Set for seamless loop */}
        <img src={p1} alt="Partner 1" />
        <img src={p2} alt="Partner 2" />
        <img src={p3} alt="Partner 3" />
        <img src={p4} alt="Partner 4" />
        <img src={p5} alt="Partner 5" />
        <img src={p6} alt="Partner 6" />

      </div>
    </div>
  </div>
</section>


      {/* 8️⃣ Certifications */}
      <section className="section certification-section">
        <div className="container">
          <h2>Certifications</h2>
        </div>
      </section>

     {/* 9️⃣ Countdown Section */}
<section className="section countdown-section">
  <div className="container">

    <h2 className="section-title">
      Limited 2026 Wedding Slots Available
    </h2>

    <div className="countdown-grid">

      <div className="time-box">
        <h3>{timeLeft.days}</h3>
        <p>Days</p>
      </div>

      <div className="time-box">
        <h3>{timeLeft.hours}</h3>
        <p>Hours</p>
      </div>

      <div className="time-box">
        <h3>{timeLeft.minutes}</h3>
        <p>Minutes</p>
      </div>

      <div className="time-box">
        <h3>{timeLeft.seconds}</h3>
        <p>Seconds</p>
      </div>

    </div>

    <div className="countdown-info">
      <p>• Exclusive Consultation Offer</p>
      <p>• Luxury Event Showcase</p>
      <p>• Only 12 Premium Dates Remaining</p>
    </div>

  </div>
</section>



      {/* 🔟 Final Call To Action */}
<section className="section final-cta-section">
  <div className="container final-cta-container">

    <h2>
      Let’s Begin Your Forever Story
    </h2>

    <p>
      Secure your exclusive 2025 wedding date and create
      a celebration that reflects your love and elegance.
    </p>

    <div className="cta-buttons">
      <a href="/contact" className="btn">
        Book Your Consultation
      </a>
    </div>

  </div>
</section>


    </main>
  );
};

export default Home;
