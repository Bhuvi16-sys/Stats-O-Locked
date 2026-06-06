import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Compass, Terminal, Users } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';

const cards = [
  {
    icon: Lightbulb,
    title: 'Innovation & Creativity',
    desc: 'A space to explore interests and develop skills beyond the classroom.',
    color: '#00f0ff',
  },
  {
    icon: Compass,
    title: 'Leadership Skills',
    desc: 'Programs to connect, learn, and lead effectively in any environment.',
    color: '#7c3aed',
  },
  {
    icon: Terminal,
    title: 'Tech Excellence',
    desc: 'Collaborate on meaningful, future-focused projects that matter.',
    color: '#3b82f6',
  },
  {
    icon: Users,
    title: 'Community Impact',
    desc: 'Events, workshops, and activities for professional growth.',
    color: '#818cf8',
  },
];

/* ── Animated Dot Globe ─────────────────────────────────────── */
function DotGlobe() {
  const { dots, latRings } = useMemo(() => {
    const dots = [];
    const R = 128;
    const cx = 160;
    const cy = 160;

    // Dot matrix — denser near equator
    for (let lat = -80; lat <= 80; lat += 10) {
      const phi = (lat * Math.PI) / 180;
      const circleR = R * Math.cos(phi);
      const y = cy - R * Math.sin(phi);
      const numDots = Math.max(1, Math.round((2 * Math.PI * circleR) / 13));

      for (let i = 0; i < numDots; i++) {
        const theta = (i / numDots) * 2 * Math.PI;
        const x = cx + circleR * Math.cos(theta);
        const depth = (Math.cos(theta) + 1) / 2;
        const opacity = 0.04 + depth * 0.58;
        const size = 0.6 + depth * 1.2;
        dots.push({ x, y, opacity, size });
      }
    }

    // Latitude ring ellipses — cx, cy, rx, ry
    const latRings = [-60, -30, 0, 30, 60].map((lat) => {
      const phi = (lat * Math.PI) / 180;
      const rx = R * Math.cos(phi);
      const ry = rx * 0.28; // flatten to look like 3-D circles in perspective
      const y = cy - R * Math.sin(phi);
      return { cx, y, rx, ry, opacity: 0.06 + Math.abs(Math.cos(phi)) * 0.08 };
    });

    return { dots, latRings };
  }, []);

  // Orbital particles (3 dots orbiting at different radii & speeds)
  const orbitals = [
    { r: 148, duration: 6, startAngle: 0, color: '#00f0ff', size: 3 },
    { r: 158, duration: 9, startAngle: 120, color: '#7c3aed', size: 2.5 },
    { r: 142, duration: 13, startAngle: 240, color: '#3b82f6', size: 2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ filter: 'drop-shadow(0 0 60px rgba(124,58,237,0.45))' }}
    >
      <svg width="320" height="320" viewBox="0 0 320 320" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="sol-globeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(124,58,237,0.22)" />
            <stop offset="55%" stopColor="rgba(59,130,246,0.07)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="sol-globeShine" cx="35%" cy="30%" r="55%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <clipPath id="sol-globeClip">
            <circle cx="160" cy="160" r="130" />
          </clipPath>
        </defs>

        {/* Deep glow fill */}
        <circle cx="160" cy="160" r="130" fill="url(#sol-globeGlow)" />
        {/* Specular shine */}
        <circle cx="160" cy="160" r="130" fill="url(#sol-globeShine)" />

        {/* ── Spinning dot matrix — CSS animation avoids SVG clipPath conflicts ── */}
        <g
          clipPath="url(#sol-globeClip)"
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: 'glob-spin 28s linear infinite',
          }}
        >
          {dots.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={d.size}
              fill={`rgba(180,145,255,${d.opacity})`}
            />
          ))}
        </g>

        {/* ── Latitude wireframe rings (counter-spin) ── */}
        <g
          clipPath="url(#sol-globeClip)"
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: 'glob-spin 60s linear infinite reverse',
          }}
        >
          {latRings.map((ring, i) => (
            <ellipse
              key={i}
              cx={ring.cx}
              cy={ring.y}
              rx={ring.rx}
              ry={ring.ry}
              fill="none"
              stroke={`rgba(0,240,255,${ring.opacity})`}
              strokeWidth="0.7"
            />
          ))}
          <ellipse cx="160" cy="160" rx="10" ry="128" fill="none" stroke="rgba(0,240,255,0.05)" strokeWidth="0.7" />
          <ellipse cx="160" cy="160" rx="128" ry="10" fill="none" stroke="rgba(0,240,255,0.05)" strokeWidth="0.7" />
        </g>

        {/* ── Outer rim ── */}
        <circle
          cx="160" cy="160" r="129"
          fill="none"
          stroke="rgba(180,140,255,0.18)"
          strokeWidth="1"
        />

        {/* ── Orbital particles ── */}
        {orbitals.map((orb, i) => (
          <motion.circle
            key={i}
            r={orb.size}
            fill={orb.color}
            opacity={0.9}
            style={{ filter: `drop-shadow(0 0 5px ${orb.color})` }}
            animate={{
              cx: [
                160 + orb.r * Math.cos((orb.startAngle * Math.PI) / 180),
                160 + orb.r * Math.cos(((orb.startAngle + 180) * Math.PI) / 180),
                160 + orb.r * Math.cos(((orb.startAngle + 360) * Math.PI) / 180),
              ],
              cy: [
                160 + (orb.r * 0.35) * Math.sin((orb.startAngle * Math.PI) / 180),
                160 + (orb.r * 0.35) * Math.sin(((orb.startAngle + 180) * Math.PI) / 180),
                160 + (orb.r * 0.35) * Math.sin(((orb.startAngle + 360) * Math.PI) / 180),
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: orb.duration,
              ease: 'linear',
            }}
          />
        ))}

        {/* ── Pulsing hot-spots ── */}
        {[
          { x: 135, y: 148, d: 0 },
          { x: 158, y: 178, d: 0.7 },
          { x: 182, y: 162, d: 1.4 },
          { x: 147, y: 210, d: 2.1 },
        ].map((pin, i) => (
          <g key={i}>
            <motion.circle
              cx={pin.x} cy={pin.y} r={4}
              fill="none"
              stroke="rgba(0,240,255,0.5)"
              strokeWidth="1"
              animate={{ r: [3, 11], opacity: [0.6, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, delay: pin.d, ease: 'easeOut' }}
            />
            <circle cx={pin.x} cy={pin.y} r={2.5} fill="none" stroke="rgba(0,240,255,0.8)" strokeWidth="1.2" />
            <circle cx={pin.x} cy={pin.y} r={0.9} fill="#00f0ff" />
          </g>
        ))}
      </svg>
    </motion.div>
  );
}

/* ── Main Component ─────────────────────────────────────────── */
export default function Cards() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      id="domains"
      style={{
        padding: '120px 0 100px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 28% 55%, rgba(124,58,237,0.07) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1.25fr',
            gap: isMobile ? '60px' : '80px',
            alignItems: 'center',
          }}
        >

          {/* ── LEFT: Heading + Globe ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            {/* Badge */}
            <span
              style={{
                display: 'inline-block',
                padding: '5px 16px',
                borderRadius: '100px',
                background: 'rgba(0,240,255,0.08)',
                border: '1px solid rgba(0,240,255,0.25)',
                color: '#00f0ff',
                fontSize: '0.72rem',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '28px',
              }}
            >
              Our Pillars
            </span>

            {/* Heading */}
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.12,
                marginBottom: '22px',
              }}
            >
              Our Core
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #00f0ff 0%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Domains
              </span>
            </h2>

            {/* Subtitle */}
            <p
              style={{
                color: 'rgba(255,255,255,0.48)',
                fontSize: '1rem',
                lineHeight: 1.75,
                maxWidth: '340px',
                marginBottom: isMobile ? '40px' : '56px',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Four pillars that define our club's mission and the future we're building together.
            </p>

            {/* Globe (hidden on mobile to save space) */}
            {!isMobile && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '-30px' }}>
                <DotGlobe />
              </div>
            )}
          </motion.div>

          {/* ── RIGHT: 2×2 Card Grid ── */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 30 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.2, ease: 'easeOut' }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '24px',
              overflow: 'hidden',
              backdropFilter: 'blur(8px)',
              background: 'rgba(255,255,255,0.01)',
            }}
          >
            {cards.map((card, i) => {
              const Icon = card.icon;
              const isLeft = i % 2 === 0;
              const isTop = i < 2;

              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + i * 0.1, duration: 0.6 }}
                  style={{
                    padding: isMobile ? '32px 24px' : '48px 38px',
                    borderRight: isLeft ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    borderBottom: isTop ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    position: 'relative',
                    cursor: 'default',
                    transition: 'background 0.35s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${card.color}09`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {/* Circular icon container */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.14)',
                      background: 'rgba(255,255,255,0.02)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '26px',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = card.color;
                      e.currentTarget.style.boxShadow = `0 0 22px ${card.color}35`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Icon size={22} color={card.color} strokeWidth={1.5} />
                  </motion.div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: isMobile ? '1rem' : '1.13rem',
                      fontWeight: 600,
                      color: '#fff',
                      marginBottom: '10px',
                    }}
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.43)',
                      fontSize: '0.88rem',
                      lineHeight: 1.7,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {card.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
