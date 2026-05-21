"use client";

import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/HeroSection";
import ContactSection from "@/app/components/Contact";
import TrainingCyclePath from "@/app/components/TrainingCycle";

export default function Home() {
  return (
    // "overflow-hidden" im main-Tag verhindert das Scrollen! Das habe ich zu "overflow-x-hidden" geändert.
    <main className="min-h-screen text-white overflow-x-hidden relative selection:bg-blue-400/30">
      
      {/* 1. Der Video-Hintergrund */}
      <div className="fixed inset-0 -z-50 w-full h-full overflow-hidden bg-neutral-900">
        {/* <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        >
          <source src="/videos/video_preview_h264.mp4" type="video/mp4" />
          Dein Browser unterstützt das Video-Tag nicht.
        </video> */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900/80 pointer-events-none" />
      </div>

      {/* 2. Hintergrund-Beleuchtung */}
      <div className="fixed top-1/4 left-2/4 w-48 md:w-96 h-48 md:h-96 bg-blue-600/40 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-2/4 w-48 md:w-96 h-48 md:h-96 bg-purple-600/40 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* 3. Navigation */}
      <Navbar />

      {/* 4. Seiten-Inhalte: Alles wird untereinander gerendert und bekommt IDs */}
      {/* HeroSection wird ohne width-Limit gerendert */}
      <HeroSection />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6">
        <section id="classes" className="min-h-screen py-20">
          <TrainingCyclePath />
        </section>

        {/* Contact Sektion */}
        <section id="contact" className="min-h-screen py-20 flex items-center justify-center">
          <ContactSection />
        </section>
      </div>
    </main>
  );
}