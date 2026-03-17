import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-overlay"></div>
        <img src="https://images.unsplash.com/photo-1584705270952-33e7e2dcba54?w=1600&q=80" alt="Store" className="about-hero-img" />
        <div className="about-hero-content">
          <p className="section-label">Our Story</p>
          <h1>Born From a <span className="gold-text">Passion</span><br />for Perfection</h1>
        </div>
      </div>
      <div className="about-content container">
        <div className="about-text">
          <p>Noble Diamonds was founded on a singular belief — that every person deserves to experience the magnificence of a perfectly crafted diamond. We source the world's finest stones, working with master jewellers to create heirloom-quality pieces.</p>
          <p>From engagement rings that mark new beginnings to anniversary gifts that celebrate enduring love — Noble Diamonds has been part of life's most treasured moments for over two decades.</p>
        </div>
        <div className="values-grid">
          {[
            ['25+', 'Years of Mastery', 'Two decades of crafting exceptional jewellery for India\'s most discerning families.'],
            ['10,000+', 'Pieces Crafted', 'Every piece made with the same obsessive attention to detail as the first.'],
            ['GIA & IGI', 'Certified', 'Every diamond certified by the world\'s most respected gemological institutes.'],
            ['100%', 'Ethically Sourced', 'We work only with conflict-free diamond sources and responsible suppliers.'],
          ].map(([val, title, desc]) => (
            <div key={title} className="value-card">
              <span className="value-num">{val}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="team-cta">
        <p className="section-label">Visit Us</p>
        <h2>Experience Noble <span className="gold-text">Diamonds</span> In Person</h2>
        <div className="divider"></div>
        <p>Visit our flagship showroom in Mumbai and let our expert gemologists guide you through our collections.</p>
        <Link to="/contact" className="btn-primary" style={{marginTop:'32px', display:'inline-block'}}>Book an Appointment</Link>
      </div>
    </div>
  );
}
