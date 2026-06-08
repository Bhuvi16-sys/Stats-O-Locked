import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { Trophy, Calendar, Users, Target, BookOpen, Star, HelpCircle, ArrowLeft } from 'lucide-react';

export default function EventDetails() {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('id') || 'techcorp';
  const [activeTab, setActiveTab] = useState('overview');

  // Reset tab to overview when eventId changes
  useEffect(() => {
    setActiveTab('overview');
  }, [eventId]);

  const isTechCorp = eventId === 'techcorp';

  // Tabs list based on the event
  const tabs = isTechCorp
    ? [
        { id: 'overview', label: 'Overview' },
        { id: 'techila', label: 'Techila Unplugged' },
        { id: 'judges', label: 'Judges' },
        { id: 'winners', label: 'Winners' },
      ]
    : [
        { id: 'overview', label: 'Overview' },
        { id: 'guidelines', label: 'Guidelines' },
        { id: 'leaderboard', label: 'Leaderboard' },
        { id: 'winners', label: 'Winners' },
      ];

  const ctrlLolLeaderboard = [
    { rank: 1, name: 'Dhimant Bhardwaj', handle: '@themantish', id: '24BAI10746', votes: '1st Place', badges: '🥇' },
    { rank: 2, name: 'Khushi Gupta', handle: '@khushigupta4883', id: 'IEHE, Bhopal (Outsider)', votes: '2nd Place', badges: '🥈' },
    { rank: 3, name: 'Suvradeep Dutta', handle: '@suvradeep777', id: '25BAI1010328', votes: '3rd Place', badges: '🥉' },
  ];

  return (
    <PageLayout>
      {/* Back button */}
      <div className="w-full max-w-4xl mb-8 flex justify-start">
        <Link 
          to="/events" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00f0ff] transition-colors font-semibold font-['Space_Grotesk'] tracking-wider text-sm group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          BACK TO EVENTS
        </Link>
      </div>

      {/* Header */}
      <div className="mb-16 text-center w-full max-w-4xl">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 bg-[#7c3aed]/15 border border-[#7c3aed]/40 text-[#c4b5fd]"
        >
          Flagship Event
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tight font-['Space_Grotesk']"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#7c3aed]">
            {isTechCorp ? 'TechCorp Summit' : 'CTRL + LOL'}
          </span>
          {isTechCorp && ' 🚀'}
          {!isTechCorp && ' 🎭💻'}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
        >
          {isTechCorp 
            ? 'Combining tech-focused discussions with a simulated Model United Nations debate environment.'
            : 'A week-long virtual meme-making marathon relating student realities and academic struggles through digital humor.'
          }
        </motion.p>
      </div>

      {/* Tabs Menu */}
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
            className={`px-6 py-3 rounded-xl font-semibold text-sm tracking-widest uppercase transition-all duration-300 ${
              activeTab === tab.id 
                ? 'bg-[rgba(124,58,237,0.2)] border-[#00f0ff] text-[#00f0ff] shadow-[0_0_25px_rgba(0,240,255,0.2)]' 
                : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)] text-gray-400 hover:bg-[rgba(255,255,255,0.06)] hover:text-white'
            }`}
            style={{ border: '1px solid', fontFamily: "'Space Grotesk', sans-serif", cursor: 'pointer' }}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Tab Content Area */}
      <motion.div 
        key={`${eventId}-${activeTab}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl p-8 md:p-12 bg-white/[0.02] backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,240,255,0.03)] hover:shadow-[0_0_60px_rgba(124,58,237,0.05)] transition-all duration-500 relative overflow-hidden"
      >
        {/* Top accent glow line */}
        <div style={{
          position: 'absolute',
          top: 0, left: '10%', right: '10%',
          height: '1px',
          background: isTechCorp 
            ? 'linear-gradient(90deg, transparent, #00f0ff, transparent)'
            : 'linear-gradient(90deg, transparent, #7c3aed, transparent)',
        }} />

        {/* ────────────────── 1. TECHCORP SUMMIT CONTENT ────────────────── */}
        {isTechCorp && (
          <>
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-gray-300">
                <div className="lg:col-span-2 space-y-8">
                  {/* Objective */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 font-['Space_Grotesk'] flex items-center gap-2">
                      <Target size={18} className="text-[#00f0ff]" />
                      OBJECTIVE
                    </h3>
                    <p className="leading-relaxed">
                      To enhance participants’ analytical thinking, communication skills, and technical awareness by combining the structured debate format of a Model United Nations (MUN) with technology-focused discussions. It encourages students to critically evaluate modern technological issues, collaborate effectively, and develop strong problem-solving abilities.
                    </p>
                  </div>
                  
                  {/* Brief */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 font-['Space_Grotesk'] flex items-center gap-2">
                      <BookOpen size={18} className="text-[#7c3aed]" />
                      EVENT BRIEF
                    </h3>
                    <p className="leading-relaxed">
                      TechCorp Summit combines a tech-based MUN format with interactive group discussions, creating a dynamic and engaging learning environment. Participants represent diverse perspectives, debate contemporary technological issues, and propose innovative solutions. The event fosters critical thinking, teamwork, and effective communication.
                    </p>
                  </div>

                  {/* Outcome */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 font-['Space_Grotesk'] flex items-center gap-2">
                      <Trophy size={18} className="text-[#10b981]" />
                      EVENT OUTCOME
                    </h3>
                    <p className="leading-relaxed">
                      The event generated significant engagement for the club and enhanced its visibility. Participants demonstrated strong analytical abilities, creativity, and digital literacy. The hybrid judging system (panel evaluation + participant voting) encouraged healthy discussions and active participation.
                    </p>
                  </div>
                </div>

                {/* Sidebar details */}
                <div className="flex flex-col gap-6">
                  <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">Category</div>
                    <div className="text-lg font-bold text-white font-['Space_Grotesk']">Tech Debate (MUN)</div>
                  </div>
                  <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">Judging System</div>
                    <div className="text-lg font-bold text-[#00f0ff] font-['Space_Grotesk']">Panel + Delegate Vote</div>
                  </div>
                  <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">Duration</div>
                    <div className="text-lg font-bold text-[#7c3aed] font-['Space_Grotesk']">2-Day Summit</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'techila' && (
              <div className="text-gray-300 space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 font-['Space_Grotesk']">
                    Techila Unplugged 🎸🎮
                  </h3>
                  <p className="leading-relaxed mb-6">
                    Techila Unplugged was the interactive and recreational segment conducted on Day 2 of the event, offering participants a refreshing break from the corporate simulation. It featured a mix of technical and non-technical games, designed to engage students through fun, competition, and collaboration.
                  </p>
                  <p className="leading-relaxed mb-6">
                    Participants enthusiastically took part in activities that tested their logical thinking, memory, teamwork, and problem-solving skills. The tech-based challenge pushed participants to think analytically under pressure, while the non-tech activity encouraged coordination and communication within teams. The environment remained lively and energetic, with teams actively competing while maintaining a spirit of sportsmanship.
                  </p>
                  <p className="leading-relaxed">
                    The segment also served as a great networking opportunity, allowing participants to interact beyond their teams, build connections, and share ideas in a relaxed setting. It successfully balanced enjoyment with learning, making it a memorable part of the overall event.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-8">
                  <h4 className="text-lg font-bold text-[#00f0ff] mb-4 font-['Space_Grotesk'] uppercase tracking-wider">
                    🏆 Segment Winners
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl">
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Memory Sequence Challenge</div>
                      <div className="text-lg font-bold text-white">Shreyansh</div>
                    </div>
                    <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl">
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">AI Prompt Battle</div>
                      <div className="text-lg font-bold text-white">Ayush Arora</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'judges' && (
              <div className="text-gray-300">
                <h3 className="text-2xl font-bold text-white mb-8 font-['Space_Grotesk'] text-center">
                  ESTEEMED JUDGES panel
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  {[
                    { name: 'Vishwas Chouhan', title: 'Tech Evaluator & Industry Specialist' },
                    { name: 'Tushti Agarwal', title: 'Analytics Expert & Academic Mentor' },
                  ].map((judge, i) => (
                    <div key={i} className="p-8 bg-white/[0.02] border border-white/10 rounded-2xl text-center relative group hover:border-[#7c3aed]/50 transition-all duration-300">
                      <div className="w-16 h-16 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/30 flex items-center justify-center mx-auto mb-4">
                        <Star className="w-8 h-8 text-[#7c3aed]" />
                      </div>
                      <h4 className="text-xl font-bold text-white font-['Space_Grotesk'] mb-1">{judge.name}</h4>
                      <p className="text-sm text-gray-400">{judge.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'winners' && (
              <div className="text-gray-300">
                <h3 className="text-2xl font-bold text-white mb-8 font-['Space_Grotesk'] text-center">
                  TechCorp Summit Winners
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { name: 'Ansari Murtaza', id: '24BAI10109', badge: '🥇 1st Place' },
                    { name: 'Rishi Goyal', id: '25BAI10300', badge: '🥈 2nd Place' },
                    { name: 'Tarang Gupta', id: '24BSA10352', badge: '🥉 3rd Place' },
                  ].map((win, i) => (
                    <div key={i} className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl text-center hover:bg-white/[0.03] transition-colors">
                      <div className="text-[#00f0ff] font-['Space_Grotesk'] font-bold text-lg mb-3">{win.badge}</div>
                      <h4 className="text-lg font-bold text-white mb-1 font-['Space_Grotesk']">{win.name}</h4>
                      <div className="text-xs font-mono text-[#7c3aed]">{win.id}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ────────────────── 2. CTRL + LOL CONTENT ────────────────── */}
        {!isTechCorp && (
          <>
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-gray-300">
                <div className="lg:col-span-2 space-y-8">
                  {/* Objective */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 font-['Space_Grotesk'] flex items-center gap-2">
                      <Target size={18} className="text-[#00f0ff]" />
                      OBJECTIVE
                    </h3>
                    <p className="leading-relaxed">
                      CTRL + LOL aims to provide a creative outlet for students to express the realities of academic life through digital humor and art. It focuses on relatable themes such as coding struggles, placement pressure, and college chaos, fostering community bonding and stress relief.
                    </p>
                  </div>
                  
                  {/* Brief */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 font-['Space_Grotesk'] flex items-center gap-2">
                      <BookOpen size={18} className="text-[#7c3aed]" />
                      EVENT BRIEF
                    </h3>
                    <p className="leading-relaxed">
                      CTRL + LOL was a week-long virtual meme-making marathon conducted during AdVITya’26. Participants created original memes reflecting student life. Submissions were collected via Google Forms and showcased on the club’s Instagram page for public engagement.
                    </p>
                  </div>

                  {/* Outcome */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 font-['Space_Grotesk'] flex items-center gap-2">
                      <Trophy size={18} className="text-[#10b981]" />
                      EVENT OUTCOME
                    </h3>
                    <p className="leading-relaxed">
                      The event saw high digital engagement and significantly boosted the club’s online presence. Participants displayed creativity, relatability, and strong storytelling skills through humor.
                    </p>
                  </div>
                </div>

                {/* Sidebar details */}
                <div className="flex flex-col gap-6">
                  <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">Category</div>
                    <div className="text-lg font-bold text-white font-['Space_Grotesk']">Meme & Design Marathon</div>
                  </div>
                  <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">Festival</div>
                    <div className="text-lg font-bold text-[#00f0ff] font-['Space_Grotesk']">AdVITya'26</div>
                  </div>
                  <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">Submissions</div>
                    <div className="text-lg font-bold text-[#7c3aed] font-['Space_Grotesk']">Instagram & GForms</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'guidelines' && (
              <div className="text-gray-300 space-y-6">
                <h3 className="text-2xl font-bold text-white mb-4 font-['Space_Grotesk']">
                  Rules & Evaluation
                </h3>
                
                <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl mb-8">
                  <h4 className="text-lg font-bold text-[#00f0ff] mb-2 font-['Space_Grotesk']">
                    ⚖️ JUDGING CRITERIA
                  </h4>
                  <p className="text-xl font-bold text-white font-['Space_Grotesk']">
                    Final Score = (50% Instagram Engagement) + (50% Judge Score)
                  </p>
                </div>

                <ul className="space-y-4 text-base md:text-lg">
                  <li className="flex gap-4 items-start"><span className="text-[#7c3aed] font-bold">1.</span> Memes must be original content. Plagiarism will lead to instant disqualification.</li>
                  <li className="flex gap-4 items-start"><span className="text-[#7c3aed] font-bold">2.</span> Relatable themes: coding struggles, placement pressures, exam stress, and student lifestyle.</li>
                  <li className="flex gap-4 items-start"><span className="text-[#7c3aed] font-bold">3.</span> Submissions collected via google forms and processed in PNG/JPG format.</li>
                  <li className="flex gap-4 items-start"><span className="text-[#7c3aed] font-bold">4.</span> Public engagement on the official Instagram page counts directly towards the final 50% social score.</li>
                </ul>
              </div>
            )}

            {activeTab === 'leaderboard' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-8 font-['Space_Grotesk'] text-center">
                  Official Rankings & Votes
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
                        <th className="pb-4 pt-2 px-4 font-semibold font-['Space_Grotesk']">Rank</th>
                        <th className="pb-4 pt-2 px-4 font-semibold font-['Space_Grotesk']">Name</th>
                        <th className="pb-4 pt-2 px-4 font-semibold font-['Space_Grotesk']">Instagram Handle</th>
                        <th className="pb-4 pt-2 px-4 font-semibold font-['Space_Grotesk']">Registration ID</th>
                        <th className="pb-4 pt-2 px-4 font-semibold font-['Space_Grotesk'] text-right">Result</th>
                        <th className="pb-4 pt-2 px-4 font-semibold font-['Space_Grotesk'] text-center">Badge</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-200">
                      {ctrlLolLeaderboard.map((row, index) => (
                        <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
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

            {activeTab === 'winners' && (
              <div className="text-gray-300">
                <h3 className="text-2xl font-bold text-white mb-8 font-['Space_Grotesk'] text-center">
                  CTRL + LOL Winner Podium
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { name: 'Dhimant Bhardwaj', id: '24BAI10746', badge: '🥇 1st Place' },
                    { name: 'Khushi Gupta', id: 'IEHE, Bhopal (Outsider)', badge: '🥈 2nd Place' },
                    { name: 'Suvradeep Dutta', id: '25BAI1010328', badge: '🥉 3rd Place' },
                  ].map((win, i) => (
                    <div key={i} className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl text-center hover:bg-white/[0.03] transition-colors">
                      <div className="text-[#00f0ff] font-['Space_Grotesk'] font-bold text-lg mb-3">{win.badge}</div>
                      <h4 className="text-lg font-bold text-white mb-1 font-['Space_Grotesk']">{win.name}</h4>
                      <div className="text-xs font-mono text-[#7c3aed]">{win.id}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
    </PageLayout>
  );
}
