import { motion, useScroll, useTransform } from 'framer-motion';

export default function PageLayout({ children, title, subtitle, maxWidth = 'max-w-6xl' }) {
  const { scrollYProgress } = useScroll();
  const topGlowOpacity = useTransform(scrollYProgress, [0, 0.25], [0.8, 0.15]);
  const bottomGlowOpacity = useTransform(scrollYProgress, [0.75, 1.0], [0.15, 0.8]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden">
      {/* Ambient blobs */}
      <motion.div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
          transform: 'translate(-30%, -30%)',
        }}
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          bottom: '0',
          right: '0',
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
          transform: 'translate(30%, 30%)',
        }}
        animate={{
          x: [0, -40, 40, 0],
          y: [0, 30, -50, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Grid background */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4, zIndex: 0 }} />

      {/* Central main content wrapper with luxury glassmorphism */}
      <div 
        className={`relative z-10 w-full ${maxWidth} min-h-screen flex flex-col px-6 md:px-10 lg:px-16 bg-[#020b16]/60 backdrop-blur-xl border border-white/10 border-t-white/20 shadow-2xl overflow-hidden`}
        style={{ paddingTop: '160px', paddingBottom: '96px' }}
      >
        {/* Top Edge Glow (Cyan) */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent pointer-events-none z-20"
          style={{ opacity: topGlowOpacity }}
        />
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[80px] bg-gradient-to-b from-[#00f0ff]/10 to-transparent pointer-events-none z-20"
          style={{ opacity: topGlowOpacity }}
        />

        {/* Bottom Edge Glow (Purple) */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent pointer-events-none z-20"
          style={{ opacity: bottomGlowOpacity }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-[#7c3aed]/10 to-transparent pointer-events-none z-20"
          style={{ opacity: bottomGlowOpacity }}
        />

        {(title || subtitle) && (
          <div className="mb-16 text-center shrink-0 w-full">
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#7c3aed]">
                  {title}
                </span>
              </motion.h2>
            )}
            {subtitle && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4"
              >
                {typeof subtitle === 'string' ? (
                  <p className="text-lg text-gray-400 uppercase tracking-widest font-semibold">{subtitle}</p>
                ) : (
                  subtitle
                )}
              </motion.div>
            )}
          </div>
        )}

        <div className="w-full flex-1 flex flex-col items-center">
          <motion.div
            className="glass-card w-full p-8 md:p-12 relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
