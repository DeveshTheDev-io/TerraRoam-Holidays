import React from 'react';
import { motion } from 'framer-motion';
import { Circle, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ElegantShape({
    color = "rgba(255,255,255,0.08)",
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    pos = {}
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
            animate={{ opacity: 1, y: 0, rotate: rotate }}
            transition={{ duration: 2.4, delay, ease: [0.23, 0.86, 0.39, 0.96], opacity: { duration: 1.2 } }}
            style={{ position: 'absolute', ...pos }}
        >
            <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                style={{ width, height, position: 'relative' }}
            >
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                    borderRadius: '9999px',
                    background: `linear-gradient(to right, transparent, ${color})`,
                    backdropFilter: 'blur(2px)',
                    border: '2px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 8px 32px 0 rgba(255,255,255,0.1)'
                }}>
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                        borderRadius: '9999px',
                        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2), transparent 70%)'
                    }} />
                </div>
            </motion.div>
        </motion.div>
    );
}

const Hero = () => {
    const navigate = useNavigate();
    const badge = "TerraRoam Holidays";
    const title1 = "Elevate Your";
    const title2 = "Travel Experience";

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: 0.5 + i * 0.2, ease: [0.25, 0.4, 0.25, 1] },
        }),
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#0a0a0f' }}>
            {/* Background Blur */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, rgba(255,153,51,0.05), transparent, rgba(244,63,94,0.05))', filter: 'blur(100px)' }} />

            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                <ElegantShape
                    delay={0.3} width={600} height={140} rotate={12} color="rgba(99,102,241,0.15)"
                    pos={{ left: '-5%', top: '20%' }}
                />
                <ElegantShape
                    delay={0.5} width={500} height={120} rotate={-15} color="rgba(255,153,51,0.15)"
                    pos={{ right: '0%', top: '75%' }}
                />
                <ElegantShape
                    delay={0.4} width={300} height={80} rotate={-8} color="rgba(139,92,246,0.15)"
                    pos={{ left: '10%', bottom: '10%' }}
                />
                <ElegantShape
                    delay={0.6} width={200} height={60} rotate={20} color="rgba(245,158,11,0.15)"
                    pos={{ right: '20%', top: '15%' }}
                />
                <ElegantShape
                    delay={0.7} width={150} height={40} rotate={-25} color="rgba(6,182,212,0.15)"
                    pos={{ left: '25%', top: '10%' }}
                />
            </div>

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
                <motion.div
                    custom={0} variants={fadeUpVariants} initial="hidden" animate="visible"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '40px' }}
                >
                    <Circle style={{ width: '8px', height: '8px', fill: 'rgba(255,153,51,0.8)', color: 'rgba(255,153,51,0.8)' }} />
                    <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '1px' }}>
                        {badge}
                    </span>
                </motion.div>

                <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
                    <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 'bold', marginBottom: '30px', letterSpacing: '-1px', lineHeight: 1.1 }}>
                        <span style={{ background: 'linear-gradient(to bottom, white, rgba(255,255,255,0.8))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {title1}
                        </span>
                        <br />
                        <span style={{ background: 'linear-gradient(to right, #a5b4fc, rgba(255,255,255,0.9), #ff9933)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {title2}
                        </span>
                    </h1>
                </motion.div>

                <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
                    <p style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', color: 'rgba(255,255,255,0.4)', marginBottom: '40px', lineHeight: 1.6, fontWeight: 300, letterSpacing: '0.5px', maxWidth: '600px', margin: '0 auto' }}>
                        Crafting exceptional travel experiences through
                        innovative itineraries and premium global access.
                    </p>
                </motion.div>
                
                <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible">
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                      <button 
                        onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
                        className="glass-button" style={{ 
                        fontSize: '1.1rem', 
                        padding: '16px 40px',
                        background: 'linear-gradient(135deg, rgba(255,153,51,0.8), rgba(255,153,51,0.2))',
                        borderColor: 'rgba(255,153,51,0.5)',
                        color: 'white',
                        cursor: 'pointer'
                      }}>
                        Explore Destinations
                      </button>
                      <button 
                        onClick={() => navigate('/packages')}
                        className="glass-button" style={{ 
                        fontSize: '1.1rem', 
                        padding: '16px 40px',
                        color: 'white',
                        cursor: 'pointer'
                      }}>
                        View Itineraries
                      </button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer'
                }}
                onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '60px',
                        borderRadius: '20px',
                        border: '2px solid rgba(255,255,255,0.2)',
                        background: 'rgba(0,0,0,0.3)',
                        backdropFilter: 'blur(5px)'
                    }}
                >
                    <ChevronDown size={24} color="rgba(255,153,51,0.8)" style={{ marginTop: '10px' }} />
                </motion.div>
            </motion.div>

            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10, 10, 15, 1) 0%, transparent 20%)', pointerEvents: 'none' }} />
        </div>
    );
};

export default Hero;
