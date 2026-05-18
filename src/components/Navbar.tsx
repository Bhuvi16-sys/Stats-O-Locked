import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Matrix", href: "#home" },
  { label: "Genesis", href: "#about" },
  { label: "Vault", href: "#gallery" },
  { label: "Sprints", href: "#events" },
  { label: "Council", href: "#team" },
  { label: "Connect", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-[#00ff41]/20 shadow-[0_0_30px_rgba(0,255,65,0.08)]"
            : "bg-transparent"
        }`}
      >
        {/* Top scan line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ff41] to-transparent opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <motion.a
              href="#home"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {/* Logo mark */}
              <div className="relative w-9 h-9 flex items-center justify-center">
                <div className="absolute inset-0 border border-[#00ff41]/60 rotate-45 group-hover:rotate-[50deg] transition-transform duration-500" />
                <div className="absolute inset-1 border border-[#00ff41]/30 rotate-45 group-hover:rotate-[40deg] transition-transform duration-500" />
                <span className="relative z-10 text-[#00ff41] text-xs font-mono font-bold">AI</span>
              </div>
              {/* Logo text */}
              <div className="flex flex-col leading-none">
                <span
                  className="text-white font-black text-lg tracking-widest uppercase"
                  style={{ fontFamily: "'Courier New', monospace", letterSpacing: "0.2em" }}
                >
                  STATS-O-LOCKED
                </span>
                <span className="text-[#00ff41] text-[9px] font-mono tracking-[0.3em] uppercase opacity-80">
                  AI CLUB
                </span>
              </div>
            </motion.a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                  onClick={() => setActiveLink(link.label)}
                  className={`relative px-4 py-2 text-xs font-mono tracking-[0.15em] uppercase transition-colors duration-200 group ${
                    activeLink === link.label
                      ? "text-[#00ff41]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {/* Active underline */}
                  {activeLink === link.label && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-[1px] bg-[#00ff41] shadow-[0_0_8px_#00ff41]"
                    />
                  )}
                  {/* Hover bg */}
                  <span className="absolute inset-0 bg-[#00ff41]/0 group-hover:bg-[#00ff41]/5 transition-colors duration-200 rounded-sm" />
                  <span className="relative">{link.label}</span>
                </motion.a>
              ))}
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              {/* CTA Button */}
              <motion.a
                href="#join"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="hidden md:flex items-center gap-2 px-5 py-2 border border-[#00ff41] text-[#00ff41] text-xs font-mono tracking-[0.2em] uppercase relative overflow-hidden group transition-all duration-300 hover:text-black hover:shadow-[0_0_20px_rgba(0,255,65,0.4)]"
              >
                <span className="absolute inset-0 bg-[#00ff41] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10">Join Club</span>
                <span className="relative z-10 text-[10px]">→</span>
              </motion.a>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col gap-[5px] p-2 group"
                aria-label="Toggle menu"
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={
                      menuOpen
                        ? i === 0
                          ? { rotate: 45, y: 7 }
                          : i === 1
                          ? { opacity: 0, scaleX: 0 }
                          : { rotate: -45, y: -7 }
                        : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                    }
                    transition={{ duration: 0.25 }}
                    className={`block h-[1.5px] bg-[#00ff41] origin-center ${
                      i === 1 ? "w-4" : "w-6"
                    }`}
                  />
                ))}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom scan line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ff41]/40 to-transparent" />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-[#00ff41]/20 md:hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => {
                    setActiveLink(link.label);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 py-3 border-b border-white/5 text-white/70 hover:text-[#00ff41] transition-colors duration-200 font-mono text-sm tracking-widest uppercase group"
                >
                  <span className="text-[#00ff41]/40 group-hover:text-[#00ff41] text-xs font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#join"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 text-center py-3 border border-[#00ff41] text-[#00ff41] font-mono text-sm tracking-widest uppercase"
                onClick={() => setMenuOpen(false)}
              >
                Join us →
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}