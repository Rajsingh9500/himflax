// frontend/src/components/sections/Services.jsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { HiCode, HiDeviceMobile, HiTrendingUp, HiCloud, HiUserGroup, HiDatabase, HiArrowRight } from 'react-icons/hi';

const services = [
  {
    icon: HiCode,
    title: 'Web Development',
    description: 'Custom web applications built with React, Next.js, and Node.js. Scalable, fast, and designed for conversion.',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]',
    iconColor: 'text-blue-500 bg-blue-500/10 group-hover:bg-blue-500 group-hover:text-white',
  },
  {
    icon: HiDeviceMobile,
    title: 'Mobile App Development',
    description: 'Cross-platform iOS and Android apps using React Native and Flutter. Native performance, single codebase.',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]',
    iconColor: 'text-purple-500 bg-purple-500/10 group-hover:bg-purple-500 group-hover:text-white',
  },
  {
    icon: HiTrendingUp,
    title: 'Digital Marketing',
    description: 'SEO, SEM, social media, and content strategies that drive qualified traffic and increase conversions.',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]',
    iconColor: 'text-green-500 bg-green-500/10 group-hover:bg-green-500 group-hover:text-white',
  },
  {
    icon: HiCloud,
    title: 'Cloud Solutions',
    description: 'AWS, Azure, and GCP migration, DevOps automation, and cloud-native architecture design.',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]',
    iconColor: 'text-cyan-500 bg-cyan-500/10 group-hover:bg-cyan-500 group-hover:text-white',
  },
  {
    icon: HiUserGroup,
    title: 'IT Staffing',
    description: 'Hire vetted engineers, designers, and project managers on-demand. Flexible contracts, top talent.',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]',
    iconColor: 'text-amber-500 bg-amber-500/10 group-hover:bg-amber-500 group-hover:text-white',
  },
  {
    icon: HiDatabase,
    title: 'Salesforce / CRM',
    description: 'Custom Salesforce implementations, integrations, and CRM solutions tailored to your sales pipeline.',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]',
    iconColor: 'text-red-500 bg-red-500/10 group-hover:bg-red-500 group-hover:text-white',
  },
];

function Services() {
  return (
    <section id="services" className="py-24 md:py-40 bg-secondary-50 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-primary-100/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[800px] h-[800px] bg-accent-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionHeading
          subtitle="Our Expertise"
          title={
            <>
               Tailored <span className="text-gradient">Solutions</span> For You
            </>
          }
          description="We combine deep industry expertise with the latest technological innovations to solve your most complex business challenges."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className={`group relative h-full bg-white rounded-[2.5rem] p-10 border border-secondary-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -z-0 transition-transform duration-500 group-hover:scale-110 opacity-50" />
                
                <div
                  className={`relative z-10 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-all duration-500 ${service.iconColor} shadow-sm group-hover:rotate-6`}
                >
                  <service.icon className="w-10 h-10" />
                </div>
                
                <h3 className="relative z-10 text-2xl font-bold text-secondary-900 mb-6 tracking-tight">
                  {service.title}
                </h3>
                
                <p className="relative z-10 text-secondary-500 leading-relaxed mb-8 font-medium">
                  {service.description}
                </p>
                
                <div className="relative z-10 mt-auto flex items-center gap-3 text-primary-600 font-bold group-hover:gap-5 transition-all duration-300 cursor-pointer">
                  <span>Explore Details</span>
                  <HiArrowRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Services);
