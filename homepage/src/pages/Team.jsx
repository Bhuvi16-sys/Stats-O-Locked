import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import PageLayout from '../components/PageLayout';

export default function Team() {
  const teamMembers = [
    { name: "Shivam Waghule", role: "President", img: "pics/shivam.jpeg" },
    { name: "Ankit Verma", role: "President", img: "" },
    { name: "Meera Reddy", role: "Research Lead", img: "" },
    { name: "Kabir Kohl", role: "Tech Lead", img: "" },
    { name: "Sanya Joy", role: "Event Manager", img: "" }
  ];

  return (
    <PageLayout title="Our Team">
      <div className={`w-full grid gap-6 md:gap-10 ${
        teamMembers.length === 1 ? 'grid-cols-1 max-w-lg mx-auto' : 
        teamMembers.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' : 
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      } justify-items-center`}>
        {teamMembers.map((member, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * idx, duration: 0.5 }}
            className="w-full flex flex-col items-center p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(2,11,22,0.6)] backdrop-blur-xl hover:border-[#7c3aed]/50 hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="w-32 h-32 rounded-full mb-6 overflow-hidden border-2 border-[rgba(255,255,255,0.1)] group-hover:border-[#00f0ff] transition-colors relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center">
              {member.img ? (
                <img src={member.img} alt={member.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <User size={48} className="text-gray-500 group-hover:text-[#00f0ff] transition-colors" />
              )}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00f0ff] transition-colors text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {member.name}
            </h3>
            <span className="text-[#a78bfa] text-sm font-semibold uppercase tracking-wider text-center flex-1">
              {member.role}
            </span>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
}
