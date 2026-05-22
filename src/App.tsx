import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Users,
  Target,
  Rocket,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  ChevronRight,
  Trophy,
  Gamepad2,
  Smile,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Layers
} from 'lucide-react';
import { useState, useEffect, ReactNode } from 'react';

import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import Footer from './components/Footer';

// ─── TypewriterHeadline ───────────────────────────────────────────────────────
const TypewriterHeadline = () => {
  const words = ['INNOVATION', 'POTENTIAL', 'FUTURE'];
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
          if (displayText.length === currentWord.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(currentWord.substring(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 100 : 150,
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, index, words]);

  return (
    <span className="text-[#3DDC84] italic inline-block min-w-[300px]">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// ─── SOL_Bot ──────────────────────────────────────────────────────────────────
const SOL_Bot = () => (
  <motion.div
    initial="initial"
    animate="animate"
    className="relative w-full aspect-square flex items-center justify-center scale-110"
  >
    <motion.div
      variants={{
        initial: { opacity: 0, scale: 0.5 },
        animate: { opacity: 1, scale: 1, transition: { duration: 1, staggerChildren: 0.2 } },
      }}
      className="relative w-full h-full flex items-center justify-center"
    >
      {/* Circuit Paths */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
        <svg width="100%" height="100%" viewBox="0 0 400 400" className="opacity-20">
          <motion.path
            d="M200 200 L100 100 M200 200 L300 100 M200 200 L100 300 M200 200 L300 300"
            stroke="#3DDC84"
            strokeWidth="1"
            strokeDasharray="10 10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <motion.circle
            cx="200"
            cy="200"
            r="150"
            stroke="#3DDC84"
            strokeWidth="0.5"
            fill="none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </svg>
      </div>

      {/* Robot */}
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-80 h-96 flex flex-col items-center justify-center"
      >
        {/* Antennas */}
        <motion.div
          variants={{ initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 } }}
          className="absolute -top-16 flex gap-12"
        >
          {[0, 1].map((i) => (
            <div key={i} className="w-1.5 h-16 bg-gradient-to-t from-[#3DDC84]/40 to-transparent relative">
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                className="absolute top-0 -left-1 w-3.5 h-3.5 rounded-full bg-[#3DDC84]"
                style={{ boxShadow: '0 0 15px #3DDC84' }}
              />
            </div>
          ))}
        </motion.div>

        {/* Head */}
        <motion.div
          variants={{ initial: { scale: 0 }, animate: { scale: 1 } }}
          className="w-56 h-48 bg-[#111111] border-2 border-[#3DDC84]/60 relative flex flex-col items-center justify-center overflow-hidden"
          style={{
            borderRadius: '110px 110px 40px 40px',
            boxShadow: '0 0 80px rgba(61,220,132,0.15)',
          }}
        >
          <div className="absolute inset-3 bg-[#020202] border border-white/5 flex flex-col items-center justify-center" style={{ borderRadius: '100px 100px 30px 30px' }}>
            <div className="flex gap-12 mb-2">
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scaleY: [1, 1, 0.05, 1, 1],
                    boxShadow: ['0 0 15px #3DDC84', '0 0 30px #3DDC84', '0 0 15px #3DDC84'],
                  }}
                  transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.45, 0.5, 1], delay: i * 0.1 }}
                  className="w-14 h-5 bg-[#3DDC84] rounded-full relative"
                >
                  <div className="absolute inset-1.5 bg-white/30 rounded-full blur-[3px]" />
                </motion.div>
              ))}
            </div>
            <div className="flex gap-1 items-end h-4 mt-4">
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [4, 12, 4] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1.5 bg-[#3DDC84]/30 rounded-full"
                />
              ))}
            </div>
          </div>
          <motion.div
            animate={{ top: ['10%', '90%', '10%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 w-full h-px bg-[#3DDC84] z-20"
            style={{ boxShadow: '0 0 15px #3DDC84' }}
          />
        </motion.div>

        {/* Neck */}
        <div className="w-14 h-5 bg-black border-x-2 border-[#3DDC84]/30 flex items-center justify-center">
          <div className="w-full h-px bg-[#3DDC84]/20" />
        </div>

        {/* Torso */}
        <motion.div
          variants={{ initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 } }}
          className="w-64 h-48 bg-[#0a0a0a] border-2 border-[#3DDC84]/30 relative flex items-center justify-center rounded-[50px] overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(61,220,132,0.1),transparent)]" />
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-36 h-36 rounded-full bg-[#3DDC84]/10 blur-3xl absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-24 h-24 border-4 border-[#3DDC84]/40 rounded-full flex items-center justify-center p-6 bg-[#050505] relative z-10"
            >
              <Zap className="w-12 h-12 text-[#3DDC84]" style={{ filter: 'drop-shadow(0 0 15px #3DDC84)' }} />
            </motion.div>
          </div>
          <div className="absolute right-8 inset-y-0 flex flex-col justify-center gap-3">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ width: [4, 16, 4], opacity: [0.1, 0.6, 0.1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                className="h-1.5 bg-[#3DDC84] rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* Side pods */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -left-24 top-1/3 bg-[#111111]/80 border border-[#3DDC84]/40 rounded-3xl flex items-center justify-center backdrop-blur-xl shadow-2xl z-20 p-4"
        >
          <ShieldCheck className="w-9 h-9 text-[#3DDC84]" />
        </motion.div>
        <motion.div
          animate={{ y: [20, -20, 20], x: [5, -5, 5] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -right-24 top-1/3 bg-[#111111]/80 border border-[#3DDC84]/40 rounded-3xl flex items-center justify-center backdrop-blur-xl shadow-2xl z-20 p-4"
        >
          <Rocket className="w-9 h-9 text-[#3DDC84]" />
        </motion.div>
      </motion.div>

      {/* HUD rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[150%] h-[150%] border border-[#3DDC84]/10 rounded-full"
        style={{ borderStyle: 'dashed' }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[120%] h-[120%] border-2 border-[#3DDC84]/20 rounded-full"
        style={{ borderStyle: 'dotted' }}
      />
    </motion.div>
  </motion.div>
);

// ─── TiltCard ─────────────────────────────────────────────────────────────────
const TiltCard = ({ children, className }: { children: ReactNode; className?: string }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRotateX((y - rect.height / 2) / 8);
    setRotateY((rect.width / 2 - x) / 8);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setRotateX(0); setRotateY(0); }}
      animate={{ rotateX, rotateY }}
      style={{ transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── SectionHeading ───────────────────────────────────────────────────────────
const SectionHeading = ({
  children,
  subtitle,
  number,
}: {
  children: ReactNode;
  subtitle?: string;
  number: string;
}) => (
  <div className="mb-20">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-6"
    >
      <div className="w-8 h-8 rounded-full border border-[#3DDC84] flex items-center justify-center text-[10px] font-black text-[#3DDC84]">
        {number}
      </div>
    </motion.div>
    <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] mb-8">{children}</h2>
    {subtitle && (
      <p className="text-lg opacity-40 font-medium max-w-xl uppercase tracking-wider leading-relaxed">{subtitle}</p>
    )}
    <div className="w-full h-px bg-white/5 mt-10" />
  </div>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const leadership = [
  { name: 'Shivam Waghule', role: 'President' },
  { name: 'Shagun Sharma', role: 'Vice President' },
  { name: 'Khyati Mourya', role: 'General Secretary' },
  { name: 'Abhishek Chaturvedi', role: 'Joint Secretary' },
  { name: 'Piyush Singh', role: 'Operational Manager' },
];

const events = [
  {
    title: 'TechCorp Summit 🚀',
    icon: <Rocket className="w-8 h-8 text-[#3DDC84]" />,
    description:
      'Our premier Tech-based MUN format. We blend structured debate with emerging tech discussions to sharpen problem-solving at scale.',
    winners: ['Ansari Murtaza', 'Rishi Goyal', 'Tarang Gupta'],
  },
  {
    title: 'Techila Unplugged',
    icon: <Gamepad2 className="w-8 h-8 text-[#3DDC84]" />,
    description:
      'The ultimate recreational sprint. High-energy technical and non-technical games designed to build unbreakable team chemistry.',
    winners: ['Shreyansh', 'Ayush Arora'],
  },
  {
    title: 'CTRL + LOL 🎭',
    icon: <Smile className="w-8 h-8 text-[#3DDC84]" />,
    description:
      'A digital culture marathon. Expressing the grit of academic life through humor, memes, and visual storytelling.',
    winners: ['Dhimant Bhardwaj', 'Khushi Gupta', 'Suvradeep Dutta'],
  },
];

const teamLeads = [
  { name: 'Bhuvi Jain', role: 'Technical Lead' },
  { name: 'Ankit', role: 'Technical Co-Lead' },
  { name: 'Yug Wankhede', role: 'Event Lead' },
  { name: 'Sampada & Kashika', role: 'Event Co-Leads' },
  { name: 'Payal Beura', role: 'Creative Lead' },
  { name: 'Shubhankar', role: 'Creative Co-Lead' },
  { name: 'Shivanya Tomar', role: 'Research Lead' },
  { name: 'Murtuza Ansari', role: 'Research Co-Lead' },
  { name: 'Hamza', role: 'Social Media Lead' },
  { name: 'Rajnarayan Pawar', role: 'Photography Lead' },
  { name: 'Sankalp', role: 'PR & Outreach Lead' },
];

// suppress unused warnings
void TypewriterHeadline;
void SOL_Bot;

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="relative overflow-x-hidden bg-[#050505] text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#3DDC84] origin-left z-50"
        style={{ scaleX }}
      />

      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Hero ── */}
      <Hero />

      {/* ── Genesis / About ── */}
      <section id="about" className="py-32 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-12">
          <SectionHeading number="01" subtitle="Building a community of high-impact learners and future global leaders.">
            The Genesis
          </SectionHeading>

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-8 leading-none">
                WHAT WE <span className="text-[#3DDC84] italic">STAND</span> FOR
              </h3>
              <p className="text-lg opacity-60 leading-relaxed font-medium mb-12">
                Stats-o-Locked is a student-driven organization focused on building a strong community of learners. We
                believe in the power of collaboration, innovation, and continuous improvement. We bridge the gap between
                theoretical knowledge and practical application.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#111111] p-8 rounded-2xl border border-white/5">
                  <Target className="w-8 h-8 text-[#3DDC84] mb-6" />
                  <h4 className="font-black uppercase tracking-tight mb-4 text-sm">Our Vision</h4>
                  <p className="text-xs opacity-40 leading-relaxed">
                    To build a forward-thinking, innovation-driven community where students are empowered to excel.
                  </p>
                </div>
                <div className="bg-[#111111] p-8 rounded-2xl border border-white/5">
                  <Rocket className="w-8 h-8 text-[#3DDC84] mb-6" />
                  <h4 className="font-black uppercase tracking-tight mb-4 text-sm">Our Mission</h4>
                  <p className="text-xs opacity-40 leading-relaxed">
                    Providing students with opportunities to develop technical and leadership skills through hands-on
                    experiences.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
              <TiltCard className="bg-[#111111] border-2 border-[#3DDC84]/30 p-12 rounded-[40px] relative overflow-hidden group hover:border-[#3DDC84] transition-all duration-700 shadow-2xl shadow-[#3DDC84]/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#3DDC84]/10 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:bg-[#3DDC84]/20 transition-all" />
                <h4 className="text-4xl font-black tracking-tighter uppercase mb-8 leading-none relative z-10">
                  THE LOCKED-IN <br />
                  <span className="text-[#3DDC84] italic">ADVANTAGE</span>
                </h4>
                <ul className="text-sm font-bold opacity-80 space-y-8 relative z-10">
                  {[
                    {
                      Icon: Zap,
                      title: 'Dynamic Skill Evolution',
                      desc: 'Cultivating elite technical competencies and versatile soft skills through immersive, high-frequency workshops.',
                    },
                    {
                      Icon: Target,
                      title: 'Leadership Command',
                      desc: 'Accelerating your professional trajectory by taking direct command of mission-critical club operations and events.',
                    },
                    {
                      Icon: Rocket,
                      title: 'Applied Innovation Lab',
                      desc: 'Bridging the conceptual gap between theory and deployment with high-impact initiatives and real-world projects.',
                    },
                    {
                      Icon: Users,
                      title: 'Architectural Networking',
                      desc: 'Forging indelible connections within an exclusive community of visionary peers and recognized industry mentors.',
                    },
                  ].map(({ Icon, title, desc }) => (
                    <li key={title} className="flex items-start gap-4">
                      <Icon className="w-5 h-5 shrink-0 mt-0.5 text-[#3DDC84]" />
                      <div>
                        <span className="block uppercase tracking-widest text-xs mb-1 text-slate-100">{title}</span>
                        <p className="opacity-50 text-xs leading-relaxed">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Sprints / Events ── */}
      <section id="events" className="py-32">
        <div className="max-w-7xl mx-auto px-12">
          <SectionHeading number="02" subtitle="High-impact activities designed to test, teach, and transform members.">
            The Sprints
          </SectionHeading>

          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event, idx) => (
              <TiltCard
                key={idx}
                className="bg-[#111111] border border-white/5 p-10 rounded-[32px] group hover:border-[#3DDC84] transition-all flex flex-col cursor-default"
              >
                <div className="text-[#3DDC84] mb-8 transition-transform group-hover:scale-110">{event.icon}</div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-4">{event.title}</h4>
                <p className="text-sm opacity-50 mb-8 flex-grow leading-relaxed">{event.description}</p>
                <div className="pt-8 mt-auto border-t border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-black tracking-widest opacity-20">Winners Circle</span>
                    <Trophy className="w-4 h-4 text-[#3DDC84] opacity-50" />
                  </div>
                  <ul className="text-xs space-y-2 opacity-60 font-bold">
                    {event.winners.map((winner, winIdx) => (
                      <li key={winIdx} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-[#3DDC84] rounded-full" />
                        {winner}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            ))}
          </div>

          <div className="mt-20 flex flex-col md:flex-row gap-10">
            <div className="flex-1 bg-[#0a0a0a] border border-white/5 p-12 rounded-[40px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3DDC84]/10 blur-3xl -mr-16 -mt-16 group-hover:bg-[#3DDC84]/20 transition-all" />
              <div className="flex items-center gap-4 mb-8">
                <Target className="w-6 h-6 text-[#3DDC84]" />
                <h4 className="text-xl font-black uppercase tracking-tighter">Strategic Evolution</h4>
              </div>
              <p className="text-sm font-bold opacity-40 leading-relaxed">
                Our ecosystem is designed for rapid iteration. We provide the infrastructure for students to build,
                test, and scale their ideas with precision and community support.
              </p>
            </div>
            <div className="flex-1 bg-[#3DDC84] p-12 rounded-[40px] text-black group overflow-hidden relative">
              <Layers className="absolute -right-10 -bottom-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-700" />
              <h4 className="text-3xl font-black uppercase tracking-tighter mb-4">Past Highlights</h4>
              <p className="text-sm font-bold opacity-80 leading-relaxed mb-8">
                Relive the intensity of our previous sessions. From coding marathons to strategic debates, we've always
                set the bar higher.
              </p>
              <button
                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:gap-4 transition-all"
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Gallery <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery / Vault ── */}
      <section id="gallery" className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-12">
          <SectionHeading number="03" subtitle="A visual journey through our most impactful milestones and community highlights.">
            The Vault
          </SectionHeading>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className={`group relative overflow-hidden rounded-[24px] bg-[#111111] aspect-square ${
                  i === 1 || i === 6 ? 'md:col-span-2 md:aspect-video' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 z-10">
                  <h5 className="text-sm font-black uppercase tracking-widest">Protocol {i}</h5>
                  <p className="text-[10px] opacity-60 font-bold">MILESTONE CAPTURED // 2024</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-12 h-12 text-[#3DDC84] opacity-5 group-hover:opacity-20 transition-opacity" />
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-5 h-5 text-[#3DDC84]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Council / Team ── */}
      <section id="team" className="py-32 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-12">
          <SectionHeading number="04" subtitle="The architects of our ecosystem. Passionate leaders committed to excellence.">
            The Council
          </SectionHeading>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {leadership.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="bg-[#111111] p-10 rounded-[32px] group hover:bg-[#3DDC84] transition-all duration-500 text-center">
                  <h4 className="font-black text-lg mb-1 group-hover:text-black uppercase tracking-tighter transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-[10px] opacity-30 font-black uppercase tracking-widest group-hover:text-black/60 transition-colors">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-center opacity-30 mb-12">
              Departmental Leads
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {teamLeads.map((member, idx) => (
                <div
                  key={idx}
                  className="p-6 border border-white/5 rounded-2xl hover:border-[#3DDC84]/40 hover:bg-white/5 transition-all text-center"
                >
                  <p className="text-xs font-black uppercase text-slate-100">{member.name}</p>
                  <p className="text-[8px] opacity-20 font-black uppercase tracking-widest mt-2">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="join" className="py-32 relative text-center">
        <div className="max-w-5xl mx-auto px-12">
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-12">
            STAY{' '}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '2px white' }}
            >
              LOCKED IN.
            </span>
          </h2>
          <p className="text-xl md:text-2xl opacity-40 font-medium mb-16 max-w-2xl mx-auto leading-relaxed">
            Ready to lead the next generation? Our applications are now open for the 2026-27 cohort at VIT Bhopal.
          </p>
          <button className="px-16 py-7 bg-[#3DDC84] text-black rounded-[24px] font-black uppercase tracking-widest text-xl hover:scale-105 active:scale-95 transition-all">
            Join the Rank
          </button>
        </div>
      </section>

      {/* ── Contact ── */}
    <Footer/>
    </div>
  );
}