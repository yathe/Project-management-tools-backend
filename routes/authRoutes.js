const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Fixing the method name to router.route()
router.route('/signin').post(authController.signin);
router.route('/register').post(authController.register);

module.exports = router;
