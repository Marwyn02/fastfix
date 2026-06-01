import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export default function Faq() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs: FaqItem[] = [
    {
      id: 1,
      question: "What types of graphics card failures can you actually repair?",
      answer: "We specialize in component-level micro-soldering and complex board repairs. This includes fixing blown 12VHPWR/PCIe power rails, replacing shorted high-side MOSFETs, performing automated BGA memory reballing (VRAM replacement), patching cracked or torn PCB data traces, and flashing corrupted BIOS chips."
    },
    {
      id: 2,
      question: "Do you provide a warranty on board-level repairs?",
      answer: "Yes. Every single graphics card resurrected on our bench leaves with a comprehensive 90-day warranty covering the specific circuit path or components we serviced. We also subject every card to a mandatory 24-hour continuous stress-test gauntlet before signoff."
    },
    {
      id: 3,
      question: "How much does a diagnosis cost if I decide not to proceed?",
      answer: "We operate on absolute pricing transparency. Our initial baseline analysis, structural evaluation under high-resolution thermal scopes, and microscopic photographic reports come with zero hidden lab fees. If we find your silicon is completely unfixable, you owe nothing."
    },
    {
      id: 4,
      question: "What is the typical turnaround time for a complex rework?",
      answer: "Standard diagnostic reporting takes 24 to 48 hours from the moment your card hits our bench. Once you approve the itemized estimate, typical repair operations are completed within 3 to 5 business days, depending on component availability."
    },
    {
      id: 5,
      question: "How do I ship my damaged hardware safely to your laboratory?",
      answer: "We recommend wrapping your card in a dedicated anti-static bag, followed by at least 2–3 inches of high-density bubble wrap. Ship it inside a rigid cardboard container. Once shipped, update us with your tracking code so our intake team can prioritize your diagnostic queue."
    }
  ];

  // Simple state filter for matching items dynamically
  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id='faq' className="w-full bg-[#030305] text-zinc-100 font-sans py-24 px-4 sm:px-8 md:px-16 flex flex-col items-center">
      <div className="max-w-4xl w-full flex flex-col items-center">
        
        {/* --- LARGE ACCENT TYPE SECTION TITLE --- */}
        <h1 className="text-4xl md:text-5xl font-heading font-semibold tracking-wide text-zinc-100 mb-8">
          Frequently Asked Questions
        </h1>

        {/* --- MINIMALIST SEARCH BAR --- */}
        <div className="w-full relative mb-20">
          <input
            type="text"
            placeholder="Search FAQs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm md:text-base text-zinc-200 placeholder-zinc-500 border border-zinc-800/80 rounded px-4 py-3.5 pr-10 outline-none focus:border-zinc-600 transition-colors tracking-wide font-light"
          />
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none stroke-[1.5]" />
        </div>

        {/* --- CATEGORY SECTION HEADER --- */}
        <div className="w-full text-left mb-6">
          <h2 className="text-xl md:text-2xl tracking-wide text-zinc-200">
            About our services
          </h2>
        </div>

        {/* --- MINIMALIST EDITORIAL ACCORDION LIST --- */}
        <div className="w-full border-t border-zinc-800/80">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div key={faq.id} className="border-b border-zinc-800/80 w-full">
                  {/* Accordion Row Trigger */}
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between py-5 text-left focus:outline-none group"
                  >
                    <span className="text-sm md:text-base font-light tracking-wide text-zinc-300 group-hover:text-zinc-100 transition-colors pr-6">
                      {faq.question}
                    </span>
                    
                    {/* Plus / Minus Indicator Toggle */}
                    <div className="relative flex items-center justify-center w-4 h-4 shrink-0 text-zinc-400 group-hover:text-zinc-200">
                      <div className="absolute w-3.5 h-[1px] bg-current" />
                      <motion.div 
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        className="absolute w-[1px] h-3.5 bg-current"
                      />
                    </div>
                  </button>

                  {/* Smooth Drawer Body Area */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pr-6">
                          <p className="text-xs md:text-sm leading-relaxed text-zinc-400 font-light max-w-3xl">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs md:text-sm text-zinc-500 font-light">
              No matching questions found for "{searchQuery}".
            </div>
          )}
        </div>

      </div>
    </section>
  );
}