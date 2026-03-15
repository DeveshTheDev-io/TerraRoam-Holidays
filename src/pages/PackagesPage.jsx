import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BookingModal from '../components/BookingModal';

const PackagesPage = () => {
  const { packages, currentUser, createBooking, normalizedBookings } = useAppContext();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [searchParams] = useSearchParams();

  const searchTheme = searchParams.get('theme') || '';
  const searchDuration = searchParams.get('duration') || '';
  const searchPrice = searchParams.get('price') || '';

  const filteredPackages = packages.filter(pkg => {
    let matchesTheme = true;
    if (searchTheme) {
        // Simple string match against relevant fields. Needs robust data tagging for production.
        const searchAgainst = (`${pkg.title} ${pkg.description} ${pkg.destination} ${pkg.included}`).toLowerCase();
        matchesTheme = searchAgainst.includes(searchTheme.toLowerCase());
    }

    let matchesDuration = true;
    if (searchDuration) {
        const daysMatch = pkg.duration.match(/\d+/);
        const days = daysMatch ? parseInt(daysMatch[0]) : 0;
        if (searchDuration === '1-3') matchesDuration = days >= 1 && days <= 3;
        if (searchDuration === '4-7') matchesDuration = days >= 4 && days <= 7;
        if (searchDuration === '8+') matchesDuration = days >= 8;
    }

    let matchesPrice = true;
    if (searchPrice) {
        if (searchPrice === 'under_10k') matchesPrice = pkg.price < 10000;
        if (searchPrice === '10k_30k') matchesPrice = pkg.price >= 10000 && pkg.price <= 30000;
        if (searchPrice === 'above_30k') matchesPrice = pkg.price > 30000;
    }

    return matchesTheme && matchesDuration && matchesPrice;
  });

  const handleBook = (pkg) => {
    if (!currentUser) {
      if (window.confirm("You need to be logged in to book a package. Go to Login?")) {
        navigate('/auth');
      }
      return;
    }
    setSelectedPkg(pkg);
    setIsModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px', paddingLeft: '40px', paddingRight: '40px', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
      
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>All <span className="text-gradient">Packages</span></h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Explore our complete catalog of global and domestic travel itineraries.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
        {filteredPackages.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: 'var(--text-dim)', fontSize: '1.2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                No packages match your search criteria. Try adjusting your filters.
            </div>
        )}
        {filteredPackages.map((pkg, index) => {
          const rotation = index % 4 === 0 ? '-1deg' : index % 4 === 1 ? '1deg' : index % 4 === 2 ? '-2deg' : '2deg';
          
          return (
            <div
                key={pkg.id}
                className="packages-card-wrapper"
                style={{
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    transform: `rotate(${rotation})`,
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = `rotate(${rotation}) translateY(-10px)`;
                    e.currentTarget.children[0].style.transform = 'translate(-4px, -4px)';
                    e.currentTarget.children[0].style.boxShadow = pkg.featured ? '6px 6px 0px 0px rgba(255, 153, 51, 0.8)' : '6px 6px 0px 0px rgba(255, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `rotate(${rotation})`;
                    e.currentTarget.children[0].style.transform = 'none';
                    e.currentTarget.children[0].style.boxShadow = pkg.featured ? '6px 6px 0px 0px rgba(255, 153, 51, 0.5)' : '6px 6px 0px 0px rgba(255, 255, 255, 0.2)';
                }}
            >
                {/* Background Shadow Outline */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(26, 26, 30, 0.8)',
                        backdropFilter: 'blur(12px)',
                        border: `2px solid ${pkg.featured ? 'rgba(255, 153, 51, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
                        borderRadius: '24px',
                        boxShadow: pkg.featured 
                            ? '6px 6px 0px 0px rgba(255, 153, 51, 0.5)'
                            : '6px 6px 0px 0px rgba(255, 255, 255, 0.2)',
                        transition: 'all 0.3s ease',
                        zIndex: 0
                    }}
                />

                {/* Content Box */}
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', borderRadius: '24px' }}>
                    
                    {pkg.featured && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '-35px',
                                background: 'var(--color-saffron)',
                                color: '#000',
                                fontWeight: 'bold',
                                padding: '8px 40px',
                                transform: 'rotate(45deg)',
                                fontSize: '0.8rem',
                                border: '2px solid rgba(0,0,0,0.8)',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                                zIndex: 10,
                                letterSpacing: '1px'
                            }}
                        >
                            FEATURED
                        </div>
                    )}

                    <div style={{ height: '220px', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    
                    <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <h3 style={{ fontSize: '1.6rem', margin: '0 0 10px 0', color: 'white', fontWeight: 'bold' }}>{pkg.title}</h3>
                        
                        <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>
                                ₹{pkg.price.toLocaleString('en-IN')}
                            </span>
                            <span style={{ color: 'var(--text-dim)', marginLeft: '10px', fontSize: '1rem' }}>
                                /person
                            </span>
                        </div>
                        
                        <p style={{ color: 'var(--text-dim)', marginBottom: '30px', flexGrow: 1, lineHeight: '1.5' }}>
                          {pkg.description}
                        </p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-dim)', fontSize: '0.95rem', marginBottom: '30px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>🗓</span> 
                              {pkg.duration}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>📍</span> 
                              {(pkg.route || pkg.destination || "Various Locations").split('•')[0].trim()}{pkg.route && pkg.route.includes('•') ? '...' : ''}
                          </span>
                        </div>

                        {(() => {
                            const pkgId = pkg.id || pkg.$id;
                            const userId = currentUser ? (currentUser.id || currentUser.$id) : null;
                            const hasBooked = currentUser && normalizedBookings.some(b => b.package_id === pkgId && b.user_id === userId);
                            return (
                                <button
                                    onClick={() => handleBook(pkg)}
                                    className="glass-button"
                                    style={{
                                        width: '100%',
                                        height: '56px',
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold',
                                        borderRadius: '12px',
                                        border: '2px solid rgba(255,255,255,0.1)',
                                        background: pkg.featured ? 'var(--color-saffron)' : (hasBooked ? 'rgba(19, 136, 8, 0.2)' : 'rgba(255,255,255,0.1)'),
                                        color: pkg.featured ? '#000' : (hasBooked ? 'var(--color-emerald)' : 'white'),
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                        marginTop: 'auto'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (pkg.featured) {
                                            e.currentTarget.style.background = '#ffad4d';
                                        } else if (hasBooked) {
                                            e.currentTarget.style.background = 'rgba(19, 136, 8, 0.3)';
                                        } else {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (pkg.featured) {
                                            e.currentTarget.style.background = 'var(--color-saffron)';
                                        } else if (hasBooked) {
                                            e.currentTarget.style.background = 'rgba(19, 136, 8, 0.2)';
                                        } else {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                        }
                                    }}
                                >
                                    {hasBooked ? 'Booked ✓ (Book Again)' : 'Book Package'}
                                </button>
                            );
                        })()}
                    </div>
                </div>
            </div>
          );
        })}
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        pkg={selectedPkg} 
      />
    </div>
  );
};

export default PackagesPage;
