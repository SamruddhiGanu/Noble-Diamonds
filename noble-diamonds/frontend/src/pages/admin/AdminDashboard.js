import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/stats').then(r => { setStats(r.data.stats); setEnquiries(r.data.recentEnquiries); }).catch(() => {});
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin <span className="gold-text">Dashboard</span></h1>
        <div className="admin-nav">
          <Link to="/admin/products" className="btn-primary">Manage Products</Link>
          <Link to="/admin/enquiries" className="btn-primary">View Enquiries</Link>
        </div>
      </div>
      <div className="admin-stats">
        {stats && [
          ['◈', 'Total Products', stats.totalProducts],
          ['✉', 'Total Enquiries', stats.totalEnquiries],
          ['⏳', 'Pending Enquiries', stats.pendingEnquiries],
          ['♡', 'Registered Users', stats.totalUsers],
        ].map(([icon, label, val]) => (
          <div key={label} className="stat-card">
            <span className="stat-icon">{icon}</span>
            <span className="stat-value">{val}</span>
            <span className="stat-label">{label}</span>
          </div>
        ))}
      </div>
      <div className="admin-section">
        <h2>Recent Enquiries</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Email</th><th>Product</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {enquiries.map(e => (
                <tr key={e._id}>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.product?.name || '—'}</td>
                  <td><span className={'status-badge ' + e.status}>{e.status}</span></td>
                  <td>{new Date(e.createdAt).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
