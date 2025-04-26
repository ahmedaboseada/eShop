const { check } = require("express-validator");

const validator = require("../middlewares/validate");

exports.createProductSchema = [
  check("title")
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars long"),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 20 })
    .withMessage("Product description must be at least 20 character long")
    .isLength({ max: 2000 })
    .withMessage("Product description must be at most 2000 character long"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product sold must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isFloat({ max: 2 ** 53 })
    .withMessage("Product price is too long"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product price after discount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (value >= req.body.price) {
        throw new Error(
          "Price after discount must be less than the original price",
        );
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("Product colors must be an array of strings"),
  check("imageCover")
    .notEmpty()
    .withMessage("Product image cover is required")
    .isString()
    .withMessage("Product image cover must be a string"),
  check("images")
    .optional()
    .isArray()
    .withMessage("Product images must be an array of strings"),
  check("category")
    .notEmpty()
    .withMessage("Product category is required")
    .isMongoId()
    .withMessage("Invalid category ID"),
  check("subCategory")
    .optional()
    .isMongoId()
    .withMessage("Invalid subCategory"),
  check("brand").optional().isMongoId().withMessage("Invalid brand ID"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("Product ratings average must be a number")
    .isFloat({ min: 1 })
    .withMessage("Product ratings average must be at least 1")
    .isFloat({ max: 5 })
    .withMessage("Product ratings average must be at most 5"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("Product ratings quantity must be a number"),
  validator,
];

exports.getProductByIdSchema = [
  check("id")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid Product ID"),
  validator,
];

exports.updateProductSchema = [
  check("id")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid Product ID"),
  validator,
];

exports.deleteProductSchema = [
  check("id")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid Product ID"),
  validator,
];
