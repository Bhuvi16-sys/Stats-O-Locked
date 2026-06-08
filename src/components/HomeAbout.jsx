import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Eye, Target, ArrowRight, Zap, Users, Globe } from 'lucide-react';

const objectives = [
  { num: '01', color: '#00f0ff', text: 'Organize engaging events, workshops & competitions' },
  { num: '02', color: '#3b82f6', text: 'Promote skill development in analytics & tech' },
  { num: '03', color: '#7c3aed', text: 'Encourage teamwork, responsibility & leadership' },
  { num: '04', color: '#818cf8', text: 'Bridge theory and practical application' },
  { num: '05', color: '#10b981', text: 'Build a supportive, growth-oriented environment' },
];

const highlights = [
  { icon: Users, label: '200+ Members', color: '#00f0ff' },
  { icon: Zap,   label: 'AI & ML Focus', color: '#7c3aed' },
  { icon: Globe, label: 'VIT Bhopal',    color: '#10b981' },
];

export default function HomeAbout() {
  return (
    <section
      id="about-us"
      style={{ padding: '120px 0 100px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Ambient glows */}
      <div style={{
        position: 'absolute', top: '20%', left: '-8%', width: '50vw', height: '50vw',
        borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,240,255,0.05) 0%,transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '-8%', width: '40vw', height: '40vw',
        borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,0.05) 0%,transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>

        {/* ── Section badge ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <span style={{
            display: 'inline-block', padding: '5px 18px', borderRadius: 100,
            background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.25)',
            color: '#00f0ff', fontSize: '0.75rem', fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 22,
          }}>About Us</span>

          <h2 style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 'clamp(2.2rem,4.5vw,3.4rem)',
            fontWeight: 800, lineHeight: 1.1, color: '#fff', maxWidth: 640,
          }}>
            Building the Future of{' '}
            <span style={{
              background: 'linear-gradient(135deg,#00f0ff,#7c3aed)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Data Intelligence</span>
          </h2>
        </motion.div>

        {/* ── Main two-column grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'start' }}>

          {/* ── LEFT COLUMN ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Who We Are card */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 24, padding: '36px',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
                background: 'linear-gradient(90deg,transparent,rgba(0,240,255,0.5),transparent)',
              }} />
              <div style={{
                position: 'absolute', top: -40, right: -40, width: 140, height: 140,
                borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,240,255,0.06) 0%,transparent 70%)',
                pointerEvents: 'none',
              }} />

              <p style={{
                color: 'rgba(255,255,255,0.65)', fontSize: '0.97rem', lineHeight: 1.85,
                fontFamily: "'Inter',sans-serif", marginBottom: 28,
              }}>
                <strong style={{ color: '#fff', fontWeight: 600 }}>Stats-O-Locked</strong> is a
                student-driven organization at VIT Bhopal focused on building a strong community of
                learners and future leaders in AI, Data Science, and Machine Learning. We believe in
                the power of collaboration, innovation, and continuous growth.
              </p>

              {/* Highlight pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 30 }}>
                {highlights.map(({ icon: Icon, label, color }) => (
                  <div key={label} style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    padding: '6px 14px', borderRadius: 100,
                    background: `${color}10`, border: `1px solid ${color}30`,
                  }}>
                    <Icon size={13} color={color} />
                    <span style={{
                      fontSize: '0.75rem', fontWeight: 600, color,
                      fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '0.5px',
                    }}>{label}</span>
                  </div>
                ))}
              </div>

              <NavLink
                to="/about"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 22px', borderRadius: 50,
                  background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.3)',
                  color: '#00f0ff', textDecoration: 'none',
                  fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.8rem',
                  fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase',
                  transition: 'background 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(0,240,255,0.15)';
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(0,240,255,0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(0,240,255,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Learn More <ArrowRight size={14} />
              </NavLink>
            </motion.div>

            {/* Objectives grid */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.015)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 24, padding: '30px 32px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
                <div style={{ width: 3, height: 18, borderRadius: 2, background: 'linear-gradient(180deg,#7c3aed,#00f0ff)', flexShrink: 0 }} />
                <h3 style={{
                  fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.95rem',
                  fontWeight: 700, color: '#fff', letterSpacing: '2px', textTransform: 'uppercase',
                }}>Our Objectives</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {objectives.map((obj, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '10px 14px', borderRadius: 12,
                      background: 'rgba(255,255,255,0.01)',
                      border: '1px solid rgba(255,255,255,0.04)',
                      transition: 'border-color 0.2s, background 0.2s', cursor: 'default',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `${obj.color}33`;
                      e.currentTarget.style.background = `${obj.color}08`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
                    }}
                  >
                    <span style={{
                      fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.7rem',
                      fontWeight: 700, color: obj.color, minWidth: 26,
                      letterSpacing: '1px',
                    }}>{obj.num}</span>
                    <div style={{ width: 1, height: 20, background: `${obj.color}30`, flexShrink: 0 }} />
                    <p style={{
                      color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem',
                      fontFamily: "'Inter',sans-serif", lineHeight: 1.5, margin: 0,
                    }}>{obj.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Vision card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
              style={{
                background: 'rgba(0,240,255,0.025)',
                border: '1px solid rgba(0,240,255,0.12)',
                borderRadius: 24, padding: '34px 36px',
                position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(0,240,255,0.3)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,240,255,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(0,240,255,0.12)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: '20%', right: '20%', height: 1,
                background: 'linear-gradient(90deg,transparent,rgba(0,240,255,0.6),transparent)',
              }} />
              <div style={{
                position: 'absolute', bottom: -30, right: -30, width: 120, height: 120,
                borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,240,255,0.08) 0%,transparent 70%)',
                pointerEvents: 'none',
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Eye size={22} color="#00f0ff" />
                </div>
                <div>
                  <h4 style={{
                    fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.1rem',
                    fontWeight: 700, color: '#fff', margin: 0,
                  }}>Our Vision</h4>
                  <span style={{
                    fontSize: '0.7rem', color: 'rgba(0,240,255,0.6)',
                    fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1px',
                  }}>WHERE WE'RE HEADED</span>
                </div>
              </div>

              <p style={{ color: 'rgba(255,255,255,0.62)', lineHeight: 1.8, fontFamily: "'Inter',sans-serif", fontSize: '0.93rem' }}>
                To build a forward-thinking, innovation-driven community where students are empowered
                to excel in technology, analytics, and leadership — while contributing meaningfully to society.
              </p>
            </motion.div>

            {/* Mission card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5 }}
              style={{
                background: 'rgba(124,58,237,0.025)',
                border: '1px solid rgba(124,58,237,0.12)',
                borderRadius: 24, padding: '34px 36px',
                position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(124,58,237,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.12)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: '20%', right: '20%', height: 1,
                background: 'linear-gradient(90deg,transparent,rgba(124,58,237,0.6),transparent)',
              }} />
              <div style={{
                position: 'absolute', bottom: -30, right: -30, width: 120, height: 120,
                borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 70%)',
                pointerEvents: 'none',
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Target size={22} color="#7c3aed" />
                </div>
                <div>
                  <h4 style={{
                    fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.1rem',
                    fontWeight: 700, color: '#fff', margin: 0,
                  }}>Our Mission</h4>
                  <span style={{
                    fontSize: '0.7rem', color: 'rgba(124,58,237,0.7)',
                    fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1px',
                  }}>WHAT DRIVES US</span>
                </div>
              </div>

              <p style={{ color: 'rgba(255,255,255,0.62)', lineHeight: 1.8, fontFamily: "'Inter',sans-serif", fontSize: '0.93rem' }}>
                To provide students with opportunities to develop technical, analytical, creative, and
                leadership skills beyond the classroom — through hands-on experiences, real-world
                projects, and collaborative learning.
              </p>
            </motion.div>

            {/* Decorative identity block */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                background: 'linear-gradient(135deg,rgba(0,240,255,0.06),rgba(124,58,237,0.06))',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 24, padding: '28px 32px',
                display: 'flex', alignItems: 'center', gap: 20,
              }}
            >
              <img
                src="/logo.webp" alt="SOL"
                style={{
                  width: 64, height: 64, borderRadius: '50%', objectFit: 'cover',
                  border: '2px solid rgba(0,240,255,0.3)',
                  boxShadow: '0 0 24px rgba(0,240,255,0.2)',
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{
                  fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.15rem',
                  fontWeight: 800, color: '#fff', letterSpacing: '1px', marginBottom: 4,
                }}>
                  Stats-O-Locked
                  <span style={{ color: '#00f0ff' }}>.</span>
                </div>
                <div style={{
                  fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)',
                  fontFamily: "'Inter',sans-serif", lineHeight: 1.5,
                }}>
                  VIT Bhopal's AI, Data Science<br />& Machine Learning Club
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
