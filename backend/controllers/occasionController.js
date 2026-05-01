// backend/controllers/occasionController.js
const { validationResult } = require('express-validator');
const Occasion = require('../models/Occasion');

/**
 * @desc    Get active occasion (public)
 * @route   GET /api/v1/occasions/active
 * @access  Public
 */
async function getActiveOccasion(req, res, next) {
  try {
    const occasion = await Occasion.findOne({ isLive: true });
    
    res.status(200).json({
      success: true,
      data: occasion || null,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Get all occasions (admin)
 * @route   GET /api/v1/occasions
 * @access  Protected
 */
async function getOccasions(req, res, next) {
  try {
    const occasions = await Occasion.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: occasions,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Create a new occasion
 * @route   POST /api/v1/occasions
 * @access  Protected
 */
async function createOccasion(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const data = req.body;

    // If this occasion is marked live, deactivate others
    if (data.isLive) {
      await Occasion.updateMany({}, { isLive: false });
    }

    const occasion = await Occasion.create(data);

    res.status(201).json({
      success: true,
      message: 'Occasion created successfully',
      data: occasion,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Update an occasion
 * @route   PUT /api/v1/occasions/:id
 * @access  Protected
 */
async function updateOccasion(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const data = req.body;

    // If this occasion is marked live, deactivate others
    if (data.isLive) {
      await Occasion.updateMany(
        { _id: { $ne: req.params.id } }, 
        { isLive: false }
      );
    }

    const occasion = await Occasion.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!occasion) {
      return res.status(404).json({
        success: false,
        message: 'Occasion not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Occasion updated successfully',
      data: occasion,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Toggle live status
 * @route   PATCH /api/v1/occasions/:id/toggle-live
 * @access  Protected
 */
async function toggleLiveOccasion(req, res, next) {
  try {
    const occasion = await Occasion.findById(req.params.id);

    if (!occasion) {
      return res.status(404).json({
        success: false,
        message: 'Occasion not found',
      });
    }

    const newIsLiveStatus = !occasion.isLive;

    // If making live, deactivate all others first
    if (newIsLiveStatus) {
      await Occasion.updateMany({}, { isLive: false });
    }

    occasion.isLive = newIsLiveStatus;
    await occasion.save();

    res.status(200).json({
      success: true,
      message: `Occasion ${newIsLiveStatus ? 'activated' : 'deactivated'} successfully`,
      data: occasion,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Delete an occasion
 * @route   DELETE /api/v1/occasions/:id
 * @access  Protected
 */
async function deleteOccasion(req, res, next) {
  try {
    const occasion = await Occasion.findByIdAndDelete(req.params.id);

    if (!occasion) {
      return res.status(404).json({
        success: false,
        message: 'Occasion not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Occasion deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { 
  getActiveOccasion, 
  getOccasions, 
  createOccasion, 
  updateOccasion, 
  toggleLiveOccasion, 
  deleteOccasion 
};
