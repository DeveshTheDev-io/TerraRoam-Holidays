import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, MapPin } from 'lucide-react';

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // An array of pins to rotate around the globe
    const pins = [
        { top: '15%', left: '30%', delay: 0 },
        { top: '40%', left: '70%', delay: 1 },
        { top: '65%', left: '40%', delay: 2 },
        { top: '80%', left: '55%', delay: 0.5 },
        { top: '25%', left: '60%', delay: 1.5 },
        { top: '50%', left: '20%', delay: 2.5 },
    ];

    return (
        <div style={{ 
            position: 'relative', 
            minHeight: '100vh', 
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center', 
            backgroundColor: '#050508', // Deep rich black
            overflow: 'hidden'
        }}>
            {/* Animated Ambient Background Gradients */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                left: '-10%',
                width: '60vw',
                height: '60vw',
                background: 'radial-gradient(circle, rgba(255, 153, 51, 0.08) 0%, transparent 60%)', // India Saffron
                filter: 'blur(80px)',
                zIndex: 0,
                animation: 'pulse-slow 8s infinite alternate'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-20%',
                right: '-10%',
                width: '60vw',
                height: '60vw',
                background: 'radial-gradient(circle, rgba(19, 136, 8, 0.08) 0%, transparent 60%)', // India Emerald
                filter: 'blur(80px)',
                zIndex: 0,
                animation: 'pulse-slow 10s infinite alternate-reverse'
            }} />

            {/* Top Text: TerraRoam */}
            <motion.div 
                style={{ y: y1, opacity, position: 'absolute', top: '12%', zIndex: 10, textAlign: 'center' }}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <h1 style={{
                    fontSize: 'clamp(4rem, 10vw, 8rem)',
                    fontWeight: '900',
                    fontFamily: '"Outfit", sans-serif',
                    letterSpacing: '4px',
                    margin: 0,
                    background: 'linear-gradient(180deg, #ffffff 0%, #a0a0a0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.5))'
                }}>
                    Terra<span style={{ color: 'var(--color-saffron)', WebkitTextFillColor: 'var(--color-saffron)' }}>Roam</span>
                </h1>
            </motion.div>

            {/* Exact Center Graphic: Glowing Interactive Globe */}
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                style={{
                    position: 'relative',
                    zIndex: 5,
                    width: 'clamp(300px, 45vw, 600px)',
                    height: 'clamp(300px, 45vw, 600px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Glowing Outer Ring */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 0 80px rgba(255, 153, 51, 0.1), inset 0 0 80px rgba(19, 136, 8, 0.1)',
                    animation: 'spin-slow 30s linear infinite',
                }}>
                    {/* Ring Accents */}
                    <div style={{ position: 'absolute', top: -2, left: '50%', width: 4, height: 4, background: '#fff', borderRadius: '50%', boxShadow: '0 0 10px #fff' }} />
                    <div style={{ position: 'absolute', bottom: -2, left: '50%', width: 4, height: 4, background: '#fff', borderRadius: '50%', boxShadow: '0 0 10px #fff' }} />
                </div>

                {/* The Wireframe Globe Icon */}
                <Globe 
                    size="80%" 
                    color="rgba(255, 255, 255, 0.4)" 
                    strokeWidth={0.5} 
                    style={{ 
                        filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))',
                        animation: 'spin-slow 60s linear infinite reverse'
                    }} 
                />

                {/* Floating Map Pins over the Globe */}
                {pins.map((pin, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.2, 1, 0] }}
                        transition={{ 
                            duration: 4, 
                            delay: pin.delay,
                            repeat: Infinity,
                            repeatDelay: 2
                        }}
                        style={{
                            position: 'absolute',
                            top: pin.top,
                            left: pin.left,
                            color: 'var(--color-saffron)',
                            filter: 'drop-shadow(0 0 10px var(--color-saffron))'
                        }}
                    >
                        <MapPin size={24} fill="rgba(255,153,51,0.2)" />
                    </motion.div>
                ))}
            </motion.div>

            {/* Bottom Text: EXPLORE THE WORLD */}
            <motion.div 
                style={{ opacity, position: 'absolute', bottom: '15%', zIndex: 10, textAlign: 'center' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            >
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '20px', 
                    justifyContent: 'center'
                }}>
                    <div style={{ height: '1px', width: 'clamp(50px, 10vw, 150px)', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5))' }} />
                    <h2 style={{
                        color: '#ffffff',
                        fontSize: 'clamp(1.2rem, 3vw, 2.5rem)',
                        fontWeight: '600',
                        fontFamily: '"Outfit", sans-serif',
                        letterSpacing: '8px',
                        textTransform: 'uppercase',
                        margin: 0,
                        textShadow: '0 4px 20px rgba(0,0,0,1)'
                    }}>
                        EXPLORE THE WORLD
                    </h2>
                    <div style={{ height: '1px', width: 'clamp(50px, 10vw, 150px)', background: 'linear-gradient(-90deg, transparent, rgba(255,255,255,0.5))' }} />
                </div>
                
                {/* Modern subtle quick actions */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center' }}
                >
                    <button 
                        className="glass-button" 
                        onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
                        style={{ padding: '12px 30px', fontSize: '1rem', background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                    >
                        Discover India
                    </button>
                </motion.div>
            </motion.div>
            
            {/* Seamless gradient blend to next section */}
            <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                height: '250px', 
                background: 'linear-gradient(to top, var(--bg-dark), transparent)', 
                zIndex: 5,
                pointerEvents: 'none'
            }} />

            {/* CSS Animations injected via a <style> tag for self-containment */}
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
