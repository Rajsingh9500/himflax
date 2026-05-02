import { motion } from 'framer-motion';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import Button from '../components/ui/Button';
import OptimizedImage from '../components/ui/OptimizedImage';

const stats = [
  { label: 'Happy Customers', value: '12+', color: 'bg-amber-50/50 text-amber-600 border-amber-100' },
  { label: 'Projects Delivered', value: '33+', color: 'bg-emerald-50/50 text-emerald-600 border-emerald-100' },
  { label: 'Global Clients', value: '10+', color: 'bg-blue-50/50 text-blue-600 border-blue-100' },
  { label: 'Years Expertise', value: '05+', color: 'bg-rose-50/50 text-rose-600 border-rose-100' },
];

const values = [
  'Expertise and experience you can trust',
  'Tailored solutions for your specific needs',
  'Proven track record of success',
  'Highly skilled and dedicated professional team',
  'Commitment to transparency and communication',
  'State-of-the-art infrastructure and technology',
  'Cost-effective and time-efficient solutions',
  'Continuous monitoring and quality control',
  'Global presence and local expertise',
];

const team = [
  { name: 'Vipin Singh', role: 'Founder & CEO', image: '/images/about/vipin.jpg' },
  { name: 'Mansi Singh', role: 'COO', image: '/images/about/mansi.jpg' },
  { name: 'Ankur Kang', role: 'CTO', image: '/images/about/ankur.jpg' },
  { name: 'Sudeep Jha', role: 'Sales Manager', image: '/images/about/sudeep.jpg' },
  { name: 'Sandeep Kumar', role: 'Technical Lead', image: '/images/about/sandeep.jpg' },
  { name: 'Harshit Kapoor', role: 'Project Manager', image: '/images/about/harshit.jpg' },
];

export default function About() {
  return (
    <div className="bg-white">
      {/* Immersive Hero Header */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-secondary-950 pt-24 pb-20">
        <div className="absolute inset-0 z-0">
          <OptimizedImage 
            src="/images/about/office-hero.jpg" 
            alt="About Himflax" 
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
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-200">Our Story & Vision</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter"
          >
            Pioneering the <br />
            <span className="text-gradient">Digital Frontier</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-secondary-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
          >
            A team of passionate technologists dedicated to transforming complex business challenges into seamless digital experiences.
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-primary-600 font-bold tracking-widest uppercase text-sm mb-4">About Himflax</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6 leading-tight">
                Empowering you through innovative technology solutions
              </h3>
              <p className="text-secondary-600 text-lg leading-relaxed mb-8">
                HIMFLAX Information Technologies Pvt Ltd is a fast-growing IT service company. 
                Our goal is to provide software solutions that can solve your complex business problems 
                with better efficiency and in a professional way. We are a team of experienced and 
                talented professionals who are passionate about delivering the best technology solutions to our clients.
              </p>
              <Button variant="primary" size="lg" className="rounded-xl px-8 shadow-glow">
                Learn More
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-secondary-100 aspect-video"
            >
              <OptimizedImage 
                src="/images/about/team-collab.jpg" 
                alt="Team working"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`${stat.color} p-8 rounded-3xl text-center shadow-sm border border-black/5 hover:scale-105 transition-transform`}
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm font-bold uppercase tracking-wider opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">Why Himflax?</h2>
            <p className="text-secondary-600">We stand out because of our commitment to excellence and innovation.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-6 rounded-2xl bg-secondary-50 border border-secondary-100 hover:border-primary-300 hover:bg-white transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <HiOutlineCheckCircle className="w-6 h-6" />
                </div>
                <span className="text-secondary-800 font-semibold">{value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-primary-600 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <motion.div
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="aspect-[4/3] rounded-[3.5rem] overflow-hidden border border-white/20 shadow-2xl"
               >
                  <OptimizedImage 
                    src="/images/about/workspace.jpg" 
                    alt="Target"
                    className="w-full h-full object-cover"
                  />
               </motion.div>
               <motion.div
                 initial={{ opacity: 0, x: 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="text-white"
               >
                   <div className="flex flex-wrap gap-4 mb-10">
                      <button className="px-8 py-2.5 rounded-full bg-white text-primary-600 font-black uppercase tracking-widest text-[10px] shadow-glow">Mission</button>
                      <button className="px-8 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-colors">Vision</button>
                      <button className="px-8 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-colors">Values</button>
                   </div>
                  <h3 className="text-4xl font-bold mb-6">Mission</h3>
                  <p className="text-primary-50 text-xl leading-relaxed mb-8">
                     At HIMFLAX Information Technologies, our mission is to enable organizations to achieve 
                     their strategic goals by delivering innovative technology solutions through 
                     best-of-breed software solutions and services. We are dedicated to delivering 
                     sustainable business results that enable our clients to achieve their business objectives.
                  </p>
               </motion.div>
            </div>
         </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
             <h2 className="text-primary-600 font-bold tracking-widest uppercase text-sm mb-4">Our Leadership</h2>
             <h3 className="text-4xl font-bold text-secondary-900 mb-4 tracking-tight">Team you'll love to work with</h3>
             <p className="text-secondary-600">Meet the visionaries leading Himflax to new heights.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <div className="absolute inset-0 bg-primary-600 rounded-full scale-0 group-hover:scale-105 transition-transform duration-500 opacity-20" />
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl relative z-10 transition-transform duration-500 group-hover:translate-y-[-10px]"
                  />
                </div>
                <h4 className="text-xl font-bold text-secondary-900 mb-1">{member.name}</h4>
                <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
