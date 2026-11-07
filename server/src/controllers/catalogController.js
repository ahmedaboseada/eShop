const slugify = require('slugify');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Product = require('../models/Product');

async function listCategories(req, res, next) {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
}

async function createCategory(req, res, next) {
  try {
    const { name, image } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    const category = await Category.create({
      name,
      slug: slugify(name, { lower: true }),
      image,
    });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
}

async function listBrands(req, res, next) {
  try {
    const brands = await Brand.find().sort({ name: 1 });
    res.json({ success: true, data: brands });
  } catch (error) {
    next(error);
  }
}

async function createBrand(req, res, next) {
  try {
    const { name, image } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    const brand = await Brand.create({
      name,
      slug: slugify(name, { lower: true }),
      image,
    });
    res.status(201).json({ success: true, data: brand });
  } catch (error) {
    next(error);
  }
}

async function listProducts(req, res, next) {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 12, 1), 48);
    const skip = (page - 1) * limit;
    const filter = {};

    if (req.query.category) filter.category = req.query.category;
    if (req.query.brand) filter.brand = req.query.brand;
    if (req.query.q) {
      filter.$or = [
        { title: { $regex: req.query.q, $options: 'i' } },
        { description: { $regex: req.query.q, $options: 'i' } },
      ];
    }
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
    }

    const [items, total] = await Promise.all([
      Product.find(filter)
        .populate('category', 'name slug')
        .populate('brand', 'name slug')
        .sort(req.query.sort === 'price' ? { price: 1 } : { createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: {
        items,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit) || 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug')
      .populate('brand', 'name slug');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const {
      title,
      description,
      price,
      quantity,
      imageCover,
      images,
      category,
      brand,
      colors,
      priceAfterDiscount,
    } = req.body;

    if (!title || !description || price == null || !imageCover || !category) {
      return res.status(400).json({
        success: false,
        message: 'title, description, price, imageCover, and category are required',
      });
    }

    const product = await Product.create({
      title,
      slug: slugify(title, { lower: true }),
      description,
      price,
      quantity: quantity ?? 0,
      imageCover,
      images: images || [],
      category,
      brand,
      colors: colors || [],
      priceAfterDiscount,
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listCategories,
  createCategory,
  listBrands,
  createBrand,
  listProducts,
  getProduct,
  createProduct,
};
