const mongoose = require("mongoose");

const { Schema } = mongoose;
const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [100, "Title must be at most 100 characters long"],
  },
  slug: {
    type: String,
    required: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    trim: true,
    minlength: [20, "Product description must be at least 20 characters long"],
    maxlength: [
      2000,
      "Product description must be at most 2000 characters long",
    ],
  },
  quantity: {
    type: Number,
    required: [true, "Product quantity is required"],
    default: 0,
  },
  sold: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    trim: true,
    max: [2 ** 53, "Product price is too long"],
  },
  priceAfterDiscount: {
    type: Number,
  },
  colors: [String],
  imageCover: {
    type: String,
    required: [true, "Product image cover is required"],
  },
  images: [String],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Product must belong to a category"],
  },
  subCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  ratingsAverage: {
    type: Number,
    default: 1.0,
    min: [1, "Rating must be above or equal 1.0"],
    max: [5, "Rating must be below or equal 5.0"],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
});
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
