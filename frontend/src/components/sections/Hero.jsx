// frontend/src/components/sections/Hero.jsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import Button from '../ui/Button';

const STATS = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '12+', label: 'Years Experience' },
  { value: '98%', label: 'Client Satisfaction' },
];

function Hero() {
  const handleScroll = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden text-white bg-secondary-950">

      {/* ── Background Video ──────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">


        {/* Multi-layer gradient overlay for depth and contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-900 via-primary-950/40 to-secondary-950" style={{ transform: 'translateZ(0)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-transparent to-secondary-950/30" style={{ transform: 'translateZ(0)' }} />

        {/* Static noise texture — lightweight CSS pattern, no SVG filter */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABnRSTlMFCA0REhOEeEKOAAAASklEQVQ4y2MQhAKBBgYGFkEGBmFBBgYRQQYGIUEGBjFBBgZhQQYGCUEGBilBBgZpQQYGGUEGBllBBoZ/gwYNGjRo0KBBgwatsABYkQV0jJEhDAAAAABJRU5ErkJggg==")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '48px 48px',
            transform: 'translateZ(0)',
          }}
        />

        {/* Glow orbs — GPU composited with will-change */}
        <div
          className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-primary-600/15 blur-[80px]"
          style={{ willChange: 'transform', animation: 'pulse 6s ease-in-out infinite', transform: 'translateZ(0)' }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[30vw] h-[30vw] rounded-full bg-accent-500/10 blur-[80px]"
          style={{ willChange: 'transform', animation: 'pulse 8s ease-in-out infinite alternate', transform: 'translateZ(0)' }}
        />

        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
            backgroundSize: '32px 32px',
            transform: 'translateZ(0)',
          }}
        />
      </div>

      {/* ── Main Content ──────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24">
        <div className="max-w-4xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary-500/40 bg-primary-500/10 backdrop-blur-sm mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-300">
              Modern IT Excellence
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-5xl sm:text-6xl lg:text-[5.5rem] font-bold leading-[0.92] tracking-tight mb-8"
          >
            Future of{' '}
            <br />
            <span className="text-gradient">Technology</span>
            <br />
            Starts Here.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg sm:text-xl text-secondary-300 leading-relaxed mb-10 max-w-2xl font-medium"
          >
            Himflax empowers businesses with cutting-edge IT solutions — from custom software
            to digital transformation. We don't just build technology; we build your future.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link to="/contact">
              <Button
                variant="primary"
                size="lg"
                className="rounded-full px-10 py-5 text-base shadow-glow-primary hover:scale-105 transition-transform duration-200"
              >
                Get Started
              </Button>
            </Link>
            <Link to="/services">
              <button className="inline-flex items-center gap-2 px-8 py-5 rounded-full border border-white/20 text-white font-semibold text-base hover:bg-white/5 hover:border-white/40 transition-all duration-200 backdrop-blur-sm">
                Explore Services
                <HiArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap gap-x-10 gap-y-6 pt-8 border-t border-white/10"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-widest text-secondary-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll Indicator ─────────────────────────────────────── */}
      <motion.button
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={handleScroll}
        aria-label="Scroll to services"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary-500 group-hover:text-primary-400 transition-colors">
          Discovery
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2 group-hover:border-primary-500/50 transition-colors">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-primary-400"
          />
        </div>
      </motion.button>
    </section>
  );
}

export default memo(Hero);
