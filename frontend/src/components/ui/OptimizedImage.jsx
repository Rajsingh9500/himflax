import { memo } from 'react';
import { optimizeCloudinaryUrl } from '../../utils/cloudinary';

/**
 * OptimizedImage Component
 * 
 * Props:
 * - src: String (required)
 * - alt: String (required)
 * - className: String
 * - priority: Boolean (if true, loading="eager" and fetchpriority="high")
 * - lazy: Boolean (if true, loading="lazy") - default is true
 * - width: Number (optional width for Cloudinary optimization)
 * - height: Number (optional height for Cloudinary optimization)
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  priority = false, 
  lazy = true,
  width,
  height,
  ...props 
}) => {
  // Use Cloudinary optimization if applicable
  const optimizedSrc = optimizeCloudinaryUrl(src, { width, height });

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : (lazy ? 'lazy' : 'eager')}
      fetchpriority={priority ? 'high' : 'auto'}
      decoding="async"
      {...props}
    />
  );
};

export default memo(OptimizedImage);
