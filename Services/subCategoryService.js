const slugify = require("slugify");
const SubCategory = require("../models/subCategory");
const Category = require("../models/Category");

class SubCategoryService {
  async createSubCategory(name, categoryId) {
    const existingSubCategory = await SubCategory.findOne({
      name: name,
    });
    if (existingSubCategory) {
      const error = new Error("SubCategory already exists");
      error.code = 400;
      throw error;
    }
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      const error = new Error("Category not found");
      error.code = 404;
      throw error;
    }
    const newSubCategory = await SubCategory.create({
      name: name,
      slug: slugify(name),
      category: categoryId,
    });

    return newSubCategory;
  }

  async findAll(req) {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;

    let filterObj = {};
    if (req.params.categoryId) {
      filterObj.category = req.params.categoryId;
    }

    const subCategories = await SubCategory.find(filterObj)
      .skip(skip)
      .limit(limit);
    // .populate({
    //   path: "category",
    //   select: "name -_id",
    // });
    if (subCategories)
      return { results: subCategories.length, page, data: subCategories };
    const error = new Error("No data found");
    error.code = 404;
    throw error;
  }

  async findById(id) {
    const subCategory = await SubCategory.findById(id);
    if (!subCategory) {
      const error = new Error("SubCategory not found");
      error.code = 404;
      throw error;
    }
    return subCategory;
  }

  async updateSubCategory(id, name) {
    const subCategory = await SubCategory.findByIdAndUpdate(
      id,
      {
        name: name,
        slug: slugify(name),
      },
      { new: true },
    );
    if (!subCategory) {
      const error = new Error("SubCategory not found");
      error.code = 404;
      throw error;
    }
    return subCategory;
  }

  async deleteSubCategory(id) {
    const subCategory = await SubCategory.findByIdAndDelete(id);
    if (!subCategory) {
      const error = new Error("SubCategory not found");
      error.code = 404;
      throw error;
    }
    return subCategory;
  }
}

module.exports = new SubCategoryService();
