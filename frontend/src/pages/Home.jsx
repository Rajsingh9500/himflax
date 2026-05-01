import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import HeroCarousel from '../components/sections/HeroCarousel';

// Lazy load sections
const About = lazy(() => import('../components/sections/About'));
const Services = lazy(() => import('../components/sections/Services'));
const Industries = lazy(() => import('../components/sections/Industries'));
const Stats = lazy(() => import('../components/sections/Stats'));
const WhyUs = lazy(() => import('../components/sections/WhyUs'));
const Portfolio = lazy(() => import('../components/sections/Portfolio'));
const Testimonials = lazy(() => import('../components/sections/Testimonials'));
const Contact = lazy(() => import('../components/sections/Contact'));

// Section Wrapper with reserved space
const LazySection = ({ children, minHeight = '500px' }) => (
  <div style={{ minHeight, containIntrinsicSize: `0 ${minHeight}`, contentVisibility: 'auto' }}>
    <Suspense fallback={<div style={{ minHeight }} className="bg-secondary-50 animate-pulse" />}>
      {children}
    </Suspense>
  </div>
);

function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <HeroCarousel />
      <LazySection><About /></LazySection>
      <LazySection><Services /></LazySection>
      <LazySection><Industries /></LazySection>
      <LazySection minHeight="300px"><Stats /></LazySection>
      <LazySection><WhyUs /></LazySection>
      <LazySection><Portfolio /></LazySection>
      <LazySection><Testimonials /></LazySection>
      <LazySection><Contact /></LazySection>
    </motion.div>
  );
}

export default Home;
