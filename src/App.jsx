import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
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
                    <FAQ />
                    <Footer />
                  </div>
                </div>
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
    </>
  );
}

export default App;
