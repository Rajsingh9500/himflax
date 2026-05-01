// backend/models/Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job ID is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      trim: true,
    },
    coverLetter: {
      type: String,
      maxlength: [2000, 'Cover letter cannot exceed 2000 characters'],
    },
    resumeUrl: {
      type: String,
      required: [true, 'Resume is required'],
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'reviewing', 'shortlisted', 'rejected'],
        message: '{VALUE} is not a valid status',
      },
      default: 'pending',
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for query performance
applicationSchema.index({ jobId: 1 });
applicationSchema.index({ email: 1 });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
