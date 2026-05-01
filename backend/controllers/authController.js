// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

/**
 * Generate JWT token, set httpOnly cookie, AND return token in body
 * Cookie works for same-domain (dev), Bearer token works for cross-domain (prod)
 */
function sendTokenResponse(user, statusCode, res, message) {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );

  const isProduction = process.env.NODE_ENV === 'production';

  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  };

  res
    .status(statusCode)
    .cookie('token', token, cookieOptions)
    .json({
      success: true,
      message,
      token, // Also send in body for cross-domain usage
      data: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
}

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
async function login(req, res, next) {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Find user with password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    sendTokenResponse(user, 200, res, 'Login successful');
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Logout user — clear cookie
 * @route   POST /api/v1/auth/logout
 * @access  Public
 */
async function logout(_req, res, next) {
  try {
    res
      .status(200)
      .cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
      })
      .json({
        success: true,
        message: 'Logged out successfully',
      });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Get current logged-in user
 * @route   GET /api/v1/auth/me
 * @access  Protected
 */
async function getMe(req, res, next) {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { login, logout, getMe };
