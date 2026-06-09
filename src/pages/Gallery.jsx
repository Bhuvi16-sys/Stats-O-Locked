import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';

/* ── Responsive hook ──────────────────────────────────────────── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

/* ── Film rolls data ──────────────────────────────────────────── */
const ROLLS = [
  {
    id: 'techcorp',
    name: 'TechCorp Summit',
    shortName: 'TechCorp',
    color: '#00f0ff',
    icon: '🚀',
    photos: Array.from({ length: 24 }, (_, i) => ({ src: `/pics/gallery/techcorp-${i + 1}.jpeg`, caption: 'TechCorp Summit' })),
  },
  {
    id: 'ctrllol',
    name: 'CTRL + LOL',
    shortName: 'CTRL+LOL',
    color: '#f43f5e',
    icon: '😂',
    photos: Array.from({ length: 7 }, (_, i) => ({ src: `/pics/gallery/ctrl-${i + 1}.jpeg`, caption: 'CTRL + LOL' })),
  },
  {
    id: 'team',
    name: 'Team',
    shortName: 'Team',
    color: '#f59e0b',
    icon: '👥',
    photos: [
      { emoji: '👥', caption: 'Leadership Meet' },
      { emoji: '🤝', caption: 'Dept. Leads Collab' },
      { emoji: '🎨', caption: 'Creative Session' },
      { emoji: '💡', caption: 'Research Brainstorm' },
    ],
  },
];

const FILTER_MODES = ['normal', 'b&w', 'sepia'];
const FILTER_LABELS = { normal: 'CLR', 'b&w': 'B&W', sepia: 'SEP' };
const FILTER_CSS = {
  normal: 'none',
  'b&w': 'grayscale(1)',
  sepia: 'sepia(0.85) saturate(1.3)',
};

/* ── Film canister ────────────────────────────────────────────── */
function FilmCanister({ roll, isActive, onClick, compact }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={compact ? { scale: 1.08 } : { scale: 1.06, x: 5 }}
      whileTap={{ scale: 0.94 }}
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 2 : 4, flexShrink: 0 }}
    >
      <div style={{ width: compact ? 12 : 16, height: compact ? 7 : 9, borderRadius: '3px 3px 0 0', background: isActive ? roll.color : roll.color + '44', transition: 'background 0.25s' }} />
      <div style={{
        width: compact ? 44 : 52, height: compact ? 62 : 76,
        background: isActive ? `linear-gradient(160deg, ${roll.color}22, ${roll.color}0a, rgba(0,0,0,0.25))` : 'rgba(255,255,255,0.025)',
        border: `1.5px solid ${isActive ? roll.color : roll.color + '28'}`,
        borderRadius: 7,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
        position: 'relative', overflow: 'hidden',
        boxShadow: isActive ? `0 0 14px ${roll.color}30, inset 0 0 10px ${roll.color}0a` : 'none',
        transition: 'all 0.25s',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: isActive ? roll.color : roll.color + '33', transition: 'background 0.25s' }} />
        {[10, 30, 50].map(t => (
          <div key={`l${t}`} style={{ position: 'absolute', left: 2, top: t, width: 4, height: 6, borderRadius: 2, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.06)' }} />
        ))}
        {[10, 30, 50].map(t => (
          <div key={`r${t}`} style={{ position: 'absolute', right: 2, top: t, width: 4, height: 6, borderRadius: 2, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.06)' }} />
        ))}
        <span style={{ fontSize: compact ? '0.95rem' : '1.1rem', zIndex: 1 }}>{roll.icon}</span>
        <span style={{ fontSize: compact ? '0.46rem' : '0.52rem', fontWeight: 700, color: isActive ? roll.color : 'rgba(255,255,255,0.3)', letterSpacing: '0.3px', textAlign: 'center', lineHeight: 1.2, fontFamily: "'Space Grotesk', sans-serif", padding: '0 4px', zIndex: 1, transition: 'color 0.25s' }}>{roll.shortName}</span>
        <span style={{ fontSize: '0.42rem', color: 'rgba(255,255,255,0.22)', fontFamily: "'Space Grotesk', sans-serif", zIndex: 1 }}>{roll.photos.length} EXP</span>
      </div>
      <div style={{ width: compact ? 12 : 16, height: compact ? 5 : 6, borderRadius: '0 0 2px 2px', background: isActive ? roll.color + '88' : roll.color + '28', transition: 'background 0.25s' }} />
      <AnimatePresence>
        {isActive && (
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
            style={{ width: 5, height: 5, borderRadius: '50%', background: roll.color, boxShadow: `0 0 7px ${roll.color}` }} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Film strip (right sidebar, desktop only) ─────────────────── */
function FilmStrip({ photos, activeIndex, color, onSelect }) {
  return (
    <div style={{ width: 84, flexShrink: 0, background: '#06090e', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: 320 }}>
      <div style={{ padding: '7px 4px 5px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.5rem', fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '2px', fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0 }}>ROLL</div>
      <div style={{ overflowY: 'auto', flex: 1, scrollbarWidth: 'thin', scrollbarColor: `${color}44 transparent` }}>
        {photos.map((photo, i) => (
          <motion.div key={i} onClick={() => onSelect(i)} whileHover={{ backgroundColor: `${color}12` }}
            style={{ padding: '5px 5px', cursor: 'pointer', background: i === activeIndex ? `${color}18` : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: 4, transition: 'background 0.2s' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flexShrink: 0 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: i === activeIndex ? color : 'rgba(255,255,255,0.1)', transition: 'background 0.2s' }} />
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: i === activeIndex ? color : 'rgba(255,255,255,0.1)', transition: 'background 0.2s' }} />
            </div>
            <div style={{ width: 54, height: 42, borderRadius: 3, overflow: 'hidden', border: `1px solid ${i === activeIndex ? color + '55' : 'rgba(255,255,255,0.05)'}`, background: '#0a0a14', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'border-color 0.2s' }}>
              {photo.src ? (
                <img src={photo.src} alt={photo.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: i === activeIndex ? 'none' : 'brightness(0.3) saturate(0.3)', transition: 'filter 0.25s' }} />
              ) : (
                <span style={{ fontSize: '1.3rem', filter: i === activeIndex ? 'none' : 'grayscale(1) opacity(0.18)', transition: 'filter 0.25s' }}>{photo.emoji}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Horizontal film strip (mobile bottom) ────────────────────── */
function FilmStripH({ photos, activeIndex, color, onSelect }) {
  return (
    <div style={{ width: '100%', background: '#06090e', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '5px 8px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.45rem', fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '2px', fontFamily: "'Space Grotesk', sans-serif" }}>ROLL</div>
      <div style={{ display: 'flex', overflowX: 'auto', gap: 0, scrollbarWidth: 'none' }}>
        {photos.map((photo, i) => (
          <motion.div key={i} onClick={() => onSelect(i)} whileTap={{ scale: 0.95 }}
            style={{ padding: '5px 4px', cursor: 'pointer', background: i === activeIndex ? `${color}18` : 'transparent', borderRight: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flexShrink: 0, transition: 'background 0.2s' }}>
            <div style={{ display: 'flex', gap: 3 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: i === activeIndex ? color : 'rgba(255,255,255,0.1)' }} />
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: i === activeIndex ? color : 'rgba(255,255,255,0.1)' }} />
            </div>
            <div style={{ width: 46, height: 36, borderRadius: 3, overflow: 'hidden', border: `1px solid ${i === activeIndex ? color + '55' : 'rgba(255,255,255,0.05)'}`, background: '#0a0a14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {photo.src ? (
                <img src={photo.src} alt={photo.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: i === activeIndex ? 'none' : 'brightness(0.3) saturate(0.3)' }} />
              ) : (
                <span style={{ fontSize: '1.1rem', filter: i === activeIndex ? 'none' : 'grayscale(1) opacity(0.18)' }}>{photo.emoji}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Photo screen ─────────────────────────────────────────────── */
const slideV = {
  enter: (d) => ({ x: d > 0 ? 55 : -55, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (d) => ({ x: d > 0 ? -55 : 55, opacity: 0 }),
};

function PhotoScreen({ photo, direction, activeRoll, photoIndex, totalPhotos, onPrev, onNext, flashActive, filterMode, loadingRoll, loadingColor, isMobile }) {
  return (
    <div style={{ flex: 1, minHeight: isMobile ? 220 : 240, maxHeight: isMobile ? 260 : 320, background: '#000', borderRadius: 6, overflow: 'hidden', border: '2px solid #1a2535', position: 'relative', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.7)' }}>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div key={`${activeRoll.id}-${photoIndex}`} custom={direction} variants={slideV} initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.2, ease: 'easeInOut' }} style={{ position: 'absolute', inset: 0 }}>
          {photo.src ? (
            <img src={photo.src} alt={photo.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: FILTER_CSS[filterMode], transition: 'filter 0.35s' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, background: `radial-gradient(circle at 50% 45%, ${activeRoll.color}0e 0%, transparent 70%)` }}>
              <motion.span animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} style={{ fontSize: '3.5rem' }}>{photo.emoji}</motion.span>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{photo.caption}</span>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.55rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '1.5px' }}>PHOTO COMING SOON</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)', pointerEvents: 'none' }} />

      {/* Top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: 'linear-gradient(180deg, rgba(0,0,0,0.65), transparent)', pointerEvents: 'none' }}>
        <span style={{ background: `${activeRoll.color}1e`, border: `1px solid ${activeRoll.color}44`, borderRadius: 999, padding: '2px 8px', fontSize: '0.58rem', fontWeight: 700, color: activeRoll.color, fontFamily: "'Space Grotesk',sans-serif" }}>{activeRoll.shortName}</span>
        <span style={{ background: 'rgba(0,0,0,0.5)', borderRadius: 999, padding: '2px 8px', fontSize: '0.58rem', color: 'rgba(255,255,255,0.55)', fontFamily: "'Space Grotesk',sans-serif" }}>{photoIndex + 1} / {totalPhotos}</span>
      </div>

      {photo.src && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.72))', padding: '22px 12px 10px', pointerEvents: 'none' }}>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.85)' }}>{photo.caption}</span>
        </div>
      )}

      {/* Nav arrows */}
      {[{ side: 'left', Icon: ChevronLeft, fn: onPrev }, { side: 'right', Icon: ChevronRight, fn: onNext }].map(({ side, Icon, fn }) => (
        <button key={side} onClick={fn} style={{ position: 'absolute', [side]: 8, top: '50%', transform: 'translateY(-50%)', width: isMobile ? 36 : 30, height: isMobile ? 36 : 30, borderRadius: '50%', background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.14)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.55)'}>
          <Icon size={isMobile ? 18 : 15} />
        </button>
      ))}

      {/* Flash overlay */}
      <AnimatePresence>
        {flashActive && (
          <motion.div initial={{ opacity: 0.95 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.28, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: 0, background: '#fff', pointerEvents: 'none', zIndex: 30 }} />
        )}
      </AnimatePresence>

      {/* Roll-loading animation */}
      <AnimatePresence>
        {loadingRoll && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            style={{ position: 'absolute', inset: 0, background: '#000', zIndex: 25, overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div key={i} initial={{ x: '-110%' }} animate={{ x: '110%' }} transition={{ duration: 0.45, delay: i * 0.045, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: `${i * 13 + 2}%`, left: 0, right: 0, height: '10%', background: `linear-gradient(90deg, transparent, ${loadingColor}40, ${loadingColor}80, ${loadingColor}40, transparent)` }} />
            ))}
            <div style={{ display: 'flex', gap: 5, position: 'absolute', top: 8 }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div key={i} animate={{ opacity: [0.15, 0.9, 0.15] }} transition={{ duration: 0.3, delay: i * 0.04, repeat: Infinity }}
                  style={{ width: 7, height: 5, borderRadius: 1, border: `1px solid ${loadingColor}88`, background: 'rgba(0,0,0,0.6)' }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 5, position: 'absolute', bottom: 8 }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div key={i} animate={{ opacity: [0.15, 0.9, 0.15] }} transition={{ duration: 0.3, delay: i * 0.04, repeat: Infinity }}
                  style={{ width: 7, height: 5, borderRadius: 1, border: `1px solid ${loadingColor}88`, background: 'rgba(0,0,0,0.6)' }} />
              ))}
            </div>
            <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.5, repeat: Infinity }}
              style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.6rem', letterSpacing: '3px', color: loadingColor, zIndex: 1 }}>
              LOADING ROLL
            </motion.span>
            <div style={{ width: 60, height: 2, background: `linear-gradient(90deg, transparent, ${loadingColor}, transparent)`, zIndex: 1 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Camera body ──────────────────────────────────────────────── */
function CameraBody({ photo, direction, activeRoll, photoIndex, totalPhotos, onPrev, onNext, flashActive, onFlash, filterMode, onCycleFilter, loadingRoll, loadingColor, onAdvanceKnob, onNextRoll, isMobile }) {
  const filterIdx = FILTER_MODES.indexOf(filterMode);

  return (
    <div style={{ flex: 1, maxWidth: isMobile ? '100%' : 540, width: '100%', background: 'linear-gradient(155deg, #18202e, #0d1420, #080e18)', borderRadius: 18, padding: isMobile ? '14px 14px 16px' : '18px 20px 20px', boxShadow: '0 28px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: isMobile ? 10 : 14, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 14, borderRadius: '0 18px 18px 0', backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.03) 4px, rgba(255,255,255,0.03) 5px)', pointerEvents: 'none' }} />

      {/* Top plate */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onFlash} title="Flash"
          style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', background: flashActive ? 'linear-gradient(135deg,#fbbf2440,#fbbf2420)' : 'linear-gradient(135deg,#242d3e,#151d2a)', border: `1px solid ${flashActive ? '#fbbf2488' : 'rgba(255,255,255,0.07)'}`, borderRadius: 5, cursor: 'pointer', transition: 'all 0.2s' }}>
          <span style={{ fontSize: isMobile ? '0.85rem' : '0.7rem' }}>⚡</span>
          <span style={{ fontSize: isMobile ? '0.5rem' : '0.44rem', color: '#fbbf24', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1px', fontWeight: 700 }}>FLASH</span>
        </motion.button>

        <div style={{ textAlign: 'center', lineHeight: 1.3 }}>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: isMobile ? '0.7rem' : '0.76rem', fontWeight: 800, letterSpacing: '3px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>SOL CAMS</div>
          <div style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.15)', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1.5px' }}>35mm · DIGITAL</div>
        </div>

        <motion.div onClick={onCycleFilter} whileTap={{ scale: 0.9 }} animate={{ rotate: filterIdx * 120 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          title={`Filter: ${filterMode}`}
          style={{ width: isMobile ? 38 : 34, height: isMobile ? 38 : 34, borderRadius: '50%', background: 'radial-gradient(circle at 38% 35%, #252f40, #0f1620)', border: `2px solid ${filterMode !== 'normal' ? activeRoll.color + '88' : 'rgba(255,255,255,0.09)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: filterMode !== 'normal' ? `0 0 10px ${activeRoll.color}44` : 'none', cursor: 'pointer', position: 'relative' }}>
          <div style={{ width: 12, height: 2.5, borderRadius: 2, background: `linear-gradient(90deg, ${activeRoll.color}, transparent)` }} />
          <div style={{ position: 'absolute', bottom: -14, left: '50%', transform: 'translateX(-50%)', fontSize: '0.38rem', fontWeight: 700, color: activeRoll.color, fontFamily: "'Space Grotesk',sans-serif", whiteSpace: 'nowrap' }}>{FILTER_LABELS[filterMode]}</div>
        </motion.div>
      </div>

      {/* Body — on mobile: screen only (no lens) */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'stretch' }}>
        {!isMobile && (
          <div style={{ width: 88, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'radial-gradient(circle at 36% 36%, #1b2e4a, #060c18)', border: '4px solid #1a2233', boxShadow: 'inset 0 0 28px rgba(0,0,0,0.95), 0 0 0 2px rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: 66, height: 66, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)', background: `radial-gradient(circle at 40% 40%, ${activeRoll.color}06, transparent 60%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'radial-gradient(circle, #050810, #020408)' }} />
                </div>
              </div>
              <div style={{ position: 'absolute', top: 13, left: 16, width: 15, height: 9, borderRadius: '50%', background: 'rgba(255,255,255,0.09)', transform: 'rotate(-20deg)' }} />
            </div>
            <div style={{ display: 'flex', gap: 3 }}>
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} style={{ width: 2.5, height: 14, background: 'rgba(255,255,255,0.07)', borderRadius: 1 }} />
              ))}
            </div>
          </div>
        )}
        <PhotoScreen
          photo={photo} direction={direction} activeRoll={activeRoll}
          photoIndex={photoIndex} totalPhotos={totalPhotos}
          onPrev={onPrev} onNext={onNext}
          flashActive={flashActive} filterMode={filterMode}
          loadingRoll={loadingRoll} loadingColor={loadingColor}
          isMobile={isMobile}
        />
      </div>

      {/* Bottom plate */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: isMobile ? 6 : 8 }}>
        <div style={{ padding: '4px 10px', background: '#000', border: `1px solid ${activeRoll.color}30`, borderRadius: 5, fontFamily: "'Space Grotesk',sans-serif", fontSize: isMobile ? '0.75rem' : '0.82rem', fontWeight: 700, color: activeRoll.color, letterSpacing: '2px', minWidth: 52, textAlign: 'center', boxShadow: `inset 0 0 10px rgba(0,0,0,0.8)`, transition: 'border-color 0.3s, color 0.3s' }}>
          {String(photoIndex + 1).padStart(2, '0')}/{String(totalPhotos).padStart(2, '0')}
        </div>

        <motion.button whileTap={{ scale: 0.85, boxShadow: `0 0 24px ${activeRoll.color}aa` }} onClick={onNext} title="Shutter"
          style={{ width: isMobile ? 52 : 46, height: isMobile ? 52 : 46, borderRadius: '50%', cursor: 'pointer', background: `radial-gradient(circle at 40% 35%, ${activeRoll.color}cc, ${activeRoll.color}66)`, border: `3px solid ${activeRoll.color}55`, boxShadow: `0 0 14px ${activeRoll.color}44, inset 0 1px 0 rgba(255,255,255,0.2)`, transition: 'background 0.3s, border-color 0.3s' }} />

        <motion.div whileTap={{ scale: 0.95 }} onClick={onAdvanceKnob} title="Next photo"
          style={{ height: 30, flex: 1, maxWidth: isMobile ? 70 : 90, background: 'linear-gradient(180deg,#252f40,#141c28)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, cursor: 'pointer' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ width: 2, height: 12, background: 'rgba(255,255,255,0.12)', borderRadius: 1 }} />
          ))}
        </motion.div>

        <motion.div whileTap={{ scale: 0.85, rotate: 180 }} onClick={onNextRoll} title="Next roll"
          style={{ width: isMobile ? 36 : 30, height: isMobile ? 36 : 30, borderRadius: '50%', background: `${activeRoll.color}12`, border: `1.5px solid ${activeRoll.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? '1rem' : '0.9rem', transition: 'all 0.3s', cursor: 'pointer' }}>
          {activeRoll.icon}
        </motion.div>
      </div>
    </div>
  );
}

/* ── Gallery page ──────────────────────────────────────────────── */
export default function Gallery() {
  const isMobile = useIsMobile();
  const [activeId, setActiveId]         = useState('techcorp');
  const [photoIndex, setPhotoIndex]     = useState(0);
  const [direction, setDirection]       = useState(1);
  const [flashActive, setFlashActive]   = useState(false);
  const [filterMode, setFilterMode]     = useState('normal');
  const [loadingRoll, setLoadingRoll]   = useState(false);
  const [loadingColor, setLoadingColor] = useState('#00f0ff');

  const activeRoll = ROLLS.find(r => r.id === activeId) ?? ROLLS[0];

  const go = (dir) => {
    setDirection(dir);
    setPhotoIndex(i => (i + dir + activeRoll.photos.length) % activeRoll.photos.length);
  };

  const triggerFlash = () => {
    if (flashActive) return;
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 280);
  };

  const cycleFilter = () => setFilterMode(m => FILTER_MODES[(FILTER_MODES.indexOf(m) + 1) % FILTER_MODES.length]);

  const switchRoll = (roll) => {
    if (roll.id === activeId || loadingRoll) return;
    setLoadingColor(roll.color);
    setLoadingRoll(true);
    setTimeout(() => {
      setActiveId(roll.id);
      setPhotoIndex(0);
      setDirection(1);
      setTimeout(() => setLoadingRoll(false), 180);
    }, 650);
  };

  const cycleNextRoll = () => {
    const idx = ROLLS.findIndex(r => r.id === activeId);
    switchRoll(ROLLS[(idx + 1) % ROLLS.length]);
  };

  useEffect(() => {
    const len = activeRoll.photos.length;
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  { setDirection(1);  setPhotoIndex(i => (i + 1 + len) % len); }
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    { setDirection(-1); setPhotoIndex(i => (i - 1 + len) % len); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeRoll.photos.length]);

  return (
    <PageLayout>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: isMobile ? 20 : 32 }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8 }}>Gallery</h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '2.5px', textTransform: 'uppercase' }}>
          Pick a roll · Aim · Press shutter
        </p>
      </div>

      {isMobile ? (
        /* ── Mobile layout ── */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'stretch' }}>
          {/* Horizontal canister row */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: '0.45rem', fontWeight: 700, letterSpacing: '2px', color: 'rgba(255,255,255,0.2)', fontFamily: "'Space Grotesk',sans-serif", textTransform: 'uppercase' }}>Rolls</span>
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', width: '100%', justifyContent: 'center', paddingBottom: 4, scrollbarWidth: 'none' }}>
              {ROLLS.map(roll => (
                <FilmCanister key={roll.id} roll={roll} isActive={roll.id === activeId} onClick={() => switchRoll(roll)} compact />
              ))}
            </div>
          </div>

          {/* Camera full-width */}
          <CameraBody
            photo={activeRoll.photos[photoIndex]}
            direction={direction}
            activeRoll={activeRoll}
            photoIndex={photoIndex}
            totalPhotos={activeRoll.photos.length}
            onPrev={() => go(-1)}
            onNext={() => go(1)}
            flashActive={flashActive}
            onFlash={triggerFlash}
            filterMode={filterMode}
            onCycleFilter={cycleFilter}
            loadingRoll={loadingRoll}
            loadingColor={loadingColor}
            onAdvanceKnob={() => go(1)}
            onNextRoll={cycleNextRoll}
            isMobile
          />

          {/* Horizontal film strip */}
          <FilmStripH
            photos={activeRoll.photos}
            activeIndex={photoIndex}
            color={activeRoll.color}
            onSelect={(i) => { setDirection(i > photoIndex ? 1 : -1); setPhotoIndex(i); }}
          />
        </div>
      ) : (
        /* ── Desktop layout ── */
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
            <span style={{ fontSize: '0.5rem', fontWeight: 700, letterSpacing: '2px', color: 'rgba(255,255,255,0.2)', fontFamily: "'Space Grotesk',sans-serif", textTransform: 'uppercase' }}>Rolls</span>
            {ROLLS.map(roll => (
              <FilmCanister key={roll.id} roll={roll} isActive={roll.id === activeId} onClick={() => switchRoll(roll)} />
            ))}
          </div>

          <CameraBody
            photo={activeRoll.photos[photoIndex]}
            direction={direction}
            activeRoll={activeRoll}
            photoIndex={photoIndex}
            totalPhotos={activeRoll.photos.length}
            onPrev={() => go(-1)}
            onNext={() => go(1)}
            flashActive={flashActive}
            onFlash={triggerFlash}
            filterMode={filterMode}
            onCycleFilter={cycleFilter}
            loadingRoll={loadingRoll}
            loadingColor={loadingColor}
            onAdvanceKnob={() => go(1)}
            onNextRoll={cycleNextRoll}
            isMobile={false}
          />

          <FilmStrip
            photos={activeRoll.photos}
            activeIndex={photoIndex}
            color={activeRoll.color}
            onSelect={(i) => { setDirection(i > photoIndex ? 1 : -1); setPhotoIndex(i); }}
          />
        </div>
      )}

      <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '2px' }}>
        {isMobile
          ? 'TAP ARROWS · SHUTTER = NEXT · DIAL = FILTER'
          : '← → ARROW KEYS · SHUTTER = NEXT · KNOB = NEXT · DIAL = FILTER · ⚡ = FLASH'}
      </p>
    </PageLayout>
  );
}
