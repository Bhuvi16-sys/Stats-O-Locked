import { motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';

export default function Contact() {
  return (
    <PageLayout title="Get In Touch" maxWidth="max-w-3xl" justify="justify-center">
      <motion.form 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="p-8 md:p-12 rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(2,11,22,0.7)] backdrop-blur-2xl shadow-[0_0_40px_rgba(0,240,255,0.03)] w-full relative overflow-hidden group hover:shadow-[0_0_50px_rgba(124,58,237,0.08)] transition-shadow duration-500"
      >
        <div className="flex flex-col gap-6 mb-8">
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-[#a78bfa] uppercase tracking-wider">Name</label>
                <input type="text" id="name" name="name" placeholder="Your Name" required className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] outline-none rounded-xl p-4 text-white placeholder-gray-500 transition-all duration-300" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-[#a78bfa] uppercase tracking-wider">Email</label>
                <input type="email" id="email" name="email" placeholder="Your Email" required className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] outline-none rounded-xl p-4 text-white placeholder-gray-500 transition-all duration-300" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-[#a78bfa] uppercase tracking-wider">Message</label>
                <textarea id="message" name="message" placeholder="Your Message" required rows="5" className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] outline-none rounded-xl p-4 text-white placeholder-gray-500 transition-all duration-300 resize-none"></textarea>
            </div>
        </div>
        <button type="submit" className="w-full btn-neon flex justify-center py-4 rounded-xl font-bold tracking-widest uppercase text-sm border-none bg-gradient-to-r from-[#7c3aed] to-[#00f0ff] hover:opacity-90 transition-opacity disabled:opacity-50 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] cursor-pointer">
            Send Message
        </button>
      </motion.form>
    </PageLayout>
  );
}
