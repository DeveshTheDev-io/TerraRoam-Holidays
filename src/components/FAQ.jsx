import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    question: "What is TerraRoam Holidays?",
    answer: "TerraRoam Holidays is your premium gateway to exploring the incredible diversity, culture, and beauty of India and destinations around the globe. We specialize in curating luxury, immersive travel experiences."
  },
  {
    question: "How do I book a tour package?",
    answer: "Simply browse our 'Tour Packages' or 'Destinations' sections, select the package that interests you, and click 'Book Now'. You'll be prompted to provide your travel dates and number of guests to submit a booking request."
  },
  {
    question: "Are flights included in the tour packages?",
    answer: "Our standard packages typically include luxury accommodations, domestic transfers, guided tours, and selected meals. International or domestic flights to the starting destination are usually booked separately, but our concierge team can assist you upon request."
  },
  {
    question: "Can I customize a travel itinerary?",
    answer: "Absolutely! While we offer expertly crafted pre-designed itineraries, we specialize in bespoke travel. When booking, use the 'Special Requests' field to mention your customization needs, or contact our support team directly."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellations made 30 days prior to departure receive a full refund minus a small processing fee. Cancellations within 15-29 days receive a 50% refund, while cancellations within 14 days are non-refundable. Please review specific package terms during booking."
  },
  {
    question: "Do you provide English-speaking guides?",
    answer: "Yes, all our guided tours include certified, fluent English-speaking local experts who possess deep knowledge of the region's history, culture, and hidden gems."
  },
  {
    question: "Is travel insurance required?",
    answer: "While not strictly mandatory, we highly recommend purchasing comprehensive travel insurance that covers trip cancellations, medical emergencies, and lost baggage to ensure peace of mind during your journey."
  },
  {
    question: "What are the payment methods accepted?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), bank wire transfers, and popular secure online payment gateways. Once your booking request is approved by our Admin, you will receive a secure payment link."
  },
  {
    question: "How do I check the status of my booking?",
    answer: "If you have created an account with us, you can log in to view your current bookings and their status (Pending, Confirmed, etc.). You will also receive email notifications whenever your booking status changes."
  },
  {
    question: "Who do I contact in case of an emergency during my trip?",
    answer: "We provide 24/7 on-ground support for all our travelers. Upon confirmation of your booking, you will receive an exclusive emergency contact number for your dedicated concierge who will assist you immediately."
  }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span style={{ 
                        display: 'inline-block', 
                        padding: '8px 16px', 
                        borderRadius: '20px', 
                        background: 'rgba(255, 153, 51, 0.1)', 
                        color: 'var(--color-saffron)',
                        fontWeight: '600',
                        marginBottom: '16px',
                        letterSpacing: '1px',
                        fontSize: '0.9rem'
                    }}>
                        FREQUENTLY ASKED QUESTIONS
                    </span>
                    <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>
                        Everything You Need to <span className="text-gradient">Know</span>
                    </h2>
                    <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Find answers to the most common questions about our premium travel services, booking processes, and policies.
                    </p>
                </motion.div>
            </div>

            {/* Accordion List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {faqData.map((faq, index) => {
                    const isActive = activeIndex === index;
                    return (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-panel"
                            style={{ 
                                padding: '0', 
                                overflow: 'hidden',
                                border: isActive ? '1px solid rgba(255,153,51,0.3)' : '1px solid rgba(255,255,255,0.1)',
                                background: isActive ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '24px',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    fontFamily: 'inherit'
                                }}
                            >
                                <span style={{ paddingRight: '20px', color: isActive ? 'var(--color-saffron)' : 'white', transition: 'color 0.3s' }}>
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: isActive ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown 
                                        size={20} 
                                        color={isActive ? "var(--color-saffron)" : "var(--text-dim)"} 
                                    />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div style={{ 
                                            padding: '0 24px 24px', 
                                            color: 'var(--text-dim)', 
                                            lineHeight: '1.6',
                                            fontSize: '1rem' 
                                        }}>
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default FAQ;
