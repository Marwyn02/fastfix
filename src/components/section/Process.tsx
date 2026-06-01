/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Microscope, ClipboardCheck, Cpu, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface TimelineStep {
  id: number;
  stepNum: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: React.ComponentType<any>;
  highlightDetails: string[];
}

export default function Process() {
  const [expandedStep, setExpandedStep] = useState<number>(1);

  const steps: TimelineStep[] = [
    {
      id: 1,
      stepNum: "01",
      title: "Inspection & Diagnosis",
      shortDesc: "Unveiling hidden anomalies under thermal scopes.",
      longDesc: "Your graphics card doesn't just get guessed at. We mount it under high-resolution thermal imaging cameras and inject micro-voltage to see exactly where electricity is bottlenecking or short-circuiting. Dead silicon stands no chance against pure scientific evaluation.",
      icon: ClipboardCheck,
      highlightDetails: ["Thermal Map Diagnostics", "Micro-Voltage Rail Testing", "No-Obligation Baseline Analysis"]
    },
    {
      id: 2,
      stepNum: "02",
      title: "Detailed Findings",
      shortDesc: "Complete structural transparency before a single solder melts.",
      longDesc: "We provide an unedited microscopic photographic report detailing the exact failure point—whether it's a cracked solder ball, a blown mosfet, or shorted VRAM modules. You receive an itemized, exact quote with absolute clarity, giving you total control.",
      icon: Microscope,
      highlightDetails: ["Microscopic Image Reports", "Itemized Fixed-Rate Estimates", "Zero Hidden Lab Fees"]
    },
    {
      id: 3,
      stepNum: "03",
      title: "Repair & Testing",
      shortDesc: "Board-level micro-surgery with commercial-grade tooling.",
      longDesc: "Using state-of-the-art automated BGA rework stations and precision hot air profiles, our master technicians desolder compromised parts and mount OEM-grade replacements. This is surgical intervention to give your factory card a new lease on life.",
      icon: Cpu,
      highlightDetails: ["Micro-Soldering & BGA Reballing", "OEM-Grade Replacement Components", "Trace & Circuit Reconstruction"]
    },
    {
      id: 4,
      stepNum: "04",
      title: "Quality Assurance",
      shortDesc: "Surviving the stress test gauntlet before signoff.",
      longDesc: "A fix isn't a fix until it handles extreme loads. We subject your repaired GPU to an intensive 24-hour burn-in loop, monitoring thermal deltas, frame pacing, and VRAM stability using heavy production benchmarks to ensure structural performance.",
      icon: CheckCircle2,
      highlightDetails: ["24-Hour Continuous Burn-In", "Thermal Delta Validation", "Frame-Pacing Stability Check"]
    },
    {
      id: 5,
      stepNum: "05",
      title: "Customer Pickup",
      shortDesc: "Handed back clean, protected, and fully weaponized.",
      longDesc: "Your card returns home fully detailed, fitted with premium phase-change thermal materials, and securely packaged inside an ESD-safe protective sleeve. Complete with a comprehensive warranty backing, it arrives ready to slide back into your rig.",
      icon: ShieldCheck,
      highlightDetails: ["Premium Thermal Paste Upgrade", "ESD-Safe Anti-Static Packaging", "90-Day Comprehensive Warranty"]
    }
  ];

  return (
    <section id='process' className="w-full bg-[#030305] text-white font-sans py-24 px-4 sm:px-8 md:px-16 border-t border-zinc-900 flex flex-col items-center overflow-hidden">
      
      {/* --- TIMELINE HEADER --- */}
      <div className="max-w-7xl w-full mb-20 text-center md:text-left">
        <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 font-bold mb-2">
          How We Work
        </p>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold uppercase tracking-widest text-zinc-100 mb-1">
          Our Repair Process
        </h2>
        <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed tracking-wide max-w-2xl">
          From the moment your card hits our bench to the final stress-test validation, your hardware undergoes rigorous, microscopic diagnostic and repair phases. Transparent reporting, no hidden lab fees, and zero obligation to proceed.
        </p>
      </div>

      {/* --- ACCORDION EXPANDING TIMELINE WRAPPER --- */}
      <div className="max-w-7xl w-full flex flex-col lg:flex-row h-auto lg:h-[520px] gap-3 items-stretch relative">
        {steps.map((step) => {
        //   const IconComponent = step.icon;
          const isExpanded = expandedStep === step.id;

          return (
            <motion.div
              key={step.id}
              onClick={() => setExpandedStep(step.id)}
              onMouseEnter={() => {
                if (window.innerWidth >= 1024) setExpandedStep(step.id);
              }}
              animate={{ 
                flexGrow: isExpanded ? 6 : 1,
              }}
              // Custom Apple/Framer style natural spring curve for the layout box expansion
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className={`relative cursor-pointer overflow-hidden border border-zinc-900 rounded-xl p-6 md:p-8 flex flex-col justify-between transition-colors duration-300 group select-none min-h-[180px] lg:min-h-full ${
                isExpanded ? 'bg-[#f4f1eb] text-zinc-900 border-transparent shadow-2xl' : 'bg-zinc-950/40 text-white hover:border-zinc-800'
              }`}
              style={{ flexBasis: '0%' }}
            >
              
              {/* UPPER SECTION: Icon & Numeric Identifier */}
              <div className="flex justify-between items-center w-full shrink-0 z-10 gap-2">
                {/* <div className={`p-2.5 rounded-lg border transition-colors ${
                  isExpanded ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-900/60 border-zinc-800 text-zinc-400'
                }`}>
                  <IconComponent size={20} className="stroke-[1.5]" />
                </div> */}
                <span className={`text-xs font-mono font-bold tracking-widest transition-colors ${
                  isExpanded ? 'text-zinc-500' : 'text-zinc-700 group-hover:text-zinc-500'
                }`}>
                  PHASE {step.stepNum}
                </span>
              </div>

              {/* LOWER CONTENT BLOCK: Hard-locked to the absolute bottom bounds */}
              <div className="mt-auto pt-6 flex flex-col justify-end relative z-10 min-h-[100px]">
                
                {/* Titles Area (Stays 100% stationary) */}
                <div className="mb-2">
                  <h3 className={`text-base md:text-lg font-bold uppercase tracking-tight transition-colors whitespace-nowrap ${
                    isExpanded ? 'text-zinc-900' : 'text-zinc-100'
                  }`}>
                    {step.title}
                  </h3>
                  
                  {/* Small short description for closed items */}
                  <div className="h-4 relative mt-0.5 overflow-hidden">
                    {!isExpanded && (
                      <p className="text-[11px] text-zinc-500 line-clamp-1 font-light absolute top-0 left-0 w-full">
                        {step.shortDesc}
                      </p>
                    )}
                  </div>
                </div>

                {/* Smooth Drawer Slide Description Reveal */}
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ 
                          duration: 0.4, 
                          ease: [0.215, 0.610, 0.355, 1.000], // Smooth cubic-decelerate out 
                          delay: 0.15 
                        }}
                        className="space-y-4"
                      >
                        <p className="text-xs md:text-sm leading-relaxed text-zinc-700 font-normal max-w-xl">
                          {step.longDesc}
                        </p>

                        {/* Bullet Highlights Track */}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 pt-3 border-t border-zinc-300/60">
                          {step.highlightDetails.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-[10px] font-bold tracking-wide uppercase text-zinc-900 whitespace-nowrap">
                              <ArrowRight size={11} className="text-zinc-400 shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Decorative Subtle Background Line Separators */}
              {!isExpanded && (
                <div className="hidden lg:block absolute bottom-12 right-0 w-[1px] h-16 bg-gradient-to-b from-transparent via-zinc-800 to-transparent pointer-events-none" />
              )}

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}