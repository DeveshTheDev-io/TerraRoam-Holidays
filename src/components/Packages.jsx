import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreativePricing } from './ui/creative-pricing';
import { Sparkles, Map, Mountain, Sunrise } from 'lucide-react';
import FAQ from './FAQ';

const Packages = () => {
  const navigate = useNavigate();

  const tourPackages = [
    {
      name: "Golden Triangle",
      icon: <Map className="w-8 h-8" />,
      price: 39999,
      description: "Delhi, Agra, and Jaipur in 5 days",
      features: [
        "5 Days / 4 Nights",
        "4-Star Accommodation",
        "Professional Guide",
        "Daily Breakfast",
      ],
      colorCode: "#ff9933", // Saffron
    },
    {
      name: "Himalayan Escape",
      icon: <Mountain className="w-8 h-8" />,
      price: 69999,
      description: "Trekking and serenity in Himachal",
      features: [
        "8 Days / 7 Nights",
        "Mountain Resorts",
        "Adventure Activities",
        "All Meals Included",
      ],
      colorCode: "#138808", // Emerald
      popular: true,
    },
    {
      name: "Kerala Backwaters",
      icon: <Sunrise className="w-8 h-8" />,
      price: 49999,
      description: "Houseboats and tropical beaches",
      features: [
        "6 Days / 5 Nights",
        "Luxury Houseboat Stay",
        "Ayurvedic Massage",
        "Airport Transfers",
      ],
      colorCode: "#000080", // Navy
    },
    {
      name: "Royal Rajasthan",
      icon: <Sparkles className="w-8 h-8" />,
      price: 84999,
      description: "Experience life like a Maharaja",
      features: [
        "10 Days / 9 Nights",
        "Heritage Palace Hotels",
        "Desert Safari",
        "Cultural Shows",
      ],
      colorCode: "#dc143c", // Crimson
    }
  ];

  return (
    <>
      <CreativePricing 
        tag="Featured ITINERARIES"
        title="Discover India's Magic"
        description="Handcrafted journeys to the most breathtaking destinations in the subcontinent"
        tiers={tourPackages}
      />
      <div style={{ textAlign: 'center', marginBottom: '80px', position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative' }}>
          <div
              style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  border: '2px solid rgba(255, 153, 51, 0.5)',
                  borderRadius: '16px',
                  boxShadow: '6px 6px 0px 0px rgba(255, 153, 51, 0.5)',
                  zIndex: 0
              }}
          />
          <button 
            onClick={() => navigate('/packages')} 
            className="glass-button" 
            style={{ 
              position: 'relative',
              zIndex: 1,
              padding: '16px 48px', 
              fontSize: '1.2rem',
              fontWeight: 'bold',
              background: 'var(--color-saffron)',
              color: '#000',
              border: '2px solid rgba(0,0,0,0.8)',
              borderRadius: '16px',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffad4d';
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.previousSibling.style.boxShadow = '8px 8px 0px 0px rgba(255, 153, 51, 0.8)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-saffron)';
                e.currentTarget.style.transform = 'translate(0px, 0px)';
                e.currentTarget.previousSibling.style.boxShadow = '6px 6px 0px 0px rgba(255, 153, 51, 0.5)';
            }}
          >
            Explore All Indian Journeys
          </button>
        </div>
      </div>
      <FAQ />
    </>
  );
};

export default Packages;
