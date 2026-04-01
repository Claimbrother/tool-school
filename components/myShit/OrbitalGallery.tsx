"use client";
import CourseCardOrbital from "./GlassCardOrbital";
import { Cpu, Database, Cloud, Shield, Zap, Target, Users, Code } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "KI Integration",
    desc: "Lerne, wie du LLMs und KI-Tools nahtlos in deinen Workflow einbaust.",
    longDesc: "Dieser Kurs zeigt dir praxisnah, wie du Automatisierungen mit KI-Agents baust. Wir nutzen OpenAI, Anthropic und Open-Source Modelle für echte Use Cases.",
    icon: Cpu,
  },
  {
    id: 2,
    title: "Web Development",
    desc: "Modernes Frontend mit Next.js, React und TailwindCSS meistern.",
    longDesc: "Von den Grundlagen bis zum fertigen Produkt. Wir fokussieren uns auf Performance, SEO und skalierbare Architekturen in der modernen Webentwicklung.",
    icon: Code,
  },
  {
    id: 3,
    title: "Data Analytics",
    desc: "Mache Daten sichtbar und nutzbar für fundierte Entscheidungen.",
    longDesc: "Lerne Tools wie PowerBI, Tableau und Python-basierte Datenanalyse kennen, um aus unstrukturierten Daten wertvolle Business Insights zu generieren.",
    icon: Database,
  },
  {
    id: 4,
    title: "Cloud Architecture",
    desc: "Skalierbare Infrastrukturen in AWS und Azure designen.",
    longDesc: "Verstehe Serverless, Container (Docker/Kubernetes) und CI/CD Pipelines, um moderne Applikationen sicher und hochverfügbar zu hosten.",
    icon: Cloud,
  },
  {
    id: 5,
    title: "Cyber Security",
    desc: "Schütze deine Anwendungen vor modernen Bedrohungen.",
    longDesc: "Ein Deep-Dive in Penetration Testing, Verschlüsselungsstandards und Best Practices, um Unternehmensdaten effektiv zu sichern.",
    icon: Shield,
  },
  {
    id: 6,
    title: "Agile Mastery",
    desc: "Projektmanagement für schnelle und effiziente Teams.",
    longDesc: "Scrum, Kanban und moderne Führungsmethoden. Wie man Teams motiviert und Produkte iterativ und nutzerzentriert entwickelt.",
    icon: Target,
  },
  {
    id: 7,
    title: "Growth Hacking",
    desc: "Skaliere dein Produkt mit datengetriebenem Marketing.",
    longDesc: "Erlerne Techniken zur Nutzergewinnung, Conversion-Optimierung und Viralität. Tools und Taktiken für schnelles, messbares Wachstum.",
    icon: Zap,
  },
  {
    id: 8,
    title: "Team Leadership",
    desc: "Führe Remote- und Hybrid-Teams zum Erfolg.",
    longDesc: "Soft Skills, Konfliktmanagement und Kommunikationsstrategien für die moderne, dezentrale Arbeitswelt.",
    icon: Users,
  },
];
const OrbitingGallery = () => {
  const radiusX = 620;  // Horizontaler Radius (größer)
  const radiusY = 450;  // Vertikaler Radius (kleiner) - erzeugt horizontales Oval
  const totalCards = courses.length;

  return (
    <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
      <div className="relative group animate-[spin_60s_linear_infinite] hover:[animation-play-state:paused] pointer-events-auto">
        
        {courses.map((course, index) => {
          const angle = (index / totalCards) * 2 * Math.PI;
          const x = Math.cos(angle) * radiusX;  // Elliptisch: X größer
          const y = Math.sin(angle) * radiusY;  // Elliptisch: Y kleiner

          return (
            <div
              key={course.id}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <div className="w-80 h-[220px] animate-[spin_60s_linear_infinite_reverse] group-hover:[animation-play-state:paused]">
                <CourseCardOrbital course={course} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrbitingGallery;