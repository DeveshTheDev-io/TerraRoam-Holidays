
import React from 'react';
import { Compass, Instagram, Twitter, Facebook, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Compass className="text-blue-500" />
              <span className="text-2xl font-black tracking-tighter uppercase italic">TerraRoam</span>
            </div>
            <p className="text-gray-500 font-light text-sm mb-8 leading-relaxed">
              India's premier travel architect, redefining how generations experience the sub-continent through modern AI and curated luxury.
            </p>
            <div className="flex gap-4">
              <Instagram className="text-gray-400 hover:text-white cursor-pointer transition-colors" size={20} />
              <Twitter className="text-gray-400 hover:text-white cursor-pointer transition-colors" size={20} />
              <Facebook className="text-gray-400 hover:text-white cursor-pointer transition-colors" size={20} />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Destinations</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="hover:text-blue-400 cursor-pointer">Himachal & Kashmir</li>
              <li className="hover:text-blue-400 cursor-pointer">Rajasthan Palaces</li>
              <li className="hover:text-blue-400 cursor-pointer">Kerala Backwaters</li>
              <li className="hover:text-blue-400 cursor-pointer">Goa & Coastal India</li>
              <li className="hover:text-blue-400 cursor-pointer">Spiritual Centers</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Experience Types</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="hover:text-blue-400 cursor-pointer">Honeymoon Specials</li>
              <li className="hover:text-blue-400 cursor-pointer">Elderly-Friendly Pilgrims</li>
              <li className="hover:text-blue-400 cursor-pointer">Family Getaways</li>
              <li className="hover:text-blue-400 cursor-pointer">Corporate Retreats</li>
              <li className="hover:text-blue-400 cursor-pointer">Solo Expeditions</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <div className="space-y-4 text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-blue-500" />
                <span>hello@terraroamholidays.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-blue-500" />
                <span>+91 98765 43210</span>
              </div>
              <div className="mt-6 p-4 glass rounded-xl">
                <p className="text-xs text-blue-300 font-bold mb-2">Subscribe to Wanderlust</p>
                <div className="flex gap-2">
                  <input type="text" placeholder="Email" className="bg-transparent border-b border-white/20 text-xs py-1 outline-none w-full" />
                  <button className="text-xs font-bold uppercase text-blue-500">Join</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] uppercase tracking-widest text-gray-600">
          <p>© 2024 TerraRoam Holidays Pvt Ltd. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
