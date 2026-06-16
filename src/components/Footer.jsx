import "./Footer.css";
import { FaInstagram, FaYoutube, FaPinterestP, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {

  
  return (
    <footer className="footer">
      <div className="container footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <h3>The Wedding Tree</h3>
          <p>
            Crafting timeless wedding experiences with elegance,
            passion, and perfection.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: weddingtree09@gmail.com</p>
          <p>Phone: +91 87880 63968</p>
          <p>Location: Pune, India</p>
        </div>

        {/* Social Links */}
<div className="footer-social">
  <h4>Follow Us</h4>
  <div className="social-icons">
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      <FaInstagram />
    </a>
    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
      <FaYoutube />
    </a>
    <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
      <FaPinterestP />
    </a>
  </div>
</div>

        

      </div>

      <div className="footer-bottom">
        <p>© 2025 The Wedding Tree. All Rights Reserved.</p>
      </div>

      <a
  href="https://wa.me/918788063968"
  className="whatsapp-float"
  target="_blank"
  rel="noopener noreferrer"
>
  <FaWhatsapp />
</a>

    </footer>
    
  );
};

export default Footer;
