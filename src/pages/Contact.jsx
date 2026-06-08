import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink, Link2, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: 'solclub@vitbhopal.ac.in',
    sub: 'We reply within 24 hrs',
    href: 'mailto:solclub@vitbhopal.ac.in',
    accent: '#00f0ff',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 99939 45259',
    sub: 'Mon – Sat, 10 am – 6 pm',
    href: 'tel:+919993945259',
    accent: '#7c3aed',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'VIT Bhopal University',
    sub: 'Sehore, Madhya Pradesh',
    href: 'https://maps.google.com/?q=VIT+Bhopal+University',
    accent: '#10b981',
  },
];

const socials = [
  {
    icon: ExternalLink,
    label: 'Instagram',
    handle: '@sol_vitb',
    href: 'https://www.instagram.com/sol_vitb?igsh=eTQ1dGdjNTZldWhj',
    accent: '#e1306c',
    bg: 'rgba(225,48,108,0.08)',
  },
  {
    icon: Link2,
    label: 'LinkedIn',
    handle: 'Stats-O-Locked Club',
    href: 'https://www.linkedin.com/company/stats-o-locked-club/',
    accent: '#0077b5',
    bg: 'rgba(0,119,181,0.08)',
  },
];

function ContactCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;
  return (
    <motion.a
      href={item.href}
      target={item.label === 'Location' ? '_blank' : '_self'}
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 18,
        padding: '18px 22px', borderRadius: 18,
        background: hovered ? `${item.accent}0e` : 'rgba(255,255,255,0.02)',
        border: hovered ? `1px solid ${item.accent}55` : '1px solid rgba(255,255,255,0.07)',
        textDecoration: 'none', position: 'relative', overflow: 'hidden',
        transition: 'background 0.3s, border-color 0.3s',
        cursor: 'pointer',
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 14, flexShrink: 0,
        background: `${item.accent}14`,
        border: `1px solid ${item.accent}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform 0.25s',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
      }}>
        <Icon size={20} color={item.accent} />
      </div>
      <div style={{ flex: 1 }}>
        <span style={{
          display: 'block', fontSize: '0.7rem', fontWeight: 600,
          color: `${item.accent}99`, fontFamily: "'Space Grotesk',sans-serif",
          letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 2,
        }}>{item.label}</span>
        <span style={{
          display: 'block', fontSize: '0.92rem', fontWeight: 600,
          color: hovered ? '#fff' : 'rgba(255,255,255,0.85)',
          fontFamily: "'Space Grotesk',sans-serif", transition: 'color 0.2s',
        }}>{item.value}</span>
        <span style={{
          display: 'block', fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.3)', fontFamily: "'Inter',sans-serif",
          marginTop: 2,
        }}>{item.sub}</span>
      </div>
      <ArrowRight size={14} color={`${item.accent}66`}
        style={{ flexShrink: 0, opacity: hovered ? 1 : 0, transition: 'opacity 0.2s' }} />
      {/* left glow bar */}
      <div style={{
        position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 3,
        borderRadius: 2, background: item.accent,
        opacity: hovered ? 0.8 : 0, transition: 'opacity 0.3s',
      }} />
    </motion.a>
  );
}

/* ── Form ─────────────────────────────────────────────── */
function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [focused, setFocused] = useState(null);
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await addDoc(collection(db, 'contact_submissions'), {
        ...values,
        submittedAt: serverTimestamp(),
      });
      setSent(true);
    } catch (err) {
      setError('Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%', boxSizing: 'border-box',
    background: focused === field ? 'rgba(0,240,255,0.04)' : 'rgba(255,255,255,0.02)',
    border: 'none',
    borderBottom: `1.5px solid ${focused === field ? '#00f0ff' : 'rgba(255,255,255,0.12)'}`,
    borderRadius: 0,
    padding: '13px 4px',
    color: '#fff',
    fontFamily: "'Inter',sans-serif", fontSize: '0.9rem',
    outline: 'none',
    transition: 'background 0.3s, border-color 0.3s',
    resize: 'none',
  });

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', height: '100%', minHeight: 320, textAlign: 'center', gap: 20 }}
      >
        <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.6 }}>
          <CheckCircle2 size={56} color="#00f0ff" strokeWidth={1.5} />
        </motion.div>
        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.4rem',
          fontWeight: 700, color: '#fff' }}>Message Sent!</h3>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Inter',sans-serif",
          fontSize: '0.9rem', maxWidth: 280, lineHeight: 1.7 }}>
          We've received your message and will get back to you within 24 hours.
        </p>
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={() => { setSent(false); setValues({ name:'',email:'',subject:'',message:'' }); }}
          style={{ marginTop: 8, padding: '10px 28px', borderRadius: 50,
            background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.3)',
            color: '#00f0ff', fontFamily: "'Space Grotesk',sans-serif",
            fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px',
            cursor: 'pointer', transition: 'background 0.2s' }}
        >
          SEND ANOTHER
        </motion.button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* row: name + email */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        {[
          { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Ankit Sharma' },
          { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@email.com' },
        ].map(({ id, label, type, placeholder }) => (
          <div key={id}>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600,
              color: focused === id ? '#00f0ff' : 'rgba(255,255,255,0.35)',
              fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1.5px',
              textTransform: 'uppercase', marginBottom: 8,
              transition: 'color 0.2s' }}>
              {label}
            </label>
            <input type={type} required placeholder={placeholder}
              value={values[id]}
              onChange={e => setValues(v => ({ ...v, [id]: e.target.value }))}
              onFocus={() => setFocused(id)}
              onBlur={() => setFocused(null)}
              style={inputStyle(id)} />
          </div>
        ))}
      </div>

      {/* subject */}
      <div>
        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600,
          color: focused === 'subject' ? '#00f0ff' : 'rgba(255,255,255,0.35)',
          fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1.5px',
          textTransform: 'uppercase', marginBottom: 8, transition: 'color 0.2s' }}>
          Subject
        </label>
        <input type="text" placeholder="Collaboration / Sponsorship / General Query"
          value={values.subject}
          onChange={e => setValues(v => ({ ...v, subject: e.target.value }))}
          onFocus={() => setFocused('subject')}
          onBlur={() => setFocused(null)}
          style={inputStyle('subject')} />
      </div>

      {/* message */}
      <div>
        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600,
          color: focused === 'message' ? '#00f0ff' : 'rgba(255,255,255,0.35)',
          fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1.5px',
          textTransform: 'uppercase', marginBottom: 8, transition: 'color 0.2s' }}>
          Message
        </label>
        <textarea rows={5} required placeholder="Tell us what's on your mind..."
          value={values.message}
          onChange={e => setValues(v => ({ ...v, message: e.target.value }))}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused(null)}
          style={{ ...inputStyle('message'), display: 'block' }} />
      </div>

      {error && (
        <p style={{ color: '#f87171', fontSize: '0.8rem', fontFamily: "'Inter',sans-serif",
          marginBottom: 4 }}>{error}</p>
      )}

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={loading ? {} : { scale: 1.02, boxShadow: '0 0 40px rgba(0,240,255,0.35)' }}
        whileTap={loading ? {} : { scale: 0.98 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          padding: '15px 32px', borderRadius: 14, border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          background: loading ? 'rgba(124,58,237,0.4)' : 'linear-gradient(135deg,#7c3aed,#00f0ff)',
          color: '#020b16', fontFamily: "'Space Grotesk',sans-serif",
          fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px',
          textTransform: 'uppercase',
          boxShadow: '0 0 24px rgba(124,58,237,0.3)',
          transition: 'background 0.3s, box-shadow 0.3s' }}
      >
        <Send size={16} />
        {loading ? 'SENDING...' : 'TRANSMIT MESSAGE'}
      </motion.button>
    </form>
  );
}

/* ── Page ─────────────────────────────────────────────── */
export default function Contact() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 0 80px', position: 'relative', overflow: 'hidden' }}>

      {/* Background glows */}
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '50vw', height: '50vw',
        borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,0.07) 0%,transparent 60%)',
        pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '40vw', height: '40vw',
        borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,240,255,0.06) 0%,transparent 60%)',
        pointerEvents: 'none' }} />
      {/* Faint grid */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 32px' }}>

        {/* ── Hero heading ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <span style={{
            display: 'inline-block', padding: '5px 18px', borderRadius: 100,
            background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.25)',
            color: '#00f0ff', fontSize: '0.75rem', fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 24,
          }}>
            Get In Touch
          </span>
          <h1 style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 'clamp(2.6rem, 6vw, 4.8rem)',
            fontWeight: 800, lineHeight: 1.05, letterSpacing: '-1px',
            marginBottom: 20,
          }}>
            <span style={{ color: '#fff' }}>Let's </span>
            <span style={{
              background: 'linear-gradient(135deg,#00f0ff,#7c3aed)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Connect</span>
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.45)', fontSize: '1rem', maxWidth: 520,
            margin: '0 auto', lineHeight: 1.75, fontFamily: "'Inter',sans-serif",
          }}>
            Whether you want to collaborate, sponsor an event, or just say hello — we'd love to hear from you.
          </p>

          {/* Status pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
            marginTop: 24, padding: '6px 16px', borderRadius: 100,
            background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981',
              boxShadow: '0 0 8px #10b981', display: 'inline-block',
              animation: 'pulse 1.8s ease-in-out infinite' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#10b981',
              fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1.5px',
              textTransform: 'uppercase' }}>
              Currently Active
            </span>
          </div>
        </motion.div>

        {/* ── Two-column content ───────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'clamp(280px, 38%, 440px) 1fr', gap: 32, alignItems: 'start' }}>

          {/* Left panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Contact cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 8 }}>
              {contactItems.map((item, i) => (
                <ContactCard key={item.label} item={item} index={i} />
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
            >
              <p style={{ fontSize: '0.68rem', fontWeight: 600, color: 'rgba(255,255,255,0.3)',
                fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '2px',
                textTransform: 'uppercase', marginBottom: 14 }}>
                Follow Our Journey
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      style={{ display: 'flex', alignItems: 'center', gap: 14,
                        padding: '13px 18px', borderRadius: 14,
                        background: s.bg, border: `1px solid ${s.accent}22`,
                        textDecoration: 'none', transition: 'border-color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = `${s.accent}55`}
                      onMouseLeave={e => e.currentTarget.style.borderColor = `${s.accent}22`}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: 10,
                        background: `${s.accent}14`, border: `1px solid ${s.accent}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={17} color={s.accent} />
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600,
                          color: '#fff', fontFamily: "'Space Grotesk',sans-serif" }}>{s.label}</span>
                        <span style={{ display: 'block', fontSize: '0.7rem',
                          color: `${s.accent}99`, fontFamily: "'Inter',sans-serif" }}>{s.handle}</span>
                      </div>
                      <ArrowRight size={13} color={`${s.accent}66`} style={{ marginLeft: 'auto' }} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right panel — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            style={{ background: 'rgba(255,255,255,0.015)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 28, padding: '44px 44px 40px',
              position: 'relative', overflow: 'hidden' }}
          >
            {/* Top accent line */}
            <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
              background: 'linear-gradient(90deg,transparent,#7c3aed,transparent)' }} />
            {/* Corner glow */}
            <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200,
              borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,0.12) 0%,transparent 70%)',
              pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
                <div style={{ width: 40, height: 40, borderRadius: 11,
                  background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Send size={17} color="#7c3aed" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.15rem',
                    fontWeight: 700, color: '#fff', letterSpacing: '1px' }}>Send a Message</h3>
                  <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)',
                    fontFamily: "'Inter',sans-serif", marginTop: 2 }}>We'll respond within 24 hours</p>
                </div>
              </div>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
