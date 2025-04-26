const express = require("express");

const router = express.Router();
const validate = require("../middlewares/validate");
const {
  getCategoryByIdSchema,
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
} = require("../validators/categoryValidator");
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../Controllers/categoryController");
const subCategoriesRoute = require("./subCategory");

router
  .route("/")
  .get(getCategories)
  .post(createCategorySchema, validate, createCategory);
router
  .route("/:id")
  .get(getCategoryByIdSchema, validate, getCategory)
  .put(updateCategorySchema, validate, updateCategory)
  .delete(deleteCategorySchema, validate, deleteCategory);

router.use("/:categoryId/subcategories", subCategoriesRoute);

module.exports = router;
