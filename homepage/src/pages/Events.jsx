import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const flagshipEvents = [
  {
    id: 'techcorp',
    emoji: '🚀',
    title: 'TechCorp Summit',
    tagline: 'Where MUN meets Technology',
    status: 'Ended',
    statusColor: '#94a3b8',
    accentColor: '#00f0ff',
    objective:
      'The objective of TechCorp Summit is to enhance participants\' analytical thinking, communication skills, and technical awareness by combining the structured debate format of a Model United Nations (MUN) with technology-focused discussions. It encourages students to critically evaluate modern technological issues, collaborate effectively, and develop strong problem-solving abilities. The event also builds confidence in public speaking and promotes informed decision-making on real-world tech challenges.',
    brief:
      'TechCorp Summit combines a tech-based MUN format with interactive group discussions, creating a dynamic and engaging learning environment. Participants represent diverse perspectives, debate contemporary technological issues, and propose innovative solutions. The event fosters critical thinking, teamwork, and effective communication.',
    outcome:
      'The event generated significant engagement for the club and enhanced its visibility. Participants demonstrated strong analytical abilities, creativity, and digital literacy. The hybrid judging system (panel evaluation + participant voting) encouraged healthy discussions and active participation.',
    judges: ['Vishwas Chouhan', 'Tushti Agarwal'],
    winners: [
      { rank: 1, name: 'Ansari Murtaza', id: '24BAI10109' },
      { rank: 2, name: 'Rishi Goyal', id: '25BAI10300' },
      { rank: 3, name: 'Tarang Gupta', id: '24BSA10352' },
    ],
  },
  {
    id: 'techila',
    emoji: '🎮',
    title: 'Techila Unplugged',
    tagline: 'Fun, Games & Connectivity',
    status: 'Ended',
    statusColor: '#94a3b8',
    accentColor: '#7c3aed',
    objective:
      'Techila Unplugged was the interactive and recreational segment conducted on Day 2 of the event, offering participants a refreshing break from the corporate simulation. It featured a mix of technical and non-technical games, designed to engage students through fun, competition, and collaboration.',
    brief:
      'Participants enthusiastically took part in activities that tested their logical thinking, memory, teamwork, and problem-solving skills. The tech-based challenge pushed participants to think analytically under pressure, while the non-tech activity encouraged coordination and communication within teams. The environment remained lively and energetic, with teams actively competing while maintaining a spirit of sportsmanship.\n\nThe segment also served as a great networking opportunity, allowing participants to interact beyond their teams, build connections, and share ideas in a relaxed setting. It successfully balanced enjoyment with learning, making it a memorable part of the overall event.',
    outcome:
      '🏆 The winners were recognized for their outstanding performances.',
    judges: [],
    winners: [
      { rank: null, name: 'Memory Sequence Challenge Winner', id: 'Shreyansh' },
      { rank: null, name: 'AI Prompt Battle Winner', id: 'Ayush Arora' },
    ],
    isSpecialWinners: true,
  },
  {
    id: 'ctrllol',
    emoji: '🎭',
    title: 'CTRL + LOL',
    tagline: 'Meme-Making Marathon',
    status: 'Ended',
    statusColor: '#94a3b8',
    accentColor: '#ff4d94',
    objective:
      'CTRL + LOL aims to provide a creative outlet for students to express the realities of academic life through digital humor and art. It focuses on relatable themes such as coding struggles, placement pressure, and college chaos, fostering community bonding and stress relief.',
    brief:
      'CTRL + LOL was a week-long virtual meme-making marathon conducted during AdVITya\'26. Participants created original memes reflecting student life. Submissions were collected via Google Forms and showcased on the club\'s Instagram page for public engagement.',
    outcome:
      'The event saw high digital engagement and significantly boosted the club\'s online presence. Participants displayed creativity, relatability, and strong storytelling skills through humor.',
    judges: [],
    judgingCriteria: 'Final Score = (50% Instagram Engagement) + (50% Judge Score)',
    winners: [
      { rank: 1, name: 'Dhimant Bhardwaj', id: '24BAI10746' },
      { rank: 2, name: 'Khushi Gupta', id: 'IEHE, Bhopal' },
      { rank: 3, name: 'Suvradeep Dutta', id: '25BAI1010328' },
    ],
    link: '/event-details',
  },
];

const upcomingEvents = [
  {
    title: 'DataHack 2.0',
    date: 'Coming Soon',
    type: 'Hackathon',
    desc: '24-hour data science hackathon — solve real-world problems with ML & AI.',
    color: '#00f0ff',
  },
  {
    title: 'Stats Bootcamp',
    date: 'Coming Soon',
    type: 'Workshop',
    desc: 'Intensive statistics & probability bootcamp for data science aspirants.',
    color: '#7c3aed',
  },
  {
    title: 'Open Source Sprint',
    date: 'Coming Soon',
    type: 'Event',
    desc: 'Contribute to open source data science tools with mentorship by professionals.',
    color: '#10b981',
  },
];

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────
function EventCard({ event, onClick, isActive }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={() => onClick(event.id)}
      style={{
        cursor: 'pointer',
        background: isActive
          ? `linear-gradient(135deg, ${event.accentColor}18, rgba(255,255,255,0.04))`
          : 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${isActive ? event.accentColor + '66' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '20px',
        padding: '28px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
        boxShadow: isActive ? `0 0 40px ${event.accentColor}22` : 'none',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${event.accentColor}, transparent)`,
        opacity: isActive ? 1 : 0.4,
        transition: 'opacity 0.3s',
      }} />

      {/* Status badge */}
      <div style={{
        display: 'inline-block',
        padding: '3px 12px',
        borderRadius: '100px',
        background: 'rgba(255,255,255,0.06)',
        color: event.statusColor,
        fontSize: '0.72rem',
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 600,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        marginBottom: '16px',
      }}>
        {event.status}
      </div>

      <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{event.emoji}</div>

      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '1.3rem',
        fontWeight: 700,
        color: '#fff',
        marginBottom: '6px',
      }}>
        {event.title}
      </h3>
      <p style={{
        color: 'rgba(255,255,255,0.4)',
        fontSize: '0.85rem',
        fontFamily: "'Space Grotesk', sans-serif",
      }}>
        {event.tagline}
      </p>

      <div style={{
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: event.accentColor,
        fontSize: '0.82rem',
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 600,
      }}>
        {isActive ? 'Currently Viewing' : 'Click to Explore'} →
      </div>
    </motion.div>
  );
}

function WinnerRow({ winner, isSpecial }) {
  if (isSpecial) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '14px 0',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <span style={{ fontSize: '1.2rem' }}>🏆</span>
        <div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '2px' }}>
            {winner.name}
          </div>
          <div style={{ color: '#fff', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.95rem' }}>
            {winner.id}
          </div>
        </div>
      </div>
    );
  }
  const medals = ['🥇', '🥈', '🥉'];
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '14px 0',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <span style={{ fontSize: '1.4rem', minWidth: '32px', textAlign: 'center' }}>
        {winner.rank && winner.rank <= 3 ? medals[winner.rank - 1] : `#${winner.rank}`}
      </span>
      <div>
        <div style={{ color: '#fff', fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
          {winner.name}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontFamily: "'Space Grotesk', sans-serif" }}>
          {winner.id}
        </div>
      </div>
    </div>
  );
}

function EventDetail({ event }) {
  return (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45 }}
      style={{
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
        padding: '40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Accent line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${event.accentColor}, transparent)`,
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '2.5rem' }}>{event.emoji}</span>
        <div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            fontWeight: 800,
            color: '#fff',
            margin: 0,
          }}>
            {event.title}
          </h2>
          <span style={{
            color: event.accentColor,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.9rem',
          }}>
            {event.tagline}
          </span>
        </div>
        {event.link && (
          <Link
            to={event.link}
            style={{
              marginLeft: 'auto',
              padding: '10px 22px',
              borderRadius: '12px',
              background: `${event.accentColor}22`,
              border: `1px solid ${event.accentColor}55`,
              color: event.accentColor,
              textDecoration: 'none',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            Full Details →
          </Link>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
        {/* Left: Text Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <InfoBlock label="Objective" color={event.accentColor} text={event.objective} />
          <InfoBlock label="Event Brief" color={event.accentColor} text={event.brief} />
          <InfoBlock label="Event Outcome" color={event.accentColor} text={event.outcome} />
          {event.judgingCriteria && (
            <div>
              <SectionLabel label="Judging Criteria" color={event.accentColor} />
              <div style={{
                padding: '14px 18px',
                background: `${event.accentColor}10`,
                border: `1px solid ${event.accentColor}30`,
                borderRadius: '12px',
                color: event.accentColor,
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: '0.9rem',
              }}>
                {event.judgingCriteria}
              </div>
            </div>
          )}
        </div>

        {/* Right: Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {event.judges && event.judges.length > 0 && (
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '22px',
            }}>
              <SectionLabel label="Judges" color={event.accentColor} />
              {event.judges.map((j, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 0',
                  borderBottom: i < event.judges.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  color: '#e2e8f0',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.95rem',
                }}>
                  <span style={{ color: event.accentColor }}>◆</span> {j}
                </div>
              ))}
            </div>
          )}

          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '22px',
          }}>
            <SectionLabel label="Winners" color={event.accentColor} />
            {event.winners.map((w, i) => (
              <WinnerRow key={i} winner={w} isSpecial={event.isSpecialWinners} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function InfoBlock({ label, color, text }) {
  return (
    <div>
      <SectionLabel label={label} color={color} />
      <p style={{
        color: 'rgba(255,255,255,0.65)',
        lineHeight: 1.8,
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.92rem',
        whiteSpace: 'pre-line',
        margin: 0,
      }}>
        {text}
      </p>
    </div>
  );
}

function SectionLabel({ label, color }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '12px',
    }}>
      <div style={{ width: '3px', height: '16px', background: color, borderRadius: '2px', flexShrink: 0 }} />
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '0.78rem',
        fontWeight: 700,
        color: color,
        letterSpacing: '2px',
        textTransform: 'uppercase',
      }}>
        {label}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function Events() {
  const [activeEventId, setActiveEventId] = useState('techcorp');
  const activeEvent = flagshipEvents.find(e => e.id === activeEventId);

  return (
    <PageLayout
      title="Events & Gallery"
      subtitle="Our Activities"
    >
      {/* Intro text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          color: 'rgba(255,255,255,0.5)',
          fontFamily: "'Inter', sans-serif",
          fontSize: '1.05rem',
          lineHeight: 1.7,
          maxWidth: '640px',
          marginBottom: '60px',
        }}
      >
        We organize events that blend learning, innovation, and fun, helping members grow both technically and professionally.
      </motion.p>

      {/* ── FLAGSHIP EVENTS ── */}
      <SectionDivider label="Flagship Events" />

      {/* Event selector cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '36px',
        }}
      >
        {flagshipEvents.map((ev) => (
          <EventCard
            key={ev.id}
            event={ev}
            onClick={setActiveEventId}
            isActive={activeEventId === ev.id}
          />
        ))}
      </motion.div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {activeEvent && <EventDetail event={activeEvent} />}
      </AnimatePresence>

      {/* ── UPCOMING EVENTS ── */}
      <div style={{ marginTop: '80px' }}>
        <SectionDivider label="Upcoming Events" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontFamily: "'Inter', sans-serif",
            marginBottom: '32px',
          }}
        >
          Stay tuned for upcoming workshops, competitions, and speaker sessions designed to elevate your skills.
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
        }}>
          {upcomingEvents.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(12px)',
                border: `1px solid ${ev.color}33`,
                borderRadius: '18px',
                padding: '26px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, transparent, ${ev.color}, transparent)`,
              }} />
              <div style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '100px',
                background: `${ev.color}18`,
                border: `1px solid ${ev.color}44`,
                color: ev.color,
                fontSize: '0.72rem',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '14px',
              }}>
                {ev.type}
              </div>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '8px',
              }}>
                {ev.title}
              </h3>
              <div style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: '0.8rem',
                fontFamily: "'Space Grotesk', sans-serif",
                marginBottom: '12px',
              }}>
                🗓️ {ev.date}
              </div>
              <p style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.88rem',
                lineHeight: 1.65,
                fontFamily: "'Inter', sans-serif",
              }}>
                {ev.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── PAST EVENTS ── */}
      <div style={{ marginTop: '80px' }}>
        <SectionDivider label="Past Events" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontFamily: "'Inter', sans-serif",
            marginBottom: '32px',
            maxWidth: '640px',
          }}
        >
          Our past events include successful workshops, competitions, and seminars with enthusiastic participation, each designed to provide practical exposure and meaningful learning.
        </motion.p>

        {/* Past events list — same as flagship, displayed as a simple list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {flagshipEvents.map((ev, i) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
                padding: '18px 24px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '14px',
                flexWrap: 'wrap',
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{ev.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  color: '#fff',
                  fontSize: '1rem',
                }}>
                  {ev.title}
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '0.82rem',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  {ev.tagline}
                </div>
              </div>
              <span style={{
                padding: '4px 14px',
                borderRadius: '100px',
                background: 'rgba(255,255,255,0.05)',
                color: ev.statusColor,
                fontSize: '0.75rem',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>
                {ev.status}
              </span>
              <button
                onClick={() => {
                  setActiveEventId(ev.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  padding: '8px 18px',
                  borderRadius: '10px',
                  background: `${ev.accentColor}15`,
                  border: `1px solid ${ev.accentColor}44`,
                  color: ev.accentColor,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── GALLERY ── */}
      <div style={{ marginTop: '80px' }}>
        <SectionDivider label="Gallery" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontFamily: "'Inter', sans-serif",
            marginBottom: '36px',
            maxWidth: '620px',
          }}
        >
          Explore some of our most memorable moments. Our gallery captures highlights from events, competitions, workshops, and team collaborations — showcasing our passion and enthusiasm.
        </motion.p>

        <GalleryPlaceholder />
      </div>
    </PageLayout>
  );
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function SectionDivider({ label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ marginBottom: '36px' }}
    >
      <h2 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
        fontWeight: 800,
        color: '#fff',
        marginBottom: '12px',
      }}>
        {label}
      </h2>
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, rgba(0,240,255,0.4), rgba(124,58,237,0.3), transparent)',
      }} />
    </motion.div>
  );
}

function GalleryPlaceholder() {
  const placeholders = [
    { label: 'TechCorp Summit', color: '#00f0ff', emoji: '🚀' },
    { label: 'TechCorp Summit', color: '#00f0ff', emoji: '💬' },
    { label: 'Techila Unplugged', color: '#7c3aed', emoji: '🎮' },
    { label: 'Techila Unplugged', color: '#7c3aed', emoji: '🏆' },
    { label: 'CTRL + LOL', color: '#ff4d94', emoji: '🎭' },
    { label: 'CTRL + LOL', color: '#ff4d94', emoji: '😂' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '16px',
    }}>
      {placeholders.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.04, y: -4 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07 }}
          style={{
            aspectRatio: '4/3',
            background: `linear-gradient(135deg, ${p.color}18, rgba(255,255,255,0.02))`,
            border: `1px solid ${p.color}33`,
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
          }} />
          <span style={{ fontSize: '2.4rem' }}>{p.emoji}</span>
          <span style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.75rem',
            fontFamily: "'Space Grotesk', sans-serif",
            textAlign: 'center',
            padding: '0 12px',
          }}>
            {p.label}
          </span>
          <span style={{
            fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.2)',
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '1px',
          }}>
            PHOTO COMING SOON
          </span>
        </motion.div>
      ))}
    </div>
  );
}
