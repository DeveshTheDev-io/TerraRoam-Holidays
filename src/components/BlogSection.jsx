import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const defaultBlogs = [
  {
    id: 1,
    title: 'The Hidden Magic of Kerala Backwaters',
    content: 'Discover the tranquil beauty of Kerala. Sail through a maze of intertwining canals, serene lakes, and lagoons while enjoying the lush greenery.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    date: 'March 15, 2026'
  },
  {
    id: 2,
    title: 'A Culinary Journey Through Rajasthan',
    content: 'Experience the rich spices and flavors of the royal state. From Dal Baati Churma to Laal Maas, Rajasthan offers a vibrant taste profile that thrills every palate.',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
    date: 'March 10, 2026'
  },
  {
    id: 3,
    title: 'Top 5 Himalayan Trekking Routes',
    content: 'Prepare yourself for breathtaking trails, majestic snow peaks, and a peaceful escape into the spiritual heart of the great Himalayan mountain range.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d99903b7?auto=format&fit=crop&w=800&q=80',
    date: 'March 05, 2026'
  }
];

const BlogSection = () => {
    const { normalizedBlogs } = useAppContext();
    const displayBlogs = normalizedBlogs && normalizedBlogs.length > 0 ? normalizedBlogs : defaultBlogs;

    return (
        <section id="blog" style={{ padding: '80px 20px', position: 'relative', zIndex: 10 }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: '60px' }}
                >
                    <h2 style={{ fontSize: '3.5rem', marginBottom: '15px' }}>Our <span className="text-gradient">Blog</span></h2>
                    <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Travel stories, destination guides, and exclusive tips to inspire your next great adventure.
                    </p>
                </motion.div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                    gap: '40px' 
                }}>
                    {displayBlogs.map((blog, idx) => (
                        <motion.div 
                            key={blog.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: Math.min(idx * 0.2, 0.6) }}
                            className="glass-panel"
                            style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                overflow: 'hidden',
                                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
                        >
                            <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                                <img 
                                    src={blog.image} 
                                    alt={blog.title} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                                    onMouseEnter={(e) => { e.target.style.transform = 'scale(1.1)' }}
                                    onMouseLeave={(e) => { e.target.style.transform = 'scale(1)' }}
                                />
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(10,10,15,0.8))', pointerEvents: 'none' }} />
                            </div>
                            <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flexGrow: 1, background: 'rgba(255,255,255,0.02)' }}>
                                {blog.date && <div style={{ color: 'var(--color-saffron)', fontSize: '0.85rem', marginBottom: '12px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>{blog.date}</div>}
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', lineHeight: '1.4' }}>{blog.title}</h3>
                                <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '25px', flexGrow: 1 }}>
                                    {blog.content?.length > 130 ? blog.content.substring(0, 130) + '...' : blog.content}
                                </p>
                                <button className="glass-button" style={{ alignSelf: 'flex-start', padding: '10px 24px', fontSize: '0.9rem' }}>Read More</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
