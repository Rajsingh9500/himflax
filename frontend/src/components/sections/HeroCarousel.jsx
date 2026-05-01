// frontend/src/components/sections/HeroCarousel.jsx
import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight, HiArrowRight } from 'react-icons/hi';
import { useBanners } from '../../hooks/useBanners';

function HeroCarousel() {
  const { banners, isLoading } = useBanners();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (banners.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [banners.length, isPaused]);

  if (isLoading) {
    return (
      <div className="min-h-[100vh] flex items-center justify-center bg-secondary-950">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!banners || banners.length === 0) {
    // Fallback if no banners
    return (
      <section className="relative min-h-[100vh] flex items-center bg-secondary-950 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold">Welcome to Himflax</h1>
        </div>
      </section>
    );
  }

  const currentBanner = banners[currentIndex];

  const getOverlayClass = (theme) => {
    const overlays = {
      dark: 'from-secondary-950/80 via-secondary-950/40 to-transparent',
      blue: 'from-primary-950/80 via-primary-900/40 to-transparent',
      purple: 'from-fuchsia-950/80 via-fuchsia-900/40 to-transparent',
      light: 'from-white/80 via-white/40 to-transparent text-secondary-900',
      orange: 'from-orange-950/80 via-orange-900/40 to-transparent',
      green: 'from-emerald-950/80 via-emerald-900/40 to-transparent',
    };
    return overlays[theme] || overlays.dark;
  };

  const isLightTheme = currentBanner.overlayTheme === 'light';

  return (
    <section 
      className="relative min-h-[100vh] flex items-center overflow-hidden bg-secondary-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <motion.img
            src={currentBanner.imageUrl}
            alt={currentBanner.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 8, ease: "linear" }}
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${getOverlayClass(currentBanner.overlayTheme)}`} />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {currentBanner.badgeText && (
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm border ${isLightTheme ? 'bg-primary-500/10 border-primary-500/20 text-primary-700' : 'bg-white/10 border-white/20 text-white'}`}>
                  <span className={`w-2 h-2 rounded-full animate-pulse ${isLightTheme ? 'bg-primary-600' : 'bg-primary-400'}`} />
                  <span className="text-xs font-bold uppercase tracking-widest">{currentBanner.badgeText}</span>
                </div>
              )}

              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 ${isLightTheme ? 'text-secondary-900' : 'text-white'}`}>
                {currentBanner.title}
              </h1>

              {currentBanner.subtitle && (
                <p className={`text-xl sm:text-2xl font-medium max-w-2xl leading-relaxed mb-10 ${isLightTheme ? 'text-secondary-700' : 'text-secondary-200'}`}>
                  {currentBanner.subtitle}
                </p>
              )}

              <div>
                <a
                  href={currentBanner.ctaLink}
                  className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-500 transition-colors shadow-glow"
                >
                  {currentBanner.ctaText}
                  <HiArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      {banners.length > 1 && (
        <>
          <div className="absolute bottom-10 right-10 z-20 flex gap-4">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)}
              className="p-3 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white border border-white/20 transition-all"
            >
              <HiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % banners.length)}
              className="p-3 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white border border-white/20 transition-all"
            >
              <HiChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className="relative h-2 rounded-full overflow-hidden transition-all duration-300"
                style={{ width: idx === currentIndex ? '40px' : '8px', backgroundColor: 'rgba(255,255,255,0.3)' }}
              >
                {idx === currentIndex && (
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ x: '-100%' }}
                    animate={{ x: isPaused ? undefined : '0%' }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default memo(HeroCarousel);
