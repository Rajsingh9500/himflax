// backend/controllers/jobController.js
const { validationResult } = require('express-validator');
const Job = require('../models/Job');

/**
 * @desc    Get all active jobs (public) with pagination & filters
 * @route   GET /api/v1/jobs
 * @access  Public
 */
async function getJobs(req, res, next) {
  try {
    const { type, location, search, page = 1, limit = 10, all } = req.query;

    const filter = {};

    // If 'all' query param is set (admin usage), show all jobs
    if (all === 'true') {
      // No isActive filter
    } else {
      filter.isActive = true;
    }

    if (type && type !== 'All') {
      filter.type = type;
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const [jobs, total] = await Promise.all([
      Job.find(filter)
        .populate('applicationCount')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean({ virtuals: true }),
      Job.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: jobs,
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
 * @desc    Get single job by ID
 * @route   GET /api/v1/jobs/:id
 * @access  Public
 */
async function getJob(req, res, next) {
  try {
    const job = await Job.findById(req.params.id)
      .populate('applicationCount')
      .lean({ virtuals: true });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Create a new job
 * @route   POST /api/v1/jobs
 * @access  Protected
 */
async function createJob(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const jobData = {
      ...req.body,
      createdBy: req.user._id,
    };

    // Parse skills if sent as comma-separated string
    if (typeof jobData.skills === 'string') {
      jobData.skills = jobData.skills.split(',').map((s) => s.trim()).filter(Boolean);
    }

    const job = await Job.create(jobData);

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Update a job
 * @route   PUT /api/v1/jobs/:id
 * @access  Protected
 */
async function updateJob(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const updateData = { ...req.body };

    // Parse skills if sent as comma-separated string
    if (typeof updateData.skills === 'string') {
      updateData.skills = updateData.skills.split(',').map((s) => s.trim()).filter(Boolean);
    }

    const job = await Job.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: job,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Toggle job active status
 * @route   PATCH /api/v1/jobs/:id/toggle
 * @access  Protected
 */
async function toggleJob(req, res, next) {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    job.isActive = !job.isActive;
    await job.save();

    res.status(200).json({
      success: true,
      message: `Job ${job.isActive ? 'activated' : 'deactivated'} successfully`,
      data: job,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Delete job (soft delete — set isActive to false)
 * @route   DELETE /api/v1/jobs/:id
 * @access  Protected
 */
async function deleteJob(req, res, next) {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job deleted (deactivated) successfully',
      data: job,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Get dashboard stats
 * @route   GET /api/v1/jobs/stats/overview
 * @access  Protected
 */
async function getStats(req, res, next) {
  try {
    const Application = require('../models/Application');
    const Banner = require('../models/Banner');
    const Occasion = require('../models/Occasion');

    const [totalJobs, activeJobs, totalApplications, recentApplications, totalBanners, activeBanners, activeOccasion] = await Promise.all([
      Job.countDocuments(),
      Job.countDocuments({ isActive: true }),
      Application.countDocuments(),
      Application.countDocuments({
        appliedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      }),
      Banner.countDocuments(),
      Banner.countDocuments({ isActive: true }),
      Occasion.findOne({ isLive: true })
    ]);

    // Applications per job (top 5)
    const applicationsPerJob = await Application.aggregate([
      {
        $group: {
          _id: '$jobId',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'jobs',
          localField: '_id',
          foreignField: '_id',
          as: 'job',
        },
      },
      { $unwind: '$job' },
      {
        $project: {
          jobTitle: '$job.title',
          count: 1,
        },
      },
    ]);

    // Applications by status
    const applicationsByStatus = await Application.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Jobs by type
    const jobsByType = await Job.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalJobs,
        activeJobs,
        totalApplications,
        newThisWeek: recentApplications,
        applicationsPerJob,
        totalBanners,
        activeBanners,
        activeOccasion: activeOccasion ? activeOccasion.name : 'None',
        applicationsByStatus,
        jobsByType,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getJobs, getJob, createJob, updateJob, toggleJob, deleteJob, getStats };
