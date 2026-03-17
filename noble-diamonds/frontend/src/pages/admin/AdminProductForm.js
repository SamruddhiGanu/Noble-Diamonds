import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Admin.css';

const CATEGORIES = ['Solitaire Rings', 'Drop Earrings', 'Diamond Necklaces', 'Tennis Bracelets', 'Pendants', 'Bangles'];
const COLLECTIONS = ['ENGAGEMENT', 'STATEMENT', 'SIGNATURE', 'CLASSIC'];

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: CATEGORIES[0],
    collectionType: COLLECTIONS[0], inStock: true, featured: false,
    tags: '',
    specifications: { caratWeight: '', clarity: '', color: '', cut: '', metal: '', certification: '' }
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (isEdit) {
      axios.get('/api/products/' + id).then(r => {
        const p = r.data.product;
        setForm({
          name: p.name, description: p.description, price: p.price,
          category: p.category, collectionType: p.collectionType,
          inStock: p.inStock, featured: p.featured,
          tags: (p.tags || []).join(', '),
          specifications: p.specifications || { caratWeight: '', clarity: '', color: '', cut: '', metal: '', certification: '' }
        });
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('description', form.description);
      fd.append('price', form.price);
      fd.append('category', form.category);
      fd.append('collectionType', form.collectionType);
      fd.append('inStock', form.inStock);
      fd.append('featured', form.featured);
      fd.append('tags', JSON.stringify(form.tags.split(',').map(t => t.trim()).filter(Boolean)));
      fd.append('specifications', JSON.stringify(form.specifications));
      images.forEach(img => fd.append('images', img));

      if (isEdit) {
        await axios.put('/api/products/' + id, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Product updated!');
      } else {
        await axios.post('/api/products', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Product created!');
      }
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save product');
    } finally { setLoading(false); }
  };

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));
  const setSpec = (field, val) => setForm(f => ({ ...f, specifications: { ...f.specifications, [field]: val } }));

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>{isEdit ? 'Edit' : 'Add New'} <span className="gold-text">Product</span></h1>
      </div>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-col">
            <div className="form-section">
              <h3>Basic Information</h3>
              <div className="form-group">
                <label>Product Name *</label>
                <input value={form.name} onChange={e => set('name', e.target.value)} required placeholder="e.g. Royal Solitaire Ring" />
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} required rows={5} placeholder="Describe this piece..." />
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input type="number" value={form.price} onChange={e => set('price', e.target.value)} required placeholder="150000" min="0" />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select value={form.category} onChange={e => set('category', e.target.value)}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Collection Type *</label>
                  <select value={form.collectionType} onChange={e => set('collectionType', e.target.value)}>
                    {COLLECTIONS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Tags (comma separated)</label>
                  <input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="classic, bridal, gift" />
                </div>
              </div>
              <div className="form-row-2">
                <div className="form-check">
                  <input type="checkbox" id="inStock" checked={form.inStock} onChange={e => set('inStock', e.target.checked)} />
                  <label htmlFor="inStock">In Stock</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" id="featured" checked={form.featured} onChange={e => set('featured', e.target.checked)} />
                  <label htmlFor="featured">Featured on Homepage</label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-col">
            <div className="form-section">
              <h3>Specifications</h3>
              {Object.keys(form.specifications).map(key => (
                <div className="form-group" key={key}>
                  <label>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                  <input value={form.specifications[key]} onChange={e => setSpec(key, e.target.value)} placeholder={key} />
                </div>
              ))}
            </div>
            <div className="form-section">
              <h3>Product Images</h3>
              <div className="image-upload-area" onClick={() => document.getElementById('imgInput').click()}>
                <span>◈</span>
                <p>Click to upload images</p>
                <small>JPEG, PNG, WebP · Max 5MB each · Up to 5 images</small>
              </div>
              <input id="imgInput" type="file" accept="image/*" multiple style={{display:'none'}} onChange={e => setImages(Array.from(e.target.files))} />
              {images.length > 0 && <p className="img-count">{images.length} image(s) selected</p>}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-primary" onClick={() => navigate('/admin/products')}>Cancel</button>
          <button type="submit" className="btn-fill" disabled={loading}>{loading ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}</button>
        </div>
      </form>
    </div>
  );
}
