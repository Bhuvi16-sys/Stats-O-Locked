import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Glitch Text Hook ────────────────────────────────────────────────────────
function useGlitch(text: string, active: boolean) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    if (!active) { setDisplayed(text); return; }
    let frame = 0;
    const total = 18;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / total;
      setDisplayed(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i / text.length < progress) return ch;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (frame >= total) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [active, text]);

  return displayed;
}

// ─── Animation 1: Scanning Beam ─────────────────────────────────────────────
// Placed at top of hero, z-10, above the grid but below content (z-10 vs z-10 content)
function ScanningBeam() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px overflow-visible">
      {/* Horizontal beam line */}
      <motion.div
        className="absolute left-0 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #4ade80 20%, #86efac 50%, #4ade80 80%, transparent 100%)",
          boxShadow: "0 0 12px 2px #4ade8099, 0 0 40px 6px #4ade8033",
        }}
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scaleX: [0.6, 1, 1, 0.6],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 5,
        }}
      />
      {/* Vertical drip ray falling from centre of beam */}
      <motion.div
        className="absolute top-0 h-32 w-px"
        style={{
          left: "50%",
          background: "linear-gradient(180deg, #4ade80cc 0%, transparent 100%)",
          boxShadow: "0 0 8px 1px #4ade8066",
        }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: [0, 0.8, 0], scaleY: [0, 1, 1] }}
        transition={{
          duration: 4,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 5,
        }}
      />
    </div>
  );
}

// ─── Cyberpunk Background (grid, scanline, vignette, corners) ───────────────
// NOTE: ScanningBeam is NOT inside here — it lives directly in <section>
function CyberpunkBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,65,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,65,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow centre */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#00ff41]/[0.04] blur-[120px]" />
      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent" />
      {/* Slow scanline sweep */}
      <motion.div
        animate={{ y: ["0%", "100%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00ff41]/20 to-transparent"
      />
      {/* Corner brackets */}
      {[
        "top-8 left-8 border-t border-l",
        "top-8 right-8 border-t border-r",
        "bottom-8 left-8 border-b border-l",
        "bottom-8 right-8 border-b border-r",
      ].map((cls, i) => (
        <div
          key={i}
          className={`absolute w-12 h-12 border-[#00ff41]/30 ${cls}`}
        />
      ))}
    </div>
  );
}

// ─── Animation 2: Floating Orbs ─────────────────────────────────────────────
// Absolute, full-bleed, sits behind all content
function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Orb 1 — left-centre */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 340,
          height: 340,
          top: "30%",
          left: "8%",
          background: "radial-gradient(circle, #4ade8033 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
        animate={{
          y: [0, -28, 0],
          x: [0, 12, 0],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 9,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      {/* Orb 2 — right-centre, offset phase */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 260,
          height: 260,
          top: "45%",
          right: "6%",
          background: "radial-gradient(circle, #86efac22 0%, transparent 70%)",
          filter: "blur(56px)",
        }}
        animate={{
          y: [0, 22, 0],
          x: [0, -10, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 11,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 2.5,
        }}
      />
    </div>
  );
}

// ─── Animation 3: Rotating Glow Rings ───────────────────────────────────────
// Centred absolutely — place this inside the content wrapper as a sibling
// behind the title/text stack, so it glows around the hero centre
function RotatingGlowRings() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {/* Outer ring — slow clockwise */}
      <motion.div
        style={{
          width: 480,
          height: 480,
          borderRadius: "50%",
          border: "1.5px solid #4ade8033",
          boxShadow: "0 0 24px 4px #4ade8022, inset 0 0 24px 4px #4ade8011",
          background:
            "conic-gradient(from 0deg, transparent 70%, #4ade8044 85%, transparent 100%)",
          position: "absolute",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      {/* Inner ring — counter-clockwise, slightly faster */}
      <motion.div
        style={{
          width: 340,
          height: 340,
          borderRadius: "50%",
          border: "1px solid #4ade8020",
          background:
            "conic-gradient(from 180deg, transparent 75%, #86efac2a 90%, transparent 100%)",
          position: "absolute",
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 28,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      {/* Tiny accent ring */}
      <motion.div
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: "1px solid #4ade8015",
          background:
            "conic-gradient(from 90deg, transparent 80%, #4ade8033 95%, transparent 100%)",
          position: "absolute",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 14,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </div>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-1 px-6 py-4 border border-[#00ff41]/20 bg-black/50 backdrop-blur-sm relative group hover:border-[#00ff41]/50 transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-[#00ff41]/0 group-hover:bg-[#00ff41]/[0.03] transition-colors duration-300" />
      <span
        className="text-[#00ff41] text-2xl md:text-3xl font-black font-mono"
        style={{ textShadow: "0 0 20px rgba(0,255,65,0.5)" }}
      >
        {value}
      </span>
      <span className="text-white/40 text-[10px] font-mono tracking-[0.25em] uppercase">
        {label}
      </span>
    </motion.div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [glitchActive, setGlitchActive] = useState(false);
  const titleLine1 = useGlitch("UNLOCK", glitchActive);
  const titleLine2 = useGlitch("POTENTIAL", glitchActive);

  // Periodic glitch trigger
  useEffect(() => {
    const run = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 800);
    };
    const t1 = setTimeout(run, 600);
    const interval = setInterval(run, 7000);
    return () => { clearTimeout(t1); clearInterval(interval); };
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Layer 0 — grid, scanline, vignette, brackets */}
      <CyberpunkBackground />

      {/* Layer 1 — floating orbs (behind everything else) */}
      <FloatingOrbs />

      {/* Layer 2 — scanning beam pinned to top edge */}
      <ScanningBeam />

      {/* Layer 3 — scrollable content block */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl mx-auto pt-24 pb-16"
      >
        {/* Layer 3a — rotating rings sit behind text inside this container */}
        <RotatingGlowRings />

        {/* Pre-title badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative flex items-center gap-2 mb-8 px-4 py-2 border border-[#00ff41]/30 bg-[#00ff41]/5 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse shadow-[0_0_6px_#00ff41]" />
          <span className="text-[#00ff41] text-[10px] font-mono tracking-[0.3em] uppercase">
            Stats-O-Locked — VIT Bhopal
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse shadow-[0_0_6px_#00ff41]" />
        </motion.div>

        {/* Main Title */}
        <div className="relative mb-6 overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-black uppercase leading-none select-none"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            <span
              className="block text-white text-[clamp(3rem,10vw,7rem)] tracking-[0.08em]"
              style={{ textShadow: "0 0 40px rgba(255,255,255,0.1)" }}
            >
              {titleLine1}
            </span>
            <span
              className="block text-[#00ff41] text-[clamp(3rem,10vw,7rem)] tracking-[0.08em]"
              style={{ textShadow: "0 0 60px rgba(0,255,65,0.4), 0 0 100px rgba(0,255,65,0.15)" }}
            >
              {titleLine2}
            </span>
            <span className="block text-white/20 text-[clamp(1.2rem,4vw,2.8rem)] tracking-[0.5em] mt-2">
              FUTURE
            </span>
          </motion.h1>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="relative w-32 h-[1px] bg-gradient-to-r from-transparent via-[#00ff41] to-transparent mb-8"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="relative text-white/50 text-sm md:text-base font-mono leading-relaxed max-w-xl tracking-wide mb-10"
        >
          Building futuristic digital experiences through AI, innovation, and collaboration.{" "}
          <span className="text-[#00ff41]/70">Build. Learn. Innovate.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="relative flex flex-wrap gap-4 justify-center mb-16"
        >
          <motion.a
            href="#join"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative group px-8 py-3.5 bg-[#00ff41] text-black font-mono text-sm font-bold tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,65,0.5)]"
          >
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
            <span className="relative">Join the Future → →</span>
          </motion.a>
          <motion.a
            href="#about"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative group px-8 py-3.5 border border-[#00ff41]/40 text-white/70 hover:text-white font-mono text-sm tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 hover:border-[#00ff41]/80"
          >
            <span className="absolute inset-0 bg-[#00ff41]/0 group-hover:bg-[#00ff41]/5 transition-colors duration-300" />
            <span className="relative">Explore More</span>
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl"
        >
          <StatCard value="150+" label="Members" delay={1.15} />
          <StatCard value="25+" label="Events" delay={1.2} />
          <StatCard value="10+" label="Projects" delay={1.25} />
          <StatCard value="3+" label="Domains" delay={1.3} />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[#00ff41]/40 text-[9px] font-mono tracking-[0.4em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-[#00ff41]/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}