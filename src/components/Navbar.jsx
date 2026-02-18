import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-container">

        {/* Logo */}
        <div className="logo-wrapper">
          <img src={logo} alt="The Wedding Tree Logo" />
          <span className="brand-name">The Wedding Tree</span>
        </div>

        {/* Desktop Links */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact" className="nav-btn">
            Book Consultation
          </Link>
        </nav>

        {/* Hamburger */}
        <div 
          className="hamburger" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
        <Link to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link to="/contact" className="nav-btn" onClick={() => setMenuOpen(false)}>Book Consultation</Link>
      </div>
    </header>
  );
};

export default Navbar;
