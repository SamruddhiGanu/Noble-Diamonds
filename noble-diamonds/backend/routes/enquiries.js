const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const { protect, adminOnly } = require('../middleware/auth');

// @POST /api/enquiries
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, product } = req.body;
    if (!name || !email || !message) return res.status(400).json({ success: false, message: 'Name, email and message are required' });
    const enquiry = await Enquiry.create({ name, email, phone, message, product });
    res.status(201).json({ success: true, message: 'Enquiry submitted successfully', enquiry });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @GET /api/enquiries (admin)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    const enquiries = await Enquiry.find(query)
      .populate('product', 'name category price')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Enquiry.countDocuments(query);
    res.json({ success: true, enquiries, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @PUT /api/enquiries/:id (admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    res.json({ success: true, enquiry });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
