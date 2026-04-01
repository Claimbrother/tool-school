"use client";
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import AIConsultantModal
from '@/app/AIConsultant/AIConsultant';
import OrbitingGallery from '@/components/myShit/OrbitalGallery';
import MobileSwipeGallery from '@/components/myShit/SwipeGalery';
import { Sparkles } from "lucide-react";



const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const handleMouseMove = (e : React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative min-h-screen flex items-center justify-center overflow-visible pt-20 scroll-snap-align-center"
    >
      {/* Liquid Glass Magnifying Element */}
      <motion.div
        animate={{
          x: mousePosition.x - 550, // Center the 200px orb
          y: mousePosition.y - 550,
          scale: isHovering ? 1 : 0,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
        className="pointer-events-none absolute w-[200px] h-[200px] rounded-full z-10 hidden md:block"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), rgba(255,255,255,0.01))',
          backdropFilter: 'blur(0px) brightness(1.2)',
          WebkitBackdropFilter: 'blur(0px) brightness(1.2)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: 'inset 0 0 20px rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.5)',
        }}
      />

      {/* ORBITING CARDS (Desktop) - Full Width Container */}
      <div className="absolute inset-0 w-full h-full">
        <OrbitingGallery />
      </div>

      <div className="relative z-0 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 font-medium tracking-wide text-sm backdrop-blur-md">
            PORTFOLIO FALILOU HOLLER 2026
          </div> */}
<div className="relative w-full mx-auto flex flex-col items-center justify-center z-10 pt-5 pb-5 min-h-[800px]">
        
        {/* CENTER TEXT */}
        <div className="relative z-20 flex flex-col items-center text-center max-w-2xl px-6 pointer-events-none">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 drop-shadow-2xl">
            Smart Mana <br />
            Tool School
          </h1>
          
          <p className="text-base md:text-lg text-slate-300 mb-10 leading-relaxed max-w-xl mx-auto drop-shadow-md bg-black/20 p-4 rounded-2xl backdrop-blur-sm md:bg-transparent md:p-0 md:backdrop-blur-none">
            Entdecke die Zukunft der Schulungen mit Smart Mana Tool School – deinem Partner für innovative, praxisnahe und nachhaltige Weiterbildungslösungen. Unsere maßgeschneiderten Schulungen verbinden modernste Technologien mit bewährten Methoden.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto w-full">
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Trainings <span className="ml-2">→</span>
            </button>
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              Kontakt ✉
            </button>
            {/* ✨ Neues LLM Feature: KI Berater Button */}
            <button 
              onClick={() => setIsAiModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-indigo-500/20 border border-indigo-500/50 text-indigo-300 font-medium hover:bg-indigo-500/30 hover:text-indigo-200 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-2 group"
            >
              <Sparkles size={18} className="group-hover:animate-pulse" />
              KI fragen
            </button>
          </div>
        </div>

        {/* SWIPE GALLERY (Mobile) */}
        <MobileSwipeGallery />

      </div>

      {/* AI Modal Rendern */}
      <AIConsultantModal 
        isOpen={isAiModalOpen} 
        onClose={() => setIsAiModalOpen(false)} 
      />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;