import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import PageLayout from '../components/PageLayout';

/* ── Gallery data (placeholder tiles — swap src with real photos) ── */
const galleryItems = [
  { id: 1,  category: 'TechCorp Summit', title: 'Opening Ceremony',        color: '#00f0ff', emoji: '🚀', src: './pics/gallery/techcorp-1.jpeg' },
  { id: 2,  category: 'TechCorp Summit', title: 'MUN Debate Session',      color: '#7c3aed', emoji: '🎤', src: './pics/gallery/techcorp-2.jpeg' },
  { id: 3,  category: 'TechCorp Summit', title: 'Panel Judges',            color: '#00f0ff', emoji: '⭐', src: './pics/gallery/techcorp-3.jpeg' },
  { id: 4,  category: 'TechCorp Summit', title: 'Winners Podium',          color: '#f59e0b', emoji: '🏆', src: './pics/gallery/techcorp-4.jpeg' },
  { id: 5,  category: 'Techila Unplugged', title: 'Memory Challenge',      color: '#10b981', emoji: '🧠' },
  { id: 6,  category: 'Techila Unplugged', title: 'AI Prompt Battle',      color: '#3b82f6', emoji: '🤖' },
  { id: 7,  category: 'CTRL + LOL',     title: 'Meme Submissions',         color: '#ff4d94', emoji: '😂' },
  { id: 8,  category: 'CTRL + LOL',     title: 'Winners Reveal',           color: '#7c3aed', emoji: '🎭' },
  { id: 9,  category: 'Team',           title: 'Leadership Meet',          color: '#00f0ff', emoji: '👥' },
  { id: 10, category: 'Team',           title: 'Department Leads Collab',  color: '#f59e0b', emoji: '🤝' },
  { id: 11, category: 'Team',           title: 'Creative Session',         color: '#ff4d94', emoji: '🎨' },
  { id: 12, category: 'Team',           title: 'Research Brainstorm',      color: '#3b82f6', emoji: '💡' },
];

const FILTERS = ['All', 'TechCorp Summit', 'Techila Unplugged', 'CTRL + LOL', 'Team'];

/* ── Placeholder image tile ─── */
function GalleryTile({ item, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -6, scale: 1.03 }}
      onClick={() => onClick(item)}
      style={{
        cursor: 'pointer',
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid rgba(255,255,255,0.08)`,
        background: 'rgba(255,255,255,0.02)',
        aspectRatio: '4/3',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${item.color}66`;
        e.currentTarget.style.boxShadow = `0 16px 40px ${item.color}22`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top glow bar */}
      <div style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
        background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
      }} />

      {/* Emoji or Image */}
      {item.src ? (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          <img src={item.src} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
        </div>
      ) : (
        <div style={{
          fontSize: '3rem', marginBottom: '10px',
          filter: `drop-shadow(0 0 12px ${item.color})`,
          zIndex: 1
        }}>
          {item.emoji}
        </div>
      )}

      {!item.src && (
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.82rem', fontWeight: 600,
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.5px', textAlign: 'center', padding: '0 10px',
        }}>
          {item.title}
        </p>
      )}

      {/* Category badge */}
      {!item.src && (
        <span style={{
          position: 'absolute', bottom: '10px', right: '10px',
          background: `${item.color}20`,
          border: `1px solid ${item.color}44`,
          color: item.color,
          fontSize: '0.65rem', fontWeight: 600,
          padding: '2px 8px', borderRadius: '999px',
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: '0.5px',
        }}>
          {item.category}
        </span>
      )}

      {/* Hover zoom icon */}
      <div style={{
        position: 'absolute', top: '10px', right: '10px',
        opacity: 0, transition: 'opacity 0.25s',
      }}
        className="gallery-zoom-icon"
      >
        <ZoomIn size={16} color={item.color} />
      </div>

      <style>{`.gallery-tile:hover .gallery-zoom-icon { opacity: 1; }`}</style>
    </motion.div>
  );
}

/* ── Lightbox ─── */
function Lightbox({ item, items, onClose, onNext, onPrev }) {
  if (!item) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(2,11,22,0.92)',
        backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(560px, 92vw)',
          background: 'rgba(11,19,43,0.95)',
          border: `1px solid ${item.color}55`,
          borderRadius: '24px',
          padding: '40px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          boxShadow: `0 0 60px ${item.color}22`,
          position: 'relative',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'rgba(255,255,255,0.6)',
          }}
        >
          <X size={16} />
        </button>

        {/* Emoji or Image */}
        {item.src ? (
          <div style={{ width: '100%', maxHeight: '50vh', marginBottom: '20px', borderRadius: '16px', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
            <img src={item.src} alt={item.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
        ) : (
          <div style={{
            fontSize: '6rem',
            filter: `drop-shadow(0 0 20px ${item.color})`,
            marginBottom: '20px',
          }}>
            {item.emoji}
          </div>
        )}

        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '8px',
        }}>
          {item.title}
        </h3>
        <span style={{
          background: `${item.color}20`, border: `1px solid ${item.color}44`,
          color: item.color, fontSize: '0.78rem', fontWeight: 600,
          padding: '3px 12px', borderRadius: '999px',
          fontFamily: "'Space Grotesk', sans-serif", marginBottom: '28px',
        }}>
          {item.category}
        </span>

        <p style={{
          color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem',
          fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.5px',
        }}>
          📸 Drop your real photos here — swap the emoji with an &lt;img&gt; tag!
        </p>

        {/* Prev / Next */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '28px' }}>
          <button onClick={onPrev} style={navBtnStyle}>
            <ChevronLeft size={18} />
          </button>
          <button onClick={onNext} style={navBtnStyle}>
            <ChevronRight size={18} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

const navBtnStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '12px', width: '44px', height: '44px',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', color: '#fff',
};

/* ── Main Gallery Page ─────────────────────────────────────── */
export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);

  const filtered = filter === 'All' ? galleryItems : galleryItems.filter((g) => g.category === filter);

  const openLightbox = (item) => setLightboxItem(item);
  const closeLightbox = () => setLightboxItem(null);

  const navigateLightbox = (dir) => {
    const idx = filtered.findIndex((g) => g.id === lightboxItem.id);
    const next = (idx + dir + filtered.length) % filtered.length;
    setLightboxItem(filtered[next]);
  };

  return (
    <PageLayout title="Gallery" subtitle="Our Most Memorable Moments">

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-3 justify-center mb-12"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '8px 20px',
              borderRadius: '999px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.82rem', fontWeight: 600,
              letterSpacing: '0.5px', cursor: 'pointer',
              border: '1px solid',
              transition: 'all 0.25s ease',
              background: filter === f ? 'rgba(0,240,255,0.12)' : 'rgba(255,255,255,0.03)',
              borderColor: filter === f ? '#00f0ff' : 'rgba(255,255,255,0.1)',
              color: filter === f ? '#00f0ff' : 'rgba(255,255,255,0.5)',
              boxShadow: filter === f ? '0 0 16px rgba(0,240,255,0.15)' : 'none',
            }}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Grid with layout animations */}
      <LayoutGroup>
        <motion.div
          layout
          className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <GalleryTile key={item.id} item={item} onClick={openLightbox} />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox
            item={lightboxItem}
            items={filtered}
            onClose={closeLightbox}
            onNext={() => navigateLightbox(1)}
            onPrev={() => navigateLightbox(-1)}
          />
        )}
      </AnimatePresence>

    </PageLayout>
  );
}
