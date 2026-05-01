// frontend/src/components/sections/About.jsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { HiLightningBolt, HiShieldCheck, HiClock, HiUserGroup } from 'react-icons/hi';

const values = [
  { icon: HiLightningBolt, title: 'Innovation First', description: 'Leveraging the latest technologies to keep you ahead.' },
  { icon: HiShieldCheck, title: 'Quality Assured', description: 'Rigorous testing ensures every deliverable is perfect.' },
  { icon: HiClock, title: 'On-Time Delivery', description: 'Agile methodology means your projects ship on schedule.' },
  { icon: HiUserGroup, title: 'Dedicated Teams', description: 'Skilled engineers committed to your success.' },
];

function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left — Content */}
          <div>
            <SectionHeading
              subtitle="Who We Are"
              title={
                <>
                  Building the <span className="text-gradient">Future</span> of
                  Digital Business
                </>
              }
              description="Himflax Information Technology is a premier IT services company delivering end-to-end technology solutions since 2012. We partner with startups, SMEs, and enterprises to transform ideas into impactful digital products."
              align="left"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group flex gap-5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-secondary-50 border border-secondary-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-50 group-hover:border-primary-100 transition-colors">
                    <value.icon className="w-7 h-7 text-secondary-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-secondary-500 leading-relaxed font-medium">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — Glass Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            {/* Background glowing shape */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-400 to-accent-300 rounded-[3rem] blur-2xl opacity-20 animate-pulse" />
            
            <div className="relative rounded-[3rem] overflow-hidden bg-secondary-900 aspect-[4/3] border border-secondary-800 shadow-2xl p-1">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay" />
              
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="glass-dark rounded-3xl p-10 text-center max-w-sm w-full border-t-white/10 border-l-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                  
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mx-auto mb-6 flex items-center justify-center shadow-glow">
                    <span className="text-3xl font-bold text-white">H</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">12+ Years</h3>
                  <p className="text-secondary-400 font-medium tracking-wide uppercase text-sm">Of Digital Excellence</p>
                </div>
              </div>
            </div>

            {/* Floating metric */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-8 -left-8 glass rounded-2xl shadow-xl p-5 pr-8 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <HiShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-secondary-900">ISO Certified</div>
                <div className="text-sm text-secondary-500 font-medium">Quality Standards</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(About);
