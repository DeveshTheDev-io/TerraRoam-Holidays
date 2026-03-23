import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, User, Mail, MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CallbackPopup = ({ isOpen, onClose }) => {
  const { createCallbackRequest } = useAppContext();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', query: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Add simple validation
    if (!formData.name || !formData.phone) {
        setStatus('error');
        return;
    }

    const success = await createCallbackRequest(formData);
    
    if (success) {
      setStatus('success');
      setTimeout(() => {
        onClose();
        setFormData({ name: '', phone: '', email: '', query: '' });
        setStatus('idle');
      }, 3000);
    } else {
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(5px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '90%',
                maxWidth: '450px',
                position: 'relative',
              }}
              className="glass-panel"
            >
            <div style={{ position: 'relative', padding: '30px' }}>
              <button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: 'white',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
              >
                <X size={18} />
              </button>

              <h2 style={{ fontSize: '1.8rem', marginBottom: '10px', marginTop: 0 }}>
                Request a <span className="text-gradient">Callback</span>
              </h2>
              <p style={{ color: 'var(--text-dim)', marginBottom: '25px', fontSize: '0.95rem' }}>
                Leave your details below and our travel experts will get back to you shortly to plan your dream vacation.
              </p>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: 'rgba(19, 136, 8, 0.1)',
                    border: '1px solid rgba(19, 136, 8, 0.3)',
                    padding: '20px',
                    borderRadius: '12px',
                    textAlign: 'center',
                    color: 'white'
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '10px' }}>✨</div>
                  <h3 style={{ margin: '0 0 10px 0', color: 'var(--color-emerald)' }}>Request Received!</h3>
                  <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: '0.9rem' }}>We'll be in touch with you very soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', top: '14px', left: '14px', color: 'var(--text-dim)' }} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 12px 12px 42px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: 'white',
                        outline: 'none',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-saffron)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>

                  <div style={{ position: 'relative' }}>
                    <Phone size={18} style={{ position: 'absolute', top: '14px', left: '14px', color: 'var(--text-dim)' }} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 12px 12px 42px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: 'white',
                        outline: 'none',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-saffron)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>

                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', top: '14px', left: '14px', color: 'var(--text-dim)' }} />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address (Optional)"
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 12px 12px 42px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: 'white',
                        outline: 'none',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-saffron)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>

                  <div style={{ position: 'relative' }}>
                    <MessageSquare size={18} style={{ position: 'absolute', top: '14px', left: '14px', color: 'var(--text-dim)' }} />
                    <textarea
                      name="query"
                      placeholder="Where do you want to travel? What are you looking for?"
                      value={formData.query}
                      onChange={handleChange}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '12px 12px 12px 42px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: 'white',
                        resize: 'none',
                        outline: 'none',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-saffron)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>

                  {status === 'error' && (
                    <p style={{ color: '#ff6b6b', fontSize: '0.85rem', margin: 0 }}>
                      An error occurred. Please try again or check your connection.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'linear-gradient(45deg, var(--color-saffron), #ff7e5f)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                      marginTop: '10px',
                      opacity: status === 'submitting' ? 0.7 : 1,
                      transition: 'opacity 0.3s ease, transform 0.2s ease',
                      boxShadow: '0 4px 15px rgba(255, 153, 51, 0.3)',
                    }}
                    onMouseOver={(e) => { if(status !== 'submitting') e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {status === 'submitting' ? 'Sending Request...' : 'Request Callback'}
                  </button>
                </form>
              )}
            </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CallbackPopup;
