import { motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';
import { Rocket, Handshake, Mic, Microscope } from 'lucide-react';

export default function About() {
  const cards = [
    {
      icon: <Rocket className="w-14 h-14 text-[#00f0ff] mb-6 transition-transform duration-300 group-hover:scale-110" />,
      title: "Vision-Driven Leadership",
      text: "Empowering students to lead with foresight and innovation."
    },
    {
      icon: <Handshake className="w-14 h-14 text-[#00f0ff] mb-6 transition-transform duration-300 group-hover:scale-110" />,
      title: "Collaborative Community",
      text: "A hub for peer-to-peer learning and shared growth."
    },
    {
      icon: <Mic className="w-14 h-14 text-[#00f0ff] mb-6 transition-transform duration-300 group-hover:scale-110" />,
      title: "Conference Exposure",
      text: "Opportunities to present and network at academic conferences."
    },
    {
      icon: <Microscope className="w-14 h-14 text-[#00f0ff] mb-6 transition-transform duration-300 group-hover:scale-110" />,
      title: "Dedicated Research",
      text: "Specialized teams pushing the boundaries of AI & ML."
    }
  ];

  return (
    <PageLayout>
      <section className="w-full min-h-[80vh] flex flex-col justify-center items-center py-24 relative">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12">
          {/* The Header */}
          <div className="w-full text-center mb-16">
            <h2 className="w-fit mx-auto text-center text-5xl md:text-6xl font-extrabold uppercase tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text font-['Space_Grotesk']">
              WHY JOIN US?
            </h2>
          </div>

          {/* The Massive 2x2 Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex flex-col justify-center p-10 lg:p-12 min-h-[280px] bg-white/[0.03] rounded-3xl border border-white/10 hover:-translate-y-2 hover:bg-white/[0.05] hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm group"
              >
                {card.icon}
                <h3 className="text-white font-bold text-2xl mb-4 font-['Space_Grotesk'] leading-tight">
                  {card.title}
                </h3>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
