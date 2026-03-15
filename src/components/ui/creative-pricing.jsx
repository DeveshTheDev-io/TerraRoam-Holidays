import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BookingModal from "../BookingModal";
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const PackageDetailsModal = ({ isOpen, onClose, pkg, onInitBook }) => {
    if (!isOpen || !pkg) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(10px)',
                    padding: '20px'
                }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="glass-panel"
                        style={{
                            width: '100%',
                            maxWidth: '600px',
                            background: 'rgba(15, 15, 20, 0.95)',
                            borderRadius: '24px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            overflow: 'hidden',
                            position: 'relative',
                            maxHeight: '90vh',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {/* Header Image */}
                        <div style={{ 
                            width: '100%', 
                            height: '250px', 
                            backgroundImage: `url(${pkg.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(15,15,20,1))'
                            }} />
                            <button 
                                onClick={onClose}
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    background: 'rgba(0,0,0,0.5)',
                                    borderRadius: '50%',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    padding: '8px',
                                    backdropFilter: 'blur(5px)'
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div style={{ padding: '30px', overflowY: 'auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
                                <div>
                                    <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', margin: '0 0 10px 0' }}>{pkg.name || pkg.title}</h2>
                                    <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>
                                        {pkg.description}
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-saffron)' }}>
                                        ₹{(pkg.price || 0).toLocaleString('en-IN')}
                                    </div>
                                    <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>per person</div>
                                </div>
                            </div>

                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginBottom: '30px' }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: 'white' }}>Key Inclusions</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                                    {(pkg.features || []).map((feature, idx) => (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <Check size={16} color="var(--color-saffron)" style={{ flexShrink: 0 }} />
                                            <span style={{ color: '#e5e7eb', fontSize: '1rem' }}>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    onClose();
                                    onInitBook(pkg);
                                }}
                                className="glass-button"
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    background: 'var(--color-saffron)',
                                    color: '#000',
                                    border: 'none',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 15px rgba(255,153,51,0.3)',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                            >
                                Book This Itinerary
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

function PricingTier({ tier, index, onShowDetails }) {
    const [isHovered, setIsHovered] = useState(false);
    const rotation = index % 4 === 0 ? '-1deg' : index % 4 === 1 ? '1deg' : index % 4 === 2 ? '-2deg' : '2deg';

    return (
        <div
            onClick={() => onShowDetails(tier)}
            style={{
                position: 'relative',
                transform: `rotate(${rotation}) ${isHovered ? 'translateY(-10px) scale(1.02)' : ''}`,
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: 'pointer',
                height: '400px',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: isHovered 
                    ? '0 20px 40px rgba(0,0,0,0.6)' 
                    : '6px 6px 0px 0px rgba(255, 255, 255, 0.1)',
                border: tier.popular ? '2px solid rgba(255, 153, 51, 0.5)' : 'border: 1px solid rgba(255,255,255,0.1)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: `url(${tier.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.5s ease',
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    zIndex: 0
                }}
            />
            {/* Gradient Overlay for text readability */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)',
                zIndex: 1
            }} />

            <div style={{ position: 'relative', padding: '30px', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
                {tier.popular && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '-10px',
                            background: 'var(--color-saffron)',
                            color: '#000',
                            fontWeight: 'bold',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                            letterSpacing: '1px'
                        }}
                    >
                        POPULAR
                    </div>
                )}

                <h3 style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold', 
                    color: 'white', 
                    margin: '0 0 10px 0',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}>
                    {tier.name}
                </h3>
                
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    opacity: isHovered ? 1 : 0.8,
                    transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'all 0.3s ease'
                }}>
                    <span style={{ 
                        color: 'var(--color-saffron)', 
                        fontWeight: 'bold', 
                        fontSize: '1.1rem' 
                    }}>
                        View Details &rarr;
                    </span>
                </div>
            </div>
        </div>
    );
}

export function CreativePricing({
    tag = "Exclusive Tours",
    title = "Journey Beyond the Ordinary",
    description = "Curated experiences for the modern explorer",
    tiers,
}) {
    const { currentUser } = useAppContext();
    const navigate = useNavigate();
    
    const [detailsModalPkg, setDetailsModalPkg] = useState(null);
    const [bookingModalPkg, setBookingModalPkg] = useState(null);

    const handleInitBook = (pkg) => {
        if (!currentUser) {
            if (window.confirm("You need to be logged in to book a package. Go to Login?")) {
                navigate('/auth');
            }
            return;
        }
        setBookingModalPkg({ ...pkg, id: pkg.id || pkg.name.replace(/\s+/g, '-').toLowerCase() });
    };

    return (
        <div id="packages" style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '100px 40px', position: 'relative', zIndex: 10 }}>
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                <div style={{ 
                    fontSize: '1.2rem', 
                    color: 'var(--color-saffron)', 
                    transform: 'rotate(-1deg)', 
                    fontWeight: 600, 
                    letterSpacing: '2px', 
                    textTransform: 'uppercase',
                    marginBottom: '10px'
                }}>
                    {tag}
                </div>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <h2 style={{ 
                        fontSize: '3.5rem', 
                        fontWeight: 'bold', 
                        color: 'white', 
                        transform: 'rotate(-1deg)',
                        textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                        margin: '0 0 20px 0'
                    }}>
                        {title}
                        <div style={{ position: 'absolute', right: '-40px', top: '0', color: 'var(--color-saffron)', transform: 'rotate(12deg)', fontSize: '2rem' }}>
                            ✨
                        </div>
                        <div style={{ position: 'absolute', left: '-30px', bottom: '0', color: 'var(--color-saffron)', transform: 'rotate(-12deg)', fontSize: '2rem' }}>
                            ⭐️
                        </div>
                    </h2>
                    <div style={{ 
                        position: 'absolute', 
                        bottom: '-10px', 
                        left: '50%', 
                        transform: 'translateX(-50%) rotate(-1deg)', 
                        width: '250px', 
                        height: '10px', 
                        background: 'rgba(255, 153, 51, 0.3)', 
                        borderRadius: '20px', 
                        filter: 'blur(4px)'
                    }} />
                </div>
                <p style={{ 
                    fontSize: '1.25rem', 
                    color: 'var(--text-dim)', 
                    transform: 'rotate(-1deg)', 
                    maxWidth: '700px', 
                    margin: '20px auto 0' 
                }}>
                    {description}
                </p>
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '40px'
            }}>
                {tiers.map((tier, index) => (
                    <PricingTier 
                        key={tier.name} 
                        tier={tier} 
                        index={index} 
                        onShowDetails={setDetailsModalPkg} 
                    />
                ))}
            </div>
            
            <div style={{ position: 'absolute', zIndex: -1, top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.2 }}>
                <div style={{ position: 'absolute', top: '100px', left: '40px', fontSize: '4rem', transform: 'rotate(12deg)' }}>✈️</div>
                <div style={{ position: 'absolute', bottom: '150px', right: '40px', fontSize: '4rem', transform: 'rotate(-12deg)' }}>🌴</div>
                <div style={{ position: 'absolute', top: '50%', left: '25%', fontSize: '4rem', transform: 'rotate(45deg)', opacity: 0.5 }}>🏔️</div>
            </div>

            <PackageDetailsModal 
                isOpen={!!detailsModalPkg} 
                onClose={() => setDetailsModalPkg(null)} 
                pkg={detailsModalPkg} 
                onInitBook={handleInitBook}
            />

            <BookingModal 
                isOpen={!!bookingModalPkg} 
                onClose={() => setBookingModalPkg(null)} 
                pkg={bookingModalPkg} 
            />
        </div>
    );
}
