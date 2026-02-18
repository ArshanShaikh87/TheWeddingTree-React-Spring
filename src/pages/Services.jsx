import "./Services.css";

const Services = () => {
  return (
    <main>

      {/* 1️⃣ Services Hero */}
      <section className="section services-hero">
        <div className="container">
          <h1>Our Wedding Services</h1>
          <p>
            Curated luxury planning solutions designed to transform
            your special day into a seamless and unforgettable celebration.
          </p>
        </div>
      </section>

      {/* 2️⃣ Our Services */}
<section className="section core-services">
  <div className="container">

    <h2 className="section-title">Our Services</h2>

   <div className="services-grid">

  <div className="service-card">
    <h4>Wedding Stationery & Creative Design</h4>
    <ul>
      <li>Logo & Monogram Design</li>
      <li>Save The Date & E-Invitations</li>
      <li>Wedding Website & Itinerary Cards</li>
      <li>Custom Creatives & Signages</li>
    </ul>
  </div>

  <div className="service-card">
    <h4>Hotels & Venue Management</h4>
    <ul>
      <li>Venue Selection & Booking Assistance</li>
      <li>Contract Review & Negotiation</li>
      <li>Hotel Coordination & Meetings</li>
      <li>Dedicated Venue Point of Contact</li>
    </ul>
  </div>

  <div className="service-card">
    <h4>RSVP & Guest Logistics</h4>
    <ul>
      <li>Guest Communication (India & Overseas)</li>
      <li>Rooming List Management</li>
      <li>Transportation Coordination</li>
      <li>Accommodation Planning</li>
    </ul>
  </div>

  <div className="service-card">
    <h4>Hampers & Gifting</h4>
    <ul>
      <li>Room Hampers & Welcome Kits</li>
      <li>Customized Gift Selection</li>
      <li>Wedding Favors</li>
      <li>Favor Display Setup</li>
    </ul>
  </div>

  <div className="service-card">
    <h4>Artists & Vendor Coordination</h4>
    <ul>
      <li>Entertainment Selection</li>
      <li>Artist Booking & Management</li>
      <li>Vendor Sourcing</li>
      <li>On-Day Coordination</li>
    </ul>
  </div>

  <div className="service-card">
    <h4>Decor & Technical Management</h4>
    <ul>
      <li>Concept Ideation & Planning</li>
      <li>Decor Supervision</li>
      <li>Lighting & Sound Management</li>
      <li>Technical Rider Handling</li>
    </ul>
  </div>

  <div className="service-card">
    <h4>On-Day Logistics & Hospitality</h4>
    <ul>
      <li>Guest Check-In Management</li>
      <li>Airport & Station Transfers</li>
      <li>Vehicle Coordination</li>
      <li>Help Desk & Hospitality Services</li>
    </ul>
  </div>

  <div className="service-card">
    <h4>Financial & Client Servicing</h4>
    <ul>
      <li>Vendor Payments Handling</li>
      <li>Event Schedule Management</li>
      <li>Client Meetings & Updates</li>
      <li>Dedicated Coordination Team</li>
    </ul>
  </div>

</div>

  </div>
</section>

{/* 3️⃣ Service Packages */}
<section className="section service-packages">
  <div className="container">

    <h2 className="section-title">Our Planning Packages</h2>

    <div className="packages-container">

      <div className="package-card">
        <h3>Signature Planning</h3>
        <ul>
          <li>Complete Wedding Planning</li>
          <li>Vendor & Venue Coordination</li>
          <li>RSVP & Guest Management</li>
          <li>On-Day Execution</li>
        </ul>
      </div>

      <div className="package-card featured">
        <h3>Premium Experience</h3>
        <ul>
          <li>Luxury Concept & Design</li>
          <li>Full Logistics Management</li>
          <li>Artist & Entertainment Handling</li>
          <li>Dedicated Coordination Team</li>
        </ul>
      </div>

      <div className="package-card">
        <h3>Destination Weddings</h3>
        <ul>
          <li>Location Scouting</li>
          <li>Travel & Accommodation Planning</li>
          <li>Hospitality Management</li>
          <li>Technical & Decor Supervision</li>
        </ul>
      </div>

    </div>

  </div>
</section>


{/* 4️⃣ Why Choose Our Services */}
<section className="section services-trust">
  <div className="container">

    <h2 className="section-title">Why Choose Our Services</h2>

    <div className="services-trust-grid">

      <div className="trust-card">
        <h4>Structured Planning Approach</h4>
        <p>
          Every event follows a detailed execution plan
          ensuring clarity, precision, and timely delivery.
        </p>
      </div>

      <div className="trust-card">
        <h4>Transparent Coordination</h4>
        <p>
          Clear communication with clients, vendors,
          and venues at every stage of planning.
        </p>
      </div>

      <div className="trust-card">
        <h4>Experienced Execution Team</h4>
        <p>
          A dedicated coordination team present
          throughout the event duration.
        </p>
      </div>

      <div className="trust-card">
        <h4>Attention to Detail</h4>
        <p>
          From hospitality to technical supervision,
          every detail is carefully monitored.
        </p>
      </div>

    </div>

  </div>
</section>

{/* 5️⃣ Services Final CTA */}
<section className="section services-cta">
  <div className="container services-cta-container">

    <h2>
      Let’s Plan Your Perfect Celebration
    </h2>

    <p>
      Connect with our team to discuss your wedding vision.
      We are committed to transforming your ideas into a
      seamless and memorable experience.
    </p>

    <a href="/contact" className="btn">
      Book Your Consultation
    </a>

  </div>
</section>




    </main>
  );
};

export default Services;