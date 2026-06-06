import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Trophy, BookOpen } from 'lucide-react';

const stats = [
  { icon: Users, label: 'Members', value: 200, suffix: '+', color: '#00f0ff' },
  { icon: Briefcase, label: 'Projects', value: 30, suffix: '+', color: '#7c3aed' },
  { icon: Trophy, label: 'Hackathons', value: 12, suffix: '+', color: '#3b82f6' },
  { icon: BookOpen, label: 'Workshops', value: 25, suffix: '+', color: '#818cf8' },
];

function Counter({ value, suffix, color, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span style={{
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
      fontWeight: 700,
      color,
      textShadow: `0 0 30px ${color}66`,
    }}>
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats"
      ref={ref}
      style={{
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top border line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.4), transparent)',
      }} />

      {/* Glow center */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="px-6 md:px-10" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
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
            background: 'rgba(124, 58, 237, 0.1)',
            border: '1px solid rgba(124, 58, 237, 0.3)',
            color: '#c4b5fd',
            fontSize: '0.8rem',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            Achievements
          </span>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#fff',
          }}>
            Our <span className="gradient-text">Impact in Numbers</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
        }}>
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.03 }}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '20px',
                  padding: '40px 32px',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${stat.color}44`;
                  e.currentTarget.style.boxShadow = `0 20px 60px ${stat.color}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Top line */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: '20%', right: '20%',
                  height: '2px',
                  background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                }} />

                {/* Icon */}
                <div style={{
                  width: '52px', height: '52px',
                  borderRadius: '14px',
                  background: `${stat.color}18`,
                  border: `1px solid ${stat.color}33`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <Icon size={24} color={stat.color} />
                </div>

                {/* Counter */}
                <Counter value={stat.value} suffix={stat.suffix} color={stat.color} inView={inView} />

                <div style={{
                  marginTop: '8px',
                  color: 'rgba(255,255,255,0.5)',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                }}>
                  {stat.label}
                </div>

                {/* Bottom glow */}
                <div style={{
                  position: 'absolute',
                  bottom: '-30px', left: '50%',
                  transform: 'translateX(-50%)',
                  width: '120px', height: '80px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${stat.color}15, transparent)`,
                }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
