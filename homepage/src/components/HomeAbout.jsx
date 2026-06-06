import { motion } from 'framer-motion';
import { Eye, Target } from 'lucide-react';

const objectives = [
  {
    num: '01',
    color: '#00f0ff',
    text: 'To organize engaging events, workshops, and competitions',
  },
  {
    num: '02',
    color: '#3b82f6',
    text: 'To promote skill development in analytics, technology, and management',
  },
  {
    num: '03',
    color: '#7c3aed',
    text: 'To encourage teamwork, responsibility, and leadership',
  },
  {
    num: '04',
    color: '#818cf8',
    text: 'To bridge the gap between theoretical knowledge and practical application',
  },
  {
    num: '05',
    color: '#00f0ff',
    text: 'To create a supportive, inclusive, and growth-oriented environment',
  },
];

export default function HomeAbout() {
  return (
    <section
      id="about-us"
      style={{
        padding: '120px 0 100px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(0,240,255,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        {/* ── Section Label + Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '64px' }}
        >
          <span
            style={{
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
            }}
          >
            About Us
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '16px',
            }}
          >
            Who We{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00f0ff, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Are
            </span>
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              maxWidth: '720px',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <strong style={{ color: '#fff', fontWeight: 600 }}>Stats-o-Locked Club</strong> is a
            student-driven organization focused on building a strong community of learners and future
            leaders. We believe in the power of collaboration, innovation, and continuous improvement.
          </p>
        </motion.div>

        {/* ── Vision & Mission ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '80px',
          }}
        >
          {/* Vision */}
          <motion.div
            whileHover={{ y: -6 }}
            style={{
              padding: '36px',
              borderRadius: '20px',
              background: 'rgba(0, 240, 255, 0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0,240,255,0.3)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,240,255,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            {/* Top accent line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '30px',
                right: '30px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.5), transparent)',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'rgba(0,240,255,0.1)',
                  border: '1px solid rgba(0,240,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00f0ff',
                }}
              >
                <Eye size={22} />
              </div>
              <h4
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#fff',
                  margin: 0,
                }}
              >
                Our Vision
              </h4>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontFamily: "'Inter', sans-serif" }}>
              To build a forward-thinking, innovation-driven community where students are empowered to
              excel in technology, analytics, and leadership, while contributing meaningfully to society.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            whileHover={{ y: -6 }}
            style={{
              padding: '36px',
              borderRadius: '20px',
              background: 'rgba(124, 58, 237, 0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(124,58,237,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '30px',
                right: '30px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'rgba(124,58,237,0.1)',
                  border: '1px solid rgba(124,58,237,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7c3aed',
                }}
              >
                <Target size={22} />
              </div>
              <h4
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#fff',
                  margin: 0,
                }}
              >
                Our Mission
              </h4>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontFamily: "'Inter', sans-serif" }}>
              Our mission is to provide students with opportunities to develop technical, analytical,
              creative, and leadership skills beyond the classroom through hands-on experiences,
              real-world projects, and collaborative learning.
            </p>
          </motion.div>
        </motion.div>

        {/* ── Our Objectives ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
            <div
              style={{
                width: '4px',
                height: '28px',
                borderRadius: '4px',
                background: 'linear-gradient(180deg, #7c3aed, #00f0ff)',
              }}
            />
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                fontWeight: 700,
                color: '#7c3aed',
                margin: 0,
              }}
            >
              Our Objectives
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', paddingLeft: '24px' }}>
            {/* Vertical connector */}
            <div
              style={{
                position: 'absolute',
                left: '19px',
                top: '20px',
                bottom: '20px',
                width: '1px',
                background: 'linear-gradient(180deg, #00f0ff44, #7c3aed44, #3b82f644)',
              }}
            />

            {objectives.map((obj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}
              >
                {/* Number bubble */}
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    color: obj.color,
                    border: `1px solid ${obj.color}44`,
                    background: '#020b16',
                    boxShadow: `0 0 16px ${obj.color}20`,
                    flexShrink: 0,
                    zIndex: 1,
                    marginTop: '2px',
                  }}
                >
                  {obj.num}
                </div>

                {/* Text */}
                <div
                  style={{
                    flex: 1,
                    padding: '14px 20px',
                    borderRadius: '14px',
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'border-color 0.3s, background 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${obj.color}33`;
                    e.currentTarget.style.background = `${obj.color}08`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
                  }}
                >
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.97rem',
                      lineHeight: 1.7,
                      fontFamily: "'Inter', sans-serif",
                      margin: 0,
                    }}
                  >
                    {obj.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
