
import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { MapPin, ArrowRight, Info, Compass, Sunrise, Sunset, Waves, ShieldCheck } from 'lucide-react';

interface RegionData {
  id: string;
  name: string;
  description: string;
  topSpots: string[];
  color: string;
  icon: React.ReactNode;
}

const REGIONS: RegionData[] = [
  { 
    id: 'north', 
    name: 'North India', 
    description: 'Majestic Himalayas and Royal Heritage of the Rajputana.', 
    topSpots: ['Ladakh', 'Kashmir', 'Shimla', 'Jaipur'], 
    color: '#60a5fa', 
    icon: <Sunrise className="text-blue-400" /> 
  },
  { 
    id: 'west', 
    name: 'West India', 
    description: 'Vibrant cultures, the great Rann, and endless party shores.', 
    topSpots: ['Goa', 'Rann of Kutch', 'Mumbai', 'Udaipur'], 
    color: '#fbbf24', 
    icon: <Sunset className="text-amber-400" /> 
  },
  { 
    id: 'east', 
    name: 'East India', 
    description: 'The tea gardens of Bengal and the mystical Seven Sisters.', 
    topSpots: ['Darjeeling', 'Shillong', 'Kaziranga', 'Sikkim'], 
    color: '#f87171', 
    icon: <Compass className="text-red-400" /> 
  },
  { 
    id: 'south', 
    name: 'South India', 
    description: 'Lush backwaters, ancient Dravidian temples, and coffee estates.', 
    topSpots: ['Kerala', 'Hampi', 'Ooty', 'Gokarna'], 
    color: '#34d399', 
    icon: <Waves className="text-emerald-400" /> 
  },
  { 
    id: 'central', 
    name: 'Central India', 
    description: 'The wild heart of India with thick jungles and stone carvings.', 
    topSpots: ['Kanha', 'Khajuraho', 'Pachmarhi', 'Gwalior'], 
    color: '#a78bfa', 
    icon: <ShieldCheck className="text-purple-400" /> 
  },
];

export const InteractiveMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionData>(REGIONS[0]);

  return (
    <section className="py-24 px-4 bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <div className="inline-block px-4 py-1 mb-4 rounded-full glass border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest">Regional Discovery</div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Explore by <span className="text-blue-500 italic">Zone</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Click on a region below to uncover curated collections across the subcontinent's most stunning landscapes.</p>
        </div>

        <div className="relative flex flex-col lg:grid lg:grid-cols-12 items-start gap-12">
          
          {/* Region Selection Grid (The "Perfect Box Design") */}
          <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {REGIONS.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region)}
                className={`
                  relative group p-6 rounded-[2rem] transition-all duration-500 text-left overflow-hidden border
                  ${selectedRegion.id === region.id 
                    ? 'bg-white/10 border-white/20 scale-[1.02] shadow-2xl shadow-white/5' 
                    : 'glass border-white/5 hover:border-white/10 hover:bg-white/5'
                  }
                `}
              >
                {/* Visual Accent */}
                <div 
                  className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 transition-opacity group-hover:opacity-40`}
                  style={{ backgroundColor: region.color }}
                />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {region.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-2">{region.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-1">{region.description}</p>
                </div>

                {selectedRegion.id === region.id && (
                  <div className="absolute bottom-6 right-6">
                    <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: region.color }}></div>
                  </div>
                )}
              </button>
            ))}
            
            {/* CTA Extra Box */}
            <div className="glass rounded-[2rem] p-8 border border-white/5 flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-blue-600/10 hover:border-blue-500/20 transition-all">
              <Compass className="text-blue-500 mb-4 group-hover:rotate-45 transition-transform" size={40} />
              <h4 className="font-bold text-lg">Custom Route?</h4>
              <p className="text-xs text-gray-500 mt-2">Mix and match regions for a cross-country epic.</p>
            </div>
          </div>

          {/* Detailed Info Panel */}
          <div className="col-span-12 lg:col-span-5 w-full sticky top-24">
            <GlassCard 
              className="h-full border-t-8 animate-in slide-in-from-right-8 duration-700" 
              style={{ borderTopColor: selectedRegion.color }}
              hoverEffect={false}
            >
              <div className="mb-8 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1 block">Curated Destination</span>
                  <h3 className="text-4xl font-black">{selectedRegion.name}</h3>
                </div>
                <div 
                  className="w-14 h-14 rounded-3xl flex items-center justify-center text-black shadow-lg" 
                  style={{ backgroundColor: selectedRegion.color }}
                >
                  <MapPin size={28} />
                </div>
              </div>

              <p className="text-gray-300 text-lg mb-10 leading-relaxed font-light italic">
                "{selectedRegion.description}"
              </p>
              
              <div className="space-y-6 mb-12">
                <h4 className="text-xs font-black uppercase tracking-widest text-blue-400">Featured Hotspots</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedRegion.topSpots.map(spot => (
                    <div 
                      key={spot} 
                      className="group flex items-center gap-3 p-4 glass rounded-2xl border-white/5 hover:border-white/20 transition-all cursor-default"
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedRegion.color }} />
                      <span className="text-sm font-semibold text-gray-300 group-hover:text-white">{spot}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full py-5 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-3 group hover:scale-[1.02] transition-all">
                  Browse {selectedRegion.name} Packages
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full py-4 glass-dark text-white text-xs font-bold uppercase tracking-widest rounded-2xl border border-white/10 hover:bg-white/5 transition-all">
                  Download Guide (PDF)
                </button>
              </div>

              <div className="mt-8 flex items-center gap-2 text-[10px] text-gray-600 uppercase tracking-tighter">
                <Info size={14} />
                <span>Travel permits may be required for certain border areas.</span>
              </div>
            </GlassCard>
          </div>

        </div>
      </div>
    </section>
  );
};
