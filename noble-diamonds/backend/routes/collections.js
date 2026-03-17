const express = require('express');
const router = express.Router();
const Collection = require('../models/Collection');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
  try {
    const collections = await Collection.find({ active: true }).sort('order');
    res.json({ success: true, collections });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', protect, adminOnly, upload.single('coverImage'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.coverImage = `/uploads/${req.file.filename}`;
    const collection = await Collection.create(data);
    res.status(201).json({ success: true, collection });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/:id', protect, adminOnly, upload.single('coverImage'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.coverImage = `/uploads/${req.file.filename}`;
    const collection = await Collection.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json({ success: true, collection });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Collection.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Collection deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
