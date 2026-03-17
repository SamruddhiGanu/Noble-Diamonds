const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  description: String,
  type: { type: String, enum: ['ENGAGEMENT', 'STATEMENT', 'SIGNATURE', 'CLASSIC'], unique: true },
  coverImage: String,
  active: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Collection', collectionSchema);
