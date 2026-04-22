'use client';

import React, { useState } from 'react';
import { Cpu, Layers, Info, ArrowRight, Check, ThumbsUp, ThumbsDown } from 'lucide-react';

const stages = [
  { id: 'foundation',    title: 'Sehen & Verstehen',   subtitle: 'KERN-SYSTEME',    icon: Cpu,    active: false },
  { id: 'architecture',  title: 'Gemeinsam Anwenden',  subtitle: 'AKTUELLE PHASE',  icon: Layers, active: true  },
  { id: 'verification',  title: 'Wissen Verfestigen',  subtitle: 'VALIDIERUNG',     icon: Info,   active: false },
  { id: 'filter',        title: 'Wissen Filtern',      subtitle: 'VERTIEFUNG',      icon: Info,   active: false },
];

const pathways = [
  {
    id: 'TRK.CLD.01',
    title: 'Verteilte Cloud-Systeme',
    description: 'Meistern Sie die Architektur skalierbarer, fehlertoleranter Cloud-Umgebungen. Fokus auf Container-Orchestrierung, Microservices und Multi-Region-Bereitstellungsstrategien.',
    duration: '40 Stunden',
    metricLabel: 'CREDITS',
    metricValue: '3.0 CEU',
    progress: 1,
  },
  {
    id: 'TRK.SEC.04',
    title: 'Zero-Trust-Netzwerkdesign',
    description: 'Erweiterte Prinzipien der identitätsbasierten Perimeter-Sicherheit. Implementierung granularer Zugriffskontrollen, kontinuierlicher Verifizierung und sicherer Enklaven-Architekturen.',
    duration: '65 Stunden',
    metricLabel: 'VORAUSS.',
    metricValue: 'SEC.01',
    progress: 3,
  },
  {
    id: 'TRK.DVO.02',
    title: 'Infrastruktur als Code',
    description: 'Programmatische Bereitstellung mit Terraform und Pulumi. Erlernen Sie State-Management, modulares Infrastruktur-Design und automatisierte Compliance-Prüfungen.',
    duration: '24 Stunden',
    metricLabel: 'STATUS',
    metricValue: 'Offen',
    progress: 0,
  },
];

const modules = [
  { id: 'MOD-A104', title: 'Kubernetes-Cluster-Architektur',        category: 'Compute',   status: 'Abgeschlossen',       color: 'text-[#00f0ff] bg-[#00f0ff]/5 border-[#00f0ff]/20'  },
  { id: 'MOD-A105', title: 'Service-Mesh-Implementierung (Istio)',   category: 'Netzwerk',  status: 'In Bearbeitung (45%)', color: 'text-purple-400 bg-purple-500/5 border-purple-500/20' },
  { id: 'MOD-A106', title: 'Ephemere Umgebungen',                   category: 'DevOps',    status: 'Ausstehend',          color: 'text-gray-400 bg-white/5 border-white/10'             },
  { id: 'MOD-S201', title: 'Automatisierte Bedrohungsmodellierung',  category: 'Sicherheit', status: 'Gesperrt',           color: 'text-[#ff003c] bg-[#ff003c]/5 border-[#ff003c]/20'  },
];

export default function TrainingCyclePath() {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  return (
    <div className="text-gray-300 flex flex-col gap-24 selection:bg-[#00f0ff]/30 selection:text-white">

      {/* === HEADER & STAGES === */}
      <section className="flex flex-col items-center text-center gap-12">

        <div className="flex flex-col items-center gap-5 max-w-2xl">
          <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] text-gray-500 uppercase">
            <span className="w-6 h-[1px] bg-white/10"></span>
            F.H.C
            <span className="w-6 h-[1px] bg-white/10"></span>
          </div>

          <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-[1.1]">
            <span className="text-white">Entwerfe das System.</span><br />
            <span className="text-gray-500">Meistere den Zyklus.</span>
          </h2>

          <p className="text-gray-400 text-base leading-relaxed max-w-xl font-light">
            Ein immersives Curriculum, entwickelt für erfahrene IT-Experten. Durchlaufen Sie Grundlagen, Architektur und spezialisierte Meisterklassen.
          </p>
        </div>

        {/* Stage Cards */}
        <div className="relative w-full flex justify-between items-center gap-4 mt-4">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0">
            <div className="absolute top-1/2 -translate-y-1/2 w-[30%] h-[1px] flex items-center" style={{ animation: 'plasma-beam 6s ease-in-out infinite' }}>
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff]/60 to-transparent shadow-[0_0_12px_rgba(0,240,255,0.4)]"></div>
            </div>
          </div>

          <style>{`
            @keyframes plasma-beam {
              0%   { left: -30%; opacity: 0; }
              10%  { opacity: 1; }
              80%  { opacity: 1; }
              100% { left: 110%; opacity: 0; }
            }
          `}</style>

          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.id}
                className={`relative z-10 flex flex-col items-center justify-center flex-1 py-8 px-4 rounded-3xl bg-[#0d0d0d] transition-all duration-300
                  ${stage.active
                    ? 'border border-[#00f0ff]/20 shadow-[0_0_30px_rgba(0,240,255,0.05)]'
                    : 'border border-white/5'
                  }`}
              >
                <div className={`p-3 rounded-2xl mb-4 border border-white/5 ${stage.active ? 'text-[#00f0ff]' : 'text-gray-500'}`}>
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className={`font-medium text-sm text-center ${stage.active ? 'text-white' : 'text-gray-300'}`}>
                  {stage.title}
                </h3>
                <span className={`font-mono text-[9px] tracking-[0.2em] mt-2 uppercase ${stage.active ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stage.subtitle}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* === ACTIVE PATHWAYS === */}
      <section className="flex flex-col gap-8">
        <div className="flex items-end justify-between border-b border-white/5 pb-4">
          <h2 className="text-2xl font-medium text-white">Aktive Lernpfade</h2>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.15em] text-gray-500 uppercase">
              INDEE: 369.A — IN Entwicklung
            </span>
            <button
              onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
              className={`p-1.5 rounded-lg border transition-all duration-200 ${feedback === 'up' ? 'border-[#00f0ff]/40 text-[#00f0ff] bg-[#00f0ff]/10' : 'border-white/10 text-gray-600 hover:text-gray-400 hover:border-white/20'}`}
            >
              <ThumbsUp size={11} strokeWidth={2} />
            </button>
            <button
              onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
              className={`p-1.5 rounded-lg border transition-all duration-200 ${feedback === 'down' ? 'border-[#ff003c]/40 text-[#ff003c] bg-[#ff003c]/10' : 'border-white/10 text-gray-600 hover:text-gray-400 hover:border-white/20'}`}
            >
              <ThumbsDown size={11} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pathways.map((path) => (
            <div
              key={path.id}
              className="group relative flex flex-col p-8 rounded-3xl bg-[#0d0d0d] border border-white/5 hover:border-white/10 transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-mono text-[10px] text-gray-500 border border-white/10 px-2.5 py-1 rounded-md bg-white/[0.02] tracking-widest">
                  {path.id}
                </span>
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1 w-4 rounded-full ${i < path.progress ? 'bg-[#00f0ff]/60 shadow-[0_0_6px_rgba(0,240,255,0.3)]' : 'bg-white/5'}`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-medium text-white mb-3 leading-tight">{path.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-1 font-light">{path.description}</p>

              <div className="w-full h-[1px] bg-white/5 mb-6"></div>

              <div className="flex items-center justify-between">
                <div className="flex gap-8">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Dauer</span>
                    <span className="text-sm text-white font-medium">{path.duration}</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">{path.metricLabel}</span>
                    <span className={`text-sm font-medium ${path.metricValue === 'Offen' ? 'text-[#00f0ff]' : 'text-white'}`}>
                      {path.metricValue}
                    </span>
                  </div>
                </div>

                <button className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 bg-white/[0.02] group-hover:text-white group-hover:border-white/20 transition-all">
                  <ArrowRight size={15} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === CERTIFICATION MODULES === */}
      {/* <section className="flex flex-col gap-8">
        <div className="flex items-end justify-between border-b border-white/5 pb-4">
          <h2 className="text-2xl font-medium text-white">Zertifizierungsmodule</h2>
          <span className="font-mono text-[10px] tracking-[0.15em] text-gray-500 uppercase">
            REGISTER: AKTIV
          </span>
        </div>

        <div className="w-full overflow-x-auto rounded-3xl border border-white/5 bg-[#0d0d0d]">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="py-5 px-8 font-mono text-[9px] text-gray-500 uppercase tracking-widest font-normal">Modul-ID</th>
                <th className="py-5 px-8 font-mono text-[9px] text-gray-500 uppercase tracking-widest font-normal">Titel des Lehrplans</th>
                <th className="py-5 px-8 font-mono text-[9px] text-gray-500 uppercase tracking-widest font-normal">Kategorie</th>
                <th className="py-5 px-8 font-mono text-[9px] text-gray-500 uppercase tracking-widest font-normal text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {modules.map((mod) => (
                <tr key={mod.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-5 px-8">
                    <span className="font-mono text-sm text-gray-600 group-hover:text-gray-400 transition-colors">{mod.id}</span>
                  </td>
                  <td className="py-5 px-8 text-sm font-medium text-white">{mod.title}</td>
                  <td className="py-5 px-8">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full border font-mono text-[9px] tracking-widest uppercase ${mod.color}`}>
                      {mod.category}
                    </span>
                  </td>
                  <td className="py-5 px-8 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {mod.status === 'Abgeschlossen' && <Check size={14} className="text-[#00f0ff]/60" strokeWidth={2} />}
                      <span className={`text-sm ${
                        mod.status === 'Abgeschlossen'      ? 'text-gray-500' :
                        mod.status.includes('Bearbeitung')  ? 'text-white font-medium' :
                        mod.status === 'Gesperrt'           ? 'text-gray-700' : 'text-gray-500'
                      }`}>
                        {mod.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section> */}

    </div>
  );
}
