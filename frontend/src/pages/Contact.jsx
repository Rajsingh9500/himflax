import { motion } from 'framer-motion';
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin, HiOutlineGlobeAlt, HiOutlinePaperAirplane, HiOutlineChatBubbleLeftRight, HiOutlineClock } from 'react-icons/hi2';
import Button from '../components/ui/Button';
import OptimizedImage from '../components/ui/OptimizedImage';

const contactMethods = [
  {
    id: 'india',
    title: 'India Office',
    details: 'A-48, Sector-64, Noida – 201301, (UP) INDIA',
    icon: HiOutlineMapPin,
    color: 'from-amber-400 to-orange-600'
  },
  {
    id: 'usa',
    title: 'USA Office',
    details: '3240, East State Street Ext, Ste #3, Hamilton NJ 08619',
    icon: HiOutlineGlobeAlt,
    color: 'from-blue-400 to-indigo-600'
  },
  {
    id: 'email',
    title: 'Email Us',
    details: 'info@himflax.com\nsupport@himflax.com',
    icon: HiOutlineEnvelope,
    color: 'from-emerald-400 to-teal-600'
  },
  {
    id: 'phone',
    title: 'Call Us',
    details: '+1 516-200-2008\n+91-9899577740',
    icon: HiOutlinePhone,
    color: 'from-rose-400 to-pink-600'
  }
];

export default function Contact() {
  const inputClass = "w-full px-6 py-5 rounded-2xl bg-secondary-50/50 border border-secondary-200 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/5 transition-all font-medium text-secondary-900 placeholder:text-secondary-400";

  return (
    <div className="bg-white min-h-screen">
      {/* Immersive Dark Header */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-secondary-950 pt-24 pb-20">
        <div className="absolute inset-0 z-0">
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&q=80&w=1600" 
            alt="Contact background" 
            className="w-full h-full object-cover opacity-20 scale-110 blur-[2px]"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary-950 via-secondary-950/40 to-transparent" />
        </div>

        {/* Abstract Shapes */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-glow/10 blur-[100px] rounded-full" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-200">Connect with us</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter"
          >
            Let's Start a <br />
            <span className="text-gradient">Conversation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-secondary-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Whether you have a question about our services, pricing, or just want to explore the future of IT, our team is ready to connect.
          </motion.p>
        </div>
      </section>

      {/* Info Cards Grid */}
      <section className="py-20 relative z-10 -mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, i) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white p-10 rounded-[2.5rem] border border-secondary-100 shadow-soft hover:shadow-2xl hover:border-primary-200 transition-all duration-500 overflow-hidden"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                  <method.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-black text-secondary-900 mb-3 uppercase tracking-wider">{method.title}</h4>
                <p className="text-secondary-500 font-medium leading-relaxed whitespace-pre-line">
                  {method.details}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Contact Info Column */}
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-secondary-900 mb-6 tracking-tight">Drop us a line</h2>
                <p className="text-secondary-500 text-lg font-medium leading-relaxed">
                  Fill out the form and our experts will get back to you within 24 hours. We're excited to learn more about your project.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                    <HiOutlineChatBubbleLeftRight className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-secondary-900">Live Chat</h5>
                    <p className="text-sm text-secondary-500">Available 24/7 for support</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-glow/10 flex items-center justify-center text-accent-500 shrink-0">
                    <HiOutlineClock className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-secondary-900">Working Hours</h5>
                    <p className="text-sm text-secondary-500">Mon-Fri: 9am - 6pm IST</p>
                  </div>
                </div>
              </div>

              {/* Map Container */}
              <div className="rounded-[3rem] overflow-hidden shadow-soft border border-secondary-100 aspect-[16/10] relative group">
                <div className="absolute inset-0 bg-secondary-50 flex items-center justify-center text-secondary-300 font-bold uppercase tracking-widest text-xs z-0">
                  Loading Global Network...
                </div>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.562064115167!2d77.3768393!3d28.612912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce561937409f9%3A0xc4842e47262c5e5c!2sHimflax%20Information%20Technologies%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1713800000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="relative z-10 grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            {/* Premium Form Column */}
            <div className="bg-white p-2 sm:p-12 rounded-[3.5rem] border border-secondary-100 shadow-soft relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-[100%] -z-0 opacity-50" />
              
              <form className="relative z-10 space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-secondary-900 ml-1">Full Name</label>
                    <input id="name" type="text" placeholder="John Doe" className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-secondary-900 ml-1">Email Address</label>
                    <input id="email" type="email" placeholder="john@example.com" className={inputClass} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-secondary-900 ml-1">Phone Number</label>
                    <input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="service" className="text-xs font-black uppercase tracking-widest text-secondary-900 ml-1">Service</label>
                    <select id="service" className={inputClass}>
                      <option>Select Service</option>
                      <option>Web Development</option>
                      <option>Mobile Apps</option>
                      <option>Digital Marketing</option>
                      <option>Cloud Solutions</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-secondary-900 ml-1">Message</label>
                  <textarea id="message" rows="5" placeholder="Tell us about your project..." className={`${inputClass} resize-none`} />
                </div>

                <Button variant="primary" size="lg" className="w-full rounded-2xl py-6 shadow-glow-primary group overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest">
                    Send Message <HiOutlinePaperAirplane className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
