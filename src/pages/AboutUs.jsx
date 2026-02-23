import React, { useEffect } from 'react';

const AboutUs = () => {
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
                    About <span style={{ color: 'var(--color-saffron)' }}>Us</span>
                </h1>
                
                <div style={{ 
                    background: 'rgba(255,255,255,0.02)', 
                    borderRadius: '24px', 
                    padding: '40px', 
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                }}>
                    <h2 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '24px', fontWeight: 'bold' }}>
                        Your Journey, Our Passion
                    </h2>
                    
                    <p style={{ marginBottom: '24px', fontSize: '1.1rem', lineHeight: '1.8' }}>
                        The story of Terraroam Holidays started with a simple dream: to make world-class travel accessible and meaningful. At 28, after years of studying the nuances of the tourism industry and mastering the digital landscape, I realized that travelers today want more than just "packages"—they want memories.
                    </p>
                    
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                        We don't just book tickets; we curate experiences. By blending our professional expertise in tourism with the latest digital tools, we ensure that your holiday is as unique as you are. At Terraroam, we treat every trip as if it were our own, ensuring every detail is perfect so you can simply focus on the joy of discovery.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
