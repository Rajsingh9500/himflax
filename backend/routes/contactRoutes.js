// backend/routes/contactRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { submitContact } = require('../controllers/contactController');

const router = express.Router();

// POST /api/v1/contact
router.post(
  '/',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required'),
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('service')
      .trim()
      .notEmpty()
      .withMessage('Please select a service'),
    body('message')
      .trim()
      .notEmpty()
      .withMessage('Message is required')
      .isLength({ max: 3000 })
      .withMessage('Message cannot exceed 3000 characters'),
  ],
  submitContact
);

module.exports = router;
