import { motion } from 'framer-motion';
import { HiOutlineCloud, HiOutlineGlobeAlt, HiOutlineDevicePhoneMobile, HiOutlineUserGroup, HiOutlineCpuChip, HiOutlineChartBar, HiOutlineSwatch, HiOutlineMegaphone, HiOutlineBeaker } from 'react-icons/hi2';
import Button from '../components/ui/Button';
import OptimizedImage from '../components/ui/OptimizedImage';

const services = [
  {
    title: 'Cloud Solutions',
    description: 'We facilitate marketers to use the technology in more straightforward and profound ways, that drive results...',
    icon: HiOutlineCloud,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    title: 'Website Design & Development',
    description: 'We deliver cutting-edge, holistic solutions, ensuring comprehensive outcomes for your unique business problems...',
    icon: HiOutlineGlobeAlt,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50'
  },
  {
    title: 'Mobile App Development',
    description: 'Mobile phones are the most important gadget used by the entire world population. Although the features can differ, or the os...',
    icon: HiOutlineDevicePhoneMobile,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50'
  },
  {
    title: 'Staff Augmentation',
    description: 'There are times when you wish to fill the gaps in your capabilities. You need a partner who is trustworthy, skilled, and flexible...',
    icon: HiOutlineUserGroup,
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  },
  {
    title: 'Devops/Technologies',
    description: 'If you are looking for a Devops/Technologies company that offers you brilliance in its services at an affordable...',
    icon: HiOutlineCpuChip,
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  },
  {
    title: 'Marketing Technology',
    description: 'HimFlax enables you to create and nurture your online presence. We strive to amaze and satisfy our customers by offering...',
    icon: HiOutlineChartBar,
    color: 'text-rose-600',
    bg: 'bg-rose-50'
  },
  {
    title: 'Graphics Design',
    description: 'HimFlax enables you to create and nurture your online presence. We strive to amaze and satisfy our customers by offering...',
    icon: HiOutlineSwatch,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  {
    title: 'Digital Marketing',
    description: 'HimFlax enables you to create and nurture your online presence. We strive to amaze and satisfy our customers by offering...',
    icon: HiOutlineMegaphone,
    color: 'text-orange-600',
    bg: 'bg-orange-50'
  },
  {
    title: 'Artificial Intelligence',
    description: 'HimFlax enables you to create and nurture your online presence. We strive to amaze and satisfy our customers by offering...',
    icon: HiOutlineBeaker,
    color: 'text-violet-600',
    bg: 'bg-violet-50'
  },
];

export default function Services() {
  return (
    <div className="bg-white">
      {/* Immersive Hero Header */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-secondary-950 pt-24 pb-20">
        <div className="absolute inset-0 z-0">
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
            alt="Services" 
            className="w-full h-full object-cover opacity-20 scale-110 blur-[2px]"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary-950 via-secondary-950/40 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-200">Our Services</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter"
          >
            Solutions for the <br />
            <span className="text-gradient">Next Generation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-secondary-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Delivering cutting-edge technology solutions that drive efficiency, innovation, and sustainable growth for your business.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
             <h2 className="text-primary-600 font-bold tracking-widest uppercase text-sm mb-4">Increase Your Skill Explore</h2>
             <h3 className="text-5xl font-bold text-secondary-900 mb-6 tracking-tight">Top Services</h3>
             <p className="text-secondary-600 text-lg">We provide comprehensive IT solutions tailored to your business needs.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-10 rounded-[2.5rem] bg-white border border-secondary-100 hover:border-primary-500 hover:shadow-2xl transition-all duration-500 text-center"
              >
                <div className={`${service.bg} ${service.color} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm`}>
                  <service.icon className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-secondary-900 mb-4 tracking-tight">{service.title}</h4>
                <p className="text-secondary-600 leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-8 flex justify-center">
                   <div className="w-12 h-1.5 rounded-full bg-secondary-100 group-hover:w-24 group-hover:bg-primary-500 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold text-secondary-900 mb-8 tracking-tight">Need a custom solution for your business?</h3>
            <Button variant="primary" size="lg" className="px-12 py-5 rounded-full shadow-glow text-lg">
               Contact Us Today
            </Button>
         </div>
      </section>
    </div>
  );
}
