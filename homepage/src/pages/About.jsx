import { motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';
import { Target, Eye, Compass, ShieldAlert, Sparkles, TrendingUp, Users, Calendar, HelpCircle } from 'lucide-react';

export default function About() {
  const objectives = [
    {
      icon: <Calendar className="w-10 h-10 text-[#00f0ff] mb-4" />,
      text: "To organize engaging events, workshops, and competitions.",
      accent: "#00f0ff"
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-[#7c3aed] mb-4" />,
      text: "To promote skill development in analytics, technology, and management.",
      accent: "#7c3aed"
    },
    {
      icon: <Users className="w-10 h-10 text-[#3b82f6] mb-4" />,
      text: "To encourage teamwork, responsibility, and leadership.",
      accent: "#3b82f6"
    },
    {
      icon: <Compass className="w-10 h-10 text-[#10b981] mb-4" />,
      text: "To bridge the gap between theoretical knowledge and practical application.",
      accent: "#10b981"
    },
    {
      icon: <Sparkles className="w-10 h-10 text-[#ff4d94] mb-4" />,
      text: "To create a supportive, inclusive, and growth-oriented environment.",
      accent: "#ff4d94"
    }
  ];

  return (
    <PageLayout title="About Us" subtitle="Who We Are & What We Stand For">
      {/* 1. Who We Are */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-4xl mb-20 p-8 md:p-12 bg-white/[0.02] backdrop-blur-md rounded-3xl border border-white/10 text-center relative overflow-hidden"
      >
        <div style={{
          position: 'absolute',
          top: 0, left: '10%', right: '10%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)',
        }} />
        
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-['Space_Grotesk'] tracking-wider">
          WHO WE ARE
        </h3>
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          <span className="text-[#00f0ff] font-semibold">Stats-O-Locked Club</span> is a student-driven organization focused on building a strong community of learners and future leaders. We believe in the power of collaboration, innovation, and continuous improvement. We aim to create an environment where students can explore their interests, enhance their skills, and work collaboratively on meaningful projects.
        </p>
      </motion.section>

      {/* 2. Vision & Mission Side-by-Side */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 mb-24 max-w-5xl">
        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col p-10 bg-white/[0.03] rounded-3xl border border-white/10 hover:border-[#00f0ff]/50 hover:bg-white/[0.05] transition-all duration-300 relative group"
        >
          <div className="absolute top-0 left-8 right-8 height-[1px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-50" />
          <div className="w-14 h-14 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center mb-6">
            <Eye className="w-8 h-8 text-[#00f0ff]" />
          </div>
          <h4 className="text-white font-bold text-2xl mb-4 font-['Space_Grotesk']">
            OUR VISION
          </h4>
          <p className="text-gray-400 text-lg leading-relaxed">
            To build a forward-thinking, innovation-driven community where students are empowered to excel in technology, analytics, and leadership, while contributing meaningfully to society.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col p-10 bg-white/[0.03] rounded-3xl border border-white/10 hover:border-[#7c3aed]/50 hover:bg-white/[0.05] transition-all duration-300 relative group"
        >
          <div className="absolute top-0 left-8 right-8 height-[1px] bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent opacity-50" />
          <div className="w-14 h-14 rounded-2xl bg-[#7c3aed]/10 border border-[#7c3aed]/30 flex items-center justify-center mb-6">
            <Target className="w-8 h-8 text-[#7c3aed]" />
          </div>
          <h4 className="text-white font-bold text-2xl mb-4 font-['Space_Grotesk']">
            OUR MISSION
          </h4>
          <p className="text-gray-400 text-lg leading-relaxed">
            Our mission is to provide students with opportunities to develop technical, analytical, creative, and leadership skills beyond the classroom through hands-on experiences, real-world projects, and collaborative learning.
          </p>
        </motion.div>
      </div>

      {/* 3. Our Objectives */}
      <div className="w-full max-w-6xl mb-12">
        <div className="text-center mb-16">
          <h3 className="w-fit mx-auto text-3xl md:text-4xl font-extrabold uppercase tracking-tight bg-gradient-to-r from-[#00f0ff] to-[#7c3aed] text-transparent bg-clip-text font-['Space_Grotesk']">
            OUR OBJECTIVES
          </h3>
          <p className="text-gray-500 mt-2">The key milestones and guidelines directing our initiatives</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {objectives.map((obj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-8 bg-white/[0.02] rounded-2xl border border-white/10 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-start relative group"
              style={{
                boxShadow: `inset 0 0 20px rgba(255,255,255,0.01)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${obj.accent}44`;
                e.currentTarget.style.boxShadow = `0 15px 30px ${obj.accent}11`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0, left: '15%', right: '15%',
                height: '1px',
                background: `linear-gradient(90deg, transparent, ${obj.accent}, transparent)`,
                opacity: 0.5
              }} />
              {obj.icon}
              <p className="text-gray-300 text-[1.05rem] leading-relaxed font-medium">
                {obj.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
