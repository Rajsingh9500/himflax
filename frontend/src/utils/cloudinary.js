/**
 * Optimizes an image URL by adding provider-specific optimization parameters.
 * Supports Cloudinary and Unsplash.
 * 
 * @param {string} url - The original image URL
 * @param {Object} options - Optimization options
 * @param {number} [options.width] - Optional width for resizing
 * @param {number} [options.height] - Optional height for resizing
 * @param {string} [options.crop] - Optional crop mode
 * @returns {string} The optimized URL
 */
export const optimizeImageUrl = (url, { width, height, crop = 'fill' } = {}) => {
  if (!url) return url;

  // 1. Handle Cloudinary
  if (url.includes('cloudinary.com')) {
    let transformations = 'f_auto,q_auto';
    if (width) transformations += `,w_${width}`;
    if (height) transformations += `,h_${height}`;
    if (width || height) transformations += `,c_${crop}`;

    return url.replace('/upload/', `/upload/${transformations}/`);
  }

  // 2. Handle Unsplash
  if (url.includes('images.unsplash.com')) {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set('auto', 'format');
      urlObj.searchParams.set('q', '75'); // Balanced quality
      if (width) urlObj.searchParams.set('w', width.toString());
      if (height) urlObj.searchParams.set('h', height.toString());
      if (width || height) urlObj.searchParams.set('fit', 'crop');
      return urlObj.toString();
    } catch (e) {
      return url;
    }
  }

  return url;
};

// Maintain backward compatibility for now
export const optimizeCloudinaryUrl = optimizeImageUrl;
