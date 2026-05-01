// backend/routes/bannerRoutes.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  getBanners,
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} = require('../controllers/bannerController');

const verifyToken = require('../middleware/verifyToken');

// Public route
router.get('/', getBanners);

// Protected routes (Admin)
router.use(verifyToken);

router.get('/all', getAllBanners);

router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('ctaText').notEmpty().withMessage('CTA text is required'),
    body('ctaLink').notEmpty().withMessage('CTA link is required'),
    body('imageUrl').notEmpty().withMessage('Image URL is required'),
    body('order').isNumeric().withMessage('Order must be a number'),
  ],
  createBanner
);

router.put(
  '/:id',
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('order').optional().isNumeric().withMessage('Order must be a number'),
  ],
  updateBanner
);

router.delete('/:id', deleteBanner);

module.exports = router;
