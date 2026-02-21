import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Globe } from "lucide-react";
import { TextHoverEffect, FooterBackgroundGradient } from './ui/hover-footer';

const Footer = () => {
  const footerLinks = [
    {
      title: "Explore",
      links: [
        { label: "Destinations", href: "#destinations" },
        { label: "Tour Packages", href: "#packages" },
        { label: "Travel Guides", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "FAQs", href: "#" },
        { label: "Contact Us", href: "#" },
        {
          label: "Live Chat",
          href: "#",
          pulse: true,
        },
      ],
    },
    {
        title: "Company",
        links: [
          { label: "About Us", href: "#" },
          { label: "Privacy Policy", href: "#" },
          { label: "Terms of Service", href: "#" },
        ],
      }
  ];

  const contactInfo = [
    {
      icon: <Mail size={18} style={{ color: "var(--color-saffron)" }} />,
      text: "hello@terraroamholidays.com",
      href: "mailto:hello@terraroamholidays.com",
    },
    {
      icon: <Phone size={18} style={{ color: "var(--color-saffron)" }} />,
      text: "+91 9243061294",
      href: "tel:+919243061294",
    },
    {
      icon: <MapPin size={18} style={{ color: "var(--color-saffron)" }} />,
      text: "Gwalior Madhya Pradesh",
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <Globe size={20} />, label: "Globe", href: "#" },
  ];

  return (
    <footer style={{ 
      background: 'rgba(15, 15, 17, 0.4)', 
      position: 'relative', 
      height: 'fit-content', 
      borderRadius: '24px', 
      overflow: 'hidden', 
      margin: '40px 20px',
      border: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 40px', position: 'relative', zIndex: 40 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '40px', 
          paddingBottom: '50px' 
        }}>
          {/* Brand section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'var(--color-saffron)', fontSize: '2rem', fontWeight: '800' }}>
                &hearts;
              </span>
              <span style={{ color: 'white', fontSize: '1.8rem', fontWeight: 'bold' }}>
                Terra<span style={{ color: 'var(--color-saffron)' }}>Roam</span>
              </span>
            </div>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-dim)' }}>
              Your premium gateway to exploring the incredible diversity, culture, and beauty of India.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '20px' }}>
                {section.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {section.links.map((link) => (
                  <li key={link.label} style={{ position: 'relative' }}>
                    <a
                      href={link.href}
                      style={{ color: 'var(--text-dim)', textDecoration: 'none', transition: 'color 0.3s' }}
                      onMouseEnter={(e) => e.target.style.color = 'var(--color-saffron)'}
                      onMouseLeave={(e) => e.target.style.color = 'var(--text-dim)'}
                    >
                      {link.label}
                    </a>
                    {link.pulse && (
                      <span style={{ 
                        position: 'absolute', 
                        top: '5px', 
                        left: '-15px', 
                        width: '6px', 
                        height: '6px', 
                        borderRadius: '50%', 
                        background: 'var(--color-saffron)',
                        boxShadow: '0 0 8px var(--color-saffron)'
                      }}></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '20px' }}>
              Contact Us
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {contactInfo.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-dim)' }}>
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{ color: 'var(--text-dim)', textDecoration: 'none', transition: 'color 0.3s' }}
                      onMouseEnter={(e) => e.target.style.color = 'var(--color-saffron)'}
                      onMouseLeave={(e) => e.target.style.color = 'var(--text-dim)'}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '30px 0' }} />

        {/* Footer bottom */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', gap: '20px' }}>
          {/* Social icons */}
          <div style={{ display: 'flex', gap: '20px', color: 'rgba(255,255,255,0.4)' }}>
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{ color: 'inherit', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-saffron)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p style={{ color: 'var(--text-dim)', margin: 0 }}>
            &copy; {new Date().getFullYear()} TerraRoam Holidays. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect */}
      <div style={{ display: 'flex', height: '350px', marginTop: '-150px', marginBottom: '-60px', pointerEvents: 'auto', zIndex: 50, position: 'relative' }}>
        <TextHoverEffect text="TERRAROAM HOLIDAYS" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default Footer;
