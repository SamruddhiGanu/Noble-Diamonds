const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Product = require('./models/Product');
const Collection = require('./models/Collection');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/noble-diamonds';

const collections = [
  { title: 'Solitaire Rings', subtitle: 'Timeless Brilliance', description: 'Our solitaire rings feature hand-selected diamonds in classic and contemporary settings.', type: 'ENGAGEMENT', coverImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600', order: 1 },
  { title: 'Drop Earrings', subtitle: 'Statement Elegance', description: 'From classic studs to dramatic drops — our earring collection celebrates every occasion.', type: 'STATEMENT', coverImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600', order: 2 },
  { title: 'Diamond Necklaces', subtitle: 'Signature Radiance', description: 'Layered pendants and single-stone pieces that rest beautifully against the neckline.', type: 'SIGNATURE', coverImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600', order: 3 },
  { title: 'Tennis Bracelets', subtitle: 'Classic Luxury', description: 'A continuous arc of brilliant diamonds — the quintessential jewellery statement.', type: 'CLASSIC', coverImage: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600', order: 4 },
];

const products = [
  { name: 'Royal Solitaire Ring', description: 'A breathtaking 2-carat round brilliant solitaire set in 18k white gold. Hand-selected for exceptional fire and brilliance.', price: 450000, category: 'Solitaire Rings', collectionType: 'ENGAGEMENT', images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800'], specifications: { caratWeight: '2.0 ct', clarity: 'VS1', color: 'F', cut: 'Excellent', metal: '18k White Gold', certification: 'GIA' }, featured: true, inStock: true },
  { name: 'Cascade Drop Earrings', description: 'Dramatic teardrop diamond earrings that move beautifully with every gesture. A true statement piece.', price: 185000, category: 'Drop Earrings', collectionType: 'STATEMENT', images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800'], specifications: { caratWeight: '1.4 ct total', clarity: 'VS2', color: 'G', cut: 'Very Good', metal: '18k Rose Gold', certification: 'IGI' }, featured: true, inStock: true },
  { name: 'Empress Pendant Necklace', description: 'A hexagonal halo pendant featuring a cushion-cut diamond surrounded by brilliant pavé stones on a delicate chain.', price: 320000, category: 'Diamond Necklaces', collectionType: 'SIGNATURE', images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800'], specifications: { caratWeight: '1.8 ct total', clarity: 'VVS2', color: 'E', cut: 'Excellent', metal: '18k Yellow Gold', certification: 'GIA' }, featured: true, inStock: true },
  { name: 'Heritage Tennis Bracelet', description: 'A timeless tennis bracelet featuring 52 perfectly matched round brilliant diamonds in a continuous prong setting.', price: 680000, category: 'Tennis Bracelets', collectionType: 'CLASSIC', images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800'], specifications: { caratWeight: '5.2 ct total', clarity: 'VS1-VS2', color: 'F-G', cut: 'Excellent', metal: '18k White Gold', certification: 'IGI' }, featured: true, inStock: true },
  { name: 'Constellation Stud Earrings', description: 'Classic round brilliant diamond studs in a four-prong martini setting. A wardrobe essential in 18k gold.', price: 95000, category: 'Drop Earrings', collectionType: 'CLASSIC', images: ['https://images.unsplash.com/photo-1588444650733-d0b21f6c1b34?w=800'], specifications: { caratWeight: '0.8 ct total', clarity: 'SI1', color: 'H', cut: 'Very Good', metal: '18k White Gold', certification: 'GIA' }, inStock: true },
  { name: 'Infinity Band Ring', description: 'A sleek eternity band featuring channel-set princess cut diamonds that symbolise endless love.', price: 220000, category: 'Solitaire Rings', collectionType: 'CLASSIC', images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800'], specifications: { caratWeight: '1.0 ct total', clarity: 'VS2', color: 'G', cut: 'Excellent', metal: 'Platinum', certification: 'GIA' }, inStock: true },
  { name: 'Riviere Diamond Necklace', description: 'A stunning rivière necklace with graduated round brilliant diamonds creating an elegant, flowing silhouette.', price: 580000, category: 'Diamond Necklaces', collectionType: 'SIGNATURE', images: ['https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=800'], specifications: { caratWeight: '4.5 ct total', clarity: 'VVS1', color: 'D', cut: 'Excellent', metal: 'Platinum', certification: 'GIA' }, inStock: true },
  { name: 'Celestial Bangle', description: 'A rigid bangle adorned with scattered round brilliant diamonds set in a celestial pattern evoking a starry night sky.', price: 290000, category: 'Bangles', collectionType: 'STATEMENT', images: ['https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=800'], specifications: { caratWeight: '2.2 ct total', clarity: 'VS1', color: 'F', cut: 'Very Good', metal: '18k Yellow Gold', certification: 'IGI' }, inStock: true },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Product.deleteMany({});
    await Collection.deleteMany({});

    // Admin user
    await User.create({ name: 'Admin User', email: 'admin@noblediamonds.com', password: 'admin123', role: 'admin' });
    console.log('✅ Admin user created: admin@noblediamonds.com / admin123');

    await Collection.insertMany(collections);
    console.log('✅ Collections seeded');

    await Product.insertMany(products);
    console.log('✅ Products seeded');

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
