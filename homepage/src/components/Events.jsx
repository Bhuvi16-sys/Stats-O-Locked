import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Zap } from 'lucide-react';

const events = [
  {
    id: 'techcorp',
    title: 'TechCorp Summit',
    date: '2-Day Summit',
    type: 'MUN Tech Debate',
    typeColor: '#00f0ff',
    desc: 'Evaluate contemporary tech issues and debate in a structured MUN format with a hybrid judging system.',
    tag: 'Completed',
    tagColor: '#94a3b8',
  },
  {
    id: 'ctrl-lol',
    title: 'CTRL + LOL',
    date: 'Week-long virtual',
    type: 'Meme Marathon',
    typeColor: '#7c3aed',
    desc: 'Week-long virtual meme-making contest during AdVITya’26 showcasing coding struggles and student life.',
    tag: 'Completed',
    tagColor: '#94a3b8',
  },
];

export default function Events() {
  return (
    <section
      id="events"
      style={{
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.3), transparent)',
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '50px',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
            <span style={{
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
              marginBottom: '16px',
            }}>
              Events
            </span>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#fff',
            }}>
              Latest <span className="gradient-text-cyan">Happenings</span>
            </h2>
          </div>
          <motion.a
            href="../events.html"
            whileHover={{ x: 4 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#00f0ff',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
            }}
          >
            View All Events <ArrowRight size={16} />
          </motion.a>
        </motion.div>

        {/* Horizontal scroll container */}
        <div
          className="horizontal-scroll"
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            paddingBottom: '20px',
            paddingTop: '4px',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {events.map((ev, i) => (
            <motion.div
              key={ev.title}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{
                flex: '0 0 300px',
                scrollSnapAlign: 'start',
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                padding: '28px',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,240,255,0.3)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,240,255,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Top accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: `linear-gradient(90deg, transparent, ${ev.typeColor}, transparent)`,
              }} />

              {/* Type + tag row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  borderRadius: '100px',
                  background: `${ev.typeColor}1a`,
                  border: `1px solid ${ev.typeColor}44`,
                  color: ev.typeColor,
                  fontSize: '0.75rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                }}>
                  <Zap size={11} />
                  {ev.type}
                </span>
                <span style={{
                  padding: '3px 10px',
                  borderRadius: '100px',
                  background: `${ev.tagColor}15`,
                  color: ev.tagColor,
                  fontSize: '0.72rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                }}>
                  {ev.tag}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.15rem',
                fontWeight: 600,
                color: '#fff',
                marginBottom: '10px',
              }}>
                {ev.title}
              </h3>

              {/* Date */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'rgba(255,255,255,0.4)',
                fontSize: '0.82rem',
                marginBottom: '14px',
              }}>
                <Calendar size={13} />
                {ev.date}
              </div>

              {/* Description */}
              <p style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.88rem',
                lineHeight: 1.65,
                marginBottom: '22px',
              }}>
                {ev.desc}
              </p>

              {/* Button */}
              <Link
                to={`/event-details?id=${ev.id}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '0.82rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00f0ff';
                  e.currentTarget.style.gap = '12px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                  e.currentTarget.style.gap = '6px';
                }}
              >
                View Details <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
