import { motion } from 'framer-motion';

export default function PageLayout({ children, title, subtitle, maxWidth = 'max-w-6xl' }) {
  return (
    <div className="relative min-h-screen flex flex-col" style={{ paddingTop: '160px', paddingBottom: '96px' }}>
      {/* Grid background */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4, zIndex: 0 }} />

      {/* Ambient blobs */}
      <div style={{ position: 'absolute', top: '0', left: '0', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0, transform: 'translate(-30%, -30%)' }} />
      <div style={{ position: 'absolute', bottom: '0', right: '0', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0, transform: 'translate(30%, 30%)' }} />

      <div className={`px-6 md:px-10 lg:px-16 flex-1 flex flex-col mx-auto w-full relative z-10 ${maxWidth} items-center`}>
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

        <div className="w-full flex flex-col items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
