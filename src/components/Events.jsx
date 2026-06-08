import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      "The objective of TechCorp Summit is to enhance participants' analytical thinking, communication skills, and technical awareness by combining the structured debate format of a Model United Nations (MUN) with technology-focused discussions. It encourages students to critically evaluate modern technological issues, collaborate effectively, and develop strong problem-solving abilities.",
    brief:
      'TechCorp Summit combines a tech-based MUN format with interactive group discussions, creating a dynamic and engaging learning environment. Participants represent diverse perspectives, debate contemporary technological issues, and propose innovative solutions.',
    outcome:
      'The event generated significant engagement for the club and enhanced its visibility. Participants demonstrated strong analytical abilities, creativity, and digital literacy.',
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
      'Techila Unplugged was the interactive and recreational segment conducted on Day 2 of the event, featuring a refreshing mix of technical and non-technical games designed to engage students through fun, competition, and collaboration.',
    brief:
      'Participants took part in activities that tested logical thinking, memory, teamwork, and problem-solving skills. The segment served as a great networking opportunity, balancing enjoyment with learning.',
    outcome: '🏆 The winners were recognized for their outstanding performances.',
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
      'CTRL + LOL aims to provide a creative outlet for students to express the realities of academic life through digital humor and art, fostering community bonding and stress relief.',
    brief:
      "CTRL + LOL was a week-long virtual meme-making marathon conducted during AdVITya'26. Participants created original memes reflecting student life, showcased on the club's Instagram page.",
    outcome:
      "The event saw high digital engagement and significantly boosted the club's online presence. Participants displayed creativity, relatability, and strong storytelling skills.",
    judgingCriteria: 'Final Score = (50% Instagram Engagement) + (50% Judge Score)',
    judges: [],
    winners: [
      { rank: 1, name: 'Dhimant Bhardwaj', id: '24BAI10746' },
      { rank: 2, name: 'Khushi Gupta', id: 'IEHE, Bhopal' },
      { rank: 3, name: 'Suvradeep Dutta', id: '25BAI1010328' },
    ],
  },
];

const galleryItems = [
  { label: 'TechCorp Summit', color: '#00f0ff', emoji: '🚀' },
  { label: 'TechCorp Summit', color: '#00f0ff', emoji: '💬' },
  { label: 'Techila Unplugged', color: '#7c3aed', emoji: '🎮' },
  { label: 'Techila Unplugged', color: '#7c3aed', emoji: '🏆' },
  { label: 'CTRL + LOL', color: '#ff4d94', emoji: '🎭' },
  { label: 'CTRL + LOL', color: '#ff4d94', emoji: '😂' },
];

const medals = ['🥇', '🥈', '🥉'];

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────
function InfoBlock({ label, color, text }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <div style={{ width: '3px', height: '14px', background: color, borderRadius: '2px', flexShrink: 0 }} />
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.72rem',
          fontWeight: 700,
          color: color,
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          {label}
        </span>
      </div>
      <p style={{
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 1.75,
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.9rem',
        margin: 0,
        whiteSpace: 'pre-line',
      }}>
        {text}
      </p>
    </div>
  );
}

function WinnerRow({ winner, isSpecial }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px 0',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <span style={{ fontSize: '1.2rem', minWidth: '28px', textAlign: 'center' }}>
        {isSpecial ? '🏆' : (winner.rank <= 3 ? medals[winner.rank - 1] : `#${winner.rank}`)}
      </span>
      <div>
        <div style={{ color: '#fff', fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem' }}>
          {isSpecial ? winner.id : winner.name}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontFamily: "'Space Grotesk', sans-serif" }}>
          {isSpecial ? winner.name : winner.id}
        </div>
      </div>
    </div>
  );
}

function EventDetailPanel({ event }) {
  return (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      style={{
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
        padding: '36px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${event.accentColor}, transparent)`,
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '2.2rem' }}>{event.emoji}</span>
        <div>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
            fontWeight: 800,
            color: '#fff',
            margin: 0,
          }}>
            {event.title}
          </h3>
          <span style={{ color: event.accentColor, fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem' }}>
            {event.tagline}
          </span>
        </div>
      </div>

      {/* Content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px' }}>
        {/* Left: details */}
        <div>
          <InfoBlock label="Objective" color={event.accentColor} text={event.objective} />
          <InfoBlock label="Event Brief" color={event.accentColor} text={event.brief} />
          <InfoBlock label="Event Outcome" color={event.accentColor} text={event.outcome} />
          {event.judgingCriteria && (
            <div style={{
              padding: '12px 16px',
              background: `${event.accentColor}10`,
              border: `1px solid ${event.accentColor}30`,
              borderRadius: '10px',
              color: event.accentColor,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: '0.85rem',
              marginTop: '8px',
            }}>
              📊 {event.judgingCriteria}
            </div>
          )}
        </div>

        {/* Right: sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {event.judges && event.judges.length > 0 && (
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '14px',
              padding: '18px',
            }}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.7rem',
                fontWeight: 700,
                color: event.accentColor,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}>
                Judges
              </div>
              {event.judges.map((j, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 0',
                  borderBottom: i < event.judges.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  color: '#e2e8f0',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.9rem',
                }}>
                  <span style={{ color: event.accentColor }}>◆</span> {j}
                </div>
              ))}
            </div>
          )}

          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px',
            padding: '18px',
          }}>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 700,
              color: event.accentColor,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              Winners
            </div>
            {event.winners.map((w, i) => (
              <WinnerRow key={i} winner={w} isSpecial={event.isSpecialWinners} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function EventsGallery() {
  const [activeId, setActiveId] = useState('techcorp');
  const activeEvent = flagshipEvents.find((e) => e.id === activeId);

  return (
    <section
      id="events"
      style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Section top rule */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.3), transparent)',
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '60px' }}
        >
          <span style={{
            display: 'inline-block',
            padding: '5px 16px',
            borderRadius: '100px',
            background: 'rgba(0,240,255,0.08)',
            border: '1px solid rgba(0,240,255,0.25)',
            color: '#00f0ff',
            fontSize: '0.8rem',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            Events & Gallery
          </span>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '12px',
          }}>
            Our{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00f0ff, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Flagship Events
            </span>
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontFamily: "'Inter', sans-serif",
            fontSize: '1rem',
            maxWidth: '540px',
          }}>
            We organize events that blend learning, innovation, and fun, helping members grow both technically and professionally.
          </p>
        </motion.div>

        {/* ── Event selector tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '28px',
          }}
        >
          {flagshipEvents.map((ev) => {
            const isActive = activeId === ev.id;
            return (
              <motion.button
                key={ev.id}
                onClick={() => setActiveId(ev.id)}
                whileHover={{ y: -4, scale: 1.02 }}
                style={{
                  cursor: 'pointer',
                  textAlign: 'left',
                  background: isActive
                    ? `linear-gradient(135deg, ${ev.accentColor}18, rgba(255,255,255,0.04))`
                    : 'rgba(255,255,255,0.02)',
                  backdropFilter: 'blur(14px)',
                  border: `1px solid ${isActive ? ev.accentColor + '66' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: '18px',
                  padding: '22px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s',
                  boxShadow: isActive ? `0 0 32px ${ev.accentColor}20` : 'none',
                }}
              >
                {/* Top accent */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, transparent, ${ev.accentColor}, transparent)`,
                  opacity: isActive ? 1 : 0.3,
                  transition: 'opacity 0.3s',
                }} />

                <div style={{ marginBottom: '10px', fontSize: '1.8rem' }}>{ev.emoji}</div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  color: '#fff',
                  fontSize: '1rem',
                  marginBottom: '4px',
                }}>
                  {ev.title}
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '0.78rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  {ev.tagline}
                </div>
                <div style={{
                  marginTop: '14px',
                  color: isActive ? ev.accentColor : 'rgba(255,255,255,0.3)',
                  fontSize: '0.75rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  transition: 'color 0.3s',
                }}>
                  {isActive ? 'Viewing ▼' : 'Click to explore →'}
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Event detail panel ── */}
        <AnimatePresence mode="wait">
          {activeEvent && <EventDetailPanel event={activeEvent} />}
        </AnimatePresence>

        {/* ── Gallery ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginTop: '80px' }}
        >
          {/* Gallery header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: '4px', height: '28px', borderRadius: '4px',
              background: 'linear-gradient(180deg, #00f0ff, #7c3aed)',
            }} />
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              fontWeight: 700,
              color: '#fff',
              margin: 0,
            }}>
              Gallery
            </h3>
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontFamily: "'Inter', sans-serif",
            marginBottom: '28px',
            maxWidth: '560px',
          }}>
            Memorable moments from our events — competitions, workshops, and team collaborations.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '14px',
          }}>
            {galleryItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                style={{
                  aspectRatio: '4/3',
                  background: `linear-gradient(135deg, ${item.color}18, rgba(255,255,255,0.02))`,
                  border: `1px solid ${item.color}33`,
                  borderRadius: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                }} />
                <span style={{ fontSize: '2rem' }}>{item.emoji}</span>
                <span style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '0.7rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  textAlign: 'center',
                  padding: '0 8px',
                }}>
                  {item.label}
                </span>
                <span style={{
                  fontSize: '0.6rem',
                  color: 'rgba(255,255,255,0.18)',
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: '1px',
                }}>
                  PHOTO COMING SOON
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
