import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Quick-action config ─────────────────────────────── */
const quickActions = [
  { label: '🎯 What is SOL?',    id: 'about',   reply: "SOL is VIT Bhopal's student-led analytics & tech club. Join 200+ innovators!" },
  { label: '🚀 Our Events?',     id: 'events',  reply: "TechCorp Summit & CTRL+LOL are our flagship events. More coming soon! 🎉" },
  { label: '📬 Let\'s Connect!', id: 'contact', reply: "Reach us at solclub@vitbhopal.ac.in or Instagram @sol_vitb 🌐" },
];

export default function RobotAssistant() {
  const dialogueMap = {
    home:    "👋 Hey! I'm Statsy. Ready to unlock the power of Data & AI?",
    about:   "🧠 Curious about SOL? We're a community of builders and innovators.",
    events:  "📅 Check out TechCorp Summit & CTRL+LOL — our flagship events!",
    team:    "🤝 Meet the brilliant minds driving Stats-O-Locked forward.",
    research:"🔬 Diving deep into the future. Explore our latest AI research!",
    contact: "📬 Got questions or want to collaborate? Drop us a line!",
  };

  const [displayText, setDisplayText]   = useState('');
  const [isHovered, setIsHovered]       = useState(false);
  const [currentId, setCurrentId]       = useState('home');
  const [showActions, setShowActions]   = useState(false);
  const [activeReply, setActiveReply]   = useState(null);
  const typeRef = useRef(null);

  /* typewriter helper */
  const typeText = (text) => {
    if (typeRef.current) clearInterval(typeRef.current);
    let i = 0;
    setDisplayText('');
    typeRef.current = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(typeRef.current);
    }, 22);
  };

  /* Trigger typewriter when section changes */
  useEffect(() => {
    if (activeReply) return;           // don't interrupt quick-action reply
    typeText(dialogueMap[currentId] || dialogueMap.home);
  }, [currentId]);

  /* Quick-action click handler */
  const handleAction = (action) => {
    setActiveReply(action.id);
    setShowActions(false);
    typeText(action.reply);

    // Scroll to matching section if it exists
    const el = document.getElementById(action.id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Reset after 4 s
    setTimeout(() => {
      setActiveReply(null);
      typeText(dialogueMap[currentId] || dialogueMap.home);
    }, 4000);
  };

  /* IntersectionObserver scroll-tracking */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && dialogueMap[entry.target.id] && entry.target.id !== currentId) {
            setCurrentId(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const observed = new Set();
    const update = () => {
      document.querySelectorAll('[id]').forEach((el) => {
        if (dialogueMap[el.id] && !observed.has(el)) {
          observer.observe(el);
          observed.add(el);
        }
      });
    };
    update();
    const mo = new MutationObserver(update);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); mo.disconnect(); };
  }, [currentId]);

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="fixed bottom-6 right-6 z-[100] flex flex-col items-end cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setShowActions(false); }}
    >
      {/* ── Quick Action Buttons ─────────────────────── */}
      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2 mb-3 items-end"
          >
            {quickActions.map((action) => (
              <motion.button
                key={action.id}
                whileHover={{ scale: 1.05, x: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleAction(action)}
                style={{
                  background: 'rgba(11,19,43,0.95)',
                  border: '1px solid rgba(0,240,255,0.5)',
                  borderRadius: '999px',
                  padding: '6px 14px',
                  color: '#e0e7ff',
                  fontSize: '0.72rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 0 10px rgba(0,240,255,0.15)',
                  letterSpacing: '0.3px',
                }}
              >
                {action.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Speech Bubble ────────────────────────────── */}
      <div
        className="w-52 bg-[#0B132B] border border-[#00f0ff] rounded-2xl p-3 mb-6 relative shadow-[0_0_10px_#00f0ff] text-sm text-[#e0e7ff] font-sans leading-relaxed min-h-[70px]"
        onClick={() => setShowActions((s) => !s)}
        title="Click for quick options"
        style={{ cursor: 'pointer' }}
      >
        {displayText}

        {/* Toggle hint */}
        <div style={{
          position: 'absolute', bottom: '6px', right: '8px',
          fontSize: '0.6rem', color: 'rgba(0,240,255,0.5)',
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: '0.5px',
        }}>
          {showActions ? '▲ close' : '▼ options'}
        </div>

        {/* Bubble tail */}
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[12px] border-transparent border-t-[#00f0ff]">
          <div className="absolute -top-[13px] -left-[9px] w-0 h-0 border-l-[9px] border-r-[9px] border-t-[11px] border-transparent border-t-[#0B132B]"></div>
        </div>
      </div>

      {/* ── Robot Body ───────────────────────────────── */}
      <div className="relative flex flex-col items-center">
        {/* Antenna */}
        <div className="absolute -top-6 w-1 h-6 bg-[#3b82f6] shadow-[0_0_5px_#3b82f6] flex justify-center">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-3 h-3 bg-[#ff6b6b] rounded-full -mt-2 shadow-[0_0_8px_#ff6b6b]"
          />
        </div>

        {/* Head */}
        <div className="w-20 h-16 bg-cyan-900/20 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_0_10px_rgba(59,130,246,0.6)] group-hover:shadow-[0_0_20px_#00f0ff] transition-all duration-300 flex flex-col items-center justify-center relative z-10">
          <div className="flex gap-4 mb-2">
            <div className="w-4 h-4 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]"></div>
            <div className="w-4 h-4 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]"></div>
          </div>
          <div className="w-8 h-1.5 bg-[#00f0ff] rounded-full shadow-[0_0_5px_#00f0ff] overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-full bg-white opacity-80"
            />
          </div>
        </div>

        {/* Neck */}
        <div className="w-6 h-3 bg-[#3b82f6] shadow-[0_0_5px_#3b82f6] -mt-1 -mb-1 z-0"></div>

        {/* Torso */}
        <div className="w-28 h-36 bg-cyan-900/20 backdrop-blur-md rounded-[24px] border border-white/20 shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_25px_#00f0ff] transition-all duration-300 flex flex-col items-center pt-3 pb-2 z-10 relative">
          <div className="w-20 h-[4.5rem] bg-[#0B132B] rounded-lg border border-[#1e3a8a] shadow-inner flex flex-col items-center py-1">
            <svg viewBox="0 0 60 25" className="w-[85%] h-8 overflow-visible mt-1">
              <motion.path
                d="M 0 20 Q 15 20, 20 15 T 40 10 T 60 5"
                fill="transparent" stroke="#00f0ff" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                style={{ filter: 'drop-shadow(0 0 2px #00f0ff)' }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isHovered ? 1 : 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </svg>
            <div className="flex gap-1.5 mt-auto mb-1 items-end h-4">
              <motion.div animate={{ height: [6, 12, 6] }} transition={{ duration: 1.2, repeat: Infinity }} className="w-1.5 bg-[#00f0ff] shadow-[0_0_4px_#00f0ff] rounded-t-sm" />
              <motion.div animate={{ height: [12, 6, 12] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 bg-[#ffd700] shadow-[0_0_4px_#ffd700] rounded-t-sm" />
              <motion.div animate={{ height: [8, 14, 8] }} transition={{ duration: 1.3, repeat: Infinity }} className="w-1.5 bg-[#00f0ff] shadow-[0_0_4px_#00f0ff] rounded-t-sm" />
            </div>
          </div>
          <div className="mt-auto w-[80%] flex flex-col gap-2">
            <div className="flex justify-between px-1">
              <div className="flex gap-1.5">
                <div className="w-2 h-1 bg-[#ff6b6b] rounded-full shadow-[0_0_4px_#ff6b6b]"></div>
                <div className="w-2 h-1 bg-[#ffd700] rounded-full shadow-[0_0_4px_#ffd700]"></div>
              </div>
              <div className="w-2 h-1 bg-[#00f0ff] rounded-full shadow-[0_0_4px_#00f0ff]"></div>
            </div>
            <div className="bg-[#0B132B] text-[#00f0ff] font-mono text-[8px] leading-tight px-1 py-0.5 rounded border border-[#1e3a8a] text-center shadow-[0_0_3px_#00f0ff_inset]">
              01001010
            </div>
          </div>
        </div>

        {/* Arms */}
        <div className="absolute top-8 -left-4 w-6 h-14 bg-cyan-900/20 backdrop-blur-md rounded-full border border-white/20 shadow-[0_0_10px_rgba(59,130,246,0.5)] -z-10 origin-top transform rotate-12 group-hover:rotate-45 transition-transform duration-300"></div>
        <div className="absolute top-8 -right-4 w-6 h-14 bg-cyan-900/20 backdrop-blur-md rounded-full border border-white/20 shadow-[0_0_10px_rgba(59,130,246,0.5)] -z-10 origin-top transform -rotate-12 group-hover:-rotate-45 transition-transform duration-300"></div>

        {/* Legs */}
        <div className="flex gap-4 -mt-2 -z-10">
          <div className="w-5 h-10 bg-cyan-900/20 backdrop-blur-md rounded-full border border-white/20 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          <div className="w-5 h-10 bg-cyan-900/20 backdrop-blur-md rounded-full border border-white/20 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
        </div>
      </div>
    </motion.div>
  );
}
