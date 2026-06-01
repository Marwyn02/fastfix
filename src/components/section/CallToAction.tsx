import { motion } from 'framer-motion';

export default function CallToAction() {
  const premiumCurve = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="w-full bg-[#030305] text-white font-sans py-32 px-4 sm:px-8 md:px-16 border-t border-zinc-900 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* --- SUBTLE BACKGROUND LAB RADIANCE --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl w-full text-center flex flex-col items-center relative z-10">
        
        {/* --- EDITORIAL HEADLINE (SERIF) --- */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: premiumCurve }}
          className="text-4xl sm:text-5xl md:text-6xl font-heading font-semibold tracking-tight text-zinc-100 max-w-3xl leading-[1.15]"
        >
          Need Your Graphics Card Repaired?
        </motion.h2>

        {/* --- SUPPORTING TEXT --- */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: premiumCurve }}
          className="text-sm md:text-base text-zinc-400 font-light max-w-xl mt-6 mb-12 leading-relaxed tracking-wide"
        >
          Get professional diagnostics and repair from specialists you can trust. Stop staring at a black screen—let our laboratory engineering team bring your hardware back to life.
        </motion.p>

        {/* --- MINIMALIST ELEVATED CTA BUTTON --- */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: premiumCurve }}
        >
         <motion.button
            whileHover={{ y: -2 }}
            className="mt-3 text-[10px] tracking-[0.25em] uppercase text-white font-semibold underline underline-offset-8 decoration-zinc-600 hover:decoration-white transition-colors duration-300"
          >
           <a href="#contact">Book repair today</a>
          </motion.button>
        </motion.div>

        {/* --- TRUST FOOTER METRICS --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 mt-20 pt-8 border-t border-zinc-900 w-full max-w-2xl text-left sm:text-center"
        >
          <div className="flex sm:flex-col items-center sm:justify-center gap-3 sm:gap-1.5">
 
            <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-medium">90-Day Warranty</span>
          </div>
          <div className="flex sm:flex-col items-center sm:justify-center gap-3 sm:gap-1.5">
      
            <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-medium">24-Hr Stress Testing</span>
          </div>
          <div className="flex sm:flex-col items-center sm:justify-center gap-3 sm:gap-1.5">
       
            <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-medium">No Fix, No Fee</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}