import { useEffect, useState, useRef } from "react";
import { motion } from 'framer-motion';

// --- POOLS OF ROTATING TECH PHRASES ---
const LEFT_PHRASES = [
  "REVIVE THE DEAD SILICON",
  "BOARD LEVEL DIAGNOSTICS",
  "MICRO SOLDERING LAB"
];

const RIGHT_PHRASES = [
  "MAXIMIZE YOUR FRAMES",
  "COMPONENT PRECISION",
  "ZERO SYSTEM DEGRADATION"
];

// --- SCRAMBLE HOOK ---
function useTextScramble(phrases: string[], intervalTime = 10000) {
  const [displayText, setDisplayText] = useState(phrases[0]);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#@*&%+=-";
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    let phaseIndex = 0;

    const triggerScramble = (targetText: string) => {
      let frame = 0;
      const totalFrames = 60; 
      
      const updateText = () => {
        if (frame >= totalFrames) {
          setDisplayText(targetText);
          return;
        }

        const progress = frame / totalFrames;
        const scrambled = targetText
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i / targetText.length < progress) return targetText[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        setDisplayText(scrambled);
        frame++;
        frameRef.current = requestAnimationFrame(updateText);
      };

      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(updateText);
    };

    const timer = setInterval(() => {
      phaseIndex = (phaseIndex + 1) % phrases.length;
      triggerScramble(phrases[phaseIndex]);
    }, intervalTime);

    return () => {
      clearInterval(timer);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [phrases, intervalTime]);

  return displayText;
}

export default function HeroSection() {
  const leftScrambledText = useTextScramble(LEFT_PHRASES, 10000);
  const rightScrambledText = useTextScramble(RIGHT_PHRASES, 10000);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050508] text-white font-sans flex flex-col justify-between p-6 md:p-10 select-none">
      
      {/* --- BACKGROUND GRAPHICS & VECTOR GLOW STACK --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Top left cool/blue flare */}
        <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-blue-900/20 via-indigo-950/10 to-transparent blur-[120px] transform -rotate-12 animate-[pulse_8s_infinite_alternate]" />
        
        {/* Center-left warm copper bokeh */}
        <div className="absolute top-[30%] -left-[15%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-amber-900/15 via-orange-950/5 to-transparent blur-[100px] animate-[pulse_6s_infinite_alternate_2s]" />
        
        {/* Right side subtle warm glow */}
        <div className="absolute top-[10%] -right-[10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-l from-zinc-800/20 via-stone-950/5 to-transparent blur-[90px]" />
        
        {/* --- PURE CSS ABSTRACT 3D HARDWARE CORE LAYER --- */}
        <div className="absolute inset-0 flex items-center justify-center [perspective:1000px]">
          <motion.div 
            initial={{ opacity: 0, rotateX: 60, rotateZ: -25, y: 50, scale: 0.9 }}
            animate={{ opacity: 0.25, rotateX: 52, rotateZ: -32, y: 0, scale: 1 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[500px] h-[500px] border border-zinc-800/40 rounded-2xl p-6 flex items-center justify-center bg-zinc-950/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            {/* Inner PCB trace rings */}
            <div className="absolute inset-4 border border-zinc-800/30 rounded-xl" />
            <div className="absolute inset-12 border border-zinc-800/20 border-dashed rounded-lg" />
            
            {/* Center Die / Silicon Interposer Core */}
            <div className="w-48 h-48 rounded-md bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border-2 border-zinc-700/50 relative flex items-center justify-center shadow-2xl">
              {/* Shimmering Core Mirror Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/5 to-amber-500/5 rounded-md" />
              
              {/* Surrounding VRAM Grid Accents */}
              <div className="absolute -top-10 left-4 w-8 h-6 border border-zinc-800 bg-zinc-900/50 rounded-sm" />
              <div className="absolute -top-10 left-16 w-8 h-6 border border-zinc-800 bg-zinc-900/50 rounded-sm" />
              <div className="absolute -top-10 left-28 w-8 h-6 border border-zinc-800 bg-zinc-900/50 rounded-sm" />
              
              <div className="absolute -bottom-10 left-4 w-8 h-6 border border-zinc-800 bg-zinc-900/50 rounded-sm" />
              <div className="absolute -bottom-10 left-16 w-8 h-6 border border-zinc-800 bg-zinc-900/50 rounded-sm" />
              <div className="absolute -bottom-10 left-28 w-8 h-6 border border-zinc-800 bg-zinc-900/50 rounded-sm" />

              <div className="absolute -left-10 top-4 w-6 h-8 border border-zinc-800 bg-zinc-900/50 rounded-sm" />
              <div className="absolute -left-10 top-16 w-6 h-8 border border-zinc-800 bg-zinc-900/50 rounded-sm" />
              
              <div className="absolute -right-10 top-4 w-6 h-8 border border-zinc-800 bg-zinc-900/50 rounded-sm" />
              <div className="absolute -right-10 top-16 w-6 h-8 border border-zinc-800 bg-zinc-900/50 rounded-sm" />

              {/* Laser Engraved Core Crosshair */}
              <div className="w-12 h-12 border border-zinc-800/80 rounded-sm relative opacity-60">
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-zinc-800" />
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-zinc-800" />
              </div>
            </div>

            {/* Subtle light reflection sweep passing over the silicon matrix */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/5 to-transparent -translate-x-full animate-[shimmer_8s_infinite]" />
          </motion.div>
        </div>

        {/* Fine digital grain overlay to give it that premium cinematic texture */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZHRoPSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii41Ii8+Cjwvc3ZnPg==')] bg-repeat" />
      </div>

      {/* --- MAIN CENTER HERO CONTENT --- */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-grow py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          {/* --- LOGO IMAGE CONTAINER --- */}
          <div className="relative w-28 h-28 mb-4 flex items-center justify-center">
            <img 
              src="/image/fastfix-transparent.png" 
              alt="FastFix Gadget Repair Logo" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(56,189,248,0.2)]" 
            />
          </div>

          {/* Business Name */}
          <h1 className="text-3xl md:text-4xl font-black tracking-[0.4em] uppercase text-white mb-2 pl-[0.4em]">
            Fast Fix
          </h1>
          <p className="text-[10px] md:text-xs font-light tracking-[0.6em] uppercase text-zinc-400 pl-[0.6em]">
            Gadget Repair
          </p>
        </motion.div>

        {/* --- SCRAMBLE FLANKING TYPOGRAPHY --- */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full hidden md:flex justify-between items-center px-6 pointer-events-none text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-mono">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="whitespace-nowrap"
          >
            {leftScrambledText}
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="whitespace-nowrap"
          >
            {rightScrambledText}
          </motion.span>
        </div>
      </main>

      {/* --- FOOTER CALL TO ACTION --- */}
      <footer className="relative z-10 w-full flex flex-col items-center text-center pb-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="max-w-xs md:max-w-md"
        >
          <p className="text-[11px] md:text-xs tracking-[0.2em] uppercase leading-relaxed text-zinc-400">
            High-tier graphics card & console micro-soldering. 
          </p>
          <motion.button
            whileHover={{ y: -2 }}
            className="mt-3 text-[10px] tracking-[0.25em] uppercase text-white font-semibold underline underline-offset-8 decoration-zinc-600 hover:decoration-white transition-colors duration-300"
          >
            <a href="#contact">Book a Repair Now</a>
          </motion.button>
        </motion.div>
      </footer>
    </div>
  );
}