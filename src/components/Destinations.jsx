import React, { useState } from 'react';
import { ContainerScroll } from './ContainerScroll';
import { useAppContext } from '../context/AppContext';
import DestinationModal from './DestinationModal';

const Destinations = () => {
  const { destinations } = useAppContext();
  const [selectedDest, setSelectedDest] = useState(null);

  return (
    <section id="destinations" style={{ position: 'relative', zIndex: 10, overflow: 'hidden' }}>
      {selectedDest && <DestinationModal destination={selectedDest} onClose={() => setSelectedDest(null)} />}
      <ContainerScroll
        titleComponent={
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '15px', color: 'white', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
              Top <span className="text-gradient">Destinations</span>
            </h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              Handpicked locations that showcase the diverse beauty of the Indian subcontinent.
            </p>
          </div>
        }
      >
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          padding: '20px',
          height: '100%',
          overflowY: 'auto',
          background: 'rgba(10, 10, 15, 0.8)',
        }}>
          {destinations.map((dest) => (
            <div 
              key={dest.id} 
              className="glass-panel" 
              style={{ 
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                minHeight: '400px',
                background: 'rgba(255, 255, 255, 0.05)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img 
                  src={dest.image} 
                  alt={dest.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => { e.target.style.transform = 'scale(1.1)' }}
                  onMouseLeave={(e) => { e.target.style.transform = 'scale(1)' }}
                />
                <div style={{ 
                  position: 'absolute', 
                  top: 0, left: 0, width: '100%', height: '100%', 
                  background: 'linear-gradient(to bottom, transparent 50%, rgba(10,10,15,0.8))'
                }}/>
              </div>
              
              <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '15px', flexWrap: 'wrap' }}>
                  {dest.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: '0.75rem',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{dest.name}</h3>
                <p style={{ color: 'var(--text-dim)', marginBottom: '20px', lineHeight: '1.5', flexGrow: 1, fontSize: '0.9rem' }}>
                  {dest.description}
                </p>
                <button 
                  onClick={() => setSelectedDest(dest)}
                  className="glass-button" 
                  style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', fontSize: '0.9rem' }}
                >
                  Discover More
                </button>
              </div>
            </div>
          ))}
        </div>
      </ContainerScroll>
    </section>
  );
};

export default Destinations;
