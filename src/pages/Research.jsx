import { motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';

export default function Research() {
  const researchItems = [
    {
      tag: 'AI Update',
      title: 'The Future of LLMs',
      desc: 'Exploring the latest advancements in Large Language Models...',
      link: '#'
    },
    {
      tag: 'Student Research',
      title: 'Predictive Analytics in Healthcare',
      desc: 'A study on using ML to predict patient outcomes...',
      link: '#'
    }
  ];

  return (
    <PageLayout title="Research & Insights">
      <div className={`w-full grid gap-6 md:gap-10 ${
        researchItems.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 
        'grid-cols-1 md:grid-cols-2'
      }`}>
        {researchItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + (idx * 0.1), duration: 0.6 }}
            className="w-full p-8 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(2,11,22,0.6)] backdrop-blur-xl hover:border-[#00f0ff]/50 transition-all duration-300 relative group flex flex-col h-full"
          >
            <div className="mb-4 inline-block px-3 py-1 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 text-xs font-bold text-[#a78bfa] tracking-wider uppercase w-max">
              {item.tag}
            </div>

            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#00f0ff] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {item.title}
            </h3>

            <p className="text-gray-300 mb-8 leading-relaxed font-light flex-1">
              {item.desc}
            </p>

            <a href={item.link} className="inline-flex items-center text-[#00f0ff] hover:text-white transition-colors font-bold uppercase tracking-wider text-sm group-hover:gap-2 gap-1 mt-auto">
              Read More <span>→</span>
            </a>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
}
