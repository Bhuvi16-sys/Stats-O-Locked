const items = [
  { icon: '🚀', text: 'TechCorp Summit' },
  { icon: '⚡', text: 'DataHack 2.0' },
  { icon: '🎭', text: 'CTRL + LOL' },
  { icon: '👥', text: '70+ Members' },
  { icon: '🎵', text: 'Techila Unplugged' },
  { icon: '🧠', text: 'AI & Data Science' },
  { icon: '📊', text: 'Stats-O-Locked' },
  { icon: '🏛️', text: 'VIT Bhopal' },
  { icon: '🤖', text: 'Machine Learning' },
  { icon: '💡', text: 'Innovation Hub' },
  { icon: '🔬', text: 'Research & Projects' },
  { icon: '🏆', text: 'Competitive Excellence' },
];

const Row = ({ items, reverse = false, speed = 28 }) => (
  <div style={{ display: 'flex', overflow: 'hidden', width: '100%', maskImage: 'linear-gradient(90deg,transparent,black 12%,black 88%,transparent)' }}>
    <div style={{
      display: 'flex', gap: 0,
      animation: `marquee-${reverse ? 'r' : 'f'} ${speed}s linear infinite`,
      whiteSpace: 'nowrap', flexShrink: 0,
      willChange: 'transform',
    }}>
      {[...items, ...items].map((item, i) => (
        <span key={i} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 32px',
          fontSize: '0.78rem', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500,
          color: 'rgba(255,255,255,0.38)', letterSpacing: '1px', textTransform: 'uppercase',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}>
          <span style={{ fontSize: '0.85rem' }}>{item.icon}</span>
          {item.text}
        </span>
      ))}
    </div>
  </div>
);

export default function Marquee() {
  return (
    <>
      <style>{`
        @keyframes marquee-f { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes marquee-r { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }
      `}</style>
      <div style={{
        padding: '0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        background: 'rgba(0,0,0,0.12)',
      }}>
        <div style={{ padding: '14px 0' }}>
          <Row items={items} speed={32} />
        </div>
      </div>
    </>
  );
}
