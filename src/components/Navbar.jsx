import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/',           label: 'HOME' },
  { to: '/about',      label: 'ABOUT' },
  { to: '/events',     label: 'EVENTS' },
  { to: '/team',       label: 'TEAM' },
  { to: '/research',   label: 'RESEARCH' },
  { to: '/gallery',    label: 'GALLERY' },
  { to: '/contact',    label: 'CONTACT' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        background: scrolled ? 'rgba(2, 11, 22, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(22px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,240,255,0.1)' : '1px solid transparent',
        transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexShrink: 0,
            padding: 0,
          }}
        >
          <motion.img
            src="/logo.webp"
            alt="Stats-O-Locked Logo"
            whileHover={{ scale: 1.05 }}
            style={{
              height: '40px',
              width: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1.5px solid rgba(0,240,255,0.3)',
            }}
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.7rem',
              fontWeight: 700,
              letterSpacing: '2px',
              color: '#fff',
            }}
          >
            SOL<span style={{ color: '#00f0ff' }}>.</span>
          </motion.div>
        </button>

        {/* Desktop Links */}
        <div
          className="hidden md:flex"
          style={{
            display: 'flex',
            gap: '32px',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: isActive ? '#00f0ff' : '#fff',
                textShadow: isActive
                  ? '0 0 14px rgba(0,240,255,0.9)'
                  : '0 0 8px rgba(0,240,255,0.2)',
                transition: 'color 0.3s ease, text-shadow 0.3s ease',
                position: 'relative',
              })}
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        borderRadius: '2px',
                        background: 'linear-gradient(90deg, #00f0ff, #7c3aed)',
                        boxShadow: '0 0 8px rgba(0,240,255,0.6)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          style={{
            background: 'none',
            border: 'none',
            color: '#00f0ff',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'absolute',
                top: '70px',
                left: 0,
                right: 0,
                background: 'rgba(2,11,22,0.97)',
                backdropFilter: 'blur(24px)',
                borderBottom: '1px solid rgba(0,240,255,0.1)',
                padding: '16px 40px 24px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setMobileOpen(false)}
                  style={({ isActive }) => ({
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: isActive ? '#00f0ff' : 'rgba(255,255,255,0.8)',
                    padding: '14px 0',
                    transition: 'color 0.2s',
                  })}
                >
                  {label}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
