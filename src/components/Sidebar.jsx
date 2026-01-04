import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Tv, Film, List, Menu, X, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

// Navigation data
const navItems = [
  { name: 'الرئيسية', icon: Home, path: '/' },
  { name: 'البحث', icon: Search, path: '/search' },
  { name: 'مسلسلات', icon: Tv, path: '/tv-shows' },
  { name: 'أفلام', icon: Film, path: '/movies' },
  { name: 'قائمتي', icon: List, path: '/my-list' },
];

const sidebarVariants = {
  open: { width: '250px', transition: { type: 'spring', damping: 15, stiffness: 150 } },
  closed: { width: '70px', transition: { type: 'spring', damping: 15, stiffness: 150 } },
};

const linkVariants = {
  open: { opacity: 1, x: 0, display: 'block', transition: { duration: 0.3, delay: 0.15 } },
  closed: { opacity: 0, x: -20, transition: { duration: 0.1, delay: 0 }, transitionEnd: { display: 'none' } },
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const NavItem = ({ item }) => (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center p-3 rounded-xl transition-all duration-300 group ${
          isActive
            ? 'bg-red-700 text-white shadow-lg'
            : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
        }`
      }
      end
    >
      <item.icon className="w-6 h-6 shrink-0" />
      
      <motion.span
        variants={linkVariants}
        animate={isOpen ? 'open' : 'closed'}
        className="mr-4 whitespace-nowrap overflow-hidden text-right"
        style={{ originX: 1 }}
      >
        {item.name}
      </motion.span>
    </NavLink>
  );

  return (
    <>
      {/* Sidebar Container */}
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        className="fixed top-0 right-0 h-full bg-gray-900 border-l border-gray-800 shadow-2xl z-[100] p-3 flex flex-col overflow-hidden custom-scrollbar max-w-[90vw]"
        dir="rtl" // Right-to-left layout
      >
        {/* Toggle Button and Header space */}
        <div className={`flex ${isOpen ? 'justify-start' : 'justify-center'} mb-8 mt-2`}>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full text-white bg-gray-800/50 hover:bg-gray-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-600"
            aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-3 flex-grow">
          {navItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>

        {/* Footer/Settings Link */}
        <div className="mt-auto pt-4">
           <NavLink
              to="/settings"
              className="flex items-center p-3 rounded-xl transition-colors duration-300 text-gray-300 hover:bg-gray-700/50 hover:text-white"
            >
              <Settings className="w-6 h-6 shrink-0" />
              <motion.span
                variants={linkVariants}
                animate={isOpen ? 'open' : 'closed'}
                className="mr-4 whitespace-nowrap overflow-hidden text-right"
              >
                الإعدادات
              </motion.span>
            </NavLink>
        </div>
      </motion.div>

      {/* Overlay for clicking away on mobile */}
      {isOpen && (
        <div 
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-70 z-[99] lg:hidden" 
          aria-hidden="true" 
        />
      )}
    </>
  );
};

export default Sidebar;