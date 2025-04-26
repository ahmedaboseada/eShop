const { param, body } = require("express-validator");

// @desc Validation schema for getting a category by ID
const getBrandByIdSchema = [
  param("id").isMongoId().withMessage("Invalid Brand ID"),
];

// @desc Validation schema for creating a category (example)
const createBrandSchema = [
  body("name")
    .notEmpty()
    .withMessage("Brand name is required")
    .isString()
    .withMessage("Brand name must be a string")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Brand name must be between 2 and 50 characters"),
];

// @desc Validation schema for updating a category (example)
const updateBrandSchema = [
  param("id").isMongoId().withMessage("Invalid Brand ID"),
  body("name")
    .optional()
    .isString()
    .withMessage("Brand name must be a string")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Brand name must be between 2 and 50 characters"),
];

// @desc Validation schema for deleting a category (example)
const deleteBrandSchema = [
  param("id").isMongoId().withMessage("Invalid Brand ID"),
];

module.exports = {
  getBrandByIdSchema,
  createBrandSchema,
  updateBrandSchema,
  deleteBrandSchema,
};
