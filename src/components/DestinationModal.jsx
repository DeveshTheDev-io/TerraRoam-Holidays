import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const DestinationModal = ({ destination, onClose }) => {
  if (!destination) return null;

  const slides = destination.media_slides && destination.media_slides.length > 0
    ? destination.media_slides
    : [destination.image]; // Fallback to main image

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000,
      padding: '20px'
    }} onClick={onClose}>
      
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="glass-panel"
        style={{
          maxWidth: '1000px', width: '100%',
          position: 'relative', overflow: 'hidden', padding: 0,
          display: 'flex', flexDirection: 'column', height: '80vh',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 20, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '50%', padding: '10px', cursor: 'pointer', transition: 'background 0.3s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Slideshow Area */}
        <div style={{ position: 'relative', flexGrow: 1, backgroundColor: '#000', overflow: 'hidden' }}>
          <AnimatePresence initial={false} custom={currentIndex}>
            <motion.img
              key={currentIndex}
              src={slides[currentIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
              alt={`${destination.name} slide ${currentIndex + 1}`}
            />
          </AnimatePresence>
          
          {slides.length > 1 && (
            <>
              <button onClick={prevSlide} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '50%', padding: '15px', cursor: 'pointer', zIndex: 10, transition: 'background 0.3s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,153,51,0.5)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}>
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button onClick={nextSlide} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '50%', padding: '15px', cursor: 'pointer', zIndex: 10, transition: 'background 0.3s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,153,51,0.5)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}>
                <ChevronRight className="w-8 h-8" />
              </button>
              <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '8px', zIndex: 10 }}>
                {slides.map((_, i) => (
                  <div key={i} style={{ width: i === currentIndex ? '30px' : '10px', height: '10px', borderRadius: '5px', background: i === currentIndex ? 'var(--color-saffron)' : 'rgba(255,255,255,0.5)', transition: 'all 0.3s', cursor: 'pointer' }} onClick={() => setCurrentIndex(i)} />
                ))}
              </div>
            </>
          )}
          
          {/* Gradient Overlay for Text */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '70%', background: 'linear-gradient(to top, rgba(10,10,15,1) 0%, rgba(10,10,15,0.7) 40%, transparent 100%)', zIndex: 5, pointerEvents: 'none' }} />
        </div>

        {/* Details Section overlapping the bottom of the image */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px', zIndex: 10, color: 'white' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
            {destination.tags?.map(tag => (
              <span key={tag} style={{ fontSize: '0.85rem', padding: '5px 15px', borderRadius: '20px', background: 'rgba(255,153,51,0.2)', border: '1px solid var(--color-saffron)', color: 'var(--color-saffron)' }}>
                {tag}
              </span>
            ))}
          </div>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '15px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{destination.name}</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '800px', lineHeight: '1.8', textShadow: '0 2px 5px rgba(0,0,0,0.8)' }}>
            {destination.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default DestinationModal;
