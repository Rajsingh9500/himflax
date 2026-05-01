// frontend/src/components/ui/Button.jsx
import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const variants = {
  primary:
    'bg-primary-700 text-white hover:bg-primary-800 shadow-lg shadow-primary-700/25 hover:shadow-primary-800/30',
  secondary:
    'bg-secondary-900 text-white hover:bg-secondary-800 shadow-lg shadow-secondary-900/25',
  ghost:
    'bg-transparent text-primary-700 border-2 border-primary-700 hover:bg-primary-50',
  accent:
    'bg-accent-400 text-secondary-900 hover:bg-accent-500 font-semibold shadow-lg shadow-accent-400/25',
  white:
    'bg-white text-secondary-900 hover:bg-secondary-50 shadow-md',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon,
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-xl
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : icon ? (
        <span className="text-lg">{icon}</span>
      ) : null}
      {children}
    </motion.button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'accent', 'white']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default memo(Button);
