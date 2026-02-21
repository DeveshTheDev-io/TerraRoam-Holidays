import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, MessageSquare, X, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const BookingModal = ({ isOpen, onClose, pkg }) => {
    const { createBooking } = useAppContext();
    const [travelers, setTravelers] = useState(1);
    const [date, setDate] = useState('');
    const [requests, setRequests] = useState('');
    const [status, setStatus] = useState('idle'); // idle -> submitting -> success -> error

    if (!isOpen || !pkg) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        
        const details = {
            travelers,
            date,
            requests
        };

        const success = await createBooking(pkg, details);
        
        if (success) {
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                onClose();
            }, 2500);
        } else {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

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
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(8px)'
                }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="glass-panel"
                        style={{
                            width: '100%',
                            maxWidth: '500px',
                            background: 'rgba(15, 15, 20, 0.95)',
                            padding: '30px',
                            borderRadius: '24px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            position: 'relative'
                        }}
                    >
                        {/* Close Button */}
                        <button 
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-dim)',
                                cursor: 'pointer',
                                padding: '5px'
                            }}
                        >
                            <X size={24} />
                        </button>

                        {status === 'success' ? (
                            <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                style={{ textAlign: 'center', padding: '40px 0' }}
                            >
                                <CheckCircle size={64} color="var(--color-emerald)" style={{ margin: '0 auto 20px' }} />
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Booking Requested!</h3>
                                <p style={{ color: 'var(--text-dim)' }}>
                                    Your request for the {pkg.title || pkg.name} has been sent to our travel experts. We will contact you shortly to confirm details.
                                </p>
                            </motion.div>
                        ) : (
                            <>
                                <div style={{ marginBottom: '25px' }}>
                                    <span style={{ color: 'var(--color-saffron)', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        Complete Reservation
                                    </span>
                                    <h2 style={{ fontSize: '2rem', marginTop: '5px', marginBottom: '10px' }}>
                                        {pkg.title || pkg.name}
                                    </h2>
                                    <p style={{ color: 'var(--text-dim)' }}>
                                        Provide your travel preferences below to request this itinerary.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    
                                    {/* Date Input */}
                                    <div>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-light)', marginBottom: '8px', fontSize: '0.9rem' }}>
                                            <Calendar size={16} color="var(--color-saffron)" />
                                            Target Travel Date
                                        </label>
                                        <input 
                                            type="date" 
                                            required
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '12px 15px',
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '12px',
                                                color: 'white',
                                                fontFamily: 'inherit',
                                                outline: 'none',
                                                colorScheme: 'dark'
                                            }}
                                        />
                                    </div>

                                    {/* Travelers Input */}
                                    <div>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-light)', marginBottom: '8px', fontSize: '0.9rem' }}>
                                            <Users size={16} color="var(--color-saffron)" />
                                            Number of Travelers
                                        </label>
                                        <input 
                                            type="number" 
                                            min="1"
                                            required
                                            value={travelers}
                                            onChange={(e) => setTravelers(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '12px 15px',
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '12px',
                                                color: 'white',
                                                fontFamily: 'inherit',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>

                                    {/* Requests Input */}
                                    <div>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-light)', marginBottom: '8px', fontSize: '0.9rem' }}>
                                            <MessageSquare size={16} color="var(--color-saffron)" />
                                            Special Requests (Optional)
                                        </label>
                                        <textarea 
                                            rows="3"
                                            placeholder="Accommodation preferences, dietary requirements, or custom additions..."
                                            value={requests}
                                            onChange={(e) => setRequests(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '12px 15px',
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '12px',
                                                color: 'white',
                                                fontFamily: 'inherit',
                                                outline: 'none',
                                                resize: 'none'
                                            }}
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <p style={{ color: '#ff6b6b', fontSize: '0.9rem', textAlign: 'center' }}>
                                            Please log in to book, or an error occurred storing your request.
                                        </p>
                                    )}

                                    <button 
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        style={{
                                            width: '100%',
                                            padding: '16px',
                                            background: 'var(--color-saffron)',
                                            color: '#000',
                                            border: 'none',
                                            borderRadius: '12px',
                                            fontSize: '1.1rem',
                                            fontWeight: 'bold',
                                            cursor: status === 'submitting' ? 'wait' : 'pointer',
                                            marginTop: '10px',
                                            boxShadow: '0 4px 15px rgba(255,153,51,0.3)',
                                            transition: 'transform 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                                    >
                                        {status === 'submitting' ? 'Processing...' : 'Submit Booking Request'}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;
