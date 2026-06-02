import { useEffect, useState, useRef } from "react";
import { motion } from 'framer-motion';

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

      {/* --- BACKGROUND VIDEO LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true" // Extra safety rule for older iOS webviews
          preload="auto"
          className="w-full h-full object-cover select-none"
        >
          {/* Ensure your file is named exactly 'repair-bg.mp4' and placed inside /public/video/ */}
          <source src="/video/repair-bg.mp4" type="video/mp4" />
        </video>

        {/* High-contrast dark layer so your text and UI elements stand out */}
        <div className="absolute inset-0 bg-[#050508]/75 backdrop-blur-[1px]" />

        {/* Ambient illumination overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-amber-950/15 mix-blend-screen" />

        {/* Digital display grain texture */}
        <div className="absolute inset-0 opacity-[0.012] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZHRoPSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii41Ii8+Cjwvc3ZnPg==')] bg-repeat" />
      </div>

      {/* --- MAIN CENTER HERO CONTENT --- */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-grow py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          {/* Logo */}
          <div className="relative w-28 h-28 mb-4 flex items-center justify-center">
            <img
              src="/image/fastfix-transparent.png"
              alt="FastFix Gadget Repair Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]"
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