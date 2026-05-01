// backend/routes/occasionRoutes.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  getActiveOccasion,
  getOccasions,
  createOccasion,
  updateOccasion,
  toggleLiveOccasion,
  deleteOccasion,
} = require('../controllers/occasionController');

const verifyToken = require('../middleware/verifyToken');

// Public route
router.get('/active', getActiveOccasion);

// Protected routes (Admin)
router.use(verifyToken);

router.get('/', getOccasions);

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('title').notEmpty().withMessage('Title is required'),
    body('message').notEmpty().withMessage('Message is required'),
  ],
  createOccasion
);

router.put(
  '/:id',
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('message').optional().notEmpty().withMessage('Message cannot be empty'),
  ],
  updateOccasion
);

router.patch('/:id/toggle-live', toggleLiveOccasion);

router.delete('/:id', deleteOccasion);

module.exports = router;
