import { Mistral } from '@mistralai/mistralai';
import { getKnowledgeContext } from '../data/lib/knowledgeLoader';
// Zugriff auf die zentralen Daten
import applicantData from '@/app/api/data/applicant.json';

import courses from '@/app/api/data/courses/course-details.json';

const apiKey = process.env.MISTRAL_API_KEY;

// Strikter API-Key Check (wie im funktionierenden Modell)
if (!apiKey) {
  throw new Error('MISTRAL_API_KEY environment variable is not set');
}

const client = new Mistral({ apiKey });

// Typ-Definition basierend auf der neuen applicant.json Struktur
type Applicant = typeof applicantData.applicant;

const formatList = (items: string[] | undefined) => items?.join(', ');

const buildSystemPrompt = (userQuery: string, currentCourses: any[], courseKnowledge: string) => {
  const app = applicantData.applicant as Applicant;

  // Extraktion der Schwerpunkte für den Mentor-Vibe
  const focusAreas = formatList(app.professional_summary.focus_areas);

  // Verknüpfung der realen Projekterfahrung & Historie (Proof of Concept)
  const experienceLines = app.experience_deep_dive
    .map((exp) => `- ${exp.role} (${exp.organization}): Fokus auf ${formatList(exp.key_competencies_learned)}`)
    .join('\n');

  // Fallback auf die externen Projekte, falls benötigt (oder OBI aus der JSON)
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
1. Analyse: Welches Skill-Level hat der Nutzer und was ist sein Ziel?
2. Beratung: Empfiehl maximal 2 passende Kurse aus der Wissensbasis.
3. Proof of Concept: Erwähne kurz, dass die Inhalte auf Falilous realer Projekterfahrung (z.B. Enterprise-Infrastruktur bei Daimler/Vodafone oder AI-Integration für OBI) basieren.
4. Tonfall: Professionell, motivierend, "Build-to-Solve"-orientiert.
5. Next Step: Schlage bei Interesse ein 15-minütiges Mentor-Matching vor.

Regeln:
- Max. 3-5 Sätze.
- Antworte auf Deutsch.
- Nur Informationen aus der Wissensbasis verwenden.
- Dezente Emojis (max. 2).

Anfrage: "${userQuery}"`;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userQuery } = body;

    // Strikte Abfrage (wie im funktionierenden Modell)
    if (!userQuery?.trim()) {
      return Response.json({ error: 'Empty query' }, { status: 400 });
    }

    // 1. Lade dynamisches Wissen aus den .md Dateien (Kurse/Philosophie)
    const courseKnowledge = await getKnowledgeContext();
    
    // 2. Baue den Prompt unter Einbeziehung der JSON-Daten UND des dynamischen Wissens
    const systemPrompt = buildSystemPrompt(userQuery, courses, courseKnowledge);

    const response = await client.chat.complete({
      model: 'mistral-large-latest',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userQuery,
        },
      ],
      temperature: 0.3,
      maxTokens: 300,
    });

    // Sicheres Extrahieren der Antwort (wie im funktionierenden Modell)
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