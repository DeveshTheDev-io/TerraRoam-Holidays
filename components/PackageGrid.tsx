
import React from 'react';
import { FEATURED_PACKAGES } from '../constants';
import { GlassCard } from './GlassCard';
import { Clock, Tag, ChevronRight } from 'lucide-react';

export const PackageGrid: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-5xl font-black mb-4">Trending <span className="text-blue-500">Voyages</span></h2>
            <p className="text-gray-400 max-w-lg">Hand-picked destinations crafted specifically for different lifestyles across the Indian subcontinent.</p>
          </div>
          <button className="text-blue-500 font-bold flex items-center gap-1 hover:gap-2 transition-all">
            View All Collections <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_PACKAGES.map((pkg) => (
            <GlassCard key={pkg.id} className="group overflow-hidden flex flex-col p-0">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {pkg.category}
                </div>
              </div>
              
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{pkg.title}</h3>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock size={14} /> {pkg.duration}</span>
                  <span className="flex items-center gap-1"><Tag size={14} /> Starts from {pkg.price}</span>
                </div>
                <p className="text-sm text-gray-400 font-light mb-6 line-clamp-2">
                  {pkg.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {pkg.highlights.slice(0, 2).map((h, i) => (
                    <span key={i} className="text-[10px] bg-white/5 px-2 py-1 rounded-md text-gray-400">{h}</span>
                  ))}
                </div>
                
                <button className="w-full py-3 border border-white/10 rounded-xl text-sm font-bold hover:bg-white hover:text-black transition-all">
                  Check Details
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
