
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone, Bell } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const triggerPrayerNotification = () => {
    window.dispatchEvent(new Event('test-notification-prayer'));
  };

  const triggerSeminarNotification = () => {
    window.dispatchEvent(new Event('test-notification-seminar'));
  };

  return (
    <footer className="bg-[#333333] text-white pt-16 pb-8 border-t-4 border-[#FDB913]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
             <Link to="/" className="inline-block group">
                <Logo variant="light" />
             </Link>
             <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
               Igniting the inner light in youth globally. Join the movement for peace, transformation, and service.
             </p>
             <div className="flex space-x-4 pt-2">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#F47C20] transition text-white"><Facebook size={18} /></a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#4EB8B9] transition text-white"><Twitter size={18} /></a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#936FB1] transition text-white"><Instagram size={18} /></a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#FDB913] transition text-white"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-lemon text-lg mb-6 text-[#FDB913]">Discover</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Our Story</Link></li>
              <li><Link to="/events" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Events Calendar</Link></li>
              <li><Link to="/impact" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Impact Report</Link></li>
              <li><Link to="/brand" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Brand Kit</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-lemon text-lg mb-6 text-[#4EB8B9]">Community</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/clubs" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Global Chapters</Link></li>
              <li><Link to="/fan-art" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Member Creations</Link></li>
              <li><Link to="/transform" className="hover:text-white hover:translate-x-1 transition-transform inline-block">LMS Portal</Link></li>
              <li><Link to="/get-involved" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Volunteer</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-lemon text-lg mb-6 text-[#936FB1]">Reach Out</h4>
            <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start">
                    <MapPin className="mr-3 mt-1 flex-shrink-0 text-[#F47C20]" size={16} />
                    <span>123 Peace Avenue,<br/>Global City, Earth 10101</span>
                </li>
                <li className="flex items-center">
                    <Mail className="mr-3 flex-shrink-0 text-[#F47C20]" size={16} />
                    <a href="mailto:hello@ygpt.org" className="hover:text-white">hello@ygpt.org</a>
                </li>
                <li className="flex items-center">
                    <Phone className="mr-3 flex-shrink-0 text-[#F47C20]" size={16} />
                    <a href="tel:8929707222" className="hover:text-white font-bold">89297 07222</a>
                </li>
            </ul>
            <div className="mt-6">
                <Link to="/contact" className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-bold text-sm transition block text-center border border-white/20">
                    Contact Support
                </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Youth For Global Peace and Transformation. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 items-center">
            <Link to="/sitemap" className="hover:text-white transition">Sitemap</Link>
            <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white transition">Cookie Policy</Link>
          </div>
        </div>

        {/* Developer / Test Controls */}
        <div className="mt-8 pt-4 border-t border-gray-800 text-center">
            <p className="text-[10px] text-gray-600 mb-2 uppercase tracking-widest font-bold">Notification Test Controls (Dev Only)</p>
            <div className="flex justify-center gap-4">
                <button onClick={triggerPrayerNotification} className="text-xs bg-[#936FB1]/20 text-[#936FB1] px-3 py-1 rounded border border-[#936FB1]/30 hover:bg-[#936FB1] hover:text-white transition flex items-center">
                    <Bell size={10} className="mr-1" /> Test Prayer Notif
                </button>
                <button onClick={triggerSeminarNotification} className="text-xs bg-[#F47C20]/20 text-[#F47C20] px-3 py-1 rounded border border-[#F47C20]/30 hover:bg-[#F47C20] hover:text-white transition flex items-center">
                    <Bell size={10} className="mr-1" /> Test Seminar Notif
                </button>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
