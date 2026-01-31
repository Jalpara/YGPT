
import React from 'react';
import { CUSTOM_LOGO_URL } from '../constants';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // 'dark' means dark text (for light background)
  showText?: boolean;
  stacked?: boolean; // For big versions
  textClassName?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '', variant = 'dark', showText = true, stacked = false, textClassName = '' }) => {
  
  if (CUSTOM_LOGO_URL) {
      return (
        <div className={`flex ${stacked ? 'flex-col items-center' : 'flex-row items-center'} ${className}`} style={{ height: stacked ? 'auto' : '100%' }}>
            <img 
                src={CUSTOM_LOGO_URL} 
                alt="YGPT Logo" 
                className={`object-contain ${stacked ? 'mb-4 max-w-[200px]' : 'h-10 w-auto mr-2'}`} 
            />
            {showText && !stacked && (
                 <div className="flex flex-col">
                    <span className={`font-lemon text-xl tracking-tighter leading-none ${variant === 'dark' ? 'text-gray-800' : 'text-white'} ${textClassName}`}>
                        <span className="text-[#F47C20]">Y</span>
                        <span className="text-[#FDB913]">G</span>
                        <span className="text-[#936FB1]">P</span>
                        <span className="text-[#4EB8B9]">T</span>
                    </span>
                 </div>
            )}
        </div>
      );
  }

  // Fallback SVG construction that mimics the user's provided image
  return (
    <div className={`flex ${stacked ? 'flex-col justify-center' : 'flex-row'} items-center ${stacked ? 'space-y-4' : 'space-x-2'} group select-none ${className}`}>
        {/* The Icon */}
        <div className={`relative ${stacked ? 'w-32 h-32' : 'w-10 h-10'} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
           <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Head */}
              <circle cx="50" cy="20" r="7" fill="#F47C20" />
              
              {/* Arms/Leaf */}
              {/* Left arm holding leaf */}
              <path d="M50 35 Q 35 35 25 20" stroke="#00A651" strokeWidth="4" strokeLinecap="round" />
              <path d="M25 20 Q 20 10 30 5 Q 35 15 25 20" fill="#00A651" /> {/* Leaf shape */}
              
              {/* Right arm up */}
              <path d="M50 35 Q 65 35 75 20" stroke="#F47C20" strokeWidth="4" strokeLinecap="round" />
              
              {/* Body Swirls */}
              {/* Orange Top Swirl */}
              <path d="M50 35 C 30 50, 70 50, 50 65" stroke="#F47C20" strokeWidth="5" strokeLinecap="round" />
              
              {/* Purple Bottom Swirl/Leg */}
              <path d="M50 65 C 30 80, 40 95, 30 95" stroke="#936FB1" strokeWidth="5" strokeLinecap="round" />
              
              {/* Teal Leg */}
              <path d="M50 65 C 70 80, 60 95, 70 95" stroke="#4EB8B9" strokeWidth="5" strokeLinecap="round" />
           </svg>
        </div>

        {/* The Text */}
        {showText && (
            <div className={`flex flex-col ${stacked ? 'items-center text-center' : 'items-start'}`}>
              <span className={`font-lemon tracking-tighter leading-none ${stacked ? 'text-6xl' : 'text-2xl'} ${textClassName}`}>
                <span className="text-[#F47C20]">Y</span>
                <span className="text-[#FDB913]">G</span>
                <span className="text-[#936FB1]">P</span>
                <span className="text-[#4EB8B9]">T</span>
              </span>
              <span className={`font-bold tracking-[0.2em] ${stacked ? 'text-xs mt-2' : 'text-[0.6rem]'} ${variant === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                YOUTH • PEACE • TRANSFORMATION
              </span>
            </div>
        )}
    </div>
  );
};

export default Logo;
