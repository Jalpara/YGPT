
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Helper to check if a path is active
  const isActive = (path: string) => location.pathname === path;

  // Modified links to handle dropdowns specifically in the render
  const mainLinks = NAV_LINKS.filter(link => link.name !== 'About');

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-1 items-center">
             <Link
                to="/"
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive('/') ? 'text-[#F47C20] bg-orange-50' : 'text-gray-600 hover:text-[#936FB1] hover:bg-gray-50'
                }`}
              >
                Home
              </Link>

              {/* About Dropdown */}
              <div 
                className="relative group px-2"
                onMouseEnter={() => setActiveDropdown('about')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                  <button 
                    className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                        isActive('/about') || isActive('/impact') || isActive('/founder') || isActive('/meet-my-maitreya') ? 'text-[#F47C20] bg-orange-50' : 'text-gray-600 hover:text-[#936FB1] hover:bg-gray-50'
                    }`}
                  >
                      <span>About</span>
                      <ChevronDown size={14} className={`transform transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className={`absolute top-full left-0 w-52 pt-2 transition-all duration-200 transform origin-top-left ${activeDropdown === 'about' ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'}`}>
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden p-1">
                          <Link 
                            to="/about" 
                            className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${isActive('/about') ? 'bg-orange-50 text-[#F47C20] font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-[#936FB1]'}`}
                          >
                              Our Story
                          </Link>
                          <Link 
                            to="/founder" 
                            className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${isActive('/founder') ? 'bg-orange-50 text-[#F47C20] font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-[#936FB1]'}`}
                          >
                              Our Founder
                          </Link>
                          <Link 
                            to="/meet-my-maitreya" 
                            className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${isActive('/meet-my-maitreya') ? 'bg-orange-50 text-[#F47C20] font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-[#936FB1]'}`}
                          >
                              Meet My Maitreya
                          </Link>
                          <Link 
                            to="/impact" 
                            className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${isActive('/impact') ? 'bg-orange-50 text-[#F47C20] font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-[#936FB1]'}`}
                          >
                              Our Impact
                          </Link>
                      </div>
                  </div>
              </div>

            {mainLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive(link.path) ? 'text-[#F47C20] bg-orange-50' : 'text-gray-600 hover:text-[#936FB1] hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* More Dropdown */}
            <div 
                className="relative group px-2"
                onMouseEnter={() => setActiveDropdown('more')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                  <button 
                    className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                        isActive('/fan-art') ? 'text-[#F47C20] bg-orange-50' : 'text-gray-600 hover:text-[#936FB1] hover:bg-gray-50'
                    }`}
                  >
                      <span>More</span>
                      <ChevronDown size={14} className={`transform transition-transform duration-200 ${activeDropdown === 'more' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className={`absolute top-full left-0 w-48 pt-2 transition-all duration-200 transform origin-top-left ${activeDropdown === 'more' ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'}`}>
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden p-1">
                          <Link 
                            to="/fan-art" 
                            className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${isActive('/fan-art') ? 'bg-orange-50 text-[#F47C20] font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-[#936FB1]'}`}
                          >
                              Member Creations
                          </Link>
                      </div>
                  </div>
              </div>
             
             <div className="pl-2">
                <Link to="/get-involved" className="bg-[#00A651] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-green-700 transition shadow-lg transform hover:-translate-y-0.5 flex items-center">
                    Join Us
                </Link>
             </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 focus:outline-none p-2 hover:bg-gray-100 rounded-lg">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-6 animate-fade-in-down shadow-inner">
          <div className="px-4 pt-4 space-y-2">
            <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium ${
                  isActive('/') ? 'bg-orange-50 text-[#F47C20]' : 'text-gray-700 hover:text-[#936FB1] hover:bg-gray-50'
                }`}
              >
                Home
            </Link>

            {/* Mobile About Group */}
            <div className="bg-gray-50 rounded-xl p-2 space-y-1">
                <div className="px-3 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">About Us</div>
                <Link
                    to="/about"
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-base font-medium ${
                    isActive('/about') ? 'bg-white text-[#F47C20] shadow-sm' : 'text-gray-700 hover:text-[#936FB1]'
                    }`}
                >
                    Our Story
                </Link>
                <Link
                    to="/founder"
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-base font-medium ${
                    isActive('/founder') ? 'bg-white text-[#F47C20] shadow-sm' : 'text-gray-700 hover:text-[#936FB1]'
                    }`}
                >
                    Our Founder
                </Link>
                <Link
                    to="/meet-my-maitreya"
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-base font-medium ${
                    isActive('/meet-my-maitreya') ? 'bg-white text-[#F47C20] shadow-sm' : 'text-gray-700 hover:text-[#936FB1]'
                    }`}
                >
                    Meet My Maitreya
                </Link>
                <Link
                    to="/impact"
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-base font-medium ${
                    isActive('/impact') ? 'bg-white text-[#F47C20] shadow-sm' : 'text-gray-700 hover:text-[#936FB1]'
                    }`}
                >
                    Our Impact
                </Link>
            </div>

            {mainLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-orange-50 text-[#F47C20]'
                    : 'text-gray-700 hover:text-[#936FB1] hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile More Group */}
            <div className="bg-gray-50 rounded-xl p-2 space-y-1">
                <div className="px-3 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">More</div>
                <Link
                    to="/fan-art"
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-base font-medium ${
                    isActive('/fan-art') ? 'bg-white text-[#F47C20] shadow-sm' : 'text-gray-700 hover:text-[#936FB1]'
                    }`}
                >
                    Member Creations
                </Link>
            </div>

            <div className="pt-4">
                <Link
                    to="/get-involved"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-[#00A651] text-white px-5 py-4 rounded-xl font-bold hover:bg-green-700 shadow-md"
                >
                    Join The Movement
                </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
