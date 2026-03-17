const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: {
    type: String,
    required: true,
    enum: ['Solitaire Rings', 'Drop Earrings', 'Diamond Necklaces', 'Tennis Bracelets', 'Pendants', 'Bangles']
  },
  collectionType: {
    type: String,
    enum: ['ENGAGEMENT', 'STATEMENT', 'SIGNATURE', 'CLASSIC'],
    required: true
  },
  images: [{ type: String }],
  specifications: {
    caratWeight: String,
    clarity: String,
    color: String,
    cut: String,
    metal: String,
    certification: String
  },
  inStock: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

productSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
