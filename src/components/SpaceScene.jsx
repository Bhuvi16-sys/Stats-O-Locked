import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const rnd = (a, b) => Math.random() * (b - a) + a;

/* ── Rock shapes ──────────────────────────────────────────────── */
const ROCK_SHAPES = [
  'polygon(22% 0%,78% 4%,100% 30%,94% 72%,70% 100%,28% 96%,4% 68%,0% 26%)',
  'polygon(42% 0%,88% 14%,100% 50%,76% 94%,36% 100%,6% 72%,0% 28%,20% 4%)',
  'polygon(30% 0%,80% 0%,100% 22%,92% 74%,66% 100%,24% 100%,2% 70%,8% 22%)',
  'polygon(38% 2%,92% 20%,96% 60%,70% 100%,28% 94%,0% 58%,10% 16%,30% 0%)',
  'polygon(52% 0%,94% 22%,98% 62%,72% 100%,24% 98%,2% 64%,8% 20%,42% 0%)',
];
const ROCK_COLORS = ['#3d3d4e','#4a4038','#3a4a3a','#4e3d3d','#3d4a4e'];

/* ── Planet types ─────────────────────────────────────────────── */
const PLANET_TYPES = [
  { base:'#c2410c', hi:'#fb923c', shadow:'#431407', ring:true,  ringCol:'#fbbf24' },
  { base:'#1d4ed8', hi:'#93c5fd', shadow:'#1e3a8a', ring:false, ringCol:'' },
  { base:'#6d28d9', hi:'#c084fc', shadow:'#2e1065', ring:true,  ringCol:'#e879f9' },
];

/* ── Crystal colors ───────────────────────────────────────────── */
const CRYSTAL_COLS = [
  { main:'#00f0ff', glow:'#06b6d4' },
  { main:'#c084fc', glow:'#a855f7' },
  { main:'#34d399', glow:'#10b981' },
  { main:'#fbbf24', glow:'#f59e0b' },
  { main:'#f87171', glow:'#ef4444' },
];

/* ── Globe exclusion zone: center 22–78% x, 18–82% y ─────────── */
function posOutsideGlobe() {
  const zone = Math.floor(rnd(0, 4));
  if (zone === 0) return { x: rnd(2,  19), y: rnd(5,  92) }; // left
  if (zone === 1) return { x: rnd(81, 96), y: rnd(5,  92) }; // right
  if (zone === 2) return { x: rnd(5,  92), y: rnd(2,  15) }; // top
  return               { x: rnd(5,  92), y: rnd(85, 95) }; // bottom
}

function makeRock(id) {
  const { x, y } = posOutsideGlobe();
  return {
    id, x, y,
    size: rnd(38, 60),
    shape: ROCK_SHAPES[Math.floor(rnd(0, ROCK_SHAPES.length))],
    color: ROCK_COLORS[Math.floor(rnd(0, ROCK_COLORS.length))],
    driftX: rnd(-55, 55), driftY: rnd(-38, 38),
    driftDur: rnd(9, 18),
    rotateDur: rnd(7, 20),
    rotateDir: Math.random() > 0.5 ? 360 : -360,
  };
}

function makePlanet(id) {
  const { x, y } = posOutsideGlobe();
  return { id, x, y, size: rnd(48, 70), typeIdx: Math.floor(rnd(0, PLANET_TYPES.length)), bobDur: rnd(4,7), bobAmt: rnd(8,16) };
}

function makeCrystal(id) {
  const { x, y } = posOutsideGlobe();
  return { id, x, y, size: rnd(20, 34), colIdx: Math.floor(rnd(0, CRYSTAL_COLS.length)), pulseDur: rnd(1.5,3), pulseDelay: rnd(0,4) };
}

function makeStars() {
  return Array.from({ length: 30 }, (_, i) => {
    const { x, y } = posOutsideGlobe();
    return { id: i, x, y, size: rnd(1.5, 4), dur: rnd(1.8, 4.5), delay: rnd(0, 5) };
  });
}

/* ── Plasma Burst — portal-rendered so no parent CSS can clip it  */
const BURST_COLS = ['#ff4500','#ff8c00','#ffd700','#fff','#ef4444','#f97316','#fde68a'];

function PlasmaBurst({ cx, cy, size }) {
  const [gone, setGone] = useState(false);
  if (gone) return null;

  const half = size;               // half-size for centering circles
  const N    = 18;

  return createPortal(
    <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:9999, overflow:'visible' }}>

      {/* ── White core flash ── */}
      <motion.div
        initial={{ scale:0.2, opacity:1 }}
        animate={{ scale:7, opacity:0 }}
        transition={{ duration:0.22 }}
        style={{
          position:'absolute', left:cx - half, top:cy - half,
          width:half*2, height:half*2, borderRadius:'50%',
          background:'radial-gradient(circle,#fff 0%,#ffd700 28%,#ff6600 58%,#c00 82%,transparent 100%)',
        }}
      />

      {/* ── Orange shockwave ring ── */}
      <motion.div
        initial={{ scale:0.15, opacity:1 }}
        animate={{ scale:9, opacity:0 }}
        transition={{ duration:0.32 }}
        style={{
          position:'absolute', left:cx - half, top:cy - half,
          width:half*2, height:half*2, borderRadius:'50%',
          border:'4px solid #ff6600',
        }}
      />

      {/* ── Red outer ring ── */}
      <motion.div
        initial={{ scale:0.1, opacity:0.9 }}
        animate={{ scale:13, opacity:0 }}
        transition={{ duration:0.42, delay:0.04 }}
        style={{
          position:'absolute', left:cx - half, top:cy - half,
          width:half*2, height:half*2, borderRadius:'50%',
          border:'2px solid #ef4444',
        }}
      />

      {/* ── Heat glow blob ── */}
      <motion.div
        initial={{ scale:0.3, opacity:0.85 }}
        animate={{ scale:5, opacity:0 }}
        transition={{ duration:0.45 }}
        style={{
          position:'absolute', left:cx - half*2, top:cy - half*2,
          width:half*4, height:half*4, borderRadius:'50%',
          background:'radial-gradient(circle,rgba(255,140,0,0.75) 0%,transparent 70%)',
          filter:'blur(12px)',
        }}
      />

      {/* ── Debris chunks ── */}
      {Array.from({ length:N }).map((_, i) => {
        const angle  = (i / N) * Math.PI * 2 + rnd(-0.15, 0.15);
        const speed  = rnd(90, 210);
        const dx     = Math.cos(angle) * speed;
        const dy     = Math.sin(angle) * speed;
        const sz     = rnd(8, 20);
        const col    = BURST_COLS[i % BURST_COLS.length];
        const isRock = i % 3 !== 0;
        return (
          <motion.div key={i}
            initial={{ x:0, y:0, opacity:1, scale:1, rotate:0 }}
            animate={{ x:dx, y:dy, opacity:0, scale:0, rotate:rnd(-360,360) }}
            transition={{ duration:rnd(0.28, 0.5), ease:'easeOut', delay:i * 0.008 }}
            onAnimationComplete={i === N - 1 ? () => setGone(true) : undefined}
            style={{
              position:'absolute', left:cx - sz/2, top:cy - sz/2,
              width:sz, height:sz,
              background:col,
              borderRadius: isRock ? '25%' : '50%',
              boxShadow:`0 0 8px ${col}, 0 0 18px ${col}80`,
            }}
          />
        );
      })}

      {/* ── Spark streaks ── */}
      {Array.from({ length:12 }).map((_, i) => {
        const angle = rnd(0, Math.PI * 2);
        const spd   = rnd(size * 3, size * 6);
        const dx    = Math.cos(angle) * spd;
        const dy    = Math.sin(angle) * spd - rnd(20, 60);
        const len   = rnd(12, 30);
        return (
          <motion.div key={`sp-${i}`}
            initial={{ x:0, y:0, opacity:1 }}
            animate={{ x:dx, y:dy, opacity:0 }}
            transition={{ duration:rnd(0.25, 0.5), ease:'easeOut' }}
            style={{
              position:'absolute', left:cx - 1, top:cy - len/2,
              width:3, height:len,
              background:'linear-gradient(180deg,#fff,#ffd700,transparent)',
              borderRadius:2, transform:`rotate(${angle + Math.PI/2}rad)`,
            }}
          />
        );
      })}
    </div>,
    document.body
  );
}

/* ── Crystal shatter burst ────────────────────────────────────── */
function CrystalBurst({ x, y, color }) {
  const N = 18;
  return (
    <div style={{ position:'absolute', left:`${x}vw`, top:`${y}vh`, pointerEvents:'none', zIndex:80 }}>
      <motion.div
        initial={{ scale:0, opacity:1 }}
        animate={{ scale:7, opacity:0 }}
        transition={{ duration:0.45, ease:'easeOut' }}
        style={{
          position:'absolute', width:28, height:28, borderRadius:'50%',
          background:`radial-gradient(circle, #fff 0%, ${color} 40%, transparent 70%)`,
          transform:'translate(-14px,-14px)', filter:'blur(4px)',
        }}
      />
      {Array.from({ length:N }).map((_, i) => {
        const angle = (i / N) * 2 * Math.PI;
        const dist  = rnd(35, 85);
        const dx    = Math.cos(angle) * dist;
        const dy    = Math.sin(angle) * dist;
        const sz    = rnd(4, 11);
        return (
          <motion.div key={i}
            initial={{ x:0, y:0, opacity:1, scale:1, rotate:0 }}
            animate={{ x:dx, y:dy, opacity:0, scale:0, rotate:rnd(-180,180) }}
            transition={{ duration: rnd(0.3, 0.65), ease:'easeOut', delay: i * 0.012 }}
            style={{
              position:'absolute', width:sz, height:sz,
              background:`linear-gradient(135deg, #fff, ${color})`,
              clipPath:'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              boxShadow:`0 0 6px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Star burst ───────────────────────────────────────────────── */
function StarBurst({ x, y }) {
  return (
    <div style={{ position:'absolute', left:`${x}vw`, top:`${y}vh`, pointerEvents:'none', zIndex:70 }}>
      {Array.from({ length:10 }).map((_, i) => {
        const angle = (i / 10) * 2 * Math.PI;
        const dist  = rnd(25, 65);
        return (
          <motion.div key={i}
            initial={{ x:0, y:0, opacity:1, scale:1 }}
            animate={{ x:Math.cos(angle)*dist, y:Math.sin(angle)*dist, opacity:0, scale:0 }}
            transition={{ duration:0.55, ease:'easeOut', delay:i*0.025 }}
            style={{
              position:'absolute', width:4, height:4, borderRadius:'50%',
              background: i % 3 === 0 ? '#c084fc' : '#00f0ff',
              boxShadow:`0 0 6px ${i % 3 === 0 ? '#c084fc' : '#00f0ff'}`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Star ─────────────────────────────────────────────────────── */
function Star({ data }) {
  const [burst, setBurst] = useState(false);
  const click = (e) => {
    e.stopPropagation();
    if (burst) return;
    setBurst(true);
    setTimeout(() => setBurst(false), 600);
  };
  return (
    <>
      <div onClick={click} style={{
        position:'absolute', left:`calc(${data.x}vw - 14px)`, top:`calc(${data.y}vh - 14px)`,
        width:28, height:28, pointerEvents:'auto', zIndex:15,
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        <motion.div
          style={{ width:data.size, height:data.size, borderRadius:'50%', background:'#fff', flexShrink:0,
            boxShadow:`0 0 ${data.size*2}px rgba(255,255,255,0.5)` }}
          animate={burst ? {
            scale:[1,7,1.2,1],
            boxShadow:[
              `0 0 ${data.size*2}px rgba(255,255,255,0.5)`,
              `0 0 ${data.size*22}px rgba(0,240,255,1), 0 0 ${data.size*40}px rgba(0,240,255,0.5)`,
              `0 0 ${data.size*8}px rgba(0,240,255,0.4)`,
              `0 0 ${data.size*2}px rgba(255,255,255,0.5)`,
            ],
          } : {}}
          transition={burst ? { duration:0.6, ease:'easeOut' } : {}}
        />
      </div>
      {burst && <StarBurst x={data.x} y={data.y} />}
    </>
  );
}

/* ── UFO ──────────────────────────────────────────────────────── */
function UFO() {
  const [px, setPx]           = useState(0);
  const [py, setPy]           = useState(0);
  const [lights, setLights]   = useState(true);
  const [beaming, setBeaming] = useState(false);
  const [warping, setWarping] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const init = useRef(false);

  useEffect(() => {
    if (!init.current) {
      init.current = true;
      setPx(window.innerWidth * 0.84);
      setPy(window.innerHeight * 0.10);
    }
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setLights(l => !l);
      setTimeout(() => setLights(l => !l), 130);
    }, 2800 + Math.random() * 2000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      if (!warping) { setBeaming(true); setTimeout(() => setBeaming(false), 2800); }
    }, 7000 + Math.random() * 6000);
    return () => clearInterval(t);
  }, [warping]);

  const handleClick = useCallback(() => {
    if (warping) return;
    setShowHint(false);
    setWarping(true);
    setBeaming(false);
    const W = window.innerWidth, H = window.innerHeight;
    const zone = Math.floor(rnd(0, 4));
    let nx, ny;
    if      (zone === 0) { nx = rnd(20, W * 0.17);      ny = rnd(30, H * 0.80); }
    else if (zone === 1) { nx = rnd(W * 0.81, W - 100); ny = rnd(30, H * 0.80); }
    else if (zone === 2) { nx = rnd(50, W - 100);       ny = rnd(20, H * 0.13); }
    else                 { nx = rnd(50, W - 100);       ny = rnd(H * 0.85, H - 60); }
    setTimeout(() => {
      setPx(nx); setPy(ny);
      setTimeout(() => { setWarping(false); setBeaming(true); setTimeout(() => setBeaming(false), 2800); }, 700);
    }, 80);
  }, [warping]);

  return (
    <motion.div onClick={handleClick}
      style={{ position:'absolute', left:0, top:0, zIndex:55, pointerEvents:'auto', cursor:'pointer' }}
      animate={{ x:px, y:py }}
      transition={warping ? { type:'tween', duration:0.65, ease:[0.22,1,0.36,1] } : { type:'spring', stiffness:60, damping:18 }}
    >
      <motion.div
        animate={{}}
        transition={{}}
      >
        <AnimatePresence>
          {warping && (
            <motion.div initial={{ scaleX:0, opacity:0.8 }} animate={{ scaleX:[0,12,0], opacity:[0.8,0.2,0] }}
              exit={{ opacity:0 }} transition={{ duration:0.55, ease:'easeOut' }}
              style={{ position:'absolute', top:'42%', right:'98%', width:60, height:2, transformOrigin:'right center',
                background:'linear-gradient(90deg,transparent,#00f0ff,rgba(124,58,237,0.6),transparent)', filter:'blur(1px)' }} />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {beaming && (
            <>
              <motion.div initial={{ scaleY:0, opacity:0 }} animate={{ scaleY:[0,1,1,0], opacity:[0,0.6,0.3,0] }}
                exit={{ opacity:0 }} transition={{ duration:2.6, ease:'easeInOut', times:[0,0.15,0.85,1] }}
                style={{ position:'absolute', top:'82%', left:'50%', width:0, height:0, transformOrigin:'top center',
                  borderLeft:'22px solid transparent', borderRight:'22px solid transparent',
                  borderTop:'90px solid rgba(0,240,255,0.22)', filter:'blur(5px)', transform:'translateX(-50%)' }} />
              <motion.div initial={{ scaleY:0, opacity:0 }} animate={{ scaleY:[0,1,1,0], opacity:[0,0.9,0.5,0] }}
                exit={{ opacity:0 }} transition={{ duration:2.6, ease:'easeInOut', times:[0,0.15,0.85,1] }}
                style={{ position:'absolute', top:'82%', left:'50%', width:4, height:70, transformOrigin:'top center',
                  background:'linear-gradient(180deg,#00f0ff,transparent)', transform:'translateX(-50%)' }} />
            </>
          )}
        </AnimatePresence>
        <svg width="88" height="58" viewBox="0 0 88 58" style={{ display:'block', filter:'drop-shadow(0 0 8px rgba(0,240,255,0.5))' }}>
          <ellipse cx="44" cy="44" rx="36" ry="8" fill="rgba(0,0,0,0.35)" />
          <ellipse cx="44" cy="38" rx="38" ry="11" fill="#1e2a3a" />
          <ellipse cx="44" cy="36" rx="38" ry="11" fill="#243347" stroke="rgba(0,240,255,0.7)" strokeWidth="1.2" />
          <ellipse cx="44" cy="36" rx="26" ry="7" fill="#1a2535" />
          <path d="M 22 36 Q 44 8 66 36" fill="rgba(0,240,255,0.08)" stroke="rgba(0,240,255,0.6)" strokeWidth="1" />
          <path d="M 26 36 Q 44 12 62 36" fill="rgba(0,240,255,0.06)" />
          <ellipse cx="37" cy="24" rx="6" ry="3.5" fill="rgba(255,255,255,0.18)" transform="rotate(-18 37 24)" />
          <circle cx="10"  cy="37" r="3.2" fill={lights ? '#f59e0b' : '#78350f'} style={{ filter: lights ? 'drop-shadow(0 0 4px #f59e0b)' : 'none' }} />
          <circle cx="23"  cy="41" r="2.8" fill={lights ? '#00f0ff' : '#164e63'} style={{ filter: lights ? 'drop-shadow(0 0 4px #00f0ff)' : 'none' }} />
          <circle cx="44"  cy="44" r="3.2" fill={lights ? '#c084fc' : '#4c1d95'} style={{ filter: lights ? 'drop-shadow(0 0 4px #c084fc)' : 'none' }} />
          <circle cx="65"  cy="41" r="2.8" fill={lights ? '#00f0ff' : '#164e63'} style={{ filter: lights ? 'drop-shadow(0 0 4px #00f0ff)' : 'none' }} />
          <circle cx="78"  cy="37" r="3.2" fill={lights ? '#f59e0b' : '#78350f'} style={{ filter: lights ? 'drop-shadow(0 0 4px #f59e0b)' : 'none' }} />
        </svg>
        <AnimatePresence>
          {showHint && (
            <motion.div initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
              transition={{ delay:2, duration:0.4 }}
              style={{ position:'absolute', bottom:-26, left:'50%', transform:'translateX(-50%)',
                whiteSpace:'nowrap', fontSize:'0.65rem', fontFamily:"'Space Grotesk',sans-serif",
                color:'rgba(0,240,255,0.7)', letterSpacing:'1px', pointerEvents:'none' }}>
              click me ↑
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ── Asteroid Rock ────────────────────────────────────────────── */
function Rock({ data, onBlast }) {
  const [blasted,  setBlasted]  = useState(false);
  const [blastPx,  setBlastPx]  = useState(null);
  const [hovered,  setHovered]  = useState(false);
  const ref = useRef();

  const handleClick = (e) => {
    e.stopPropagation();
    if (blasted) return;
    const rect = ref.current?.getBoundingClientRect();
    setBlastPx(rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : null);
    setBlasted(true);
    onBlast();
  };

  if (blasted) {
    return blastPx ? <PlasmaBurst cx={blastPx.x} cy={blastPx.y} size={data.size} /> : null;
  }

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      style={{
        position:'absolute', left:`${data.x}vw`, top:`${data.y}vh`,
        width:data.size, height:data.size,
        background: hovered
          ? `radial-gradient(circle at 35% 35%, #6b7280, ${data.color})`
          : `radial-gradient(circle at 35% 35%, #4b5563, ${data.color})`,
        clipPath: data.shape,
        pointerEvents:'auto', zIndex:20, cursor:'crosshair',
        boxShadow: hovered
          ? '0 0 18px rgba(239,68,68,0.7), 0 0 36px rgba(251,146,60,0.3)'
          : '0 0 6px rgba(0,0,0,0.5), inset 0 0 8px rgba(0,0,0,0.4)',
        transition:'box-shadow 0.2s, background 0.2s',
      }}
      animate={{}}
      transition={{}}
    >
      {hovered && (
        <motion.div initial={{ opacity:0, scale:1.6 }} animate={{ opacity:1, scale:1 }}
          style={{ position:'absolute', inset:-8, border:'1px solid rgba(239,68,68,0.7)', borderRadius:'50%', pointerEvents:'none' }} />
      )}
    </motion.div>
  );
}

/* ── Mini Planet ──────────────────────────────────────────────── */
function Planet({ data, onLaunch }) {
  const [launched, setLaunched] = useState(false);
  const [hovered, setHovered]   = useState(false);
  const t = PLANET_TYPES[data.typeIdx];

  const handleClick = (e) => {
    e.stopPropagation();
    if (launched) return;
    setLaunched(true);
    onLaunch();
  };

  if (launched) {
    return (
      <motion.div
        initial={{ opacity:1, scale:1, y:0 }}
        animate={{ opacity:0, scale:0.15, y:-130 }}
        transition={{ duration:0.75, ease:'easeIn' }}
        style={{
          position:'absolute', left:`${data.x}vw`, top:`${data.y}vh`,
          width:data.size, height:data.size, borderRadius:'50%',
          background:`radial-gradient(circle at 35% 30%, ${t.hi}, ${t.base} 55%, ${t.shadow})`,
          pointerEvents:'none', zIndex:18,
        }}
      />
    );
  }

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      style={{
        position:'absolute', left:`${data.x}vw`, top:`${data.y}vh`,
        width:data.size, height:data.size, borderRadius:'50%',
        background:`radial-gradient(circle at 35% 30%, ${t.hi}, ${t.base} 55%, ${t.shadow})`,
        boxShadow: hovered
          ? `0 0 24px ${t.hi}90, 0 0 50px ${t.hi}40, inset 0 0 18px rgba(0,0,0,0.4)`
          : `0 0 12px ${t.shadow}90, inset 0 0 14px rgba(0,0,0,0.4)`,
        cursor:'pointer', zIndex:18, pointerEvents:'auto',
        transition:'box-shadow 0.3s', overflow:'visible',
      }}
    >
      {/* Atmosphere halo */}
      <div style={{
        position:'absolute', inset:-5, borderRadius:'50%',
        background:`radial-gradient(circle, transparent 58%, ${t.hi}25 100%)`,
        pointerEvents:'none',
      }} />
      {/* Ring */}
      {t.ring && (
        <div style={{
          position:'absolute', top:'50%', left:'50%',
          width: data.size * 1.85, height: data.size * 0.38,
          border:`2px solid ${t.ringCol}80`,
          borderRadius:'50%',
          transform:'translate(-50%,-50%) rotateX(72deg)',
          pointerEvents:'none',
          boxShadow:`0 0 8px ${t.ringCol}50`,
        }} />
      )}
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            style={{
              position:'absolute', bottom:-26, left:'50%', transform:'translateX(-50%)',
              whiteSpace:'nowrap', fontSize:'0.6rem', fontFamily:"'Space Grotesk',sans-serif",
              color: t.hi, textShadow:`0 0 8px ${t.hi}`, letterSpacing:'1px', pointerEvents:'none',
            }}>
            click to launch ↑
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Energy Crystal ───────────────────────────────────────────── */
function Crystal({ data, onCollect }) {
  const [shattered, setShattered] = useState(false);
  const [hovered, setHovered]     = useState(false);
  const c = CRYSTAL_COLS[data.colIdx];

  const handleClick = (e) => {
    e.stopPropagation();
    if (shattered) return;
    setShattered(true);
    onCollect();
  };

  if (shattered) {
    return <CrystalBurst x={data.x} y={data.y} color={c.main} />;
  }

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      animate={{}}
      transition={{}}
      style={{
        position:'absolute', left:`${data.x}vw`, top:`${data.y}vh`,
        width:data.size, height:data.size,
        clipPath:'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        background: hovered
          ? `linear-gradient(135deg, #fff 0%, ${c.main} 40%, ${c.glow} 100%)`
          : `linear-gradient(135deg, ${c.main}80 0%, ${c.glow} 50%, ${c.main}40 100%)`,
        boxShadow: hovered
          ? `0 0 22px ${c.main}, 0 0 44px ${c.main}80`
          : `0 0 10px ${c.main}70`,
        cursor:'pointer', zIndex:16, pointerEvents:'auto',
        transition:'box-shadow 0.2s, background 0.2s',
      }}
    >
      {/* Inner facet */}
      <div style={{
        position:'absolute', top:'27%', left:'27%', width:'46%', height:'46%',
        clipPath:'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        background:'rgba(255,255,255,0.45)', pointerEvents:'none',
      }} />
    </motion.div>
  );
}

/* ── Space Probe ──────────────────────────────────────────────── */
function SpaceProbe() {
  const [scanning, setScanning] = useState(false);
  const [hovered, setHovered]   = useState(false);
  const [px, setPx] = useState(0);
  const [py, setPy] = useState(0);
  const init = useRef(false);

  useEffect(() => {
    if (!init.current) {
      init.current = true;
      setPx(window.innerWidth * 0.05);
      setPy(window.innerHeight * 0.28);
    }
  }, []);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    if (scanning) return;
    setScanning(true);
    setTimeout(() => setScanning(false), 3200);
  }, [scanning]);

  return (
    <motion.div onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position:'absolute', left:0, top:0, zIndex:50, pointerEvents:'auto', cursor:'pointer' }}
      animate={{ x:px, y:py }}
      transition={{ type:'spring', stiffness:28, damping:12 }}
    >
      <motion.div
        animate={{ rotate:360 }}
        transition={{ duration:22, repeat:Infinity, ease:'linear' }}
      >
        {/* Scan beam */}
        <AnimatePresence>
          {scanning && (
            <motion.div initial={{ scaleX:0, opacity:0 }}
              animate={{ scaleX:[0,8,8,0], opacity:[0,0.7,0.5,0] }}
              exit={{ opacity:0 }}
              transition={{ duration:3.0, ease:'easeInOut', times:[0,0.18,0.82,1] }}
              style={{
                position:'absolute', top:'50%', left:'100%',
                width:80, height:2, transformOrigin:'left center',
                background:'linear-gradient(90deg,#00f0ff,rgba(0,240,255,0.1))',
                filter:'blur(1px)',
              }} />
          )}
        </AnimatePresence>
        {/* Signal rings */}
        <AnimatePresence>
          {scanning && [0,1,2].map(i => (
            <motion.div key={i}
              initial={{ scale:0, opacity:0.7 }}
              animate={{ scale: 4 + i * 2.5, opacity:0 }}
              exit={{ opacity:0 }}
              transition={{ duration:1.6, delay: i * 0.45, ease:'easeOut' }}
              style={{
                position:'absolute', top:'50%', left:'50%',
                width:18, height:18,
                border:'1px solid #00f0ff', borderRadius:'50%',
                transform:'translate(-50%,-50%)', pointerEvents:'none',
              }} />
          ))}
        </AnimatePresence>
        {/* Probe SVG */}
        <svg width="46" height="46" viewBox="0 0 46 46"
          style={{ display:'block', filter:`drop-shadow(0 0 ${hovered ? 8 : 4}px rgba(0,240,255,${hovered ? 0.9 : 0.4}))` }}>
          {/* Body */}
          <rect x="19" y="17" width="8" height="12" rx="2" fill="#243347" stroke="#00f0ff" strokeWidth="0.8" />
          {/* Solar panels */}
          <rect x="3"  y="20" width="14" height="6" rx="1" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="0.6" />
          <rect x="29" y="20" width="14" height="6" rx="1" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="0.6" />
          {/* Panel lines */}
          <line x1="8"  y1="20" x2="8"  y2="26" stroke="#60a5fa" strokeWidth="0.4" opacity="0.6" />
          <line x1="13" y1="20" x2="13" y2="26" stroke="#60a5fa" strokeWidth="0.4" opacity="0.6" />
          <line x1="34" y1="20" x2="34" y2="26" stroke="#60a5fa" strokeWidth="0.4" opacity="0.6" />
          <line x1="39" y1="20" x2="39" y2="26" stroke="#60a5fa" strokeWidth="0.4" opacity="0.6" />
          {/* Antenna */}
          <line x1="23" y1="17" x2="23" y2="7" stroke="#00f0ff" strokeWidth="0.9" />
          <circle cx="23" cy="6" r="2.2" fill={scanning ? '#00f0ff' : '#0891b2'}
            style={{ filter: scanning ? 'drop-shadow(0 0 4px #00f0ff)' : 'none' }} />
          {/* Thruster */}
          <rect x="20" y="29" width="6" height="4" rx="1" fill="#374151" />
          <ellipse cx="23" cy="34" rx="3" ry="1.5" fill={scanning ? '#f59e0b' : '#78350f'}
            style={{ filter: scanning ? 'drop-shadow(0 0 4px #f59e0b)' : 'none' }} />
        </svg>
        {/* Tooltip */}
        <AnimatePresence>
          {hovered && !scanning && (
            <motion.div initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
              style={{ position:'absolute', bottom:-22, left:'50%', transform:'translateX(-50%)',
                whiteSpace:'nowrap', fontSize:'0.6rem', fontFamily:"'Space Grotesk',sans-serif",
                color:'rgba(0,240,255,0.8)', letterSpacing:'1px', pointerEvents:'none' }}>
              scan ↗
            </motion.div>
          )}
          {scanning && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              style={{ position:'absolute', bottom:-22, left:'50%', transform:'translateX(-50%)',
                whiteSpace:'nowrap', fontSize:'0.6rem', fontFamily:"'Space Grotesk',sans-serif",
                color:'#00f0ff', textShadow:'0 0 8px #00f0ff', letterSpacing:'1px', pointerEvents:'none' }}>
              scanning...
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ── Wormhole Portal ──────────────────────────────────────────── */
function Wormhole() {
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (active) return;
    setActive(true);
    setTimeout(() => setActive(false), 2000);
  };

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      style={{ position:'absolute', left:'3vw', bottom:'8vh', zIndex:45, pointerEvents:'auto', cursor:'pointer' }}>
      {/* Warp flash overlay */}
      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:[0,0.18,0] }}
            exit={{ opacity:0 }} transition={{ duration:0.6, times:[0,0.15,1] }}
            style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 3vw 92vh, rgba(124,58,237,0.5), transparent 60%)', pointerEvents:'none', zIndex:44 }} />
        )}
      </AnimatePresence>

      {/* Portal rings */}
      {[0,1,2,3].map(i => (
        <motion.div key={i}
          animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: active ? [1, 1.3 + i*0.1, 1] : 1 }}
          transition={{
            rotate:{ duration: 4 + i * 2, repeat:Infinity, ease:'linear' },
            scale:{ duration: 0.4, times:[0,0.5,1] },
          }}
          style={{
            position:'absolute', top:'50%', left:'50%',
            width: 50 + i * 18, height: 50 + i * 18,
            border:`1.5px solid rgba(${i%2===0?'124,58,237':'0,240,255'},${0.7 - i*0.12})`,
            borderRadius:'50%',
            transform:'translate(-50%,-50%)',
            borderStyle: i % 2 === 0 ? 'solid' : 'dashed',
            pointerEvents:'none',
            boxShadow: active ? `0 0 ${8+i*4}px rgba(124,58,237,0.6)` : 'none',
          }} />
      ))}
      {/* Core */}
      <motion.div
        animate={{ scale: active ? [1, 2.5, 1] : [1, 1.08, 1], opacity: active ? [0.8, 1, 0.8] : [0.5, 0.8, 0.5] }}
        transition={active ? { duration:0.5, times:[0,0.4,1] } : { duration:2.5, repeat:Infinity, ease:'easeInOut' }}
        style={{
          position:'absolute', top:'50%', left:'50%',
          width:30, height:30, borderRadius:'50%',
          background: active
            ? 'radial-gradient(circle, #fff 0%, #c084fc 40%, #7c3aed 70%, transparent 100%)'
            : 'radial-gradient(circle, #c084fc 0%, #7c3aed 60%, transparent 100%)',
          transform:'translate(-50%,-50%)',
          filter:`blur(${active ? 3 : 2}px)`,
          pointerEvents:'none',
          boxShadow: hovered ? '0 0 20px #7c3aed, 0 0 40px #7c3aed50' : '0 0 10px #7c3aed80',
        }} />
      {/* Label */}
      <AnimatePresence>
        {hovered && !active && (
          <motion.div initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            style={{ position:'absolute', bottom:-22, left:'50%', transform:'translateX(-50%)',
              whiteSpace:'nowrap', fontSize:'0.6rem', fontFamily:"'Space Grotesk',sans-serif",
              color:'rgba(192,132,252,0.9)', letterSpacing:'1px', pointerEvents:'none' }}>
            wormhole ✦
          </motion.div>
        )}
        {active && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            style={{ position:'absolute', bottom:-22, left:'50%', transform:'translateX(-50%)',
              whiteSpace:'nowrap', fontSize:'0.6rem', fontFamily:"'Space Grotesk',sans-serif",
              color:'#c084fc', textShadow:'0 0 8px #c084fc', letterSpacing:'1px', pointerEvents:'none' }}>
            warping...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Shooting Star ────────────────────────────────────────────── */
function ShootingStar({ onDone }) {
  const startY = rnd(5, 60);
  return (
    <motion.div
      initial={{ x:'-5vw', y:`${startY}vh`, opacity:0 }}
      animate={{ x:'110vw', y:`${startY + rnd(10,25)}vh`, opacity:[0,1,1,0] }}
      transition={{ duration: rnd(0.8, 1.4), ease:'linear', times:[0,0.05,0.85,1] }}
      onAnimationComplete={onDone}
      style={{
        position:'absolute', left:0, top:0, zIndex:12, pointerEvents:'none',
        width:90, height:2,
        background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.9),rgba(0,240,255,0.6),transparent)',
        borderRadius:2, filter:'blur(0.5px)', transform:'rotate(18deg)',
      }}
    />
  );
}

/* ── HUD ──────────────────────────────────────────────────────── */
function HUD({ blasts, launches, crystals }) {
  if (blasts + launches + crystals === 0) return null;
  return (
    <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
      style={{
        position:'absolute', bottom:28, right:90, zIndex:200, pointerEvents:'none',
        display:'flex', flexDirection:'column', gap:5,
        fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.68rem',
        fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase',
      }}>
      {blasts > 0 && (
        <div style={{ color:'rgba(239,68,68,0.85)', background:'rgba(239,68,68,0.06)',
          border:'1px solid rgba(239,68,68,0.2)', padding:'4px 14px', borderRadius:999, backdropFilter:'blur(8px)' }}>
          ☄ {blasts} asteroid{blasts !== 1 ? 's' : ''} blasted
        </div>
      )}
      {launches > 0 && (
        <div style={{ color:'rgba(251,191,36,0.9)', background:'rgba(251,191,36,0.06)',
          border:'1px solid rgba(251,191,36,0.2)', padding:'4px 14px', borderRadius:999, backdropFilter:'blur(8px)' }}>
          🪐 {launches} planet{launches !== 1 ? 's' : ''} launched
        </div>
      )}
      {crystals > 0 && (
        <div style={{ color:'rgba(0,240,255,0.9)', background:'rgba(0,240,255,0.06)',
          border:'1px solid rgba(0,240,255,0.2)', padding:'4px 14px', borderRadius:999, backdropFilter:'blur(8px)' }}>
          💎 {crystals} crystal{crystals !== 1 ? 's' : ''} collected
        </div>
      )}
    </motion.div>
  );
}

/* ── Main SpaceScene ──────────────────────────────────────────── */
const STARS = makeStars();

export default function SpaceScene() {
  const [rocks,    setRocks]    = useState(() => Array.from({ length:6 }, (_, i) => makeRock(i)));
  const [planets,  setPlanets]  = useState(() => Array.from({ length:3 }, (_, i) => makePlanet(i)));
  const [crystals, setCrystals] = useState(() => Array.from({ length:5 }, (_, i) => makeCrystal(i)));
  const [blastCount,   setBlastCount]   = useState(0);
  const [launchCount,  setLaunchCount]  = useState(0);
  const [crystalCount, setCrystalCount] = useState(0);
  const [shooters, setShooters] = useState([]);
  const nextId = useRef(100);

  const handleBlast = useCallback((id) => {
    setBlastCount(c => c + 1);
    setTimeout(() => setRocks(rs => rs.map(r => r.id === id ? makeRock(Date.now() + Math.random()*1000) : r)), 2200);
  }, []);

  const handleLaunch = useCallback((id) => {
    setLaunchCount(c => c + 1);
    setTimeout(() => setPlanets(ps => ps.map(p => p.id === id ? makePlanet(Date.now() + Math.random()*1000) : p)), 3500);
  }, []);

  const handleCrystal = useCallback((id) => {
    setCrystalCount(c => c + 1);
    setTimeout(() => setCrystals(cs => cs.map(c => c.id === id ? makeCrystal(Date.now() + Math.random()*1000) : c)), 2800);
  }, []);

  useEffect(() => {
    const fire = () => {
      const id = nextId.current++;
      setShooters(s => [...s, id]);
      setTimeout(fire, rnd(4000, 9000));
    };
    const t = setTimeout(fire, 3000);
    return () => clearTimeout(t);
  }, []);

  const removeShooter = useCallback((id) => setShooters(s => s.filter(x => x !== id)), []);

  return (
    <div style={{ position:'absolute', inset:0, zIndex:10, pointerEvents:'none', overflow:'hidden' }}>
      {STARS.map(s    => <Star    key={s.id}  data={s} />)}
      {shooters.map(id => <ShootingStar key={id} onDone={() => removeShooter(id)} />)}
      <UFO />
      <SpaceProbe />
      <Wormhole />
      {rocks.map(r   => <Rock    key={r.id}  data={r}  onBlast={()   => handleBlast(r.id)} />)}
      {planets.map(p  => <Planet  key={p.id}  data={p}  onLaunch={()  => handleLaunch(p.id)} />)}
      {crystals.map(c => <Crystal key={c.id}  data={c}  onCollect={() => handleCrystal(c.id)} />)}
      <HUD blasts={blastCount} launches={launchCount} crystals={crystalCount} />
    </div>
  );
}
