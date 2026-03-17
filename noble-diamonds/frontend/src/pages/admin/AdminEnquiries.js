import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Admin.css';

const STATUS_OPTIONS = ['pending', 'responded', 'closed'];

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => { fetchEnquiries(); }, [filter]);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const params = filter ? '?status=' + filter : '';
      const { data } = await axios.get('/api/enquiries' + params);
      setEnquiries(data.enquiries);
    } finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put('/api/enquiries/' + id, { status });
      setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status } : e));
      if (selected?._id === id) setSelected(prev => ({ ...prev, status }));
      toast.success('Status updated');
    } catch { toast.error('Failed to update'); }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Customer <span className="gold-text">Enquiries</span></h1>
        <div className="filter-tabs">
          <button className={'filter-tab' + (filter === '' ? ' active' : '')} onClick={() => setFilter('')}>All</button>
          {STATUS_OPTIONS.map(s => (
            <button key={s} className={'filter-tab' + (filter === s ? ' active' : '')} onClick={() => setFilter(s)}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="enquiries-layout">
        <div className="enquiries-list">
          {loading ? <p style={{color:'#9a8f7a', padding:'20px'}}>Loading...</p> :
            enquiries.map(e => (
              <div key={e._id} className={'enquiry-item' + (selected?._id === e._id ? ' active' : '')} onClick={() => setSelected(e)}>
                <div className="enq-top">
                  <span className="enq-name">{e.name}</span>
                  <span className={'status-badge ' + e.status}>{e.status}</span>
                </div>
                <p className="enq-email">{e.email}</p>
                <p className="enq-preview">{e.message.slice(0, 80)}...</p>
                <p className="enq-date">{new Date(e.createdAt).toLocaleDateString('en-IN')}</p>
              </div>
            ))
          }
        </div>

        <div className="enquiry-detail">
          {selected ? (
            <>
              <div className="enq-detail-header">
                <div>
                  <h3>{selected.name}</h3>
                  <p>{selected.email} {selected.phone && '· ' + selected.phone}</p>
                </div>
                <span className={'status-badge ' + selected.status}>{selected.status}</span>
              </div>
              {selected.product && <div className="enq-product">Re: {selected.product.name}</div>}
              <div className="enq-message">{selected.message}</div>
              <div className="enq-actions">
                <p style={{color:'#9a8f7a', fontSize:'11px', letterSpacing:'2px', marginBottom:'10px'}}>UPDATE STATUS</p>
                <div className="status-btns">
                  {STATUS_OPTIONS.map(s => (
                    <button key={s} className={'status-btn' + (selected.status === s ? ' active' : '')} onClick={() => updateStatus(selected._id, s)}>
                      {s}
                    </button>
                  ))}
                </div>
                <a href={'mailto:' + selected.email} className="btn-fill" style={{display:'inline-block', marginTop:'20px', fontSize:'11px', letterSpacing:'2px'}}>Reply via Email</a>
              </div>
            </>
          ) : (
            <div className="enq-empty">
              <span>✉</span>
              <p>Select an enquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
