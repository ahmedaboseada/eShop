const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// Create Schema
const BrandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required"],
      minLength: [2, "Too short brand name"],
      maxLength: [32, "Too long brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true, // Created At, Updated At
  },
);
//Create model
const Brand = mongoose.model("Brand", BrandSchema);
// Export model
module.exports = Brand;
