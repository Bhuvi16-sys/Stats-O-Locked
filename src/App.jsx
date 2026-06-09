import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

import Navbar         from './components/Navbar';
import Footer         from './components/Footer';
import CursorGlow     from './components/CursorGlow';
import AmbientGlow    from './components/AmbientGlow';
import RobotAssistant from './components/RobotAssistant';

/* Static imports — available instantly, no Suspense blank flash */
import About        from './pages/About';
import Events       from './pages/Events';
import Team         from './pages/Team';
import Research     from './pages/Research';
import Contact      from './pages/Contact';
import EventDetails from './pages/EventDetails';
import Leaderboard  from './pages/Leaderboard';
import Gallery      from './pages/Gallery';

/* Home stays lazy — it pulls in Three.js (~2 MB), keep it in its own chunk */
const Home = lazy(() => import('./pages/Home'));

/* Only prefetch Home's chunk during the intro (everything else is already bundled) */
function prefetchAll() {
  return import('./pages/Home');
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="sync" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.18, ease: 'easeOut' } }}
        exit={{ opacity: 0, transition: { duration: 0.12, ease: 'easeIn' } }}
        style={{ position: 'relative', minHeight: '60vh' }}
      >
        <ScrollToTop />
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#020b16' }} />}>
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

/* ─────────────────────────────────────────────────────────────────
   INTRO OVERLAY
   Rules:
   • All continuous motion = pure CSS @keyframes (compositor thread)
   • Framer Motion = one-shot entry / exit only
   • Background mirrors the website ambient glows → seamless fade
   • The site is NOT mounted while the intro is visible, so Three.js
     has zero GPU competition.
   • onDone fires only after BOTH the minimum animation time
     AND every page chunk have finished loading.
───────────────────────────────────────────────────────────────── */

const INTRO_CSS = `
  @keyframes sol-cw  { to { transform: rotate( 360deg) } }
  @keyframes sol-ccw { to { transform: rotate(-360deg) } }
  @keyframes sol-pulse {
    0%,100% { box-shadow: 0 0 0 2px rgba(0,240,255,0.28), 0 0 22px rgba(0,240,255,0.12); }
    50%     { box-shadow: 0 0 0 2px rgba(0,240,255,0.60), 0 0 40px rgba(0,240,255,0.30); }
  }
`;

const MIN_INTRO_MS = 2200; /* minimum visible time even on fast connections */

function IntroOverlay({ onDone }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    /* Animation phases */
    const t1 = setTimeout(() => setPhase(1), 80);  /* orbital system + logo  */
    const t2 = setTimeout(() => setPhase(2), 860); /* club name + subtitle   */

    /* Exit only when BOTH the minimum animation time and every page chunk
       have finished loading. On a fast connection this fires right at
       MIN_INTRO_MS; on a slow one it waits a bit longer — no spinner. */
    const minDone    = new Promise(r => setTimeout(r, MIN_INTRO_MS));
    const allChunks  = prefetchAll();

    Promise.all([minDone, allChunks]).then(() => {
      /* Brief hold so the user sees the loaded state, then exit */
      setTimeout(onDone, 380);
    });

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.55, ease: 'easeIn' } }}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: [
          'radial-gradient(ellipse 55% 55% at -5%  -5%,  rgba(0,240,255,0.18)  0%, transparent 60%)',
          'radial-gradient(ellipse 55% 55% at 105% 105%, rgba(124,58,237,0.20) 0%, transparent 60%)',
          'radial-gradient(ellipse 40% 40% at 88%   8%,  rgba(59,130,246,0.14) 0%, transparent 50%)',
          '#020b16',
        ].join(','),
      }}
    >
      <style>{INTRO_CSS}</style>

      {/* Static grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage:
          'linear-gradient(rgba(0,240,255,0.028) 1px,transparent 1px),' +
          'linear-gradient(90deg,rgba(0,240,255,0.028) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Corner brackets */}
      {[
        { top: 28, left: 28,     borderTop:    '1px solid rgba(0,240,255,0.5)', borderLeft:   '1px solid rgba(0,240,255,0.5)' },
        { top: 28, right: 28,    borderTop:    '1px solid rgba(0,240,255,0.5)', borderRight:  '1px solid rgba(0,240,255,0.5)' },
        { bottom: 28, left: 28,  borderBottom: '1px solid rgba(0,240,255,0.5)', borderLeft:   '1px solid rgba(0,240,255,0.5)' },
        { bottom: 28, right: 28, borderBottom: '1px solid rgba(0,240,255,0.5)', borderRight:  '1px solid rgba(0,240,255,0.5)' },
      ].map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 0.9 : 0 }}
          transition={{ duration: 0.3, delay: i * 0.06 }}
          style={{ position: 'absolute', width: 22, height: 22, ...s }}
        />
      ))}

      {/* ── Orbital system ── 200×200; logo at top:52 left:52; pivot (100,100) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ position: 'relative', width: 200, height: 200, marginBottom: 30 }}
      >
        {/* Ring 1 — cyan r=70, CW 4s, 270° arc */}
        <div style={{
          position: 'absolute', top: 30, left: 30, width: 140, height: 140,
          borderRadius: '50%', border: '1px solid rgba(0,240,255,0.5)',
          borderTopColor: 'transparent',
          animation: 'sol-cw 4s linear infinite',
        }} />

        {/* Ring 2 — purple r=84, CCW 7s, 270° arc */}
        <div style={{
          position: 'absolute', top: 16, left: 16, width: 168, height: 168,
          borderRadius: '50%', border: '1px solid rgba(124,58,237,0.4)',
          borderRightColor: 'transparent',
          animation: 'sol-ccw 7s linear infinite',
        }} />

        {/* Ring 3 — blue r=100, CW 13s, 270° arc */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: 200, height: 200,
          borderRadius: '50%', border: '0.75px solid rgba(59,130,246,0.28)',
          borderBottomColor: 'transparent',
          animation: 'sol-cw 13s linear infinite',
        }} />

        {/* Dot 1 — cyan r=76, CW 4.5s */}
        <div style={{ position: 'absolute', inset: 0, animation: 'sol-cw 4.5s linear infinite' }}>
          <div style={{
            position: 'absolute', top: 21, left: 97, width: 6, height: 6,
            borderRadius: '50%', background: '#00f0ff',
            boxShadow: '0 0 7px rgba(0,240,255,0.95)',
          }} />
        </div>

        {/* Dot 2 — purple r=88, CCW 7.5s */}
        <div style={{ position: 'absolute', inset: 0, animation: 'sol-ccw 7.5s linear infinite' }}>
          <div style={{
            position: 'absolute', top: 9, left: 97, width: 5, height: 5,
            borderRadius: '50%', background: '#7c3aed',
            boxShadow: '0 0 7px rgba(124,58,237,0.95)',
          }} />
        </div>

        {/* Dot 3 — blue r=100, CW 13.5s */}
        <div style={{ position: 'absolute', inset: 0, animation: 'sol-cw 13.5s linear infinite' }}>
          <div style={{
            position: 'absolute', top: -3, left: 97, width: 4, height: 4,
            borderRadius: '50%', background: '#3b82f6',
            boxShadow: '0 0 6px rgba(59,130,246,0.9)',
          }} />
        </div>

        {/* Ping ring — one-shot Framer Motion */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: phase >= 1 ? [0.5, 2.6] : 0.5, opacity: phase >= 1 ? [0.7, 0] : 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          style={{
            position: 'absolute', top: 52, left: 52, width: 96, height: 96,
            borderRadius: '50%', border: '1.5px solid rgba(0,240,255,0.65)',
            pointerEvents: 'none',
          }}
        />

        {/* Logo */}
        <motion.div
          initial={{ scale: 0.78, opacity: 0 }}
          animate={{ scale: phase >= 1 ? 1 : 0.78, opacity: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'absolute', top: 52, left: 52 }}
        >
          <img
            src="/logo.webp" alt="SOL"
            style={{
              width: 96, height: 96, borderRadius: '50%', objectFit: 'cover',
              display: 'block', animation: 'sol-pulse 2.4s ease-in-out infinite',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Club name + subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 14 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center' }}
      >
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 800, letterSpacing: '0.1em',
          color: '#fff', lineHeight: 1, marginBottom: 10,
        }}>
          STATS-O-LOCKED
        </div>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.7rem', fontWeight: 500,
          letterSpacing: '3.5px', color: 'rgba(0,240,255,0.6)',
          textTransform: 'uppercase',
        }}>
          VIT Bhopal &middot; AI &amp; Data Club
        </div>
      </motion.div>

    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ROOT
   • Site is NOT mounted during intro → Three.js has zero GPU load
   • handleIntroDone: mount site + start exit simultaneously.
     All lazy chunks are already resolved, so the site renders
     instantly — no Suspense fallback is ever shown.
───────────────────────────────────────────────────────────────── */
/* ─────────────────────────────────────────────────────────────────
   Smooth crossfade: intro ──► site

   1. onDone  → mount site at opacity 0 (invisible under intro)
   2. +150 ms → React has painted site's first frame;
                start BOTH fades simultaneously:
                  intro: opacity 1 → 0  (0.6 s)
                  site:  opacity 0 → 1  (0.6 s)
   3. +750 ms → complete. No blank frame, no flash.

   Both backgrounds are identical gradients so the overlap
   is a perfect seamless blend.
───────────────────────────────────────────────────────────────── */
export default function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const [siteMounted,  setSiteMounted]  = useState(false);
  const [siteVisible,  setSiteVisible]  = useState(false);

  const handleIntroDone = () => {
    setSiteMounted(true);           // render site tree at opacity 0
    setTimeout(() => {
      setIntroVisible(false);       // intro  opacity 1 → 0
      setSiteVisible(true);         // site   opacity 0 → 1
    }, 150);                        // 150 ms: React paints first frame
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020b16' }}>
      <AmbientGlow />
      <CursorGlow />

      {siteMounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: siteVisible ? 1 : 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ minHeight: '100vh' }}
        >
          <HashRouter>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <main style={{ flex: 1 }}><AnimatedRoutes /></main>
              <Footer />
            </div>
            <RobotAssistant />
          </HashRouter>
        </motion.div>
      )}

      <AnimatePresence>
        {introVisible && <IntroOverlay onDone={handleIntroDone} />}
      </AnimatePresence>
    </div>
  );
}
