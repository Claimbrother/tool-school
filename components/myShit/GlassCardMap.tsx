"use client";

import { useState } from "react";
import { GlassCard } from "@/app/Global/UIComponents"; // Stelle sicher, dass der Pfad stimmt
import { InfoIcon } from "@/components/ui/info-icon";
import { XIcon } from "@/components/ui/x-icon";// Empfehlung: lucide-react für saubere SVG-Icons
import { Step } from "@/app/types";

// --- 1. Die modifizierte Einzelkarte ---
const CourseCardMap = ({ step }: { step: Step }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    // Hier ist der Trick: 
    // w-[320px] h-[380px] für kleine Handy-Bildschirme.
    // md:w-[600px] md:h-[300px] ist DEINE Original-Breite für den Desktop.
    <div className="relative h-[380px] w-[320px] md:h-[300px] md:w-[600px] shrink-0 [perspective:1000px] group">
      <div 
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* === VORDERSEITE === */}
        <div 
          className={`absolute inset-0 w-full h-full transition-all duration-300 ${
            isFlipped ? 'opacity-0 invisible' : 'opacity-100 visible'
          }`}
        >
          <GlassCard className="w-full h-full p-6 flex flex-col hover:bg-white/10 transition-colors cursor-default border border-white/20 shadow-2xl backdrop-blur-md bg-slate-900/60">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-teal-500/20 flex items-center justify-center border border-teal-500/30 mb-6 md:mb-10 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.3)]">
              {step.icon && <step.icon size={26} />}
            </div>
            <h3 className="text-xl text-center font-bold text-white mb-2">{step.title}</h3>
            <p className="text-slate-400 text-sm text-center mb-6 md:mb-10 flex-grow leading-relaxed">
              {step.description}
            </p>
            <button 
              onClick={() => setIsFlipped(true)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/20 transition-all duration-300"
            >
              <InfoIcon size={18} /> Details
            </button>
          </GlassCard>
        </div>

        {/* === RÜCKSEITE === */}
        <div 
          className={`absolute inset-0 w-full h-full transition-all duration-300 [transform:rotateY(180deg)] ${
            !isFlipped ? 'opacity-0 invisible' : 'opacity-100 visible'
          }`}
        >
           <GlassCard className="w-full h-full p-6 flex flex-col items-center justify-center bg-teal-950/80 border-teal-500/50 shadow-2xl backdrop-blur-xl">
            <h3 className="text-lg font-bold text-teal-400 mb-3">Details</h3>
            <p className="text-slate-300 text-sm text-center mb-6">{step.title}.</p>
            <strong className="text-sm text-center text-teal-300 mb-4">{step.flipContent}</strong>
            <button 
              onClick={() => setIsFlipped(false)}
              className="mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm transition-colors"
            >
              <XIcon size={18} /> Zurück
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default CourseCardMap;
