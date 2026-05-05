// backend/server.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Route imports
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const occasionRoutes = require('./routes/occasionRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

/**
 * Create and configure Express application
 * @returns {express.Application}
 */
function createApp() {
  const app = express();

  // Trust proxy (required behind Render/Vercel reverse proxies)
  app.set('trust proxy', 1);

  // Security middleware — configured for Cloudinary/Unsplash and allows 'unsafe-eval' if required by frontend libs
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://*.cloudinary.com'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://*.cloudinary.com', 'https://images.unsplash.com'],
          'connect-src': ["'self'", 'https://*.cloudinary.com', 'https://himflax.onrender.com'],
        },
      },
    })
  );

  // Compression — gzip all responses (~70% smaller)
  app.use(compression());

  // CORS configuration
  const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim())
    : ['http://localhost:5173', 'http://localhost:5174'];

  app.use(
    cors({
      origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, Render health checks)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
          return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
    })
  );

  // Body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Sanitize MongoDB queries — prevent NoSQL injection ($gt, $ne, etc.)
  app.use(mongoSanitize());

  // Request logging
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
  }

  // Static files — serve uploaded resumes
  app.use('/uploads', express.static('uploads'));

  // Health check (also used as keep-alive ping for Render cold starts)
  app.get('/api/v1/health', (_req, res) => {
    res.json({
      success: true,
      message: 'Himflax API is running',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
    });
  });

  // API Routes
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/jobs', jobRoutes);
  app.use('/api/v1/applications', applicationRoutes);
  app.use('/api/v1/contact', contactRoutes);
  app.use('/api/v1/banners', bannerRoutes);
  app.use('/api/v1/occasions', occasionRoutes);
  app.use('/api/v1/upload', uploadRoutes);

  // 404 handler
  app.use((_req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
  });

  // Global error handler — must be last
  app.use(errorHandler);

  return app;
}

/**
 * Start the server
 */
async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();

    const app = createApp();
    const PORT = process.env.PORT || 5000;

    const server = app.listen(PORT, () => {
      console.log(`\n🚀 Himflax API running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode\n`);
    });

    // Graceful shutdown
    const shutdown = (signal) => {
      console.log(`\n${signal} received. Shutting down gracefully...`);
      server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
      });

      // Force exit after 10s
      setTimeout(() => {
        console.error('Forced shutdown after timeout.');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

// Start if not imported for testing
if (require.main === module) {
  startServer();
}

module.exports = { createApp, startServer };
