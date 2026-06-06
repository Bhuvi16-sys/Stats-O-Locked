import { motion } from 'framer-motion';

export default function AmbientGlow() {
  return (
    <div
      className="fixed inset-0 overflow-hidden bg-[#020b16] pointer-events-none"
      style={{ zIndex: -2 }}
    >
      {/* Neon Cyan Orb (Top-Left Drifting) */}
      <motion.div
        className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#00f0ff] opacity-40 blur-[120px] md:blur-[150px]"
        animate={{
          x: [0, 80, -40, 0],
          y: [0, 50, 90, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Deep Purple Orb (Bottom-Right Drifting) */}
      <motion.div
        className="absolute -bottom-[15%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[#7c3aed] opacity-40 blur-[120px] md:blur-[150px]"
        animate={{
          x: [0, -90, 40, 0],
          y: [0, -60, -90, 0],
          scale: [1, 1.2, 0.85, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Deep Blue/Indigo Orb (Center/Top-Right for Luxury Blending) */}
      <motion.div
        className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#3b82f6] opacity-35 blur-[120px] md:blur-[150px]"
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 80, -50, 0],
          scale: [0.95, 1.1, 0.85, 0.95],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
