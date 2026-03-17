const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Enquiry = require('../models/Enquiry');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

// @GET /api/admin/stats
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const [totalProducts, totalEnquiries, pendingEnquiries, totalUsers] = await Promise.all([
      Product.countDocuments(),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'pending' }),
      User.countDocuments({ role: 'user' })
    ]);
    const recentEnquiries = await Enquiry.find()
      .sort('-createdAt').limit(5).populate('product', 'name');
    res.json({ success: true, stats: { totalProducts, totalEnquiries, pendingEnquiries, totalUsers }, recentEnquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @GET /api/admin/users
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort('-createdAt');
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
