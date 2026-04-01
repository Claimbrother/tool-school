"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Users, Sparkles, Loader2, ChevronDown, ChevronUp } from "lucide-react";
// import { Cpu, Database, Cloud, Shield, Zap, Target, Users as UsersIcon, Code } from "lucide-react";
import { SendIcon } from "@/components/ui/send-icon";

// Kurse aus OrbitalGallery
// const courses = [
//   {
//     id: 1,
//     title: "KI Integration",
//     desc: "Lerne, wie du LLMs und KI-Tools nahtlos in deinen Workflow einbaust.",
//     longDesc: "Dieser Kurs zeigt dir praxisnah, wie du Automatisierungen mit KI-Agents baust. Wir nutzen OpenAI, Anthropic und Open-Source Modelle für echte Use Cases.",
//     icon: Cpu,
//   },
//   {
//     id: 2,
//     title: "Web Development",
//     desc: "Modernes Frontend mit Next.js, React und TailwindCSS meistern.",
//     longDesc: "Von den Grundlagen bis zum fertigen Produkt. Wir fokussieren uns auf Performance, SEO und skalierbare Architekturen in der modernen Webentwicklung.",
//     icon: Code,
//   },
//   {
//     id: 3,
//     title: "Data Analytics",
//     desc: "Mache Daten sichtbar und nutzbar für fundierte Entscheidungen.",
//     longDesc: "Lerne Tools wie PowerBI, Tableau und Python-basierte Datenanalyse kennen, um aus unstrukturierten Daten wertvolle Business Insights zu generieren.",
//     icon: Database,
//   },
//   {
//     id: 4,
//     title: "Cloud Architecture",
//     desc: "Skalierbare Infrastrukturen in AWS und Azure designen.",
//     longDesc: "Verstehe Serverless, Container (Docker/Kubernetes) und CI/CD Pipelines, um moderne Applikationen sicher und hochverfügbar zu hosten.",
//     icon: Cloud,
//   },
//   {
//     id: 5,
//     title: "Cyber Security",
//     desc: "Schütze deine Anwendungen vor modernen Bedrohungen.",
//     longDesc: "Ein Deep-Dive in Penetration Testing, Verschlüsselungsstandards und Best Practices, um Unternehmensdaten effektiv zu sichern.",
//     icon: Shield,
//   },
//   {
//     id: 6,
//     title: "Agile Mastery",
//     desc: "Projektmanagement für schnelle und effiziente Teams.",
//     longDesc: "Scrum, Kanban und moderne Führungsmethoden. Wie man Teams motiviert und Produkte iterativ und nutzerzentriert entwickelt.",
//     icon: Target,
//   },
//   {
//     id: 7,
//     title: "Growth Hacking",
//     desc: "Skaliere dein Produkt mit datengetriebenem Marketing.",
//     longDesc: "Erlerne Techniken zur Nutzergewinnung, Conversion-Optimierung und Viralität. Tools und Taktiken für schnelles, messbares Wachstum.",
//     icon: Zap,
//   },
//   {
//     id: 8,
//     title: "Team Leadership",
//     desc: "Führe Remote- und Hybrid-Teams zum Erfolg.",
//     longDesc: "Soft Skills, Konfliktmanagement und Kommunikationsstrategien für die moderne, dezentrale Arbeitswelt.",
//     icon: UsersIcon,
//   },
// ];

const fetchMistralRecommendation = async (userQuery: string) => {
  try {
    // Sende die Anfrage zu deinem Backend (Next.js API Route)
    const response = await fetch('/api/mistral-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userQuery }),
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();
    return data.reply || "Entschuldigung, ich konnte keine Antwort generieren.";
  } catch (error) {
    console.error("Mistral API Error:", error);
    return "Oops! Unsere KI-Verbindung ist gerade etwas ausgelastet. Bitte versuche es später noch einmal oder schau dir unsere Kurse direkt an.";
  }
};



const AIConsultantModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const responseEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (responseEndRef.current) {
      responseEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response, isLoading]);

  // Handle scroll event
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      setIsScrolling(true);

      // Clear the timeout if it exists
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set a new timeout to reset scrolling state after user stops scrolling
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 10500); // Reset after 1.5 seconds of no scrolling
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResponse(""); // Reset previous response
    
    const aiResponse = await fetchMistralRecommendation(query);
    setResponse(aiResponse);
    setIsLoading(false);
  };

  return (
    <div className={`fixed z-[100] flex items-center justify-center p-4 transition-all duration-500 ${
      isScrolling 
        ? 'inset-auto right-4 bottom-4 w-96' 
        : 'inset-0'
    }`}>
      {/* Backdrop - nur visible wenn nicht scrolling */}
      {!isScrolling && (
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Modal Box */}
      <div className={`relative w-full bg-slate-900 border border-indigo-500/30 rounded-3xl shadow-[0_0_40px_rgba(79,70,229,0.2)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 transition-all ${
        isScrolling 
          ? 'max-w-sm' 
          : 'max-w-lg max-h-[calc(100vh-2rem)]'
      } ${
        isMinimized ? 'max-h-16' : isScrolling ? 'max-h-[400px]' : 'max-h-[calc(100vh-2rem)]'
      }`}>
        
        {/* Header */}
        <div className={`p-6 border-b border-white/10 flex justify-between items-center bg-slate-800/50 ${
          isScrolling ? 'p-3' : ''
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sparkles size={20} />
            </div>
            {!isScrolling && !isMinimized && (
              <div>
                <h3 className="font-bold text-white">KI-Kursberater</h3>
                <p className="text-xs text-indigo-300">Powered by Mistral</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              title={isMinimized ? "Maximieren" : "Minimieren"}
            >
              {isMinimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Area - nur zeigen wenn nicht minimiert */}
        {!isMinimized && (
          <div className={`overflow-y-auto custom-scrollbar transition-all ${
            isScrolling 
              ? 'p-3 max-h-[250px]' 
              : 'p-6 max-h-[60vh]'
          }`}>
          <div className={`space-y-6 ${isScrolling ? 'space-y-3' : ''}`}>
            
            {/* KI Intro Bubble */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white shrink-0 mt-1">
                <Sparkles size={16} />
              </div>
              <div className="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-tl-sm text-sm leading-relaxed">
                Hallo! Beschreibe mir kurz deine berufliche Rolle oder was du gerne lernen möchtest. Ich finde den perfekten Kurs für dich.
              </div>
            </div>

            {/* User Input Display (if submitted) */}
            {query && (isLoading || response) && (
              <div className="flex gap-4 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white shrink-0 mt-1">
                  <Users size={16} />
                </div>
                <div className="bg-teal-500/20 border border-teal-500/30 text-teal-100 p-4 rounded-2xl rounded-tr-sm text-sm leading-relaxed">
                  {query}
                </div>
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white shrink-0 mt-1">
                  <Loader2 size={16} className="animate-spin" />
                </div>
                <div className="bg-slate-800 text-slate-400 p-4 rounded-2xl rounded-tl-sm text-sm flex items-center gap-2">
                  <span className="flex space-x-1">
                    <span className="animate-bounce delay-75">.</span>
                    <span className="animate-bounce delay-150">.</span>
                    <span className="animate-bounce delay-300">.</span>
                  </span>
                  Analysiere Kurse...
                </div>
              </div>
            )}

            {/* AI Response */}
            {response && (
              <div className="flex gap-4">
                <div className={`rounded-full bg-indigo-500 flex items-center justify-center text-white shrink-0 flex-shrink-0 ${
                  isScrolling ? 'w-6 h-6' : 'w-8 h-8 mt-1'
                }`}>
                  <Sparkles size={isScrolling ? 12 : 16} />
                </div>
                <div className={`bg-indigo-500/10 border border-indigo-500/20 text-slate-200 rounded-2xl rounded-tl-sm leading-relaxed whitespace-pre-wrap ${
                  isScrolling 
                    ? 'p-2 text-xs' 
                    : 'p-4 text-sm'
                }`}>
                  {response}
                </div>
              </div>
            )}
            <div ref={responseEndRef} />
          </div>
        </div>
        )}

        {/* Input Area - nur zeigen wenn nicht minimiert */}
        {!isMinimized && (
          <div className={`border-t border-white/10 bg-slate-900 transition-all ${
            isScrolling ? 'p-2' : 'p-4'
          }`}>
          <form onSubmit={handleSubmit} className="flex gap-2 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isScrolling ? "Frage...?" : "z.B. Ich will Prozesse mit KI automatisieren..."}
              className={`flex-grow bg-slate-800 border border-slate-700 rounded-xl px-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all pr-12 ${
                isScrolling ? 'py-2 text-xs' : 'py-3 text-sm'
              }`}
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={isLoading || !query.trim()}
              className={`absolute top-2 bottom-2 aspect-square bg-indigo-500 text-white rounded-lg flex items-center justify-center hover:bg-indigo-600 disabled:opacity-50 disabled:hover:bg-indigo-500 transition-colors ${
                isScrolling ? 'right-1' : 'right-2'
              }`}
            >
              <SendIcon size={isScrolling ? 12 : 16} />
            </button>
          </form>
        </div>
        )}

      </div>
    </div>
  );
};

export default AIConsultantModal;