// frontend/src/components/sections/WhyUs.jsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { HiCheckCircle, HiCog, HiSupport, HiLockClosed, HiRefresh, HiChartBar } from 'react-icons/hi';

const reasons = [
  { icon: HiCheckCircle, title: 'Proven Track Record', description: '500+ successful projects delivered across 20+ countries.' },
  { icon: HiCog, title: 'Agile Methodology', description: 'Iterative development with bi-weekly demos and continuous feedback.' },
  { icon: HiSupport, title: '24/7 Support', description: 'Round-the-clock technical support and maintenance for all projects.' },
  { icon: HiLockClosed, title: 'Enterprise Security', description: 'SOC 2 compliant processes and security-first development approach.' },
  { icon: HiRefresh, title: 'Continuous Improvement', description: 'Regular updates, performance monitoring, and proactive optimization.' },
  { icon: HiChartBar, title: 'Data-Driven Results', description: 'Every decision backed by analytics, metrics, and real-world insights.' },
];

function WhyUs() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Why Choose Us"
          title={<>Why Companies <span className="text-gradient">Trust</span> Himflax</>}
          description="We combine technical excellence with business acumen to deliver solutions that truly matter."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative p-8 rounded-[2rem] bg-secondary-50 border border-secondary-100 hover:bg-white hover:shadow-soft hover:-translate-y-1 hover:border-primary-200 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-300 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-secondary-100 text-primary-600 flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <reason.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-3">{reason.title}</h3>
                <p className="text-secondary-500 leading-relaxed font-medium">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(WhyUs);
