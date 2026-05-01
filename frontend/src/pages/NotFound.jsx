// frontend/src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

function NotFound() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="min-h-screen flex items-center justify-center bg-white overflow-hidden relative"
    >
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100/50 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-glow/10 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="text-[12rem] md:text-[18rem] font-black text-secondary-900 leading-none tracking-tighter opacity-5"
        >
          404
        </motion.div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-black text-secondary-900 mb-6 tracking-tight pointer-events-auto"
          >
            Lost in <span className="text-gradient">Space?</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-secondary-500 mb-10 max-w-md mx-auto font-medium leading-relaxed pointer-events-auto"
          >
            The page you are looking for has vanished into the digital void. Let's get you back on track.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pointer-events-auto"
          >
            <Link to="/">
              <Button variant="primary" size="lg" className="rounded-2xl px-12 py-5 shadow-glow-primary font-black uppercase tracking-widest text-xs">
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default NotFound;
