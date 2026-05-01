// backend/config/db.js
const mongoose = require('mongoose');

const RETRY_INTERVAL = 5000; // 5 seconds

/**
 * Connect to MongoDB with retry logic
 */
async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/himflax';

  const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  const connectWithRetry = async () => {
    try {
      await mongoose.connect(uri, options);
      console.log(`✅ MongoDB connected: ${mongoose.connection.host}`);
    } catch (error) {
      console.error(`❌ MongoDB connection failed: ${error.message}`);
      console.log(`⏳ Retrying in ${RETRY_INTERVAL / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
      return connectWithRetry();
    }
  };

  await connectWithRetry();

  // Connection event listeners
  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB error:', err.message);
  });
}

module.exports = connectDB;
