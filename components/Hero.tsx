
import React, { useEffect, useState } from 'react';
import { ChevronDown, MapPin, Compass } from 'lucide-react';

export const Hero: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Parallax Layers */}
      <div 
        className="absolute inset-0 z-0 scale-110"
        style={{ 
          transform: `translateY(${offsetY * 0.5}px)`,
          backgroundImage: 'url("https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6)'
        }}
      />
      
      {/* Middle Layer (Subtle Text/Haze) */}
      <div 
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        style={{ transform: `translateY(${offsetY * 0.2}px)` }}
      >
        <span className="text-[20vw] font-black text-white/5 whitespace-nowrap uppercase tracking-tighter">
          TerraRoam
        </span>
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass text-sm font-medium text-blue-300 animate-pulse">
          <Compass size={16} />
          <span>India's Most Aesthetic Travel Partner</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[1.1] tracking-tight">
          Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Incredible</span> India
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Crafting bespoke journeys for every generation. From honeymoon paradises to spiritual awakenings.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => document.getElementById('ai-planner')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center gap-2 group"
          >
            Start Planning
            <Compass className="group-hover:rotate-45 transition-transform" />
          </button>
          <button className="px-8 py-4 glass rounded-full font-semibold border border-white/20 hover:bg-white/10 transition-all">
            Browse Packages
          </button>
        </div>
      </div>

      {/* Floating Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">Scroll to explore</span>
        <ChevronDown size={20} className="text-gray-400" />
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20"></div>
    </section>
  );
};
