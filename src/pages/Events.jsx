import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Trophy, Users, Star, ArrowRight, ChevronRight } from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────
const flagshipEvents = [
  {
    id: 'techcorp',
    emoji: '🚀',
    title: 'TechCorp Summit',
    tagline: 'Where MUN meets Technology',
    status: 'Ended',
    accentColor: '#00f0ff',
    objective: "The objective of TechCorp Summit is to enhance participants' analytical thinking, communication skills, and technical awareness by combining the structured debate format of a Model United Nations (MUN) with technology-focused discussions. It encourages students to critically evaluate modern technological issues, collaborate effectively, and develop strong problem-solving abilities.",
    brief: "TechCorp Summit combines a tech-based MUN format with interactive group discussions, creating a dynamic and engaging learning environment. Participants represent diverse perspectives, debate contemporary technological issues, and propose innovative solutions. The event fosters critical thinking, teamwork, and effective communication.",
    outcome: "The event generated significant engagement for the club and enhanced its visibility. Participants demonstrated strong analytical abilities, creativity, and digital literacy. The hybrid judging system (panel evaluation + participant voting) encouraged healthy discussions and active participation.",
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
    accentColor: '#7c3aed',
    objective: "Techila Unplugged was the interactive and recreational segment conducted on Day 2 of the event, offering participants a refreshing break from the corporate simulation. It featured a mix of technical and non-technical games, designed to engage students through fun, competition, and collaboration.",
    brief: "Participants enthusiastically took part in activities that tested their logical thinking, memory, teamwork, and problem-solving skills. The tech-based challenge pushed participants to think analytically under pressure, while the non-tech activity encouraged coordination and communication within teams.\n\nThe segment also served as a great networking opportunity, allowing participants to interact beyond their teams, build connections, and share ideas in a relaxed setting.",
    outcome: "The winners were recognized for their outstanding performances across all challenge categories.",
    judges: [],
    winners: [
      { rank: null, name: 'Memory Sequence Challenge', id: 'Shreyansh' },
      { rank: null, name: 'AI Prompt Battle', id: 'Ayush Arora' },
    ],
    isSpecialWinners: true,
  },
  {
    id: 'ctrllol',
    emoji: '🎭',
    title: 'CTRL + LOL',
    tagline: 'Meme-Making Marathon',
    status: 'Ended',
    accentColor: '#ff4d94',
    objective: "CTRL + LOL aims to provide a creative outlet for students to express the realities of academic life through digital humor and art. It focuses on relatable themes such as coding struggles, placement pressure, and college chaos, fostering community bonding and stress relief.",
    brief: "CTRL + LOL was a week-long virtual meme-making marathon conducted during AdVITya'26. Participants created original memes reflecting student life. Submissions were collected via Google Forms and showcased on the club's Instagram page for public engagement.",
    outcome: "The event saw high digital engagement and significantly boosted the club's online presence. Participants displayed creativity, relatability, and strong storytelling skills through humor.",
    judges: [],
    judgingCriteria: 'Final Score = (50% Instagram Engagement) + (50% Judge Score)',
    winners: [
      { rank: 1, name: 'Dhimant Bhardwaj', id: '24BAI10746' },
      { rank: 2, name: 'Khushi Gupta', id: 'IEHE, Bhopal' },
      { rank: 3, name: 'Suvradeep Dutta', id: '25BAI1010328' },
    ],
  },
];

const upcomingEvents = [
  { title: 'DataHack 2.0', type: 'Hackathon', desc: '24-hour data science hackathon — solve real-world problems with ML & AI.', color: '#00f0ff', icon: '⚡' },
  { title: 'Stats Bootcamp', type: 'Workshop', desc: 'Intensive statistics & probability bootcamp for data science aspirants.', color: '#7c3aed', icon: '📊' },
  { title: 'Open Source Sprint', type: 'Event', desc: 'Contribute to open source data science tools with mentorship by professionals.', color: '#10b981', icon: '🌱' },
];

const medals = ['🥇', '🥈', '🥉'];

// ─── EVENT TAB ────────────────────────────────────────────────────
function EventTab({ event, isActive, onClick }) {
  return (
    <motion.button
      onClick={() => onClick(event.id)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      style={{
        flex: '1 1 0', minWidth: 0,
        padding: '20px 22px',
        background: isActive ? `${event.accentColor}12` : 'rgba(255,255,255,0.02)',
        border: isActive ? `1px solid ${event.accentColor}55` : '1px solid rgba(255,255,255,0.07)',
        borderRadius: 18, cursor: 'pointer', textAlign: 'left',
        position: 'relative', overflow: 'hidden',
        transition: 'background 0.3s, border-color 0.3s',
        boxShadow: isActive ? `0 0 32px ${event.accentColor}18` : 'none',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg,transparent,${event.accentColor},transparent)`,
        opacity: isActive ? 1 : 0.25, transition: 'opacity 0.3s',
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: '1.5rem' }}>{event.emoji}</span>
        <span style={{
          fontSize: '0.68rem', fontWeight: 600, padding: '2px 10px', borderRadius: 100,
          background: isActive ? `${event.accentColor}20` : 'rgba(255,255,255,0.05)',
          color: isActive ? event.accentColor : 'rgba(255,255,255,0.3)',
          fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1px', textTransform: 'uppercase',
          transition: 'color 0.3s, background 0.3s',
        }}>{event.status}</span>
      </div>
      <div style={{
        fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.95rem', fontWeight: 700,
        color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
        transition: 'color 0.3s', marginBottom: 4,
      }}>{event.title}</div>
      <div style={{
        fontFamily: "'Inter',sans-serif", fontSize: '0.74rem',
        color: isActive ? `${event.accentColor}99` : 'rgba(255,255,255,0.25)',
        transition: 'color 0.3s',
      }}>{event.tagline}</div>
    </motion.button>
  );
}

// ─── WINNER ROW ───────────────────────────────────────────────────
function WinnerRow({ winner, isSpecial, accent }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <span style={{ fontSize: '1.3rem', minWidth: 28, textAlign: 'center' }}>
        {isSpecial ? '🏆' : winner.rank <= 3 ? medals[winner.rank - 1] : `#${winner.rank}`}
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ color: '#fff', fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.9rem' }}>
          {isSpecial ? winner.id : winner.name}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', fontFamily: "'Inter',sans-serif", marginTop: 1 }}>
          {isSpecial ? winner.name : winner.id}
        </div>
      </div>
    </div>
  );
}

// ─── SECTION LABEL ────────────────────────────────────────────────
function Label({ text, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      <div style={{ width: 3, height: 15, background: color, borderRadius: 2, flexShrink: 0 }} />
      <span style={{
        fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.72rem', fontWeight: 700,
        color, letterSpacing: '2px', textTransform: 'uppercase',
      }}>{text}</span>
    </div>
  );
}

// ─── EVENT DETAIL PANEL ───────────────────────────────────────────
function EventDetail({ event }) {
  return (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      style={{
        background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)',
        border: `1px solid ${event.accentColor}30`,
        borderRadius: 24, overflow: 'hidden',
      }}
    >
      {/* Panel header bar */}
      <div style={{
        padding: '28px 36px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: `${event.accentColor}08`,
        display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: '2.2rem' }}>{event.emoji}</span>
        <div style={{ flex: 1 }}>
          <h2 style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, color: '#fff', margin: 0,
          }}>{event.title}</h2>
          <span style={{ color: event.accentColor, fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.85rem' }}>
            {event.tagline}
          </span>
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 16px', borderRadius: 100,
          background: 'rgba(148,163,184,0.1)', border: '1px solid rgba(148,163,184,0.2)',
          color: '#94a3b8', fontFamily: "'Space Grotesk',sans-serif",
          fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#94a3b8', display: 'inline-block' }} />
          {event.status}
        </div>
      </div>

      {/* Panel body */}
      <div style={{ padding: '32px 36px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 40 }}>

        {/* Left: narrative */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {[
            { label: 'Objective', text: event.objective },
            { label: 'Event Brief', text: event.brief },
            { label: 'Outcome', text: event.outcome },
          ].map(({ label, text }) => (
            <div key={label}>
              <Label text={label} color={event.accentColor} />
              <p style={{
                color: 'rgba(255,255,255,0.62)', lineHeight: 1.8,
                fontFamily: "'Inter',sans-serif", fontSize: '0.9rem',
                whiteSpace: 'pre-line', margin: 0,
              }}>{text}</p>
            </div>
          ))}

          {event.judgingCriteria && (
            <div>
              <Label text="Judging Criteria" color={event.accentColor} />
              <div style={{
                padding: '12px 18px', borderRadius: 12,
                background: `${event.accentColor}10`, border: `1px solid ${event.accentColor}30`,
                color: event.accentColor, fontFamily: "'Space Grotesk',sans-serif",
                fontWeight: 600, fontSize: '0.88rem',
              }}>{event.judgingCriteria}</div>
            </div>
          )}
        </div>

        {/* Right: sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {event.judges && event.judges.length > 0 && (
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: 20,
            }}>
              <Label text="Judges" color={event.accentColor} />
              {event.judges.map((j, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 0',
                  borderBottom: i < event.judges.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  color: '#e2e8f0', fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.9rem',
                }}>
                  <span style={{ color: event.accentColor, fontSize: '0.6rem' }}>◆</span> {j}
                </div>
              ))}
            </div>
          )}

          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16, padding: 20, flex: 1,
          }}>
            <Label text="Winners" color={event.accentColor} />
            {event.winners.map((w, i) => (
              <WinnerRow key={i} winner={w} isSpecial={event.isSpecialWinners} accent={event.accentColor} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── UPCOMING CARD ────────────────────────────────────────────────
function UpcomingCard({ ev, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${ev.color}0c` : 'rgba(255,255,255,0.02)',
        border: hovered ? `1px solid ${ev.color}44` : `1px solid ${ev.color}22`,
        borderRadius: 20, padding: '28px 26px',
        position: 'relative', overflow: 'hidden',
        transition: 'background 0.3s, border-color 0.3s',
        boxShadow: hovered ? `0 16px 48px ${ev.color}15` : 'none',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg,transparent,${ev.color},transparent)`,
        opacity: hovered ? 1 : 0.4, transition: 'opacity 0.3s',
      }} />
      <div style={{
        position: 'absolute', bottom: -20, right: -20, width: 90, height: 90,
        borderRadius: '50%', background: `radial-gradient(circle,${ev.color}12 0%,transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{ fontSize: '1.8rem' }}>{ev.icon}</span>
        <span style={{
          padding: '3px 12px', borderRadius: 100,
          background: `${ev.color}15`, border: `1px solid ${ev.color}35`,
          color: ev.color, fontSize: '0.68rem',
          fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600,
          letterSpacing: '1.5px', textTransform: 'uppercase',
        }}>{ev.type}</span>
      </div>

      <h3 style={{
        fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.05rem',
        fontWeight: 700, color: '#fff', marginBottom: 8,
      }}>{ev.title}</h3>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        marginBottom: 14, padding: '3px 10px', borderRadius: 100,
        background: 'rgba(255,255,255,0.04)',
        color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem',
        fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1px',
      }}>
        <Calendar size={11} /> COMING SOON
      </div>

      <p style={{
        color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem',
        lineHeight: 1.65, fontFamily: "'Inter',sans-serif",
      }}>{ev.desc}</p>
    </motion.div>
  );
}

// ─── SECTION HEADING ─────────────────────────────────────────────
function SectionHeading({ label, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ marginBottom: 36 }}
    >
      <h2 style={{
        fontFamily: "'Space Grotesk',sans-serif",
        fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: '#fff', marginBottom: 6,
      }}>{label}</h2>
      {sub && <p style={{
        color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter',sans-serif",
        fontSize: '0.9rem', maxWidth: 520,
      }}>{sub}</p>}
      <div style={{
        marginTop: 14, height: 1,
        background: 'linear-gradient(90deg,rgba(0,240,255,0.4),rgba(124,58,237,0.3),transparent)',
      }} />
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────
export default function Events() {
  const [activeId, setActiveId] = useState('techcorp');
  const activeEvent = flagshipEvents.find(e => e.id === activeId);

  return (
    <div style={{ minHeight: '100vh', padding: '120px 0 100px', position: 'relative', overflow: 'hidden' }}>

      {/* Background glows */}
      <div style={{ position: 'absolute', top: '5%', left: '-15%', width: '55vw', height: '55vw',
        borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,240,255,0.05) 0%,transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', right: '-15%', width: '45vw', height: '45vw',
        borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,0.05) 0%,transparent 60%)', pointerEvents: 'none' }} />
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 80, maxWidth: 680 }}
        >
          <span style={{
            display: 'inline-block', padding: '5px 18px', borderRadius: 100,
            background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.25)',
            color: '#00f0ff', fontSize: '0.75rem', fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 22,
          }}>Events & Initiatives</span>

          <h1 style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 'clamp(2.4rem,5.5vw,4.2rem)',
            fontWeight: 800, lineHeight: 1.08, letterSpacing: '-1px', marginBottom: 20, color: '#fff',
          }}>
            Where Ideas Come{' '}
            <span style={{
              background: 'linear-gradient(135deg,#00f0ff,#7c3aed)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Alive</span>
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.45)', fontSize: '1rem', lineHeight: 1.75,
            fontFamily: "'Inter',sans-serif",
          }}>
            We organize events that blend learning, innovation, and fun — helping members grow technically and professionally.
          </p>
        </motion.div>

        {/* ── Flagship Events ── */}
        <SectionHeading
          label="Flagship Events"
          sub="Our signature events that define the Stats-O-Locked experience."
        />

        {/* Tab selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}
        >
          {flagshipEvents.map(ev => (
            <EventTab key={ev.id} event={ev} isActive={activeId === ev.id} onClick={setActiveId} />
          ))}
        </motion.div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          {activeEvent && <EventDetail event={activeEvent} />}
        </AnimatePresence>

        {/* ── Upcoming ── */}
        <div style={{ marginTop: 100 }}>
          <SectionHeading
            label="Upcoming Events"
            sub="Stay tuned — bigger, bolder initiatives are in the pipeline."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {upcomingEvents.map((ev, i) => (
              <UpcomingCard key={i} ev={ev} index={i} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
