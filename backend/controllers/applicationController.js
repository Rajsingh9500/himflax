// backend/controllers/applicationController.js
const { validationResult } = require('express-validator');
const Application = require('../models/Application');
const Job = require('../models/Job');
const { sendEmail } = require('../config/email');

/**
 * @desc    Submit a job application (public)
 * @route   POST /api/v1/applications
 * @access  Public
 */
async function applyToJob(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { jobId, name, email, phone, coverLetter } = req.body;

    // Verify job exists and is active
    const job = await Job.findById(jobId);
    if (!job || !job.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Job not found or no longer accepting applications.',
      });
    }

    // Check if deadline has passed
    if (job.lastDate < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Application deadline has passed for this job.',
      });
    }

    // Check for resume file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Resume file is required (PDF, max 5MB).',
      });
    }

    // Create application
    const application = await Application.create({
      jobId,
      name,
      email,
      phone,
      coverLetter,
      resumeUrl: `/uploads/${req.file.filename}`,
    });

    // Send confirmation email (non-blocking)
    sendEmail({
      to: email,
      subject: `Application Received — ${job.title} at Himflax IT`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1D4ED8;">Application Received</h2>
          <p>Hi ${name},</p>
          <p>Thank you for applying for the <strong>${job.title}</strong> position at Himflax Information Technology.</p>
          <p>We have received your application and will review it shortly. If your profile matches our requirements, we will reach out to you.</p>
          <br />
          <p>Best regards,</p>
          <p><strong>Himflax IT HR Team</strong></p>
        </div>
      `,
    }).catch(() => {}); // Silent fail for email

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! You will receive a confirmation email shortly.',
      data: {
        id: application._id,
        jobTitle: job.title,
        appliedAt: application.appliedAt,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Get all applications (admin)
 * @route   GET /api/v1/applications
 * @access  Protected
 */
async function getApplications(req, res, next) {
  try {
    const { jobId, status, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (jobId) {
      filter.jobId = jobId;
    }

    if (status) {
      filter.status = status;
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const [applications, total] = await Promise.all([
      Application.find(filter)
        .populate('jobId', 'title company')
        .sort({ appliedAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Application.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: applications,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Update application status
 * @route   PATCH /api/v1/applications/:id/status
 * @access  Protected
 */
async function updateApplicationStatus(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('jobId', 'title');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    res.status(200).json({
      success: true,
      message: `Application status updated to '${status}'`,
      data: application,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { applyToJob, getApplications, updateApplicationStatus };
