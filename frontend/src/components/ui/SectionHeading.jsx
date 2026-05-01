// frontend/src/components/ui/SectionHeading.jsx
import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

function SectionHeading({
  subtitle,
  title,
  description,
  align = 'center',
  light = false,
}) {
  const alignClass = {
    center: 'text-center mx-auto',
    left: 'text-left',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`max-w-3xl mb-12 md:mb-16 ${alignClass[align]}`}
    >
      {subtitle && (
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4
            ${light
              ? 'bg-white/10 text-accent-300'
              : 'bg-primary-50 text-primary-700'
            }`}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={`text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4
          ${light ? 'text-white' : 'text-secondary-900'}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-base md:text-lg leading-relaxed
            ${light ? 'text-secondary-300' : 'text-secondary-500'}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

SectionHeading.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.node.isRequired,
  description: PropTypes.string,
  align: PropTypes.oneOf(['center', 'left']),
  light: PropTypes.bool,
};

export default memo(SectionHeading);
