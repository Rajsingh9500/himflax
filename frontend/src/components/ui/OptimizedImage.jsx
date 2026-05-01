import { memo } from 'react';

/**
 * OptimizedImage Component
 * 
 * Props:
 * - src: String (required)
 * - alt: String (required)
 * - className: String
 * - priority: Boolean (if true, loading="eager" and fetchpriority="high")
 * - lazy: Boolean (if true, loading="lazy") - default is true
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  priority = false, 
  lazy = true,
  ...props 
}) => {
  return (
    <img
      src={src}
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
