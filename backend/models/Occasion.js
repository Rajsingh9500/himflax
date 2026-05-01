// backend/models/Occasion.js
const mongoose = require('mongoose');

const occasionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add an occasion name'],
      trim: true,
    },
    emoji: {
      type: String,
      trim: true,
      default: '🎉',
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Please add a message'],
      trim: true,
    },
    ctaText: {
      type: String,
      trim: true,
    },
    ctaLink: {
      type: String,
      trim: true,
    },
    ctaColor: {
      type: String,
      trim: true,
      default: 'primary-600',
    },
    isLive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index on isLive
occasionSchema.index({ isLive: 1 });

module.exports = mongoose.model('Occasion', occasionSchema);
