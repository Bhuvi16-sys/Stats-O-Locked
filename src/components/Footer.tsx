import { motion, type Variants } from "framer-motion";
import {
  Mail,
  Phone,
  Instagram,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────────────────────

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// ─────────────────────────────────────────────────────────────
// Footer Component
// ─────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <section
      id="contact"
      className="relative py-32 border-t border-white/5 bg-[#050505] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#3DDC84]/5 blur-[180px] pointer-events-none" />

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Animated Scan Line */}
      <motion.div
        animate={{ y: ["0%", "100%"] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3DDC84]/30 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-20"
        >
          {/* LEFT SIDE */}
          <motion.div variants={item}>
            {/* Section Number */}
            <div className="w-8 h-8 rounded-full border border-[#3DDC84] flex items-center justify-center text-[10px] font-black text-[#3DDC84] mb-8">
              05
            </div>

            {/* Heading */}
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              THE
              <br />
              CONNECTION
            </h2>

            <p className="text-lg opacity-40 font-medium max-w-xl uppercase tracking-wider leading-relaxed mb-16">
              Reach out for collaborations, queries, or partnership
              protocols.
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-white/5 mb-14" />

            {/* Contact Cards */}
            <div className="space-y-8">
              {/* Email */}
              <motion.div
                whileHover={{ x: 8 }}
                className="group flex gap-6 items-center"
              >
                <div className="relative w-16 h-16 bg-[#111111] rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-[#3DDC84]/40 transition-all duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-[#3DDC84]/0 group-hover:bg-[#3DDC84]/10 transition-all duration-500" />

                  <Mail className="w-6 h-6 text-[#3DDC84]" />
                </div>

                <div>
                  <h5 className="text-[10px] font-black text-[#3DDC84] uppercase tracking-[0.4em] mb-2">
                    Email Protocol
                  </h5>

                  <p className="text-xl md:text-2xl font-black tracking-tight group-hover:text-[#3DDC84] transition-colors duration-300">
                    solclub@vitbhopal.ac.in
                  </p>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                whileHover={{ x: 8 }}
                className="group flex gap-6 items-center"
              >
                <div className="relative w-16 h-16 bg-[#111111] rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-[#3DDC84]/40 transition-all duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-[#3DDC84]/0 group-hover:bg-[#3DDC84]/10 transition-all duration-500" />

                  <Phone className="w-6 h-6 text-[#3DDC84]" />
                </div>

                <div>
                  <h5 className="text-[10px] font-black text-[#3DDC84] uppercase tracking-[0.4em] mb-2">
                    Direct Comms
                  </h5>

                  <p className="text-xl md:text-2xl font-black tracking-tight group-hover:text-[#3DDC84] transition-colors duration-300">
                    +91 99939 45259
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            variants={item}
            className="flex flex-col justify-end gap-10"
          >
            {/* Social Card */}
            <motion.div
              whileHover={{ y: -6 }}
              className="relative bg-[#0d0d0d] border border-white/5 rounded-[40px] p-12 overflow-hidden group"
            >
              {/* Glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#3DDC84]/10 blur-3xl rounded-full group-hover:bg-[#3DDC84]/20 transition-all duration-700" />

              {/* Moving line */}
              <motion.div
                animate={{ x: ["-100%", "250%"] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-[#3DDC84] to-transparent opacity-60"
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <h4 className="text-2xl font-black uppercase tracking-tight">
                    Pulse Matrix
                  </h4>

                  <ArrowUpRight className="w-5 h-5 text-[#3DDC84] opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>

                {/* Social Icons */}
                <div className="flex gap-6">
  {/* Instagram */}
  <motion.a
    whileHover={{ scale: 1.15, y: -3 }}
    href="#"
    className="group w-14 h-14 rounded-2xl bg-[#111111] border border-white/5 flex items-center justify-center transition-all duration-300 hover:border-pink-500/40 hover:shadow-[0_0_25px_rgba(236,72,153,0.25)]"
  >
    <Instagram className="w-6 h-6 text-white/50 transition-all duration-300 group-hover:text-pink-500 group-hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
  </motion.a>

  {/* LinkedIn */}
  <motion.a
    whileHover={{ scale: 1.15, y: -3 }}
    href="#"
    className="group w-14 h-14 rounded-2xl bg-[#111111] border border-white/5 flex items-center justify-center transition-all duration-300 hover:border-sky-500/40 hover:shadow-[0_0_25px_rgba(14,165,233,0.25)]"
  >
    <Linkedin className="w-6 h-6 text-white/50 transition-all duration-300 group-hover:text-sky-400 group-hover:drop-shadow-[0_0_10px_rgba(14,165,233,0.8)]" />
  </motion.a>
</div>

                {/* Status */}
                <div className="mt-12 flex items-center gap-3">
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="w-2 h-2 rounded-full bg-[#3DDC84]"
                  />

                  <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">
                    Network Active
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Footer Bottom */}
            <motion.footer
              variants={item}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 leading-relaxed">
                © 2026 STATS-O-LOCKED // ALL RIGHTS RESERVED // VIT BHOPAL
              </p>

              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="text-[9px] uppercase tracking-[0.4em] text-[#3DDC84]"
              >
                System Online
              </motion.div>
            </motion.footer>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}