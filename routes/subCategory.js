const express = require("express");

const router = express.Router();
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

router.route("/").get(getSubCategories);
router
  .route("/:id")
  .get(getSubCategoryByIdSchema, validate, getSubCategory)
  .put(updateSubCategorySchema, validate, updateSubCategory)
  .delete(deleteSubCategorySchema, validate, deleteSubCategory);
router
  .route("/:categoryId")
  .post(createSubCategorySchema, validate, createSubCategory);

module.exports = router;
