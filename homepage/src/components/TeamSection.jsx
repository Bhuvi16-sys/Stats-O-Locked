/**
 * TeamSection.jsx
 *
 * Displays team members in structured categories:
 *  - Leadership Team
 *  - Department Leads
 *  - Core Members Banner
 *
 * Each card features dynamic initials fallback, role accent coloration, and hover glow effects.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, ExternalLink, X } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { containerVariants, cardVariants } from './SectionCard';

/* ─── Data ────────────────────────────────────────────────── */
const leadershipTeam = [
  {
    name: 'Shivam Waghule',
    name: 'Shivam Waghule',
    role: 'President',
    department: 'Stats-O-Locked Leadership',
    avatar: null,
    accent: '#00f0ff',
    category: 'Leadership',
    socials: {
      github: null,
      linkedin: 'https://www.linkedin.com/company/stats-o-locked-club/',
      twitter: null,
    },
  },
  {
    name: 'Shagun Gupta',
    name: 'Shagun Gupta',
    role: 'Vice President',
    department: 'Stats-O-Locked Leadership',
    avatar: null,
    accent: '#7c3aed',
    category: 'Leadership',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: null,
    },
  },
  {
    name: 'Khyati Mourya',
    role: 'General Secretary',
    department: 'Stats-O-Locked Leadership',
    avatar: null,
    accent: '#3b82f6',
    category: 'Leadership',
    socials: {
      github: null,
      linkedin: 'https://www.linkedin.com/company/stats-o-locked-club/',
      twitter: null,
    },
  },
  {
    name: 'Piyush Singh',
    role: 'Operational Manager',
    department: 'Stats-O-Locked Leadership',
    avatar: null,
    accent: '#10b981',
    category: 'Leadership',
    socials: {
      github: null,
      linkedin: 'https://www.linkedin.com/company/stats-o-locked-club/',
      twitter: null,
    },
  },

  // Department Leads & Co-Leads
  {
    name: 'Bhuvi Jain',
    role: 'Technical Lead',
    department: 'Technical',
    avatar: null,
    accent: '#00f0ff',
    category: 'Department Leads',
    socials: {
      github: null,
      linkedin: 'https://www.linkedin.com/company/stats-o-locked-club/',
      twitter: null,
    },
  },
  {
    name: 'Ankit',
    role: 'Technical Co-Lead',
    department: 'Technical',
    avatar: null,
    accent: '#7c3aed',
    category: 'Department Leads',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: null,
    },
  },
];

const departmentLeads = [
  {
    name: 'Bhuvi Jain',
    role: 'Technical Lead',
    department: 'Technical Department',
    avatar: null,
    accent: '#00f0ff',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: null,
    },
  },
  {
    name: 'Ankit',
    role: 'Technical Co-Lead',
    department: 'Technical Department',
    avatar: null,
    accent: '#3b82f6',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: null,
    },
  },
  {
    name: 'Yug Wankhede',
    role: 'Event Management Lead',
    department: 'Events Department',
    avatar: null,
    accent: '#f59e0b',
    category: 'Department Leads',
    socials: {
      github: null,
      linkedin: 'https://www.linkedin.com/company/stats-o-locked-club/',
      twitter: null,
    },
  },
  {
    name: 'Sampada Seth',
    role: 'Event Management Co-Lead',
    department: 'Event Management',
    avatar: null,
    accent: '#10b981',
    category: 'Department Leads',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: null,
    },
  },
  {
    name: 'Sampada Seth & Kashika',
    role: 'Event Management Co-Lead',
    department: 'Events Department',
    avatar: null,
    accent: '#818cf8',
    category: 'Department Leads',
    socials: {
      github: null,
      linkedin: 'https://www.linkedin.com/company/stats-o-locked-club/',
      twitter: null,
    },
  },
  {
    name: 'Payal Beura',
    role: 'Creative Lead',
    department: 'Creative',
    avatar: null,
    accent: '#ff4d94',
    category: 'Department Leads',
    socials: {
      github: null,
      linkedin: 'https://www.linkedin.com/company/stats-o-locked-club/',
      twitter: null,
    },
  },
  {
    name: 'Shubhankar',
    role: 'Creative Co-Lead',
    department: 'Creative',
    avatar: null,
    accent: '#f59e0b',
    category: 'Department Leads',
    socials: {
      github: null,
      linkedin: 'https://www.linkedin.com/company/stats-o-locked-club/',
      twitter: null,
    },
  },
  {
    name: 'Shivanya Tomar',
    role: 'Research Lead',
    department: 'Research',
    avatar: null,
    accent: '#3b82f6',
    category: 'Department Leads',
    socials: {
      github: null,
      linkedin: 'https://www.linkedin.com/company/stats-o-locked-club/',
      twitter: null,
    },
  },
  {
    name: 'Payal Beura',
    role: 'Creative Lead',
    department: 'Creative Department',
    avatar: null,
    accent: '#ec4899',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: null,
    },
  },
  {
    name: 'Shubhankar',
    role: 'Creative Co-Lead',
    department: 'Creative Department',
    avatar: null,
    accent: '#f43f5e',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: null,
    },
  },
  {
    name: 'Shivanya Tomar',
    role: 'Research Lead',
    department: 'Research Department',
    avatar: null,
    accent: '#10b981',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: null,
    },
  },
  {
    name: 'Murtuza Ansari',
    role: 'Research Co-Lead',
    department: 'Research Department',
    avatar: null,
    accent: '#059669',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: null,
    },
  },
  {
    name: 'Hamza',
    role: 'Social Media Lead',
    department: 'Social Media Department',
    avatar: null,
    accent: '#f59e0b',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: null,
    },
  },
  {
    name: 'Rajnaryan Pawar',
    role: 'Photography Lead',
    department: 'Photography Department',
    avatar: null,
    accent: '#00f0ff',
    category: 'Department Leads',
    socials: {
      github: null,
      linkedin: 'https://www.linkedin.com/company/stats-o-locked-club/',
      twitter: null,
    },
  },
  {
    name: 'Hamza',
    role: 'Social Media Lead',
    department: 'Social Media',
    avatar: null,
    accent: '#e1306c',
    category: 'Department Leads',
    socials: {
      github: null,
      linkedin: 'https://www.linkedin.com/company/stats-o-locked-club/',
      twitter: null,
    },
  },
  {
    name: 'Sankalp',
    role: 'PR & Outreach Lead',
    department: 'PR & Outreach Department',
    avatar: null,
    accent: '#7c3aed',
    category: 'Department Leads',
    socials: {
      github: null,
      linkedin: 'https://www.linkedin.com/company/stats-o-locked-club/',
      twitter: null,
    },
  },
  {
    name: 'Sankalp',
    role: 'PR & Outreach Lead',
    department: 'PR & Outreach',
    avatar: null,
    accent: '#f59e0b',
    category: 'Department Leads',
    socials: {
      github: null,
      linkedin: 'https://www.linkedin.com/company/stats-o-locked-club/',
      twitter: null,
    },
  },
  {
    name: 'Raksha',
    role: 'PR & Outreach Co-Lead',
    department: 'PR & Outreach',
    avatar: null,
    accent: '#10b981',
    category: 'Department Leads',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: null,
    },
  },
  {
    name: 'Raksha',
    role: 'PR & Outreach Co-Lead',
    department: 'PR & Outreach Department',
    avatar: null,
    accent: '#c084fc',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: null,
    },
  },
];

/* ─── Avatar fallback (initials circle) ──────────────────── */
function AvatarFallback({ name, accent }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
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
  const leadership = teamMembers.filter((m) => m.category === 'Leadership');
  const departmentLeads = teamMembers.filter((m) => m.category === 'Department Leads');

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
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '70%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(0,240,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="px-6 md:px-10" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <SectionHeader
          badge="Meet the Team"
          title={
            <>
              The Minds Behind{' '}
              <span className="gradient-text-cyan">Stats-O-Locked</span>
            </>
          }
          subtitle="Our club is led by a passionate and dedicated team committed to growth, innovation, and excellence."
        />

        {/* 1. Leadership Team Section */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '30px',
            textAlign: 'center',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            background: 'linear-gradient(90deg, #fff, rgba(255,255,255,0.7))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Leadership Team
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            {leadershipTeam.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </motion.div>
        </div>

        {/* 2. Department Leads Section */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '30px',
            textAlign: 'center',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            background: 'linear-gradient(90deg, #fff, rgba(255,255,255,0.7))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Department Leads
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {departmentLeads.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </motion.div>
        </div>

        {/* 3. Core Members Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          style={{
            maxWidth: '900px',
            margin: '60px auto 0',
            padding: '40px',
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            textAlign: 'center',
            boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05), 0 20px 40px rgba(0,0,0,0.3)',
          }}
        >
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '16px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #00f0ff, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Core Members
          </h2>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.05rem',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: '1.6',
            maxWidth: '650px',
            margin: '0 auto',
          }}>
            Our core members are the backbone of the club, actively contributing to planning, execution, and success of all initiatives and events.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
