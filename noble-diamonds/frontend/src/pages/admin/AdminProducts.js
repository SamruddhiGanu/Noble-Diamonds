import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Admin.css';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products?limit=50');
      setProducts(data.products);
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete('/api/products/' + id);
      toast.success('Product deleted');
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch { toast.error('Failed to delete'); }
  };

  const toggleFeatured = async (product) => {
    try {
      await axios.put('/api/products/' + product._id, { featured: !product.featured });
      setProducts(prev => prev.map(p => p._id === product._id ? { ...p, featured: !p.featured } : p));
    } catch { toast.error('Failed to update'); }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Manage <span className="gold-text">Products</span></h1>
        <Link to="/admin/products/new" className="btn-fill">+ Add Product</Link>
      </div>
      {loading ? <p style={{color:'#9a8f7a'}}>Loading...</p> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Collection</th><th>Featured</th><th>Actions</th></tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td>
                    <div className="prod-thumb">
                      <img src={p.images?.[0] ? (p.images[0].startsWith('http') ? p.images[0] : 'http://localhost:5000' + p.images[0]) : 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=60&q=60'} alt={p.name} />
                    </div>
                  </td>
                  <td className="prod-name">{p.name}</td>
                  <td>{p.category}</td>
                  <td>₹{p.price.toLocaleString('en-IN')}</td>
                  <td><span className="collection-badge">{p.collectionType}</span></td>
                  <td>
                    <button className={'featured-btn' + (p.featured ? ' on' : '')} onClick={() => toggleFeatured(p)}>
                      {p.featured ? '★' : '☆'}
                    </button>
                  </td>
                  <td>
                    <div className="action-btns">
                      <Link to={'/admin/products/edit/' + p._id} className="edit-btn">Edit</Link>
                      <button className="del-btn" onClick={() => handleDelete(p._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
