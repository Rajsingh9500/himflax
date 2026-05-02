import { motion } from 'framer-motion';
import { HiOutlineArrowRight, HiOutlineCalendar, HiOutlineUser } from 'react-icons/hi2';
import OptimizedImage from '../components/ui/OptimizedImage';

const blogs = [
  {
    title: '#1 From Clicks to Conversion Rate | Best SEO Strategies for US Websites',
    excerpt: 'Clicks to Conversion Rate: A website\'s success isn\'t just measured by the number of visitors it attracts but by how many of those visitors convert...',
    author: 'Himflax Group',
    date: 'May 15, 2024',
    image: '/images/blog/digital-transform.jpg',
    category: 'SEO'
  },
  {
    title: 'Revolutionizing SEO update 2024: Keywords, Content, Mobile Optimization',
    excerpt: 'Welcome to the realm of Search Engine Optimization (SEO) update 2024, where understanding Google\'s algorithm updates is like unlocking the secret to digital success...',
    author: 'Himflax Group',
    date: 'April 24, 2024',
    image: '/images/blog/cybersecurity.jpg',
    category: 'Optimization'
  },
  {
    title: 'Top 3 UK SEO Services You Need to Success in the USA',
    excerpt: 'Search Engine Optimization (SEO) stands out as an important part of businesses aiming to grow and do well online. Especially in the United Kingdom, where...',
    author: 'Himflax Group',
    date: 'April 15, 2024',
    image: '/images/blog/cloud-migration.jpg',
    category: 'Marketing'
  },
  {
    title: 'SEO Consulting Services | Best 5 Ways to Empower Your Business',
    excerpt: 'SEO Consulting Services & SEO Consultants in the digital world, where every click counts and visibility rules are most powerful, businesses are turning to SEO...',
    author: 'Himflax Group',
    date: 'April 4, 2024',
    image: '/images/blog/agile.jpg',
    category: 'Consulting'
  },
  {
    title: '12 Simple Reasons Why Your Business Needs Top SEO Services in the USA',
    excerpt: '12 Simple Reasons Why Your Business Needs Top SEO Services in the USA. In today\'s digital world, it\'s super important for your business to be...',
    author: 'Himflax Group',
    date: 'February 26, 2024',
    image: '/images/blog/ai-business.jpg',
    category: 'Business'
  },
  {
    title: '5 Best Digital Marketing Services in the USA',
    excerpt: 'Enhance Your Business: The 5 Best Digital Marketing Services in the USA. In today\'s digital world, getting your brand noticed is...',
    author: 'Himflax Group',
    date: 'January 31, 2024',
    image: '/images/blog/mobile-first.jpg',
    category: 'Marketing'
  }
];

export default function Blog() {
  return (
    <div className="bg-white">
      {/* Immersive Hero Header */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-secondary-950 pt-24 pb-20">
        <div className="absolute inset-0 z-0">
          <OptimizedImage 
            src="/images/blog/blog-hero.jpg" 
            alt="Himflax Blog" 
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
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-200">Insights & Updates</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter"
          >
            Thoughts on <br />
            <span className="text-gradient">Technology</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-secondary-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Exploring the latest trends in SEO, Digital Marketing, and Software Engineering to keep your business ahead of the curve.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl overflow-hidden border border-secondary-100 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <OptimizedImage 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                     <span className="bg-primary-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                        {blog.category}
                     </span>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-6 mb-4 text-xs font-bold text-secondary-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                       <HiOutlineUser className="w-4 h-4 text-primary-500" />
                       {blog.author}
                    </div>
                    <div className="flex items-center gap-2">
                       <HiOutlineCalendar className="w-4 h-4 text-primary-500" />
                       {blog.date}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-secondary-900 mb-4 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {blog.title}
                  </h3>
                  
                  <p className="text-secondary-600 mb-8 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                  
                  <div className="mt-auto">
                    <button className="flex items-center gap-2 text-primary-600 font-bold hover:gap-4 transition-all">
                      Read More <HiOutlineArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          
          {/* Pagination Placeholder */}
          <div className="mt-20 flex justify-center gap-3">
             <button className="w-12 h-12 rounded-xl bg-primary-600 text-white font-bold shadow-glow">1</button>
             <button className="w-12 h-12 rounded-xl bg-white border border-secondary-100 text-secondary-600 font-bold hover:bg-secondary-50 transition-colors">2</button>
             <button className="w-12 h-12 rounded-xl bg-white border border-secondary-100 text-secondary-600 font-bold hover:bg-secondary-50 transition-colors">3</button>
             <button className="w-12 h-12 rounded-xl bg-white border border-secondary-100 text-secondary-600 font-bold hover:bg-secondary-50 transition-colors">4</button>
          </div>
        </div>
      </section>
    </div>
  );
}
