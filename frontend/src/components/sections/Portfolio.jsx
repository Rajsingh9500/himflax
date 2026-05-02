// frontend/src/components/sections/Portfolio.jsx
import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import OptimizedImage from '../ui/OptimizedImage';
import { HiExternalLink } from 'react-icons/hi';

const categories = ['All', 'Web', 'Mobile', 'Cloud', 'Marketing'];

const projects = [
  { title: 'FinVault Banking Platform', category: 'Web', description: 'A secure digital banking platform with real-time transactions and AI fraud detection.', tags: ['React', 'Node.js', 'PostgreSQL'], color: 'from-blue-500 to-indigo-600', img: '/images/portfolio/finvault.jpg' },
  { title: 'MedTrack Health App', category: 'Mobile', description: 'Cross-platform health tracking app with telemedicine and wearable integrations.', tags: ['React Native', 'Firebase', 'HealthKit'], color: 'from-green-500 to-emerald-600', img: '/images/portfolio/medtrack.jpg' },
  { title: 'ShopSphere E-Commerce', category: 'Web', description: 'High-performance e-commerce platform handling 100K+ daily orders.', tags: ['Next.js', 'Stripe', 'MongoDB'], color: 'from-purple-500 to-fuchsia-600', img: '/images/portfolio/shopsphere.jpg' },
  { title: 'CloudOps Infrastructure', category: 'Cloud', description: 'AWS multi-region deployment with auto-scaling, CI/CD, and 99.99% uptime.', tags: ['AWS', 'Terraform', 'Kubernetes'], color: 'from-cyan-500 to-blue-600', img: '/images/portfolio/cloudops.jpg' },
  { title: 'GrowthPulse SEO Suite', category: 'Marketing', description: 'Digital marketing analytics dashboard with SEO audit and campaign tracking.', tags: ['Python', 'React', 'BigQuery'], color: 'from-orange-500 to-red-600', img: '/images/portfolio/growthpulse.jpg' },
  { title: 'EduLearn Platform', category: 'Web', description: 'Online learning management system with live classes and AI-powered assessments.', tags: ['Vue.js', 'Django', 'WebRTC'], color: 'from-rose-500 to-pink-600', img: '/images/portfolio/edulearn.jpg' },
];

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle background text */}
      <div className="absolute top-20 left-0 text-[15vw] font-black text-secondary-50 opacity-[0.02] select-none pointer-events-none">
         PORTFOLIO
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          subtitle="Our Success Stories"
          title={<>Built for <span className="text-gradient">Performance</span></>}
          description="We take pride in delivering robust, high-impact digital products that help our clients dominate their respective markets."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary-600 text-white shadow-glow-primary scale-105'
                  : 'bg-secondary-50 text-secondary-400 hover:bg-secondary-100 hover:text-secondary-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-soft hover:shadow-2xl transition-all duration-700 border border-secondary-100 h-full flex flex-col">
                  {/* Image Header */}
                  <div className="h-72 relative overflow-hidden aspect-video bg-secondary-100">
                    <OptimizedImage src={project.img} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-secondary-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-center justify-center p-8">
                       <div className="text-center translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                          <p className="text-white/80 text-sm font-medium mb-6 line-clamp-3 italic">
                             "{project.description}"
                          </p>
                          <div className="inline-flex items-center gap-2 text-white font-bold text-sm bg-primary-600 px-6 py-2 rounded-full shadow-glow">
                             View Case Study <HiExternalLink className="w-4 h-4" />
                          </div>
                       </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-6 left-6 z-30">
                       <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-secondary-900 text-[10px] font-black uppercase tracking-widest shadow-sm">
                          {project.category}
                       </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-10 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-secondary-900 mb-4 group-hover:text-primary-600 transition-colors tracking-tight">
                      {project.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-4 py-1.5 rounded-xl bg-secondary-50 text-secondary-500 text-[10px] font-bold uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Portfolio);
