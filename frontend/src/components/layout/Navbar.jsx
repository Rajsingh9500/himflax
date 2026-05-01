import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Button from '../ui/Button';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

// ─── Config ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Industries', path: '/industries' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact', path: '/contact' },
  { name: 'Blog', path: '/blog' },
];

const SCROLL_THRESHOLD = 50;

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// ─── Desktop Nav Link — with hover + active border-bottom animation ────────────

const DesktopNavLink = memo(({ link, isActive, isScrolled }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={link.path}
      aria-current={isActive ? 'page' : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        // layout
        'relative flex flex-col items-center px-4 py-3 group',
        // text
        'text-[13px] font-semibold tracking-wide uppercase',
        // transition
        'transition-colors duration-200',
        // focus ring
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm',
        // color states
        isActive
          ? isScrolled ? 'text-primary-600' : 'text-white'
          : isScrolled
            ? 'text-secondary-500 hover:text-secondary-900'
            : 'text-white/70 hover:text-white'
      )}
    >
      <span>{link.name}</span>

      {/* Animated underline: shows on hover OR active */}
      <span className="relative mt-0.5 h-[2px] w-full overflow-hidden rounded-full">
        {/* Hover underline */}
        <AnimatePresence>
          {(isHovered && !isActive) && (
            <motion.span
              key="hover-line"
              className={cn(
                'absolute inset-y-0 left-0 right-0 rounded-full',
                isScrolled ? 'bg-secondary-300' : 'bg-white/40'
              )}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0, originX: 1 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            />
          )}
        </AnimatePresence>

        {/* Active underline — shared layoutId so it slides between links */}
        {isActive && (
          <motion.span
            layoutId="nav-active-line"
            className="absolute inset-y-0 left-0 right-0 rounded-full bg-primary-500"
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          />
        )}
      </span>
    </Link>
  );
});
DesktopNavLink.displayName = 'DesktopNavLink';

// ─── Main Navbar ───────────────────────────────────────────────────────────────

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const menuButtonRef = useRef(null);
  const drawerRef = useRef(null);

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Route change
  useEffect(() => {
    setMobileMenuOpen(false);
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  // Focus trap
  useEffect(() => {
    if (!mobileMenuOpen || !drawerRef.current) return;
    const focusables = Array.from(
      drawerRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const trap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      }
    };
    document.addEventListener('keydown', trap);
    first.focus();
    return () => document.removeEventListener('keydown', trap);
  }, [mobileMenuOpen]);

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);
  const toggleMenu = useCallback(() => setMobileMenuOpen((v) => !v), []);

  const drawerTransition = {
    type: shouldReduceMotion ? 'tween' : 'spring',
    damping: 25,
    stiffness: 220,
    duration: shouldReduceMotion ? 0.15 : undefined,
  };

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header
        role="banner"
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-transform duration-500 will-change-transform',
          isScrolled ? 'translate-y-2' : 'translate-y-4'
        )}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div
            className={cn(
              'flex items-center justify-between transition-all duration-500 rounded-[2rem] px-4 lg:px-6',
              isScrolled
                ? 'bg-white/85 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-black/[0.06] py-1'
                : 'bg-transparent py-2'
            )}
          >

            {/* ── Logo ────────────────────────────────────────────────── */}
            <Link
              to="/"
              aria-label="Himflax – go to homepage"
              className="flex items-center flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60 rounded-lg"
            >
              <img
                src={isScrolled ? '/logo.svg' : '/logo-white.svg'}
                alt="Himflax"
                width={140}
                height={58}
                className="h-16 w-auto"
                loading="eager"
                decoding="sync"
              />
            </Link>

            {/* ── Desktop Nav ──────────────────────────────────────────── */}
            <nav
              aria-label="Primary navigation"
              className="hidden md:flex items-center"
            >
              {NAV_LINKS.map((link) => (
                <DesktopNavLink
                  key={link.path}
                  link={link}
                  isActive={location.pathname === link.path}
                  isScrolled={isScrolled}
                />
              ))}
            </nav>

            {/* ── CTA + Hamburger ──────────────────────────────────────── */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="hidden xl:block">
                <Link to="/contact">
                  <Button
                    variant="primary"
                    className={cn(
                      'rounded-full px-6 py-2 font-bold uppercase tracking-wider text-xs transition-all duration-300',
                      isScrolled ? '' : 'bg-primary-600 hover:bg-primary-500'
                    )}
                  >
                    Let's Talk
                  </Button>
                </Link>
              </div>

              <button
                ref={menuButtonRef}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-drawer"
                onClick={toggleMenu}
                className={cn(
                  'md:hidden p-2 -mr-1 rounded-lg transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60',
                  isScrolled || mobileMenuOpen ? 'text-secondary-800' : 'text-white'
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ opacity: 0, rotate: shouldReduceMotion ? 0 : -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: shouldReduceMotion ? 0 : 90 }}
                      transition={{ duration: 0.18 }}
                      style={{ display: 'block' }}
                      aria-hidden="true"
                    >
                      <HiX className="w-6 h-6" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ opacity: 0, rotate: shouldReduceMotion ? 0 : 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: shouldReduceMotion ? 0 : -90 }}
                      transition={{ duration: 0.18 }}
                      style={{ display: 'block' }}
                      aria-hidden="true"
                    >
                      <HiMenuAlt3 className="w-6 h-6" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              aria-hidden="true"
              className="fixed inset-0 z-[60] bg-secondary-950/50 backdrop-blur-sm md:hidden"
            />

            {/* Drawer panel */}
            <motion.div
              id="mobile-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={drawerTransition}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[80vw] max-w-[380px] bg-white shadow-2xl md:hidden flex flex-col"
            >

              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-secondary-100">
                <Link
                  to="/"
                  onClick={closeMenu}
                  aria-label="Himflax – go to homepage"
                  className="flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <img
                    src="/logo.svg"
                    alt=""
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                    loading="eager"
                    decoding="sync"
                  />
                </Link>
                <button
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                  className="p-2 rounded-full bg-secondary-100 text-secondary-500 hover:bg-secondary-200 hover:text-secondary-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <HiX className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto py-8 px-6">
                <nav aria-label="Mobile navigation">
                  <ul className="flex flex-col list-none p-0 m-0 divide-y divide-secondary-100">
                    {NAV_LINKS.map((link, i) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <li key={link.path}>
                          <motion.div
                            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: shouldReduceMotion ? 0 : i * 0.055, ease: 'easeOut' }}
                          >
                            <Link
                              to={link.path}
                              onClick={closeMenu}
                              aria-current={isActive ? 'page' : undefined}
                              className={cn(
                                'flex items-center justify-between py-4 text-base font-semibold uppercase tracking-widest transition-colors duration-150',
                                'focus-visible:outline-none focus-visible:text-primary-600',
                                isActive
                                  ? 'text-primary-600'
                                  : 'text-secondary-700 hover:text-primary-600'
                              )}
                            >
                              <span>{link.name}</span>
                              {/* Right arrow indicator */}
                              <motion.span
                                className={cn(
                                  'text-lg leading-none',
                                  isActive ? 'text-primary-500' : 'text-secondary-300'
                                )}
                                animate={{ x: isActive ? 2 : 0 }}
                              >
                                →
                              </motion.span>
                            </Link>
                          </motion.div>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.38 }}
                  className="mt-10"
                >
                  <Link to="/contact" onClick={closeMenu}>
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full rounded-2xl py-4 uppercase tracking-widest font-bold text-xs"
                    >
                      Start a Project
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Footer contact strip */}

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(Navbar);