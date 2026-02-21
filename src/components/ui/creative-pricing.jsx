import React, { useState } from "react";
import { Check } from "lucide-react";
import BookingModal from "../BookingModal";
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export function CreativePricing({
    tag = "Exclusive Tours",
    title = "Journey Beyond the Ordinary",
    description = "Curated experiences for the modern explorer",
    tiers,
}) {
    const { currentUser } = useAppContext();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPkg, setSelectedPkg] = useState(null);

    const handleBook = (pkg) => {
        if (!currentUser) {
            if (window.confirm("You need to be logged in to book a package. Go to Login?")) {
                navigate('/auth');
            }
            return;
        }
        // Assign a mock ID if this is a homepage static package missing a db ID
        setSelectedPkg({ ...pkg, id: pkg.id || pkg.name.replace(/\s+/g, '-').toLowerCase() });
        setIsModalOpen(true);
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '30px'
            }}>
                {tiers.map((tier, index) => {
                    const [isHovered, setIsHovered] = useState(false);
                    const rotation = index === 0 ? '-1deg' : index === 1 ? '1deg' : index === 2 ? '-2deg' : '2deg';
                    
                    return (
                        <div
                            key={tier.name}
                            style={{
                                position: 'relative',
                                transform: `rotate(${rotation}) ${isHovered ? 'translateY(-10px)' : ''}`,
                                transition: 'all 0.3s ease',
                                cursor: 'default'
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0, left: 0, right: 0, bottom: 0,
                                    background: 'rgba(26, 26, 30, 0.8)',
                                    backdropFilter: 'blur(12px)',
                                    border: `2px solid ${tier.popular ? 'rgba(255, 153, 51, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
                                    borderRadius: '24px',
                                    boxShadow: tier.popular 
                                        ? `6px 6px 0px 0px rgba(255, 153, 51, ${isHovered ? '0.8' : '0.5'})` 
                                        : `6px 6px 0px 0px rgba(255, 255, 255, ${isHovered ? '0.4' : '0.2'})`,
                                    transition: 'all 0.3s ease',
                                    transform: isHovered ? 'translate(-4px, -4px)' : 'none',
                                    zIndex: 0
                                }}
                            />

                            <div style={{ position: 'relative', padding: '40px 30px', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                                {tier.popular && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '-15px',
                                            right: '-15px',
                                            background: 'var(--color-saffron)',
                                            color: '#000',
                                            fontWeight: 'bold',
                                            padding: '8px 20px',
                                            borderRadius: '30px',
                                            transform: 'rotate(12deg)',
                                            fontSize: '0.9rem',
                                            border: '2px solid rgba(0,0,0,0.8)',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                                            letterSpacing: '1px'
                                        }}
                                    >
                                        MOST POPULAR
                                    </div>
                                )}

                                <div style={{ marginBottom: '30px' }}>
                                    <div
                                        style={{
                                            width: '64px',
                                            height: '64px',
                                            borderRadius: '16px',
                                            marginBottom: '24px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '2px solid rgba(255,255,255,0.2)',
                                            background: 'rgba(0,0,0,0.5)',
                                            color: tier.colorCode || 'var(--color-saffron)',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        {tier.icon}
                                    </div>
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white', marginBottom: '10px' }}>
                                        {tier.name}
                                    </h3>
                                    <p style={{ color: 'var(--text-dim)', minHeight: '48px', lineHeight: '1.5' }}>
                                        {tier.description}
                                    </p>
                                </div>

                                <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span style={{ fontSize: '3.5rem', fontWeight: 'bold', color: 'white' }}>
                                        ₹{tier.price.toLocaleString('en-IN')}
                                    </span>
                                    <span style={{ color: 'var(--text-dim)', marginLeft: '10px', fontSize: '1.1rem' }}>
                                        /person
                                    </span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px', flexGrow: 1 }}>
                                    {tier.features.map((feature) => (
                                        <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <div style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                border: '1px solid rgba(255,255,255,0.3)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                                background: 'rgba(0,0,0,0.3)'
                                            }}>
                                                <Check size={14} color="var(--color-saffron)" />
                                            </div>
                                            <span style={{ fontSize: '1.1rem', color: '#e5e7eb' }}>
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handleBook(tier)}
                                    className="glass-button"
                                    style={{
                                        width: '100%',
                                        height: '56px',
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold',
                                        borderRadius: '12px',
                                        border: '2px solid rgba(255,255,255,0.1)',
                                        background: tier.popular ? 'var(--color-saffron)' : 'rgba(255,255,255,0.1)',
                                        color: tier.popular ? '#000' : 'white',
                                        transition: 'all 0.3s ease',
                                        marginTop: 'auto',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (tier.popular) {
                                            e.currentTarget.style.background = '#ffad4d';
                                        } else {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (tier.popular) {
                                            e.currentTarget.style.background = 'var(--color-saffron)';
                                        } else {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                        }
                                    }}
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div style={{ position: 'absolute', zIndex: -1, top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.2 }}>
                <div style={{ position: 'absolute', top: '100px', left: '40px', fontSize: '4rem', transform: 'rotate(12deg)' }}>✈️</div>
                <div style={{ position: 'absolute', bottom: '150px', right: '40px', fontSize: '4rem', transform: 'rotate(-12deg)' }}>🌴</div>
                <div style={{ position: 'absolute', top: '50%', left: '25%', fontSize: '4rem', transform: 'rotate(45deg)', opacity: 0.5 }}>🏔️</div>
            </div>

            <BookingModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                pkg={selectedPkg} 
            />
        </div>
    );
}
