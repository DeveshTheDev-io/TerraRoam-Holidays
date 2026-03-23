import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminView = location.pathname.startsWith('/admin');
  const { currentUser, logout } = useAppContext();
  const [searchParams] = useSearchParams();
  const [searchTheme, setSearchTheme] = useState(searchParams.get('theme') || '');
  const [searchDuration, setSearchDuration] = useState(searchParams.get('duration') || '');
  const [searchPrice, setSearchPrice] = useState(searchParams.get('price') || '');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTheme) params.append('theme', searchTheme);
    if (searchDuration) params.append('duration', searchDuration);
    if (searchPrice) params.append('price', searchPrice);
    setIsMobileMenuOpen(false); // Close menu on search
    navigate(`/packages?${params.toString()}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .navbar-content-container {
          display: flex;
          align-items: center;
          gap: 30px;
        }
        .mobile-menu-btn {
          display: none;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
        }
        .search-form {
          display: flex;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 30px;
          padding: 5px 15px;
          gap: 15px;
          align-items: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .search-divider {
          width: 1px;
          height: 20px;
          background: rgba(255,255,255,0.2);
        }
        @media (max-width: 1024px) {
          .navbar-content-container {
            display: ${isMobileMenuOpen ? 'flex' : 'none'};
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(10, 10, 15, 0.98);
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding: 20px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.5);
            align-items: stretch;
          }
          .mobile-menu-btn {
            display: block;
          }
          .search-form {
            flex-direction: column;
            border-radius: 16px;
            padding: 15px;
            gap: 10px;
            align-items: stretch;
          }
          .search-form select {
            width: 100%;
            padding: 10px;
            background: rgba(0,0,0,0.3) !important;
            border-radius: 8px !important;
          }
          .search-divider {
            display: none;
          }
          .search-form button {
            margin-top: 10px;
            width: 100%;
            margin-left: 0 !important;
          }
          .nav-links-container {
            flex-direction: column;
            align-items: center;
            width: 100%;
          }
        }
      `}</style>
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
          background: scrolled || isMobileMenuOpen ? 'rgba(10, 10, 15, 0.95)' : 'rgba(10, 10, 15, 0.2)'
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: '"Playfair Display", serif', letterSpacing: '1px', color: 'white' }}>
            TerraRoam <span className="text-gradient" style={{ fontStyle: 'italic', fontWeight: 400 }}>Holidays</span>
          </div>
        </Link>
        
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="navbar-content-container">
          {!isAdminView && (
            <form onSubmit={handleSearch} className="search-form">
              <select 
                value={searchTheme}
                onChange={(e) => setSearchTheme(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', cursor: 'pointer', padding: '5px' }}
              >
                <option value="" style={{ color: 'black' }}>Any Theme</option>
                <option value="Honeymoon" style={{ color: 'black' }}>Honeymoon</option>
                <option value="Adventure" style={{ color: 'black' }}>Adventure</option>
                <option value="Pilgrimage" style={{ color: 'black' }}>Pilgrimage</option>
                <option value="Heritage" style={{ color: 'black' }}>Heritage</option>
              </select>
              
              <div className="search-divider" />
              
              <select 
                value={searchDuration}
                onChange={(e) => setSearchDuration(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', cursor: 'pointer', padding: '5px' }}
              >
                <option value="" style={{ color: 'black' }}>Any Duration</option>
                <option value="1-3" style={{ color: 'black' }}>1-3 Days</option>
                <option value="4-7" style={{ color: 'black' }}>4-7 Days</option>
                <option value="8+" style={{ color: 'black' }}>8+ Days</option>
              </select>

              <div className="search-divider" />
              
              <select 
                value={searchPrice}
                onChange={(e) => setSearchPrice(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', cursor: 'pointer', padding: '5px' }}
              >
                <option value="" style={{ color: 'black' }}>Any Price</option>
                <option value="under_10k" style={{ color: 'black' }}>Under ₹10,000</option>
                <option value="10k_30k" style={{ color: 'black' }}>₹10,000 - ₹30,000</option>
                <option value="above_30k" style={{ color: 'black' }}>₹30,000+</option>
              </select>

              <button 
                type="submit" 
                style={{
                  background: 'var(--color-saffron)',
                  color: 'black',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '8px 20px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginLeft: '5px'
                }}
              >
                Search
              </button>
            </form>
          )}

          <nav className="nav-links-container" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            {!isAdminView && (
              <>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/#destinations" style={{ color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem', transition: 'color 0.3s' }} className="nav-link">Destinations</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/packages" style={{ color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem', transition: 'color 0.3s' }} className="nav-link">Packages</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/#blog" style={{ color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem', transition: 'color 0.3s' }} className="nav-link">Blog</Link>
              </>
            )}
            
            {currentUser && currentUser.role === 'admin' && (
              <Link onClick={() => setIsMobileMenuOpen(false)} to={isAdminView ? "/" : "/admin"} style={{ color: 'var(--color-saffron)', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem', transition: 'color 0.3s' }}>
                {isAdminView ? "Back to Site" : "Admin Panel"}
              </Link>
            )}

            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>Hi, {currentUser.name.split(' ')[0]}</span>
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); navigate('/'); }} className="glass-button" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Logout</button>
              </div>
            ) : (
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/auth">
                <button className="glass-button">Sign In</button>
              </Link>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
