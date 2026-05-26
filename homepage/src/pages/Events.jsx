import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { Calendar, Trophy, ArrowRight, Star } from 'lucide-react';

export default function Events() {
  const flagshipEvents = [
    {
      id: 'techcorp',
      title: 'TechCorp Summit',
      date: '2-Day Summit',
      type: 'MUN Tech Debate',
      desc: 'Combines a tech-based MUN debate format with interactive group discussions. Evaluate contemporary technological challenges, represent diverse perspectives, and propose creative solutions.',
      status: 'Ended',
      accent: '#00f0ff'
    },
    {
      id: 'ctrl-lol',
      title: 'CTRL + LOL',
      date: 'Week-long Marathon',
      type: 'Meme Competition',
      desc: 'A virtual meme-making contest designed to express the realities of academic life through digital humor. Showcases coding struggles, placement pressures, and student chaos.',
      status: 'Ended',
      accent: '#7c3aed'
    }
  ];

  return (
    <PageLayout title="Club Events" subtitle="Explore Our Flagship Activities">
      <div className="w-full max-w-5xl">
        {/* Section Heading */}
        <div className="mb-12 text-left">
          <h3 className="text-2xl font-bold text-white font-['Space_Grotesk'] tracking-wider uppercase flex items-center gap-3">
            <Star className="text-[#00f0ff]" />
            Flagship Events
          </h3>
          <p className="text-gray-500 mt-1">Our biggest, most successful events blending technology, debates, and digital creativity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {flagshipEvents.map((ev, idx) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (idx * 0.1), duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="w-full p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl hover:border-[#00f0ff]/50 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
              style={{
                boxShadow: 'inset 0 0 30px rgba(255,255,255,0.01)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${ev.accent}44`;
                e.currentTarget.style.boxShadow = `0 20px 40px ${ev.accent}11`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                {/* Top glow line */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: '10%', right: '10%',
                  height: '1px',
                  background: `linear-gradient(90deg, transparent, ${ev.accent}, transparent)`,
                  opacity: 0.6
                }} />

                {/* Status tag */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-gray-300 font-['Space_Grotesk'] uppercase tracking-wider">
                    {ev.status}
                  </span>
                  <span className="text-xs font-bold text-gray-400 font-['Space_Grotesk'] flex items-center gap-1">
                    <Calendar size={12} />
                    {ev.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-3xl font-extrabold mb-3 text-white group-hover:text-[#00f0ff] transition-colors font-['Space_Grotesk'] tracking-wider leading-tight">
                  {ev.title}
                </h3>
                
                {/* Type badge */}
                <div className="inline-block px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6 font-['Space_Grotesk']">
                  {ev.type}
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-8 leading-relaxed text-[0.98rem]">
                  {ev.desc}
                </p>
              </div>

              {/* Action link */}
              <Link 
                to={`/event-details?id=${ev.id}`} 
                className="inline-flex items-center text-[#00f0ff] hover:text-white transition-all font-bold uppercase tracking-wider text-sm gap-2 mt-auto"
              >
                Explore Event details 
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
