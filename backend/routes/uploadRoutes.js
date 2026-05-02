// backend/routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const cloudinary = require('../config/cloudinary');
const uploadImage = require('../middleware/uploadImage');
const verifyToken = require('../middleware/verifyToken');

// All upload routes require authentication
router.use(verifyToken);

/**
 * @desc    Upload an image to Cloudinary (optimized with sharp)
 * @route   POST /api/v1/upload/image
 * @access  Protected
 */
router.post('/image', uploadImage.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided',
      });
    }

    // Optimize image with sharp: resize to max 1920px wide, convert to webp, quality 80
    const optimizedBuffer = await sharp(req.file.buffer)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    // Upload to Cloudinary via stream
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'himflax',
          resource_type: 'image',
          format: 'webp',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(optimizedBuffer);
    });

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
