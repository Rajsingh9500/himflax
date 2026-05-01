// frontend/src/components/ui/Card.jsx
import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

function Card({
  children,
  className = '',
  hover = true,
  padding = 'p-6',
  ...props
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.1)' } : {}}
      transition={{ duration: 0.3 }}
      className={`
        bg-white rounded-2xl border border-secondary-100
        shadow-sm transition-all duration-300
        ${padding}
        ${hover ? 'hover:border-primary-200' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
  padding: PropTypes.string,
};

export default memo(Card);
