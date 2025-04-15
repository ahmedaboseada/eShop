const { param, body } = require("express-validator");

// @desc Validation schema for getting a category by ID
const getCategoryByIdSchema = [
  param("id").isMongoId().withMessage("Invalid Category ID"),
];

// @desc Validation schema for creating a category (example)
const createCategorySchema = [
  body("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isString()
    .withMessage("Category name must be a string")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Category name must be between 3 and 50 characters"),
];

// @desc Validation schema for updating a category (example)
const updateCategorySchema = [
  param("id").isMongoId().withMessage("Invalid Category ID"),
  body("name")
    .optional()
    .isString()
    .withMessage("Category name must be a string")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Category name must be between 3 and 50 characters"),
];

// @desc Validation schema for deleting a category (example)
const deleteCategorySchema = [
  param("id").isMongoId().withMessage("Invalid Category ID"),
];

module.exports = {
  getCategoryByIdSchema,
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
};
