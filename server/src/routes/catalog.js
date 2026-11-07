const express = require('express');
const catalogController = require('../controllers/catalogController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/categories', catalogController.listCategories);
router.post('/categories', protect, authorize('admin'), catalogController.createCategory);

router.get('/brands', catalogController.listBrands);
router.post('/brands', protect, authorize('admin'), catalogController.createBrand);

router.get('/products', catalogController.listProducts);
router.get('/products/:id', catalogController.getProduct);
router.post('/products', protect, authorize('admin'), catalogController.createProduct);

module.exports = router;
