import React from 'react';
import {
  MapPin,
  Mail,
  Scale,
  ShieldAlert,
  Copyright,
  Landmark
} from 'lucide-react';
import Navbar from '../components/Navbar';

export default function App() {
  return (
    // Haupt-Container: Reines Schwarz als Basis
    <div className="min-h-screen bg-[#020203] text-slate-300 font-sans flex flex-col items-center py-24 px-6 relative overflow-hidden selection:bg-indigo-500/30">
      <Navbar />
      
      {/* --- PLASMA / AURA BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Glow Top Left */}
        <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-indigo-900/10 rounded-full blur-[120px] mix-blend-screen opacity-70"></div>
        {/* Glow Center/Right */}
        <div className="absolute top-[30%] right-[10%] w-[30vw] h-[30vw] bg-blue-900/10 rounded-full blur-[100px] mix-blend-screen opacity-50"></div>
        {/* Glow Bottom */}
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[30vw] bg-purple-900/10 rounded-full blur-[130px] mix-blend-screen opacity-50"></div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="w-full max-w-[1200px] flex flex-col relative z-10 gap-12">

        {/* === HEADER === */}
        <div className="flex flex-col items-center text-center gap-4 mb-8">
          <div className="flex items-center gap-4 text-[0.55rem] font-mono tracking-[0.2em] text-blue-400/80 uppercase">
            <span className="w-6 h-[1px] bg-blue-500/40"></span>
            F.H.C
            <span className="w-6 h-[1px] bg-blue-500/40"></span>
          </div>
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-[#f4f4f5]">
            Impressum
          </h1>
          <p className="text-[#a1a1aa] text-sm md:text-base font-light tracking-wide">
            Angaben gemäß § 5 TMG
          </p>
        </div>

        {/* === IMPRESSUM CONTENT (LIQUID GLASS DESIGN) === */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Betreiber & Kontakt (Hero Card - Spans full width) */}
          <div className="col-span-1 md:col-span-2 p-10 md:p-14 rounded-[3rem] md:rounded-[4rem] bg-[#0a0a0c]/60 backdrop-blur-sm border border-white/5 flex flex-col md:flex-row justify-between gap-12 hover:border-white/10 transition-colors">
            
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full blur-[12px] opacity-40 bg-blue-500"></div>
                  <div className="relative w-12 h-12 rounded-full border border-white/10 bg-[#0a0a0c] flex items-center justify-center text-blue-400">
                    <MapPin size={20} />
                  </div>
                </div>
                <h3 className="text-2xl font-medium text-[#f4f4f5]">Betreiber der Website</h3>
              </div>
              
              <div className="space-y-2 text-[#a1a1aa] text-lg leading-relaxed font-light">
                <p><strong className="text-white font-medium">Falilou Holler</strong></p>
                <p>F.H.C</p>
                <p>Fromundstr. 30</p>
                <p>81547 München</p>
              </div>
            </div>

            <div className="w-full md:w-[1px] h-[1px] md:h-auto bg-white/5"></div>

            <div className="flex-1 flex flex-col justify-center">
               <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full blur-[12px] opacity-40 bg-purple-500"></div>
                  <div className="relative w-12 h-12 rounded-full border border-white/10 bg-[#0a0a0c] flex items-center justify-center text-purple-400">
                    <Mail size={20} />
                  </div>
                </div>
                <h3 className="text-2xl font-medium text-[#f4f4f5]">Kontakt</h3>
              </div>

              <div className="space-y-4 text-[#a1a1aa] text-lg font-light">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-[0.65rem] font-mono tracking-[0.15em] uppercase text-slate-500">Telefon</span>
                  <span className="text-white">+49 (0) 160 2446982</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-[0.65rem] font-mono tracking-[0.15em] uppercase text-slate-500">E-Mail</span>
                  <span className="text-white">falilou.holler.consulting@gmail.com</span>
                </div>
              </div>
            </div>

          </div>

          {/* Streitschlichtung (Half Card) */}
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-[#0a0a0c]/60 backdrop-blur-sm border border-white/5 flex flex-col gap-6 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-[12px] opacity-30 bg-emerald-500"></div>
                <div className="relative w-10 h-10 rounded-full border border-white/10 bg-[#0a0a0c] flex items-center justify-center text-emerald-400">
                  <Landmark size={18} />
                </div>
              </div>
              <h3 className="text-xl font-medium text-[#f4f4f5]">Streitschlichtung</h3>
            </div>
            
            <p className="text-sm text-[#a1a1aa] leading-relaxed font-light flex-1">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">https://ec.europa.eu/consumers/odr/</a>.<br/><br/>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

          {/* Haftung für Inhalte (Half Card) */}
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-[#0a0a0c]/60 backdrop-blur-sm border border-white/5 flex flex-col gap-6 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-[12px] opacity-30 bg-orange-500"></div>
                <div className="relative w-10 h-10 rounded-full border border-white/10 bg-[#0a0a0c] flex items-center justify-center text-orange-400">
                  <ShieldAlert size={18} />
                </div>
              </div>
              <h3 className="text-xl font-medium text-[#f4f4f5]">Haftung für Inhalte</h3>
            </div>
            
            <p className="text-sm text-[#a1a1aa] leading-relaxed font-light flex-1">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
            </p>
          </div>

          {/* Urheberrecht (Full Card) */}
          <div className="col-span-1 md:col-span-2 p-8 md:p-10 rounded-[3rem] bg-[#0a0a0c]/60 backdrop-blur-sm border border-white/5 flex flex-col gap-6 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-[12px] opacity-30 bg-pink-500"></div>
                <div className="relative w-10 h-10 rounded-full border border-white/10 bg-[#0a0a0c] flex items-center justify-center text-pink-400">
                  <Copyright size={18} />
                </div>
              </div>
              <h3 className="text-xl font-medium text-[#f4f4f5]">Urheberrecht & Links</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-[#a1a1aa] leading-relaxed font-light">
              <p>
                <strong className="text-white font-medium block mb-2">Urheberrecht</strong>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
              {/* <p>
                <strong className="text-white font-medium block mb-2">Haftung für Links</strong>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.
              </p> */}
            </div>

            <div className="text-[0.5rem] font-mono tracking-[0.2em] text-slate-600 uppercase mt-4 pt-6 border-t border-white/5">
              LAST_UPDATED: {new Date().toLocaleDateString('de-DE')}
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}