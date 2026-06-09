import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section
      id="cta"
      style={{
        padding: '100px 0 120px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(0,240,255,0.06) 50%, rgba(59,130,246,0.08) 100%)',
        zIndex: 0,
      }} />

      {/* Grid overlay */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      {/* Glowing orbs */}
      <div style={{
        position: 'absolute',
        top: '-80px', left: '15%',
        width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 65%)',
        animation: 'floatSlow 8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-80px', right: '15%',
        width: '350px', height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 65%)',
        animation: 'floatSlow 10s ease-in-out infinite reverse',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 clamp(16px,4vw,40px)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 18px',
              borderRadius: '100px',
              background: 'rgba(124, 58, 237, 0.18)',
              border: '1px solid rgba(124, 58, 237, 0.5)',
              color: '#c4b5fd',
              fontSize: '0.82rem',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              letterSpacing: '0.5px',
              marginBottom: '32px',
            }}
          >
            <Sparkles size={14} />
            Be Part of Something Bigger
          </motion.div>

          {/* Heading */}
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: '24px',
          }}>
            <span style={{ color: '#fff' }}>Join the</span>
            <br />
            <span className="gradient-text">Future of AI & Data</span>
          </h2>

          {/* Sub text */}
          <p style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: 'clamp(0.88rem,2.5vw,1.05rem)',
            maxWidth: '560px',
            margin: '0 auto 48px',
            lineHeight: 1.75,
          }}>
            Connect with 70+ passionate minds, work on cutting-edge projects, and accelerate your journey in the world of data and artificial intelligence.
          </p>

          {/* CTA */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              onClick={() => {
                const el = document.getElementById('cta');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-neon btn-neon-primary"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              style={{
                cursor: 'pointer',
                border: 'none',
                padding: '14px 40px',
                fontSize: '1rem',
              }}
            >
              Join Now <ArrowRight size={18} />
            </motion.button>
            <motion.button
              onClick={() => {
                const el = document.getElementById('events');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-neon btn-neon-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{ cursor: 'pointer', border: 'none', padding: '14px 32px', fontSize: '1rem' }}
            >
              See Events
            </motion.button>
          </div>

          {/* Social proof badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              marginTop: '60px',
              display: 'flex',
              justifyContent: 'center',
              gap: 'clamp(16px,4vw,40px)',
              flexWrap: 'wrap',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              paddingTop: '40px',
            }}
          >
            {[
              { platform: 'Instagram', handle: '@sol_vitb', color: '#e1306c' },
              { platform: 'LinkedIn', handle: 'Stats-O-Locked Club', color: '#0077b5' },
              { platform: 'Email', handle: 'solclub@vitbhopal.ac.in', color: '#00f0ff' },
            ].map((s) => (
              <div key={s.platform} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}>
                  {s.platform}
                </div>
                <div style={{
                  color: s.color,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.88rem',
                  fontWeight: 500,
                }}>
                  {s.handle}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
