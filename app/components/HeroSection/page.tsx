'use client';

import React, { useState, useEffect } from 'react';
import { AuraCourse } from '@/app/types';
import AuraDetails from './AuraDetails/page';

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

  body {
    font-family: 'Inter', sans-serif;
    background-color: transparent;
    margin: 0;
  }
  .font-mono {
    font-family: 'JetBrains Mono', monospace;
  }
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #2a2a2a;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #3a3a3a;
  }
  .text-outline {
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);
    color: transparent;
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }
  .status-dot {
    animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .fade-in {
    animation: fadeIn 0.4s ease-out forwards;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Sidebar: React.FC<{ onViewChange: (id: string | null) => void; isDetailView: boolean }> = ({ onViewChange, isDetailView }) => (
  <aside className="w-full md:w-80 lg:w-96 shrink-0 border-b md:border-b-0 md:border-r border-white/5 flex flex-col p-8 lg:p-12 z-20 bg-transparent backdrop-blur-sm transition-all duration-300">
    <button onClick={() => onViewChange(null)} className="font-mono text-[10px] text-gray-500 hover:text-white transition-colors tracking-[0.2em] mb-12 uppercase text-left w-fit">
      F.H.C // Tool School
    </button>

    {isDetailView && (
      <button onClick={() => onViewChange(null)} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors w-fit mb-12 group fade-in">
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Zurück zur Übersicht
      </button>
    )}

    <div className={isDetailView ? 'mt-0' : 'mt-8 md:mt-12'}>
      <h1 className="text-4xl lg:text-5xl text-white font-light tracking-tight leading-[1.1] mb-6">
        Demystify<br />The Digital<span className="text-gray-500">.</span>
      </h1>
      <p className="text-gray-400 leading-relaxed text-sm lg:text-base pr-4 mb-12">
        Premium IT Mentoring und strukturierte KI-Grundschulungen. Wir übersetzen komplexe Technologie in anwendbares Wissen für Ihren sicheren Alltag.
      </p>

      {!isDetailView && (
        <nav className="flex flex-col gap-4 fade-in">
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Mentoring Ansatz</a>
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Über die Dozenten</a>
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terminanfrage</a>
        </nav>
      )}
    </div>
    <div className="flex-grow"></div>
    <div className="hidden md:flex mt-12 items-center gap-3 font-mono text-[10px] text-gray-600 tracking-widest uppercase">
      <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] status-dot shadow-[0_0_8px_rgba(0,240,255,0.8)]"></span>
      System Online // Enrollment Open
    </div>
  </aside>
);

const OverviewCourseCard: React.FC<{ course: AuraCourse; onSelect: () => void }> = ({ course, onSelect }) => (
  <div className="relative rounded-[2rem] p-[1px] group cursor-pointer fade-in" onClick={onSelect}>
    <div className={`absolute inset-0 bg-gradient-to-br ${course.theme.glowBg} rounded-[2rem] blur-xl opacity-40 transition-opacity duration-500 group-hover:opacity-100`}></div>
    <div className={`absolute inset-0 bg-gradient-to-br ${course.theme.glowBorder} rounded-[2rem]`}></div>
    <div className="relative bg-[#0d0d0d] rounded-[calc(2rem-1px)] p-8 md:p-10 z-10 flex flex-col h-full border border-white/5 shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]">
      <div className="flex justify-between items-start mb-8">
        <span className="text-5xl md:text-6xl font-bold text-outline leading-none select-none">{course.number}</span>
        <span className={`inline-flex items-center rounded-full ${course.theme.bg} px-3 py-1 text-[10px] md:text-[11px] font-mono font-semibold ${course.theme.color} border ${course.theme.border} uppercase tracking-widest`}>
          {course.moduleCode}
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-medium text-white mb-4 tracking-tight">{course.title}</h2>
      <p className="text-gray-400 text-sm md:text-base max-w-3xl leading-relaxed mb-10 line-clamp-3">{course.description}</p>
      <div className="mt-auto flex flex-col md:flex-row md:items-center justify-between border-t border-white/5 pt-6 gap-6">
        <div className="flex gap-8">
          <div>
            <div className="font-mono text-[9px] text-gray-500 tracking-widest uppercase mb-1.5">Format</div>
            <div className="text-white text-xs font-medium">{course.format}</div>
          </div>
          <div>
            <div className="font-mono text-[9px] text-gray-500 tracking-widest uppercase mb-1.5">Dauer</div>
            <div className="text-white text-xs font-medium">{course.duration}</div>
          </div>
          <div>
            <div className="font-mono text-[9px] text-gray-500 tracking-widest uppercase mb-1.5">Level</div>
            <div className="text-white text-xs font-medium">{course.level}</div>
          </div>
        </div>
        <button className="self-start md:self-auto border border-white/10 hover:border-white/30 text-gray-300 hover:text-white bg-transparent hover:bg-white/5 px-6 py-2.5 rounded-full font-medium text-xs transition-all">
          Details ansehen
        </button>
      </div>
    </div>
  </div>
);

const CourseOverview: React.FC<{ courses: AuraCourse[]; onSelectCourse: (id: string) => void }> = ({ courses, onSelectCourse }) => (
  <div className="space-y-8 pb-12">
    <div className="fade-in mb-8">
      <h2 className="text-white text-2xl font-medium tracking-tight mb-2">Verfügbare Module</h2>
      <p className="text-gray-500 text-sm">Wählen Sie ein Modul für detaillierte Informationen.</p>
    </div>
    {courses.map(course => (
      <OverviewCourseCard
        key={course.id}
        course={course}
        onSelect={() => onSelectCourse(course.id)}
      />
    ))}
  </div>
);

export default function HeroSection() {
  const [courses, setCourses] = useState<AuraCourse[]>([]);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  const activeCourse = courses.find(c => c.id === activeCourseId);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      <div className="bg-transparent text-gray-300 flex flex-col md:flex-row selection:bg-[#00f0ff]/30 selection:text-white">

        <Sidebar
          onViewChange={setActiveCourseId}
          isDetailView={activeCourse !== undefined}
        />

        <main className="flex-1 px-4 pb-24 pt-24 md:px-8 md:pt-28 lg:px-12 lg:pt-28">
          <div className="max-w-5xl mr-auto ml-[425px]">
            {!activeCourse ? (
              <CourseOverview
                courses={courses}
                onSelectCourse={setActiveCourseId}
              />
            ) : (
              <AuraDetails course={activeCourse} />
            )}
          </div>
        </main>

      </div>
    </>
  );
}
