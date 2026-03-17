import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import './WishlistPage.css';

export default function WishlistPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.wishlist && user.wishlist.length > 0) {
      Promise.all(user.wishlist.map(id => axios.get('/api/products/' + id).then(r => r.data.product).catch(() => null)))
        .then(items => setProducts(items.filter(Boolean)))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="wishlist-page">
      <div className="wishlist-hero">
        <p className="section-label">Saved Pieces</p>
        <h1>My <span className="gold-text">Wishlist</span></h1>
      </div>
      <div className="container" style={{padding:'60px 40px'}}>
        {loading ? <p style={{color:'#9a8f7a', textAlign:'center'}}>Loading...</p>
        : products.length === 0
          ? <div className="empty-wishlist"><span>♡</span><p>Your wishlist is empty</p></div>
          : <div className="products-grid">{products.map(p => <ProductCard key={p._id} product={p} />)}</div>
        }
      </div>
    </div>
  );
}
