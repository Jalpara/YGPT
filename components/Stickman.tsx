
import React from 'react';

type Variant = 'wave' | 'meditate' | 'jump' | 'present' | 'holding-heart';

interface StickmanProps {
  variant?: Variant;
  color?: string;
  size?: number;
  className?: string;
  delay?: number;
}

const Stickman: React.FC<StickmanProps> = ({ variant = 'wave', color = '#F47C20', size = 100, className = '', delay = 0 }) => {
  const strokeWidth = 3;
  const style = { animationDelay: `${delay}s` };

  // Common Head
  const Head = () => (
    <circle cx="50" cy="20" r="12" fill="none" stroke={color} strokeWidth={strokeWidth} />
  );

  // Render based on variant
  const renderBody = () => {
    switch (variant) {
      case 'meditate':
        return (
          <g className="animate-float" style={style}>
            <Head />
            {/* Body */}
            <line x1="50" y1="32" x2="50" y2="60" stroke={color} strokeWidth={strokeWidth} />
            {/* Legs (Crossed) */}
            <path d="M50 60 L30 75 L70 75 L50 60" fill="none" stroke={color} strokeWidth={strokeWidth} />
            {/* Arms (Resting on knees) */}
            <path d="M50 40 L25 55 M50 40 L75 55" fill="none" stroke={color} strokeWidth={strokeWidth} />
            {/* Eyes closed */}
            <path d="M46 20 L50 20 M54 20 L58 20" stroke={color} strokeWidth={2} strokeLinecap="round" />
          </g>
        );
      
      case 'jump':
        return (
          <g className="animate-bounce-custom" style={style}>
            <Head />
            {/* Body */}
            <line x1="50" y1="32" x2="50" y2="60" stroke={color} strokeWidth={strokeWidth} />
            {/* Legs (Jumping) */}
            <path d="M50 60 L35 85 M50 60 L65 80" fill="none" stroke={color} strokeWidth={strokeWidth} className="animate-leg-kick" />
            {/* Arms (Up in joy) */}
            <path d="M50 40 L30 20 M50 40 L70 20" fill="none" stroke={color} strokeWidth={strokeWidth} />
          </g>
        );

      case 'present':
        return (
          <g>
            <Head />
            {/* Body */}
            <line x1="50" y1="32" x2="50" y2="70" stroke={color} strokeWidth={strokeWidth} />
            {/* Legs */}
            <line x1="50" y1="70" x2="40" y2="95" stroke={color} strokeWidth={strokeWidth} />
            <line x1="50" y1="70" x2="60" y2="95" stroke={color} strokeWidth={strokeWidth} />
            {/* Left Arm (Down) */}
            <line x1="50" y1="40" x2="35" y2="60" stroke={color} strokeWidth={strokeWidth} />
            {/* Right Arm (Pointing) */}
            <g className="origin-[50px_40px] animate-point">
                 <line x1="50" y1="40" x2="80" y2="40" stroke={color} strokeWidth={strokeWidth} />
            </g>
          </g>
        );

      case 'holding-heart':
        return (
            <g>
              <Head />
              {/* Body */}
              <line x1="50" y1="32" x2="50" y2="70" stroke={color} strokeWidth={strokeWidth} />
              {/* Legs */}
              <line x1="50" y1="70" x2="40" y2="95" stroke={color} strokeWidth={strokeWidth} />
              <line x1="50" y1="70" x2="60" y2="95" stroke={color} strokeWidth={strokeWidth} />
              {/* Arms holding heart */}
              <path d="M50 45 L35 40 M50 45 L65 40" fill="none" stroke={color} strokeWidth={strokeWidth} />
              {/* Heart */}
              <path 
                d="M50 45 C 35 30, 30 50, 50 60 C 70 50, 65 30, 50 45" 
                fill={color} 
                className="animate-pulse-slow" 
              />
            </g>
        );

      case 'wave':
      default:
        return (
          <g>
            <Head />
            {/* Body */}
            <line x1="50" y1="32" x2="50" y2="70" stroke={color} strokeWidth={strokeWidth} />
            {/* Legs */}
            <line x1="50" y1="70" x2="40" y2="95" stroke={color} strokeWidth={strokeWidth} />
            <line x1="50" y1="70" x2="60" y2="95" stroke={color} strokeWidth={strokeWidth} />
            {/* Left Arm (Down) */}
            <line x1="50" y1="40" x2="35" y2="60" stroke={color} strokeWidth={strokeWidth} />
            {/* Right Arm (Waving) */}
            <g className="origin-[50px_40px] animate-wave">
                <line x1="50" y1="40" x2="75" y2="25" stroke={color} strokeWidth={strokeWidth} />
                <circle cx="75" cy="25" r="2" fill={color} />
            </g>
          </g>
        );
    }
  };

  return (
    <div className={`${className} select-none pointer-events-none`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
        <style>
          {`
            @keyframes wave {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-20deg); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            @keyframes bounce-custom {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
            }
            @keyframes point {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(5deg); }
            }
            @keyframes pulse-slow {
                0%, 100% { transform: scale(1); opacity: 1; transform-origin: 50px 45px; }
                50% { transform: scale(1.2); opacity: 0.8; transform-origin: 50px 45px; }
            }
            .animate-wave { animation: wave 2s ease-in-out infinite; }
            .animate-float { animation: float 3s ease-in-out infinite; }
            .animate-bounce-custom { animation: bounce-custom 1s ease-in-out infinite; }
            .animate-point { animation: point 1.5s ease-in-out infinite; }
            .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
          `}
        </style>
        {renderBody()}
      </svg>
    </div>
  );
};

export default Stickman;
