/**
 * SectionHeader — Reusable section header component.
 * Renders a pill badge, h2 heading with gradient span, and subtitle paragraph.
 * Matches existing Cards.jsx header pattern.
 *
 * Props:
 *  - badge       : string for the pill label (e.g. "What We Do")
 *  - title       : React node — the main heading (use <span className="gradient-text-cyan"> inside)
 *  - subtitle    : string subtitle
 *  - align       : 'center' | 'left' (default: 'center')
 */

import { motion } from 'framer-motion';

export default function SectionHeader({ badge, title, subtitle, align = 'center' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      style={{ textAlign: align, marginBottom: '70px' }}
    >
      {badge && (
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
          {badge}
        </span>
      )}

      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          color: '#fff',
          marginBottom: '16px',
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1rem',
            maxWidth: '500px',
            margin: align === 'center' ? '0 auto' : '0',
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
