import "./About.css";

const About = () => {
  return (
    <main>

      {/* 1️⃣ About Hero Section */}
      <section className="section about-hero">
        <div className="container">
          <h1>Where Elegance Meets Excellence</h1>
          <p>
            We design refined, detail-driven wedding experiences
            that reflect your story with sophistication and grace.
          </p>
        </div>
      </section>


      {/* 2️⃣ Our Story Section */}
<section className="section our-story">
  <div className="container story-container">

    <div className="story-text">
      <h2>Our Story</h2>
      <p>
        The Wedding Tree was founded with a vision to transform
        wedding celebrations into curated experiences.
        We believe that every couple deserves a celebration
        that reflects their individuality, culture, and elegance.
      </p>

      <p>
        Over the years, we have refined our process to ensure
        seamless planning, thoughtful design, and flawless execution
        delivering not just events, but timeless memories.
      </p>
    </div>

    {/* <div className="story-image">
      <img src="/src/assets/About.png" alt="Our Story" />
    </div> */}

  </div>
</section>

{/* 3️⃣ Mission & Vision */}
<section className="section mission-vision">
  <div className="container mission-container">

    <div className="mission-card">
      <h3>Our Mission</h3>
      <p>
        To craft extraordinary wedding experiences through precision,
        creativity, and personalized service ensuring every celebration
        reflects elegance and excellence.
      </p>
    </div>

    <div className="mission-card">
      <h3>Our Vision</h3>
      <p>
        To become a trusted name in luxury wedding planning,
        recognized for timeless design, flawless execution,
        and uncompromising quality.
      </p>
    </div>

  </div>
</section>

{/* 4️⃣ Our Process */}
<section className="section our-process">
  <div className="container">

    <h2 className="section-title">Our Process</h2>

    <div className="process-container">

      <div className="process-step">
        <span>01</span>
        <h4>Consultation</h4>
        <p>
          Understanding your vision, expectations,
          and wedding aspirations.
        </p>
      </div>

      <div className="process-step">
        <span>02</span>
        <h4>Concept Design</h4>
        <p>
          Creating a refined theme and design
          tailored to your personality.
        </p>
      </div>

      <div className="process-step">
        <span>03</span>
        <h4>Planning & Coordination</h4>
        <p>
          Managing vendors, timelines, and
          every logistical detail seamlessly.
        </p>
      </div>

      <div className="process-step">
        <span>04</span>
        <h4>Grand Execution</h4>
        <p>
          Delivering a flawless celebration
          with elegance and precision.
        </p>
      </div>

    </div>
  </div>
</section>

{/* 5️⃣ Why Clients Trust Us */}
<section className="section trust-section">
  <div className="container">

    <h2 className="section-title">Why Clients Trust Us</h2>

    <div className="trust-container">

      <div className="trust-card">
        <h4>Detail-Driven Planning</h4>
        <p>
          Every element is carefully curated to ensure
          flawless execution and refined presentation.
        </p>
      </div>

      <div className="trust-card">
        <h4>Transparent Communication</h4>
        <p>
          We maintain clarity and professionalism at
          every stage of the planning journey.
        </p>
      </div>

      <div className="trust-card">
        <h4>Trusted Vendor Network</h4>
        <p>
          Our curated partnerships ensure quality,
          reliability, and excellence.
        </p>
      </div>

    </div>

  </div>
</section>


{/* 6️⃣ Founder Section */}
<section className="section founder-section">
  <div className="container founder-container">

    <div className="founder-image">
      <img src="/src/assets/hero.jpeg" alt="Founder" />
    </div>

    <div className="founder-text">
      <h2>Meet The Founder</h2>
      <p>
        With a passion for refined aesthetics and meticulous planning,
        our founder envisioned The Wedding Tree as more than an event company
        but as a curator of timeless celebrations.
      </p>

      <p>
        Every wedding is approached with dedication, creativity,
        and an unwavering commitment to excellence,
        ensuring each couple’s journey is seamless and unforgettable.
      </p>
    </div>

  </div>
</section>

{/* 7️⃣ About Final CTA */}
<section className="section about-cta">
  <div className="container about-cta-container">

    <h2>
      Let Us Craft Your Unforgettable Celebration
    </h2>

    <p>
      Partner with The Wedding Tree to transform your vision
      into an elegant and seamless wedding experience.
    </p>

    <a href="/contact" className="btn">
      Schedule Your Consultation
    </a>

  </div>
</section>

    </main>
  );
};

export default About;
