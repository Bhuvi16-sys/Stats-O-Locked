/**
 * Testimonials Section
 *
 * Displays member reviews in a 3-column masonry-style grid.
 * Each card shows:
 *  - Star rating
 *  - Review text (quoted)
 *  - User avatar (image or initials fallback)
 *  - Name + designation
 *
 * Hover: glow border + translateY lift
 * Auto-scrolling marquee on mobile / single row.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { containerVariants, cardVariants } from './SectionCard';

/* ─── Testimonial data ────────────────────────────────────── */
const testimonials = [
  {
    name: 'Ritika Joshi',
    designation: 'SWE Intern @ Google',
    batch: 'B.Tech CSE, 2024',
    avatar: null,
    accent: '#00f0ff',
    stars: 5,
    review:
      'Stats-O-Locked completely transformed how I approach problem-solving. The Kaggle workshops got me from zero to silver medal in just 3 months. Best decision of my college life!',
  },
  {
    name: 'Akshat Jain',
    designation: 'Data Scientist @ Flipkart',
    batch: 'B.Tech AI, 2023',
    avatar: null,
    accent: '#7c3aed',
    stars: 5,
    review:
      'The mentorship network here is unreal. I got connected with a senior at Microsoft who guided my entire placement prep. The club is a real launchpad.',
  },
  {
    name: 'Sneha Pillai',
    designation: 'Research Scholar, IIT Delhi',
    batch: 'B.Tech DS, 2024',
    avatar: null,
    accent: '#3b82f6',
    stars: 5,
    review:
      'My first research paper was born in a SOL hackathon. The collaborative culture and access to GPUs made it possible to run experiments I wouldn\'t have imagined otherwise.',
  },
  {
    name: 'Varun Malhotra',
    designation: 'ML Engineer @ Razorpay',
    batch: 'B.Tech ECE, 2023',
    avatar: null,
    accent: '#10b981',
    stars: 5,
    review:
      'Every weekend workshop taught me something new. The community is incredibly supportive — no gatekeeping, just pure knowledge sharing. Highly recommend to any tech enthusiast.',
  },
  {
    name: 'Meera Krishnan',
    designation: 'Product Analyst @ Swiggy',
    batch: 'MBA Business Analytics, 2024',
    avatar: null,
    accent: '#f59e0b',
    stars: 5,
    review:
      'I joined with zero coding experience. The structured learning path and peer support helped me crack my first SQL interview. Stats-O-Locked bridges the gap between theory and industry.',
  },
  {
    name: 'Harsh Kapoor',
    designation: 'Founder, DataBridge AI',
    batch: 'B.Tech CSE, 2022',
    avatar: null,
    accent: '#818cf8',
    stars: 5,
    review:
      'The people I met in SOL are my co-founders today. This club doesn\'t just teach you skills — it builds your tribe. The alumni network continues to pay dividends years later.',
  },
];

/* ─── Star rating ─────────────────────────────────────────── */
function StarRating({ count = 5, accent }) {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < count ? accent : 'transparent'}
          color={i < count ? accent : 'rgba(255,255,255,0.2)'}
        />
      ))}
    </div>
  );
}

/* ─── Avatar fallback ─────────────────────────────────────── */
function Avatar({ name, src, accent, size = 44 }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          border: `2px solid ${accent}55`,
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `${accent}18`,
        border: `2px solid ${accent}44`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.85rem',
        fontWeight: 700,
        color: accent,
        fontFamily: "'Space Grotesk', sans-serif",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

/* ─── Testimonial Card ────────────────────────────────────── */
function TestimonialCard({ t }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -10, transition: { duration: 0.25 } }}
      style={{
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(16px)',
        border: hovered
          ? `1px solid ${t.accent}55`
          : '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
        padding: '32px 28px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        boxShadow: hovered
          ? `0 16px 50px ${t.accent}25`
          : 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Top gradient line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '24px',
          right: '24px',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`,
          opacity: hovered ? 0.9 : 0.4,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Quote icon — large background */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          opacity: 0.06,
        }}
      >
        <Quote size={60} color={t.accent} />
      </div>

      {/* Stars */}
      <StarRating count={t.stars} accent={t.accent} />

      {/* Review text */}
      <p
        style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.93rem',
          lineHeight: 1.75,
          marginBottom: '24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        "{t.review}"
      </p>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: 'rgba(255,255,255,0.06)',
          marginBottom: '20px',
        }}
      />

      {/* Author row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar name={t.name} src={t.avatar} accent={t.accent} />
        <div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '0.95rem',
              color: '#fff',
              marginBottom: '2px',
            }}
          >
            {t.name}
          </div>
          <div
            style={{
              fontSize: '0.78rem',
              color: t.accent,
              fontWeight: 500,
              marginBottom: '2px',
            }}
          >
            {t.designation}
          </div>
          <div
            style={{
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
            }}
          >
            {t.batch}
          </div>
        </div>
      </div>

      {/* Corner radial */}
      <div
        style={{
          position: 'absolute',
          bottom: '-20px',
          right: '-20px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${t.accent}18 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
}

/* ─── Main export ─────────────────────────────────────────── */
export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        padding: '120px 0 100px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient blobs */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '-80px',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '-60px',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        <SectionHeader
          badge="Testimonials"
          title={
            <>
              Voices of Our{' '}
              <span className="gradient-text-cyan">Community</span>
            </>
          }
          subtitle="Don't just take our word for it — hear from students who built their careers with Stats-O-Locked."
        />

        {/* 3-column grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </motion.div>

        {/* Trust badges strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            marginTop: '64px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '200+', label: 'Active Members' },
            { value: '4.9 / 5', label: 'Avg. Rating' },
            { value: '95%', label: 'Would Recommend' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{ textAlign: 'center' }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: '#00f0ff',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.35)',
                  textTransform: 'uppercase',
                  letterSpacing: '1.2px',
                  marginTop: '6px',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
