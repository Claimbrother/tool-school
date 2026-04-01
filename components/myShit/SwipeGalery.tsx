"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Cpu, Database, Cloud, Shield, Zap, Target, Users, Code} from "lucide-react";
import CourseCard from "./GlassCard";

// ============================================================================
// MOCK DATA: Deine 8 Kurse / Tools
// ============================================================================
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

const MobileSwipeGallery = () => {
  const [emblaRef] = useEmblaCarousel({ 
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  return (
    <div className="w-full md:hidden mt-12 overflow-hidden" ref={emblaRef}>
      <div className="flex touch-pan-y pl-4 pr-16 space-x-4">
        {courses.map((course) => (
          <div key={course.id} className="flex-[0_0_85%] min-w-0">
            <CourseCard course={course} />
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-2">
        <span className="text-slate-500 text-sm flex items-center gap-2">
          ← Wische für mehr →
        </span>
      </div>
    </div>
  );
};

export default MobileSwipeGallery;