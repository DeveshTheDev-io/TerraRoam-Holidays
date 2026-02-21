import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminView = location.pathname.startsWith('/admin');
  const { currentUser, logout } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`glass-nav ${scrolled ? 'nav-scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: scrolled ? '15px 40px' : '25px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(10, 10, 15, 0.8)' : 'rgba(10, 10, 15, 0.2)'
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img src="/logo.png" alt="TerraRoam Logo" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        <div style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '1px', color: 'white' }}>
          TerraRoam <span className="text-gradient">Holidays</span>
        </div>
      </Link>
      
      <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        {!isAdminView && (
          <>
            <a href="/#destinations" style={{ color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem', transition: 'color 0.3s' }} className="nav-link">Destinations</a>
            <Link to="/packages" style={{ color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem', transition: 'color 0.3s' }} className="nav-link">Packages</Link>
          </>
        )}
        
        {currentUser && currentUser.role === 'admin' && (
          <Link to={isAdminView ? "/" : "/admin"} style={{ color: 'var(--color-saffron)', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem', transition: 'color 0.3s' }}>
            {isAdminView ? "Back to Site" : "Admin Panel"}
          </Link>
        )}

        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>Hi, {currentUser.name.split(' ')[0]}</span>
            <button onClick={() => { logout(); navigate('/'); }} className="glass-button" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Logout</button>
          </div>
        ) : (
          <Link to="/auth">
            <button className="glass-button">Sign In</button>
          </Link>
        )}

      </nav>
    </header>
  );
};

export default Navbar;
