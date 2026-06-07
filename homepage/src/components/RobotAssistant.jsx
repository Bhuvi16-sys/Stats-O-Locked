import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Section scroll map ─────────────────────────────────────── */
// keyword → section id (null = scroll to top)
const SCROLL_MAP = [
  { keys: ['about us', 'about', 'who are you', 'who we are', 'what is sol'], id: '#about-us' },
  { keys: ['events', 'event', 'workshop', 'hackathon', 'upcoming'], id: '#events' },
  { keys: ['domains', 'core domains', 'pillars', 'innovation', 'leadership', 'tech excellence', 'community'], id: '#domains' },
  { keys: ['features', 'why join', 'why', 'join', 'benefits'], id: '#features' },
  { keys: ['stats', 'statistics', 'impact', 'numbers', 'achievements'], id: '#stats' },
  { keys: ['team', 'members', 'people', 'crew', 'founders'], id: '#team' },
  { keys: ['testimonials', 'reviews', 'feedback', 'what they say'], id: '#testimonials' },
  { keys: ['contact', 'reach', 'email', 'connect'], id: '#contact' },
  { keys: ['home', 'top', 'back', 'start'], id: null },
];

const RESPONSES = {
  '#about-us': "📖 Scrolling to About Us — let me tell you our story!",
  '#events': "🗓️ Heading to Events — don't miss our workshops!",
  '#domains': "🔬 Taking you to Our Core Domains section!",
  '#features': "⚡ Let me show you why you should join SOL!",
  '#stats': "📊 Check out our impact statistics!",
  '#team': "👥 Meet the brilliant minds of Stats-O-Locked!",
  '#testimonials': "💬 See what our members are saying!",
  '#contact': "📬 Heading to Contact Us!",
  null: "🏠 Back to the top!",
  unknown: "🤔 Try: 'about us', 'events', 'team', 'contact'…",
};

function typeText(setText, text) {
  setText('');
  let i = 0;
  const interval = setInterval(() => {
    i++;
    setText(text.slice(0, i));
    if (i >= text.length) clearInterval(interval);
  }, 22);
  return () => clearInterval(interval);
}

/* ── Component ──────────────────────────────────────────────── */
export default function RobotAssistant() {
  const [botText, setBotText] = useState("👋 Hey! I'm Statsy. Type a section name to navigate!");
  const [userInput, setUserInput] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [flash, setFlash] = useState(false);
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const query = userInput.trim().toLowerCase();
    setUserInput('');
    if (!query) return;

    // Find first keyword match
    let match = SCROLL_MAP.find(({ keys }) => keys.some((k) => query.includes(k)));
    let sectionId = match ? match.id : 'unknown';

    // Typewriter response
    typeText(setBotText, RESPONSES[sectionId] ?? RESPONSES.unknown);

    // Flash effect
    setFlash(true);
    setTimeout(() => setFlash(false), 400);

    // Scroll after a short delay so user sees response start
    if (sectionId !== 'unknown') {
      setTimeout(() => {
        if (sectionId === null) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.querySelector(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 450);
    }
  }

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'default',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Speech Bubble ── */}
      <motion.div
        animate={{ boxShadow: flash ? '0 0 24px #00f0ff' : '0 0 10px rgba(0,240,255,0.4)' }}
        transition={{ duration: 0.3 }}
        style={{
          width: '230px',
          background: '#0B132B',
          border: '1px solid #00f0ff',
          borderRadius: '16px',
          padding: '14px',
          marginBottom: '24px',
          position: 'relative',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Bot message */}
        <div
          style={{
            fontSize: '0.8rem',
            color: '#e0e7ff',
            lineHeight: 1.55,
            minHeight: '52px',
            marginBottom: '10px',
          }}
        >
          {botText}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            style={{ color: '#00f0ff', fontWeight: 700 }}
          >
            |
          </motion.span>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(0,240,255,0.2)', marginBottom: '10px' }} />

        {/* Input row */}
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', gap: '6px', alignItems: 'center' }}
        >
          <input
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="e.g. 'about us'…"
            style={{
              flex: 1,
              background: 'rgba(0,240,255,0.06)',
              border: '1px solid rgba(0,240,255,0.25)',
              borderRadius: '8px',
              padding: '5px 8px',
              color: '#e0e7ff',
              fontSize: '0.75rem',
              fontFamily: "'Inter', sans-serif",
              outline: 'none',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#00f0ff')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(0,240,255,0.25)')}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.15, boxShadow: '0 0 12px #00f0ff' }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'rgba(0,240,255,0.15)',
              border: '1px solid rgba(0,240,255,0.4)',
              borderRadius: '8px',
              color: '#00f0ff',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '0.9rem',
              flexShrink: 0,
            }}
          >
            ↵
          </motion.button>
        </form>

        {/* Bubble tail */}
        <div
          style={{
            position: 'absolute',
            bottom: '-11px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '9px solid transparent',
            borderRight: '9px solid transparent',
            borderTop: '11px solid #00f0ff',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-12px',
              left: '-8px',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '10px solid #0B132B',
            }}
          />
        </div>
      </motion.div>

      {/* ── Robot Body ── */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Antenna */}
        <div
          style={{
            position: 'absolute',
            top: '-24px',
            width: '4px',
            height: '24px',
            background: '#3b82f6',
            boxShadow: '0 0 5px #3b82f6',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '12px',
              height: '12px',
              background: '#ff6b6b',
              borderRadius: '50%',
              marginTop: '-8px',
              boxShadow: '0 0 8px #ff6b6b',
            }}
          />
        </div>

        {/* Head */}
        <div
          style={{
            width: '80px',
            height: '64px',
            background: 'rgba(8, 47, 73, 0.5)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: isHovered ? '0 0 20px #00f0ff' : '0 0 10px rgba(59,130,246,0.6)',
            transition: 'box-shadow 0.3s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 10px #00f0ff' }} />
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 10px #00f0ff' }} />
          </div>
          <div style={{ width: '32px', height: '6px', background: '#00f0ff', borderRadius: '100px', boxShadow: '0 0 5px #00f0ff', overflow: 'hidden' }}>
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              style={{ width: '16px', height: '100%', background: 'rgba(255,255,255,0.8)' }}
            />
          </div>
        </div>

        {/* Neck */}
        <div style={{ width: '24px', height: '12px', background: '#3b82f6', boxShadow: '0 0 5px #3b82f6', marginTop: '-2px', marginBottom: '-2px', zIndex: 0 }} />

        {/* Torso */}
        <div
          style={{
            width: '112px',
            height: '144px',
            background: 'rgba(8, 47, 73, 0.5)',
            backdropFilter: 'blur(12px)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: isHovered ? '0 0 25px #00f0ff' : '0 0 15px rgba(59,130,246,0.5)',
            transition: 'box-shadow 0.3s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '12px 0 8px',
            zIndex: 10,
            position: 'relative',
          }}
        >
          {/* Chest screen */}
          <div style={{ width: '80px', height: '72px', background: '#0B132B', borderRadius: '8px', border: '1px solid #1e3a8a', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 0' }}>
            <svg viewBox="0 0 60 25" style={{ width: '85%', height: '32px', overflow: 'visible', marginTop: '4px' }}>
              <motion.path
                d="M 0 20 Q 15 20, 20 15 T 40 10 T 60 5"
                fill="transparent" stroke="#00f0ff" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                fill="transparent" stroke="#00f0ff" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                style={{ filter: 'drop-shadow(0 0 2px #00f0ff)' }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isHovered ? 1 : 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </svg>
            <div style={{ display: 'flex', gap: '6px', marginTop: 'auto', marginBottom: '4px', alignItems: 'flex-end', height: '16px' }}>
              <motion.div animate={{ height: [6, 12, 6] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ width: '6px', background: '#00f0ff', boxShadow: '0 0 4px #00f0ff', borderRadius: '2px 2px 0 0' }} />
              <motion.div animate={{ height: [12, 6, 12] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: '6px', background: '#ffd700', boxShadow: '0 0 4px #ffd700', borderRadius: '2px 2px 0 0' }} />
              <motion.div animate={{ height: [8, 14, 8] }} transition={{ duration: 1.3, repeat: Infinity }} style={{ width: '6px', background: '#00f0ff', boxShadow: '0 0 4px #00f0ff', borderRadius: '2px 2px 0 0' }} />
            </div>
          </div>

          {/* Lower panel */}
          <div style={{ marginTop: 'auto', width: '80%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '8px', height: '4px', background: '#ff6b6b', borderRadius: '100px', boxShadow: '0 0 4px #ff6b6b' }} />
                <div style={{ width: '8px', height: '4px', background: '#ffd700', borderRadius: '100px', boxShadow: '0 0 4px #ffd700' }} />
              </div>
              <div style={{ width: '8px', height: '4px', background: '#00f0ff', borderRadius: '100px', boxShadow: '0 0 4px #00f0ff' }} />
            </div>
            <div style={{ background: '#0B132B', color: '#00f0ff', fontFamily: 'monospace', fontSize: '8px', padding: '2px 4px', borderRadius: '4px', border: '1px solid #1e3a8a', textAlign: 'center', boxShadow: 'inset 0 0 3px #00f0ff' }}>
              01001010
            </div>
          </div>
        </div>

        {/* Left arm */}
        <div
          style={{
            position: 'absolute', top: '32px', left: '-16px',
            width: '24px', height: '56px',
            background: 'rgba(8, 47, 73, 0.5)', backdropFilter: 'blur(12px)',
            borderRadius: '100px', border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 0 10px rgba(59,130,246,0.5)',
            zIndex: -1,
            transform: isHovered ? 'rotate(45deg)' : 'rotate(12deg)',
            transformOrigin: 'top center',
            transition: 'transform 0.3s',
          }}
        />
        {/* Right arm */}
        <div
          style={{
            position: 'absolute', top: '32px', right: '-16px',
            width: '24px', height: '56px',
            background: 'rgba(8, 47, 73, 0.5)', backdropFilter: 'blur(12px)',
            borderRadius: '100px', border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 0 10px rgba(59,130,246,0.5)',
            zIndex: -1,
            transform: isHovered ? 'rotate(-45deg)' : 'rotate(-12deg)',
            transformOrigin: 'top center',
            transition: 'transform 0.3s',
          }}
        />

        {/* Legs */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '-8px', zIndex: -1 }}>
          <div style={{ width: '20px', height: '40px', background: 'rgba(8, 47, 73, 0.5)', backdropFilter: 'blur(12px)', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 0 10px rgba(59,130,246,0.5)' }} />
          <div style={{ width: '20px', height: '40px', background: 'rgba(8, 47, 73, 0.5)', backdropFilter: 'blur(12px)', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 0 10px rgba(59,130,246,0.5)' }} />
        </div>
      </div>
    </motion.div>
  );
}
