
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  // Added style prop to fix TypeScript error when passing inline styles
  style?: React.CSSProperties;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = true, style }) => {
  return (
    <div 
      className={`
        glass rounded-2xl p-6 
        transition-all duration-500 
        ${hoverEffect ? 'hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/5' : ''} 
        ${className}
      `}
      style={style}
    >
      {children}
    </div>
  );
};
