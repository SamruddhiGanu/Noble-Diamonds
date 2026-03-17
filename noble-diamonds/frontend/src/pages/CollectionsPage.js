import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './CollectionsPage.css';

const CATEGORIES = ['All', 'Solitaire Rings', 'Drop Earrings', 'Diamond Necklaces', 'Tennis Bracelets', 'Pendants', 'Bangles'];

export default function CollectionsPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(category || 'All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (category) setActiveCategory(category);
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [activeCategory, search, page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 12 });
      if (activeCategory !== 'All') params.append('category', activeCategory);
      if (search) params.append('search', search);
      const { data } = await axios.get('/api/products?' + params);
      setProducts(data.products);
      setTotalPages(data.pages);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="collections-page">
      <div className="col-hero">
        <h1>Diamond <span className="gold-text">Collections</span></h1>
        <p>Discover our curated selection of exceptional diamond jewellery</p>
      </div>

      <div className="container col-body">
        <div className="col-filters">
          <div className="filter-tabs">
            {CATEGORIES.map(cat => (
              <button key={cat} className={'filter-tab' + (activeCategory === cat ? ' active' : '')} onClick={() => { setActiveCategory(cat); setPage(1); }}>
                {cat}
              </button>
            ))}
          </div>
          <input className="search-input" placeholder="Search pieces..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>

        {loading ? (
          <div className="products-loading">
            {[...Array(8)].map((_, i) => <div key={i} className="skeleton-card"></div>)}
          </div>
        ) : products.length === 0 ? (
          <div className="no-products">
            <span>◈</span>
            <p>No pieces found in this category</p>
          </div>
        ) : (
          <>
            <div className="products-grid-col">
              {products.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} className={'page-btn' + (page === i+1 ? ' active' : '')} onClick={() => setPage(i+1)}>{i+1}</button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
