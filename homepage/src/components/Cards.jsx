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
  },
  {
    icon: Database,
    title: 'Data Science',
    desc: 'Master statistical analysis, data visualization, and predictive modeling to extract insights from complex datasets.',
    color: '#00f0ff',
    glow: 'rgba(0, 240, 255, 0.25)',
    borderGlow: 'rgba(0, 240, 255, 0.5)',
  },
  {
    icon: Code2,
    title: 'Open Source',
    desc: 'Build and contribute to open-source projects. Collaborate globally and create tools that empower the community.',
    color: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.3)',
    borderGlow: 'rgba(59, 130, 246, 0.5)',
  },
  {
    icon: FlaskConical,
    title: 'Research & Innovation',
    desc: 'Publish research, attend conferences, and pioneer innovations at the intersection of statistics and technology.',
    color: '#818cf8',
    glow: 'rgba(129, 140, 248, 0.25)',
    borderGlow: 'rgba(129, 140, 248, 0.5)',
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

export default function Cards() {
  return (
    <section
      id="about"
      style={{
        padding: '120px 0 100px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '400px',
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
            display: 'inline-block',
            padding: '5px 16px',
            borderRadius: '100px',
            background: 'rgba(0, 240, 255, 0.08)',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            color: '#00f0ff',
            fontSize: '0.8rem',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            What We Do
          </span>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '16px',
          }}>
            Our Core <span className="gradient-text-cyan">Domains</span>
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1rem',
            maxWidth: '500px',
            margin: '0 auto',
          }}>
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
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.25 },
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(16px)',
                  border: `1px solid rgba(255,255,255,0.08)`,
                  borderRadius: '20px',
                  padding: '36px 32px',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
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
                {/* Top gradient line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '30px',
                  right: '30px',
                  height: '1px',
                  background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
                  opacity: 0.6,
                }} />

                {/* Icon */}
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    background: `rgba(${card.color === '#00f0ff' ? '0,240,255' : card.color === '#7c3aed' ? '124,58,237' : card.color === '#3b82f6' ? '59,130,246' : '129,140,248'}, 0.15)`,
                    border: `1px solid ${card.color}33`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                  }}
                >
                  <Icon size={26} color={card.color} />
                </motion.div>

                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: '12px',
                }}>
                  {card.title}
                </h3>

                <p style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '0.93rem',
                  lineHeight: 1.7,
                }}>
                  {card.desc}
                </p>

                {/* Bottom corner accent */}
                <div style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '-20px',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${card.color}22 0%, transparent 70%)`,
                }} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
