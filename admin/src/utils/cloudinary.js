/**
 * Optimizes a Cloudinary URL by adding auto-format and auto-quality parameters.
 * It also allows for optional width and height resizing.
 * 
 * @param {string} url - The original Cloudinary URL
 * @param {Object} options - Optimization options
 * @param {number} [options.width] - Optional width for resizing
 * @param {number} [options.height] - Optional height for resizing
 * @param {string} [options.crop] - Optional crop mode (default: 'fill')
 * @returns {string} The optimized URL
 */
export const optimizeCloudinaryUrl = (url, { width, height, crop = 'fill' } = {}) => {
  if (!url || !url.includes('cloudinary.com')) return url;

  // Transformations to add
  let transformations = 'f_auto,q_auto';
  
  if (width) transformations += `,w_${width}`;
  if (height) transformations += `,h_${height}`;
  if (width || height) transformations += `,c_${crop}`;

  // Insert transformations after /upload/
  return url.replace('/upload/', `/upload/${transformations}/`);
};
