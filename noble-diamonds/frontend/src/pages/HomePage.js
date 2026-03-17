import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

const collections = [
  { type: 'ENGAGEMENT', title: 'Solitaire Rings', desc: 'Timeless brilliance in every facet.', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80' },
  { type: 'STATEMENT', title: 'Drop Earrings', desc: 'From classic studs to dramatic drops.', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80' },
  { type: 'SIGNATURE', title: 'Diamond Necklaces', desc: 'Layered pendants and single-stone pieces.', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80' },
  { type: 'CLASSIC', title: 'Tennis Bracelets', desc: 'A continuous arc of brilliant diamonds.', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80' },
];

export default function HomePage() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios.get('/api/products?featured=true&limit=4')
      .then(r => setFeatured(r.data.products))
      .catch(() => {});
  }, []);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-overlay"></div>
          <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=90" alt="Hero" />
        </div>
        <div className="hero-content">
          <p className="section-label">The Finest Diamonds</p>
          <h1 className="hero-title">
            Where <span className="gold-text">Brilliance</span><br />Meets Eternity
          </h1>
          <div className="divider"></div>
          <p className="hero-sub">Each piece crafted to perfection — a harmonious blend of artistry, gemology, and passion.</p>
          <div className="hero-btns">
            <Link to="/collections" className="btn-fill">Explore Collections</Link>
            <Link to="/contact" className="btn-primary">Enquire Now</Link>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="container stats-inner">
          {[['25+', 'Years of Mastery'], ['10,000+', 'Pieces Crafted'], ['GIA & IGI', 'Certified'], ['Pan-India', 'Delivery']].map(([val, label]) => (
            <div key={label} className="stat-item">
              <span className="stat-val">{val}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="collections-section">
        <div className="container">
          <p className="section-label" style={{textAlign:'center'}}>Our Creations</p>
          <h2 className="section-title">Diamond <span className="gold-text">Collections</span></h2>
          <div className="divider"></div>
          <p className="section-desc">Each piece in our collection is crafted to perfection — a harmonious blend of artistry, gemology, and passion.</p>
          <div className="collections-grid">
            {collections.map(col => (
              <Link to={'/collections/' + col.title} key={col.type} className="collection-card">
                <div className="col-img-wrap">
                  <span className="col-tag">{col.type}</span>
                  <img src={col.img} alt={col.title} />
                  <div className="col-overlay"></div>
                </div>
                <div className="col-info">
                  <div className="card-divider"></div>
                  <h3>{col.title}</h3>
                  <p>{col.desc}</p>
                  <span className="col-link">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="featured-section">
          <div className="container">
            <p className="section-label" style={{textAlign:'center'}}>Handpicked</p>
            <h2 className="section-title">Featured <span className="gold-text">Pieces</span></h2>
            <div className="divider"></div>
            <div className="products-grid">
              {featured.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
            <div className="centered-btn">
              <Link to="/collections" className="btn-primary">View All Collections</Link>
            </div>
          </div>
        </section>
      )}

      {/* About Strip */}
      <section className="about-strip">
        <div className="about-strip-img">
          <img src="https://images.unsplash.com/photo-1584705270952-33e7e2dcba54?w=800&q=80" alt="Store" />
          <div className="about-overlay-badge">
            <span className="badge-num">25+</span>
            <span className="badge-text">YEARS OF MASTERY</span>
          </div>
        </div>
        <div className="about-strip-text">
          <p className="section-label">Our Story</p>
          <h2>Born From a <span className="gold-text">Passion</span> for Perfection</h2>
          <div className="divider" style={{margin:'20px 0'}}></div>
          <p>Noble Diamonds was founded on a singular belief — that every person deserves to experience the magnificence of a perfectly crafted diamond. We source the world's finest stones, working with master jewellers to create heirloom-quality pieces.</p>
          <p style={{marginTop:'16px', color:'#9a8f7a'}}>From engagement rings that mark new beginnings to anniversary gifts that celebrate enduring love — Noble Diamonds has been part of life's most treasured moments for over two decades.</p>
          <div className="pillars-grid">
            {[
              ['◈', 'Finest Diamonds', 'Every stone personally selected for cut, clarity, colour, and carat.'],
              ['◉', 'Master Craftsmanship', 'Handcrafted by artisans with generations of jewellery expertise.'],
              ['◇', 'Certified Quality', 'All diamonds come with international grading certificates.'],
              ['♡', 'Legacy of Trust', 'Trusted by families across generations for life\'s most precious moments.'],
            ].map(([icon, title, desc]) => (
              <div className="pillar" key={title}>
                <span className="pillar-icon">{icon}</span>
                <div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/about" className="btn-primary" style={{marginTop:'32px', display:'inline-block'}}>Our Story</Link>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <p className="section-label">Bespoke Service</p>
          <h2>Create Your <span className="gold-text">Dream Piece</span></h2>
          <div className="divider"></div>
          <p>Our master craftsmen are ready to bring your vision to life. Book a private consultation today.</p>
          <Link to="/contact" className="btn-fill" style={{marginTop:'32px', display:'inline-block'}}>Book a Consultation</Link>
        </div>
      </section>
    </div>
  );
}
