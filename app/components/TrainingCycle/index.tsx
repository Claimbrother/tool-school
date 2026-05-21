'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Cpu, Layers, Info, ArrowRight, ThumbsUp, ThumbsDown, BrainCircuit } from 'lucide-react';

const stageIcons = [Info, Layers, Cpu, BrainCircuit];
const stageActive = [false, true, false, false];

const pathwayIds = ['TRK.CLD.01', 'TRK.SEC.02', 'TRK.DVO.03'];
const pathwayProgress = [2, 3, 0];

export default function TrainingCyclePath() {
  const t = useTranslations('TrainingCycle');
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
            <span className="text-white">{t('heading1')}</span><br />
            <span className="text-gray-500">{t('heading2')}</span>
          </h2>
        </div>

        {/* Stage Cards */}
        <div className="relative w-full grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
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

          {stageIcons.map((Icon, i) => {
            const active = stageActive[i];
            return (
              <div
                key={i}
                className={`relative z-10 flex flex-col items-center justify-center py-6 md:py-8 px-3 md:px-4 rounded-3xl bg-[#0d0d0d] transition-all duration-300
                  ${active
                    ? 'border border-[#00f0ff]/20 shadow-[0_0_30px_rgba(0,240,255,0.05)]'
                    : 'border border-white/5'
                  }`}
              >
                <div className={`p-3 rounded-2xl mb-4 border border-white/5 ${active ? 'text-[#00f0ff]' : 'text-gray-500'}`}>
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className={`font-medium text-xs md:text-sm text-center ${active ? 'text-white' : 'text-gray-300'}`}>
                  {t(`stages.${i}.title`)}
                </h3>
                <span className={`font-mono text-[8px] md:text-[9px] tracking-[0.2em] mt-2 uppercase text-center ${active ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t(`stages.${i}.subtitle`)}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* === ACTIVE PATHWAYS === */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/5 pb-4 gap-3">
          <h2 className="text-2xl font-medium text-white">{t('mentoring')}</h2>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.15em] text-gray-500 uppercase hidden sm:inline">
              {t('status')}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {pathwayIds.map((id, i) => (
            <div
              key={id}
              className="group relative flex flex-col p-8 rounded-3xl bg-[#0d0d0d] border border-white/5 hover:border-white/10 transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-mono text-[10px] text-gray-500 border border-white/10 px-2.5 py-1 rounded-md bg-white/[0.02] tracking-widest">
                  {id}
                </span>
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className={`h-1 w-4 rounded-full ${dot < pathwayProgress[i] ? 'bg-[#00f0ff]/60 shadow-[0_0_6px_rgba(0,240,255,0.3)]' : 'bg-white/5'}`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-medium text-white mb-3 leading-tight">{t(`pathways.${i}.title`)}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-1 font-light">{t(`pathways.${i}.description`)}</p>

              <div className="w-full h-[1px] bg-white/5 mb-6"></div>

              <div className="flex items-center justify-between">
                <div className="flex gap-8">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">{t('durationLabel')}</span>
                    <span className="text-sm text-white font-medium">{t(`pathways.${i}.duration`)}</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">{t(`pathways.${i}.metricLabel`)}</span>
                    <span className={`text-sm font-medium ${t(`pathways.${i}.metricValue`) === 'Offen' || t(`pathways.${i}.metricValue`) === 'Open' || t(`pathways.${i}.metricValue`) === 'Ouvert' ? 'text-[#00f0ff]' : 'text-white'}`}>
                      {t(`pathways.${i}.metricValue`)}
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

    </div>
  );
}
