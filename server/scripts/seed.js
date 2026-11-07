require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
require('dotenv').config();

const slugify = require('slugify');
const bcrypt = require('bcryptjs');
const connectDB = require('../src/config/db');
const Category = require('../src/models/Category');
const Brand = require('../src/models/Brand');
const Product = require('../src/models/Product');
const User = require('../src/models/User');

const productsSeed = [
  {
    title: 'Wireless Noise Cancelling Headphones',
    description: 'Premium over-ear headphones with active noise cancelling, 30-hour battery life, and plush memory foam cushions for all-day comfort.',
    price: 249.99,
    priceAfterDiscount: 199.99,
    quantity: 40,
    imageCover: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    images: ['https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800'],
    colors: ['black', 'silver'],
    categoryName: 'Electronics',
    brandName: 'AudioPeak',
  },
  {
    title: 'Minimal Leather Weekender Bag',
    description: 'Handcrafted full-grain leather weekender with brass hardware, spacious main compartment, and a padded laptop sleeve.',
    price: 189,
    quantity: 25,
    imageCover: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
    images: [],
    colors: ['tan', 'espresso'],
    categoryName: 'Fashion',
    brandName: 'Nord & Co',
  },
  {
    title: 'Ceramic Pour-Over Coffee Set',
    description: 'Matte ceramic dripper, matching carafe, and two cups. Designed for a clean, balanced brew every morning.',
    price: 68,
    quantity: 60,
    imageCover: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    images: [],
    colors: ['stone', 'ink'],
    categoryName: 'Home',
    brandName: 'Brewform',
  },
  {
    title: 'Trail Runner Pro Shoes',
    description: 'Lightweight trail runners with aggressive lugs, breathable mesh upper, and cushioned midsole for long distance comfort.',
    price: 129,
    priceAfterDiscount: 109,
    quantity: 55,
    imageCover: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    images: [],
    colors: ['crimson', 'slate'],
    categoryName: 'Sports',
    brandName: 'StrideLab',
  },
  {
    title: 'Smart Ambient Desk Lamp',
    description: 'Adjustable LED desk lamp with warm-to-cool temperature control, wireless charging base, and touch dimming.',
    price: 89,
    quantity: 35,
    imageCover: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
    images: [],
    colors: ['white', 'graphite'],
    categoryName: 'Home',
    brandName: 'Lumen Works',
  },
  {
    title: 'Organic Cotton Everyday Tee',
    description: 'Soft midweight organic cotton tee with a relaxed fit, reinforced seams, and a clean crew neckline.',
    price: 34,
    quantity: 120,
    imageCover: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    images: [],
    colors: ['ivory', 'navy', 'forest'],
    categoryName: 'Fashion',
    brandName: 'Nord & Co',
  },
];

async function seed() {
  await connectDB();
  await Promise.all([
    Category.deleteMany({}),
    Brand.deleteMany({}),
    Product.deleteMany({}),
  ]);

  const categoryNames = [...new Set(productsSeed.map((p) => p.categoryName))];
  const brandNames = [...new Set(productsSeed.map((p) => p.brandName))];

  const categories = {};
  for (const name of categoryNames) {
    categories[name] = await Category.create({
      name,
      slug: slugify(name, { lower: true }),
    });
  }

  const brands = {};
  for (const name of brandNames) {
    brands[name] = await Brand.create({
      name,
      slug: slugify(name, { lower: true }),
    });
  }

  for (const item of productsSeed) {
    await Product.create({
      title: item.title,
      slug: slugify(item.title, { lower: true }),
      description: item.description,
      price: item.price,
      priceAfterDiscount: item.priceAfterDiscount,
      quantity: item.quantity,
      imageCover: item.imageCover,
      images: item.images,
      colors: item.colors,
      category: categories[item.categoryName]._id,
      brand: brands[item.brandName]._id,
      ratingsAverage: 4.2 + Math.random() * 0.7,
      ratingsQuantity: Math.floor(Math.random() * 80) + 5,
    });
  }

  const adminEmail = 'admin@eshop.dev';
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: adminEmail,
      passwordHash: await bcrypt.hash('Admin123!', 10),
      role: 'admin',
    });
  }

  const demoEmail = 'demo@eshop.dev';
  let demo = await User.findOne({ email: demoEmail });
  if (!demo) {
    demo = await User.create({
      firstName: 'Demo',
      lastName: 'Shopper',
      email: demoEmail,
      passwordHash: await bcrypt.hash('Demo123!', 10),
      role: 'customer',
    });
  }

  console.log('Seed complete');
  console.log(`Admin: ${adminEmail} / Admin123!`);
  console.log(`Demo:  ${demoEmail} / Demo123!`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
