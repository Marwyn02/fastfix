/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState<any>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  // State to track circular fill progress (0 to 100)
  const [hoverProgress, setHoverProgress] = useState<number>(0);

  const requestRef = useRef<any>(null);
  const progressIntervalRef = useRef<any>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.15;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.15;
      setPosition({ x: currentRef.current.x, y: currentRef.current.y });
      requestRef.current = requestAnimationFrame(animate);
    };

    const addHoverListeners = () => {
      const hoverElements = document.querySelectorAll('a, button, [data-hover]');
      hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    requestRef.current = requestAnimationFrame(animate);

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(requestRef.current);
      observer.disconnect();
    };
  }, [isVisible]);

  // Handle loading bar progression loop when hovering changes
  useEffect(() => {
    if (isHovering) {
      // Clear any leftover interval
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      
      const speedMs = 16; // Total fill time is roughly ~600ms. Adjust lower for faster, higher for slower.
      
      progressIntervalRef.current = setInterval(() => {
        setHoverProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressIntervalRef.current);
            return 100; // Freeze at full circle
          }
          return prev + 1;
        });
      }, speedMs);
    } else {
      // Immediately clear loop and reset progress track on exit
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setHoverProgress(0);
    }

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isHovering]);

  // Hide on mobile/touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  // Circle geometry formulas for SVG ring stroke
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (hoverProgress / 100) * circumference;

  return (
    <>
      {/* Outer Ring & Progress SVG */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - (isHovering ? 24 : 10),
          y: position.y - (isHovering ? 24 : 10),
          width: isHovering ? 48 : 20,
          height: isHovering ? 48 : 20,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        <div
          className="w-full h-full rounded-full border border-white/30 relative transition-all duration-300 flex items-center justify-center"
          style={{
            background: isHovering ? 'rgba(255,255,255,0.08)' : 'transparent',
            boxShadow: isHovering ? '0 0 20px rgba(255,255,255,0.1)' : 'none',
            backdropFilter: isHovering ? 'blur(4px)' : 'none',
          }}
        >
          {/* Circular SVG Progress Loader */}
          {isHovering && (
            <svg className="absolute top-0 left-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-white fill-none transition-all ease-out"
                strokeWidth="2"
                strokeDasharray={circumference}
                style={{
                  strokeDashoffset: strokeDashoffset,
                  transitionDuration: '16ms' // Matches tight loop frames smoothly
                }}
              />
            </svg>
          )}
        </div>
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{ duration: 0.05 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </motion.div>
    </>
  );
}