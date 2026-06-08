import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

import Navbar        from './components/Navbar';
import Footer        from './components/Footer';
import CursorGlow    from './components/CursorGlow';
import AmbientGlow   from './components/AmbientGlow';
import RobotAssistant from './components/RobotAssistant';

const Home        = lazy(() => import('./pages/Home'));
const About       = lazy(() => import('./pages/About'));
const Events      = lazy(() => import('./pages/Events'));
const Team        = lazy(() => import('./pages/Team'));
const Research    = lazy(() => import('./pages/Research'));
const Contact     = lazy(() => import('./pages/Contact'));
const EventDetails= lazy(() => import('./pages/EventDetails'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const Gallery     = lazy(() => import('./pages/Gallery'));

/* ── Scroll-to-top on route change ──────────────────────────── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

/* ── Page transition ─────────────────────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeIn' } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ position: 'relative' }}
      >
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/"              element={<Home />} />
            <Route path="/about"         element={<About />} />
            <Route path="/events"        element={<Events />} />
            <Route path="/team"          element={<Team />} />
            <Route path="/research"      element={<Research />} />
            <Route path="/contact"       element={<Contact />} />
            <Route path="/gallery"       element={<Gallery />} />
            <Route path="/event-details" element={<EventDetails />} />
            <Route path="/leaderboard"   element={<Leaderboard />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function PageLoader() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ color: '#00f0ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', letterSpacing: '4px' }}
      >
        LOADING...
      </motion.div>
    </div>
  );
}

/* ── Deterministic particles (no Math.random in render) ──────── */
const PARTICLES = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  const dist  = 70 + (i % 4) * 22;
  const colors = ['#00f0ff', '#7c3aed', '#ffd700', '#10b981'];
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    color: colors[i % colors.length],
    size: 3 + (i % 3),
    delay: i * 0.038,
  };
});

const TEXT_LETTERS = 'STATS O LOCKED'.split('');

/* ── Intro overlay ───────────────────────────────────────────── */
function IntroOverlay({ onDone }) {
  const [phase, setPhase] = useState(0);
  const [logoFinalX, setLogoFinalX] = useState(null);
  const placeholderRef = useRef(null);

  /* Measure where the brand-row placeholder sits so the logo rolls
     to exactly that position, aligning logo with the text row.    */
  useEffect(() => {
    const measure = () => {
      if (!placeholderRef.current) return;
      const rect = placeholderRef.current.getBoundingClientRect();
      setLogoFinalX(rect.left + rect.width / 2 - window.innerWidth / 2);
    };
    measure();
    const t = setTimeout(measure, 120); // re-measure after fonts load
    return () => clearTimeout(t);
  }, []);

  /* Phase timeline */
  useEffect(() => {
    const ts = [
      setTimeout(() => setPhase(1), 80),   // crosshairs + rings + grid flash
      setTimeout(() => setPhase(2), 540),  // logo materialises
      setTimeout(() => setPhase(3), 1300), // logo slides right
      setTimeout(() => setPhase(4), 1880), // logo rolls left, text reveals
      setTimeout(() => setPhase(5), 3100), // settled — brief glow pulse
      setTimeout(onDone, 3650),            // exit begins
    ];
    return () => ts.forEach(clearTimeout);
  }, [onDone]);

  const LOGO_SIZE  = 96;
  const finalX     = logoFinalX ?? -Math.round(window.innerWidth * 0.18);

  /* Logo x: center → right → final(left) */
  const logoX      = phase >= 4 ? finalX : phase >= 3 ? 280 : 0;

  /* Logo rotation: small clockwise going right, rolls counter-clockwise coming back.
     Rolling distance ≈ 280 - finalX px; rotation = dist / radius in radians → degrees */
  const rollDist   = 280 - finalX;
  const rollDeg    = (rollDist / (LOGO_SIZE / 2)) * (180 / Math.PI);
  const logoRotate = phase >= 4 ? (40 - rollDeg) : phase >= 3 ? 40 : 0;

  /* Per-phase logo transition curves */
  const logoTrans  = phase >= 4
    ? { x: { duration: 1.05, ease: [0.4, 0, 0.15, 1] }, rotate: { duration: 1.05, ease: [0.4, 0, 0.15, 1] } }
    : phase >= 3
      ? { x: { duration: 0.52, ease: [0.55, 0, 1, 1] }, rotate: { duration: 0.52, ease: [0.55, 0, 1, 1] } }
      : { opacity: { duration: 0.55 }, scale: { duration: 0.62, type: 'spring', stiffness: 320, damping: 22 }, filter: { duration: 0.55 } };

  return (
    <motion.div
      /* Curtain slides upward — website is already loaded underneath */
      exit={{ y: '-100%', transition: { duration: 0.78, ease: [0.76, 0, 0.24, 1] } }}
      style={{
        position: 'fixed', inset: 0,
        background: '#020b16',
        zIndex: 99999,
        overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >

      {/* ── Scanline texture ──────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,240,255,0.009) 2px,rgba(0,240,255,0.009) 4px)',
      }} />

      {/* ── Power-on flash ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.18, 0] }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, background: '#00f0ff', pointerEvents: 'none', zIndex: 1 }}
      />

      {/* ── Grid flash ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? [0.28, 0] : 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          backgroundImage: 'linear-gradient(rgba(0,240,255,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.07) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Targeting crosshair — horizontal ─────────────────── */}
      <motion.div
        initial={{ scaleX: 1, opacity: 0 }}
        animate={{ scaleX: phase >= 1 ? [1, 0] : 1, opacity: phase >= 1 ? [0.75, 0] : 0 }}
        transition={{ duration: 0.58, ease: [0.4, 0, 1, 1] }}
        style={{
          position: 'absolute', height: 1, width: '100vw', pointerEvents: 'none', zIndex: 2,
          background: 'linear-gradient(90deg,transparent 0%,rgba(0,240,255,0.55) 15%,#00f0ff 50%,rgba(0,240,255,0.55) 85%,transparent 100%)',
        }}
      />

      {/* ── Targeting crosshair — vertical ───────────────────── */}
      <motion.div
        initial={{ scaleY: 1, opacity: 0 }}
        animate={{ scaleY: phase >= 1 ? [1, 0] : 1, opacity: phase >= 1 ? [0.75, 0] : 0 }}
        transition={{ duration: 0.58, ease: [0.4, 0, 1, 1] }}
        style={{
          position: 'absolute', width: 1, height: '100vh', pointerEvents: 'none', zIndex: 2,
          background: 'linear-gradient(180deg,transparent 0%,rgba(0,240,255,0.55) 15%,#00f0ff 50%,rgba(0,240,255,0.55) 85%,transparent 100%)',
        }}
      />

      {/* ── Expanding rings ───────────────────────────────────── */}
      {[0, 1, 2, 3].map(i => (
        <motion.div key={`ring-${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={phase >= 1
            ? { scale: [0, 5], opacity: [0, 0.7, 0] }
            : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: 1.55,
            delay: i * 0.19,
            ease: [0.2, 0, 0.8, 1],
            opacity: { times: [0, 0.07, 1] },
          }}
          style={{
            position: 'absolute', pointerEvents: 'none', zIndex: 2,
            width: 100, height: 100, borderRadius: '50%',
            border: `1.5px solid ${i % 2 === 0 ? 'rgba(0,240,255,0.75)' : 'rgba(124,58,237,0.65)'}`,
          }}
        />
      ))}

      {/* ── Particles burst outward ───────────────────────────── */}
      {phase >= 1 && PARTICLES.map((p, i) => (
        <motion.div key={`p-${i}`}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{ x: p.x, y: p.y, opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: 1.05, delay: p.delay, ease: 'easeOut', opacity: { times: [0, 0.18, 1] } }}
          style={{
            position: 'absolute', pointerEvents: 'none', zIndex: 2,
            width: p.size, height: p.size, borderRadius: '50%',
            background: p.color, boxShadow: `0 0 7px ${p.color}`,
          }}
        />
      ))}

      {/* ── Logo ──────────────────────────────────────────────── */}
      <motion.div
        animate={{
          x: logoX,
          rotate: logoRotate,
          opacity: phase >= 2 ? 1 : 0,
          scale:   phase >= 2 ? 1 : 0.12,
          filter:  phase >= 2 ? 'blur(0px)' : 'blur(24px)',
        }}
        transition={logoTrans}
        style={{
          position: 'absolute',
          left: '50%', top: '50%',
          marginLeft: -(LOGO_SIZE / 2),
          marginTop:  -(LOGO_SIZE / 2),
          zIndex: 4,
          borderRadius: '50%',
          transformOrigin: 'center center',
        }}
      >
        {/* Glow ring around logo — pulses when settled */}
        <motion.div
          animate={phase >= 5
            ? { boxShadow: ['0 0 0px rgba(0,240,255,0)', '0 0 60px rgba(0,240,255,0.9)', '0 0 30px rgba(0,240,255,0.4)'] }
            : { boxShadow: '0 0 30px rgba(0,240,255,0.45)' }
          }
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ borderRadius: '50%' }}
        >
          <img
            src="/logo.webp" alt="SOL"
            style={{
              width: LOGO_SIZE, height: LOGO_SIZE,
              borderRadius: '50%', objectFit: 'cover',
              border: '2.5px solid rgba(0,240,255,0.75)',
              display: 'block',
              boxShadow: '0 0 28px rgba(0,240,255,0.5), 0 0 60px rgba(0,240,255,0.18)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* ── Brand lockup row ──────────────────────────────────── */}
      {/* Invisible placeholder holds logo's space; actual logo floats above it */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', alignItems: 'center', gap: '22px',
        pointerEvents: 'none', zIndex: 3,
      }}>
        {/* Logo space-holder — measured so we can roll the logo here */}
        <div
          ref={placeholderRef}
          style={{ width: LOGO_SIZE, height: LOGO_SIZE, flexShrink: 0, opacity: 0 }}
        />

        {/* "STATS O LOCKED" — letter-by-letter reveal */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {TEXT_LETTERS.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 32, filter: 'blur(12px)' }}
              animate={phase >= 4
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 32, filter: 'blur(12px)' }
              }
              transition={{
                delay:    phase >= 4 ? i * 0.052 : 0,
                duration: 0.38,
                ease:     [0.22, 1, 0.36, 1],
              }}
              style={{
                fontFamily:  "'Space Grotesk', sans-serif",
                fontSize:    'clamp(1.5rem, 3.2vw, 3rem)',
                fontWeight:  800,
                letterSpacing: '0.07em',
                lineHeight:  1,
                color:       ch === ' ' ? 'transparent' : '#fff',
                textShadow:  ch !== ' ' ? '0 0 40px rgba(0,240,255,0.22)' : 'none',
                userSelect:  'none',
              }}
            >
              {ch === ' ' ? '  ' : ch}
            </motion.span>
          ))}
        </div>
      </div>

      {/* ── Glow burst when logo lands ────────────────────────── */}
      {phase >= 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 0.55, 0], scale: [0.6, 2.2, 3.5] }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: 160, height: 160, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,240,255,0.4) 0%, rgba(124,58,237,0.15) 55%, transparent 80%)',
            left: `calc(50% + ${finalX}px - 80px)`,
            top:  'calc(50% - 80px)',
            pointerEvents: 'none', zIndex: 3,
          }}
        />
      )}

      {/* ── Thin bottom highlight line (matches website Hero border) */}
      <motion.div
        animate={{ opacity: phase >= 4 ? [0, 0.6, 0.35] : 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg,transparent,rgba(0,240,255,0.6),rgba(124,58,237,0.4),transparent)',
          pointerEvents: 'none', zIndex: 5,
        }}
      />

    </motion.div>
  );
}

/* ── Root ────────────────────────────────────────────────────── */
export default function App() {
  const [introVisible, setIntroVisible] = useState(true);

  return (
    <div style={{ minHeight: '100vh', background: '#020b16' }}>
      <AmbientGlow />
      <CursorGlow />

      {/* Website is always mounted — it loads behind the intro for a seamless blend */}
      <HashRouter>
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
        <RobotAssistant />
      </HashRouter>

      {/* Intro overlay slides upward to reveal the already-loaded website */}
      <AnimatePresence>
        {introVisible && (
          <IntroOverlay onDone={() => setIntroVisible(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
