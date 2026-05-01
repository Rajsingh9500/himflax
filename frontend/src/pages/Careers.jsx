// frontend/src/pages/Careers.jsx
import { useState, memo, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { useJobs } from '../hooks/useJobs';
import SkeletonCard from '../components/careers/SkeletonCard';
import JobCard from '../components/careers/JobCard';

// Lazy load heavy modal
const ApplyModal = lazy(() => import('../components/careers/ApplyModal'));

const filters = ['All', 'Full-time', 'Part-time', 'Remote', 'Contract'];

const Careers = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);

  const params = activeFilter === 'All' ? {} : { type: activeFilter };
  const { data, isLoading } = useJobs(params);
  const jobs = data?.jobs || [];

  const handleApply = useCallback((job) => {
    setSelectedJob(job);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedJob(null);
  }, []);

  return (
    <div className="bg-secondary-50 min-h-screen">
      {/* Hero - Fixed height to prevent layout shift */}
      <section className="bg-secondary-950 text-white pt-44 pb-32 relative overflow-hidden min-h-[480px] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px] opacity-[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black mb-8 tracking-tighter"
          >
            Join Our <span className="text-gradient">Team</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-secondary-400 text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Build the future of technology with Himflax. We are always looking for passionate, talented individuals to lead the next digital frontier.
          </motion.p>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 relative z-20">
          {/* Filter Bar - Static height for zero CLS */}
          <div className="flex flex-wrap gap-3 mb-16 justify-center bg-white/70 backdrop-blur-xl p-4 rounded-[2.5rem] shadow-2xl border border-white/20 h-auto sm:h-[84px] items-center">
            {filters.map((f) => (
              <button 
                key={f} 
                onClick={() => setActiveFilter(f)} 
                className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === f 
                    ? 'bg-secondary-900 text-white shadow-xl shadow-secondary-900/20 scale-105' 
                    : 'bg-transparent text-secondary-500 hover:bg-secondary-100 hover:text-secondary-900'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Jobs Container - Min height to prevent jumping */}
          <div className="grid gap-8 min-h-[800px]">
            {isLoading ? (
              [1, 2, 3].map((i) => <SkeletonCard key={i} />)
            ) : jobs.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-40 bg-white rounded-[3rem] border border-secondary-100 shadow-soft"
              >
                <div className="w-24 h-24 mx-auto bg-secondary-50 rounded-3xl flex items-center justify-center mb-8">
                  <HiOutlineMagnifyingGlass className="w-10 h-10 text-secondary-300" />
                </div>
                <h3 className="text-3xl font-black text-secondary-900 mb-4">No current openings</h3>
                <p className="text-secondary-500 font-bold max-w-sm mx-auto">We don't have any positions matching this category right now, but we're always growing!</p>
              </motion.div>
            ) : (
              jobs.map((job) => (
                <JobCard 
                  key={job._id} 
                  job={job} 
                  onApply={handleApply} 
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Lazy Loaded Modal */}
      <AnimatePresence>
        {selectedJob && (
          <Suspense fallback={null}>
            <ApplyModal 
              job={selectedJob} 
              onClose={handleCloseModal} 
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(Careers);
