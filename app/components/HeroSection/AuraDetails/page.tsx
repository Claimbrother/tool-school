'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { AuraCourse, CurriculumItem } from '@/app/types';
import Image from 'next/image';

const DetailHeroCard: React.FC<{ course: AuraCourse }> = ({ course }) => (
  <div className="relative rounded-[2rem] p-[1px] group fade-in">
    <div className={`absolute inset-0 bg-gradient-to-br ${course.theme.glowBg} rounded-[2rem] blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-100`}></div>
    <div className={`absolute inset-0 bg-gradient-to-br ${course.theme.glowBorder} rounded-[2rem]`}></div>
    <div className="relative bg-[#0d0d0d] rounded-[calc(2rem-1px)] p-8 md:p-12 z-10 flex flex-col h-full border border-white/5 shadow-2xl">
      <div className="flex justify-between items-start mb-8">
        <span className={`inline-flex items-center rounded-full ${course.theme.bg} px-3 py-1 text-[11px] font-mono font-semibold ${course.theme.color} border ${course.theme.border} uppercase tracking-widest`}>
          {course.moduleCode}
        </span>
        <span className="text-5xl md:text-7xl font-bold text-outline leading-none select-none">{course.number}</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight">{course.title}</h2>
      <p className="text-gray-400 text-base md:text-lg max-w-3xl leading-relaxed mb-12">{course.description}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 border-t border-white/5 pt-8">
        <div>
          <div className="font-mono text-[10px] text-gray-500 tracking-widest uppercase mb-2">Format</div>
          <div className="text-white text-sm font-medium">{course.format}</div>
        </div>
        <div>
          <div className="font-mono text-[10px] text-gray-500 tracking-widest uppercase mb-2">Dauer</div>
          <div className="text-white text-sm font-medium">{course.duration}</div>
        </div>
        <div>
          <div className="font-mono text-[10px] text-gray-500 tracking-widest uppercase mb-2">Level</div>
          <div className="text-white text-sm font-medium">{course.level}</div>
        </div>
        <div>
          <div className="font-mono text-[10px] text-gray-500 tracking-widest uppercase mb-2">Verfügbarkeit</div>
          <div className={`${course.theme.color} text-sm font-medium`}>{course.availability}</div>
        </div>
      </div>
      <div>
        <button className="bg-white hover:bg-gray-200 text-black px-8 py-3.5 rounded-full font-medium text-sm transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          Jetzt Termin vereinbaren
        </button>
      </div>
    </div>
  </div>
);

const CurriculumList: React.FC<{ items: CurriculumItem[]; accentColor: string }> = ({ items, accentColor }) => (
  <div className="lg:col-span-7 bg-[#0d0d0d] border border-white/5 rounded-3xl p-8 md:p-10 shadow-lg fade-in" style={{ animationDelay: '0.1s' }}>
    <div className={`flex items-center gap-4 mb-10 font-mono text-[11px] font-bold tracking-[0.2em] uppercase ${accentColor}`}>
      <div className="h-[1px] w-8 bg-current opacity-70"></div>
      Curriculum Breakdown
    </div>
    <div className="space-y-10 relative">
      <div className="absolute left-[3.25rem] top-2 bottom-2 w-[1px] bg-white/5 hidden sm:block"></div>
      {items.map((item, index) => (
        <div key={index} className={`flex flex-col sm:flex-row gap-4 sm:gap-8 relative z-10 ${index !== 0 ? 'pt-6 sm:pt-0 sm:border-t-0 border-t border-white/5' : ''}`}>
          <div className="w-20 shrink-0 font-mono text-[11px] text-gray-500 pt-1 tracking-wider">{item.time}</div>
          <div>
            <h4 className="text-white font-medium text-base mb-2">{item.title}</h4>
            <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const OutcomesList: React.FC<{ outcomes: string[] }> = ({ outcomes }) => (
  <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-8 shadow-lg flex-1 fade-in" style={{ animationDelay: '0.2s' }}>
    <div className="flex items-center gap-4 mb-8 font-mono text-[11px] font-bold tracking-[0.2em] text-[#ff003c] uppercase">
      <div className="h-[1px] w-8 bg-[#ff003c] shadow-[0_0_8px_rgba(255,0,60,0.6)]"></div>
      Learning Outcomes
    </div>
    <ul className="space-y-4">
      {outcomes.map((outcome, index) => (
        <li key={index} className="flex gap-4 items-start text-sm text-gray-400 leading-relaxed">
          <span className="text-[#ff003c] mt-0.5 font-mono">→</span>
          <span>{outcome}</span>
        </li>
      ))}
    </ul>
  </div>
);

const InstructorCard: React.FC = () => (
  <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-8 shadow-lg fade-in" style={{ animationDelay: '0.3s' }}>
    <div className="flex items-center gap-4 mb-6 font-mono text-[11px] font-bold tracking-[0.2em] text-[#ffcc00] uppercase">
      <div className="h-[1px] w-8 bg-[#ffcc00] shadow-[0_0_8px_rgba(255,204,0,0.6)]"></div>
      Lead Instructor
    </div>
    <div className="flex gap-5 items-start">
      <div className="w-14 h-16 rounded-full bg-gradient-to-b from-[#161616] to-[#050505] border border-white/5 shrink-0 shadow-inner">
      <Image src="/PorfolioIMG.jpeg" 
      alt="Instructor Photo" 
      width={56} 
      height={64} 
      className="rounded-full object-cover" />
      </div>
      <div>
        <h4 className="text-white text-lg font-medium mb-1">Falilou Holler</h4>
        <div className="font-mono text-[10px] text-gray-500 mb-3 tracking-[0.1em] uppercase">
          WEB.DEV. // AI.SPECIALIST
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">
          Experte für angewandte KI und digitale Didaktik mit 10+ Jahren Erfahrung in der Technologievermittlung.
        </p>
      </div>
    </div>
  </div>
);

export default function AuraDetails({ course }: { course?: AuraCourse }) {
  if (!course) return null;
  return (
    <div className="space-y-6">
      <DetailHeroCard course={course} />
      <div className="grid lg:grid-cols-12 gap-6">
        <CurriculumList items={course.curriculum} accentColor={course.theme.color} />
        <div className="lg:col-span-5 flex flex-col gap-6">
          <OutcomesList outcomes={course.outcomes} />
          <InstructorCard />
        </div>
      </div>
    </div>
  );
}
