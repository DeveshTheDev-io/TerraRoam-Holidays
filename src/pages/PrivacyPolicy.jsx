import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ 
            paddingTop: '120px', 
            minHeight: '100vh', 
            paddingBottom: '80px', 
            background: 'var(--bg-dark)',
            color: 'var(--text-dim)'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
                <h1 style={{ 
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                    fontWeight: '800', 
                    marginBottom: '40px', 
                    color: 'white',
                    fontFamily: '"Outfit", sans-serif'
                }}>
                    Privacy <span style={{ color: 'var(--color-saffron)' }}>Policy</span>
                </h1>
                
                <div style={{ 
                    background: 'rgba(255,255,255,0.02)', 
                    borderRadius: '24px', 
                    padding: '40px', 
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                }}>
                    <p style={{ marginBottom: '40px', fontSize: '1.2rem', color: 'white' }}>
                        At Terraroam Holidays, we value your privacy. This policy outlines how we collect, use, and protect your information.
                    </p>
                    
                    <h3 style={{ fontSize: '1.3rem', color: 'var(--color-saffron)', marginBottom: '10px', fontWeight: '600' }}>Information Collection</h3>
                    <p style={{ marginBottom: '25px', lineHeight: '1.6' }}>We collect personal details (name, email, phone number, passport details) only when you book a tour or inquiry through our website.</p>

                    <h3 style={{ fontSize: '1.3rem', color: 'var(--color-saffron)', marginBottom: '10px', fontWeight: '600' }}>Use of Data</h3>
                    <p style={{ marginBottom: '25px', lineHeight: '1.6' }}>Your data is used to process bookings, provide customer support, and send personalized travel offers via email or SMS.</p>

                    <h3 style={{ fontSize: '1.3rem', color: 'var(--color-saffron)', marginBottom: '10px', fontWeight: '600' }}>AI & Personalization</h3>
                    <p style={{ marginBottom: '25px', lineHeight: '1.6' }}>We may use AI tools to analyze travel preferences to provide better recommendations, but this data is kept secure and is not sold to third parties.</p>

                    <h3 style={{ fontSize: '1.3rem', color: 'var(--color-saffron)', marginBottom: '10px', fontWeight: '600' }}>Data Security</h3>
                    <p style={{ marginBottom: '25px', lineHeight: '1.6' }}>We implement industry-standard security measures to protect your personal information from unauthorized access.</p>

                    <h3 style={{ fontSize: '1.3rem', color: 'var(--color-saffron)', marginBottom: '10px', fontWeight: '600' }}>Cookies</h3>
                    <p style={{ marginBottom: '10px', lineHeight: '1.6' }}>Our website uses cookies to enhance your browsing experience and analyze website traffic for digital marketing purposes.</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
