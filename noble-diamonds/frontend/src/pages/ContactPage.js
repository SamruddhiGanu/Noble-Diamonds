import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import './ContactPage.css';

export default function ContactPage() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/enquiries', form);
      toast.success('Your enquiry has been received. We will be in touch shortly.');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch { toast.error('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <p className="section-label">Reach Out</p>
        <h1>Get In <span className="gold-text">Touch</span></h1>
      </div>
      <div className="contact-body container">
        <div className="contact-info">
          <h2>We'd Love to Hear From You</h2>
          <div className="divider" style={{margin:'16px 0'}}></div>
          <p>Whether you're looking for a bespoke engagement ring, a special anniversary gift, or simply want to explore our collections — our team is here to guide you.</p>
          <div className="info-cards">
            {[
              ['◈', 'Visit Us', 'Noble Diamonds Showroom\n123, Diamond District\nMumbai, Maharashtra 400001'],
              ['✆', 'Call Us', '+91 98765 43210\nMon–Sat: 10am – 7pm'],
              ['✉', 'Email Us', 'enquiries@noblediamonds.com\nWe respond within 24 hours'],
            ].map(([icon, title, text]) => (
              <div key={title} className="info-card">
                <span className="info-icon">{icon}</span>
                <div>
                  <h4>{title}</h4>
                  <p style={{whiteSpace:'pre-line'}}>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send an Enquiry</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="Your name" />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required placeholder="your@email.com" />
            </div>
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91 00000 00000" />
          </div>
          <div className="form-group">
            <label>Message *</label>
            <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} required rows={6} placeholder="Tell us about the piece you're looking for, or ask us anything..." />
          </div>
          <button type="submit" className="btn-fill" disabled={loading} style={{width:'100%', padding:'16px'}}>
            {loading ? 'Sending...' : 'Send Enquiry'}
          </button>
        </form>
      </div>
    </div>
  );
}
