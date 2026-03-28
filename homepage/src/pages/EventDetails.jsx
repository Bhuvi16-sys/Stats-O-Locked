import { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';

export default function EventDetails() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'guidelines', label: 'Guidelines' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'register', label: 'Register' },
  ];

  const leaderboardData = [
    { rank: 1, name: 'Dhimant Bhardwaj', handle: '@themantish', id: '24BAI10746', votes: 39, badges: '🥇' },
    { rank: 2, name: 'Khushi Gupta', handle: '@khushigupta4883', id: 'N/A outsider', votes: 31, badges: '🥈' },
    { rank: 3, name: 'Suvradeep Datta', handle: '@suvradeep777', id: '25BAI10328', votes: 26, badges: '🥉' },
    { rank: 4, name: 'Gauri Srivastava', handle: '@gaurisrivastavaaa', id: '25BCE10070', votes: 20, badges: '' },
    { rank: 5, name: 'Abhi Srivastava', handle: '@abhiisrivastava_irl', id: 'N/A outsider', votes: 19, badges: '' },
    { rank: 6, name: 'Aniket Kumar Singh', handle: '@lord_falooda', id: '24BCE11167', votes: 17, badges: '' },
    { rank: 7, name: 'Bedantika Banerjee', handle: '@thebedanti.07', id: '25BCE10597', votes: 15, badges: '' },
    { rank: 8, name: 'Palak, Divyaraj Purohit', handle: '@missmitruka_2612, @_divyaraj_rajpurohit', id: '25BCE10103, 24BCY10311', votes: 14, badges: '' },
    { rank: 9, name: 'Supriya Yelgunde, Ashish Kumar Patel, Ansh Gupta, Astle Antony', handle: '@supriyayelgunde, @i52sh_, @anshgupta5066, @astle.antony.33', id: '24BSA10150, N/A, 24BSA10196, N/A', votes: 13, badges: '' },
    { rank: 10, name: 'Purvi Gupta, Priya Gulia', handle: '@purvi_guptaa_, @gulia_.priya', id: '25BAS10040, N/A outsider', votes: 12, badges: '' },
  ];

  return (
    <PageLayout>
      
      {/* Header */}
      <div className="mb-16 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-6"
          style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          Ended
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#7c3aed]">
            CTRL + LOL
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto"
        >
          An online meme creation competition engaging creativity, humor, and digital expression.
        </motion.p>
      </div>

      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300 ${
              activeTab === tab.id 
                ? 'bg-[rgba(124,58,237,0.3)] border-[#00f0ff] text-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.15)]' 
                : 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.1)] text-gray-400 hover:bg-[rgba(255,255,255,0.08)]'
            }`}
            style={{ border: '1px solid', fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Tab Content Area */}
      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card p-8 md:p-12"
      >
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 text-gray-300 leading-relaxed">
              <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Description</h2>
              <p className="mb-4">Stats-O-Locked presents <strong className="text-white">CTRL + LOL</strong>, the ultimate meme-making showdown! 🎭💻</p>
              <p className="mb-8">Prepare to debug your depression and compile some laughter as we celebrate the lighter side of technology and student life. Whether it’s the pain of a missing semicolon, the chaos of placement season, or the eternal struggle between you and your code, we want to see it all meme-ified!</p>
              
              <h3 className="text-xl font-bold text-[#00f0ff] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Why Participate?</h3>
              <ul className="list-disc pl-6 space-y-3 mb-8">
                <li><strong className="text-white">Showcase Your Wit:</strong> Prove that you're the funniest coder in the room.</li>
                <li><strong className="text-white">Relatable Content:</strong> Create memes that every techie understands and vibes with.</li>
                <li><strong className="text-white">Win Big:</strong> Top memes will be featured on our official pages, and winners get exciting rewards!</li>
              </ul>
              <p className="font-semibold text-white">So, <code className="bg-[rgba(255,255,255,0.1)] px-2 py-1 rounded">git commit</code> to the fun, <code className="bg-[rgba(255,255,255,0.1)] px-2 py-1 rounded">push</code> your creativity, and let the meme wars begin! 🚀</p>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-6">
                <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-2">Timeline</div>
                <div className="text-lg font-bold text-white">20th Feb — 26th Feb</div>
              </div>
              <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-6">
                <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-2">Scoring</div>
                <div className="text-lg font-bold text-[#7c3aed]">50% Likes / 50% Judge</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guidelines' && (
          <div className="text-gray-300">
            <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Rules & Guidelines</h2>
            <ul className="space-y-4 text-lg">
              <li className="flex gap-4 items-start"><span className="text-[#00f0ff] font-bold">1.</span> Memes must be original content. Plagiarism will lead to disqualification.</li>
              <li className="flex gap-4 items-start"><span className="text-[#00f0ff] font-bold">2.</span> Content must be respectful and follow university code of conduct. No offensive material.</li>
              <li className="flex gap-4 items-start"><span className="text-[#00f0ff] font-bold">3.</span> Submissions must be in JPG or PNG format.</li>
              <li className="flex gap-4 items-start"><span className="text-[#00f0ff] font-bold">4.</span> Participants can submit up to 3 memes.</li>
              <li className="flex gap-4 items-start"><span className="text-[#00f0ff] font-bold">5.</span> Voting closes on 26th Feb at 11:59 PM.</li>
            </ul>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Final Leaderboard</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.1)] text-gray-400 text-sm uppercase tracking-wider">
                    <th className="pb-4 pt-2 px-4 font-semibold">Rank</th>
                    <th className="pb-4 pt-2 px-4 font-semibold">Name</th>
                    <th className="pb-4 pt-2 px-4 font-semibold">Instagram Handle</th>
                    <th className="pb-4 pt-2 px-4 font-semibold">Registration ID</th>
                    <th className="pb-4 pt-2 px-4 font-semibold text-right">Votes</th>
                    <th className="pb-4 pt-2 px-4 font-semibold text-center">Badges</th>
                  </tr>
                </thead>
                <tbody className="text-gray-200">
                  {leaderboardData.map((row, index) => (
                    <tr key={index} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                      <td className="py-4 px-4 font-bold text-[#00f0ff]">{row.rank}</td>
                      <td className="py-4 px-4 font-semibold">{row.name}</td>
                      <td className="py-4 px-4 text-gray-400 text-sm">{row.handle}</td>
                      <td className="py-4 px-4 text-xs font-mono text-[#7c3aed]">{row.id}</td>
                      <td className="py-4 px-4 text-right font-bold">{row.votes}</td>
                      <td className="py-4 px-4 text-center text-lg">{row.badges}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'register' && (
          <div className="text-center py-16">
            <h3 className="text-3xl font-bold text-[#00f0ff] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Registration Closed</h3>
            <p className="text-xl text-gray-400">Thank you to everyone who participated in CTRL + LOL!</p>
          </div>
        )}
      </motion.div>
    </PageLayout>
  );
}
