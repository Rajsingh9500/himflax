// backend/models/Banner.js
const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a banner title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    subtitle: {
      type: String,
      trim: true,
      maxlength: [200, 'Subtitle cannot be more than 200 characters'],
    },
    badgeText: {
      type: String,
      trim: true,
      maxlength: [50, 'Badge text cannot be more than 50 characters'],
    },
    ctaText: {
      type: String,
      required: [true, 'Please add CTA text'],
      trim: true,
    },
    ctaLink: {
      type: String,
      required: [true, 'Please add a CTA link'],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Please add an image URL'],
      trim: true,
    },
    overlayTheme: {
      type: String,
      enum: ['blue', 'purple', 'dark', 'light', 'orange', 'green'],
      default: 'dark',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      required: [true, 'Please specify the display order'],
    },
  },
  {
    timestamps: true,
  }
);

// Index on order for sorting, and isActive for querying
bannerSchema.index({ isActive: 1, order: 1 });
bannerSchema.index({ order: 1 });

module.exports = mongoose.model('Banner', bannerSchema);
