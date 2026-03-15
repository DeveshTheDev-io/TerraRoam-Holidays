import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, CheckCircle, Map, Leaf } from 'lucide-react';

const features = [
  {
    icon: <Map size={40} />,
    title: 'Handpicked Premium Experiences',
    description: 'We curate only the most exceptional and unique travel itineraries tailored for unforgettable memories.',
    color: '#ff9933' // Saffron
  },
  {
    icon: <Clock size={40} />,
    title: '24/7 Expert Support',
    description: 'Our dedicated travel concierges are available around the clock to assist you anywhere in the world.',
    color: '#138808' // Emerald
  },
  {
    icon: <CheckCircle size={40} />,
    title: 'Transparent Pricing, No Hidden Fees',
    description: 'What you see is what you pay. We pride ourselves on complete honesty and zero surprise charges.',
    color: '#4a90e2' // Blue
  },
  {
    icon: <ShieldCheck size={40} />,
    title: 'Personalized Itineraries',
    description: 'Your journey, your way. We customize every detail to match your specific interests and pace.',
    color: '#9b59b6' // Purple
  },
  {
    icon: <Leaf size={40} />,
    title: 'Eco-Conscious Travel',
    description: 'We partner with sustainable properties and promote responsible tourism to protect the destinations we love.',
    color: '#2ecc71' // Green
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const WhyChooseUs = () => {
  return (
    <section style={{ padding: '80px 20px', position: 'relative', zIndex: 2, background: 'rgba(10, 10, 15, 0.6)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
        >
            <h2 style={{ fontSize: '3rem', marginBottom: '15px' }}>
                Why <span className="text-gradient">Choose Us</span>
            </h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                Discover the TerraRoam difference. We go above and beyond to ensure your journey is nothing short of extraordinary.
            </p>
        </motion.div>

        <motion.div
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           style={{
             display: 'grid',
             gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
             gap: '30px',
             justifyContent: 'center'
           }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-panel"
              style={{
                padding: '40px 30px',
                textAlign: 'left',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px',
                borderTop: `4px solid ${feature.color}`
              }}
            >
              {/* Background Glow */}
              <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '100px',
                  height: '100px',
                  background: feature.color,
                  filter: 'blur(50px)',
                  opacity: 0.2,
                  zIndex: -1
              }} />
              
              <div style={{ 
                  color: feature.color, 
                  marginBottom: '20px',
                  background: 'rgba(255,255,255,0.05)',
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%'
              }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', color: 'white' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
