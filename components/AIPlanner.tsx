
import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { VIBES, BUDGETS, AGE_GROUPS } from '../constants';
import { UserPreferences } from '../types';
import { generateItinerary } from '../geminiService';
import { Sparkles, Loader2, Send, Calendar, MapPin, Utensils, Info, CheckCircle2, Bed } from 'lucide-react';

const ACTIVITIES = ['Wildlife Safari', 'Heritage Walk', 'Luxury Dining', 'Trekking', 'Shopping', 'Spa & Wellness', 'Pilgrimage', 'Photography'];

export const AIPlanner: React.FC = () => {
  const [prefs, setPrefs] = useState<UserPreferences>({
    vibe: VIBES[0],
    budget: BUDGETS[1],
    ageGroup: AGE_GROUPS[0],
    destinationHint: '',
    startDate: '',
    endDate: '',
    activities: []
  });
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<any>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateItinerary(prefs);
      setItinerary(result);
    } catch (err) {
      alert("Something went wrong with our travel wizard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleActivity = (act: string) => {
    setPrefs(p => ({
      ...p,
      activities: p.activities.includes(act) 
        ? p.activities.filter(a => a !== act) 
        : [...p.activities, act]
    }));
  };

  return (
    <section id="ai-planner" className="py-24 px-4 bg-black relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <div className="inline-block px-4 py-1 mb-4 rounded-full glass border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest">Powered by Gemini 3</div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">TerraRoam <span className="text-blue-500">AI Architect</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our intelligent engine curates the perfect Indian holiday based on your unique profile and dates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Controls */}
          <GlassCard className="space-y-8 sticky top-24 overflow-y-auto max-h-[85vh] custom-scrollbar">
            <div>
              <label className="block text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Who are you?</label>
              <div className="flex flex-wrap gap-2">
                {AGE_GROUPS.map(group => (
                  <button
                    key={group}
                    onClick={() => setPrefs(p => ({ ...p, ageGroup: group }))}
                    className={`px-4 py-2 rounded-xl text-sm transition-all border ${prefs.ageGroup === group ? 'bg-blue-600 border-blue-400 text-white' : 'glass border-white/10 text-gray-400 hover:border-white/30'}`}
                  >
                    {group}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2"><Calendar size={14}/> Start Date</label>
                <input 
                  type="date" 
                  className="w-full glass rounded-xl px-4 py-3 text-white border-white/10 outline-none"
                  value={prefs.startDate}
                  onChange={(e) => setPrefs(p => ({ ...p, startDate: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2"><Calendar size={14}/> End Date</label>
                <input 
                  type="date" 
                  className="w-full glass rounded-xl px-4 py-3 text-white border-white/10 outline-none"
                  value={prefs.endDate}
                  onChange={(e) => setPrefs(p => ({ ...p, endDate: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Interests & Activities</label>
              <div className="flex flex-wrap gap-2">
                {ACTIVITIES.map(act => (
                  <button
                    key={act}
                    onClick={() => toggleActivity(act)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-all border ${prefs.activities.includes(act) ? 'bg-white text-black border-white' : 'glass border-white/5 text-gray-500'}`}
                  >
                    {act}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Trip Vibe</label>
                <select 
                  className="w-full glass rounded-xl px-4 py-3 text-white border-white/10 outline-none"
                  value={prefs.vibe}
                  onChange={(e) => setPrefs(p => ({ ...p, vibe: e.target.value }))}
                >
                  {VIBES.map(v => <option key={v} value={v} className="bg-black">{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Budget</label>
                <select 
                  className="w-full glass rounded-xl px-4 py-3 text-white border-white/10 outline-none"
                  value={prefs.budget}
                  onChange={(e) => setPrefs(p => ({ ...p, budget: e.target.value }))}
                >
                  {BUDGETS.map(b => <option key={b} value={b} className="bg-black">{b}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Destination Hint</label>
              <input 
                type="text" 
                placeholder="Where to? (e.g. Kerala, Jaipur...)"
                className="w-full glass rounded-xl px-4 py-3 text-white border-white/10 outline-none placeholder:text-gray-600 focus:border-blue-500 transition-colors"
                value={prefs.destinationHint}
                onChange={(e) => setPrefs(p => ({ ...p, destinationHint: e.target.value }))}
              />
            </div>

            <button 
              disabled={loading}
              onClick={handleGenerate}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
              {loading ? 'Designing Your Dream...' : 'Generate Itinerary'}
            </button>
          </GlassCard>

          {/* Results Area */}
          <div className="min-h-[600px] flex flex-col gap-6 w-full">
            {!itinerary && !loading && (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center glass rounded-[2rem] p-12 text-center border-dashed border-2 border-white/10">
                <div className="bg-white/5 p-6 rounded-full mb-6">
                  <MapPin className="text-gray-600" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gray-400">Plan Visualizer</h3>
                <p className="text-gray-500 mt-2 max-w-xs">Your custom travel logic will be rendered here in high fidelity.</p>
              </div>
            )}

            {loading && (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center glass rounded-[2rem] p-12 text-center">
                <div className="relative">
                  <Loader2 size={64} className="text-blue-500 animate-spin" />
                  <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/20"></div>
                </div>
                <h3 className="text-3xl font-black mt-10">Bespoke Curation</h3>
                <p className="text-gray-400 mt-3 max-w-sm">Combining heritage with modern luxury for the {prefs.ageGroup} demographic...</p>
              </div>
            )}

            {itinerary && !loading && (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-700">
                <GlassCard className="border-t-8 border-blue-500/50" hoverEffect={false}>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-4xl font-black text-white flex items-center gap-3">
                        {itinerary.destination}
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded border border-blue-500/30 uppercase tracking-widest">{itinerary.vibeCheck}</span>
                      </h3>
                      <p className="text-gray-400 mt-1 flex items-center gap-2 font-medium">
                        <Calendar size={14}/> {itinerary.duration} Days
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">Estimated Budget</span>
                      <span className="text-2xl font-black text-blue-400">{itinerary.estimatedCost}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 italic text-lg mb-10 leading-relaxed border-l-4 border-white/10 pl-4">
                    "{itinerary.summary}"
                  </p>
                  
                  <div className="space-y-12">
                    {itinerary.days.map((day: any) => (
                      <div key={day.day} className="relative pl-10 border-l border-white/10 pb-4 last:pb-0">
                        <div className="absolute -left-5 top-0 w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                          {day.day}
                        </div>
                        <div className="mb-6">
                          <h4 className="font-black text-xl mb-4 group-hover:text-blue-400 transition-colors">{day.title}</h4>
                          <div className="grid grid-cols-1 gap-3">
                            {day.activities.map((act: string, i: number) => (
                              <div key={i} className="flex items-center gap-3 glass p-3 rounded-xl border-white/5 group hover:border-white/20 transition-all">
                                <CheckCircle2 size={16} className="text-blue-500" />
                                <span className="text-sm text-gray-300">{act}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3 text-xs bg-orange-500/5 p-3 rounded-xl border border-orange-500/10 text-orange-200">
                            <Utensils size={16} className="text-orange-400" />
                            <span className="font-medium">Dining: {day.dining}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs bg-indigo-500/5 p-3 rounded-xl border border-indigo-500/10 text-indigo-200">
                            <Bed size={16} className="text-indigo-400" />
                            <span className="font-medium">Stay: {day.stay}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 p-6 glass rounded-2xl border-blue-500/30 bg-blue-500/5 flex gap-4">
                    <Info className="text-blue-400 shrink-0 mt-1" size={24} />
                    <div>
                      <h5 className="font-bold text-blue-300 mb-1">Architect's Suggestion</h5>
                      <p className="text-sm text-blue-100 leading-relaxed">{itinerary.travelTip}</p>
                    </div>
                  </div>
                </GlassCard>
                
                <div className="flex gap-4">
                  <button className="flex-grow py-5 bg-white text-black font-black rounded-[1.5rem] flex items-center justify-center gap-3 hover:scale-[1.02] transition-all active:scale-95">
                    <Send size={20} />
                    Confirm & Start Booking
                  </button>
                  <button className="px-6 py-5 glass-dark rounded-[1.5rem] border border-white/10 hover:bg-white/10 transition-all">
                    Share
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
