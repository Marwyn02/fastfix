/* eslint-disable react-hooks/refs */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Cpu } from 'lucide-react';

// --- ISOLATED SLIDER COMPONENT TO HANDLE ALL INDEPENDENT MOUSE EVENTS Safely ---
function ComparisonSlider({ before, after }: { before: string; after: string }) {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const localRef = React.useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!localRef.current) return;
    const rect = localRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div 
      ref={localRef}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchMove={(e) => e.touches[0] && handleMove(e.touches[0].clientX)}
      className="relative w-full aspect-[4/3] bg-zinc-900 rounded-xl overflow-hidden cursor-ew-resize border border-zinc-800/60 shadow-2xl group select-none"
    >
      {/* Image 1: After Repair Canvas (Base Layer) */}
      <img 
        src={after} 
        alt="After precision rework service" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-95"
      />
      
      {/* FIXED: Repaired success badge now fades out gracefully as the slider approaches the right edge */}
      <div 
        className="absolute bottom-4 right-4 bg-emerald-950/80 backdrop-blur border border-emerald-800/40 text-emerald-400 text-[9px] font-mono font-bold tracking-widest uppercase py-1 px-2.5 rounded shadow-lg z-20 transition-opacity duration-200"
        style={{ opacity: sliderPosition > 82 ? 0 : 1 }}
      >
        REPAIRED SUCCESS
      </div>

      {/* Image 2: Before Repair Canvas (Clipped Layer overlay) */}
      <div 
        className="absolute inset-0 w-full h-full object-cover overflow-hidden pointer-events-none z-10"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img 
          src={before} 
          alt="Before treatment" 
          className="absolute inset-0 w-full h-full object-cover max-w-none filter brightness-[0.7] contrast-120 grayscale-[30%]"
          style={{ width: localRef.current?.getBoundingClientRect().width || "100%" }}
        />
        
        {/* OPTIMIZED: Damaged badge fades out gracefully as the slider approaches the left edge */}
        <div 
          className="absolute bottom-4 left-4 bg-rose-950/90 backdrop-blur border border-rose-900/40 text-rose-400 text-[9px] font-mono font-bold tracking-widest uppercase py-1 px-2.5 rounded shadow-lg transition-opacity duration-200"
          style={{ opacity: sliderPosition < 18 ? 0 : 1 }}
        >
          DAMAGED BLOWN CIRCUIT
        </div>
      </div>

      {/* CENTRAL PARTITION SLIDER LINE BAR */}
      <div 
        className="absolute inset-y-0 w-[2px] bg-white z-30 pointer-events-none shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 bg-white rounded-full border border-zinc-950 flex items-center justify-center shadow-2xl text-zinc-900 transition-transform group-hover:scale-110">
          <div className="flex items-center gap-[2px] opacity-60">
            <div className="w-[2px] h-2.5 bg-zinc-900 rounded-full" />
            <div className="w-[2px] h-3 bg-zinc-900 rounded-full" />
            <div className="w-[2px] h-2.5 bg-zinc-900 rounded-full" />
          </div>
        </div>
      </div>

      {/* Dynamic instruction tooltip helper overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-zinc-950/70 backdrop-blur border border-zinc-800 text-zinc-400 text-[8px] font-bold tracking-[0.2em] uppercase py-1 px-3 rounded-full pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-30 whitespace-nowrap">
        Hover or Drag to compare
      </div>
    </div>
  );
}

// --- MAIN TESTIMONY RENDER MODULE ---
export default function Testimony() {
  // Shared smooth custom easing function for premium layout tracking
  const premiumCurve = [0.16, 1, 0.3, 1] as const;

  return (
    <section id='testimonials' className="w-full text-white font-sans py-24 px-4 sm:px-8 md:px-16 flex flex-col items-center bg-[#030305] overflow-hidden">
      <div className="max-w-7xl w-full">
        
        {/* --- SECTION HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: premiumCurve }}
          className="mb-20 text-center md:text-left max-w-2xl"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 font-bold mb-2">
            Proven Results
          </p>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold uppercase tracking-widest text-zinc-100 mb-1">
            Client Testimonials & Case Studies
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed tracking-wide">
            Don't replace your high-end hardware over a single failed component. See how our laboratory micro-surgery rescues dead boards and complex trace networks at a fraction of factory cost.
          </p>
        </motion.div>

        {/* --- CASCADING ALTERNATING MATRIX (1-0, 0-1, 1-0) --- */}
        <div className="space-y-16">
          
          {/* CASE 01: TEXT LEFT, IMAGE RIGHT (1-0) */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: premiumCurve }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-950/20 border border-zinc-900 rounded-2xl p-6 md:p-10 relative overflow-hidden backdrop-blur-sm"
          >
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
              </div>
              <div className="space-y-4 relative">
                <MessageSquare size={40} className="absolute -top-6 -left-4 text-zinc-950/60 pointer-events-none z-0" />
                <p className="text-sm md:text-base leading-relaxed text-zinc-300 font-light relative z-10 italic">
                  "A severe multi-rail power surge knocked out one of our primary LLM training nodes. Two RTX 4090s were completely unresponsive with dead short-circuits along the 12VHPWR rail. FastFix bypassed standard manufacturer weeks-long queues, diagnosed blown high-side MOSFETs under thermal imaging, and replaced them cleanly."
                </p>
              </div>
              <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white">David K.</div>
                  <div className="text-[10px] text-zinc-500 font-medium tracking-wide mt-0.5">Infrastructure Lead, NexusAI</div>
                </div>
                <div className="space-y-1 text-left sm:text-right">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 text-[9px] font-mono font-bold tracking-wider text-cyan-400">
                    NVIDIA RTX 4090 FE
                  </div>
                  <div className="text-[9px] text-zinc-500 uppercase tracking-widest block font-bold">12VHPWR Short-Circuit Fix</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 w-full flex items-center justify-center">
              <ComparisonSlider 
                before="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=600" 
                after="https://images.unsplash.com/photo-1601524909162-be87252be298?auto=format&fit=crop&q=80&w=800&h=600" 
              />
            </div>
          </motion.div>

          {/* CASE 02: IMAGE LEFT, TEXT RIGHT (0-1) */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: premiumCurve }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-950/20 border border-zinc-900 rounded-2xl p-6 md:p-10 relative overflow-hidden backdrop-blur-sm"
          >
            {/* Image ordered to column-1 on large screens via lg:order-first */}
            <div className="lg:col-span-7 w-full flex items-center justify-center lg:order-first order-last">
              <ComparisonSlider 
                before="https://images.unsplash.com/photo-1631553127988-34832bf26084?auto=format&fit=crop&q=80&w=800&h=600" 
                after="https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=800&h=600" 
              />
            </div>
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
              </div>
              <div className="space-y-4 relative">
                <MessageSquare size={40} className="absolute -top-6 -left-4 text-zinc-950/60 pointer-events-none z-0" />
                <p className="text-sm md:text-base leading-relaxed text-zinc-300 font-light relative z-10 italic">
                  "During a workstation relocation, our rendering card suffered structural damage, tearing critical data traces clean off the PCIe connector footprint. Other shops told us a cracked PCB was unfixable trash. FastFix spent hours under a microscope micro-stitching structural wire jumpers back to the traces."
                </p>
              </div>
              <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white">Elena R.</div>
                  <div className="text-[10px] text-zinc-500 font-medium tracking-wide mt-0.5">Studio Director, Chroma VFX</div>
                </div>
                <div className="space-y-1 text-left sm:text-right">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono font-bold tracking-wider text-cyan-400">
                    <Cpu size={10} /> MSI RTX 4080
                  </div>
                  <div className="text-[9px] text-zinc-500 uppercase tracking-widest block font-bold">PCIe Broken Trace Stitching</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CASE 03: TEXT LEFT, IMAGE RIGHT (1-0) */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: premiumCurve }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-950/20 border border-zinc-900 rounded-2xl p-6 md:p-10 relative overflow-hidden backdrop-blur-sm"
          >
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
              </div>
              <div className="space-y-4 relative">
                <MessageSquare size={40} className="absolute -top-6 -left-4 text-zinc-950/60 pointer-events-none z-0" />
                <p className="text-sm md:text-base leading-relaxed text-zinc-300 font-light relative z-10 italic">
                  "My system started hard-crashing to a black screen every single time the card hit 70°C under heavy rendering. FastFix tracked down the issue to thermal expansion stress fracturing the solder balls underneath the VRAM modules. They ran the card through a full automated BGA reballing cycle."
                </p>
              </div>
              <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white">Julius M.</div>
                  <div className="text-[10px] text-zinc-500 font-medium tracking-wide mt-0.5">Competitive Content Creator</div>
                </div>
                <div className="space-y-1 text-left sm:text-right">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono font-bold tracking-wider text-cyan-400">
                    <Cpu size={10} /> EVGA RTX 3090
                  </div>
                  <div className="text-[9px] text-zinc-500 uppercase tracking-widest block font-bold">VRAM BGA Reballing</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 w-full flex items-center justify-center">
              <ComparisonSlider 
                before="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800&h=600" 
                after="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=600" 
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}