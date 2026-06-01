import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface MetricItem {
  value: string;
  label: string;
}

export default function Metrics() {
  const metrics: MetricItem[] = [
    {
      value: "4,850+",
      label: "GPUs Revived"
    },
    {
      value: "94.2%",
      label: "Success Rate"
    },
    {
      value: "4.9 / 5",
      label: "Google & FB Reviews"
    },
    {
      value: "99.1%",
      label: "Happy Customers"
    }
  ];

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Entry animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  } as const;

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[450px]">
      
      {/* --- LEFT SIDE: EDITORIAL CONTENT PANEL --- */}
      <div className="lg:col-span-5 bg-[#f4f1eb] text-zinc-900 flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:p-20">
        <div className="max-w-md space-y-6">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight text-zinc-900">
            Providing Elite Component-Level Hardware Solutions
          </h2>
          <p className="text-xs text-zinc-600 leading-relaxed font-light tracking-wide">
            Our specialized laboratory deals exclusively with precision micro-soldering, complex trace reconstruction, and dedicated BGA reballing procedures. We don't just swap components out; we target faulty silicon directly under diagnostic microscopes to rescue your existing hardware assets.
          </p>
          <div className="pt-2">
            <a 
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-900 hover:text-zinc-600 transition-colors group"
            >
              Book A Diagnostic <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: HIGH-CONTRAST DATA BLOCK --- */}
      <div className="lg:col-span-7 bg-[#0b0c10] text-white flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:p-20 relative overflow-hidden border-t lg:border-t-0 lg:border-l border-zinc-900">
        
        {/* Subtle cyan laboratory ambient background light glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-xl w-full relative z-10">
          <p className="text-[9px] font-black font-bold tracking-[0.3em] uppercase text-cyan-400 mb-10">
            Let's Numbers Talk
          </p>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 gap-x-8 gap-y-12"
          >
            {metrics.map((metric, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="space-y-1.5"
              >
                {/* Clean, massive data numbers without standard math/prose formatting conflicts */}
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white font-sans">
                  {metric.value}
                </div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-400">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}