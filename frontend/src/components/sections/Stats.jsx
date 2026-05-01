// frontend/src/components/sections/Stats.jsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';

const stats = [
  { end: 500, suffix: '+', label: 'Projects Delivered' },
  { end: 150, suffix: '+', label: 'Happy Clients' },
  { end: 50, suffix: '+', label: 'Team Members' },
  { end: 98, suffix: '%', label: 'Client Retention' },
];

function Stats() {
  return (
    <section className="py-20 bg-secondary-950 relative overflow-hidden">
      {/* Dynamic background lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-accent-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 lg:gap-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center group"
            >
              <div className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter group-hover:text-primary-400 transition-colors duration-500">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} duration={2500} />
              </div>
              <div className="text-xs md:text-sm text-secondary-500 font-black uppercase tracking-[0.3em] mb-2">
                {stat.label}
              </div>
              <div className="w-12 h-1 bg-primary-600/30 mx-auto rounded-full group-hover:w-20 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Stats);
