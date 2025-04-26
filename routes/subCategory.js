const express = require("express");

// Access category params routes
const router = express.Router({ mergeParams: true });
const validate = require("../middlewares/validate");
const {
  getSubCategoryByIdSchema,
  createSubCategorySchema,
  updateSubCategorySchema,
  deleteSubCategorySchema,
} = require("../validators/subCategoryValidator");
const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../Controllers/subCategoryController");

router
  .route("/")
  .get(getSubCategories)
  .post(createSubCategorySchema, validate, createSubCategory);

router
  .route("/:id")
  .get(getSubCategoryByIdSchema, validate, getSubCategory)
  .put(updateSubCategorySchema, validate, updateSubCategory)
  .delete(deleteSubCategorySchema, validate, deleteSubCategory);

module.exports = router;
