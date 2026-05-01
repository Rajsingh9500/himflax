// backend/controllers/bannerController.js
const { validationResult } = require('express-validator');
const Banner = require('../models/Banner');

/**
 * @desc    Get all active banners (public)
 * @route   GET /api/v1/banners
 * @access  Public
 */
async function getBanners(req, res, next) {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1 });
    
    res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Get all banners (admin)
 * @route   GET /api/v1/banners/all
 * @access  Protected
 */
async function getAllBanners(req, res, next) {
  try {
    const banners = await Banner.find().sort({ order: 1 });
    
    res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Create a new banner
 * @route   POST /api/v1/banners
 * @access  Protected
 */
async function createBanner(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const banner = await Banner.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Banner created successfully',
      data: banner,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Update a banner
 * @route   PUT /api/v1/banners/:id
 * @access  Protected
 */
async function updateBanner(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Banner updated successfully',
      data: banner,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Delete a banner
 * @route   DELETE /api/v1/banners/:id
 * @access  Protected
 */
async function deleteBanner(req, res, next) {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Banner deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getBanners, getAllBanners, createBanner, updateBanner, deleteBanner };
