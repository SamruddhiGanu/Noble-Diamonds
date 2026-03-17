import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { user, toggleWishlist } = useAuth();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [enquiry, setEnquiry] = useState({ name: user?.name || '', email: user?.email || '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);

  useEffect(() => {
    axios.get('/api/products/' + id).then(r => setProduct(r.data.product)).catch(() => {});
  }, [id]);

  if (!product) return <div className="detail-loading"><div className="loader-text">Loading...</div></div>;

  const images = product.images && product.images.length > 0 ? product.images : ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'];
  const isWishlisted = user && user.wishlist && user.wishlist.includes(product._id);

  const handleEnquiry = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('/api/enquiries', { ...enquiry, product: product._id });
      toast.success('Enquiry submitted! We will contact you soon.');
      setShowEnquiry(false);
    } catch { toast.error('Failed to submit enquiry'); }
    finally { setSubmitting(false); }
  };

  const handleWishlist = async () => {
    if (!user) { toast.error('Please login'); return; }
    await toggleWishlist(product._id);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <div className="product-detail">
      <div className="container detail-inner">
        <div className="detail-images">
          <div className="main-image">
            <img src={images[activeImg].startsWith('http') ? images[activeImg] : 'http://localhost:5000' + images[activeImg]} alt={product.name} />
            <span className="detail-collection-tag">{product.collectionType}</span>
          </div>
          {images.length > 1 && (
            <div className="thumb-row">
              {images.map((img, i) => (
                <button key={i} className={'thumb' + (activeImg === i ? ' active' : '')} onClick={() => setActiveImg(i)}>
                  <img src={img.startsWith('http') ? img : 'http://localhost:5000' + img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detail-info">
          <p className="detail-category">{product.category}</p>
          <h1 className="detail-name">{product.name}</h1>
          <div className="divider" style={{margin:'16px 0'}}></div>
          <p className="detail-price">₹{product.price.toLocaleString('en-IN')}</p>
          <p className="detail-desc">{product.description}</p>

          {product.specifications && Object.values(product.specifications).some(Boolean) && (
            <div className="spec-table">
              <h4>Specifications</h4>
              {Object.entries(product.specifications).map(([key, val]) => val ? (
                <div key={key} className="spec-row">
                  <span className="spec-key">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="spec-val">{val}</span>
                </div>
              ) : null)}
            </div>
          )}

          <div className="detail-actions">
            <button className="btn-fill" onClick={() => setShowEnquiry(true)}>Enquire About This Piece</button>
            <button className={'wishlist-btn' + (isWishlisted ? ' active' : '')} onClick={handleWishlist}>
              {isWishlisted ? '♥ Saved' : '♡ Save'}
            </button>
          </div>

          {showEnquiry && (
            <form className="enquiry-form" onSubmit={handleEnquiry}>
              <h3>Send Enquiry</h3>
              <input placeholder="Your Name *" value={enquiry.name} onChange={e => setEnquiry({...enquiry, name: e.target.value})} required />
              <input placeholder="Email *" type="email" value={enquiry.email} onChange={e => setEnquiry({...enquiry, email: e.target.value})} required />
              <input placeholder="Phone" value={enquiry.phone} onChange={e => setEnquiry({...enquiry, phone: e.target.value})} />
              <textarea placeholder="Message *" value={enquiry.message} onChange={e => setEnquiry({...enquiry, message: e.target.value})} required rows={4} />
              <div className="form-btns">
                <button type="submit" className="btn-fill" disabled={submitting}>{submitting ? 'Sending...' : 'Send'}</button>
                <button type="button" className="btn-primary" onClick={() => setShowEnquiry(false)}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="breadcrumb-bar">
        <Link to="/">Home</Link> / <Link to="/collections">Collections</Link> / {product.name}
      </div>
    </div>
  );
}
