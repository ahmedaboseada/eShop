const AsyncHandler = require("express-async-handler");
const subCategoryService = require("../Services/subCategoryService");
const responseWrapper = require("../utils/responseWrapper");
const responseTypes = require("../utils/responseTypes");
const ApiError = require("../utils/apiError");

// @desc Create subCategory
// @route POST /api/v1/subcategories
// @access Private
const createSubCategory = AsyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { categoryId } = req.params;
  await subCategoryService
    .createSubCategory(name, categoryId)
    .then((result) =>
      responseWrapper(
        res,
        responseTypes.CREATED,
        "Subcategory created successfully",
        result,
      ),
    )
    .catch((error) => {
      const statusCode = error.code || 500;
      const message =
        statusCode === 400 ? error.message : responseTypes.SERVER_ERROR.message;
      return next(new ApiError(message, statusCode));
    });
});

// @desc Get list of subCategories
// @route GET /api/v1/subcategories
// @access Public
const getSubCategories = AsyncHandler(async (req, res, next) => {
  await subCategoryService
    .findAll(req)
    .then((result) =>
      responseWrapper(
        res,
        responseTypes.SUCCESS,
        "Subcategory list fetched successfully",
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

// @desc Get a specific subCategory
// @route GET /api/v1/subcategories/:id
// @access Public
const getSubCategory = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await subCategoryService
    .findById(id)
    .then((result) =>
      responseWrapper(
        res,
        responseTypes.SUCCESS,
        "Subcategory fetched successfully",
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

// @desc Update a specific subCategory
// @route PUT /api/v1/subcategories/:id
// @access Private
const updateSubCategory = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  await subCategoryService
    .updateSubCategory(id, name)
    .then((result) =>
      responseWrapper(
        res,
        responseTypes.SUCCESS,
        "Subcategory updated successfully",
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

// @desc Delete a specific subCategory
// @route PUT /api/v1/subcategories/:id
// @access Private
const deleteSubCategory = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await subCategoryService
    .deleteSubCategory(id)
    .then((result) =>
      responseWrapper(
        res,
        responseTypes.SUCCESS,
        "Subcategory deleted successfully",
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
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
