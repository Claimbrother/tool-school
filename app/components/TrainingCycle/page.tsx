"use client";
import { 
  MonitorPlay, 
  Handshake, 
  BrainCircuit, 
  ShieldCheck,
  RepeatIcon,
  ArrowDownIcon
} from 'lucide-react';
import { useRef } from "react";
import { Step } from "@/app/types";

import CourseCardMap from '@/components/myShit/GlassCardMap';
import { CornerLeftDownIcon } from '@/components/ui/corner-left-down-icon';
import { CornerRightDownIcon } from '@/components/ui/corner-right-down-icon';

export const VerticalRoadmap = () => {
    const steps: Step[] = [
      {
        id: 1,
        title: "Sehen & Verstehen",
        description: "Bildliche Darstellung der Grundkonzepte anhand von anschaulichen Animationen, klaren Bildern und Beispielen aus Ihrem realen Alltag.",
        icon: MonitorPlay,
        gradientClasses: "bg-gradient-to-br from-blue-500 to-cyan-500",
        nodeColor: "border-blue-500 text-blue-400",
        flipContent: "Ich hole Sie genau dort ab, wo Sie aktuell stehen. Gemeinsam erarbeiten wir alltagsnahe Anwendungsbeispiele, damit Sie sich wieder sicher und „up to date“ fühlen. Sie werden schnell merken: Für die Bedienung der meisten Technologien benötigen Sie keine besondere Begabung. Da Software-Ergonomie fast immer denselben logischen Prinzipien folgt, müssen wir diese nur einmal gemeinsam verstehen."
      },
      {
        id: 2,
        title: "Gemeinsam Anwenden",
        description: "Wir üben solide Anwendungsmuster durch praktische Aufgaben. Ich bin dabei an Ihrer Seite, mit viel Geduld und ohne Zeitdruck.",
        icon: Handshake,
        gradientClasses: "bg-gradient-to-br from-emerald-500 to-teal-500",
        nodeColor: "border-emerald-500 text-emerald-400",
        flipContent: "Theorie ist wichtig, aber echte Sicherheit entsteht durch Tun. Gemeinsam trainieren wir bewährte Anwendungsmuster anhand praktischer Aufgaben, die direkt aus Ihrem Alltag stammen. Dabei stehe ich geduldig an Ihrer Seite. Wir arbeiten in Ihrem individuellen Tempo – ganz ohne Zeitdruck und ohne die Angst, etwas falsch zu machen. So wird aus dem „Ausprobieren“ eine solide Fertigkeit."

      },
      {
        id: 3,
        title: "Wissen Verfestigen",
        description: "Ausweitung der Möglichkeiten bis zur intuitiven Anwendung. Sie lernen, wie moderne Programme 'denken', damit Sie sich überall zurechtfinden.",
        icon: BrainCircuit,
        gradientClasses: "bg-gradient-to-br from-purple-500 to-fuchsia-500",
        nodeColor: "border-purple-500 text-purple-400",
        flipContent: "Es geht nicht darum, unzählige Funktionen auswendig zu lernen. Ich zeige Ihnen stattdessen, wie moderne Programme „denken“. Wenn Sie die zugrunde liegenden Konzepte der Software-Ergonomie einmal verstanden haben, können Sie dieses Wissen auf fast jede neue Anwendung übertragen. Ziel ist eine intuitive Nutzung, bei der Sie sich in jedem Programm souverän zurechtfinden, weil Sie das System dahinter durchschauen."
      },
      {
        id: 4,
        title: "Wissen Filtern",
        description: "Wissenskonzepte, wie Sie im Informationsdschungel die richtigen Inhalte von Werbung, Clickbait und Panikmache sicher herausfiltern. So beliben Sie immer Up to Date.",
        icon: ShieldCheck,
        gradientClasses: "bg-gradient-to-br from-orange-500 to-rose-500",
        nodeColor: "border-orange-500 text-orange-400",
        flipContent: "Das Internet bietet unendliche Möglichkeiten, kann aber auch verunsichern. Ich vermittle Ihnen das nötige Handwerkszeug, um Informationen sicher zu bewerten und die Kontrolle zu behalten. Sie lernen, wie Sie wertvolle Inhalte verlässlich von Werbung, Clickbait oder gezielter Panikmache unterscheiden. Mit diesem Wissen filtern Sie den digitalen „Lärm“ einfach aus und bewegen sich entspannt und sicher im Netz."
      }
    ];
  // Referenz, um per Klick wieder nach oben springen zu können
const topRef = useRef<HTMLDivElement>(null);

  const handleRepeat = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
<section id='trainings' className="py-24 w-full overflow-hidden bg-transparent" ref={topRef}>
      <div className="flex flex-col items-center w-full max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-teal-400 mb-8">Training Cycle</h1>
        <p className="text-lg text-center text-gray-300 mb-12">
          Ein strukturierter Ansatz, um Ihre Fähigkeiten schrittweise zu entwickeln und zu vertiefen.
        </p>

        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div 
              key={index} 
              // Auf dem Handy zentriert (kein translate), ab Desktop (md:) greift deine 40% Überschneidung
              className={`relative flex flex-col items-center transition-all duration-500 hover:z-50 hover:-translate-y-4 group ${
                index !== 0 ? 'mt-8 md:mt-5' : '' 
              } ${
                isEven ? 'md:-translate-x-[40%]' : 'md:translate-x-[40%]'
              }`}
              style={{ 
                zIndex: steps.length - index,
              }} 
            >
              
              <CourseCardMap step={step} />

              {/* Pfeile */}
              {index < steps.length - 1 && (
                <>
                  {/* Desktop Pfeile (versteckt auf Handy) */}
                  <div 
                    className={`hidden md:flex absolute -bottom-5 ${isEven ? '-right-20' : '-left-20'} z-50 items-center justify-center border-teal-500/80 rounded-full p-2 transition-transform duration-300 group-hover:scale-110`}
                  >
                    {isEven ? <CornerRightDownIcon size={80} className="animate-pulse" /> : <CornerLeftDownIcon size={80} className="animate-pulse" />}
                  </div>

                  {/* Mobile Pfeil (versteckt auf Desktop) */}
                  <div className="flex md:hidden absolute -bottom-6 z-50 items-center justify-center text-teal-500">
                    <ArrowDownIcon size={32} className="animate-pulse" />
                  </div>
                </>
              )}
              
            </div>
          );
        })}

        <div className="mt-20 relative z-50 flex justify-center items-center">
          <button
            onClick={handleRepeat}
            className="group flex flex-col items-center justify-center gap-2 w-28 h-28 bg-slate-900/80 hover:bg-teal-900/40 border-2 border-teal-500/60 rounded-full text-teal-400 font-bold transition-all duration-300 hover:shadow-[0_0_40px_rgba(20,184,166,0.8)] hover:scale-110 backdrop-blur-sm"
          >
            <RepeatIcon className="group-hover:-rotate-180 transition-transform duration-700 ease-in-out" size={32} />
            <span className="text-xs uppercase tracking-[0.2em] mt-1">Repeat</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default VerticalRoadmap;