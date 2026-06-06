import { motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';
import { Mail, Phone, MapPin, ExternalLink, Link, MessageSquare } from 'lucide-react';

export default function Contact() {
  const contactDetails = [
    {
      icon: <Mail className="w-6 h-6 text-[#00f0ff]" />,
      label: 'Email Us',
      value: 'solclub@vitbhopal.ac.in',
      href: 'mailto:solclub@vitbhopal.ac.in',
    },
    {
      icon: <Phone className="w-6 h-6 text-[#7c3aed]" />,
      label: 'Call Us',
      value: '+91 99939 45259',
      href: 'tel:+919993945259',
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#10b981]" />,
      label: 'Location',
      value: 'VIT Bhopal University',
      href: 'https://maps.google.com/?q=VIT+Bhopal+University',
    },
  ];

  return (
    <PageLayout title="Contact Us" subtitle="Get In Touch With Stats-O-Locked" maxWidth="max-w-5xl">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch mb-12">
        {/* Left Column - Contact Details */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="lg:col-span-5 flex flex-col justify-between p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-xl relative overflow-hidden"
        >
          <div style={{
            position: 'absolute',
            top: 0, left: '10%', right: '10%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)',
          }} />

          <div>
            <h3 className="text-2xl font-bold text-white mb-6 font-['Space_Grotesk'] tracking-wider uppercase">
              Club Office
            </h3>
            <p className="text-gray-400 mb-10 leading-relaxed text-sm md:text-base">
              Have questions about club inductions, collaborating on tech projects, or want to sponsor our next hackathon? Reach out and we'll reply swiftly.
            </p>

            <div className="flex flex-col gap-8">
              {contactDetails.map((detail, idx) => (
                <a 
                  key={idx}
                  href={detail.href}
                  target={detail.label === 'Location' ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="flex gap-4 items-center group text-decoration-none"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center transition-colors group-hover:bg-white/[0.06] group-hover:border-white/20">
                    {detail.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold font-['Space_Grotesk']">
                      {detail.label}
                    </span>
                    <span className="text-white font-medium text-sm md:text-base group-hover:text-[#00f0ff] transition-colors leading-snug mt-0.5">
                      {detail.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Socials section */}
          <div className="border-t border-white/10 pt-8 mt-10 lg:mt-0">
            <h4 className="text-xs text-gray-500 uppercase tracking-widest font-semibold font-['Space_Grotesk'] mb-4">
              Follow Our Journey
            </h4>
            <div className="flex gap-4">
              {[
                { 
                  icon: <ExternalLink size={16} />, 
                  label: 'Instagram', 
                  href: 'https://www.instagram.com/sol_vitb?igsh=eTQ1dGdjNTZldWhj', 
                  color: 'hover:text-[#e1306c] hover:border-[#e1306c]/40 hover:bg-[#e1306c]/10' 
                },
                { 
                  icon: <Link size={16} />, 
                  label: 'LinkedIn', 
                  href: 'https://www.linkedin.com/company/stats-o-locked-club/', 
                  color: 'hover:text-[#0077b5] hover:border-[#0077b5]/40 hover:bg-[#0077b5]/10' 
                },
              ].map((soc) => (
                <motion.a
                  key={soc.label}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-gray-400 font-medium text-xs font-['Space_Grotesk'] tracking-wider uppercase transition-all duration-300 text-decoration-none ${soc.color}`}
                >
                  {soc.icon}
                  {soc.label}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column - Message Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="lg:col-span-7"
        >
          <form 
            className="p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-xl shadow-[0_0_50px_rgba(0,240,255,0.01)] w-full relative overflow-hidden group hover:border-[#7c3aed]/30 transition-all duration-500"
          >
            <div style={{
              position: 'absolute',
              top: 0, left: '10%', right: '10%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)',
            }} />

            <h3 className="text-2xl font-bold text-white mb-6 font-['Space_Grotesk'] tracking-wider uppercase flex items-center gap-2">
              <MessageSquare className="text-[#7c3aed] w-5 h-5" />
              Send A Message
            </h3>

            <div className="flex flex-col gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-semibold text-[#a78bfa] uppercase tracking-wider font-['Space_Grotesk']">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your Name" 
                  required 
                  className="bg-white/[0.02] border border-white/10 focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] outline-none rounded-xl p-4 text-white placeholder-gray-600 transition-all duration-300 text-sm" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-semibold text-[#a78bfa] uppercase tracking-wider font-['Space_Grotesk']">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Your Email Address" 
                  required 
                  className="bg-white/[0.02] border border-white/10 focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] outline-none rounded-xl p-4 text-white placeholder-gray-600 transition-all duration-300 text-sm" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-semibold text-[#a78bfa] uppercase tracking-wider font-['Space_Grotesk']">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  placeholder="Tell us what you'd like to collaborate on..." 
                  required 
                  rows="5" 
                  className="bg-white/[0.02] border border-white/10 focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] outline-none rounded-xl p-4 text-white placeholder-gray-600 transition-all duration-300 resize-none text-sm leading-relaxed"
                ></textarea>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="w-full btn-neon flex justify-center py-4 rounded-xl font-bold tracking-widest uppercase text-xs border-none bg-gradient-to-r from-[#7c3aed] to-[#00f0ff] hover:opacity-90 transition-opacity text-white cursor-pointer shadow-[0_0_20px_rgba(124,58,237,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </PageLayout>
  );
}
