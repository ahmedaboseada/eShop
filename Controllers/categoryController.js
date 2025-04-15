const AsyncHandler = require("express-async-handler");
const categoryService = require("../Services/categoryService");
const responseWrapper = require("../utils/responseWrapper");
const responseTypes = require("../utils/responseTypes");
const ApiError = require("../utils/apiError");

// @desc Create Category
// @route POST /api/v1/categories
// @access Private
const createCategory = AsyncHandler(async (req, res, next) => {
  const { name } = req.body;
  await categoryService
    .createCategory(name)
    .then((result) =>
      responseWrapper(
        res,
        responseTypes.CREATED,
        "Category created successfully",
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

// @desc Get list of categories
// @route GET /api/v1/categories
// @access Public
const getCategories = AsyncHandler(async (req, res, next) => {
  await categoryService
    .findAll(req)
    .then((result) =>
      responseWrapper(
        res,
        responseTypes.SUCCESS,
        "Categories list fetched successfully",
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

// @desc Get a specific category
// @route GET /api/v1/categories/:id
// @access Public
const getCategory = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await categoryService
    .findById(id)
    .then((result) =>
      responseWrapper(
        res,
        responseTypes.SUCCESS,
        "Category fetched successfully",
        result,
      ),
    )
    .catch((err) => {
      const statusCode = err.code || 500;
      const message =
        statusCode === 404 ? err.message : responseTypes.SERVER_ERROR.message;
      return next(new ApiError(message, statusCode));
      // return responseWrapper(res, type, message);
    });
});

// @desc Update a specific category
// @route PUT /api/v1/categories/:id
// @access Private
const updateCategory = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  await categoryService
    .updateCategory(id, name)
    .then((result) =>
      responseWrapper(
        res,
        responseTypes.SUCCESS,
        "Category updated successfully",
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

// @desc Delete a specific category
// @route PUT /api/v1/categories/:id
// @access Private
const deleteCategory = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await categoryService
    .deleteCategory(id)
    .then((result) =>
      responseWrapper(
        res,
        responseTypes.SUCCESS,
        "Category deleted successfully",
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
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
