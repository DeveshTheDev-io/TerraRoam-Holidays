
import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { PackageGrid } from './components/PackageGrid';
import { AIPlanner } from './components/AIPlanner';
import { InteractiveMap } from './components/InteractiveMap';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { Compass, Menu, X, User, Search, Globe } from 'lucide-react';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<{name: string} | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Destinations', id: 'explore-regions' },
    { name: 'Packages', id: 'packages' },
    { name: 'AI Planner', id: 'ai-planner' },
    { name: 'About', id: 'about' }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 py-4 ${scrolled ? 'glass-dark m-4 rounded-3xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Aesthetic Logo Design - Updated to TerraRoam Holidays */}
          <div 
            className="flex items-center gap-4 group cursor-pointer" 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl rotate-12 group-hover:rotate-45 transition-transform duration-500 blur-sm opacity-50"></div>
              <div className="absolute inset-0 bg-black border border-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 z-10 overflow-hidden">
                <Globe size={22} className="text-white group-hover:text-blue-400 transition-colors" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500/20 blur-xl"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-gray-500 leading-none">
                TerraRoam
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="h-[1px] w-3 bg-blue-500/50"></div>
                <span className="text-[8px] uppercase tracking-[0.5em] text-blue-500 font-black">
                  Holidays
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map(item => (
              <button 
                key={item.id} 
                onClick={() => scrollToSection(item.id)}
                className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-500 group-hover:w-full transition-all duration-500"></span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white hidden sm:block transition-colors">
              <Search size={18} />
            </button>
            <button 
              onClick={() => setAuthOpen(true)}
              className="group relative px-6 py-2.5 glass rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] border border-white/10 hover:border-blue-500/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white">
                <User size={14} /> 
                {user ? user.name : 'Login'}
              </span>
            </button>
            <button 
              className="md:hidden p-2 text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden">
          {navItems.map(item => (
            <button 
              key={item.id} 
              onClick={() => scrollToSection(item.id)}
              className="text-4xl font-black hover:text-blue-500 transition-colors"
            >
              {item.name}
            </button>
          ))}
          <button 
            className="mt-8 px-8 py-4 bg-blue-600 rounded-full font-bold uppercase tracking-widest"
            onClick={() => setMenuOpen(false)}
          >
            Close Menu
          </button>
        </div>
      )}

      {/* Main Content Sections */}
      <main>
        <div id="home">
          <Hero />
        </div>
        
        {/* Value Prop Section */}
        <section className="py-24 bg-black relative">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto text-blue-500">
                <Compass size={32} />
              </div>
              <h3 className="text-xl font-bold">Curated for All Ages</h3>
              <p className="text-gray-500 text-sm leading-relaxed">From wheelchair-accessible pilgrimages for grandparents to vibrant adventure treks for the youth.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto text-purple-500">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold">Local Expertise</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Deep-rooted connections with local artisans, guides, and boutique stays across Bharat.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto text-indigo-500">
                <User size={32} />
              </div>
              <h3 className="text-xl font-bold">Personalized Luxury</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Every itinerary is unique. We don't do 'copy-paste' travel; we design your specific memories.</p>
            </div>
          </div>
        </section>

        <section id="explore-regions">
          <InteractiveMap />
        </section>

        <section id="packages">
          <PackageGrid />
        </section>
        
        <section id="ai-planner">
          <AIPlanner />
        </section>

        {/* Brand Showcase Section */}
        <section id="about" className="py-32 bg-black overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[500px] bg-blue-600/10 blur-[150px] -rotate-12 rounded-full"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight italic">Beyond Just <br/>A <span className="text-blue-500">Travel Agency</span></h2>
                <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                  TerraRoam Holidays combines the wisdom of old-school hospitality with the precision of modern technology. 
                  Whether it's a quiet anniversary in the Himalayas or a bustling family wedding retreat in Rajasthan, we manage the chaos while you cherish the calm.
                </p>
                <div className="flex gap-8">
                  <div>
                    <span className="text-4xl font-black text-white">50k+</span>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Happy Roamers</p>
                  </div>
                  <div>
                    <span className="text-4xl font-black text-white">120+</span>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Hidden Gems</p>
                  </div>
                  <div>
                    <span className="text-4xl font-black text-white">24/7</span>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Concierge Support</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="glass rounded-[2rem] p-4 rotate-3 hover:rotate-0 transition-transform duration-700 aspect-square overflow-hidden border border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1000" 
                    alt="Taj Mahal"
                    className="w-full h-full object-cover rounded-[1.5rem]"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 glass-dark p-6 rounded-2xl border border-white/20 shadow-2xl -rotate-6">
                  <p className="text-blue-400 text-xl font-black">"Authentic"</p>
                  <p className="text-gray-500 text-xs">Rated 4.9/5 by Travelers</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Auth Modal Component */}
      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
        onSuccess={(name) => setUser({name})} 
      />
    </div>
  );
};

export default App;
