// frontend/src/components/sections/Testimonials.jsx
import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const testimonials = [
  { name: 'Rajesh Kumar', role: 'CTO, FinVault Technologies', content: 'Himflax delivered our banking platform ahead of schedule with exceptional quality. Their team understood our complex requirements and provided innovative solutions.', rating: 5, avatar: 'RK', color: 'bg-blue-500' },
  { name: 'Priya Sharma', role: 'Founder, MedTrack Health', content: 'Working with Himflax was a game-changer for our startup. They built our health app from scratch, and the result exceeded all our expectations.', rating: 5, avatar: 'PS', color: 'bg-purple-500' },
  { name: 'Amit Patel', role: 'Director, ShopSphere', content: 'Our e-commerce platform handles over 100K orders daily without a hiccup. Himflax engineering team is world-class.', rating: 5, avatar: 'AP', color: 'bg-green-500' },
  { name: 'Sarah Chen', role: 'VP Engineering, CloudOps Inc', content: 'Himflax modernized our entire infrastructure. The migration to AWS was seamless, and we now enjoy 99.99% uptime.', rating: 5, avatar: 'SC', color: 'bg-amber-500' },
];

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 md:py-32 bg-secondary-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-primary-200 rounded-full blur-[100px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-200 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading subtitle="Testimonials" title={<>What Our <span className="text-gradient">Clients</span> Say</>} description="Here is what our partners and clients have to say about working with us." />
        
        <div className="max-w-4xl mx-auto relative mt-10">
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }} className="bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-16 border border-secondary-100 text-center relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-6xl text-primary-200 font-serif leading-none">"</div>
              
              <div className="flex justify-center gap-1.5 mb-8">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (<HiStar key={i} className="w-6 h-6 text-amber-400" />))}
              </div>
              
              <p className="text-xl md:text-2xl text-secondary-800 leading-relaxed mb-10 font-medium tracking-tight">
                {testimonials[current].content}
              </p>
              
              <div className="flex flex-col items-center gap-3">
                <div className={`w-16 h-16 rounded-full ${testimonials[current].color} flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-white`}>
                  {testimonials[current].avatar}
                </div>
                <div>
                  <div className="font-bold text-secondary-900 text-lg">{testimonials[current].name}</div>
                  <div className="text-sm font-semibold text-primary-600 tracking-wide uppercase mt-1">{testimonials[current].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button onClick={prev} className="w-12 h-12 rounded-full bg-white shadow-md border border-secondary-100 flex items-center justify-center text-secondary-400 hover:bg-primary-50 hover:text-primary-600 transition-all hover:scale-110" aria-label="Previous">
              <HiChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? 'bg-primary-600 w-8' : 'bg-secondary-200 w-2.5 hover:bg-secondary-300'}`} aria-label={`Testimonial ${i + 1}`} />
              ))}
            </div>
            <button onClick={next} className="w-12 h-12 rounded-full bg-white shadow-md border border-secondary-100 flex items-center justify-center text-secondary-400 hover:bg-primary-50 hover:text-primary-600 transition-all hover:scale-110" aria-label="Next">
              <HiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Testimonials);
