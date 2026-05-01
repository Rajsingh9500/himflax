// frontend/src/components/sections/Industries.jsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { HiCurrencyDollar, HiAcademicCap, HiHeart, HiShoppingCart, HiTruck, HiFilm } from 'react-icons/hi';

const industries = [
  { icon: HiCurrencyDollar, name: 'Fintech', color: 'from-green-400 to-emerald-600' },
  { icon: HiAcademicCap, name: 'EdTech', color: 'from-blue-400 to-indigo-600' },
  { icon: HiHeart, name: 'Healthcare', color: 'from-red-400 to-rose-600' },
  { icon: HiShoppingCart, name: 'E-Commerce', color: 'from-purple-400 to-fuchsia-600' },
  { icon: HiTruck, name: 'Logistics', color: 'from-amber-400 to-orange-600' },
  { icon: HiFilm, name: 'Media', color: 'from-pink-400 to-rose-500' },
];

function Industries() {
  return (
    <section className="py-24 md:py-32 bg-secondary-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Industries We Serve"
          title={<>Expertise Across <span className="text-gradient">Industries</span></>}
          description="We bring deep domain expertise to every project, understanding the unique challenges and opportunities in each industry."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group flex flex-col items-center justify-center gap-4 p-8 rounded-3xl bg-white border border-secondary-100 hover:shadow-soft transition-all duration-300 cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${industry.color} flex items-center justify-center text-white shadow-lg shadow-secondary-200 group-hover:shadow-xl transition-shadow duration-300`}>
                <industry.icon className="w-8 h-8" />
              </div>
              <span className="text-base font-bold text-secondary-900 text-center">
                {industry.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Industries);
