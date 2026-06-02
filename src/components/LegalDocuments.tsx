import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, FileText, X, CheckCircle2 } from "lucide-react";

type LegalTab = "terms" | "privacy";

interface LegalDocumentsProps {
  initialTab?: LegalTab;
  onClose: () => void;
}

export default function LegalDocuments({ initialTab = "terms", onClose }: LegalDocumentsProps) {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#050508]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 select-none"
    >
      {/* Main Glass Panel Structure */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl h-[85vh] md:h-[75vh] bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden flex flex-col relative shadow-2xl"
      >
        {/* Header Action Row */}
        <div className="flex items-center justify-between border-b border-zinc-900 p-6 bg-zinc-950">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("terms")}
              className={`flex items-center gap-2 text-xs font-heading tracking-widest uppercase pb-2 border-b transition-colors ${
                activeTab === "terms"
                  ? "text-white border-white font-bold"
                  : "text-zinc-500 border-transparent hover:text-zinc-300"
              }`}
            >
              <FileText size={14} />
              Terms of Service
            </button>
            <button
              onClick={() => setActiveTab("privacy")}
              className={`flex items-center gap-2 text-xs font-heading tracking-widest uppercase pb-2 border-b transition-colors ${
                activeTab === "privacy"
                  ? "text-white border-white font-bold"
                  : "text-zinc-500 border-transparent hover:text-zinc-300"
              }`}
            >
              <Shield size={14} />
              Privacy Shield
            </button>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white p-1 transition-colors rounded-md hover:bg-zinc-900"
          >
            <X size={18} />
          </button>
        </div>

        {/* Dynamic Text Viewing Workspace */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8 font-sans text-left text-zinc-400 text-xs md:text-sm leading-relaxed space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === "terms" ? (
              <motion.div
                key="terms"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-white text-base font-bold uppercase tracking-wider mb-2">1. Scope of Repair Operations</h3>
                  <p>
                    FastFix operates as an independent component-level repair facility. By submitting hardware (GPUs, logic boards, consoles) for diagnostics, the client acknowledges that micro-soldering, trace stitching, and BGA reballing carry inherent operational risks due to pre-existing board degradation, hidden thermal fractures, or underlying silicon delamination.
                  </p>
                </div>

                <div>
                  <h3 className="text-white text-base font-bold uppercase tracking-wider mb-2">2. Warranty Framework</h3>
                  <p>
                    All component repair tracks (VRAM replacement, power delivery stage restorations, and trace stitching) carry a strict **90-day hardware stability warranty** starting from the recorded delivery timestamp. This warranty exclusively applies to the specific components serviced or replaced. It does not cover secondary, unrelated silicon failures, environmental liquid exposure, or user overclocking/overvolting degradation.
                  </p>
                </div>

                <div>
                  <h3 className="text-white text-base font-bold uppercase tracking-wider mb-2">3. Unclaimed Infrastructure Policy</h3>
                  <p>
                    Completed hardware repairs must be paid for and claimed within 45 calendar days following our official notification of operation completion. Hardware left unclaimed beyond 45 days will be deemed legally abandoned and may be safely recycled, stripped for lab testing stock, or liquidated to settle outstanding bench evaluation balances.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-white text-base font-bold uppercase tracking-wider mb-2">1. Information We Collect</h3>
                  <p>
                    We collect essential operational details required to track, diagnose, and securely ship your electronics hardware back to you. This includes your name, email destination, contact phone digits, physical return address, and optional telemetry hardware system logs (such as error codes, hardware testing data, or diagnostic error dumps).
                  </p>
                </div>

                <div>
                  <h3 className="text-white text-base font-bold uppercase tracking-wider mb-2">2. Storage Safeguards & Zero Data Mining</h3>
                  <p>
                    Your personal information lives strictly within encrypted database parameters to handle logistics and client communication. FastFix maintains a strict zero-data-mining policy: we never sell, lease, or distribute your email addresses, phone coordinates, or tracking logs to advertising channels.
                  </p>
                </div>

                <div>
                  <h3 className="text-white text-base font-bold uppercase tracking-wider mb-2">3. Internal Device Telemetry</h3>
                  <p>
                    When testing repaired GPUs or consoles on our diagnostic benches, our performance testing frameworks logs standard hardware metrics (core temperature loops, clock rates, frame tracking profiles) to verify component repair success. This operational telemetry data remains entirely anonymous and is used purely for internal validation.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Status Bar */}
        <div className="border-t border-zinc-900 p-4 bg-zinc-950/50 flex items-center gap-2 text-[10px] font-heading tracking-wider text-zinc-500 uppercase px-6">
          <CheckCircle2 size={12} className="text-emerald-500" />
          FastFix Compliance Ledger &bull; Revised June 2026
        </div>
      </motion.div>
    </motion.div>
  );
}