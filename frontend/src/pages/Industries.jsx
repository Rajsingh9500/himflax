import { motion } from 'framer-motion';
import { HiOutlineHeart, HiOutlineBanknotes, HiOutlineShoppingBag, HiOutlineAcademicCap, HiOutlineHome, HiOutlineTruck, HiOutlineArrowRight } from 'react-icons/hi2';
import Button from '../components/ui/Button';
import OptimizedImage from '../components/ui/OptimizedImage';
import { Link } from 'react-router-dom';

const industries = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Empowering medical providers with secure telemedicine platforms and patient management systems.',
    icon: HiOutlineHeart,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    color: 'bg-rose-500'
  },
  {
    id: 'finance',
    title: 'Finance & Fintech',
    description: 'Building secure, scalable banking solutions and transaction systems with industry-leading security.',
    icon: HiOutlineBanknotes,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    color: 'bg-blue-600'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Creating high-conversion retail platforms and seamless shopping experiences for global brands.',
    icon: HiOutlineShoppingBag,
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
    color: 'bg-amber-500'
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Transforming learning with interactive LMS platforms and digital classroom solutions.',
    icon: HiOutlineAcademicCap,
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
    color: 'bg-emerald-600'
  },
  {
    id: 'realestate',
    title: 'Real Estate',
    description: 'Streamlining property management and virtual tours with advanced digital real estate tools.',
    icon: HiOutlineHome,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    color: 'bg-indigo-600'
  },
  {
    id: 'logistics',
    title: 'Logistics',
    description: 'Optimizing supply chains and fleet management with real-time tracking and AI analytics.',
    icon: HiOutlineTruck,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    color: 'bg-secondary-700'
  }
];

export default function Industries() {
  return (
    <div className="bg-white min-h-screen">
      {/* Immersive Hero Header */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-secondary-950 pt-24 pb-20">
        <div className="absolute inset-0 z-0">
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600" 
            alt="Industries" 
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
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-200">Global Expertise</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter"
          >
            Industries We <br />
            <span className="text-gradient">Empower</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-secondary-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Tailored IT solutions for the world's most demanding sectors. We combine deep domain knowledge with cutting-edge technology.
          </motion.p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24 bg-white relative z-10 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-secondary-100 shadow-soft hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Container */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <OptimizedImage 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating Icon */}
                  <div className={`absolute top-6 left-6 w-14 h-14 rounded-2xl ${item.color} text-white flex items-center justify-center shadow-lg z-10`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-10">
                  <h3 className="text-2xl font-black text-secondary-900 mb-4 tracking-tight uppercase">{item.title}</h3>
                  <p className="text-secondary-500 font-medium leading-relaxed mb-8">
                    {item.description}
                  </p>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-2 text-sm font-black text-primary-600 uppercase tracking-widest hover:gap-4 transition-all"
                  >
                    Learn More <HiOutlineArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-secondary-50 border-y border-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-secondary-900 mb-8 tracking-tight">Why Industry Leaders Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-12 mt-16">
            <div className="p-8">
              <div className="text-5xl font-black text-primary-600 mb-4">99%</div>
              <p className="text-secondary-900 font-black uppercase tracking-widest text-xs mb-2">Success Rate</p>
              <p className="text-secondary-500 text-sm font-medium">In digital transformation projects across sectors.</p>
            </div>
            <div className="p-8 border-x border-secondary-200">
              <div className="text-5xl font-black text-primary-600 mb-4">24/7</div>
              <p className="text-secondary-900 font-black uppercase tracking-widest text-xs mb-2">Global Support</p>
              <p className="text-secondary-500 text-sm font-medium">Round-the-clock technical assistance for critical systems.</p>
            </div>
            <div className="p-8">
              <div className="text-5xl font-black text-primary-600 mb-4">50+</div>
              <p className="text-secondary-900 font-black uppercase tracking-widest text-xs mb-2">Enterprises</p>
              <p className="text-secondary-500 text-sm font-medium">Trust our industry-specific solutions globally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-secondary-900 mb-8 tracking-tight">Ready to innovate in your sector?</h2>
          <p className="text-secondary-500 text-lg mb-12 font-medium">Connect with our industry consultants to discuss a tailored technology roadmap for your business.</p>
          <Link to="/contact">
            <Button variant="primary" size="lg" className="rounded-2xl px-12 py-6 uppercase tracking-[0.2em] font-black text-xs shadow-glow-primary">
              Schedule a Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
