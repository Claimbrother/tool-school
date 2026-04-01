import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;

if (!apiKey) {
  throw new Error('MISTRAL_API_KEY environment variable is not set');
}

const client = new Mistral({ apiKey });

// Kurse für den System Prompt
const courses = [
  { title: "KI Integration", desc: "Lerne, wie du LLMs und KI-Tools nahtlos in deinen Workflow einbaust." },
  { title: "Web Development", desc: "Modernes Frontend mit Next.js, React und TailwindCSS meistern." },
  { title: "Data Analytics", desc: "Mache Daten sichtbar und nutzbar für fundierte Entscheidungen." },
  { title: "Cloud Architecture", desc: "Skalierbare Infrastrukturen in AWS und Azure designen." },
  { title: "Cyber Security", desc: "Schütze deine Anwendungen vor modernen Bedrohungen." },
  { title: "Agile Mastery", desc: "Projektmanagement für schnelle und effiziente Teams." },
  { title: "Growth Hacking", desc: "Skaliere dein Produkt mit datengetriebenem Marketing." },
  { title: "Team Leadership", desc: "Führe Remote- und Hybrid-Teams zum Erfolg." },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userQuery } = body;

    if (!userQuery?.trim()) {
      return Response.json({ error: 'Empty query' }, { status: 400 });
    }

    const courseContext = courses.map(c => `- ${c.title}: ${c.desc}`).join('\n');
    
    const systemPrompt = `Du bist ein freundlicher, professioneller Weiterbildungs-Berater für die 'Smart Mana Tool School'. 
Deine Aufgabe ist es, Nutzern basierend auf ihren Zielen die passenden Kurse aus unserem Portfolio zu empfehlen.

Hier ist unser aktuelles Kursportfolio:
${courseContext}

Antworte kurz, prägnant und motivierend (maximal 3-4 Sätze). Empfiehl maximal 2 Kurse, die am besten passen, und erkläre kurz warum. Nutze Emojis, um die Antwort aufzulockern.`;

    const response = await client.chat.complete({
      model: 'mistral-medium-latest',
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
      temperature: 0.7,
      maxTokens: 250,
    });

    const reply = response.choices?.[0]?.message?.content || 'Entschuldigung, ich konnte keine Antwort generieren.';

    return Response.json({ reply });
  } catch (error) {
    console.error('Mistral API Error:', error);
    return Response.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}
