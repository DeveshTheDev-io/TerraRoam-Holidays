import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Packages from './components/Packages';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import Auth from './pages/Auth';
import PackagesPage from './pages/PackagesPage';
import ShaderBanner from './components/ShaderBanner';
import FloatingPlacesBackground from './components/FloatingPlacesBackground';
import FAQ from './components/FAQ';
import WhyChooseUs from './components/WhyChooseUs';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CallbackPopup from './components/CallbackPopup';

function App() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  return (
    <>
      <div className="fluid-bg">
        <div className="fluid-blob-3"></div>
      </div>

      <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <FloatingPlacesBackground />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <ShaderBanner />
                    <Destinations />
                    <Packages />
                    <WhyChooseUs />
                    <FAQ />
                  </div>
                </div>
                <Footer />
              </>
            } />
            <Route path="/auth" element={<Auth />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </main>
      </div>

      {/* Floating Callback Button */}
      <button
        onClick={() => setIsCallbackOpen(true)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: 'linear-gradient(45deg, var(--color-saffron), #ff7e5f)',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 8px 30px rgba(255, 153, 51, 0.4)',
          zIndex: 9998,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 153, 51, 0.6)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 153, 51, 0.4)';
        }}
      >
        <MessageCircle size={20} />
        <span>Request a Callback</span>
      </button>

      <CallbackPopup isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />
    </>
  );
}

export default App;
