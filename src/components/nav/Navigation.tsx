import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'glass-strong py-3' : 'py-6 md:py-8'
      }`}
    >
      {/* CHANGED: Adjusted horizontal padding (px-4 on mobile, px-6 on small tabs, px-0 on standard desktop)
        to make sure elements don't hug or clip the glass display edges on narrow viewports.
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-0 flex items-center justify-between gap-4">
        
        {/* LEFT SIDE: BRAND LOGO WITH TRANSPARENT IMAGE ICON */}
        <div className="flex justify-start shrink-0">
          <Link to="/" className="flex items-center gap-2 md:gap-3 text-foreground group" data-hover>
            {/* Embedded Inline Logo Icon */}
            <div className="w-5 h-5 md:w-6 md:h-6 shrink-0 overflow-hidden flex items-center justify-center">
              <img 
                src="/image/fastfix-transparent.png" 
                alt="FastFix Logo" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(56,189,248,0.25)] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            {/* Branding Text Matrix */}
            <div className="flex items-center gap-2 md:gap-3">
              <span className="font-heading text-xs md:text-sm font-semibold tracking-[0.2em] whitespace-nowrap">
                FAST FIX
              </span>
              {/* CHANGED: Swapped border-l assignment to 'hidden sm:inline-block' so it hides completely on mobile */}
              <span className="hidden sm:inline-block text-[8px] uppercase tracking-[0.15em] text-zinc-600 font-medium border-l border-zinc-800 pl-2 md:pl-3 whitespace-nowrap">
                GADGET REPAIR
              </span>
            </div>
          </Link>
        </div>

        {/* RIGHT SIDE: UNIFIED CONTACT CHANNELS */}
        {/* CHANGED: Forced 'flex-row' layout on mobile with an optimized gap structure (gap-3 on mobile, scaling up to gap-8). 
          This ensures phone numbers and email tags run side-by-side without overflowing or wrapping.
        */}
        <div className="flex flex-row items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 justify-end text-right font-mono tracking-wider overflow-hidden">
          {/* Phone Channel */}
          <a 
            href="tel:+639192319278" 
            className="text-[10px] md:text-[11px] text-zinc-300 hover:text-white transition-colors whitespace-nowrap"
          >
            +63 919 231 9278
          </a>

          {/* Editorial Divider (Visible on mobile too now to balance the horizontal flow nicely) */}
          <span className="text-zinc-800 select-none text-[10px] md:text-sm">|</span>

          {/* Email Channel */}
          <a 
            href="mailto:support@fastfixgadgetrepair.com" 
            className="text-[9px] md:text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors whitespace-nowrap"
          >
            support@fastfixgadgetrepair.com
          </a>
        </div>

      </div>
    </motion.nav>
  );
}