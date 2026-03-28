import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

export default function Events() {
  const pastEvents = [
    {
      title: 'CTRL + LOL',
      date: 'Feb 20 - Feb 26',
      type: 'Meme Competition',
      desc: 'Join the ultimate meme-making showdown! Check leaderboard, register, and submit your entries.',
      status: 'Ended',
      link: '/event-details' // Update if there is a specific route or keep it an external link
    }
  ];

  return (
    <PageLayout title="Club Events" subtitle="Past Events">
      <div className={`w-full grid gap-6 md:gap-10 ${
        pastEvents.length === 1 ? 'grid-cols-1 max-w-lg mx-auto' : 
        pastEvents.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' : 
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}>
        {pastEvents.map((ev, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (idx * 0.1), duration: 0.5 }}
            className="w-full p-8 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(2,11,22,0.6)] backdrop-blur-xl hover:border-[#00f0ff]/50 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-4 right-4 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-gray-300 tracking-wider uppercase">
              {ev.status}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#00f0ff] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {ev.title}
            </h3>
            <div className="flex flex-col gap-2 mb-6 text-sm text-gray-400 font-medium tracking-wide">
                <span>🗓️ {ev.date}</span>
                <span>🏆 {ev.type}</span>
            </div>
            <p className="text-gray-300 mb-8 leading-relaxed font-light">
              {ev.desc}
            </p>
            <Link to="/event-details" className="inline-flex items-center text-[#00f0ff] hover:text-white transition-colors font-bold uppercase tracking-wider text-sm group-hover:gap-2 gap-1">
              View Details <span>→</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
}
