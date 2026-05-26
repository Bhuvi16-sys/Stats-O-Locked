import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const milestones = [
  {
    year: '2023',
    quarter: 'Founding',
    title: 'Club Founded',
    desc: 'Stats-O-Locked was established at VIT Bhopal with a founding team passionate about data science and analytics.',
    color: '#00f0ff',
    icon: '🏛️',
  },
  {
    year: '2024',
    quarter: 'Q1',
    title: 'First Workshops',
    desc: 'Launched our first series of hands-on workshops covering Python for Data Science and Machine Learning fundamentals.',
    color: '#7c3aed',
    icon: '📚',
  },
  {
    year: '2024',
    quarter: 'Q3',
    title: 'TechCorp Summit',
    desc: 'Hosted our flagship MUN-style tech debate event. 200+ participants debated real-world tech challenges across 2 days.',
    color: '#f59e0b',
    icon: '🚀',
  },
  {
    year: '2025',
    quarter: 'AdVITya',
    title: 'CTRL + LOL',
    desc: 'Launched the week-long virtual meme competition during AdVITya\'26 — a smash hit with massive Instagram engagement.',
    color: '#ff4d94',
    icon: '🎭',
  },
  {
    year: '2025',
    quarter: 'Q2',
    title: '200+ Members',
    desc: 'Crossed the 200 active member milestone with 17 dedicated department leads driving 5+ domains simultaneously.',
    color: '#10b981',
    icon: '👥',
  },
  {
    year: '2025',
    quarter: 'Upcoming',
    title: 'Research & Beyond',
    desc: 'Expanding into student research publications, open-source contributions, and industry collaborations.',
    color: '#3b82f6',
    icon: '🔬',
  },
];

/* ── Single node ─────────────────────────────────── */
function MilestoneNode({ item, idx, isActive, onClick }) {
  const isEven = idx % 2 === 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        minWidth: '200px',
        maxWidth: '220px',
        cursor: 'pointer',
      }}
      onClick={() => onClick(idx)}
    >
      {/* Card above or below the track */}
      <motion.div
        initial={{ opacity: 0, y: isEven ? -20 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: idx * 0.1, duration: 0.5 }}
        whileHover={{ scale: 1.04 }}
        style={{
          order: isEven ? 0 : 2,
          marginBottom: isEven ? '16px' : 0,
          marginTop: isEven ? 0 : '16px',
          background: isActive ? `${item.color}18` : 'rgba(255,255,255,0.02)',
          border: `1px solid ${isActive ? item.color + '66' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '16px',
          padding: '18px 16px',
          width: '100%',
          transition: 'all 0.3s ease',
          boxShadow: isActive ? `0 0 24px ${item.color}22` : 'none',
        }}
      >
        <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>{item.icon}</div>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.65rem', fontWeight: 600,
          color: item.color, letterSpacing: '1px',
          textTransform: 'uppercase', marginBottom: '4px',
        }}>
          {item.year} · {item.quarter}
        </div>
        <h4 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '6px',
        }}>
          {item.title}
        </h4>
        <p style={{
          fontSize: '0.76rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.55,
        }}>
          {item.desc}
        </p>
      </motion.div>

      {/* Connector stem */}
      <div style={{ order: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '1px', height: '16px', background: `${item.color}55` }} />

        {/* Node dot */}
        <motion.div
          whileHover={{ scale: 1.3 }}
          animate={isActive ? { scale: [1, 1.15, 1] } : {}}
          transition={isActive ? { repeat: Infinity, duration: 1.8 } : {}}
          style={{
            width: '18px', height: '18px', borderRadius: '50%',
            background: item.color,
            boxShadow: `0 0 ${isActive ? 18 : 8}px ${item.color}`,
            border: `3px solid ${isActive ? '#fff' : 'rgba(255,255,255,0.15)'}`,
            zIndex: 2, cursor: 'pointer',
            transition: 'box-shadow 0.3s, border 0.3s',
          }}
        />
        <div style={{ width: '1px', height: '16px', background: `${item.color}55` }} />
      </div>
    </div>
  );
}

export default function Timeline() {
  const [activeIdx, setActiveIdx] = useState(2); // TechCorp highlighted by default
  const trackRef = useRef(null);

  const handleClick = (idx) => setActiveIdx(idx);

  return (
    <section
      id="timeline"
      style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '900px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(0,240,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <span style={{
            display: 'inline-block', padding: '5px 16px', borderRadius: '100px',
            background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.25)',
            color: '#00f0ff', fontSize: '0.8rem',
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
            letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '18px',
          }}>
            Our Journey
          </span>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700, color: '#fff', marginBottom: '12px',
          }}>
            Club <span className="gradient-text-cyan">Milestones</span>
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto',
          }}>
            From our founding to 200+ members — click any milestone to explore our journey.
          </p>
        </motion.div>

        {/* Scrollable timeline track */}
        <div className="hide-scrollbar" style={{ position: 'relative', overflowX: 'auto', paddingBottom: '20px' }}>
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0',
              minWidth: 'max-content',
              padding: '40px 40px',
              position: 'relative',
            }}
          >
            {/* Central track line */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '40px',
              right: '40px',
              height: '2px',
              background: 'linear-gradient(90deg, rgba(0,240,255,0.1), rgba(0,240,255,0.4), rgba(124,58,237,0.4), rgba(0,240,255,0.1))',
              transform: 'translateY(-50%)',
              zIndex: 0,
            }} />

            {milestones.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
                <MilestoneNode
                  item={item}
                  idx={idx}
                  isActive={activeIdx === idx}
                  onClick={handleClick}
                />
                {/* Connector segment between nodes */}
                {idx < milestones.length - 1 && (
                  <div style={{
                    width: '32px', height: '2px',
                    background: `linear-gradient(90deg, ${item.color}44, ${milestones[idx + 1].color}44)`,
                    flexShrink: 0,
                    marginTop: '0',
                    alignSelf: 'center',
                    position: 'relative',
                    zIndex: 1,
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ textAlign: 'center', marginTop: '12px' }}>
          <span style={{
            color: 'rgba(255,255,255,0.2)',
            fontSize: '0.75rem',
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '1px',
          }}>
            ← scroll to explore →
          </span>
        </div>
      </div>
    </section>
  );
}
