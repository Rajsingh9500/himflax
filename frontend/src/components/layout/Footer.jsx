// frontend/src/components/layout/Footer.jsx
import { memo } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from 'react-icons/hi';
import {
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
} from 'react-icons/fa';

const services = [
  'Cloud Computing',
  'Devops/Technologies',
  'Digital Marketing',
  'IT Staffing /Staff Augmentation',
  'Marketing Technology',
  'Mobile App Development',
  'Web Design & Development',
];

const industries = [
  'Education',
  'Financial Services',
  'Health Care',
  'Retail',
];

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Industries', href: '/industries' },
  { name: 'Careers', href: '/careers' },
  { name: 'Blog', href: '/blog' },
];

const socialLinks = [
  { Icon: FaFacebookF, href: '#', label: 'Facebook' },
  { Icon: FaTwitter, href: '#', label: 'Twitter' },
  { Icon: FaInstagram, href: '#', label: 'Instagram' },
  { Icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-950 text-secondary-300 border-t border-secondary-900">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Contact Info (As per screenshot "Contact") */}
          <div>
            <h3 className="text-white font-bold text-xl mb-8 border-b border-primary-500 w-fit pb-2">Contact</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker className="w-5 h-5 text-primary-500 flex-shrink-0 mt-1" />
                <span className="text-sm leading-relaxed">
                  A-48, Sector-64, Noida – 201301, (UP) INDIA
                </span>
              </li>
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker className="w-5 h-5 text-primary-500 flex-shrink-0 mt-1" />
                <span className="text-sm leading-relaxed">
                  3240, East State Street Ext, Ste #3, Hamilton NJ 08619
                </span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlinePhone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+15162002008" className="text-sm hover:text-primary-400 transition-colors">+1 516-200-2008</a>
                  <a href="tel:+15162002008" className="text-sm hover:text-primary-400 transition-colors">+1 516-200-2008</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlinePhone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a href="tel:+919899577740" className="text-sm hover:text-primary-400 transition-colors">+91 9899577740</a>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineMail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a href="mailto:info@himflax.com" className="text-sm hover:text-primary-400 transition-colors uppercase tracking-wider">
                  info@himflax.com
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-xl mb-8 border-b border-primary-500 w-fit pb-2">Services</h3>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service} className="flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  <Link to="/services" className="text-sm text-secondary-400 group-hover:text-primary-400 transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-white font-bold text-xl mb-8 border-b border-primary-500 w-fit pb-2">Industries</h3>
            <ul className="space-y-4">
              {industries.map((industry) => (
                <li key={industry} className="flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  <Link to="/industries" className="text-sm text-secondary-400 group-hover:text-primary-400 transition-colors">
                    {industry}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-xl mb-8 border-b border-primary-500 w-fit pb-2">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name} className="flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  <Link to={link.href} className="text-sm text-secondary-400 group-hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Certifications Row */}
        <div className="mt-20 flex flex-wrap justify-center items-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-bold text-white text-center border border-white/20">CMMI<br />LEVEL 3</div>
          <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-bold text-white text-center border border-white/20">ISO<br />9001:2015</div>
          <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-bold text-white text-center border border-white/20">ISO<br />27001:2013</div>
          <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-bold text-white text-center border border-white/20">MWB<br />CERTIFIED</div>
          <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-bold text-white text-center border border-white/20">E-Verify</div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-secondary-950 py-2 border-t border-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center">
              <img
                src="/logo-white.svg"
                alt="Himflax"
                className="h-14 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
          </div>

          <p className="text-sm text-secondary-500 font-medium">
            © {currentYear - 8} - {currentYear}  All Rights Reserved. Himflax Information Technologies Pvt. Ltd.
          </p>

          <div className="flex gap-4">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-full bg-secondary-900 flex items-center justify-center text-secondary-400 hover:bg-primary-600 hover:text-white transition-all duration-300"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
