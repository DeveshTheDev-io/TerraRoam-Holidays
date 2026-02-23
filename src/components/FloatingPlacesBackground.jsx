import React, { useEffect, useState } from 'react';

const places = [
  "Taj Mahal", "Jaipur", "Kerala Backwaters", "Varanasi", 
  "Ladakh", "Goa Beaches", "Hampi", "Rishikesh", 
  "Udaipur", "Darjeeling", "Andaman", "Mysore Palace", 
  "Khajuraho", "Meenakshi Temple", "Valley of Flowers", 
  "Sundarbans", "Rann of Kutch", "Ajanta & Ellora", 
  "Golden Temple", "Munnar", "Spiti Valley", "Jaisalmer", 
  "Sikkim", "Ooty", "Kodaikanal", "Coorg", "Pondicherry", 
  "Mahabaleshwar", "Gokarna", "Dalhousie"
];

const FloatingPlacesBackground = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Generate randomized elements on mount to prevent hydration mismatch and ensure variety
    const newElements = places.map((place, i) => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const animationDuration = 30 + Math.random() * 50; // Between 30s and 80s
      const animationDelay = -Math.random() * 50; // Stagger start times
      const fontSize = 1 + Math.random() * 2; // Between 1rem and 3rem
      const opacity = 0.8 + Math.random() * 0.2; // At least 80% opacity (0.8 to 1.0)
      const isReverse = Math.random() > 0.5;

      return {
        id: i,
        text: place,
        style: {
          top: `${top}%`,
          left: `${left}%`,
          fontSize: `${fontSize}rem`,
          opacity,
          animationDuration: `${animationDuration}s`,
          animationDelay: `${animationDelay}s`,
          animationDirection: isReverse ? 'reverse' : 'normal',
        }
      };
    });
    setElements(newElements);
  }, []);

  return (
    <div className="floating-places-container" style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0, // Behind the content, but inside the relative container
    }}>
      {elements.map(el => (
        <span 
          key={el.id} 
          className="floating-place-text"
          style={el.style}
        >
          {el.text}
        </span>
      ))}
    </div>
  );
};

export default FloatingPlacesBackground;
