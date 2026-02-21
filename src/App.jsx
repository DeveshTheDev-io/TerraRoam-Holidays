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
                <ShaderBanner />
                <Destinations />
                <Packages />
              </>
            } />
            <Route path="/auth" element={<Auth />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
