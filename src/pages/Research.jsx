import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, Download, Users } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SectionHeader from '../components/SectionHeader';

const papers = [
  {
    id: 1,
    title: 'The Rationality Horizon',
    tag: 'AI Philosophy',
    tagColor: '#00f0ff',
    desc: 'An exploration of the boundaries of rational decision-making in AI systems — examining where algorithmic logic ends and emergent reasoning begins.',
    authors: ['SOL Research Wing'],
    file: '/research/The Rationality Horizon.pdf',
  },
  {
    id: 2,
    title: 'From Statistics to GenAI',
    tag: 'AI Research',
    tagColor: '#7c3aed',
    desc: 'A comprehensive journey through the evolution of data science — from foundational statistical methods to the era of generative artificial intelligence.',
    authors: ['SOL Research Wing'],
    file: '/research/From Statistics to GenAI.pdf',
  },
  {
    id: 3,
    title: 'OpenClaw — SOL',
    tag: 'Project Showcase',
    tagColor: '#10b981',
    desc: 'Technical documentation and research behind OpenClaw — an open-source ML project built and maintained by the Stats-O-Locked technical team.',
    authors: ['SOL Technical Team'],
    file: '/research/OpenClaw_SOL.pdf',
  },
  {
    id: 4,
    title: 'Encompass Report',
    tag: 'Club Report',
    tagColor: '#f59e0b',
    desc: 'A detailed report encompassing club activities, research initiatives, event outcomes, and strategic insights from the Stats-O-Locked community.',
    authors: ['SOL Leadership'],
    file: '/research/encompass report.pdf',
  },
  {
    id: 5,
    title: 'Student Research Paper',
    tag: 'Student Research',
    tagColor: '#f43f5e',
    desc: 'An independent research paper by club members exploring cutting-edge topics at the intersection of statistics, machine learning, and real-world applications.',
    authors: ['Pranav', 'Anjali', 'Astha', 'Saii'],
    file: '/research/pranav,anjali,astha,saii.pdf',
  },
];

function PaperCard({ paper, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? paper.tagColor + '55' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 20,
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? `0 20px 56px ${paper.tagColor}18` : 'none',
        height: '100%',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
        background: `linear-gradient(90deg, transparent, ${paper.tagColor}, transparent)`,
        opacity: hovered ? 1 : 0.45,
        transition: 'opacity 0.3s',
      }} />

      {/* Icon + badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          width: 46, height: 46, borderRadius: 12,
          background: `${paper.tagColor}14`,
          border: `1px solid ${paper.tagColor}28`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <FileText size={20} color={paper.tagColor} />
        </div>
        <span style={{
          fontSize: '0.66rem', fontWeight: 700, letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: paper.tagColor,
          background: `${paper.tagColor}12`,
          border: `1px solid ${paper.tagColor}30`,
          padding: '4px 12px', borderRadius: 999,
          fontFamily: "'Space Grotesk', sans-serif",
          whiteSpace: 'nowrap',
        }}>
          {paper.tag}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(1rem, 2vw, 1.18rem)',
        fontWeight: 700,
        color: hovered ? '#fff' : 'rgba(255,255,255,0.9)',
        lineHeight: 1.35,
        transition: 'color 0.2s',
        margin: 0,
      }}>
        {paper.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '0.85rem', lineHeight: 1.75,
        color: 'rgba(255,255,255,0.48)',
        fontFamily: "'Inter', sans-serif",
        flex: 1,
        margin: 0,
      }}>
        {paper.desc}
      </p>

      {/* Authors */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
        <Users size={12} color="rgba(255,255,255,0.28)" strokeWidth={2} />
        {paper.authors.map((a, i) => (
          <span key={i} style={{
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.38)',
            fontFamily: "'Inter', sans-serif",
          }}>
            {a}{i < paper.authors.length - 1 ? ' ·' : ''}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
        <a
          href={paper.file}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            padding: '9px 16px',
            background: `${paper.tagColor}16`,
            border: `1px solid ${paper.tagColor}38`,
            borderRadius: 10,
            color: paper.tagColor,
            fontSize: '0.78rem', fontWeight: 600,
            letterSpacing: '0.4px',
            textDecoration: 'none',
            fontFamily: "'Space Grotesk', sans-serif",
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = `${paper.tagColor}28`}
          onMouseLeave={e => e.currentTarget.style.background = `${paper.tagColor}16`}
        >
          <ExternalLink size={13} />
          Read Paper
        </a>
        <a
          href={paper.file}
          download
          title="Download PDF"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '9px 14px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            color: 'rgba(255,255,255,0.45)',
            textDecoration: 'none',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
        >
          <Download size={14} />
        </a>
      </div>

      {/* Corner glow */}
      <div style={{
        position: 'absolute', bottom: -28, right: -28, width: 110, height: 110,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${paper.tagColor}14 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
    </motion.div>
  );
}

export default function Research() {
  return (
    <PageLayout>
      <SectionHeader
        badge="Open Access"
        title={<>Research &amp; <span className="gradient-text-cyan">Insights</span></>}
        subtitle="Papers, reports, and project showcases authored by the Stats-O-Locked community."
      />

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        style={{
          display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center',
          marginBottom: 48,
        }}
      >
        {[
          { label: 'Papers', value: papers.length },
          { label: 'Categories', value: new Set(papers.map(p => p.tag)).size },
          { label: 'Access', value: 'Free' },
        ].map(({ label, value }) => (
          <div key={label} style={{
            padding: '8px 22px',
            background: 'rgba(0,240,255,0.05)',
            border: '1px solid rgba(0,240,255,0.15)',
            borderRadius: 999,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.6)',
          }}>
            <span style={{ color: '#00f0ff', fontWeight: 700 }}>{value}</span>
            {' '}{label}
          </div>
        ))}
      </motion.div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
        gap: 20,
        alignItems: 'start',
      }}>
        {papers.map((paper, i) => (
          <PaperCard key={paper.id} paper={paper} index={i} />
        ))}
      </div>
    </PageLayout>
  );
}
