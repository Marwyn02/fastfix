import React, { useState } from 'react';
import { MapPin, Clock, Calendar, Send, Phone } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', gpuModel: '', message: '' });
//   const premiumCurve = [0.16, 1, 0.3, 1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission logic here
    console.log('Intake Form Data:', formState);
  };

  return (
    <section id='contact' className="w-full bg-[#030305] text-zinc-100 font-sans py-24 px-4 sm:px-8 md:px-16 border-t border-zinc-900 flex flex-col items-center overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* --- LEFT COLUMN: DETAILS & EMBEDDED MAP --- */}
        <div className="lg:col-span-5 space-y-10 w-full">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-heading font-semibold tracking-wide text-zinc-100">
              Intake Desk
            </h1>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed tracking-wide max-w-md">
             Don't throw away your GPU just yet. Before writing off expensive hardware, let our laboratory run a complete circuit diagnostic—if a board-level component can be salvaged, we will find a way to fix it.</p>
          </div>

          {/* Line-Item Details Wrapper */}
          <div className="border-t border-zinc-800/80 divide-y divide-zinc-800/80 w-full text-sm font-light tracking-wide">
            
            {/* Operational Days */}
            <div className="py-4 flex items-center justify-between gap-4">
              <span className="text-zinc-500 inline-flex items-center gap-2.5">
                <Calendar size={14} className="stroke-[1.5]" /> Schedule
              </span>
              <span className="text-zinc-300 text-right">Monday – Friday</span>
            </div>

            {/* Business Hours */}
            <div className="py-4 flex items-center justify-between gap-4">
              <span className="text-zinc-500 inline-flex items-center gap-2.5">
                <Clock size={14} className="stroke-[1.5]" /> Lab Hours
              </span>
              <span className="text-zinc-300 text-right">09:00 AM – 06:00 PM PHT</span>
            </div>

            {/* Laboratory Address */}
            <div className="py-4 flex items-start justify-between gap-4">
              <span className="text-zinc-500 inline-flex items-center gap-2.5 pt-0.5">
                <MapPin size={14} className="stroke-[1.5]" /> Location
              </span>
              <span className="text-zinc-300 text-right max-w-xs leading-relaxed">
                Alta Tierra, General Mariano Alvarez, Calabarzon, Philippines
              </span>
            </div>

            {/* Support Phone */}
            <div className="py-4 flex items-center justify-between gap-4">
              <span className="text-zinc-500 inline-flex items-center gap-2.5">
                <Phone size={14} className="stroke-[1.5]" /> Core Line
              </span>
              <a href="tel:+6321234567" className="text-zinc-300 hover:text-zinc-100 transition-colors">+63 (2) 123-4567</a>
            </div>
          </div>

          {/* --- MINIMALIST EMBEDDED GOOGLE MAP --- */}
<div className="w-full aspect-[16/10] rounded-lg overflow-hidden border border-zinc-900 filter grayscale contrast-125 brightness-[0.75] hover:brightness-[0.85] transition-all duration-300">
  <iframe
    title="FastFix Gadget Repair Laboratory Location"
    // Injected your exact business place tokens and map coordinates
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3864.1950298018784!2d121.00776007584592!3d14.31296338499696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d7998558e1d9%3A0x9f3596eb7c9ed8d1!2sFastFix+Gadget+Repair!5e0!3m2!1sen!2sph!4v1717150000000!5m2!1sen!2sph"
    className="w-full h-full block min-h-[250px] border-0"
    allowFullScreen={false}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>
        </div>

        {/* --- RIGHT COLUMN: CONTACT & INTAKE FORM --- */}
        <div className="lg:col-span-7 w-full border border-zinc-900/80 bg-zinc-950/20 rounded-xl p-6 md:p-10 backdrop-blur">
  <h3 className="text-lg font-heading font-semibold tracking-wide text-zinc-200 mb-8">
    Tell us about your graphics card
  </h3>
  
  <form onSubmit={handleSubmit} className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Full Name */}
      <div className="flex flex-col space-y-2">
        <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-500">Your Name</label>
        <input
          type="text"
          required
          placeholder="e.g. Alex Mercer"
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          className="bg-transparent border border-zinc-800/80 rounded px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600 transition-colors font-light tracking-wide"
        />
      </div>

      {/* Email Address */}
      <div className="flex flex-col space-y-2">
        <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-500">Email Address</label>
        <input
          type="email"
          required
          placeholder="name@domain.com"
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          className="bg-transparent border border-zinc-800/80 rounded px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600 transition-colors font-light tracking-wide"
        />
      </div>
    </div>

    {/* GPU Model / Hardware Spec */}
    <div className="flex flex-col space-y-2">
      <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-500">Your Graphics Card Model</label>
      <input
        type="text"
        required
        placeholder="e.g. ASUS RTX 3080, MSI RX 6800 XT"
        value={formState.gpuModel}
        onChange={(e) => setFormState({ ...formState, gpuModel: e.target.value })}
        className="bg-transparent border border-zinc-800/80 rounded px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600 transition-colors font-light tracking-wide"
      />
    </div>

    {/* Error Symptoms / Description */}
    <div className="flex flex-col space-y-2">
      <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-500">What issues are you experiencing?</label>
      <textarea
        rows={5}
        required
        placeholder="Please describe what's happening (e.g., no display at all, screen freezes or shows lines while gaming, fans spin but no video, power light won't turn on)..."
        value={formState.message}
        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
        className="bg-transparent border border-zinc-800/80 rounded px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600 transition-colors font-light tracking-wide resize-none leading-relaxed"
      />
    </div>

    {/* SINGLE-LINE BORDER ACTION BUTTON */}
    {/* SINGLE-LINE BORDER ACTION BUTTON & QUICK CHANNELS */}
<div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
  <button 
    type="submit"
    className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-transparent text-zinc-300 font-light text-xs tracking-[0.15em] uppercase px-8 py-4 rounded-full border border-zinc-800 transition-all duration-300 hover:border-zinc-400 hover:text-white hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] active:scale-[0.98]"
  >
    Send Inquiry
    <Send size={12} className="text-zinc-500 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-300 stroke-[1.5]" />
  </button>

  {/* Quick Routing Links */}
  <div className="flex items-center justify-center sm:justify-start gap-6 text-[11px] font-light tracking-wider text-zinc-500">
    <span className="hidden sm:inline text-zinc-800">|</span>
    
    {/* Direct Messenger Option */}
    <a 
      href="https://m.me/FastFixGadgetRepair" 
      target="_blank" 
      rel="noopener noreferrer"
      className="hover:text-zinc-300 transition-colors inline-flex items-center gap-1.5 group"
    >
      Chat on Messenger
      <span className="text-zinc-700 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
    </a>

    {/* Direct Email Option */}
    <a 
      href="mailto:support@fastfixgadgetrepair.com?subject=Graphics%20Card%20Repair%20Inquiry" 
      className="hover:text-zinc-300 transition-colors inline-flex items-center gap-1.5 group"
    >
      Email Directly
      <span className="text-zinc-700 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
    </a>
  </div>
</div>
  </form>
</div>

      </div>
    </section>
  );
}