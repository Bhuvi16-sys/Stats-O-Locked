/**
 * SectionCard — Generic reusable card component.
 * Supports icon, accent color, glow hover effect, top gradient line,
 * and a corner radial accent — matching the existing Cards.jsx pattern.
 *
 * Props:
 *  - icon        : Lucide icon component (optional)
 *  - title       : string
 *  - description : string (or React node)
 *  - color       : hex accent color string (default cyan)
 *  - glow        : rgba string for box-shadow glow
 *  - borderGlow  : rgba/hex string for border color on hover
 *  - tag         : small label above the title (optional)
 *  - footer      : React node rendered at the bottom (optional)
 *  - children    : additional content
 */

import { motion } from 'framer-motion';

export const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function SectionCard({
  icon: Icon,
  title,
  description,
  color = '#00f0ff',
  glow = 'rgba(0,240,255,0.25)',
  borderGlow = 'rgba(0,240,255,0.5)',
  tag,
  footer,
  children,
  style = {},
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.25 } }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = borderGlow;
        e.currentTarget.style.boxShadow = `0 20px 60px ${glow}, inset 0 0 40px rgba(255,255,255,0.02)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        padding: '36px 32px',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        ...style,
      }}
    >
      {/* Top gradient accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '30px',
          right: '30px',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          opacity: 0.6,
        }}
      />

      {/* Optional tag */}
      {tag && (
        <span
          style={{
            display: 'inline-block',
            padding: '3px 12px',
            borderRadius: '100px',
            background: `${color}18`,
            border: `1px solid ${color}44`,
            color,
            fontSize: '0.72rem',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: '18px',
          }}
        >
          {tag}
        </span>
      )}

      {/* Icon */}
      {Icon && (
        <motion.div
          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            background: `${color}1a`,
            border: `1px solid ${color}33`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <Icon size={26} color={color} />
        </motion.div>
      )}

      {/* Title */}
      {title && (
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.2rem',
            fontWeight: 600,
            color: '#fff',
            marginBottom: '12px',
          }}
        >
          {title}
        </h3>
      )}

      {/* Description */}
      {description && (
        <p
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.93rem',
            lineHeight: 1.7,
          }}
        >
          {description}
        </p>
      )}

      {/* Slot for custom children */}
      {children}

      {/* Footer slot */}
      {footer && (
        <div style={{ marginTop: '20px' }}>{footer}</div>
      )}

      {/* Bottom-right radial accent */}
      <div
        style={{
          position: 'absolute',
          bottom: '-20px',
          right: '-20px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
}
