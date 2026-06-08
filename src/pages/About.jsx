import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Eye, Target, Zap, Users, Lightbulb, Heart, ArrowRight } from 'lucide-react';

const objectives = [
  { num: '01', color: '#00f0ff',  icon: '🎯', text: 'Organize engaging events, workshops, and competitions that push boundaries.' },
  { num: '02', color: '#3b82f6',  icon: '📊', text: 'Promote skill development in analytics, technology, and management.' },
  { num: '03', color: '#7c3aed',  icon: '🤝', text: 'Encourage teamwork, responsibility, and leadership at every level.' },
  { num: '04', color: '#818cf8',  icon: '🔬', text: 'Bridge the gap between theoretical knowledge and practical application.' },
  { num: '05', color: '#10b981',  icon: '🌱', text: 'Create a supportive, inclusive, and growth-oriented environment.' },
];

const values = [
  { icon: Lightbulb, title: 'Innovation',     desc: 'We challenge the status quo and embrace new ideas, technologies, and approaches.', color: '#f59e0b' },
  { icon: Users,     title: 'Collaboration',  desc: 'Great things happen when talented people work together toward a shared purpose.', color: '#00f0ff' },
  { icon: Heart,     title: 'Growth',         desc: 'Every event, project, and interaction is an opportunity to learn and level up.', color: '#ec4899' },
  { icon: Zap,       title: 'Excellence',     desc: 'We hold ourselves to a high standard in everything we build, run, and deliver.', color: '#7c3aed' },
];

function fade(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
  };
}

export default function About() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 0 100px', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: '5%',  left: '-10%', width: '55vw', height: '55vw',
        borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,240,255,0.05) 0%,transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '45%', right: '-10%', width: '45vw', height: '45vw',
        borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,0.05) 0%,transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '5%', left: '20%', width: '40vw', height: '40vw',
        borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,0.04) 0%,transparent 60%)', pointerEvents: 'none' }} />
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.18, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 32px' }}>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <motion.div {...fade()} style={{ marginBottom: 100 }}>
          <span style={{
            display: 'inline-block', padding: '5px 18px', borderRadius: 100,
            background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.25)',
            color: '#00f0ff', fontSize: '0.75rem', fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 24,
          }}>About Stats-O-Locked</span>

          <h1 style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 'clamp(2.8rem,6vw,5rem)',
            fontWeight: 800, lineHeight: 1.05, letterSpacing: '-1.5px',
            color: '#fff', maxWidth: 780, marginBottom: 28,
          }}>
            A Community Driven by{' '}
            <span style={{
              background: 'linear-gradient(135deg,#00f0ff 0%,#7c3aed 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Curiosity & Code</span>
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.5)', fontSize: '1.05rem', lineHeight: 1.8,
            maxWidth: 600, fontFamily: "'Inter',sans-serif",
          }}>
            We're VIT Bhopal's AI, Data Science & Machine Learning student club — building the next
            generation of data leaders through events, projects, and relentless learning.
          </p>
        </motion.div>

        {/* ── WHO WE ARE ────────────────────────────────────────── */}
        <motion.div {...fade()} style={{ marginBottom: 80 }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'center',
          }}>
            {/* Text */}
            <div style={{
              background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 28, padding: '44px 48px',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
                background: 'linear-gradient(90deg,transparent,rgba(0,240,255,0.4),transparent)',
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{ width: 4, height: 24, borderRadius: 2,
                  background: 'linear-gradient(180deg,#00f0ff,#7c3aed)', flexShrink: 0 }} />
                <h2 style={{
                  fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.6rem',
                  fontWeight: 800, color: '#fff',
                }}>Who We Are</h2>
              </div>

              <p style={{
                color: 'rgba(255,255,255,0.65)', fontSize: '1rem', lineHeight: 1.85,
                fontFamily: "'Inter',sans-serif", marginBottom: 20,
              }}>
                <strong style={{ color: '#fff' }}>Stats-O-Locked</strong> is a student-driven technical
                club at VIT Bhopal University, founded on the belief that data and technology are the
                languages of the future. We bring together curious minds — coders, analysts, researchers,
                and creators — under one banner.
              </p>
              <p style={{
                color: 'rgba(255,255,255,0.55)', fontSize: '0.97rem', lineHeight: 1.85,
                fontFamily: "'Inter',sans-serif",
              }}>
                From organizing flagship events like TechCorp Summit to running hands-on workshops and
                hackathons, we're building a space where students can explore, fail, learn, and grow
                alongside peers who share the same drive.
              </p>
            </div>

            {/* Identity visual */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <motion.div
                {...fade(0.1)}
                style={{
                  background: 'linear-gradient(135deg,rgba(0,240,255,0.07),rgba(124,58,237,0.07))',
                  border: '1px solid rgba(0,240,255,0.15)',
                  borderRadius: 24, padding: '32px 28px',
                  textAlign: 'center', position: 'relative', overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', top: -30, right: -30, width: 100, height: 100,
                  borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,240,255,0.15) 0%,transparent 70%)',
                  pointerEvents: 'none',
                }} />
                <img src="/logo.webp" alt="SOL"
                  style={{
                    width: 80, height: 80, borderRadius: '50%', objectFit: 'cover',
                    border: '2px solid rgba(0,240,255,0.35)',
                    boxShadow: '0 0 30px rgba(0,240,255,0.2)',
                    margin: '0 auto 16px',
                    display: 'block',
                  }} />
                <div style={{
                  fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.3rem',
                  fontWeight: 800, color: '#fff', letterSpacing: '1px', marginBottom: 4,
                }}>
                  SOL<span style={{ color: '#00f0ff' }}>.</span>
                </div>
                <div style={{
                  fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)',
                  fontFamily: "'Inter',sans-serif", lineHeight: 1.6,
                }}>
                  VIT Bhopal University<br />Est. 2024
                </div>
              </motion.div>

              {[
                { label: '200+', sub: 'Active Members', color: '#00f0ff' },
                { label: '3+',   sub: 'Flagship Events', color: '#7c3aed' },
              ].map(({ label, sub, color }, i) => (
                <motion.div key={i} {...fade(0.15 + i * 0.08)}
                  style={{
                    background: `${color}08`,
                    border: `1px solid ${color}22`,
                    borderRadius: 16, padding: '18px 22px',
                    display: 'flex', alignItems: 'center', gap: 16,
                  }}
                >
                  <span style={{
                    fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.8rem',
                    fontWeight: 800, color,
                    textShadow: `0 0 20px ${color}66`,
                  }}>{label}</span>
                  <span style={{
                    fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)',
                    fontFamily: "'Inter',sans-serif",
                  }}>{sub}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── VISION & MISSION ──────────────────────────────────── */}
        <motion.div {...fade()} style={{ marginBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
            <div style={{ width: 4, height: 24, borderRadius: 2,
              background: 'linear-gradient(180deg,#00f0ff,#7c3aed)', flexShrink: 0 }} />
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>
              Vision & Mission
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Vision */}
            <motion.div
              {...fade(0.1)}
              whileHover={{ y: -6 }}
              style={{
                background: 'rgba(0,240,255,0.02)', border: '1px solid rgba(0,240,255,0.12)',
                borderRadius: 24, padding: '40px',
                position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(0,240,255,0.35)';
                e.currentTarget.style.boxShadow = '0 24px 64px rgba(0,240,255,0.1)';
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
                position: 'absolute', bottom: -40, right: -40, width: 160, height: 160,
                borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,240,255,0.07) 0%,transparent 70%)',
                pointerEvents: 'none',
              }} />

              <div style={{
                width: 52, height: 52, borderRadius: 15, marginBottom: 24,
                background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Eye size={24} color="#00f0ff" />
              </div>

              <h3 style={{
                fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.25rem',
                fontWeight: 800, color: '#fff', marginBottom: 6,
              }}>Our Vision</h3>
              <span style={{
                display: 'block', fontSize: '0.68rem', fontWeight: 600,
                color: 'rgba(0,240,255,0.6)', fontFamily: "'Space Grotesk',sans-serif",
                letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 20,
              }}>WHERE WE'RE HEADED</span>

              <p style={{
                color: 'rgba(255,255,255,0.6)', lineHeight: 1.85,
                fontFamily: "'Inter',sans-serif", fontSize: '0.95rem',
              }}>
                To build a forward-thinking, innovation-driven community where students are empowered
                to excel in technology, analytics, and leadership — while contributing meaningfully
                to society and the world at large.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              {...fade(0.15)}
              whileHover={{ y: -6 }}
              style={{
                background: 'rgba(124,58,237,0.02)', border: '1px solid rgba(124,58,237,0.12)',
                borderRadius: 24, padding: '40px',
                position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
                e.currentTarget.style.boxShadow = '0 24px 64px rgba(124,58,237,0.1)';
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
                position: 'absolute', bottom: -40, right: -40, width: 160, height: 160,
                borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,0.07) 0%,transparent 70%)',
                pointerEvents: 'none',
              }} />

              <div style={{
                width: 52, height: 52, borderRadius: 15, marginBottom: 24,
                background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Target size={24} color="#7c3aed" />
              </div>

              <h3 style={{
                fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.25rem',
                fontWeight: 800, color: '#fff', marginBottom: 6,
              }}>Our Mission</h3>
              <span style={{
                display: 'block', fontSize: '0.68rem', fontWeight: 600,
                color: 'rgba(124,58,237,0.7)', fontFamily: "'Space Grotesk',sans-serif",
                letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 20,
              }}>WHAT DRIVES US</span>

              <p style={{
                color: 'rgba(255,255,255,0.6)', lineHeight: 1.85,
                fontFamily: "'Inter',sans-serif", fontSize: '0.95rem',
              }}>
                To provide students with opportunities to develop technical, analytical, creative, and
                leadership skills beyond the classroom — through hands-on experiences, real-world
                projects, and collaborative learning environments.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* ── VALUES ────────────────────────────────────────────── */}
        <motion.div {...fade()} style={{ marginBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
            <div style={{ width: 4, height: 24, borderRadius: 2,
              background: 'linear-gradient(180deg,#f59e0b,#ec4899)', flexShrink: 0 }} />
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>
              What We Stand For
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {values.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                {...fade(i * 0.08)}
                whileHover={{ y: -8, scale: 1.03 }}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${color}18`,
                  borderRadius: 20, padding: '28px 24px',
                  position: 'relative', overflow: 'hidden',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${color}44`;
                  e.currentTarget.style.boxShadow = `0 20px 50px ${color}18`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${color}18`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: '20%', right: '20%', height: 1,
                  background: `linear-gradient(90deg,transparent,${color},transparent)`,
                  opacity: 0.5,
                }} />
                <div style={{
                  position: 'absolute', bottom: -20, right: -20, width: 80, height: 80,
                  borderRadius: '50%', background: `radial-gradient(circle,${color}12 0%,transparent 70%)`,
                  pointerEvents: 'none',
                }} />
                <div style={{
                  width: 44, height: 44, borderRadius: 12, marginBottom: 18,
                  background: `${color}12`, border: `1px solid ${color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={20} color={color} />
                </div>
                <h4 style={{
                  fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.95rem',
                  fontWeight: 700, color: '#fff', marginBottom: 10,
                }}>{title}</h4>
                <p style={{
                  color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem',
                  lineHeight: 1.65, fontFamily: "'Inter',sans-serif",
                }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── OBJECTIVES ────────────────────────────────────────── */}
        <motion.div {...fade()} style={{ marginBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
            <div style={{ width: 4, height: 24, borderRadius: 2,
              background: 'linear-gradient(180deg,#7c3aed,#00f0ff)', flexShrink: 0 }} />
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>
              Our Objectives
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 16 }}>
            {objectives.map((obj, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.07)}
                whileHover={{ x: 6 }}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 18,
                  padding: '22px 24px', borderRadius: 18,
                  background: 'rgba(255,255,255,0.015)',
                  border: `1px solid ${obj.color}18`,
                  position: 'relative', overflow: 'hidden',
                  transition: 'border-color 0.25s, background 0.25s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${obj.color}44`;
                  e.currentTarget.style.background = `${obj.color}06`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${obj.color}18`;
                  e.currentTarget.style.background = 'rgba(255,255,255,0.015)';
                }}
              >
                <div style={{
                  position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 3,
                  background: obj.color, borderRadius: 2, opacity: 0.6,
                }} />
                <span style={{ fontSize: '1.4rem', flexShrink: 0, lineHeight: 1 }}>{obj.icon}</span>
                <div style={{ flex: 1 }}>
                  <span style={{
                    display: 'block', fontSize: '0.65rem', fontWeight: 700,
                    color: obj.color, fontFamily: "'Space Grotesk',sans-serif",
                    letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 6,
                  }}>{obj.num}</span>
                  <p style={{
                    color: 'rgba(255,255,255,0.65)', fontSize: '0.92rem',
                    lineHeight: 1.6, fontFamily: "'Inter',sans-serif", margin: 0,
                  }}>{obj.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA STRIP ─────────────────────────────────────────── */}
        <motion.div
          {...fade()}
          style={{
            background: 'linear-gradient(135deg,rgba(0,240,255,0.06),rgba(124,58,237,0.06))',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 28, padding: '48px 52px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 32, flexWrap: 'wrap', position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: '20%', right: '20%', height: 1,
            background: 'linear-gradient(90deg,transparent,rgba(0,240,255,0.4),transparent)',
          }} />
          <div style={{
            position: 'absolute', top: -50, right: -50, width: 200, height: 200,
            borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,0.1) 0%,transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div>
            <h3 style={{
              fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.5rem',
              fontWeight: 800, color: '#fff', marginBottom: 8,
            }}>Be Part of the Story</h3>
            <p style={{
              color: 'rgba(255,255,255,0.45)', fontFamily: "'Inter',sans-serif",
              fontSize: '0.95rem', maxWidth: 420, lineHeight: 1.7,
            }}>
              Whether you're a coder, designer, analyst, or just curious — there's a place for you
              in Stats-O-Locked.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <NavLink to="/team" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 26px', borderRadius: 50,
              background: 'linear-gradient(135deg,#7c3aed,#00f0ff)',
              color: '#020b16', textDecoration: 'none',
              fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.82rem',
              fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
            }}>
              Meet the Team <ArrowRight size={14} />
            </NavLink>
            <NavLink to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 26px', borderRadius: 50,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
              fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.82rem',
              fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
            }}>
              Get In Touch
            </NavLink>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
