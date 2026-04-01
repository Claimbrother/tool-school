"use client";
import { BrainIcon } from '@/components/ui/brain-icon';
import { LoaderIcon } from '@/components/ui/loader-icon';
import { ShieldUserIcon } from '@/components/ui/shield-user-icon';
import { motion } from 'framer-motion';
import CourseCard from '../../../components/myShit/GlassCard';


const SchulungenSection = () => {
  const courses = [
    {
      icon: BrainIcon,
      title: "KI im Alltag verstehen",
      desc: "Lernen Sie die Grundlagen der Künstlichen Intelligenz (wie ChatGPT, Gemini, NotebookLM uvm.) kennen. Ich erklären ohne Fachjargon, wie Sie diese Werkzeuge sicher und hilfreich im Alltag nutzen können.",
      longDesc: "In diesem Kurs tauchen wir in die Welt der Künstlichen Intelligenz ein, speziell in die Funktionsweise von ChatGPT und Gemini. Sie lernen, wie KI-Modelle trainiert werden, welche Möglichkeiten sie bieten und vor allem, wie Sie diese Technologien sicher und effektiv in Ihrem Alltag einsetzen können. Von der Erstellung von Texten über die Beantwortung von Fragen bis hin zur Automatisierung von Aufgaben – entdecken Sie die vielfältigen Einsatzmöglichkeiten von KI und wie sie Ihren Alltag erleichtern kann."
    },
    {
      icon: ShieldUserIcon,
      title: "Sicher im Internet bewegen",
      desc: "Erkennen Sie Gefahren, schützen Sie Ihre persönlichen Daten und bewegen Sie sich selbstbewusst im Netz. Ein praxisnaher Kurs für ein sicheres digitales Leben.",
      longDesc: "Die schiere Masse an Informationen im Internet kann überwältigend wirken. In diesem Kurs lernen Sie daher, wie Sie sich im Internet sicher bewegen können. Wir behandeln Themen wie Datenschutz, Identitätsdiebstahl und Cybermobbing. Sie erfahren, wie Sie Ihre persönlichen Daten schützen und welche Maßnahmen Sie ergreifen können, um sich und angehörige vor Online-Gefahren zu schützen. Der Kurs bietet praktische Tipps und Strategien, um sicher und selbstbewusst durch den digitalen Jungel der Soziale Medien und Schlagzeilen zu navigieren."
    },
    {
      icon: LoaderIcon,
      title: "Smartphone & Apps meistern",
      desc: "Von den Grundeinstellungen bis zu nützlichen Apps für Reisen, Gesundheit und Kommunikation. Wir machen Sie fit für den täglichen Umgang mit Ihrem Smartphone.",
      longDesc: "In diesem Kurs lernen Sie, wie Sie Ihr Smartphone effektiv nutzen können. Wir behandeln Themen wie Grundeinstellungen, nützliche Apps für Reisen, Gesundheit und Kommunikation. Sie erfahren, wie Sie Ihre Geräte optimal anpassen und welche Funktionen Ihnen das Leben erleichtern können."
    }
  ];

  return (
    <section id="schulungen" className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mt-12 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-6 pb-6">IT & KI endlich verstehen <br /> ganz ohne Fachchinesisch</h2>
          <p className="text-slate-400 text-lg">
            Damit Sie sich nicht mühsam mit komplexen IT- und KI-Themen auseinandersetzen müssen, bereite ich diese für Sie verständlich auf. Ich konzentriere mich genau auf die Bereiche, die Ihnen bisher wie ein unlösbares Rätsel erschienen sind. Durch meine jahrelange Erfahrung im IT-Bereich und meine lebenslange Begeisterung für moderne Technologien habe ich nie den Anschluss an die digitale Welt verloren. Mir fällt es leicht, mich auch in neue Themen einzuarbeiten – selbst wenn diese komplex wirken. Dieses Wissen gebe ich an Sie weiter. 
          </p>
          {/* <p className="text-slate-400 text-lg">
            Technologie entwickelt sich schnell. Im Jahr 2026 sogar etwas zu schnell um für die meisten noch mit zu kommen. Meine Schulungen sind speziell darauf ausgerichtet, 
            komplexe Themen verständlich, geduldig und praxisnah zu vermitteln.
          </p> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="h-full"
            >
              {/* Hier rufen wir unsere neue Flip-Karten-Komponente auf */}
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchulungenSection;
