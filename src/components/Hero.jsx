import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const defaultImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', title: 'Incredible India' },
    { id: 2, url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', title: 'Serene Backwaters' },
    { id: 3, url: 'https://images.unsplash.com/photo-1514222134-b57cbf8ce698?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', title: 'Royal Heritage' },
    { id: 4, url: 'https://images.unsplash.com/photo-1626621341517-bbf3d99903b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', title: 'Majestic Peaks' },
];

const Hero = () => {
    const { heroImages, siteSettings } = useAppContext();
    const { scrollY } = useScroll();
    
    const heroLogoUrl = siteSettings?.find(s => s.setting_name === 'hero_logo')?.setting_value;
    
    // Scroll animations
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const scaleText = useTransform(scrollY, [0, 400], [1, 0.8]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const overlayOpacity = useTransform(scrollY, [0, 500], [0.3, 1]);

    // Slideshow state
    const displayImages = heroImages && heroImages.length > 0 ? heroImages : defaultImages;
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (displayImages.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % displayImages.length);
        }, 5000); // 5 seconds per slide
        return () => clearInterval(interval);
    }, [displayImages.length]);

    return (
        <div style={{ 
            position: 'relative', 
            height: '100vh', 
            width: '100%', 
            backgroundColor: '#050508',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Background Slideshow */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        zIndex: 1
                    }}
                >
                    <img 
                        src={displayImages[currentIndex].url} 
                        alt="Hero Slide" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Dark Gradients & Color Blends */}
            <motion.div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(to bottom, rgba(5,5,8,0.7) 0%, rgba(5,5,8,0.2) 50%, rgba(5,5,8,0.9) 100%)',
                opacity: overlayOpacity,
                zIndex: 2
            }} />

            {/* Ambient India Colors Blend */}
            <div style={{
                position: 'absolute',
                top: '-20%', left: '-10%',
                width: '60vw', height: '60vw',
                background: 'radial-gradient(circle, rgba(255, 153, 51, 0.15) 0%, transparent 60%)',
                filter: 'blur(80px)',
                zIndex: 2,
                animation: 'pulse-slow 8s infinite alternate'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-20%', right: '-10%',
                width: '60vw', height: '60vw',
                background: 'radial-gradient(circle, rgba(19, 136, 8, 0.15) 0%, transparent 60%)',
                filter: 'blur(80px)',
                zIndex: 2,
                animation: 'pulse-slow 10s infinite alternate-reverse'
            }} />

            {/* Central Circular Design Element */}
            <motion.div 
                style={{
                    position: 'relative',
                    zIndex: 10,
                    y: y1,
                    scale: scaleText,
                    opacity: opacity,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    style={{
                        width: 'clamp(300px, 40vw, 500px)',
                        height: 'clamp(300px, 40vw, 500px)',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 40px rgba(255,255,255,0.05)',
                        position: 'relative'
                    }}
                >
                    {/* Spinning Border Dash */}
                    <svg style={{ position: 'absolute', top: -10, left: -10, width: 'calc(100% + 20px)', height: 'calc(100% + 20px)', animation: 'spin-slow 40s linear infinite' }}>
                        <circle cx="50%" cy="50%" r="48%" fill="none" stroke="rgba(255,153,51,0.5)" strokeWidth="1" strokeDasharray="10 20" />
                        <circle cx="50%" cy="50%" r="46%" fill="none" stroke="rgba(19,136,8,0.5)" strokeWidth="1" strokeDasharray="30 40" style={{ animation: 'spin-slow 30s linear infinite reverse', transformOrigin: 'center' }} />
                    </svg>

                    {heroLogoUrl && (
                        <img 
                            src={heroLogoUrl} 
                            alt="Hero Logo" 
                            style={{ 
                                height: 'clamp(60px, 8vw, 100px)', 
                                width: 'auto', 
                                objectFit: 'contain', 
                                marginBottom: '20px', 
                                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))',
                                position: 'relative',
                                zIndex: 5
                            }} 
                        />
                    )}

                    <h2 style={{
                        color: 'var(--color-saffron)',
                        fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                        fontWeight: '600',
                        letterSpacing: '5px',
                        textTransform: 'uppercase',
                        margin: '0 0 10px 0',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                    }}>
                        Discover
                    </h2>
                    
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                        fontWeight: '700',
                        fontFamily: '"Playfair Display", serif',
                        margin: 0,
                        background: 'linear-gradient(180deg, #ffffff 0%, #e0e0e0 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0px 5px 15px rgba(0,0,0,0.6))',
                        textAlign: 'center',
                        lineHeight: '1.1'
                    }}>
                        {displayImages[currentIndex].title || 'TerraRoam'}
                    </h1>

                    <div style={{ height: '2px', width: '60px', background: 'white', margin: '20px 0', opacity: 0.5 }} />

                    <button 
                        className="glass-button" 
                        onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
                        style={{ 
                            padding: '12px 30px', 
                            fontSize: '1rem', 
                            background: 'rgba(255,255,255,0.1)', 
                            borderColor: 'rgba(255,255,255,0.2)',
                            borderRadius: '30px',
                            textTransform: 'uppercase',
                            letterSpacing: '2px'
                        }}
                    >
                        Explore Now
                    </button>
                </motion.div>
                
                {/* Scroll Indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    style={{ position: 'absolute', bottom: '-80px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
                >
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase' }}>Scroll</span>
                    <motion.div 
                        animate={{ y: [0, 10, 0] }} 
                        transition={{ repeat: Infinity, duration: 2 }}
                        style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)' }}
                    />
                </motion.div>
            </motion.div>

            {/* Slide Navigation Dots */}
            <div style={{ position: 'absolute', bottom: '40px', display: 'flex', gap: '15px', zIndex: 10 }}>
                {displayImages.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        style={{
                            width: idx === currentIndex ? '30px' : '10px',
                            height: '10px',
                            borderRadius: '5px',
                            background: idx === currentIndex ? 'var(--color-saffron)' : 'rgba(255,255,255,0.3)',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    />
                ))}
            </div>
            
            {/* Seamless gradient blend to next section */}
            <div style={{ 
                position: 'absolute', 
                bottom: 0, left: 0, right: 0, 
                height: '150px', 
                background: 'linear-gradient(to top, rgba(8, 8, 12, 0.8), transparent)', 
                zIndex: 5,
                pointerEvents: 'none'
            }} />

            <style>
                {`
                    @keyframes spin-slow {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    @keyframes pulse-slow {
                        0% { opacity: 0.3; transform: scale(1); }
                        100% { opacity: 0.8; transform: scale(1.1); }
                    }
                `}
            </style>
        </div>
    );
};

export default Hero;
