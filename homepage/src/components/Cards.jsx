import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, Code2, FlaskConical } from 'lucide-react';

const cards = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    desc: 'Explore neural networks, deep learning, and cutting-edge AI research that shapes the future of intelligence.',
    color: '#7c3aed',
    glow: 'rgba(124, 58, 237, 0.35)',
    borderGlow: 'rgba(124, 58, 237, 0.5)',
    spotColor: '124,58,237',
  },
  {
    icon: Database,
    title: 'Data Science',
    desc: 'Master statistical analysis, data visualization, and predictive modeling to extract insights from complex datasets.',
    color: '#00f0ff',
    glow: 'rgba(0, 240, 255, 0.25)',
    borderGlow: 'rgba(0, 240, 255, 0.5)',
    spotColor: '0,240,255',
  },
  {
    icon: Code2,
    title: 'Open Source',
    desc: 'Build and contribute to open-source projects. Collaborate globally and create tools that empower the community.',
    color: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.3)',
    borderGlow: 'rgba(59, 130, 246, 0.5)',
    spotColor: '59,130,246',
  },
  {
    icon: FlaskConical,
    title: 'Research & Innovation',
    desc: 'Publish research, attend conferences, and pioneer innovations at the intersection of statistics and technology.',
    color: '#818cf8',
    glow: 'rgba(129, 140, 248, 0.25)',
    borderGlow: 'rgba(129, 140, 248, 0.5)',
    spotColor: '129,140,248',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

/* ── 3D Tilt Card ─────────────────────────────────────────── */
function TiltCard({ card }) {
  const Icon = card.icon;
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width;   // 0→1
    const cy = (e.clientY - rect.top)  / rect.height;  // 0→1
    // tilt: max ±15 deg
    setTilt({ x: -(cy - 0.5) * 26, y: (cx - 0.5) * 26 });
    setSpot({ x: cx * 100, y: cy * 100, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpot((s) => ({ ...s, opacity: 0 }));
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        padding: '36px 32px',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        willChange: 'transform',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = card.borderGlow;
        e.currentTarget.style.boxShadow = `0 20px 60px ${card.glow}, inset 0 0 40px rgba(255,255,255,0.02)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Radial spotlight that follows mouse */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '20px',
          background: `radial-gradient(circle at ${spot.x}% ${spot.y}%, rgba(${card.spotColor},0.18) 0%, transparent 55%)`,
          opacity: spot.opacity,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Top gradient line */}
      <div style={{
        position: 'absolute', top: 0, left: '30px', right: '30px',
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
        opacity: 0.6,
      }} />

      {/* Icon */}
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        style={{
          width: '56px', height: '56px', borderRadius: '14px',
          background: `rgba(${card.spotColor}, 0.15)`,
          border: `1px solid ${card.color}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '24px',
          transform: 'translateZ(20px)',
        }}
      >
        <Icon size={26} color={card.color} />
      </motion.div>

      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.2rem',
        fontWeight: 600, color: '#fff', marginBottom: '12px',
        transform: 'translateZ(10px)',
      }}>
        {card.title}
      </h3>

      <p style={{
        color: 'rgba(255,255,255,0.5)', fontSize: '0.93rem', lineHeight: 1.7,
        transform: 'translateZ(5px)',
      }}>
        {card.desc}
      </p>

      {/* Bottom corner accent */}
      <div style={{
        position: 'absolute', bottom: '-20px', right: '-20px',
        width: '100px', height: '100px', borderRadius: '50%',
        background: `radial-gradient(circle, ${card.color}22 0%, transparent 70%)`,
      }} />
    </motion.div>
  );
}

export default function Cards() {
  return (
    <section
      id="about"
      style={{ padding: '120px 0 100px', position: 'relative', overflow: 'hidden', perspective: '1200px' }}
    >
      {/* Background accent */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <span style={{
            display: 'inline-block', padding: '5px 16px', borderRadius: '100px',
            background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.25)',
            color: '#00f0ff', fontSize: '0.8rem',
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
            letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px',
          }}>
            What We Do
          </span>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700,
            color: '#fff', marginBottom: '16px',
          }}>
            Our Core <span className="gradient-text-cyan">Domains</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>
            Four pillars that define our club's mission and the future we're building together.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {cards.map((card) => (
            <TiltCard key={card.title} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
