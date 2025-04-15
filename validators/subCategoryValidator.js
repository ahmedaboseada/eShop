const { param, body } = require("express-validator");

// @desc Validation schema for getting a category by ID
const getSubCategoryByIdSchema = [
  param("id").isMongoId().withMessage("Invalid Category ID"),
];

// @desc Validation schema for creating a category (example)
const createSubCategorySchema = [
  body("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isString()
    .withMessage("Category name must be a string")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Category name must be between 3 and 50 characters"),
  param("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid Category ID"),
];

// @desc Validation schema for updating a category (example)
const updateSubCategorySchema = [
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
const deleteSubCategorySchema = [
  param("id").isMongoId().withMessage("Invalid Category ID"),
];

module.exports = {
  getSubCategoryByIdSchema,
  createSubCategorySchema,
  updateSubCategorySchema,
  deleteSubCategorySchema,
};
