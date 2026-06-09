import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import SectionHeader from './SectionHeader';

const SOL_LI = 'https://www.linkedin.com/company/stats-o-locked-club/';

const faculty = {
  name: 'Dr. Jyoti Badge',
  role: 'Faculty Coordinator',
  department: 'School of Advanced Science and Language, VIT Bhopal',
  avatar: '/pics/team/jyoti-badge.webp',
  accent: '#f59e0b',
  linkedin: SOL_LI,
  bio: 'Dr. Jyoti Badge serves as the Faculty Coordinator of Stats-O-Locked, guiding the club with her expertise and academic leadership from the School of Advanced Science and Language at VIT Bhopal. Her mentorship and support have been instrumental in shaping the club\'s vision and fostering a culture of research-driven innovation.',
};

const departments = [
  {
    name: 'Leadership', icon: '🏛️', accent: '#00f0ff',
    members: [
      { name: 'Shivam Waghule',   role: 'President',                avatar: '/pics/team/shivam-waghule.webp',   accent: '#00f0ff', linkedin: 'https://www.linkedin.com/in/shivam-waghule-6a0763319/', bio: 'Visionary leader steering Stats-O-Locked toward excellence. Drives strategic direction, fosters a culture of innovation, and ensures the club creates meaningful impact for every member.' },
      { name: 'Shagun Gupta',     role: 'Vice President',           avatar: '/pics/team/shagun-gupta.webp',     accent: '#7c3aed', linkedin: 'https://www.linkedin.com/in/shaguna0031/', bio: 'Bridges leadership and execution across all departments. Passionate about community building and mentoring the next generation of student leaders at VIT Bhopal.' },
      { name: 'Khyati Mourya',    role: 'General Secretary',        avatar: '/pics/team/khyati-mourya.webp',    accent: '#3b82f6', linkedin: 'https://www.linkedin.com/in/khyati-mourya-01kt/', bio: 'The organizational backbone of the club. Ensures seamless coordination between departments, manages communications, and keeps every initiative running on track.' },
      { name: 'Piyush Singh',     role: 'Operations Manager',       avatar: '/pics/team/piyush-singh.webp',     accent: '#10b981', linkedin: 'https://www.linkedin.com/in/piyush-kumar-singh-b53749313/', bio: 'Oversees end-to-end operations of all club activities. Expert in logistics and resource management, ensuring every event is executed flawlessly.' },
    ],
  },
  {
    name: 'Technical', icon: '⚡', accent: '#00f0ff',
    members: [
      { name: 'Bhuvi Jain',       role: 'Technical Lead',           avatar: '/pics/team/bhuvi-jain.webp',       accent: '#00f0ff', linkedin: 'https://www.linkedin.com/in/bhuvi-jain-370733306/', bio: 'Leads the technical wing with expertise in data science and software development. Champions tech-driven solutions and guides the team in building innovative projects.' },
      { name: 'Ankit Mahadani',   role: 'Technical Co-Lead',        avatar: '/pics/team/ankit-mahadani.webp',   accent: '#7c3aed', linkedin: 'https://www.linkedin.com/in/ankitmahadani/', bio: "Full-stack developer and co-architect of the club's digital presence. Passionate about web technologies, AI tools, and turning complex ideas into working products." },
    ],
  },
  {
    name: 'Events', icon: '🎪', accent: '#f59e0b',
    members: [
      { name: 'Yug Wankhede',     role: 'Event Management Lead',    avatar: '/pics/team/yug-wankhede.webp',     accent: '#f59e0b', linkedin: 'https://www.linkedin.com/in/yug-wankhede-166930307/', bio: 'Master of ceremonies and event architect. Conceptualises and executes high-energy events like TechCorp Summit and Techila Unplugged from the ground up.' },
      { name: 'Sampada Seth',     role: 'Event Management Co-Lead', avatar: '/pics/team/sampada-seth.webp',     accent: '#10b981', linkedin: 'https://www.linkedin.com/in/sampada-seth-a77969324/', bio: 'Detail-oriented co-lead who ensures every event element — from scheduling to participant experience — is perfectly polished and memorable.' },
      { name: 'Kashika Agrawal',  role: 'Event Management Co-Lead', avatar: '/pics/team/kashika-agrawal.webp',  accent: '#818cf8', linkedin: 'https://www.linkedin.com/in/kashika-agrawal-1a2601339/', bio: 'Brings creative energy and strong coordination skills to every event. Manages registrations, volunteer teams, and on-ground logistics with precision.' },
    ],
  },
  {
    name: 'Creative', icon: '🎨', accent: '#ff4d94',
    members: [
      { name: 'Payal Beura',      role: 'Creative Lead',            avatar: '/pics/team/payal-beura.webp',      accent: '#ff4d94', linkedin: 'https://www.linkedin.com/in/payal-beura-85410b309/', bio: "The creative force behind the club's visual identity. Designs stunning graphics, branding assets, and campaigns that make Stats-O-Locked stand out on campus." },
      { name: 'Shubhankar Kumar', role: 'Creative Co-Lead',         avatar: '/pics/team/shubhankar-kumar.webp', accent: '#f59e0b', linkedin: 'https://www.linkedin.com/in/shubhankar-kumar-84987a33b/', bio: "Motion designer and visual storyteller. Crafts engaging content that communicates the club's energy and achievements across all platforms." },
    ],
  },
  {
    name: 'Editing', icon: '🎬', accent: '#f43f5e',
    members: [
      { name: 'Vansh Chauhan',    role: 'Editing Lead',             avatar: '/pics/team/vansh-chauhan.webp',    accent: '#f43f5e', linkedin: 'https://www.linkedin.com/in/vansh-chauhan-270005385/', bio: 'Creative editor and visual storyteller leading the editing wing of Stats-O-Locked. Brings a sharp eye for detail and a passion for producing high-quality content that captures the club\'s energy.' },
      { name: 'Amber Sharma',     role: 'Editing Co-Lead',          avatar: '/pics/team/amber-sharma.webp',     accent: '#f43f5e', linkedin: 'https://www.linkedin.com/in/amber-sharma-a9b862391', bio: 'Video editor and content curator with a sharp eye for storytelling. Transforms raw footage and ideas into polished, share-worthy content for the club.' },
    ],
  },
  {
    name: 'Research', icon: '🔬', accent: '#3b82f6',
    members: [
      { name: 'Shivanya Tomar',   role: 'Research Lead',            avatar: '/pics/team/shivanya-tomar.webp',   accent: '#3b82f6', linkedin: 'https://www.linkedin.com/in/shivanya-tomar-15145a324/', bio: "Drives the club's intellectual agenda. Leads research initiatives in AI, data analytics, and emerging tech, turning insights into actionable learning for members." },
      { name: 'Murtaza Ansari',   role: 'Research Co-Lead',         avatar: '/pics/team/murtaza-ansari.webp',   accent: '#059669', linkedin: 'https://www.linkedin.com/in/murtaza-ansari-72318b327/', bio: 'Data enthusiast and research collaborator. Explores cutting-edge topics, compiles findings, and produces knowledge resources for the community.' },
    ],
  },
  {
    name: 'Social Media', icon: '📱', accent: '#e1306c',
    members: [
      { name: 'Mohammad Hamza',   role: 'Social Media Lead',        avatar: '/pics/team/mohammad-hamza.webp',   accent: '#e1306c', linkedin: 'https://www.linkedin.com/in/mohammad-hamza-ba051a316/', bio: "The voice of Stats-O-Locked online. Manages all social channels with compelling content strategy, growing the club's digital footprint and keeping the community engaged." },
      { name: 'Shamique Khan',    role: 'Social Media Co-Lead',     avatar: '/pics/team/shamique-khan.webp',    accent: '#c13584', linkedin: 'https://www.linkedin.com/in/shamique-khan/', bio: 'Co-leads the social media wing with a sharp eye for engaging content and digital trends. Helps craft and amplify Stats-O-Locked\'s online presence across all platforms.' },
    ],
  },
  {
    name: 'PR & Outreach', icon: '🤝', accent: '#7c3aed',
    members: [
      { name: 'Sankalp Bhawsar',  role: 'PR & Outreach Lead',       avatar: '/pics/team/sankalp-bhawsar.webp',  accent: '#7c3aed', linkedin: 'https://www.linkedin.com/in/sankalp-bhawsar-73434b313/', bio: "Builds and nurtures relationships beyond campus. Leads outreach to industry partners, sponsors, and collaborators, expanding the club's reach and opportunities." },
      { name: 'Priyanshi Vyas',   role: 'PR & Outreach Co-Lead',    avatar: '/pics/team/priyanshi-vyas.webp',   accent: '#c084fc', linkedin: 'https://www.linkedin.com/in/priyanshi-vyas-564310331', bio: "Crafts compelling narratives about the club's work and facilitates partnerships. Passionate about communication, networking, and building the SOL brand." },
    ],
  },
];

/* ─── Avatar ──────────────────────────────────────────────────── */
function Avatar({ member, size = 88 }) {
  const [err, setErr] = useState(false);
  const initials = member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  if (member.avatar && !err) {
    return (
      <img src={member.avatar} alt={member.name} loading="lazy" decoding="async"
        onError={() => setErr(true)}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover',
          objectPosition: 'top', border: `2px solid ${member.accent}66`,
          position: 'relative', zIndex: 1, display: 'block', flexShrink: 0 }} />
    );
  }
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: `${member.accent}18`, border: `2px solid ${member.accent}55`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Space Grotesk',sans-serif",
      fontSize: size * 0.28, fontWeight: 700, color: member.accent }}>
      {initials}
    </div>
  );
}

/* ─── Modal ───────────────────────────────────────────────────── */
function MemberModal({ member, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(2,11,22,0.88)', backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 24 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 460,
          background: 'rgba(8,18,38,0.97)',
          border: `1px solid ${member.accent}55`,
          borderRadius: 28, padding: '44px 36px 36px',
          position: 'relative',
          boxShadow: `0 0 80px ${member.accent}22, 0 32px 64px rgba(0,0,0,0.6)`,
          textAlign: 'center' }}
      >
        <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1,
          background: `linear-gradient(90deg,transparent,${member.accent},transparent)` }} />
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16,
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50%', width: 34, height: 34, cursor: 'pointer',
          color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <X size={15} />
        </button>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: -8, borderRadius: '50%',
              background: `radial-gradient(circle,${member.accent}35 0%,transparent 70%)` }} />
            <Avatar member={member} size={110} />
          </div>
        </div>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.4rem',
          fontWeight: 700, color: '#fff', marginBottom: 8 }}>{member.name}</h2>
        <span style={{ display: 'inline-block', fontSize: '0.8rem', fontWeight: 600,
          color: member.accent, marginBottom: 22,
          background: `${member.accent}15`, border: `1px solid ${member.accent}33`,
          padding: '3px 14px', borderRadius: 999,
          fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '0.5px' }}>
          {member.role}
        </span>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.92rem',
          lineHeight: 1.8, fontFamily: "'Inter',sans-serif",
          marginBottom: 28, textAlign: 'left' }}>{member.bio}</p>
        <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 24px', borderRadius: 50,
            background: `${member.accent}18`, border: `1px solid ${member.accent}44`,
            color: member.accent, textDecoration: 'none',
            fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.82rem', fontWeight: 600,
            letterSpacing: '0.5px', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = `${member.accent}30`}
          onMouseLeave={e => e.currentTarget.style.background = `${member.accent}18`}>
          <ExternalLink size={14} /> View LinkedIn
        </a>
      </motion.div>
    </motion.div>
  );
}

/* ─── Regular card (3–4 members) ─────────────────────────────── */
function TeamCard({ member, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(member)}
      whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.97 }}
      style={{ width: 220, background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(16px)',
        border: hovered ? `1px solid ${member.accent}66` : '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20, padding: '32px 18px 24px',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: hovered ? `0 20px 50px ${member.accent}22` : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s' }}
    >
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
        background: `linear-gradient(90deg,transparent,${member.accent},transparent)`,
        opacity: hovered ? 1 : 0.3, transition: 'opacity 0.3s' }} />
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <motion.div animate={{ scale: hovered ? 1.07 : 1 }} transition={{ duration: 0.25 }}
          style={{ position: 'relative', borderRadius: '50%' }}>
          <div style={{ position: 'absolute', inset: -5, borderRadius: '50%',
            background: hovered ? `radial-gradient(circle,${member.accent}38 0%,transparent 70%)` : 'transparent',
            transition: 'background 0.4s' }} />
          <Avatar member={member} />
        </motion.div>
      </div>
      <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.98rem',
        fontWeight: 700, color: '#fff', marginBottom: 5 }}>{member.name}</h3>
      <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600,
        color: member.accent, fontFamily: "'Space Grotesk',sans-serif",
        marginBottom: 10, letterSpacing: '0.3px' }}>{member.role}</span>
      <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.72rem',
        lineHeight: 1.55, fontFamily: "'Inter',sans-serif",
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        overflow: 'hidden', marginBottom: 12 }}>{member.bio}</p>
      <span style={{ fontSize: '0.65rem', color: `${member.accent}88`,
        fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1.2px' }}>
        TAP TO VIEW →
      </span>
      <div style={{ position: 'absolute', bottom: -20, right: -20, width: 80, height: 80,
        borderRadius: '50%',
        background: `radial-gradient(circle,${member.accent}10 0%,transparent 70%)`,
        pointerEvents: 'none' }} />
    </motion.div>
  );
}

/* ─── Spotlight card (1–2 members, horizontal) ───────────────── */
function SpotlightCard({ member, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(member)}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      style={{ flex: '1 1 300px', maxWidth: 420,
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(16px)',
        border: hovered ? `1px solid ${member.accent}66` : '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20, padding: '24px 28px',
        display: 'flex', alignItems: 'center', gap: 22,
        cursor: 'pointer',
        boxShadow: hovered ? `0 16px 48px ${member.accent}22` : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', left: 0, top: '15%', bottom: '15%', width: 2,
        background: `linear-gradient(180deg,transparent,${member.accent},transparent)`,
        opacity: hovered ? 1 : 0.4, transition: 'opacity 0.3s' }} />
      <motion.div animate={{ scale: hovered ? 1.06 : 1 }} transition={{ duration: 0.25 }}
        style={{ position: 'relative', borderRadius: '50%', flexShrink: 0 }}>
        <div style={{ position: 'absolute', inset: -4, borderRadius: '50%',
          background: hovered ? `radial-gradient(circle,${member.accent}38 0%,transparent 70%)` : 'transparent',
          transition: 'background 0.4s' }} />
        <Avatar member={member} size={76} />
      </motion.div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1rem',
          fontWeight: 700, color: '#fff', marginBottom: 3 }}>{member.name}</h3>
        <span style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600,
          color: member.accent, fontFamily: "'Space Grotesk',sans-serif", marginBottom: 8 }}>
          {member.role}
        </span>
        <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.72rem',
          lineHeight: 1.55, fontFamily: "'Inter',sans-serif",
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          overflow: 'hidden', marginBottom: 0 }}>{member.bio}</p>
      </div>
      <div style={{ position: 'absolute', bottom: -16, right: -16, width: 70, height: 70,
        borderRadius: '50%',
        background: `radial-gradient(circle,${member.accent}12 0%,transparent 70%)`,
        pointerEvents: 'none' }} />
    </motion.div>
  );
}

/* ─── Leadership featured card (bigger) ──────────────────────── */
function LeaderCard({ member, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(member)}
      whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.97 }}
      style={{ width: 230, background: 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(20px)',
        border: hovered ? `1px solid ${member.accent}77` : '1px solid rgba(255,255,255,0.1)',
        borderRadius: 24, padding: '40px 24px 30px',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: hovered
          ? `0 24px 60px ${member.accent}30, inset 0 1px 0 rgba(255,255,255,0.07)`
          : 'inset 0 1px 0 rgba(255,255,255,0.04)',
        transition: 'border-color 0.3s, box-shadow 0.3s' }}
    >
      <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
        background: `linear-gradient(90deg,transparent,${member.accent},transparent)`,
        opacity: hovered ? 1 : 0.5, transition: 'opacity 0.3s' }} />
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <motion.div animate={{ scale: hovered ? 1.08 : 1 }} transition={{ duration: 0.25 }}
          style={{ position: 'relative', borderRadius: '50%' }}>
          <div style={{ position: 'absolute', inset: -6, borderRadius: '50%',
            background: hovered ? `radial-gradient(circle,${member.accent}42 0%,transparent 70%)` : 'transparent',
            transition: 'background 0.4s' }} />
          <Avatar member={member} size={100} />
        </motion.div>
      </div>
      <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.05rem',
        fontWeight: 700, color: '#fff', marginBottom: 6 }}>{member.name}</h3>
      <span style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 600,
        color: member.accent, fontFamily: "'Space Grotesk',sans-serif",
        marginBottom: 12, background: `${member.accent}15`,
        border: `1px solid ${member.accent}30`, padding: '2px 12px', borderRadius: 999 }}>
        {member.role}
      </span>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem',
        lineHeight: 1.6, fontFamily: "'Inter',sans-serif",
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        overflow: 'hidden', marginBottom: 14 }}>{member.bio}</p>
      <span style={{ fontSize: '0.63rem', color: `${member.accent}88`,
        fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1.2px' }}>
        TAP TO VIEW →
      </span>
      <div style={{ position: 'absolute', bottom: -24, right: -24, width: 100, height: 100,
        borderRadius: '50%',
        background: `radial-gradient(circle,${member.accent}12 0%,transparent 70%)`,
        pointerEvents: 'none' }} />
    </motion.div>
  );
}

/* ─── Faculty Coordinator card ───────────────────────────────── */
function FacultyCard({ member, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: 48 }}
    >
      {/* Label above the card */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>🎓</span>
        <div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.1rem',
            fontWeight: 700, color: '#fff', letterSpacing: '2px',
            textTransform: 'uppercase', marginBottom: 2 }}>Faculty Coordinator</h2>
          <span style={{ fontSize: '0.7rem', color: `${member.accent}99`,
            fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1px' }}>
            Academic guidance &amp; mentorship
          </span>
        </div>
        <div style={{ flex: 1, height: 1, marginLeft: 8,
          background: `linear-gradient(90deg,${member.accent}60,transparent)` }} />
      </div>

      {/* Card */}
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onClick(member)}
        whileHover={{ y: -6, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.985 }}
        style={{
          background: hovered
            ? `linear-gradient(135deg, rgba(245,158,11,0.07) 0%, rgba(2,11,22,0.97) 100%)`
            : 'rgba(255,255,255,0.015)',
          backdropFilter: 'blur(20px)',
          border: hovered ? `1px solid ${member.accent}66` : `1px solid ${member.accent}25`,
          borderRadius: 24, padding: '36px 40px',
          display: 'flex', alignItems: 'center', gap: 36,
          cursor: 'pointer', position: 'relative', overflow: 'hidden',
          boxShadow: hovered ? `0 24px 60px ${member.accent}22, inset 0 1px 0 rgba(255,255,255,0.07)` : 'none',
          transition: 'border-color 0.3s, box-shadow 0.3s, background 0.3s',
        }}
      >
        {/* Top accent line */}
        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 2,
          background: `linear-gradient(90deg,transparent,${member.accent},transparent)`,
          opacity: hovered ? 1 : 0.5, transition: 'opacity 0.3s', borderRadius: 2 }} />

        {/* Avatar with ring */}
        <motion.div
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.25 }}
          style={{ position: 'relative', borderRadius: '50%', flexShrink: 0 }}
        >
          <div style={{ position: 'absolute', inset: -8, borderRadius: '50%',
            background: hovered ? `radial-gradient(circle,${member.accent}40 0%,transparent 70%)` : `radial-gradient(circle,${member.accent}18 0%,transparent 70%)`,
            transition: 'background 0.4s' }} />
          {/* Gold ring */}
          <div style={{ position: 'absolute', inset: -4, borderRadius: '50%',
            border: `2px solid ${member.accent}50`, transition: 'border-color 0.3s' }} />
          <Avatar member={member} size={110} />
        </motion.div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.45rem',
              fontWeight: 700, color: '#fff', margin: 0 }}>{member.name}</h3>
            <span style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 700,
              color: '#020b16', background: member.accent,
              padding: '3px 12px', borderRadius: 999,
              fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1px',
              textTransform: 'uppercase', flexShrink: 0 }}>
              Faculty
            </span>
          </div>
          <span style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600,
            color: member.accent, fontFamily: "'Space Grotesk',sans-serif",
            marginBottom: 6 }}>{member.role}</span>
          <span style={{ display: 'block', fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.42)', fontFamily: "'Inter',sans-serif",
            marginBottom: 14, fontStyle: 'italic' }}>{member.department}</span>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem',
            lineHeight: 1.75, fontFamily: "'Inter',sans-serif", margin: 0,
            display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
            overflow: 'hidden' }}>{member.bio}</p>
        </div>

        {/* Corner glow */}
        <div style={{ position: 'absolute', bottom: -30, right: -30, width: 140, height: 140,
          borderRadius: '50%',
          background: `radial-gradient(circle,${member.accent}15 0%,transparent 70%)`,
          pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -30, left: -30, width: 100, height: 100,
          borderRadius: '50%',
          background: `radial-gradient(circle,${member.accent}08 0%,transparent 70%)`,
          pointerEvents: 'none' }} />
      </motion.div>
    </motion.div>
  );
}

/* ─── Department block ────────────────────────────────────────── */
function DepartmentBlock({ dept, onCardClick, isLeadership }) {
  const isSmall = dept.members.length <= 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: 48,
        background: 'rgba(255,255,255,0.015)',
        border: `1px solid ${dept.accent}20`,
        borderRadius: 24, padding: '32px 32px 36px',
        position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle corner glow */}
      <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160,
        borderRadius: '50%',
        background: `radial-gradient(circle,${dept.accent}10 0%,transparent 70%)`,
        pointerEvents: 'none' }} />

      {/* Department header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{dept.icon}</span>
        <div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.1rem',
            fontWeight: 700, color: '#fff', letterSpacing: '2px',
            textTransform: 'uppercase', marginBottom: 2 }}>{dept.name}</h2>
          <span style={{ fontSize: '0.7rem', color: `${dept.accent}99`,
            fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1px' }}>
            {dept.members.length} {dept.members.length === 1 ? 'member' : 'members'}
          </span>
        </div>
        <div style={{ flex: 1, height: 1, marginLeft: 8,
          background: `linear-gradient(90deg,${dept.accent}40,transparent)` }} />
      </div>

      {/* Members */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20,
        justifyContent: isLeadership ? 'center' : isSmall ? 'center' : 'center' }}>
        {dept.members.map((member, i) => (
          <motion.div key={member.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}>
            {isLeadership
              ? <LeaderCard member={member} onClick={onCardClick} />
              : isSmall
                ? <SpotlightCard member={member} onClick={onCardClick} />
                : <TeamCard member={member} onClick={onCardClick} />}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main ────────────────────────────────────────────────────── */
export default function TeamSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="team" style={{ padding: '120px 0 100px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 1000, height: 600,
        background: 'radial-gradient(ellipse,rgba(124,58,237,0.05) 0%,transparent 70%)',
        pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '75%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 1000, height: 600,
        background: 'radial-gradient(ellipse,rgba(0,240,255,0.04) 0%,transparent 70%)',
        pointerEvents: 'none' }} />

      <div className="px-6 md:px-10" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeader
          badge="Meet the Team"
          title={<>The Minds Behind{' '}<span className="gradient-text-cyan">Stats-O-Locked</span></>}
          subtitle="Our club is led by a passionate and dedicated team committed to growth, innovation, and excellence."
        />

        {/* Faculty Coordinator */}
        <FacultyCard member={faculty} onClick={setSelected} />

        {departments.map((dept, i) => (
          <DepartmentBlock
            key={dept.name}
            dept={dept}
            onCardClick={setSelected}
            isLeadership={dept.name === 'Leadership'}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && <MemberModal member={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
