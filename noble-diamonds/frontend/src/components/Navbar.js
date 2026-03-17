import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className={'navbar' + (scrolled ? ' scrolled' : '')}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <div className="logo-icon">◈</div>
          <div className="logo-text">
            <span className="logo-name">NOBLE</span>
            <span className="logo-sub">DIAMONDS</span>
          </div>
        </Link>

        <div className={'nav-links' + (menuOpen ? ' open' : '')}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/collections" className="nav-link">Collections</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Get In Touch</Link>
          {isAdmin && <Link to="/admin" className="nav-link admin-link">Admin</Link>}
          {user && <Link to="/wishlist" className="nav-link">Wishlist</Link>}
          {user
            ? <button className="nav-link logout-btn" onClick={handleLogout}>Logout</button>
            : <Link to="/login" className="nav-link">Login</Link>
          }
        </div>

        <Link to="/contact" className="btn-primary nav-cta">ENQUIRE NOW</Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
