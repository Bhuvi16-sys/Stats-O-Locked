import { motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';
import { Eye, Target } from 'lucide-react';

export default function About() {
  const objectives = [
    {
      num: "01",
      color: "#00f0ff",
      text: "To organize engaging events, workshops, and competitions"
    },
    {
      num: "02",
      color: "#3b82f6",
      text: "To promote skill development in analytics, technology, and management"
    },
    {
      num: "03",
      color: "#7c3aed",
      text: "To encourage teamwork, responsibility, and leadership"
    },
    {
      num: "04",
      color: "#818cf8",
      text: "To bridge the gap between theoretical knowledge and practical application"
    },
    {
      num: "05",
      color: "#00f0ff",
      text: "To create a supportive, inclusive, and growth-oriented environment"
    }
  ];

  return (
    <PageLayout title="ABOUT US" subtitle="STATS-O-LOCKED CLUB">
      <div className="w-full text-left">
        {/* Who We Are */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] text-[#00f0ff] mb-6 flex items-center gap-3">
            <span className="w-2 h-6 bg-gradient-to-b from-[#00f0ff] to-[#7c3aed] rounded-full inline-block" />
            Who We Are
          </h3>
          <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-5xl">
            <strong className="text-white font-semibold">Stats-o-Locked Club</strong> is a student-driven organization focused on building a strong community of learners and future leaders. We believe in the power of collaboration, innovation, and continuous improvement.
          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Vision Card */}
          <motion.div
            whileHover={{ y: -6 }}
            className="p-8 rounded-2xl bg-white/[0.01] border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-xl pointer-events-none rounded-full" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#00f0ff]">
                <Eye size={24} />
              </div>
              <h4 className="text-xl font-bold font-['Space_Grotesk'] text-white">Our Vision</h4>
            </div>
            <p className="text-gray-300 font-light leading-relaxed">
              To build a forward-thinking, innovation-driven community where students are empowered to excel in technology, analytics, and leadership, while contributing meaningfully to society.
            </p>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            whileHover={{ y: -6 }}
            className="p-8 rounded-2xl bg-white/[0.01] border border-white/10 hover:border-purple-500/30 hover:bg-purple-500/[0.02] transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 blur-xl pointer-events-none rounded-full" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#7c3aed]">
                <Target size={24} />
              </div>
              <h4 className="text-xl font-bold font-['Space_Grotesk'] text-white">Our Mission</h4>
            </div>
            <p className="text-gray-300 font-light leading-relaxed">
              Our mission is to provide students with opportunities to develop technical, analytical, creative, and leadership skills beyond the classroom through hands-on experiences, real-world projects, and collaborative learning.
            </p>
          </motion.div>
        </div>

        {/* Our Objectives */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] text-[#7c3aed] mb-10 flex items-center gap-3">
            <span className="w-2 h-6 bg-gradient-to-b from-[#7c3aed] to-[#00f0ff] rounded-full inline-block" />
            Our Objectives
          </h3>
          <div className="flex flex-col gap-6 relative pl-2 md:pl-6">
            {/* Vertical connector line */}
            <div className="absolute left-[17px] md:left-[29px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#00f0ff] via-[#7c3aed] to-[#3b82f6] opacity-20" />
            
            {objectives.map((obj, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-6 relative group"
              >
                {/* Number Bubble */}
                <div
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-['Space_Grotesk'] font-bold text-sm md:text-base border z-10 transition-all duration-300 mt-2 shrink-0"
                  style={{
                    borderColor: `${obj.color}40`,
                    backgroundColor: '#020b16',
                    color: obj.color,
                    boxShadow: `0 0 15px ${obj.color}15`
                  }}
                >
                  {obj.num}
                </div>
                
                {/* Content Box */}
                <div className="flex-1 p-4 md:p-5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300">
                  <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed">
                    {obj.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
