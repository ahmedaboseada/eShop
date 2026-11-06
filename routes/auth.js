const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup); // Line 5: Error here
router.post('/signin', authController.signin);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;