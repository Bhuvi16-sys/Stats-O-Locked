import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

/* ── 1. Background star-field (random scattered dots) ─────────── */
function StarField() {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(600 * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 40;
      arr[i + 1] = (Math.random() - 0.5) * 40;
      arr[i + 2] = (Math.random() - 0.5) * 40 - 10;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.008;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
      />
    </Points>
  );
}

/* ── 2. Orbital particle halo around sphere ───────────────────── */
function ParticleHalo() {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(200 * 3);
    for (let i = 0; i < arr.length; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.9 + Math.random() * 1.2;
      arr[i] = r * Math.sin(phi) * Math.cos(theta);
      arr[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.04;
      ref.current.rotation.x = t * 0.015;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f0ff"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/* ── 3. The big translucent globe + sweeping rings ────────────── */
function Globe() {
  const meshRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.03;
      meshRef.current.rotation.y = t * 0.05;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.07;
      ring1Ref.current.rotation.y = t * 0.11;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.09;
      ring2Ref.current.rotation.z = t * 0.05;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -t * 0.06;
      ring3Ref.current.rotation.z = t * 0.08;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* ── Translucent glass shell ── */}
      <Sphere ref={meshRef} args={[2.7, 48, 48]}>
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#3b82f6"
          emissiveIntensity={0.3}
          transparent
          opacity={0.10}
          roughness={0.05}
          metalness={0.95}
          depthWrite={false}
        />
      </Sphere>

      {/* ── Outer wireframe ── */}
      <Sphere args={[2.73, 24, 24]}>
        <meshStandardMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </Sphere>

      {/* ── Inner wireframe (faint purple) ── */}
      <Sphere args={[2.1, 14, 14]}>
        <meshStandardMaterial
          color="#7c3aed"
          wireframe
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </Sphere>

      {/* ── Ring 1: big cyan sweep ── */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[4.6, 0.010, 12, 80]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={1.4}
          transparent
          opacity={0.40}
        />
      </mesh>

      {/* ── Ring 2: larger purple sweep ── */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[5.5, 0.007, 12, 80]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={1.2}
          transparent
          opacity={0.28}
        />
      </mesh>

      {/* ── Ring 3: extra sweep (blue) ── */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[3.9, 0.008, 12, 80]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={1.0}
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Internal lights */}
      <pointLight position={[0, 0, 0]} color="#00f0ff" intensity={4} distance={10} />
      <pointLight position={[2, 2, 2]} color="#7c3aed" intensity={2.5} distance={8} />
    </group>
  );
}

/* ── Hero section ─────────────────────────────────────────────── */
export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(id);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'clamp(80px,12vw,90px)',
        paddingBottom: 'clamp(32px,6vw,60px)',
        background: 'transparent',
      }}
    >
      {/* ── Full-viewport globe canvas ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      >
        {mounted && (
          <Canvas
            camera={{ position: [0, 0, 4.5], fov: 65 }}
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            gl={{ antialias: window.devicePixelRatio < 2, alpha: true, powerPreference: 'high-performance' }}
            style={{ width: '100%', height: '100%', display: 'block' }}
          >
            <ambientLight intensity={0.15} />
            <directionalLight position={[5, 5, 5]} intensity={0.4} />
            <StarField />
            <Globe />
            <ParticleHalo />
          </Canvas>
        )}
      </div>

      {/* Subtle dark vignette so centre text is readable over the globe */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(2,11,22,0.0) 20%, rgba(2,11,22,0.55) 75%, rgba(2,11,22,0.80) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── Content (overlaid directly on globe) ── */}
      <div
        style={{
          maxWidth: '1100px',
          width: '100%',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '100px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.55)',
            fontSize: '0.7rem',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          <Sparkles size={11} style={{ color: '#00f0ff' }} />
          VIT Bhopal's Premier AI &amp; Data Club
        </motion.div>

        {/* "Welcome to" */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          style={{
            color: '#fff',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: 300,
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '4px',
            marginBottom: '8px',
          }}
        >
          Welcome to
        </motion.span>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.9rem, 7vw, 5.5rem)',
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 50%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 24px rgba(0,240,255,0.5)) drop-shadow(0 0 50px rgba(124,58,237,0.3))',
            marginBottom: '24px',
          }}
        >
          STATS-O-LOCKED CLUB
        </motion.h1>

        {/* Sub-headlines row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '28px',
          }}
        >
          <span style={{ padding: '5px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', fontSize: '0.68rem', fontWeight: 600, color: 'rgba(255,255,255,0.55)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '2px', textTransform: 'uppercase' }}>
            Fostering Innovation, Creativity &amp; Leadership
          </span>
          <span style={{ color: '#00f0ff', fontWeight: 700, textShadow: '0 0 8px rgba(0,240,255,0.8)' }}>•</span>
          <span style={{ padding: '5px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', fontSize: '0.68rem', fontWeight: 600, color: 'rgba(255,255,255,0.55)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '2px', textTransform: 'uppercase' }}>
            A Vibrant Community of Future Tech Leaders
          </span>
        </motion.div>

        {/* Intro text — no box, just semi-transparent text on the globe */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.44 }}
          style={{ maxWidth: '660px', marginBottom: 'clamp(24px,5vw,44px)' }}
        >
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)', lineHeight: 1.75, marginBottom: '14px', fontFamily: "'Inter', sans-serif" }}>
            <span style={{ color: '#00f0ff', fontWeight: 600, textShadow: '0 0 10px rgba(0,240,255,0.5)' }}>Welcome to Stats-o-Locked Club</span>, a vibrant and dynamic student community dedicated to fostering{' '}
            <span style={{ color: '#00f0ff', fontWeight: 600 }}>innovation, creativity, and leadership</span>. We aim to create an environment where students can explore their interests, enhance their skills, and work{' '}
            <span style={{ color: '#00f0ff', fontWeight: 600 }}>collaboratively on meaningful projects</span>.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(0.82rem, 1.4vw, 0.95rem)', lineHeight: 1.75, fontFamily: "'Inter', sans-serif" }}>
            Through a variety of events, workshops, and activities, we provide opportunities for both{' '}
            <span style={{ color: '#00f0ff', fontWeight: 600 }}>personal and professional growth</span>. Our club serves as a platform for like-minded individuals to{' '}
            <span style={{ color: '#00f0ff', fontWeight: 600 }}>connect, learn, and lead</span>.
          </p>
        </motion.div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.58 }}
        >
          <motion.a
            href="#about"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-block',
              padding: '16px 42px',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%)',
              border: 'none',
              boxShadow: '0 0 35px rgba(0,240,255,0.55), inset 0 0 18px rgba(255,255,255,0.25)',
              color: '#020b16',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(0.72rem, 1.2vw, 0.82rem)',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            EXPLORE OUR ECOSYSTEM &gt;
          </motion.a>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(255,255,255,0.35)',
          fontSize: '0.68rem',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          zIndex: 10,
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        <span>Scroll Down</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '38px',
            background: 'linear-gradient(to bottom, rgba(0,240,255,0.7), transparent)',
          }}
        />
      </motion.div>
    </section>
  );
}
