import { motion } from 'framer-motion';
import { ExternalLink, Mail, Link } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(1, 5, 10, 0.95)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '60px 0 30px',
      position: 'relative',
    }}>
      {/* Top glow line */}
      <div style={{
        position: 'absolute',
        top: '-1px', left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.5), rgba(0,240,255,0.3), transparent)',
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '40px',
          marginBottom: '50px',
        }}>
          {/* Brand */}
          <div style={{ maxWidth: '300px' }}>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.6rem',
              fontWeight: 700,
              letterSpacing: '2px',
              color: '#fff',
              marginBottom: '14px',
            }}>
              SOL<span style={{ color: '#00f0ff' }}>.</span>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              marginBottom: '24px',
            }}>
              Stats-O-Locked — VIT Bhopal's community of data scientists, AI researchers, and ML engineers. Building the future, one model at a time.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { icon: ExternalLink, href: 'https://www.instagram.com/sol_vitb', color: '#e1306c' },
                { icon: Link, href: 'https://www.linkedin.com/company/stats-o-locked-club', color: '#0077b5' },
                { icon: Mail, href: 'mailto:sol@vitbhopal.ac.in', color: '#00f0ff' },
              ].map(({ icon: Icon, href, color }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  style={{
                    width: '40px', height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'all 0.3s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = color;
                    e.currentTarget.style.borderColor = color + '55';
                    e.currentTarget.style.background = color + '18';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
            {[
              {
                title: 'Navigate',
                links: [
                  { label: 'Home', href: '#hero' },
                  { label: 'About', href: '../about.html' },
                  { label: 'Events', href: '../events.html' },
                  { label: 'Research', href: '../research.html' },
                  { label: 'Team', href: '../team.html' },
                ],
              },
              {
                title: 'Connect',
                links: [
                  { label: 'Contact Us', href: '../contact.html' },
                  { label: 'Instagram', href: 'https://www.instagram.com/sol_vitb' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/stats-o-locked-club' },
                  { label: 'Email', href: 'mailto:sol@vitbhopal.ac.in' },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.35)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '18px',
                }}>
                  {col.title}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {col.links.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      whileHover={{ x: 4, color: '#00f0ff' }}
                      style={{
                        color: 'rgba(255,255,255,0.5)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s',
                      }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.82rem' }}>
            © 2026 Stats-O-Locked. All rights reserved.
          </span>
          <span style={{
            color: 'rgba(255,255,255,0.25)',
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}>
            Made with <span style={{ color: '#7c3aed' }}>♥</span> at VIT Bhopal
          </span>
        </div>
      </div>
    </footer>
  );
}
