import React from 'react';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Globe,
  HelpCircle,
} from 'lucide-react';

const footerLinks = [
  [
    'Audio Description',
    'Investor Relations',
    'Legal Notices',
  ],
  [
    'Help Center',
    'Jobs',
    'Cookie Preferences',
  ],
  [
    'Gift Cards',
    'Terms of Use',
    'Corporate Information',
  ],
  [
    'Media Center',
    'Privacy',
    'Contact Us',
  ],
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black/90 text-gray-400 py-12 px-4 md:px-8 lg:px-16 mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Social Icons */}
        <div className="flex space-x-6 mb-8">
          <Facebook className="w-7 h-7 hover:text-white cursor-pointer transition-colors" />
          <Instagram className="w-7 h-7 hover:text-white cursor-pointer transition-colors" />
          <Twitter className="w-7 h-7 hover:text-white cursor-pointer transition-colors" />
          <Youtube className="w-7 h-7 hover:text-white cursor-pointer transition-colors" />
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8 text-sm mb-8">
          {footerLinks.map((column, colIndex) => (
            <ul key={colIndex} className="space-y-3">
              {column.map((link, linkIndex) => (
                <li
                  key={linkIndex}
                  className="hover:underline cursor-pointer transition-colors text-sm"
                >
                  {link}
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Service Code and Copyright */}
        <div className="flex flex-col space-y-4">
          <button className="text-xs border border-gray-400 py-2 px-3 text-gray-400 hover:text-white hover:border-white transition-colors w-max">
            Service Code
          </button>

          <p className="text-xs text-gray-500">
            © 1997-{currentYear} Netflix Clone, Inc. (Built for educational purposes)
          </p>

          <div className="flex items-center space-x-4 text-xs mt-4">
            <div className="flex items-center text-gray-500 hover:text-white cursor-pointer transition-colors">
              <Globe className="w-3 h-3 mr-1" />
              <span>English (US)</span>
            </div>
            <div className="flex items-center text-gray-500 hover:text-white cursor-pointer transition-colors">
              <HelpCircle className="w-3 h-3 mr-1" />
              <span>Accessibility</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;