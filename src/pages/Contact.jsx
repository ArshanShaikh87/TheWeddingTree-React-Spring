import "./Contact.css";
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";

const Contact = () => {

  /* ================= FORM STATE ================= */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://the-wedding-tree-backend.onrender.com",
        formData
      );

      if (response.status === 200) {
        setSuccessMessage("Your inquiry has been submitted successfully!");

        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          message: ""
        });

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  /* ================= FAQ DATA ================= */

  const faqs = [
    {
      question: "How early should we book your services?",
      answer:
        "We recommend booking at least 6-8 months in advance to ensure availability and seamless planning."
    },
    {
      question: "Do you handle destination weddings?",
      answer:
        "Yes, we specialize in both local and destination weddings across India and overseas."
    },
    {
      question: "Can we customize our wedding planning package?",
      answer:
        "Absolutely. Every wedding is unique and we tailor our services according to your vision and requirements."
    },
    {
      question: "Do you coordinate with vendors booked by us?",
      answer:
        "Yes, we seamlessly collaborate and manage vendors booked by the family to ensure smooth execution."
    }
  ];

  return (
    <main>

      {/* 1️⃣ Contact Hero */}
      <section className="section contact-hero">
        <div className="container">
          <h1>Let’s Begin Your Event Journey</h1>
          <p>
            Connect with our team to start planning your
            unforgettable celebration.
          </p>
        </div>
      </section>

      {/* 2️⃣ Contact Main Section */}
      <section className="section contact-section">
        <div className="container contact-layout">

          {/* Left Form */}
          <div className="contact-form-card">

            <h2>Get In Touch</h2>

            <form
              className="contact-form-modern"
              onSubmit={handleSubmit}
            >

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <PhoneInput
                country={"in"}
                value={formData.phone}
                onChange={(phone) =>
                  setFormData({ ...formData, phone })
                }
              />

              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>
                  Select Event Type
                </option>
                <option>Wedding Ceremony</option>
                <option>Reception</option>
                <option>Mehendi</option>
                <option>Haldi</option>
                <option>Destination Wedding</option>
              </select>

              <textarea
                name="message"
                placeholder="Tell us about your event"
                value={formData.message}
                onChange={handleChange}
              />

              <button type="submit">Send Inquiry</button>

              {successMessage && (
                <p style={{ color: "lightgreen", marginTop: "10px" }}>
                  {successMessage}
                </p>
              )}

            </form>

          </div>

          {/* Right Contact Info */}
          <div className="contact-info-area">

            <p className="contact-desc">
              We would love to connect with you and begin planning
              your unforgettable wedding celebration.
            </p>

            <div className="contact-info-grid">

              <div className="info-item">
                <div className="info-icon">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h5>Phone Number</h5>
                  <p>+91 00000 00000</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaEnvelope />
                </div>
                <div>
                  <h5>Email Address</h5>
                  <p>info@theweddingtree.com</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaWhatsapp />
                </div>
                <div>
                  <h5>Whatsapp</h5>
                  <p>+91 00000 00000</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h5>Our Office</h5>
                  <p>Pune, Maharashtra, India</p>
                </div>
              </div>

            </div>

            <div className="contact-map">
              <iframe
                src="https://maps.google.com/maps?q=Pune&t=&z=13&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                title="map"
              ></iframe>
            </div>

          </div>

        </div>
      </section>

      {/* 3️⃣ Quick Connect Section */}
      <section className="section quick-connect-section">
        <div className="container">
          <div className="quick-connect-grid">
            <a href="tel:+910000000000" className="quick-card">
              <FaPhoneAlt />
              <h4>Call Us</h4>
              <p>Speak directly with our planning team</p>
            </a>

            <a
              href="https://wa.me/910000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="quick-card"
            >
              <FaWhatsapp />
              <h4>WhatsApp</h4>
              <p>Chat instantly with us</p>
            </a>

            <a href="mailto:info@theweddingtree.com" className="quick-card">
              <FaEnvelope />
              <h4>Email Us</h4>
              <p>Send your detailed inquiry</p>
            </a>
          </div>
        </div>
      </section>

      {/* 4️⃣ FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>

          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${activeFAQ === index ? "active" : ""}`}
              >
                <div
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <h4>{faq.question}</h4>
                  <span>{activeFAQ === index ? "−" : "+"}</span>
                </div>

                {activeFAQ === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ Final CTA */}
      <section className="section contact-final-cta">
        <div className="container">
          <h2>Let’s Craft Your Unforgettable Celebration</h2>
          <p>
            Share your vision with us and our team will connect with you
            within 24 hours to begin your wedding journey.
          </p>
          <a href="#top" className="cta-btn">
            Schedule Consultation
          </a>
        </div>
      </section>

    </main>
  );
};

export default Contact;