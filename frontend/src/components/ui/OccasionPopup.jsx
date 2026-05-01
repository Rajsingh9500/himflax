// frontend/src/components/ui/OccasionPopup.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import Confetti from 'react-confetti';
import { useOccasion } from '../../hooks/useOccasion';
import { useWindowSize } from '../../hooks/useWindowSize';

export default function OccasionPopup() {
  const { occasion, isLoading } = useOccasion();
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (!isLoading && occasion) {
      const hasSeenPopup = sessionStorage.getItem(`occasion_${occasion._id}`);
      if (!hasSeenPopup) {
        setIsOpen(true);
        setShowConfetti(true);
        sessionStorage.setItem(`occasion_${occasion._id}`, 'true');

        // Stop confetti after 5 seconds
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }
  }, [occasion, isLoading]);

  if (!isOpen || !occasion) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-secondary-950/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden text-center p-8 border border-secondary-100"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-full transition-colors"
          >
            <HiX className="w-5 h-5" />
          </button>
          
          <div className="text-6xl mb-4">{occasion.emoji}</div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">{occasion.title}</h2>
          <p className="text-secondary-600 mb-6">{occasion.message}</p>
          
          {occasion.ctaText && occasion.ctaLink && (
            <a
              href={occasion.ctaLink}
              onClick={() => setIsOpen(false)}
              className={`inline-block px-8 py-3 rounded-full font-bold text-white transition-transform hover:scale-105 shadow-glow`}
              style={{ backgroundColor: occasion.ctaColor || '#6366f1' }}
            >
              {occasion.ctaText}
            </a>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
