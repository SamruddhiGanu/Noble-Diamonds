import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-icon">◈</span>
            <div>
              <div className="logo-name">NOBLE</div>
              <div className="logo-sub">DIAMONDS</div>
            </div>
          </div>
          <p className="footer-tagline">Born from a passion for perfection. Every stone tells a story of timeless brilliance.</p>
        </div>
        <div className="footer-col">
          <h4>Collections</h4>
          <Link to="/collections/Solitaire Rings">Solitaire Rings</Link>
          <Link to="/collections/Drop Earrings">Drop Earrings</Link>
          <Link to="/collections/Diamond Necklaces">Diamond Necklaces</Link>
          <Link to="/collections/Tennis Bracelets">Tennis Bracelets</Link>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/collections">All Collections</Link>
        </div>
        <div className="footer-col">
          <h4>Get In Touch</h4>
          <p>enquiries@noblediamonds.com</p>
          <p>+91 98765 43210</p>
          <p>Mon–Sat: 10am – 7pm</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Noble Diamonds. All rights reserved.</p>
        <p>Crafted with excellence · Certified by IGI & GIA</p>
      </div>
    </footer>
  );
}
