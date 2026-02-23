import React, { useEffect } from 'react';

const TermsOfService = () => {
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
                    Terms of <span style={{ color: 'var(--color-saffron)' }}>Service</span>
                </h1>
                
                <div style={{ 
                    background: 'rgba(255,255,255,0.02)', 
                    borderRadius: '24px', 
                    padding: '40px', 
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                }}>
                    <p style={{ marginBottom: '40px', fontSize: '1.2rem', color: 'white' }}>
                        By using the Terraroam Holidays website and services, you agree to the following terms:
                    </p>
                    
                    <h3 style={{ fontSize: '1.3rem', color: 'var(--color-saffron)', marginBottom: '10px', fontWeight: '600' }}>A. Booking & Payments</h3>
                    <p style={{ marginBottom: '25px', lineHeight: '1.6' }}>All bookings are subject to availability at the time of confirmation. A specific deposit amount (as mentioned in the quote) is required to initiate a booking. The full balance must be paid before the departure date.</p>

                    <h3 style={{ fontSize: '1.3rem', color: 'var(--color-saffron)', marginBottom: '10px', fontWeight: '600' }}>B. Cancellation & Refunds</h3>
                    <p style={{ marginBottom: '25px', lineHeight: '1.6' }}>Cancellations must be submitted in writing. Refund amounts depend on the timing of the cancellation and the policies of our third-party vendors (hotels, airlines, etc.). Service fees may be non-refundable.</p>

                    <h3 style={{ fontSize: '1.3rem', color: 'var(--color-saffron)', marginBottom: '10px', fontWeight: '600' }}>C. Travel Documents</h3>
                    <p style={{ marginBottom: '25px', lineHeight: '1.6' }}>It is the traveler’s responsibility to ensure they have valid passports, visas, and health insurance required for the destination. Terraroam Holidays is not liable for entry denials.</p>

                    <h3 style={{ fontSize: '1.3rem', color: 'var(--color-saffron)', marginBottom: '10px', fontWeight: '600' }}>D. Limitation of Liability</h3>
                    <p style={{ marginBottom: '25px', lineHeight: '1.6' }}>Terraroam Holidays acts as an intermediary between travelers and service providers (hotels, transport). We are not responsible for delays, accidents, or natural disasters that may occur during the trip.</p>

                    <h3 style={{ fontSize: '1.3rem', color: 'var(--color-saffron)', marginBottom: '10px', fontWeight: '600' }}>E. User Conduct</h3>
                    <p style={{ marginBottom: '10px', lineHeight: '1.6' }}>Users agree not to use the website for any fraudulent or illegal activities.</p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
