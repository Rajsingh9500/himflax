// admin/src/components/layout/AdminLayout.jsx
import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { HiOutlineHome, HiOutlineBriefcase, HiOutlineDocumentText, HiOutlineLogout, HiMenuAlt2, HiX, HiOutlinePhotograph, HiOutlineStar } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Dashboard', path: '/', icon: HiOutlineHome },
  { name: 'Banners', path: '/banners', icon: HiOutlinePhotograph },
  { name: 'Occasions', path: '/occasions', icon: HiOutlineStar },
  { name: 'Jobs', path: '/jobs', icon: HiOutlineBriefcase },
  { name: 'Applications', path: '/applications', icon: HiOutlineDocumentText },
];

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const getPageTitle = () => {
    const item = navItems.find((n) => n.path === location.pathname);
    if (location.pathname.includes('/jobs/add')) return 'Add New Job';
    if (location.pathname.includes('/jobs/edit')) return 'Edit Job';
    return item?.name || 'Dashboard';
  };

  const handleLogout = async () => { await logout(); };

  return (
    <div className="min-h-screen flex bg-secondary-50 relative">
      {/* Decorative ambient background */}
      <div className="absolute top-0 left-64 w-[500px] h-[500px] bg-primary-100/50 rounded-full blur-[120px] pointer-events-none" />

      {/* Sidebar overlay on mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-secondary-950/40 backdrop-blur-sm lg:hidden" 
            onClick={() => setSidebarOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-secondary-200 shadow-soft flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-center px-8 py-10 border-b border-secondary-50">
          <img src="/logo.svg" alt="Himflax" className="h-12 w-auto object-contain" />
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <div className="px-4 mb-4 text-xs font-bold text-secondary-400 uppercase tracking-wider">Menu</div>
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              end={item.path === '/'} 
              onClick={() => setSidebarOpen(false)} 
              className={({ isActive }) => `flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${isActive ? 'bg-primary-50 text-primary-700 shadow-sm' : 'text-secondary-500 hover:bg-secondary-50 hover:text-secondary-900'}`}
            >
              <item.icon className={`w-6 h-6 transition-colors ${location.pathname === item.path || (item.path === '/' && location.pathname === '/') ? 'text-primary-600' : 'text-secondary-400'}`} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-secondary-100 bg-secondary-50/50 m-4 rounded-[2rem]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold border border-primary-200 shadow-sm">
              {user?.email?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-secondary-900 truncate">Admin User</div>
              <div className="text-xs text-secondary-500 truncate">{user?.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold bg-white border border-secondary-200 text-secondary-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 w-full transition-all shadow-sm">
            <HiOutlineLogout className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-secondary-100 px-6 sm:px-10 py-5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 rounded-xl text-secondary-500 hover:bg-secondary-100 transition-colors">
              <HiMenuAlt2 className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-secondary-900 tracking-tight">{getPageTitle()}</h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-sm font-semibold text-secondary-500 bg-secondary-100 px-4 py-2 rounded-full hidden sm:block">
               v1.0.0
             </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 sm:p-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="h-full max-w-7xl mx-auto">
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
