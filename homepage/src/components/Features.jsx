/**
 * Features Section — branch: features
 *
 * Showcases 6 club features in a 3-column grid using the reusable SectionCard.
 * Alternating row layout: left text block + right feature grid for the first
 * "hero" feature, then a 3-col grid for the rest.
 * All animations use framer-motion whileInView for scroll-triggered entrance.
 */

import { motion } from 'framer-motion';
import {
  Trophy,
  Users,
  BookOpen,
  Zap,
  Globe,
  Cpu,
} from 'lucide-react';
import SectionCard, { containerVariants } from './SectionCard';
import SectionHeader from './SectionHeader';

const features = [
  {
    icon: Trophy,
    title: 'Competitive Excellence',
    description:
      'Participate in national hackathons, Kaggle competitions, and data challenges. Our members consistently rank in the top tier.',
    color: '#00f0ff',
    glow: 'rgba(0,240,255,0.25)',
    borderGlow: 'rgba(0,240,255,0.5)',
  },
  {
    icon: BookOpen,
    title: 'Workshops & Learning',
    description:
      'Weekly hands-on workshops covering ML, NLP, Computer Vision, and more — taught by seniors and industry experts.',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.35)',
    borderGlow: 'rgba(124,58,237,0.5)',
  },
  {
    icon: Users,
    title: 'Mentorship Network',
    description:
      'Get paired with experienced mentors from top companies and research labs who guide you through your data journey.',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.3)',
    borderGlow: 'rgba(59,130,246,0.5)',
  },
  {
    icon: Zap,
    title: 'Rapid Prototyping',
    description:
      'Build end-to-end AI projects in days, not months. Our sprint culture and resource access accelerate your learning.',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.25)',
    borderGlow: 'rgba(245,158,11,0.5)',
  },
  {
    icon: Globe,
    title: 'Open Source Impact',
    description:
      'Ship real tools used by thousands. Our open-source projects have starred contributors from 20+ countries.',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.25)',
    borderGlow: 'rgba(16,185,129,0.5)',
  },
  {
    icon: Cpu,
    title: 'GPU & Cloud Access',
    description:
      'Access shared GPUs, cloud credits, and high-performance computing resources for your research and projects.',
    color: '#818cf8',
    glow: 'rgba(129,140,248,0.25)',
    borderGlow: 'rgba(129,140,248,0.5)',
  },
];

export default function Features() {
  return (
    <section
      id="features"
      style={{
        padding: '120px 0 100px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background blobs */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '-100px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-80px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        <SectionHeader
          badge="Why Join Us"
          title={
            <>
              Everything You Need to{' '}
              <span className="gradient-text-cyan">Level Up</span>
            </>
          }
          subtitle="From workshops to competitions, mentorship to cloud access — we've built the complete ecosystem for your data & AI journey."
        />

        {/* 3-column features grid */}
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
          {features.map((feat) => (
            <SectionCard
              key={feat.title}
              icon={feat.icon}
              title={feat.title}
              description={feat.description}
              color={feat.color}
              glow={feat.glow}
              borderGlow={feat.borderGlow}
            />
          ))}
        </motion.div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            marginTop: '64px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
            200+ members already unlocking their potential
          </span>
          <motion.a
            href="#contact"
            className="btn-neon btn-neon-primary no-underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ fontSize: '0.88rem', padding: '10px 28px' }}
          >
            Apply Now →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
