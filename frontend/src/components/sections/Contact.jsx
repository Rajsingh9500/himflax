// frontend/src/components/sections/Contact.jsx
import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { submitContactForm } from '../../api/contact';
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin } from 'react-icons/hi2';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(3000),
});

const services = ['Web Development', 'Mobile App Development', 'Digital Marketing', 'Cloud Solutions', 'IT Staffing', 'Salesforce / CRM', 'Other'];

const contactInfo = [
  { icon: HiOutlinePhone, label: 'Phone', value: '+1 516-200-2008', href: 'tel:+15162002008' },
  { icon: HiOutlineEnvelope, label: 'Email', value: 'info@himflax.com', href: 'mailto:info@himflax.com' },
  { icon: HiOutlineMapPin, label: 'Location', value: 'Noida, India | NJ, USA', href: null },
];

function Contact() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await submitContactForm(data);
      toast.success(res.message || 'Message sent successfully!');
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full px-5 py-4 rounded-xl border border-secondary-200 bg-secondary-50/50 text-secondary-900 text-sm font-medium placeholder:text-secondary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all';

  return (
    <section id="contact" className="py-24 md:py-32 bg-secondary-950 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-900/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionHeading 
          subtitle="Get In Touch" 
          title={<>Let&apos;s Build Something <span className="text-accent-400">Great</span></>} 
          description="Ready to transform your business? Contact us for a free consultation." 
          light
        />

        <div className="grid lg:grid-cols-5 gap-12 mt-12">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-3">
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-secondary-900 mb-2">Name *</label>
                    <input {...register('name')} placeholder="Your name" className={inputClass} />
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-secondary-900 mb-2">Email *</label>
                    <input {...register('email')} type="email" placeholder="your@email.com" className={inputClass} />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-secondary-900 mb-2">Phone</label>
                    <input {...register('phone')} placeholder="+91 XXXXX XXXXX" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-bold text-secondary-900 mb-2">Service *</label>
                    <select id="service" {...register('service')} className={inputClass}>
                      <option value="">Select a service</option>
                      {services.map((s) => (<option key={s} value={s}>{s}</option>))}
                    </select>
                    {errors.service && <p className="text-red-500 text-xs mt-1 font-medium">{errors.service.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-secondary-900 mb-2">Message *</label>
                  <textarea {...register('message')} rows={5} placeholder="Tell us about your project..." className={`${inputClass} resize-none`} />
                  {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message.message}</p>}
                </div>
                <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full sm:w-auto rounded-full px-10 shadow-glow">
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Info + Map */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2 space-y-6">
            {contactInfo.map((info) => (
              <div key={info.label} className="flex items-start gap-5 p-6 rounded-3xl glass-dark border border-white/10 hover:bg-secondary-800/60 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-primary-600/20 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-7 h-7 text-primary-400" />
                </div>
                <div className="pt-1">
                  <div className="text-sm font-bold text-secondary-400 uppercase tracking-wider mb-1">{info.label}</div>
                  {info.href ? (
                    <a href={info.href} className="text-xl text-white font-semibold hover:text-accent-400 transition-colors">{info.value}</a>
                  ) : (
                    <span className="text-xl text-white font-semibold">{info.value}</span>
                  )}
                </div>
              </div>
            ))}
            
            {/* Google Maps Glass Container */}
            <div className="rounded-3xl overflow-hidden glass-dark border border-white/10 h-64 relative">
              <iframe title="Himflax Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296514!2d77.49085!3d12.9539974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000" width="100%" height="100%" style={{ border: 0, opacity: 0.8, filter: 'contrast(1.2) grayscale(0.5)' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(Contact);
