const AsyncHandler = require("express-async-handler");
const brandService = require("../Services/brandService");
const responseWrapper = require("../utils/responseWrapper");
const responseTypes = require("../utils/responseTypes");
const ApiError = require("../utils/apiError");

// @desc Create Brand
// @route POST /api/v1/brands
// @access Private
const createBrand = AsyncHandler(async (req, res, next) => {
  const { name } = req.body;
  await brandService
    .createBrand(name)
    .then((result) =>
      responseWrapper(
        res,
        responseTypes.CREATED,
        "Brand created successfully",
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

// @desc Get list of brands
// @route GET /api/v1/brands
// @access Public
const getBrands = AsyncHandler(async (req, res, next) => {
  await brandService
    .findAll(req)
    .then((result) =>
      responseWrapper(
        res,
        responseTypes.SUCCESS,
        "Brands list fetched successfully",
        result,
      ),
    )
    .catch((err) => {
      const statusCode = err.code || 500;
      const message =
        statusCode === 404 ? err.message : responseTypes.SERVER_ERROR.message;
      return next(new ApiError(message, statusCode));
    });
});

// @desc Get a specific brand
// @route GET /api/v1/brands/:id
// @access Public
const getBrand = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await brandService
    .findById(id)
    .then((result) =>
      responseWrapper(
        res,
        responseTypes.SUCCESS,
        "Brand fetched successfully",
        result,
      ),
    )
    .catch((err) => {
      const statusCode = err.code || 500;
      const message =
        statusCode === 404 ? err.message : responseTypes.SERVER_ERROR.message;
      return next(new ApiError(message, statusCode));
    });
});

// @desc Update a specific brand
// @route PUT /api/v1/brands/:id
// @access Private
const updateBrand = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  await brandService
    .updateBrand(id, name)
    .then((result) =>
      responseWrapper(
        res,
        responseTypes.SUCCESS,
        "Brand updated successfully",
        result,
      ),
    )
    .catch((err) => {
      const statusCode = err.code || 500;
      const message =
        statusCode === 404 ? err.message : responseTypes.SERVER_ERROR.message;
      return next(new ApiError(message, statusCode));
    });
});

// @desc Delete a specific brand
// @route PUT /api/v1/brands/:id
// @access Private
const deleteBrand = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await brandService
    .deleteBrand(id)
    .then((result) =>
      responseWrapper(
        res,
        responseTypes.SUCCESS,
        "Brand deleted successfully",
        result,
      ),
    )
    .catch((err) => {
      const statusCode = err.code || 500;
      const message =
        statusCode === 404 ? err.message : responseTypes.SERVER_ERROR.message;
      return next(new ApiError(message, statusCode));
    });
});

module.exports = {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
};
