import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import SectionHeader from './SectionHeader';

const SOL_LI = 'https://www.linkedin.com/company/stats-o-locked-club/';

/* ── All sector data ─────────────────────────────────────────────── */
const SECTORS = [
  {
    id: 'faculty', name: 'Faculty', shortName: 'FACULTY', icon: '🎓', accent: '#f59e0b',
    members: [{
      name: 'Dr. Jyoti Badge', role: 'Faculty Coordinator',
      subtitle: 'School of Advanced Science and Language, VIT Bhopal',
      avatar: '/pics/team/jyoti-badge.jpeg', accent: '#f59e0b', linkedin: SOL_LI,
      bio: "Dr. Jyoti Badge serves as the Faculty Coordinator of Stats-O-Locked, guiding the club with her expertise and academic leadership from the School of Advanced Science and Language at VIT Bhopal. Her mentorship and support have been instrumental in shaping the club's vision and fostering a culture of research-driven innovation.",
    }],
  },
  {
    id: 'leadership', name: 'Leadership', shortName: 'LEAD', icon: '🏛️', accent: '#00f0ff',
    members: [
      { name: 'Shivam Waghule',  role: 'President',          avatar: '/pics/team/shivam-waghule.webp',  accent: '#00f0ff', linkedin: 'https://www.linkedin.com/in/shivam-waghule-6a0763319/', bio: 'Visionary leader steering Stats-O-Locked toward excellence. Drives strategic direction, fosters a culture of innovation, and ensures the club creates meaningful impact for every member.' },
      { name: 'Shagun Gupta',    role: 'Vice President',     avatar: '/pics/team/shagun-gupta.webp',    accent: '#7c3aed', linkedin: 'https://www.linkedin.com/in/shaguna0031/', bio: 'Bridges leadership and execution across all departments. Passionate about community building and mentoring the next generation of student leaders at VIT Bhopal.' },
      { name: 'Khyati Mourya',   role: 'General Secretary',  avatar: '/pics/team/khyati-mourya.webp',   accent: '#3b82f6', linkedin: 'https://www.linkedin.com/in/khyati-mourya-01kt/', bio: 'The organizational backbone of the club. Ensures seamless coordination between departments, manages communications, and keeps every initiative running on track.' },
      { name: 'Piyush Singh',    role: 'Operations Manager', avatar: '/pics/team/piyush-singh.webp',    accent: '#10b981', linkedin: 'https://www.linkedin.com/in/piyush-kumar-singh-b53749313/', bio: 'Oversees end-to-end operations of all club activities. Expert in logistics and resource management, ensuring every event is executed flawlessly.' },
    ],
  },
  {
    id: 'technical', name: 'Technical', shortName: 'TECH', icon: '⚡', accent: '#00f0ff',
    members: [
      { name: 'Bhuvi Jain',     role: 'Technical Lead',    avatar: '/pics/team/bhuvi-jain.webp',     accent: '#00f0ff', linkedin: 'https://www.linkedin.com/in/bhuvi-jain-370733306/', bio: 'Leads the technical wing with expertise in data science and software development. Champions tech-driven solutions and guides the team in building innovative projects.' },
      { name: 'Ankit Mahadani', role: 'Technical Co-Lead', avatar: '/pics/team/ankit-mahadani.webp', accent: '#7c3aed', linkedin: 'https://www.linkedin.com/in/ankitmahadani/', bio: "Full-stack developer and co-architect of the club's digital presence. Passionate about web technologies, AI tools, and turning complex ideas into working products." },
      { name: 'Aditya Gupta',   role: 'Core Member', avatar: '/pics/team/aditya-gupta.jpg',   accent: '#00f0ff', linkedin: 'https://www.linkedin.com/in/aditya-gupta-43416934a', bio: "Contributes technical expertise to the club's digital projects, building tools and solutions that power the ecosystem." },
      { name: 'Daman Soni',     role: 'Core Member', avatar: '/pics/team/daman-soni.jpg',     accent: '#00f0ff', linkedin: 'https://www.linkedin.com/in/daman-soni-a5a712331', bio: "Supports the technical team with development skills, helping build and maintain the club's digital infrastructure." },
      { name: 'Sumit Singh Thakur', role: 'Core Member', avatar: '/pics/team/sumit-singh-thakur.png', accent: '#00f0ff', linkedin: 'https://www.linkedin.com/in/sumit-singh-thakur', bio: "Brings solid engineering skills to the technical wing, contributing to web and data projects that serve the club." },
      { name: 'Sanjana Yadav',  role: 'Core Member', avatar: '/pics/team/sanjana-yadav.jpg',  accent: '#00f0ff', linkedin: 'https://www.linkedin.com/in/sanjana-yadav-18326b38a', bio: "A technically versatile contributor who helps develop and maintain the club's digital tools and platforms." },
      { name: 'Sankil Sudrik',  role: 'Core Member', avatar: '/pics/team/sankil-sudrik.png',  accent: '#00f0ff', linkedin: 'https://www.linkedin.com/in/sankil-sudrik-a3628636a', bio: "Contributes to the technical team with programming skill and problem-solving acumen, driving quality in every project." },
      { name: 'Aditya Singh',   role: 'Core Member', avatar: '/pics/team/aditya-singh.jpg',  accent: '#00f0ff', linkedin: 'https://www.linkedin.com/in/aditya-singh-3b0699407', bio: "Supports the technical wing with development expertise, helping build solutions that power the club's initiatives." },
      { name: 'Aadi Jain',      role: 'Core Member', avatar: '/pics/team/aadi-jain.jpg',      accent: '#00f0ff', linkedin: 'https://www.linkedin.com/in/aadi-jain-14872a354/', bio: "Contributes clean, effective code to the team's projects, passionate about building impactful technical solutions." },
      { name: 'Supriya Yelgunde', role: 'Core Member', avatar: '/pics/team/supriya-yelgunde.jpg', accent: '#00f0ff', linkedin: 'https://www.linkedin.com/in/supriya-yelgunde-771311303', bio: "Brings technical skill and initiative to the team, supporting development efforts across the club's digital projects." },
      { name: 'Prathmesh Jadhav', role: 'Core Member', avatar: '/pics/team/prathmesh-jadhav.jpg', accent: '#00f0ff', linkedin: 'https://www.linkedin.com/in/prathmesh-jadhav-2b62202a5/', bio: "Contributes robust solutions to the technical team, with a focus on quality and collaborative development." },
      { name: 'Divyam Gulgulia', role: 'Core Member', avatar: '/pics/team/divyam-gulgulia.jpg', accent: '#00f0ff', linkedin: 'https://www.linkedin.com/in/divyam-gulgulia-1806-kabira', bio: "A creative technologist who brings both engineering skills and fresh thinking to the club's technical projects." },
      { name: 'Mishthi Jaiswal', role: 'Core Member', avatar: '/pics/team/mishthi-jaiswal.jpg', accent: '#00f0ff', linkedin: 'https://www.linkedin.com/in/mishthijaiswal/', bio: "Contributes technical depth and attention to detail to the team's projects, helping deliver polished digital experiences." },
    ],
  },
  {
    id: 'events', name: 'Events', shortName: 'EVENTS', icon: '🎪', accent: '#f59e0b',
    members: [
      { name: 'Yug Wankhede',    role: 'Event Lead',    avatar: '/pics/team/yug-wankhede.webp',    accent: '#f59e0b', linkedin: 'https://www.linkedin.com/in/yug-wankhede-166930307/', bio: 'Master of ceremonies and event architect. Conceptualises and executes high-energy events like TechCorp Summit and Techila Unplugged from the ground up.' },
      { name: 'Sampada Seth',    role: 'Event Co-Lead', avatar: '/pics/team/sampada-seth.webp',    accent: '#10b981', linkedin: 'https://www.linkedin.com/in/sampada-seth-a77969324/', bio: 'Detail-oriented co-lead who ensures every event element — from scheduling to participant experience — is perfectly polished and memorable.' },
      { name: 'Kashika Agrawal', role: 'Event Co-Lead', avatar: '/pics/team/kashika-agrawal.webp', accent: '#818cf8', linkedin: 'https://www.linkedin.com/in/kashika-agrawal-1a2601339/', bio: 'Brings creative energy and strong coordination skills to every event. Manages registrations, volunteer teams, and on-ground logistics with precision.' },
      { name: 'Harshit Tyagi',      role: 'Core Member', avatar: '/pics/team/harshit-tyagi.png',      accent: '#f59e0b', linkedin: 'https://www.linkedin.com/in/harshit-tyagi-17a089331', bio: 'Supports the planning and execution of club events, contributing to logistics and on-ground coordination.' },
      { name: 'Stuti Jain',         role: 'Core Member', avatar: '/pics/team/stuti-jain.png',         accent: '#f59e0b', linkedin: 'https://www.linkedin.com/in/stuti-jain-552515385', bio: 'Brings meticulous attention to detail to every event, ensuring seamless execution and a great experience for attendees.' },
      { name: 'Yuvraj Narode',      role: 'Core Member', avatar: '/pics/team/yuvraj-narode.jpg',      accent: '#f59e0b', linkedin: 'https://www.linkedin.com/in/yuvraj-narode-a83b0737b', bio: 'Manages event logistics and coordination, helping turn ambitious event concepts into memorable realities.' },
      { name: 'Pahul Kaur',         role: 'Core Member', avatar: '/pics/team/pahul-kaur.jpg',          accent: '#f59e0b', linkedin: 'https://www.linkedin.com/in/pahul-kaur-bhatia-b2998239b', bio: 'Contributes to event planning and participant management, ensuring smooth operations from start to finish.' },
      { name: 'Anant Tripathi',     role: 'Core Member', avatar: '/pics/team/anant-tripathi.jpg',     accent: '#f59e0b', linkedin: 'https://www.linkedin.com/in/anant-tripathi-4a25b7370', bio: 'Plays a key role in event planning and execution, supporting the team with energy and organisational skill.' },
      { name: 'Rutuja Kharode',     role: 'Core Member', avatar: '/pics/team/rutuja-kharode.webp',    accent: '#f59e0b', linkedin: 'https://www.linkedin.com/in/rutuja-kharode', bio: 'Helps coordinate club events with dedication, ensuring every detail is handled with care and precision.' },
      { name: 'Aritra Dasgupta',    role: 'Core Member', avatar: '/pics/team/aritra-dasgupta.jpg',    accent: '#f59e0b', linkedin: 'https://www.linkedin.com/in/aritra-dasgupta-311868324', bio: "Brings enthusiasm and reliability to event management, contributing to the club's growing portfolio of successful events." },
      { name: 'Adwita Shrivastava', role: 'Core Member', avatar: '/pics/team/adwita-shrivastava.jpg', accent: '#f59e0b', linkedin: 'https://www.linkedin.com/in/adwita-shrivastava-9389973b0', bio: "Supports the events team with strong organisational skills and a commitment to creating impactful club experiences." },
    ],
  },
  {
    id: 'creative', name: 'Creative', shortName: 'CRTV', icon: '🎨', accent: '#ff4d94',
    members: [
      { name: 'Payal Beura',      role: 'Creative Lead',    avatar: '/pics/team/payal-beura.webp',      accent: '#ff4d94', linkedin: 'https://www.linkedin.com/in/payal-beura-85410b309/', bio: "The creative force behind the club's visual identity. Designs stunning graphics, branding assets, and campaigns that make Stats-O-Locked stand out on campus." },
      { name: 'Shubhankar Kumar', role: 'Creative Co-Lead', avatar: '/pics/team/shubhankar-kumar.webp', accent: '#f59e0b', linkedin: 'https://www.linkedin.com/in/shubhankar-kumar-84987a33b/', bio: "Motion designer and visual storyteller. Crafts engaging content that communicates the club's energy and achievements across all platforms." },
      { name: 'Devyani Hemraj Bidve', role: 'Core Member', avatar: '/pics/team/devyani-hemraj-bidve.jpg', accent: '#ff4d94', linkedin: 'https://www.linkedin.com/in/devyani-bidve-126944380', bio: "Brings artistic talent to the Creative team, designing visual assets and campaign materials that define the club's brand identity." },
      { name: 'Achal Ghate',         role: 'Core Member', avatar: '/pics/team/achal-ghate.jpg',         accent: '#ff4d94', linkedin: 'https://www.linkedin.com/in/achal-ghate-6a77723a1', bio: "Contributes creative designs and visual storytelling that amplify the club's presence and campaigns." },
      { name: 'Nikhilesh Sarode',    role: 'Core Member', avatar: '/pics/team/nikhilesh-sarode.jpg',    accent: '#ff4d94', linkedin: 'https://www.linkedin.com/in/nikhilesh-sarode/', bio: "Designs compelling graphics and creative content that capture the spirit of Stats-O-Locked's events and initiatives." },
      { name: 'Suvradeep Datta',     role: 'Core Member', avatar: '/pics/team/suvradeep-datta.png',     accent: '#ff4d94', linkedin: 'https://www.linkedin.com/in/suvradeep-datta-804608318', bio: "A creative contributor who brings fresh ideas and polished visuals to the team's design output." },
      { name: 'Ameeshi Khare',       role: 'Core Member', avatar: '/pics/team/ameeshi-khare.jpg',       accent: '#ff4d94', linkedin: 'https://www.linkedin.com/in/ameeshi-khare-42262037a', bio: "Adds creative energy and design skill to the team, helping craft visuals that resonate with the club's audience." },
    ],
  },
  {
    id: 'editing', name: 'Editing', shortName: 'EDIT', icon: '🎬', accent: '#f43f5e',
    members: [
      { name: 'Vansh Chauhan', role: 'Editing Lead',    avatar: '/pics/team/vansh-chauhan.webp', accent: '#f43f5e', linkedin: 'https://www.linkedin.com/in/vansh-chauhan-270005385/', bio: "Creative editor and visual storyteller leading the editing wing of Stats-O-Locked. Brings a sharp eye for detail and a passion for producing high-quality content that captures the club's energy." },
      { name: 'Amber Sharma',  role: 'Editing Co-Lead', avatar: '/pics/team/amber-sharma.jpg',   accent: '#f43f5e', linkedin: 'https://www.linkedin.com/in/amber-sharma-a9b862391', bio: 'Video editor and content curator with a sharp eye for storytelling. Transforms raw footage and ideas into polished, share-worthy content for the club.' },
    ],
  },
  {
    id: 'photography', name: 'Photography', shortName: 'PHOTO', icon: '📷', accent: '#a78bfa',
    members: [
      { name: 'Naina Jha',      role: 'Core Member', avatar: '/pics/team/naina-jha.jpg',      accent: '#a78bfa', linkedin: 'https://www.linkedin.com/in/naina-jha-9b2824366/', bio: "Captures the energy and essence of club activities through the lens, building a visual archive of every memorable moment." },
      { name: 'Avantika Singh', role: 'Core Member', avatar: '/pics/team/avantika-singh.jpg', accent: '#a78bfa', linkedin: 'https://www.linkedin.com/in/avantika-singh-006466395', bio: "Documents the club's journey with creative photography, preserving the highlights of every event and initiative." },
    ],
  },
  {
    id: 'research', name: 'Research', shortName: 'RSCH', icon: '🔬', accent: '#3b82f6',
    members: [
      { name: 'Shivanya Tomar', role: 'Research Lead',    avatar: '/pics/team/shivanya-tomar.webp', accent: '#3b82f6', linkedin: 'https://www.linkedin.com/in/shivanya-tomar-15145a324/', bio: "Drives the club's intellectual agenda. Leads research initiatives in AI, data analytics, and emerging tech, turning insights into actionable learning for members." },
      { name: 'Murtaza Ansari', role: 'Research Co-Lead', avatar: '/pics/team/murtaza-ansari.webp', accent: '#059669', linkedin: 'https://www.linkedin.com/in/murtaza-ansari-72318b327/', bio: 'Data enthusiast and research collaborator. Explores cutting-edge topics, compiles findings, and produces knowledge resources for the community.' },
      { name: 'Kanak Sachdeva',      role: 'Core Member', avatar: '/pics/team/kanak-sachdeva.jpg',      accent: '#3b82f6', linkedin: 'https://www.linkedin.com/in/kanak-sachdeva-704606369', bio: "Contributes to the club's research initiatives, exploring data-driven insights and emerging analytical methods." },
      { name: 'Tiya Mehta',          role: 'Core Member', avatar: '/pics/team/tiya-mehta.jpg',          accent: '#3b82f6', linkedin: 'https://www.linkedin.com/in/tiya-mehta-6199ab327', bio: "Dives deep into research topics, synthesising findings that drive the club's knowledge-sharing agenda." },
      { name: 'Devansh Rathore',     role: 'Core Member', avatar: '/pics/team/devansh-rathore.png',     accent: '#3b82f6', linkedin: 'https://www.linkedin.com/in/devanshrathore025', bio: 'Explores cutting-edge topics in data science and analytics, contributing fresh perspectives to the research wing.' },
      { name: 'Pranav Sunil Pawar',  role: 'Core Member', avatar: '/pics/team/pranav-sunil-pawar.jpg',  accent: '#3b82f6', linkedin: 'https://www.linkedin.com/in/pranav-pawar-036650391', bio: 'Supports the research team with thorough analysis and a curiosity-driven approach to learning and discovery.' },
      { name: 'Anjali Sonkar',       role: 'Core Member', avatar: '/pics/team/anjali-sonkar.jpg',       accent: '#3b82f6', linkedin: 'https://www.linkedin.com/in/anjali-sonkar-021339379', bio: 'Brings analytical rigour to the research team, helping translate complex data into actionable insights.' },
      { name: 'Rajnandini Alabatte', role: 'Core Member', avatar: '/pics/team/rajnandini-alabatte.jpg', accent: '#3b82f6', linkedin: 'https://www.linkedin.com/in/rajnandini-alabatte-a6079b383', bio: "Contributes thoughtful research and investigative curiosity, enriching the club's intellectual output." },
    ],
  },
  {
    id: 'social', name: 'Social Media', shortName: 'SOC', icon: '📱', accent: '#e1306c',
    members: [
      { name: 'Mohammad Hamza', role: 'Social Media Lead',    avatar: '/pics/team/mohammad-hamza.webp', accent: '#e1306c', linkedin: 'https://www.linkedin.com/in/mohammad-hamza-ba051a316/', bio: "The voice of Stats-O-Locked online. Manages all social channels with compelling content strategy, growing the club's digital footprint and keeping the community engaged." },
      { name: 'Shamique Khan',  role: 'Social Media Co-Lead', avatar: '/pics/team/shamique-khan.png',   accent: '#c13584', linkedin: 'https://www.linkedin.com/in/shamique-khan/', bio: "Co-leads the social media wing with a sharp eye for engaging content and digital trends. Helps craft and amplify Stats-O-Locked's online presence across all platforms." },
      { name: 'Sananda Bhowmik', role: 'Core Member', avatar: '/pics/team/sananda-bhowmik.png', accent: '#e1306c', linkedin: 'https://www.linkedin.com/in/sananda-bhowmik-0b102337a', bio: "Helps craft and schedule engaging content, supporting the club's digital presence across social platforms." },
      { name: 'Ayush Arora',     role: 'Core Member', avatar: '/pics/team/ayush-arora.jpg',     accent: '#e1306c', linkedin: 'https://www.linkedin.com/in/ayush-arora-9b728137a', bio: "Creates compelling social content and engages with the community, helping grow Stats-O-Locked's online audience." },
    ],
  },
  {
    id: 'pr', name: 'PR & Outreach', shortName: 'PR', icon: '🤝', accent: '#7c3aed',
    members: [
      { name: 'Sankalp Bhawsar', role: 'PR Lead',    avatar: '/pics/team/sankalp-bhawsar.webp', accent: '#7c3aed', linkedin: 'https://www.linkedin.com/in/sankalp-bhawsar-73434b313/', bio: "Builds and nurtures relationships beyond campus. Leads outreach to industry partners, sponsors, and collaborators, expanding the club's reach and opportunities." },
      { name: 'Priyanshi Vyas',  role: 'PR Co-Lead', avatar: '/pics/team/priyanshi-vyas.webp',  accent: '#c084fc', linkedin: 'https://www.linkedin.com/in/priyanshi-vyas-564310331', bio: "Crafts compelling narratives about the club's work and facilitates partnerships. Passionate about communication, networking, and building the SOL brand." },
      { name: 'Supriya Yadav',   role: 'Core Member', avatar: '/pics/team/supriya-yadav.jpg',   accent: '#7c3aed', linkedin: 'https://www.linkedin.com/in/supriya-yadav-30638a384', bio: "Supports the PR & Outreach team in building relationships and expanding the club's network and visibility." },
      { name: 'Suyash Jain',     role: 'Core Member', avatar: '/pics/team/suyash-jain.jpg',     accent: '#7c3aed', linkedin: 'https://www.linkedin.com/in/suyash-jain-2a72b0393', bio: 'Contributes to outreach efforts, forging connections that bring new opportunities and collaborators to the club.' },
      { name: 'Niveditha P',     role: 'Core Member', avatar: '/pics/team/niveditha-p.jpg',     accent: '#7c3aed', linkedin: 'https://www.linkedin.com/in/niveditha-praveen-6bb63932a', bio: "Helps craft and deliver the club's messaging, strengthening its presence in the campus and professional community." },
      { name: 'Rajshekhar Rai',  role: 'Core Member', avatar: '/pics/team/rajshekhar-rai.jpg',  accent: '#7c3aed', linkedin: 'https://www.linkedin.com/in/rajshekhar-rai-793b52309', bio: "Builds and nurtures partnerships, supporting the club's mission to grow its external reach and impact." },
      { name: 'Gauri Srivastava', role: 'Core Member', avatar: '/pics/team/gauri-srivastava.jpg', accent: '#7c3aed', linkedin: 'https://www.linkedin.com/in/gauri-srivastava-1026883b0', bio: "Contributes to communications and relationship-building, helping tell the Stats-O-Locked story to a wider audience." },
      { name: 'Aditya Sharma',   role: 'Core Member', avatar: '/pics/team/aditya-sharma.jpg',   accent: '#7c3aed', linkedin: 'https://www.linkedin.com/in/aditya-sharma-845876399', bio: "Supports outreach initiatives with strong communication skills and a passion for growing the club's network." },
    ],
  },
];

/* ════════════════════════════════════════════════════════════════
   GLITCH TEXT — letters scramble then decode when text changes
════════════════════════════════════════════════════════════════ */
const GLITCH = '▓░█▀▄▌▐╔╗╚╝═║▒╠╣0123456789ABCDEF#@$%';

function GlitchText({ text, style }) {
  const [out, setOut] = useState(text);
  const prev = useRef(text);

  useEffect(() => {
    if (text === prev.current) return;
    prev.current = text;
    let step = 0;
    const total = 16;
    const id = setInterval(() => {
      step++;
      const reveal = Math.floor((step / total) * text.length);
      setOut(text.split('').map((ch, i) =>
        i < reveal || ch === ' ' ? ch : GLITCH[Math.floor(Math.random() * GLITCH.length)]
      ).join(''));
      if (step >= total) { setOut(text); clearInterval(id); }
    }, 22);
    return () => clearInterval(id);
  }, [text]);

  return <span style={style}>{out}</span>;
}

/* ════════════════════════════════════════════════════════════════
   PHOTO CARD — big portrait, grayscale→colour on hover
════════════════════════════════════════════════════════════════ */
function PhotoCard({ member, onClick, large = false }) {
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const initials = member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(member)}
      whileHover={{ y: -10, transition: { duration: 0.2, ease: 'easeOut' } }}
      whileTap={{ scale: 0.97 }}
      style={{
        width: '100%', borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
        background: '#040e1c',
        border: `1px solid ${hovered ? member.accent + '70' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered ? `0 28px 64px ${member.accent}30, 0 0 0 1px ${member.accent}18` : '0 4px 24px rgba(0,0,0,0.55)',
        transition: 'border-color 0.35s, box-shadow 0.35s',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: large ? '3/4' : '4/5', overflow: 'hidden' }}>
        {member.avatar && !imgErr ? (
          <img
            src={member.avatar} alt={member.name} loading="lazy"
            onError={() => setImgErr(true)}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              objectPosition: 'top center', display: 'block',
              filter: hovered ? 'grayscale(0) brightness(1.04) saturate(1.1)' : 'grayscale(1) brightness(0.62) contrast(1.1)',
              transition: 'filter 0.65s ease, transform 0.65s ease',
              transform: hovered ? 'scale(1.07)' : 'scale(1)',
            }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: `linear-gradient(145deg,${member.accent}20,#040e1c)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: large ? '3.5rem' : '2.5rem', fontWeight: 800, color: member.accent,
          }}>{initials}</div>
        )}
        {/* Duotone overlay (disappears on hover) */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(150deg,rgba(0,240,255,0.14) 0%,rgba(124,58,237,0.12) 100%)',
          mixBlendMode: 'color',
          opacity: hovered ? 0 : 1, transition: 'opacity 0.6s',
        }} />
        {/* Scan-lines */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)',
          opacity: hovered ? 0 : 0.6, transition: 'opacity 0.55s',
        }} />
        {/* Bottom scrim */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '65%', pointerEvents: 'none',
          background: 'linear-gradient(to top,rgba(4,14,28,0.98) 0%,rgba(4,14,28,0.55) 45%,transparent 100%)',
        }} />
        {/* Top accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2, pointerEvents: 'none',
          background: `linear-gradient(90deg,transparent,${member.accent},transparent)`,
          opacity: hovered ? 1 : 0.3, transition: 'opacity 0.35s',
        }} />
        {/* VIEW badge */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -6 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute', top: 12, right: 12, pointerEvents: 'none',
            background: 'rgba(4,14,28,0.88)', border: `1px solid ${member.accent}70`,
            borderRadius: 6, padding: '3px 10px',
            fontSize: '0.58rem', fontWeight: 700, color: member.accent,
            fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1.8px',
            backdropFilter: 'blur(8px)',
          }}>VIEW</motion.div>
        {/* Name/role at bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 14px 14px', pointerEvents: 'none' }}>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: large ? '1rem' : '0.87rem', fontWeight: 700, color: '#fff', marginBottom: 3, lineHeight: 1.2, textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}>{member.name}</div>
          <div style={{ fontSize: large ? '0.7rem' : '0.62rem', fontWeight: 600, color: member.accent, fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '0.8px', textTransform: 'uppercase' }}>{member.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTOR SWITCH — one row in the left console panel
════════════════════════════════════════════════════════════════ */
function SectorSwitch({ sector, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      style={{
        width: '100%', height: 54, padding: '0 18px',
        display: 'flex', alignItems: 'center', gap: 12,
        background: isActive ? `${sector.accent}0d` : 'transparent',
        border: 'none',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        cursor: 'pointer', textAlign: 'left', position: 'relative', overflow: 'hidden',
        transition: 'background 0.25s',
      }}
      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; }}
      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
    >
      {/* Active left-edge bar */}
      <motion.div
        animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
          background: sector.accent, transformOrigin: 'center',
        }}
      />

      {/* LED */}
      <div style={{ position: 'relative', width: 10, height: 10, flexShrink: 0 }}>
        {isActive && (
          <motion.div
            animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', inset: -3, borderRadius: '50%',
              background: sector.accent,
            }}
          />
        )}
        <div style={{
          width: 10, height: 10, borderRadius: '50%', position: 'relative', zIndex: 1,
          background: isActive ? sector.accent : 'rgba(255,255,255,0.14)',
          boxShadow: isActive ? `0 0 8px ${sector.accent}` : 'none',
          transition: 'background 0.25s, box-shadow 0.25s',
        }} />
      </div>

      {/* Icon */}
      <span style={{ fontSize: '1rem', lineHeight: 1, flexShrink: 0 }}>{sector.icon}</span>

      {/* Name */}
      <span style={{
        flex: 1, fontFamily: "'Space Grotesk',sans-serif",
        fontSize: '0.75rem', fontWeight: isActive ? 700 : 500,
        color: isActive ? sector.accent : 'rgba(255,255,255,0.45)',
        letterSpacing: '1.5px', textTransform: 'uppercase',
        transition: 'color 0.25s',
      }}>{sector.name}</span>

      {/* Right: count + LIVE badge */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, flexShrink: 0 }}>
        <span style={{
          fontSize: '0.58rem', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, letterSpacing: '0.5px',
          color: isActive ? sector.accent : 'rgba(255,255,255,0.2)',
        }}>{sector.members.length} MBR</span>
        <AnimatePresence>
          {isActive && (
            <motion.span
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
              style={{
                fontSize: '0.48rem', fontFamily: "'Space Grotesk',sans-serif",
                fontWeight: 700, letterSpacing: '1px', color: sector.accent,
              }}>◉ LIVE</motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

/* ════════════════════════════════════════════════════════════════
   MOBILE TAB — compact pill for horizontal scroll strip
════════════════════════════════════════════════════════════════ */
function MobileTab({ sector, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      style={{
        flexShrink: 0, padding: '7px 14px',
        display: 'flex', alignItems: 'center', gap: 6,
        background: isActive ? `${sector.accent}18` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${isActive ? sector.accent + '55' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 8, cursor: 'pointer',
        boxShadow: isActive ? `0 0 14px ${sector.accent}28` : 'none',
        transition: 'all 0.22s',
      }}
    >
      <span style={{ fontSize: '0.9rem' }}>{sector.icon}</span>
      <span style={{
        fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.7rem', fontWeight: 700,
        color: isActive ? sector.accent : 'rgba(255,255,255,0.42)',
        letterSpacing: '1px', textTransform: 'uppercase', whiteSpace: 'nowrap',
        transition: 'color 0.22s',
      }}>{sector.shortName}</span>
      {isActive && (
        <motion.div
          animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{ width: 5, height: 5, borderRadius: '50%', background: sector.accent, flexShrink: 0 }}
        />
      )}
    </motion.button>
  );
}

/* ════════════════════════════════════════════════════════════════
   MEMBER MODAL
════════════════════════════════════════════════════════════════ */
function MemberModal({ member, onClose }) {
  const [imgErr, setImgErr] = useState(false);
  const initials = member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(2,6,16,0.93)', backdropFilter: 'blur(28px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      }}
    >
      <motion.div
        initial={{ scale: 0.82, opacity: 0, y: 36 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.82, opacity: 0, y: 36 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 390, position: 'relative',
          background: 'linear-gradient(160deg, #07111f 0%, #030c18 100%)',
          border: `1px solid ${member.accent}38`,
          borderRadius: 20, overflow: 'hidden',
          boxShadow: `0 0 0 1px ${member.accent}10, 0 0 80px ${member.accent}22, 0 48px 96px rgba(0,0,0,0.88)`,
        }}
      >
        {/* Animated top accent bar */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2, zIndex: 10,
            background: `linear-gradient(90deg, transparent, ${member.accent}, ${member.accent}80, transparent)`,
            transformOrigin: 'left',
          }}
        />

        {/* Pulsing border glow */}
        <motion.div
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: -1, borderRadius: 21, zIndex: 0, pointerEvents: 'none',
            boxShadow: `0 0 32px ${member.accent}28, inset 0 0 32px ${member.accent}08`,
          }}
        />

        {/* Corner brackets — animated in */}
        {[
          { top:10, left:10,  borderTop:`2px solid ${member.accent}`, borderLeft:`2px solid ${member.accent}`,  borderRadius:'2px 0 0 0' },
          { top:10, right:10, borderTop:`2px solid ${member.accent}`, borderRight:`2px solid ${member.accent}`, borderRadius:'0 2px 0 0' },
          { bottom:10, left:10,  borderBottom:`2px solid ${member.accent}`, borderLeft:`2px solid ${member.accent}`,  borderRadius:'0 0 0 2px' },
          { bottom:10, right:10, borderBottom:`2px solid ${member.accent}`, borderRight:`2px solid ${member.accent}`, borderRadius:'0 0 2px 0' },
        ].map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12 + i * 0.06, duration: 0.28, ease: 'backOut' }}
            style={{ position:'absolute', width:14, height:14, zIndex:10, pointerEvents:'none', ...s }}
          />
        ))}

        {/* Photo section */}
        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
          {member.avatar && !imgErr ? (
            <img src={member.avatar} alt={member.name} loading="lazy" onError={() => setImgErr(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: `linear-gradient(145deg, ${member.accent}28, #030c18)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '4rem', fontWeight: 800, color: member.accent, fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '4px',
            }}>{initials}</div>
          )}
          {/* Scanlines */}
          <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 4px)', pointerEvents:'none', opacity:0.6 }} />
          {/* Bottom gradient */}
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'70%', background:'linear-gradient(to top, #030c18 0%, rgba(3,12,24,0.7) 40%, transparent 100%)', pointerEvents:'none' }} />
          {/* Side vignette */}
          <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at center, transparent 50%, rgba(3,12,24,0.55) 100%)`, pointerEvents:'none' }} />

          {/* AGENT PROFILE badge */}
          <div style={{
            position:'absolute', top:18, left:18, zIndex:5,
            display:'flex', alignItems:'center', gap:6,
            background:'rgba(3,10,22,0.78)', border:`1px solid ${member.accent}35`,
            borderRadius:6, padding:'4px 10px', backdropFilter:'blur(10px)',
          }}>
            <motion.div animate={{ opacity:[1,0.25,1] }} transition={{ duration:1.3, repeat:Infinity }}
              style={{ width:5, height:5, borderRadius:'50%', background:member.accent, boxShadow:`0 0 6px ${member.accent}` }} />
            <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.48rem', fontWeight:700, color:member.accent, letterSpacing:'2.5px' }}>AGENT PROFILE</span>
          </div>

          {/* Name + role overlaid on photo bottom */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.4, ease: 'easeOut' }}
            style={{ position:'absolute', bottom:0, left:0, right:0, padding:'0 20px 18px' }}>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'1.5rem', fontWeight:800, color:'#fff', margin:'0 0 7px', lineHeight:1.1, textShadow:'0 2px 16px rgba(0,0,0,0.95)' }}>{member.name}</h2>
            <span style={{
              display:'inline-flex', alignItems:'center', gap:5,
              fontSize:'0.65rem', fontWeight:700, color:member.accent,
              background:`${member.accent}18`, border:`1px solid ${member.accent}38`,
              padding:'3px 12px', borderRadius:999,
              fontFamily:"'Space Grotesk',sans-serif", letterSpacing:'1.2px', textTransform:'uppercase',
            }}>{member.role}</span>
          </motion.div>
        </motion.div>

        {/* Info section */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.38, ease: 'easeOut' }}
          style={{ padding:'14px 20px 20px' }}>
          {member.subtitle && (
            <p style={{ fontSize:'0.71rem', color:'rgba(255,255,255,0.36)', fontFamily:"'Inter',sans-serif", fontStyle:'italic', marginBottom:10, textAlign:'center' }}>{member.subtitle}</p>
          )}

          {/* Accent divider */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.38, duration: 0.45, ease: 'easeOut' }}
            style={{ height:1, background:`linear-gradient(90deg, transparent, ${member.accent}35, transparent)`, marginBottom:13, transformOrigin:'left' }}
          />

          <p style={{ color:'rgba(255,255,255,0.62)', fontSize:'0.85rem', lineHeight:1.75, fontFamily:"'Inter',sans-serif", margin:'0 0 16px' }}>{member.bio}</p>

          {/* LinkedIn — full-width */}
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
            style={{
              display:'flex', alignItems:'center', justifyContent:'center', gap:8,
              padding:'11px 0', borderRadius:10, textDecoration:'none',
              background:`linear-gradient(135deg, ${member.accent}1a, ${member.accent}0d)`,
              border:`1px solid ${member.accent}40`,
              color:member.accent, fontFamily:"'Space Grotesk',sans-serif",
              fontSize:'0.77rem', fontWeight:700, letterSpacing:'1.8px', textTransform:'uppercase',
              boxShadow:`0 0 24px ${member.accent}10`, transition:'all 0.22s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background=`linear-gradient(135deg, ${member.accent}32, ${member.accent}1a)`; e.currentTarget.style.boxShadow=`0 0 32px ${member.accent}30`; e.currentTarget.style.borderColor=`${member.accent}70`; }}
            onMouseLeave={e => { e.currentTarget.style.background=`linear-gradient(135deg, ${member.accent}1a, ${member.accent}0d)`; e.currentTarget.style.boxShadow=`0 0 24px ${member.accent}10`; e.currentTarget.style.borderColor=`${member.accent}40`; }}>
            <ExternalLink size={13} /> View LinkedIn Profile
          </a>
        </motion.div>

        {/* Close button */}
        <button onClick={onClose}
          style={{
            position:'absolute', top:12, right:12, zIndex:20,
            background:'rgba(3,10,22,0.8)', border:`1px solid ${member.accent}28`,
            borderRadius:'50%', width:30, height:30, cursor:'pointer',
            color:'rgba(255,255,255,0.55)', display:'flex', alignItems:'center', justifyContent:'center',
            backdropFilter:'blur(10px)', transition:'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor=member.accent; e.currentTarget.style.color=member.accent; e.currentTarget.style.boxShadow=`0 0 12px ${member.accent}40`; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor=`${member.accent}28`; e.currentTarget.style.color='rgba(255,255,255,0.55)'; e.currentTarget.style.boxShadow='none'; }}>
          <X size={12} />
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   RESPONSIVE HOOK
════════════════════════════════════════════════════════════════ */
function useIsMobile() {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return m;
}

/* ════════════════════════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════════════════════════ */
export default function TeamSection() {
  const isMobile = useIsMobile();
  const [activeId, setActiveId]     = useState('faculty');
  const [incomingId, setIncomingId] = useState(null);
  const [sweeping, setSweeping]     = useState(false);
  const [selected, setSelected]     = useState(null);
  const sweepingRef = useRef(false);

  const activeSector   = SECTORS.find(s => s.id === activeId) ?? SECTORS[0];
  const incomingSector = incomingId ? SECTORS.find(s => s.id === incomingId) : null;
  const sweepColor     = incomingSector ? incomingSector.accent : activeSector.accent;

  const switchSector = (id) => {
    if (id === activeId || sweepingRef.current) return;
    sweepingRef.current = true;
    setIncomingId(id);
    setSweeping(true);
    setTimeout(() => {
      setActiveId(id);
      setIncomingId(null);
      setSweeping(false);
      sweepingRef.current = false;
    }, 360);
  };

  /* Arrow key navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (selected) return;
      const idx = SECTORS.findIndex(s => s.id === activeId);
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight')
        switchSector(SECTORS[(idx + 1) % SECTORS.length].id);
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft')
        switchSector(SECTORS[(idx - 1 + SECTORS.length) % SECTORS.length].id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeId, selected]);

  /* ── Member grid (shared between mobile + desktop) ── */
  const MemberGrid = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(min(${activeSector.members.length === 1 ? '260px' : '155px'}, 100%), 1fr))`,
          gap: 14,
        }}
      >
        {activeSector.members.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
          >
            <PhotoCard
              member={member}
              onClick={setSelected}
              large={activeSector.id === 'leadership' || activeSector.members.length === 1}
            />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <section id="team" style={{ padding: 'clamp(80px,10vw,120px) 0 clamp(60px,8vw,100px)', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 600, background: 'radial-gradient(ellipse,rgba(124,58,237,0.05) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }} />

      <div className="px-4 sm:px-6 md:px-10" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeader
          badge="Meet the Team"
          title={<>The Minds Behind{' '}<span className="gradient-text-cyan">Stats-O-Locked</span></>}
          subtitle="Our club is led by a passionate and dedicated team committed to growth, innovation, and excellence."
        />

        {isMobile ? (
          /* ════ MOBILE LAYOUT ════ */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Tab strip */}
            <div style={{ overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
              <div style={{ display: 'flex', gap: 8, width: 'max-content', padding: '2px 2px 4px' }}>
                {SECTORS.map(s => (
                  <MobileTab key={s.id} sector={s} isActive={s.id === activeId} onClick={() => switchSector(s.id)} />
                ))}
              </div>
            </div>

            {/* Compact display header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 16px',
              background: '#040d18',
              border: `1px solid ${activeSector.accent}28`,
              borderRadius: 10,
              transition: 'border-color 0.4s',
            }}>
              <span style={{ fontSize: '1.1rem' }}>{activeSector.icon}</span>
              <div style={{ flex: 1 }}>
                <GlitchText
                  text={activeSector.name.toUpperCase()}
                  style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.85rem', fontWeight: 800, color: activeSector.accent, letterSpacing: '2px' }}
                />
              </div>
              <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: activeSector.accent }} />
              <span style={{ fontSize: '0.58rem', fontFamily: "'Space Grotesk',sans-serif", color: activeSector.accent, fontWeight: 700, letterSpacing: '2px' }}>LIVE</span>
              <div style={{ padding: '2px 8px', background: `${activeSector.accent}15`, border: `1px solid ${activeSector.accent}30`, borderRadius: 4, fontSize: '0.6rem', fontWeight: 700, color: activeSector.accent, fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1px' }}>
                {activeSector.members.length} AGENTS
              </div>
            </div>

            {/* Content */}
            <div style={{ position: 'relative' }}>
              <MemberGrid />
              <AnimatePresence>
                {sweeping && (
                  <motion.div key="sweep"
                    initial={{ x: '-100%' }} animate={{ x: '200%' }}
                    transition={{ duration: 0.36, ease: 'easeInOut' }}
                    style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10, background: `linear-gradient(90deg,transparent 0%,${sweepColor}50 40%,${sweepColor}80 50%,${sweepColor}50 60%,transparent 100%)` }}
                  />
                )}
              </AnimatePresence>
            </div>

            <p style={{ textAlign: 'center', fontSize: '0.62rem', color: 'rgba(255,255,255,0.25)', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '2px' }}>
              SWIPE TABS · TAP CARD TO VIEW PROFILE
            </p>
          </div>
        ) : (
          /* ════ DESKTOP CONSOLE LAYOUT ════ */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div style={{
              display: 'flex', gap: 0,
              height: 580,
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 20, overflow: 'hidden',
              background: '#030c17',
              boxShadow: `0 32px 96px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)`,
            }}>

              {/* ── LEFT PANEL ── */}
              <div style={{
                width: 248, flexShrink: 0,
                display: 'flex', flexDirection: 'column',
                background: 'linear-gradient(180deg,#040d1a,#030c16)',
                borderRight: '1px solid rgba(255,255,255,0.06)',
              }}>
                {/* Panel header */}
                <div style={{
                  padding: '14px 18px 12px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {['#f43f5e','#f59e0b','#22c55e'].map(c => (
                      <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.7 }} />
                    ))}
                  </div>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.58rem', fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '2.5px', textTransform: 'uppercase' }}>SECTOR SELECT</span>
                </div>

                {/* Sector rows */}
                <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent' }}>
                  {SECTORS.map(s => (
                    <SectorSwitch key={s.id} sector={s} isActive={s.id === activeId} onClick={() => switchSector(s.id)} />
                  ))}
                </div>

                {/* Panel footer */}
                <div style={{
                  padding: '10px 18px',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.5rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '1.5px' }}>SOL · HQ CONSOLE</span>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.5rem', color: 'rgba(255,255,255,0.15)', letterSpacing: '1px' }}>v2025</span>
                </div>
              </div>

              {/* ── MAIN DISPLAY ── */}
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', position: 'relative', transition: 'all 0.4s' }}>

                {/* Display header bar */}
                <div style={{
                  padding: '14px 24px',
                  borderBottom: `1px solid ${activeSector.accent}22`,
                  background: 'rgba(2,10,20,0.6)',
                  display: 'flex', alignItems: 'center', gap: 14,
                  transition: 'border-color 0.4s',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{activeSector.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.52rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '2.5px', marginBottom: 3 }}>SECTOR</div>
                    <GlitchText
                      text={activeSector.name.toUpperCase()}
                      style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1rem', fontWeight: 800, color: activeSector.accent, letterSpacing: '2.5px', transition: 'color 0.4s' }}
                    />
                  </div>

                  {/* Live indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.1, repeat: Infinity }}
                      style={{ width: 7, height: 7, borderRadius: '50%', background: activeSector.accent, boxShadow: `0 0 6px ${activeSector.accent}` }} />
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.58rem', fontWeight: 700, color: activeSector.accent, letterSpacing: '2px' }}>LIVE</span>
                  </div>

                  {/* Agent count */}
                  <div style={{
                    padding: '4px 14px',
                    background: `${activeSector.accent}12`,
                    border: `1px solid ${activeSector.accent}30`,
                    borderRadius: 5,
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: '0.65rem', fontWeight: 700,
                    color: activeSector.accent, letterSpacing: '1px',
                    transition: 'all 0.4s',
                  }}>{activeSector.members.length} AGENTS</div>

                  {/* Arrow key hint */}
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.48rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '1px' }}>↑↓ KEYS</span>
                </div>

                {/* Content area */}
                <div style={{ flex: 1, padding: 24, overflowY: 'auto', position: 'relative' }}>
                  {/* CRT scanlines */}
                  <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
                    backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.055) 3px,rgba(0,0,0,0.055) 4px)',
                  }} />
                  {/* Corner accent glows */}
                  <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, background: `radial-gradient(circle at top right,${activeSector.accent}08,transparent 70%)`, pointerEvents: 'none', transition: 'background 0.4s' }} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <MemberGrid />
                  </div>
                </div>

                {/* Footer status bar */}
                <div style={{
                  padding: '8px 24px',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  background: 'rgba(2,10,20,0.4)',
                  display: 'flex', alignItems: 'center', gap: 16,
                  flexShrink: 0,
                }}>
                  <div style={{ display: 'flex', gap: 3 }}>
                    {SECTORS.map(s => (
                      <motion.div key={s.id}
                        animate={{ backgroundColor: s.id === activeId ? s.accent : 'rgba(255,255,255,0.1)' }}
                        transition={{ duration: 0.3 }}
                        onClick={() => switchSector(s.id)}
                        style={{ width: s.id === activeId ? 14 : 5, height: 4, borderRadius: 2, cursor: 'pointer', transition: 'width 0.3s' }}
                      />
                    ))}
                  </div>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.5rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '1.5px' }}>
                    SECTOR {SECTORS.findIndex(s => s.id === activeId) + 1} / {SECTORS.length} · CLICK CARD TO VIEW PROFILE
                  </span>
                </div>

                {/* ── SWEEP OVERLAY ── */}
                <AnimatePresence>
                  {sweeping && (
                    <motion.div key="sweep"
                      initial={{ x: '-100%' }} animate={{ x: '200%' }}
                      transition={{ duration: 0.36, ease: 'easeInOut' }}
                      style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20,
                        background: `linear-gradient(90deg,transparent 0%,${sweepColor}40 35%,${sweepColor}85 50%,${sweepColor}40 65%,transparent 100%)`,
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            <p style={{ textAlign: 'center', marginTop: 14, fontSize: '0.6rem', color: 'rgba(255,255,255,0.22)', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '2px' }}>
              ↑ ↓ ARROW KEYS TO NAVIGATE SECTORS · CLICK CARD TO VIEW FULL PROFILE
            </p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selected && <MemberModal member={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
