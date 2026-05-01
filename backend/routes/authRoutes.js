// backend/routes/authRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { login, logout, getMe } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');
const { loginLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// POST /api/v1/auth/login
router.post(
  '/login',
  loginLimiter,
  [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
  ],
  login
);

// POST /api/v1/auth/logout
router.post('/logout', logout);

// GET /api/v1/auth/me
router.get('/me', verifyToken, getMe);

module.exports = router;
