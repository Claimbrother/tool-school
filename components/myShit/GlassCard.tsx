"use client";
import { GlassCard } from "@/app/Global/UIComponents";
import { InfoIcon } from "@/components/ui/info-icon";

import { useState } from "react";
import { Course } from "@/app/types";
import { XIcon } from "@/components/ui/x-icon";

const CourseCard = ({ course }: { course: Course }) => {
  const [isFlipped, setIsFlipped] = useState(false);


  return (
    // Perspective gibt den 3D-Raum und die Tiefe vor
           <div className="relative h-full min-h-[450px] w-full [perspective:1000px] group">
      
      {/* Dieser Container dreht sich. preserve-3d sorgt dafür, dass Vorder- und Rückseite im 3D-Raum bleiben */}
      <div 
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        
        {/* === VORDERSEITE === */}
        {/* WORKAROUND: Da backdrop-blur CSS-3D-Effekte kaputt macht, blenden wir die Vorderseite mit opacity/visibility aus, sobald gedreht wird. */}
        <div 
          className={`absolute inset-0 w-full h-full transition-all duration-300 ${
            isFlipped ? 'opacity-0 invisible' : 'opacity-100 visible'
          }`}
        >
          <GlassCard className="w-full h-full p-8 flex flex-col hover:bg-white/10 transition-colors cursor-default">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-teal-500/20 flex items-center justify-center border border-teal-500/30 mb-6 text-teal-400">
              <course.icon size={28} />
            </div>
            <h3 className="text-xl text-center font-bold text-white mb-4">{course.title}</h3>
            <p className="text-slate-400 text-center mb-8 flex-grow leading-relaxed">
              {course.desc}
            </p>
            <button 
              onClick={() => setIsFlipped(true)}
              className="mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
            >
              <InfoIcon size={20} /> Mehr erfahren
            </button>
          </GlassCard>
        </div>

        {/* === RÜCKSEITE === */}
        {/* WORKAROUND: Die Rückseite wird erst sichtbar (opacity-100), wenn die Karte zur Hälfte gedreht ist (delay-150). anders zerschiest es die Tailwind-Klassen */}
        <div 
          className={`absolute inset-0 w-full h-full [transform:rotateY(180deg)] transition-all duration-300 delay-150 ${
            isFlipped ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <GlassCard className="w-full h-full p-8 flex flex-col bg-slate-900/95 backdrop-blur-2xl">
            <h3 className="text-xl text-center font-bold text-teal-400 mb-4">{course.title}</h3>
            
            {/* Scrollbereich */}
            <div className="overflow-y-auto pr-2 mb-6 flex-grow custom-scrollbar">
              <p className="text-slate-300 text-sm leading-relaxed text-center">
                {course.longDesc}
              </p>
            </div>

            <button 
              onClick={() => setIsFlipped(false)}
              className="mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-500/20 border border-teal-500/30 text-teal-300 font-medium hover:bg-teal-500/30 transition-colors"
            >
              <XIcon size={20} /> Zurück
            </button>
          </GlassCard>
        </div>

      </div>
    </div>
  );
};

export default CourseCard;