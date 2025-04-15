const slugify = require("slugify");
const Category = require("../models/Category");

class CategoryService {
  async createCategory(name) {
    const existingCategory = await Category.findOne({
      name: name,
    });
    if (existingCategory) {
      const error = new Error("Category already exists");
      error.code = 400;
      throw error;
    }
    const newCategory = await Category.create({
      name: name,
      slug: slugify(name),
    });

    return newCategory;
  }

  async findAll(req) {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const categories = await Category.find().skip(skip).limit(limit);
    if (categories)
      return { results: categories.length, page, data: categories };
    const error = new Error("No data found");
    error.code = 404;
    throw error;
  }

  async findById(id) {
    const category = await Category.findById(id);
    if (!category) {
      const error = new Error("Category not found");
      error.code = 404;
      throw error;
    }
    return category;
  }

  async updateCategory(id, name) {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name: name,
        slug: slugify(name),
      },
      { new: true },
    );
    if (!category) {
      const error = new Error("Category not found");
      error.code = 404;
      throw error;
    }
    return category;
  }

  async deleteCategory(id) {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      const error = new Error("Category not found");
      error.code = 404;
      throw error;
    }
    return category;
  }
}

module.exports = new CategoryService();
