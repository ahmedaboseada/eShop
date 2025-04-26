const AsyncHandler = require("express-async-handler");
const productServicer = require("../Services/productService");
const responseWrapper = require("../utils/responseWrapper");
const responseTypes = require("../utils/responseTypes");
const ApiError = require("../utils/apiError");

const createProduct = AsyncHandler(async (req, res, next) => {
  const data = req.body;
  await productServicer
    .createProduct(data)
    .then((result) =>
      responseWrapper(
        res,
        responseTypes.CREATED,
        "Product created successfully",
        result,
      ),
    )
    .catch((error) => {
      const statusCode = error.code || responseTypes.SERVER_ERROR.code;
      const message =
        statusCode === 400 ? error.message : responseTypes.SERVER_ERROR.message;
      return next(new ApiError(message, statusCode));
    });
});

const getProudcts = AsyncHandler(async (req, res, next) => {
  await productServicer
    .getProducts(req)
    .then((result) =>
      responseWrapper(
        res,
        responseTypes.SUCCESS,
        "Products list fetched successfully",
        result,
      ),
    )
    .catch((err) => {
      const statusCode = err.code || 500;
      const message = [400, 404].includes(statusCode)
        ? err.message
        : responseTypes.SERVER_ERROR.message;
      return next(new ApiError(message, statusCode));
    });
});

const getProductById = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await productServicer
    .getProductById(id)
    .then((product) => {
      responseWrapper(
        res,
        responseTypes.SUCCESS,
        "Product fetched successfully",
        product,
      );
    })
    .catch((err) => {
      const statusCode = err.code || 500;
      const message =
        statusCode === 404 ? err.message : responseTypes.SERVER_ERROR.message;
      return next(new ApiError(message, statusCode));
    });
});

const updateProduct = AsyncHandler(async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;
  await productServicer
    .updateProduct(id, data)
    .then((result) =>
      responseWrapper(
        res,
        responseTypes.SUCCESS,
        "Product updated successfully",
        result,
      ),
    )
    .catch((error) => {
      const statusCode = error.code || responseTypes.SERVER_ERROR.code;
      const message =
        statusCode === 400 ? error.message : responseTypes.SERVER_ERROR.message;
      return next(new ApiError(message, statusCode));
    });
});

const deleteProduct = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await productServicer
    .deleteProduct(id)
    .then((result) =>
      responseWrapper(
        res,
        responseTypes.SUCCESS,
        "Product deleted successfully",
        result,
      ),
    )
    .catch((error) => {
      const statusCode = error.code || responseTypes.SERVER_ERROR.code;
      const message =
        statusCode === 400 ? error.message : responseTypes.SERVER_ERROR.message;
      return next(new ApiError(message, statusCode));
    });
});

// const getProductsByCategory = AsyncHandler(async (req, res, next) => {
//   await productServicer.getProductsByCategory();
// });
//
// const getProductsBySubCategory = AsyncHandler(async (req, res, next) => {
//   await productServicer.getProductsBySubCategory();
// });
//
// const getProductsByBrand = AsyncHandler(async (req, res, next) => {
//   await productServicer.getProductsByBrand();
// });
//
// const getProductsByPriceRange = AsyncHandler(async (req, res, next) => {
//   await productServicer.getProductsByPriceRange();
// });
//
// const getProductsByRating = AsyncHandler(async (req, res, next) => {
//   await productServicer.getProductsByRating();
// });
//
// const getProductsBySearch = AsyncHandler(async (req, res, next) => {
//   await productServicer.getProductsBySearch();
// });
//
// const getProductsBySort = AsyncHandler(async (req, res, next) => {
//   await productServicer.getProductsBySort();
// });

module.exports = {
  createProduct,
  getProudcts,
  getProductById,
  updateProduct,
  deleteProduct,
  // getProductsByCategory,
  // getProductsBySubCategory,
  // getProductsByBrand,
  // getProductsByPriceRange,
  // getProductsByRating,
  // getProductsBySearch,
  // getProductsBySort,
};
