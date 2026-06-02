import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import LegalDocuments from '../LegalDocuments';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);

  return (
    <footer className="w-full bg-[#030305] text-zinc-500 font-sans pt-24 pb-12 px-4 sm:px-8 md:px-16 border-t border-zinc-900 flex flex-col items-center overflow-hidden">
      <div className="max-w-7xl w-full flex flex-col">
        
        {/* --- UPPER SECTION: BRAND & MATRIX NAVIGATION --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 items-start">
          
          {/* Brand & Mission Statement */}
          <div className="md:col-span-5 space-y-4">
           <div className="flex items-center gap-3 text-zinc-100 group">
  {/* Embedded Front Logo Icon */}
  <div className="w-6 h-6 shrink-0 overflow-hidden flex items-center justify-center">
    <img 
      src="/image/fastfix-transparent.png" 
      alt="FastFix Logo" 
      className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(56,189,248,0.25)] transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  {/* Business Title Segment */}
  <span className="font-black text-lg tracking-wide select-none">
    Fast Fix Gadget Repair
  </span>
</div>
            <p className="text-xs text-zinc-500 font-light leading-relaxed max-w-sm tracking-wide">
              Laboratory micro-surgery and board-level component rework for high-end graphics architecture. Restoring complex electrical traces to factory specification.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400">Laboratory</h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li><a href="#process" className="hover:text-zinc-200 transition-colors tracking-wide">Our Process</a></li>
              <li><a href="#testimonials" className="hover:text-zinc-200 transition-colors tracking-wide">Case Studies</a></li>
              <li><a href="#faq" className="hover:text-zinc-200 transition-colors tracking-wide">Support Desk</a></li>
            </ul>
          </div>

          {/* Systems Status / Info Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400">Intake Desk</h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li className="flex items-center gap-2 text-zinc-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="tracking-wide">Lab Queue: Operational (24-48hr Diagnosis)</span>
              </li>
              <li>
                <span className="text-zinc-600 tracking-wide">Mon – Fri / 09:00 – 18:00 PHT</span>
              </li>
            </ul>
          </div>

        </div>

        {/* --- EDITORIAL SEPARATOR RULE --- */}
        <div className="w-full border-t border-zinc-900/80" />

        {/* --- LOWER ROW: COPYRIGHT & METRICS --- */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 text-[11px] font-light tracking-wide text-zinc-600">
          
          {/* Left copyright notice */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <span>&copy; {currentYear} FastFix Gadget Repair. All rights reserved.</span>
          </div>

          {/* Right structural legal anchors */}
          <div className="flex items-center gap-6">
            <button 
        onClick={() => setLegalModal('terms')} 
        className="hover:text-zinc-400 transition-colors inline-flex items-center gap-0.5 group text-xs"
      >
        Terms of Service
      </button>
      
      <button 
        onClick={() => setLegalModal('privacy')} 
        className="hover:text-zinc-400 transition-colors inline-flex items-center gap-0.5 group text-xs"
      >
        Privacy Shield
      </button>
          </div>

        </div>

      </div>

      {/* Renders the overlay perfectly with sliding entry paths */}
      <AnimatePresence>
        {legalModal && (
          <LegalDocuments 
            initialTab={legalModal} 
            onClose={() => setLegalModal(null)} 
          />
        )}
      </AnimatePresence>
    </footer>
  );
}