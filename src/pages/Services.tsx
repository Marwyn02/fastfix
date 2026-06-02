import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Wrench, ShieldAlert, Zap, HardDrive, Radio, RefreshCw, Layers } from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  icon: React.ReactNode;
}

export default function Services() {
  // NEW: State tracker to manage which card is active/open on mobile touch viewports
  const [activeMobileCard, setActiveMobileCard] = useState<string | null>(null);

  const services: ServiceItem[] = [
    {
      id: "vram-replacement",
      category: "Micro-Soldering",
      title: "VRAM Memory Replacement",
      description: "Fixes screen artifacting, space invaders patterns, and error code 43. We desolder old modules and replace them with factory-grade GDDR6/GDDR6X memory.",
      imageUrl: "https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=500&h=500",
      icon: <Cpu size={18} className="text-cyan-400" />
    },
    {
      id: "drmos-repair",
      category: "Power Delivery",
      title: "DrMOS & VRM Short Repair",
      description: "When your GPU causes the whole PC to trip or shut down instantly upon hitting power. We locate blown power stages using high-resolution thermal imaging.",
      imageUrl: "https://images.unsplash.com/photo-1589431618440-f778341bee3b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: <Zap size={18} className="text-amber-400" />
    },
    {
      id: "trace-repair",
      category: "Substrate Fixes",
      title: "PCIe Cracked Trace Stitching",
      description: "Sagging heavy graphics cards can split the critical structural traces. We stitch individual microscopic copper lines back together under magnification.",
      imageUrl: "https://images.unsplash.com/photo-1591489378430-ef2f4c626b35?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: <Wrench size={18} className="text-emerald-400" />
    },
    {
      id: "thermal-overhaul",
      category: "Thermal Control",
      title: "PTM7950 & Liquid Metal Service",
      description: "Thermal throttling fixes for extreme temperature spikes. Replacing dried stock paste with high-performance phase-change pads to drop core deltas drastically.",
      imageUrl: "https://images.unsplash.com/photo-1770932588917-42c0ecd3f210?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: <ShieldAlert size={18} className="text-rose-400" />
    },
    {
      id: "interposer-reball",
      category: "Advanced BGA",
      title: "GPU Core Reballing & Reflow",
      description: "Restoring broken solder balls underneath the main silicon die. Utilizing precision profiles on our automated BGA rework stations.",
      imageUrl: "https://images.unsplash.com/photo-1618764400608-9e7115eede74?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: <Layers size={18} className="text-indigo-400" />
    },
    {
      id: "bios-flash",
      category: "Firmware",
      title: "EEPROM & Corrupted BIOS Flashing",
      description: "Recovering bricked graphics cards caused by bad firmware flashes, power failures during updates, or corrupted mining configurations.",
      imageUrl: "https://plus.unsplash.com/premium_photo-1723485616076-0fef3b0d235d?q=80&w=1564&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: <RefreshCw size={18} className="text-purple-400" />
    },
    {
      id: "ultrasonic-clean",
      category: "Restoration",
      title: "Ultrasonic Chemical Wash",
      description: "Deep chemical cleaning for boards suffering from liquid spills, severe insect infestations, or conductive residue build-up over years of use.",
      imageUrl: "https://images.unsplash.com/photo-1597138804456-e7dca7f59d54?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: <Radio size={18} className="text-teal-400" />
    },
    {
      id: "shunt-mod",
      category: "Modding",
      title: "Custom Shunt Resistor Modding",
      description: "Hardware power limit bypass for extreme overclockers and benchmarking enthusiasts looking to squeeze out every drop of performance.",
      imageUrl: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=500&h=500",
      icon: <HardDrive size={18} className="text-fuchsia-400" />
    },
    {
      id: "hdmi-port",
      category: "Display Ports",
      title: "HDMI 2.1 & DisplayPort Replacement",
      description: "Replacing physically torn, loose, or oxidized video outputs with high-retention structural gold-plated replacement sockets.",
      imageUrl: "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&q=80&w=500&h=500",
      icon: <Wrench size={18} className="text-sky-400" />
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // NEW: Smart interaction interceptor built specifically for mobile screens
  const handleCardInteraction = (e: React.MouseEvent, id: string) => {
    // If desktop (window width checks out), let regular mouse pointer cascades handle it
    if (window.innerWidth >= 768) {
      e.preventDefault();
      scrollToContact();
      return;
    }

    // Touch logic: First tap shows the descriptive information. Second tap scrolls to action block.
    if (activeMobileCard !== id) {
      e.preventDefault();
      e.stopPropagation();
      setActiveMobileCard(id);
    } else {
      // Clear selection and execute regular target anchor jump on second tap
      setActiveMobileCard(null);
      scrollToContact();
    }
  };

  // NEW: Close open cards if user clicks completely away onto empty body layout areas
  useEffect(() => {
    const clearMobileFocus = () => setActiveMobileCard(null);
    window.addEventListener('click', clearMobileFocus);
    return () => window.removeEventListener('click', clearMobileFocus);
  }, []);

  return (
    <section className="w-full bg-[#050508] text-white font-sans py-24 px-4 sm:px-8 flex flex-col items-center">
      <div className="max-w-[1260px] w-full mb-12 text-center md:text-left">
        <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 font-bold mb-2">
          Our Capabilities
        </p>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold uppercase tracking-widest text-zinc-100 mb-1">
          Hardware Lab Operations
        </h2>
        <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed tracking-wide max-w-2xl">
          We don't believe in taking the easy way out by forcing costly, full-board replacements. Our technicians operate on a component level—using advanced micro-soldering, microscopic tracing, and rigorous testing to breathe life back into your exact hardware. If it's fixable, we will save it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1000px] w-full justify-center">
        {services.map((service) => {
          // Check if this specific item is currently toggled active on mobile viewports
          const isCurrentMobileOpen = activeMobileCard === service.id;

          return (
            <a
              key={service.id}
              href="#contact"
              onClick={(e) => handleCardInteraction(e, service.id)}
              className="group relative block w-full aspect-square max-w-[480px] bg-zinc-950 rounded-lg overflow-hidden border border-zinc-900 shadow-xl mx-auto"
            >
              {/* Base Image Asset layer */}
              <img
                src={service.imageUrl}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out scale-100 group-hover:scale-105 filter brightness-90 contrast-110"
                loading="lazy"
              />

              {/* Default overlay panel */}
              {/* CHANGED: Combines CSS rules with active state checks so it drops away instantly on tap */}
              <div 
                className={`absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex justify-between items-end transition-opacity duration-300 group-hover:opacity-0 ${
                  isCurrentMobileOpen ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <div className="space-y-1">
                  <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-zinc-400">
                    {service.category}
                  </span>
                  <h3 className="text-sm font-bold tracking-wide uppercase text-white truncate max-w-[280px]">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* --- ACTIVE INFORMATION OVERLAY --- */}
              {/* CHANGED: Controlled through custom animate configurations, linking Framer's values 
                directly to desktop hovers OR active tap state triggers.
              */}
              <motion.div 
                initial={false}
                animate={{ 
                  opacity: isCurrentMobileOpen ? 1 : undefined 
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 bg-[#050508]/85 backdrop-blur-md p-8 flex flex-col justify-between items-start transition-opacity duration-300 md:opacity-0 ${
                  isCurrentMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none md:pointer-events-auto'
                }`}
              >
                <div className="w-full flex justify-between items-start border-b border-zinc-800 pb-4">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-400">
                    {service.category}
                  </span>
                  <span className="text-zinc-500 group-hover:text-white transition-colors duration-200">
                    <ArrowUpRight size={18} />
                  </span>
                </div>

                <div className="space-y-3 my-auto">
                  <h3 className="text-lg font-extrabold uppercase tracking-wide text-white leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                <div className="w-full text-left pt-2">
                  <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 py-2.5 px-5 rounded transition-colors duration-200">
                    {isCurrentMobileOpen ? "Tap Again to Book Request →" : "Initialize Repair Request →"}
                  </span>
                </div>
              </motion.div>
            </a>
          );
        })}
      </div>
    </section>
  );
}