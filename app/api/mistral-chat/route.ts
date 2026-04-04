import { Mistral } from '@mistralai/mistralai';
import { promises as fs } from 'fs'; 
import path from 'path';            

import applicantData from '@/app/api/data/applicant.json';
import courses from '@/app/api/data/courses/course-details.json';


const apiKey = process.env.MISTRAL_API_KEY;

if (!apiKey) {
  throw new Error('MISTRAL_API_KEY environment variable is not set');
}

const client = new Mistral({ apiKey });

type Applicant = typeof applicantData.applicant;

const formatList = (items: string[] | undefined) => items?.join(', ');

// userQuery entfernt, da der Kontext durch das Chat-Array (messages) kommt
const buildSystemPrompt = (currentCourses: any[], courseKnowledge: string) => {
  const app = applicantData.applicant as Applicant;

  const focusAreas = formatList(app.professional_summary.focus_areas);

  const experienceLines = app.experience_deep_dive
    .map((exp) => `- ${exp.role} (${exp.organization}): Fokus auf ${formatList(exp.key_competencies_learned)}`)
    .join('\n');

  const innovationProjects = app.innovation_projects
    .map((p) => `- ${p.title}: Stack [${formatList(p.stack)}] | Impact: ${formatList(p.delivered_value)}`)
    .join('\n');

  const courseList = currentCourses.map((c: any) => `- ${c.title}: ${c.desc}`).join('\n');

  return `Du bist der Kursberater der "Smart Mana Tool School". Deine Aufgabe ist es, Nutzer basierend auf ihren Zielen zu beraten und die Mentorings von Falilou Holler zu empfehlen.

ÜBER DEN MENTOR (Falilou Holler):
- Expertise: ${focusAreas}
- Praxiserfahrung & Stationen:
${experienceLines}
- Agentic & AI Proof of Concept:
${innovationProjects}

AKTUELLES KURSWISSEN (Wissensbasis):
---
${courseList}
---

ZUSÄTZLICHES WISSEN (Philosophie & MD-Dateien):
---
${courseKnowledge}
---

DEINE AUFGABE:
1. Analyse: Welches Skill-Level hat der Nutzer und was ist sein Ziel auf Basis des Chatverlaufs?
2. Beratung: Empfiehl maximal 2 passende Kurse aus der Wissensbasis.
3. Proof of Concept: Erwähne kurz, dass die Inhalte auf Falilous realer Projekterfahrung (z.B. Enterprise-Infrastruktur bei Daimler/Vodafone oder AI-Integration für OBI) basieren.
4. Tonfall: Professionell, motivierend, "Build-to-Solve"-orientiert.
5. Next Step: Schlage bei Interesse ein 15-30 minütiges Mentor-Matching vor.

Regeln:
- Max. 3-5 Sätze.
- Antworte auf Deutsch.
- Antworte nur auf Basis der Wissensbasis.
- Nutze die Chat-Historie, um den Kontext zu verstehen.
- Nutze die Wissensbasis, um die Antwort zu generieren.
- Nutze die Zusätzlichen Informationen, um die Antwort zu ergänzen.
- Nutze die Mentoring-Philo, um die Antwort zu ergänzen.
- Nur Informationen aus der Wissensbasis verwenden.
- Dezente Emojis (max. 2).
- Antworte nicht in Markdown.`;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body;

    // Array Validierung statt userQuery String-Check
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: 'Invalid or missing messages array' }, { status: 400 });
    }

    // Lade Kurse und Mentoring-Wissen (MD-Datei) synchronus vor der Antwortgenerierung
    const mentoringFilePath = path.join(process.cwd(), 'app', 'api', 'data', 'mentoring-philosophy.md');
    let mentoringContent = "";
    
    try {
      mentoringContent = await fs.readFile(mentoringFilePath, 'utf8');
    } catch (err) {
      console.warn("Konnte mentoring-philosophy.md nicht laden:", err);
      mentoringContent = "Kein zusätzliches Mentoring-Wissen verfügbar."; 
    }

    const systemPrompt = buildSystemPrompt(courses, mentoringContent);

    // Chat-Historie vorbereiten (System-Prompt + User/Assistant Historie)
    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const response = await client.chat.complete({
      model: 'mistral-large-latest',
      messages: apiMessages,
      temperature: 0.3,
      maxTokens: 300,
    });

    const reply = response.choices?.[0]?.message?.content || 'Entschuldigung, ich konnte keine Antwort generieren.';

    return Response.json({ reply });
  } catch (error) {
    console.error('Mistral API Error:', error);
    return Response.json(
      { error: 'Fehler bei der Kursberatung' },
      { status: 500 }
    );
  }
}