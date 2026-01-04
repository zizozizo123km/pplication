import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'TV Shows', href: '#', current: false },
  { name: 'Movies', href: '#', current: false },
  { name: 'New & Popular', href: '#', current: false },
  { name: 'My List', href: '#', current: false },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Logo = () => (
    <a href="/" className="text-red-600 text-2xl md:text-3xl font-extrabold tracking-wider">
      NETFLIX
    </a>
  );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 z-50 w-full transition duration-300 ease-in-out ${
        scrolled ? 'bg-black/95 shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-4 py-3 md:px-8">
        
        {/* Left Section: Logo & Primary Nav */}
        <div className="flex items-center space-x-8">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition duration-200 ${
                  item.current 
                    ? 'text-white font-bold' 
                    : 'text-gray-300 hover:text-gray-100'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile/Tablet Nav Dropdown (Browse) */}
          <div className="lg:hidden relative">
            <button 
              className="text-white flex items-center text-sm font-semibold"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            >
                Browse
                <ChevronDown className={`w-4 h-4 ml-1 transition duration-300 ${isMobileNavOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Mobile Nav Content */}
            {isMobileNavOpen && (
                 <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 transform -translate-x-1/2 mt-4 w-40 bg-black border-t-4 border-white shadow-xl py-2"
                >
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={`block px-4 py-2 text-sm text-center hover:bg-gray-800 ${item.current ? 'font-bold text-white' : 'text-gray-300'}`}
                            onClick={() => setIsMobileNavOpen(false)}
                        >
                            {item.name}
                        </a>
                    ))}
                </motion.div>
            )}
          </div>
        </div>

        {/* Right Section: Icons and Profile */}
        <div className="flex items-center space-x-3 md:space-x-6 text-white">
          
          {/* Search Input/Icon */}
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center border border-white bg-black bg-opacity-70 pr-2"
              >
                <input
                  type="text"
                  placeholder="Titles, people, genres"
                  className="bg-transparent text-sm w-40 sm:w-60 p-1 focus:outline-none placeholder-gray-400"
                  onBlur={() => setIsSearchOpen(false)}
                  autoFocus
                />
                {/* Search icon inside input */}
                <Search className="h-5 w-5 text-white cursor-pointer" />
              </motion.div>
            ) : (
              <Search 
                className="h-6 w-6 cursor-pointer hover:text-gray-300 transition duration-150" 
                onClick={() => setIsSearchOpen(true)} 
              />
            )}
          </div>
          
          {/* Kids Link */}
          <span className="hidden md:inline text-sm cursor-pointer hover:text-gray-300 transition duration-150">
            Kids
          </span>

          {/* Notifications */}
          <Bell className="h-6 w-6 cursor-pointer hover:text-gray-300 hidden md:block" />

          {/* Profile Dropdown */}
          <div className="relative group cursor-pointer">
            <div className="flex items-center space-x-1">
              {/* Avatar Placeholder */}
              <div className="h-8 w-8 rounded overflow-hidden">
                <img 
                  src="https://occ-0-300-999.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5PdJ-NqO5E/AAAABX-O35kL90kO7SgK0oWp4F6hD9w6W5Yg4f9jNqL8eC7tGv2m_0t7X6LqR3Y5vF1N1j2D8B3C4J5oE.png?r=0a2" 
                  alt="Profile" 
                  className="object-cover w-full h-full"
                />
              </div>
              <ChevronDown className="w-4 h-4 transition duration-300 group-hover:rotate-180 hidden sm:block" />
            </div>

            {/* Dropdown Content */}
            <div className="absolute right-0 mt-2 w-48 bg-black bg-opacity-95 border border-gray-700 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2 text-sm">
                    <a href="/profile" className="block px-4 py-2 hover:bg-gray-800 transition duration-150">Manage Profiles</a>
                    <a href="/account" className="block px-4 py-2 hover:bg-gray-800 transition duration-150">Account</a>
                    <a href="/help" className="block px-4 py-2 hover:bg-gray-800 transition duration-150">Help Center</a>
                    <hr className="border-gray-700 my-1" />
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-800 transition duration-150">Sign out of Netflix</button>
                </div>
            </div>
          </div>

        </div>

      </div>
    </motion.header>
  );
};

export default Header;