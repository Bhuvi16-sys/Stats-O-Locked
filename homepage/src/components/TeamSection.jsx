/**
 * TeamSection — branch: team-section
 *
 * Displays team members in a responsive grid. Each card shows:
 *  - Avatar (image or generated initials fallback)
 *  - Name
 *  - Role / designation
 *  - Social links (GitHub, LinkedIn, Twitter)
 *
 * Hover: translateY lift + border glow + social icons appear
 * Compatible with the existing Team.jsx page (can be used there too).
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, ExternalLink, X } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { containerVariants, cardVariants } from './SectionCard';

/* ─── Data ────────────────────────────────────────────────── */
const teamMembers = [
  {
    name: 'Bhuvnesh Sharma',
    role: 'President',
    department: 'B.Tech CSE (AI & ML)',
    avatar: null, // Replace with actual image path e.g. '/team/bhuvnesh.jpg'
    accent: '#00f0ff',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: null,
    },
  },
  {
    name: 'Shreya Agarwal',
    role: 'Vice President',
    department: 'B.Tech CSE (Data Science)',
    avatar: null,
    accent: '#7c3aed',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    name: 'Arjun Mehra',
    role: 'Technical Lead',
    department: 'B.Tech CSE (AI & ML)',
    avatar: null,
    accent: '#3b82f6',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: null,
    },
  },
  {
    name: 'Priya Nair',
    role: 'Research Head',
    department: 'M.Tech AI',
    avatar: null,
    accent: '#10b981',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    name: 'Rohan Gupta',
    role: 'Events Coordinator',
    department: 'B.Tech ECE',
    avatar: null,
    accent: '#f59e0b',
    socials: {
      github: null,
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    name: 'Ananya Singh',
    role: 'Design Lead',
    department: 'B.Tech CSE',
    avatar: null,
    accent: '#818cf8',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: null,
    },
  },
  {
    name: 'Karan Verma',
    role: 'ML Engineer',
    department: 'B.Tech CSE (AI & ML)',
    avatar: null,
    accent: '#00f0ff',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: null,
    },
  },
  {
    name: 'Divya Patel',
    role: 'Data Analyst',
    department: 'B.Tech CSE (Data Science)',
    avatar: null,
    accent: '#7c3aed',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
];

/* ─── Avatar fallback (initials circle) ──────────────────── */
function AvatarFallback({ name, accent }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      style={{
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        background: `${accent}18`,
        border: `2px solid ${accent}55`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '1.6rem',
        fontWeight: 700,
        color: accent,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

/* ─── Social icon row ─────────────────────────────────────── */
function SocialRow({ socials, accent }) {
  const links = [
    { key: 'github', Icon: GitBranch, label: 'GitHub' },
    { key: 'linkedin', Icon: ExternalLink, label: 'LinkedIn' },
    { key: 'twitter', Icon: X, label: 'Twitter / X' },
  ];

  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
      {links.map(({ key, Icon, label }) =>
        socials[key] ? (
          <motion.a
            key={key}
            href={socials[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ scale: 1.2, y: -3 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: `${accent}18`,
              border: `1px solid ${accent}33`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: accent,
              textDecoration: 'none',
              transition: 'background 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${accent}30`;
              e.currentTarget.style.borderColor = accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${accent}18`;
              e.currentTarget.style.borderColor = `${accent}33`;
            }}
          >
            <Icon size={15} />
          </motion.a>
        ) : null
      )}
    </div>
  );
}

/* ─── Individual Team Card ────────────────────────────────── */
function TeamCard({ member }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -12, scale: 1.03, transition: { duration: 0.25 } }}
      style={{
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(16px)',
        border: hovered
          ? `1px solid ${member.accent}55`
          : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        padding: '36px 24px 30px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        boxShadow: hovered
          ? `0 20px 60px ${member.accent}30, inset 0 0 40px rgba(255,255,255,0.01)`
          : 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Top gradient line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '30px',
          right: '30px',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${member.accent}, transparent)`,
          opacity: hovered ? 1 : 0.4,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Avatar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '18px',
        }}
      >
        <motion.div
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'relative',
            borderRadius: '50%',
          }}
        >
          {/* Glow ring */}
          <div
            style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: '50%',
              background: hovered
                ? `radial-gradient(circle, ${member.accent}50 0%, transparent 70%)`
                : 'transparent',
              transition: 'background 0.4s ease',
            }}
          />

          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: `2px solid ${member.accent}55`,
                position: 'relative',
                zIndex: 1,
              }}
            />
          ) : (
            <AvatarFallback name={member.name} accent={member.accent} />
          )}
        </motion.div>
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1.1rem',
          fontWeight: 700,
          color: '#fff',
          marginBottom: '6px',
        }}
      >
        {member.name}
      </h3>

      {/* Role — accent coloured */}
      <span
        style={{
          display: 'block',
          fontSize: '0.88rem',
          fontWeight: 600,
          color: member.accent,
          marginBottom: '4px',
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: '0.5px',
        }}
      >
        {member.role}
      </span>

      {/* Department */}
      <span
        style={{
          display: 'block',
          fontSize: '0.78rem',
          color: 'rgba(255,255,255,0.35)',
          marginBottom: '20px',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
        }}
      >
        {member.department}
      </span>

      {/* Social icons — animate in on hover */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: hovered ? 1 : 0.5, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.25 }}
        >
          <SocialRow socials={member.socials} accent={member.accent} />
        </motion.div>
      </AnimatePresence>

      {/* Bottom radial accent */}
      <div
        style={{
          position: 'absolute',
          bottom: '-24px',
          right: '-24px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${member.accent}18 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
}

/* ─── Main export ─────────────────────────────────────────── */
export default function TeamSection() {
  return (
    <section
      id="team"
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
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        <SectionHeader
          badge="Meet the Team"
          title={
            <>
              The Minds Behind{' '}
              <span className="gradient-text-cyan">Stats-O-Locked</span>
            </>
          }
          subtitle="Passionate students and researchers driving innovation in AI, data science, and open-source technology."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '24px',
          }}
        >
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
