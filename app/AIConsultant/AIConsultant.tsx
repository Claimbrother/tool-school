"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Users, Sparkles, Loader2, ChevronDown, ChevronUp, Maximize, Minimize } from "lucide-react";
import { SendIcon } from "@/components/ui/send-icon";

// Interface für die Chat-Historie
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const fetchMistralRecommendation = async (messages: ChatMessage[]) => {
  try {
    const response = await fetch('/api/mistral-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }), // Historie senden
    });

    if (!response.ok) throw new Error(`API Error: ${ response.status }`);

    const data = await response.json();
    return data.reply || "Entschuldigung, ich konnte keine Antwort generieren.";
  } catch (error) {
    console.error("Mistral API Error:", error);
    return "Oops! Unsere KI-Verbindung ist gerade etwas ausgelastet. Bitte versuche es später noch einmal oder schau dir unsere Kurse direkt an.";
  }
};

const AIConsultantModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hallo! Beschreibe mir kurz deine berufliche Rolle oder was du gerne lernen möchtest. Ich finde den perfekten Kurs für dich."
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const responseEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (responseEndRef.current) {
      responseEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      if (isMaximized) return;

      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isOpen, isMaximized]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage: ChatMessage = { role: "user", content: inputValue.trim() };
    const updatedMessages = [...messages, newUserMessage];

    setMessages(updatedMessages);

    // Eingabe leeren und Fokus zurück auf das Feld
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }

    setIsLoading(true);

    const aiResponseText = await fetchMistralRecommendation(updatedMessages);

    setMessages((prev) => [...prev, { role: "assistant", content: aiResponseText }]);
    setIsLoading(false);
  };

  return (
    <div className={`fixed z-[99999] flex items-center justify-center p-4 transition-all duration-500 ${ isScrolling && !isMaximized
        ? 'inset-auto right-4 bottom-4 w-96'
        : 'inset-0'
      }`}>
      {(!isScrolling || isMaximized) && (
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <div className={`relative w-full bg-slate-900 border border-indigo-500/30 rounded-3xl shadow-[0_0_40px_rgba(79,70,229,0.2)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 transition-all ${ isMaximized
          ? 'max-w-6xl h-[90vh]'
          : isScrolling
            ? 'max-w-sm'
            : 'max-w-lg max-h-[calc(100vh-2rem)]'
        } ${ isMinimized ? 'max-h-16' : (isScrolling && !isMaximized) ? 'max-h-[400px]' : ''
        }`}>

        <div className={`p-6 border-b border-white/10 flex justify-between items-center bg-slate-800/50 ${ isScrolling && !isMaximized ? 'p-3' : ''
          }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sparkles size={20} />
            </div>
            {!(isScrolling && !isMaximized) && !isMinimized && (
              <div>
                <h3 className="font-bold text-white">KI-Kursberater</h3>
                <p className="text-xs text-indigo-300">Powered by Mistral</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            {!isMinimized && (
              <button
                onClick={() => {
                  setIsMaximized(!isMaximized);
                  setIsScrolling(false);
                }}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                title={isMaximized ? "Verkleinern" : "Maximieren"}
              >
                {isMaximized ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
            )}
            <button
              onClick={() => {
                setIsMinimized(!isMinimized);
                if (isMaximized) setIsMaximized(false);
              }}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              title={isMinimized ? "Wiederherstellen" : "Minimieren"}
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
          <div className={`overflow-y-auto custom-scrollbar transition-all flex-grow ${ isMaximized
              ? 'p-6' // Im Vollbild darf der Chat den ganzen Platz nutzen
              : isScrolling
                ? 'p-3 max-h-[250px]'
                : 'p-6 max-h-[60vh]' // <-- HIER: Die Begrenzung für den Normalzustand ist wieder da!
            }`}>
            <div className={`space-y-6 ${ isScrolling && !isMaximized ? 'space-y-3' : '' }`}>

              {messages.map((msg, index) => (
                <div key={index} className={`flex gap-4 ${ msg.role === "user" ? "flex-row-reverse" : "" }`}>
                  <div className={`rounded-full flex items-center justify-center text-white shrink-0 mt-1 flex-shrink-0 ${ msg.role === "user" ? "bg-teal-500" : "bg-indigo-500"
                    } ${ isScrolling && !isMaximized && msg.role === "assistant" ? 'w-6 h-6' : 'w-8 h-8' }`}>
                    {msg.role === "user" ? <Users size={16} /> : <Sparkles size={isScrolling && !isMaximized ? 12 : 16} />}
                  </div>

                  <div className={`${ msg.role === "user"
                      ? "bg-teal-500/20 border border-teal-500/30 text-teal-100 rounded-tr-sm"
                      : "bg-indigo-500/10 border border-indigo-500/20 text-slate-200 rounded-tl-sm"
                    } p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${ isScrolling && !isMaximized && msg.role === "assistant" ? 'p-2 text-xs' : ''
                    }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white shrink-0 mt-1">
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                  <div className="bg-indigo-500/10 border border-indigo-500/20 text-slate-400 p-4 rounded-2xl rounded-tl-sm text-sm flex items-center gap-2">
                    <span className="flex space-x-1">
                      <span className="animate-bounce delay-75">.</span>
                      <span className="animate-bounce delay-150">.</span>
                      <span className="animate-bounce delay-300">.</span>
                    </span>
                    Analysiere...
                  </div>
                </div>
              )}

              <div ref={responseEndRef} />
            </div>
          </div>
        )}

        {!isMinimized && (
          <div className={`border-t border-white/10 bg-slate-900 transition-all ${ isScrolling && !isMaximized ? 'p-2' : 'p-4'
            }`}>
            <form onSubmit={handleSubmit} className="flex gap-2 relative">
              <input
                type="text"
                value={inputValue}
                ref={inputRef}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isScrolling && !isMaximized ? "Frage...?" : "z.B. Ich will Prozesse mit KI automatisieren..."}
                className={`flex-grow bg-slate-800 border border-slate-700 rounded-xl px-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all pr-12 ${ isScrolling && !isMaximized ? 'py-2 text-xs' : 'py-3 text-sm'
                  }`}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className={`absolute top-2 bottom-2 aspect-square bg-indigo-500 text-white rounded-lg flex items-center justify-center hover:bg-indigo-600 disabled:opacity-50 disabled:hover:bg-indigo-500 transition-colors ${ isScrolling && !isMaximized ? 'right-1' : 'right-2'
                  }`}
              >
                <SendIcon size={isScrolling && !isMaximized ? 12 : 16} />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default AIConsultantModal;