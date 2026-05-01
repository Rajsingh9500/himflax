// backend/routes/jobRoutes.js
const express = require('express');
const { body } = require('express-validator');
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  toggleJob,
  deleteJob,
  getStats,
} = require('../controllers/jobController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Validation rules for job creation / update
const jobValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Job title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required'),
  body('type')
    .isIn(['Full-time', 'Part-time', 'Contract', 'Remote'])
    .withMessage('Invalid job type'),
  body('experience')
    .trim()
    .notEmpty()
    .withMessage('Experience level is required'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Job description is required')
    .isLength({ max: 5000 })
    .withMessage('Description cannot exceed 5000 characters'),
  body('lastDate')
    .notEmpty()
    .withMessage('Application deadline is required')
    .isISO8601()
    .withMessage('Invalid date format'),
];

// Public routes
router.get('/', getJobs);
router.get('/stats/overview', verifyToken, getStats);
router.get('/:id', getJob);

// Protected routes
router.post('/', verifyToken, jobValidation, createJob);
router.put('/:id', verifyToken, jobValidation, updateJob);
router.patch('/:id/toggle', verifyToken, toggleJob);
router.delete('/:id', verifyToken, deleteJob);

module.exports = router;
