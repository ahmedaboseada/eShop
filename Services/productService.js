const slugify = require("slugify");
const Product = require("../models/Product");

class ProductService {
  async getProducts(req) {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .populate("category", "name -_id")
      .populate("subCategory", "name -_id")
      .populate("brand", "name -_id");
    if (products) return { results: products.length, page, data: products };
    const error = new Error("No data found");
    error.code = 404;
    throw error;
  }

  async getProductById(id) {
    const product = await Product.findById(id)
      .populate("category", "name -_id")
      .populate("subCategory", "name -_id")
      .populate("brand", "name -_id");
    if (!product) {
      const error = new Error("Product not found");
      error.code = 404;
      throw error;
    }
    return product;
  }

  async createProduct(data) {
    const existingProduct = await Product.findOne({ title: data.title });
    if (existingProduct) {
      const error = new Error("Product already exists");
      error.code = 400;
      throw error;
    }
    data.slug = slugify(data.title);
    const product = await Product.create(data);
    return product;
  }

  async updateProduct(id, data) {
    data.slug = slugify(data.title);
    const product = await Product.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!product) {
      const error = new Error("Product not found");
      error.code = 404;
      throw error;
    }
    return product;
  }

  async deleteProduct(id) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      const error = new Error("Product not found");
      error.code = 404;
      throw error;
    }
    return product;
  }
}

module.exports = new ProductService();
