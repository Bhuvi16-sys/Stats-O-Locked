import { motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';

export default function Leaderboard() {
  const leaderboardData = [
    { rank: 1, name: 'Alex Chen', event: 'CTRL + LOL', points: 1500, badges: '🥇 🚀' },
    { rank: 2, name: 'Sarah Jones', event: 'CTRL + LOL', points: 1350, badges: '🥈' },
    { rank: 3, name: 'Mike Ross', event: 'CTRL + LOL', points: 1200, badges: '🥉' },
    { rank: 4, name: 'Emily White', event: 'Data Datathon', points: 1100, badges: '💻' },
    { rank: 5, name: 'David Kim', event: 'AI Workshop', points: 950, badges: '🎓' },
  ];

  return (
    <PageLayout 
      title="Live Center" 
      subtitle={<span className="text-white block mt-2" style={{ fontSize: '0.6em', opacity: 0.9 }}>Leaderboard</span>}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="glass-card p-6 md:p-10"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[rgba(0,240,255,0.2)] text-gray-300 text-sm uppercase tracking-wider">
                <th className="pb-4 pt-2 px-4 font-semibold">Rank</th>
                <th className="pb-4 pt-2 px-4 font-semibold">Name</th>
                <th className="pb-4 pt-2 px-4 font-semibold">Event</th>
                <th className="pb-4 pt-2 px-4 font-semibold text-right">Points</th>
                <th className="pb-4 pt-2 px-4 font-semibold text-center">Badges</th>
              </tr>
            </thead>
            <tbody className="text-gray-100">
              {leaderboardData.map((row, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-[rgba(255,255,255,0.05)] transition-colors hover:bg-[rgba(124,58,237,0.05)] ${index === 0 ? 'bg-[rgba(0,240,255,0.03)]' : ''}`}
                >
                  <td className="py-5 px-4 font-black text-xl text-[#00f0ff]">{row.rank}</td>
                  <td className="py-5 px-4 font-bold tracking-wide">{row.name}</td>
                  <td className="py-5 px-4 text-gray-400 text-sm uppercase tracking-wider">{row.event}</td>
                  <td className="py-5 px-4 text-right font-black text-xl text-[#7c3aed]">{row.points}</td>
                  <td className="py-5 px-4 text-center text-2xl">{row.badges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Placeholder for live data loading state if connected to Supabase */}
        {/* <div className="text-center mt-8 text-sm text-[rgba(0,240,255,0.6)] animate-pulse">Loading live data...</div> */}
      </motion.div>
    </PageLayout>
  );
}
