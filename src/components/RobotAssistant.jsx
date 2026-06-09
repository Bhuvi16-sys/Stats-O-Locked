import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Send, Trash2 } from 'lucide-react';

/* ── Intents ─────────────────────────────────────────────────────── */
const INTENTS = [
  {
    keys: ['about', 'who are you', 'who is sol', 'what is sol', 'tell me about', 'what do you do'],
    action: 'navigate', target: '/about',
    replies: [
      "SOL is VIT Bhopal's AI, Data Science & ML club 🚀 Taking you to About...",
      "We're a student-driven community of data nerds at VIT Bhopal! 🤓 Let me show you...",
      "Stats-O-Locked — where AI meets innovation! ✨ Heading to About page...",
    ],
    chips: ['Vision?', 'Mission?', 'Join?'],
  },
  {
    keys: ['event', 'events', 'workshop', 'hackathon', 'techcorp', 'techila', 'ctrl', 'upcoming', 'competition'],
    action: 'navigate', target: '/events',
    replies: [
      "TechCorp Summit, Techila Unplugged, CTRL+LOL — we go hard! 🎪 Opening Events...",
      "Our events are *chef's kiss* 🏆 Let me take you there...",
      "We've hosted some epic events! 🎮 Taking you to Events page...",
    ],
    chips: ['Winners?', 'Upcoming?', 'Gallery'],
  },
  {
    keys: ['team', 'members', 'people', 'president', 'who leads', 'leadership', 'core team'],
    action: 'navigate', target: '/team',
    replies: [
      "18+ brilliant minds across 8 departments! 👥 Meet the team...",
      "We've got an incredible crew running this! 🌟 Taking you to Team...",
      "From Leadership to Editing — our team does it all! ✨ Opening Team page...",
    ],
    chips: ['Leadership?', 'Technical?', 'Join?'],
  },
  {
    keys: ['contact', 'reach', 'email', 'phone', 'connect', 'message', 'talk'],
    action: 'navigate', target: '/contact',
    replies: [
      "Hit us at solclub@vitbhopal.ac.in 📬 Opening Contact...",
      "We'd love to hear from you! 😊 Heading to Contact page...",
      "Slide into our inbox! 💌 Taking you to Contact...",
    ],
    chips: ['Instagram?', 'LinkedIn?', 'Visit us?'],
  },
  {
    keys: ['gallery', 'photos', 'pictures', 'pics', 'images', 'moments'],
    action: 'navigate', target: '/gallery',
    replies: [
      "Our events look amazing in photos 📸 Opening Gallery...",
      "TechCorp Summit memories incoming! 🔥 Taking you to Gallery...",
      "Prepare to be amazed! ✨ Heading to Gallery...",
    ],
    chips: ['Events?', 'Team?', 'Contact?'],
  },
  {
    keys: ['research', 'paper', 'publication', 'study', 'ml', 'ai', 'machine learning'],
    action: 'navigate', target: '/research',
    replies: [
      "Our Research wing is cutting-edge! 🔬 Opening Research page...",
      "AI & ML papers, projects, and more! 🧠 Taking you there...",
      "Science is happening here! ⚡ Opening Research...",
    ],
    chips: ['Events?', 'Team?', 'Join?'],
  },
  {
    keys: ['home', 'back', 'start', 'main', 'beginning'],
    action: 'navigate', target: '/',
    replies: ["Back to base! 🏠 Taking you home...", "Homeward bound! 🚀 Heading back..."],
    chips: ['Events', 'Team', 'About?'],
  },
  {
    keys: ['how many members', 'member count', 'size', 'how big', 'how many people'],
    action: 'text',
    replies: [
      "70+ active members and growing every semester! 🎓",
      "Over 70 passionate minds! 🤩 New members join every induction season.",
    ],
    chips: ['Join?', 'Events', 'Team'],
  },
  {
    keys: ['join', 'how to join', 'become a member', 'enroll', 'register', 'induction', 'apply'],
    action: 'text',
    replies: [
      "Inductions happen each semester! 🙌 Follow @sol_vitb on Instagram to catch the next opening.",
      "We open inductions at the start of semester — follow @sol_vitb to stay updated! 📱",
      "Keep an eye on @sol_vitb on Instagram. Inductions come around each semester! 🚀",
    ],
    chips: ['Instagram?', 'Contact', 'Events'],
  },
  {
    keys: ['vision', 'goal', 'future', 'aim'],
    action: 'text',
    replies: [
      "Our vision: build future leaders in tech, analytics & AI — while contributing to society! 🌟",
      "We want students to excel in AI, data & leadership. That's the dream! 💡",
    ],
    chips: ['Mission?', 'About', 'Join?'],
  },
  {
    keys: ['mission'],
    action: 'text',
    replies: [
      "Hands-on projects, real experiences, collaborative learning — that's our mission! 💪",
      "We develop skills beyond the classroom through real projects and mentorship! 🎯",
    ],
    chips: ['Vision?', 'About', 'Events'],
  },
  {
    keys: ['instagram', 'insta', 'social', 'linkedin', 'follow', 'social media'],
    action: 'text',
    replies: [
      "Instagram: @sol_vitb 📱 LinkedIn: Stats-O-Locked Club. Give us a follow! 🙌",
      "Find us @sol_vitb on Insta for event updates, memes & more! 📸",
    ],
    chips: ['Contact', 'Events', 'Join?'],
  },
  {
    keys: ['hi', 'hello', 'hey', 'hii', 'sup', 'yo', 'helo', 'howdy', 'hiya'],
    action: 'text',
    replies: [
      "Hey there! 👋 I'm Statsy — your SOL guide! Ask me about events, team, joining, or anything SOL!",
      "Hello! 🤖 I'm Statsy! What can I help you explore today?",
      "Heyyy! 👋 Statsy here — what would you like to know about Stats-O-Locked?",
    ],
    chips: ['Events', 'Team', 'Join?'],
  },
  {
    keys: ['thanks', 'thank you', 'ty', 'thx', 'great', 'awesome', 'nice', 'cool'],
    action: 'text',
    replies: [
      "Happy to help! 😊 Anything else about SOL?",
      "Anytime! 🤖✨ What else can I do for you?",
      "You're welcome! 🙌 Go SOL! 🚀",
    ],
    chips: ['Events', 'Team', 'Contact'],
  },
  {
    keys: ['bye', 'goodbye', 'see you', 'cya', 'later', 'take care'],
    action: 'text',
    replies: [
      "See you around! 👋 Go SOL! 🚀",
      "Bye! Come back anytime! 😊",
      "*waves robot arm* See you! 🤖",
    ],
    chips: ['Contact', 'Events', 'About?'],
  },
];

const DEFAULT_CHIPS = ['Events', 'Team', 'Join?', 'Contact'];
const FALLBACK_REPLIES = [
  "🤔 Hmm, not sure about that! Try: **events**, **team**, **join**, or **contact**.",
  "I didn't quite get that 😅 Ask me about events, the team, how to join, or contact info!",
  "That's outside my knowledge zone! 🤖 Try: 'events', 'team', 'about', or 'contact'.",
];
const IDLE_COMMENTS = [
  "Psst! Check out our Events 🎪",
  "SOL has 70+ members! 🤓",
  "Explore our Team page 👀",
  "Want to join SOL? Ask me! 💫",
  "TechCorp Summit was epic 🚀",
  "We're VIT Bhopal's AI club 🏆",
  "*beep boop* Processing vibes 🤖",
  "Check out our Gallery! 📸",
  "Research page has cool stuff 🔬",
  "Ask me anything about SOL! ✨",
];

function matchIntent(q) {
  const query = q.toLowerCase().trim();
  return INTENTS.find(({ keys }) => keys.some(k => query.includes(k))) ?? null;
}
function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

/* ── Eye ─────────────────────────────────────────────────────────── */
function Eye({ offset, blinking, expression = 'normal' }) {
  const cfg = {
    normal:   { size: 4, color: '#00f0ff', glow: '0 0 5px #00f0ff' },
    happy:    { size: 5, color: '#00f0ff', glow: '0 0 10px #00f0ff, 0 0 18px rgba(0,240,255,0.4)' },
    thinking: { size: 3, color: '#a78bfa', glow: '0 0 4px #7c3aed' },
    excited:  { size: 5, color: '#ffd700', glow: '0 0 8px #ffd700, 0 0 16px rgba(255,215,0,0.35)' },
  }[expression] ?? { size: 4, color: '#00f0ff', glow: '0 0 5px #00f0ff' };

  return (
    <div style={{
      width: 11, height: 11, borderRadius: '50%',
      background: '#06101f', border: '1.5px solid rgba(0,240,255,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', flexShrink: 0,
      transform: blinking ? 'scaleY(0.06)' : 'scaleY(1)',
      transition: 'transform 0.07s',
    }}>
      <div style={{
        width: cfg.size, height: cfg.size, borderRadius: '50%',
        background: cfg.color, boxShadow: cfg.glow,
        transform: `translate(${offset.x}px,${offset.y}px)`,
        transition: 'transform 0.1s ease-out, width 0.25s, height 0.25s, background 0.3s, box-shadow 0.3s',
        flexShrink: 0,
      }} />
    </div>
  );
}

/* ── Sparkle burst ───────────────────────────────────────────────── */
function Sparkles({ trigger }) {
  const [particles, setParticles] = useState([]);
  const prev = useRef(0);
  useEffect(() => {
    if (trigger === prev.current) return;
    prev.current = trigger;
    const colors = ['#00f0ff', '#ffd700', '#ff6b6b', '#7c3aed', '#10b981', '#f59e0b'];
    const ps = Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const dist = 22 + Math.random() * 16;
      return { id: Date.now() + i, x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, color: colors[i % colors.length] };
    });
    setParticles(ps);
    setTimeout(() => setParticles([]), 700);
  }, [trigger]);

  return (
    <>
      {particles.map(p => (
        <motion.div key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 5, height: 5, borderRadius: '50%',
            background: p.color, boxShadow: `0 0 5px ${p.color}`,
            pointerEvents: 'none', zIndex: 20,
            marginLeft: -2.5, marginTop: -2.5,
          }}
        />
      ))}
    </>
  );
}

/* ── Typing dots ─────────────────────────────────────────────────── */
function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, padding: '9px 13px' }}>
      {[0, 1, 2].map(i => (
        <motion.div key={i}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.15 }}
          style={{ width: 5, height: 5, borderRadius: '50%', background: '#00f0ff' }}
        />
      ))}
    </div>
  );
}

/* ── Message bubble ──────────────────────────────────────────────── */
function Bubble({ msg, isStreaming, streamedText }) {
  const isBot = msg.from === 'bot';
  const displayText = isBot && isStreaming ? streamedText : msg.text;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      style={{ display: 'flex', justifyContent: isBot ? 'flex-start' : 'flex-end', marginBottom: 7 }}
    >
      <div style={{
        maxWidth: '84%', padding: '8px 12px',
        borderRadius: isBot ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
        background: isBot ? 'rgba(0,240,255,0.07)' : 'rgba(124,58,237,0.18)',
        border: isBot ? '1px solid rgba(0,240,255,0.18)' : '1px solid rgba(124,58,237,0.28)',
        fontSize: '0.8rem', lineHeight: 1.55,
        color: isBot ? '#e0e7ff' : 'rgba(255,255,255,0.9)',
        fontFamily: "'Inter',sans-serif",
      }}>
        {displayText}
        {isBot && isStreaming && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{ color: '#00f0ff', fontWeight: 700, marginLeft: 1 }}
          >|</motion.span>
        )}
      </div>
    </motion.div>
  );
}

/* ── Main ────────────────────────────────────────────────────────── */
export default function RobotAssistant() {
  const [open, setOpen]               = useState(false);
  const [messages, setMessages]       = useState([
    { id: 0, from: 'bot', text: "👋 Hey! I'm Statsy — your SOL guide! Ask me about events, team, how to join, or anything SOL!" },
  ]);
  const [input, setInput]             = useState('');
  const [typing, setTyping]           = useState(false);
  const [streamingId, setStreamingId] = useState(null);
  const [streamedText, setStreamedText] = useState('');
  const [currentChips, setCurrentChips] = useState(DEFAULT_CHIPS);
  const [isBlinking, setIsBlinking]   = useState(false);
  const [isEating, setIsEating]       = useState(false);
  const [idleComment, setIdleComment] = useState(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [expression, setExpression]   = useState('normal');
  const [sparkleTrigger, setSparkleTrigger] = useState(0);
  const [dragging, setDragging]       = useState(false);
  const [hasNotif, setHasNotif]       = useState(false);

  const robotRef      = useRef(null);
  const bottomRef     = useRef(null);
  const inputRef      = useRef(null);
  const msgIdRef      = useRef(1);
  const wasDragged    = useRef(false);
  const navigate      = useNavigate();

  /* cursor tracking — pupils follow mouse */
  useEffect(() => {
    const onMove = (e) => {
      if (!robotRef.current) return;
      const r = robotRef.current.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const factor = Math.min(1, 80 / dist);
      setPupilOffset({ x: (dx / dist) * 3 * factor, y: (dy / dist) * 3 * factor });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* random blink */
  useEffect(() => {
    let t;
    const blink = () => {
      t = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => { setIsBlinking(false); blink(); }, 120);
      }, 2200 + Math.random() * 3800);
    };
    blink();
    return () => clearTimeout(t);
  }, []);

  /* idle comments */
  useEffect(() => {
    if (open) { setIdleComment(null); setHasNotif(false); return; }
    let show, hide;
    const schedule = () => {
      show = setTimeout(() => {
        setIdleComment(pickRandom(IDLE_COMMENTS));
        setHasNotif(true);
        hide = setTimeout(() => { setIdleComment(null); setHasNotif(false); schedule(); }, 3800);
      }, 9000 + Math.random() * 9000);
    };
    schedule();
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [open]);

  /* typewriter */
  useEffect(() => {
    if (streamingId === null) return;
    const msg = messages.find(m => m.id === streamingId);
    if (!msg) return;
    const full = msg.text;
    let i = 0;
    setStreamedText('');
    const id = setInterval(() => {
      i++;
      setStreamedText(full.slice(0, i));
      if (i >= full.length) { clearInterval(id); setStreamingId(null); }
    }, 16);
    return () => clearInterval(id);
  }, [streamingId]);

  /* scroll to bottom + focus input */
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open, messages]);

  const sendMessage = useCallback((text) => {
    const t = text.trim();
    if (!t) return;
    setInput('');
    const userMsg = { id: msgIdRef.current++, from: 'user', text: t };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);
    setExpression('thinking');

    const intent = matchIntent(t);
    setTimeout(() => {
      setTyping(false);
      const reply = intent ? pickRandom(intent.replies) : pickRandom(FALLBACK_REPLIES);
      const botId = msgIdRef.current++;
      setMessages(prev => [...prev, { id: botId, from: 'bot', text: reply }]);
      setStreamingId(botId);
      setCurrentChips(intent?.chips ?? DEFAULT_CHIPS);
      setSparkleTrigger(n => n + 1);

      const newExpr = intent ? (intent.action === 'navigate' ? 'excited' : 'happy') : 'normal';
      setExpression(newExpr);
      setTimeout(() => setExpression('normal'), 3500);

      if (intent?.action === 'navigate') {
        setTimeout(() => { navigate(intent.target); setOpen(false); }, reply.length * 16 + 400);
      }
    }, 600);
  }, [navigate]);

  function handleChip(label) {
    setIsEating(true);
    setTimeout(() => setIsEating(false), 700);
    sendMessage(label.replace('?', ''));
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  function clearChat() {
    setMessages([{ id: 0, from: 'bot', text: "👋 Fresh start! What would you like to know about SOL?" }]);
    setCurrentChips(DEFAULT_CHIPS);
    setStreamingId(null);
    setExpression('happy');
    setTimeout(() => setExpression('normal'), 2000);
  }

  function handleRobotClick() {
    if (wasDragged.current) return;
    setOpen(o => !o);
    if (!open) { setHasNotif(false); setIdleComment(null); }
  }

  /* mouth shape from expression */
  const mouth = {
    normal:   { w: 22, h: 4, color: '#00f0ff' },
    happy:    { w: 28, h: 5, color: '#00f0ff' },
    thinking: { w: 16, h: 3, color: '#a78bfa' },
    excited:  { w: 26, h: 5, color: '#ffd700' },
  }[expression] ?? { w: 22, h: 4, color: '#00f0ff' };

  /* antenna dot color/animation from expression */
  const antennaDot = {
    normal:   { color: '#ff6b6b', anim: { scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }, dur: 1.3 },
    happy:    { color: '#10b981', anim: { scale: [1, 1.8, 1], opacity: [0.7, 1, 0.7] }, dur: 0.8 },
    thinking: { color: '#a78bfa', anim: { rotate: [0, 360] }, dur: 1.0 },
    excited:  { color: '#ffd700', anim: { scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }, dur: 0.6 },
  }[expression] ?? { color: '#ff6b6b', anim: { scale: [1, 1.5, 1] }, dur: 1.3 };

  return (
    <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={{ top: -900, left: -1600, right: 30, bottom: 30 }}
        onDragStart={() => { wasDragged.current = false; setDragging(true); }}
        onDrag={() => { wasDragged.current = true; }}
        onDragEnd={() => { setDragging(false); setTimeout(() => { wasDragged.current = false; }, 100); }}
        style={{
          position: 'fixed', bottom: 20, right: 22, zIndex: 200,
          cursor: dragging ? 'grabbing' : 'grab',
          touchAction: 'none',
          userSelect: 'none',
        }}
      >

        {/* ── Chat window ───────────────────────────────────────── */}
        <AnimatePresence>
          {open && (
            <motion.div
              onPointerDown={e => e.stopPropagation()}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.93 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{
                position: 'absolute', bottom: 'calc(100% + 14px)', right: 0,
                width: 300, background: '#081220',
                border: '1px solid rgba(0,240,255,0.22)', borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 20px 56px rgba(0,0,0,0.85), 0 0 24px rgba(0,240,255,0.07)',
              }}
            >
              {/* Header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 9, padding: '10px 12px',
                background: 'linear-gradient(135deg,rgba(0,240,255,0.07),rgba(124,58,237,0.07))',
                borderBottom: '1px solid rgba(0,240,255,0.1)',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', flexShrink: 0,
                }}>🤖</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>Statsy</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <motion.span
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 5px #10b981' }}
                    />
                    <span style={{ fontSize: '0.59rem', color: 'rgba(255,255,255,0.35)', fontFamily: "'Inter',sans-serif" }}>SOL Guide · Online</span>
                  </div>
                </div>
                <button onClick={clearChat} title="Clear chat" style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.25)', padding: 4, transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
                ><Trash2 size={12} /></button>
                <button onClick={() => setOpen(false)} style={{
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '50%', width: 24, height: 24, cursor: 'pointer',
                  color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><X size={11} /></button>
              </div>

              {/* Messages */}
              <div style={{
                height: 230, overflowY: 'auto', padding: '10px 10px 4px',
                scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,240,255,0.1) transparent',
              }}>
                {messages.map(msg => (
                  <Bubble key={msg.id} msg={msg}
                    isStreaming={msg.from === 'bot' && msg.id === streamingId}
                    streamedText={streamedText}
                  />
                ))}
                {typing && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 7 }}>
                    <div style={{ background: 'rgba(0,240,255,0.07)', border: '1px solid rgba(0,240,255,0.18)', borderRadius: '4px 14px 14px 14px' }}>
                      <TypingDots />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick chips */}
              <div style={{ padding: '5px 10px', display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                <AnimatePresence mode="popLayout">
                  {currentChips.map(label => (
                    <motion.button key={label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.18 }}
                      onClick={() => handleChip(label)}
                      style={{
                        padding: '3px 10px', borderRadius: 100, fontSize: '0.64rem',
                        background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.18)',
                        color: 'rgba(0,240,255,0.75)', cursor: 'pointer',
                        fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, letterSpacing: '0.3px',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,240,255,0.15)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,240,255,0.05)'; }}
                    >{label}</motion.button>
                  ))}
                </AnimatePresence>
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} style={{
                display: 'flex', gap: 7, padding: '7px 10px 12px',
                borderTop: '1px solid rgba(255,255,255,0.05)',
              }}>
                <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
                  placeholder="Ask me anything…"
                  style={{
                    flex: 1, background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10,
                    padding: '7px 10px', color: '#fff', fontSize: '0.78rem',
                    fontFamily: "'Inter',sans-serif", outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(0,240,255,0.45)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
                />
                <motion.button type="submit"
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  style={{
                    width: 32, height: 32, borderRadius: 9, flexShrink: 0, border: 'none',
                    background: 'linear-gradient(135deg,#7c3aed,#00f0ff)',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#020b16',
                  }}
                ><Send size={13} /></motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Idle speech bubble ────────────────────────────────── */}
        <AnimatePresence>
          {idleComment && !open && (
            <motion.div
              initial={{ opacity: 0, x: 12, scale: 0.88 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.22 }}
              style={{
                position: 'absolute', bottom: 'calc(100% + 10px)', right: 0,
                maxWidth: 175, background: '#081220',
                border: '1px solid rgba(0,240,255,0.28)',
                borderRadius: '14px 14px 4px 14px',
                padding: '8px 12px', fontSize: '0.73rem',
                color: '#e0e7ff', lineHeight: 1.5,
                fontFamily: "'Inter',sans-serif",
                boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                pointerEvents: 'none',
              }}
            >
              {idleComment}
              <div style={{ position: 'absolute', bottom: -6, right: 14, width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '6px solid rgba(0,240,255,0.28)' }} />
              <div style={{ position: 'absolute', bottom: -4, right: 15, width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '5px solid #081220' }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Robot body ────────────────────────────────────────── */}
        <motion.div
          ref={robotRef}
          onClick={handleRobotClick}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
        >
          {/* Notification / online dot */}
          <motion.div
            animate={hasNotif && !open
              ? { scale: [1, 1.7, 1], opacity: [1, 0.5, 1] }
              : { scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }
            }
            transition={{ duration: hasNotif && !open ? 0.65 : 1.6, repeat: Infinity }}
            style={{
              position: 'absolute', top: 16, right: -2, zIndex: 3,
              width: hasNotif && !open ? 10 : 8,
              height: hasNotif && !open ? 10 : 8,
              borderRadius: '50%',
              background: open ? 'transparent' : (hasNotif ? '#ff6b6b' : '#10b981'),
              border: '2px solid #020b16',
              boxShadow: hasNotif && !open ? '0 0 8px #ff6b6b' : '0 0 6px #10b981',
              transition: 'background 0.3s, width 0.2s, height 0.2s',
              pointerEvents: 'none',
            }}
          />

          {/* Sparkles centered on head area */}
          <div style={{ position: 'absolute', top: 26, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
            <Sparkles trigger={sparkleTrigger} />
          </div>

          {/* Antenna */}
          <div style={{ width: 2, height: 13, background: 'linear-gradient(180deg,#00f0ff,#3b82f6)', borderRadius: 2, position: 'relative' }}>
            <motion.div
              animate={antennaDot.anim}
              transition={{ duration: antennaDot.dur, repeat: Infinity, ease: expression === 'thinking' ? 'linear' : 'easeInOut' }}
              style={{
                width: 7, height: 7, borderRadius: '50%',
                background: antennaDot.color,
                boxShadow: `0 0 6px ${antennaDot.color}`,
                position: 'absolute', top: -5, left: -2.5,
                transition: 'background 0.3s, box-shadow 0.3s',
              }}
            />
          </div>

          {/* Head */}
          <motion.div
            whileHover={{ scale: 1.07 }}
            style={{
              width: 52, height: 42, borderRadius: 16,
              background: 'rgba(8,47,73,0.97)', backdropFilter: 'blur(16px)',
              border: `1.5px solid ${open ? 'rgba(0,240,255,0.7)' : 'rgba(0,240,255,0.4)'}`,
              boxShadow: open ? '0 0 20px rgba(0,240,255,0.55)' : '0 0 12px rgba(0,240,255,0.24)',
              transition: 'border-color 0.3s, box-shadow 0.3s',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 7,
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Blush cheeks */}
            <div style={{ position: 'absolute', left: 5, bottom: 8, width: 11, height: 7, borderRadius: '50%', background: 'rgba(255,100,120,0.22)', filter: 'blur(2.5px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: 5, bottom: 8, width: 11, height: 7, borderRadius: '50%', background: 'rgba(255,100,120,0.22)', filter: 'blur(2.5px)', pointerEvents: 'none' }} />
            {/* Top shine */}
            <div style={{ position: 'absolute', top: 3, left: '20%', right: '20%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)', borderRadius: 1, pointerEvents: 'none' }} />

            <div style={{ display: 'flex', gap: 8 }}>
              <Eye offset={pupilOffset} blinking={isBlinking} expression={expression} />
              <Eye offset={pupilOffset} blinking={isBlinking} expression={expression} />
            </div>

            <motion.div
              animate={isEating
                ? { scaleY: [1, 2.5, 0.2, 2.2, 0.3, 1], scaleX: [1, 1.3, 0.7, 1.2, 0.8, 1] }
                : { scaleY: 1, scaleX: 1 }
              }
              transition={{ duration: 0.6 }}
              style={{
                width: mouth.w, height: mouth.h, borderRadius: 100,
                background: mouth.color, boxShadow: `0 0 6px ${mouth.color}`,
                transformOrigin: 'center',
                transition: 'width 0.3s ease, height 0.3s ease, background 0.3s',
              }}
            />
          </motion.div>

          {/* Neck */}
          <div style={{ width: 14, height: 7, background: 'linear-gradient(180deg,rgba(0,240,255,0.5),rgba(59,130,246,0.4))', boxShadow: '0 0 4px rgba(0,240,255,0.2)' }} />

          {/* Torso */}
          <div style={{
            width: 62, height: 50, borderRadius: 14,
            background: 'rgba(8,47,73,0.97)', backdropFilter: 'blur(16px)',
            border: `1.5px solid ${open ? 'rgba(0,240,255,0.5)' : 'rgba(0,240,255,0.22)'}`,
            boxShadow: open ? '0 0 16px rgba(0,240,255,0.3)' : '0 0 8px rgba(0,240,255,0.12)',
            transition: 'border-color 0.3s, box-shadow 0.3s',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'visible',
          }}>
            {/* Left arm */}
            <div style={{ position: 'absolute', left: -11, top: 5, width: 11, height: 30, borderRadius: 100, background: 'rgba(8,47,73,0.95)', border: '1px solid rgba(0,240,255,0.2)', transform: open ? 'rotate(28deg)' : 'rotate(10deg)', transformOrigin: 'top center', transition: 'transform 0.4s ease' }} />
            {/* Right arm */}
            <div style={{ position: 'absolute', right: -11, top: 5, width: 11, height: 30, borderRadius: 100, background: 'rgba(8,47,73,0.95)', border: '1px solid rgba(0,240,255,0.2)', transform: open ? 'rotate(-28deg)' : 'rotate(-10deg)', transformOrigin: 'top center', transition: 'transform 0.4s ease' }} />
            {/* Screen */}
            <div style={{ width: 38, height: 30, background: '#040c18', borderRadius: 6, border: '1px solid rgba(0,240,255,0.18)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 14 }}>
                {[
                  { h: [2, 7, 2], c: '#00f0ff', d: 1.1 },
                  { h: [7, 2, 7], c: '#ffd700', d: 1.4 },
                  { h: [5, 10, 5], c: '#00f0ff', d: 0.9 },
                  { h: [9, 4, 9], c: '#7c3aed', d: 1.2 },
                  { h: [3, 6, 3], c: '#10b981', d: 1.5 },
                ].map((b, i) => (
                  <motion.div key={i}
                    animate={{ height: expression === 'excited' ? b.h.map(v => Math.round(v * 1.45)) : b.h }}
                    transition={{ duration: b.d, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ width: 3, background: b.c, boxShadow: `0 0 2px ${b.c}`, borderRadius: '2px 2px 0 0', alignSelf: 'flex-end' }}
                  />
                ))}
              </div>
              <div style={{ fontSize: 5, fontFamily: 'monospace', color: 'rgba(0,240,255,0.55)', letterSpacing: 1 }}>SOL.AI</div>
            </div>
          </div>

          {/* Legs */}
          <div style={{ display: 'flex', gap: 10, marginTop: -2 }}>
            {[0, 1].map(i => (
              <motion.div key={i}
                animate={{ y: open ? [0, -2, 0] : 0 }}
                transition={{ duration: 0.5, repeat: open ? Infinity : 0, delay: i * 0.25 }}
                style={{ width: 13, height: 18, background: 'rgba(8,47,73,0.95)', borderRadius: '0 0 8px 8px', border: '1px solid rgba(0,240,255,0.18)', boxShadow: '0 3px 8px rgba(0,0,0,0.35)' }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
  );
}
