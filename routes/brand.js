const express = require("express");

const router = express.Router();
const validate = require("../middlewares/validate");
const {
  getBrandByIdSchema,
  createBrandSchema,
  updateBrandSchema,
  deleteBrandSchema,
} = require("../validators/brandValidator");
const {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../Controllers/brandController");

router.route("/").get(getBrands).post(createBrandSchema, validate, createBrand);
router
  .route("/:id")
  .get(getBrandByIdSchema, validate, getBrand)
  .put(updateBrandSchema, validate, updateBrand)
  .delete(deleteBrandSchema, validate, deleteBrand);

module.exports = router;
