const slugify = require("slugify");
const Brand = require("../models/Brand");

class BrandService {
  async createBrand(name) {
    const existingBrand = await Brand.findOne({
      name: name,
    });
    if (existingBrand) {
      const error = new Error("Brand already exists");
      error.code = 400;
      throw error;
    }
    const newBrand = await Brand.create({
      name: name,
      slug: slugify(name),
    });

    return newBrand;
  }

  async findAll(req) {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const brands = await Brand.find().skip(skip).limit(limit);
    if (brands) return { results: brands.length, page, data: brands };
    const error = new Error("No data found");
    error.code = 404;
    throw error;
  }

  async findById(id) {
    const brand = await Brand.findById(id);
    if (!brand) {
      const error = new Error("Brand not found");
      error.code = 404;
      throw error;
    }
    return brand;
  }

  async updateBrand(id, name) {
    const brand = await Brand.findByIdAndUpdate(
      id,
      {
        name: name,
        slug: slugify(name),
      },
      { new: true },
    );
    if (!brand) {
      const error = new Error("Brand not found");
      error.code = 404;
      throw error;
    }
    return brand;
  }

  async deleteBrand(id) {
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
      const error = new Error("Brand not found");
      error.code = 404;
      throw error;
    }
    return brand;
  }
}

module.exports = new BrandService();
