import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { user, toggleWishlist } = useAuth();
  const isWishlisted = user && user.wishlist && user.wishlist.includes(product._id);

  const handleWishlist = async (e) => {
    e.preventDefault();
    if (!user) { toast.error('Please login to save items'); return; }
    try {
      await toggleWishlist(product._id);
      toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
    } catch { toast.error('Something went wrong'); }
  };

  const imgSrc = product.images && product.images[0]
    ? (product.images[0].startsWith('http') ? product.images[0] : 'http://localhost:5000' + product.images[0])
    : 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80';

  return (
    <Link to={'/product/' + product._id} className="product-card">
      <div className="card-image-wrap">
        <span className="card-collection-tag">{product.collectionType}</span>
        <img src={imgSrc} alt={product.name} className="card-img" />
        <button className={'card-wishlist' + (isWishlisted ? ' active' : '')} onClick={handleWishlist}>
          {isWishlisted ? '♥' : '♡'}
        </button>
        <div className="card-overlay">
          <span>View Details</span>
        </div>
      </div>
      <div className="card-info">
        <div className="card-divider"></div>
        <p className="card-category">{product.category}</p>
        <h3 className="card-name">{product.name}</h3>
        <p className="card-price">₹{product.price.toLocaleString('en-IN')}</p>
      </div>
    </Link>
  );
}
