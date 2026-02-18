
import React, { useState } from 'react';
import { X, Mail, Lock, User, Github, Chrome, ArrowRight, Loader2 } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (name: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onSuccess(formData.username || 'Traveler');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-md animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        <GlassCard className="relative p-10 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] bg-black/40" hoverEffect={false}>
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black mb-2 italic">
              {mode === 'login' ? 'Welcome Back' : 'Join the Journey'}
            </h2>
            <p className="text-gray-500 text-sm">
              {mode === 'login' ? 'Your premium Indian adventure awaits.' : 'Start your curated travel experience today.'}
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex glass rounded-2xl p-1.5 mb-8 border border-white/5">
            <button 
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'login' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setMode('signup')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'signup' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Username</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
                    <User size={18} />
                  </div>
                  <input 
                    type="text" 
                    required
                    placeholder="Wanderer123"
                    className="w-full glass-dark border border-white/5 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  required
                  placeholder="hello@roamer.com"
                  className="w-full glass-dark border border-white/5 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Password</label>
                {mode === 'login' && (
                  <button type="button" className="text-[10px] text-blue-500 font-bold hover:underline mb-1">Forgot Password?</button>
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full glass-dark border border-white/5 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit"
              className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 mt-4 shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : (
                <>
                  {mode === 'login' ? 'Continue' : 'Create Account'}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <span className="relative z-10 px-4 bg-transparent text-[10px] font-black uppercase tracking-widest text-gray-600">Or continue with</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 glass rounded-xl border border-white/5 hover:border-white/20 transition-all">
                <Chrome size={18} />
                <span className="text-[10px] font-bold uppercase">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 py-3 glass rounded-xl border border-white/5 hover:border-white/20 transition-all">
                <Github size={18} />
                <span className="text-[10px] font-bold uppercase">Github</span>
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
