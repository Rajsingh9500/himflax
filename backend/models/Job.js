// backend/models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    company: {
      type: String,
      required: true,
      default: 'Himflax Information Technology',
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: {
        values: ['Full-time', 'Part-time', 'Contract', 'Remote'],
        message: '{VALUE} is not a valid job type',
      },
      required: [true, 'Job type is required'],
    },
    experience: {
      type: String,
      required: [true, 'Experience level is required'],
      trim: true,
    },
    salary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
      maxlength: [5000, 'Description cannot exceed 5000 characters'],
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    lastDate: {
      type: Date,
      required: [true, 'Application deadline is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: Check if deadline has passed
jobSchema.virtual('isExpired').get(function () {
  return this.lastDate < new Date();
});

// Virtual: Application count (populated separately)
jobSchema.virtual('applicationCount', {
  ref: 'Application',
  localField: '_id',
  foreignField: 'jobId',
  count: true,
});

// Indexes for query performance
jobSchema.index({ createdAt: -1 });
jobSchema.index({ type: 1 });
jobSchema.index({ isActive: 1 });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
