const express = require("express");

const router = express.Router();
const productController = require("../Controllers/productController");
const {
  getProductByIdSchema,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
} = require("../validators/productValidator");

router
  .route("/")
  .get(productController.getProudcts)
  .post(createProductSchema, productController.createProduct);

router
  .route("/:id")
  .get(getProductByIdSchema, productController.getProductById)
  .put(updateProductSchema, productController.updateProduct)
  .delete(deleteProductSchema, productController.deleteProduct);

module.exports = router;
