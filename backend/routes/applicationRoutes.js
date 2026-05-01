// backend/routes/applicationRoutes.js
const express = require('express');
const { body } = require('express-validator');
const {
  applyToJob,
  getApplications,
  updateApplicationStatus,
} = require('../controllers/applicationController');
const verifyToken = require('../middleware/verifyToken');
const upload = require('../middleware/upload');

const router = express.Router();

// POST /api/v1/applications — public, multipart/form-data
router.post(
  '/',
  upload.single('resume'),
  [
    body('jobId')
      .notEmpty()
      .withMessage('Job ID is required')
      .isMongoId()
      .withMessage('Invalid Job ID'),
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required'),
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
  ],
  applyToJob
);

// GET /api/v1/applications — protected
router.get('/', verifyToken, getApplications);

// PATCH /api/v1/applications/:id/status — protected
router.patch(
  '/:id/status',
  verifyToken,
  [
    body('status')
      .isIn(['pending', 'reviewing', 'shortlisted', 'rejected'])
      .withMessage('Invalid status value'),
  ],
  updateApplicationStatus
);

module.exports = router;
