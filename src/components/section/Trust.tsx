import { motion } from 'framer-motion';

interface TrustFeature {
  title: string;
  description: string;
}

export default function Trust() {
  const features: TrustFeature[] = [
    {
      title: "Component-Level Precision",
      description: "We don't just swap whole boards. Our lab specializes in microscopic BGA reballing, trace repairs, and replacing individual faulty mosfets or VRAM modules to save your original card."
    },
    {
      title: "Fast-Turnaround Diagnostic",
      description: "Dead silicon shouldn't keep you out of the game. Our streamlined intake process ensures your graphics card hits the diagnostic bench within 24–48 hours of arriving at our lab."
    },
    {
      title: "90-Day Warranty Backing",
      description: "Every micro-soldering fix, trace repair, and component replacement we perform is covered by a comprehensive warranty. If the exact same issue arises, we fix it under warranty—no questions asked."
    },
    {
      title: "No Fix, No Fee Guarantee",
      description: "We keep it simple: if your GPU is fundamentally unrepairable due to a cracked core or irreversible substrate damage, you don't pay a dime for the repair labor. Simple, transparent, risk-free."
    },
    {
      title: "OEM-Grade Replacement Parts",
      description: "We strictly source original or premium manufacturer-grade components, high-thermal conductivity pads, and phase-change materials to ensure your GPU runs cooler and longer than before."
    },
    {
      title: "Certified Master Technicians",
      description: "Your high-end hardware is handled exclusively by engineers trained in ESD-safe environments with commercial-grade hot air stations, digital microscopes, and precision thermal imaging cameras."
    },
    {
      title: "Transparent Photo Updates",
      description: "Trust is built through transparency. Get high-resolution microscopic photo insights of the exact blown component or successful repair on your customer dashboard as we work on it."
    }
  ];

  // --- ANIMATION CONFIGURATION ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, 
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 25 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.610, 0.355, 1.000]
      }
    }
  } as const;

  return (
    <section className="w-full bg-[#f4f1eb] text-zinc-900 py-20 px-6 md:px-16 lg:px-32 border-t border-zinc-300">
      <div className="max-w-7xl mx-auto">
        
        {/* --- MAIN SECTION HEADER --- */}
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-3xl font-black uppercase tracking-widest text-zinc-900 mb-16"
        >
          Why choose FastFix?
        </motion.h2>

        {/* --- GRID LAYOUT WITH ANIMATION --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
        >
          {features.map((feature, index) => {
            // Generates a zero-padded string layout index: 01, 02, 03, etc.
            const countDisplay = String(index + 1).padStart(2, '0');

            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="flex flex-col pt-4 border-t border-zinc-400/70 group"
              >
                {/* Visual Label Counter Segment */}
                <span className="text-[10px] font-mono tracking-widest font-bold text-zinc-400 mb-3 block select-none">
                  {countDisplay}
                </span>

                {/* Header block with Title */}
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-sm font-black tracking-wide text-zinc-900">
                    {feature.title}
                  </h3>
                </div>

                {/* Descriptive Copy Block */}
                <p className="text-xs text-zinc-600 leading-relaxed tracking-wide font-normal">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}