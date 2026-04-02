import fs from 'fs/promises';
import path from 'path';

export async function getKnowledgeContext() {
  const coursesDir = path.join(process.cwd(), 'app/api/data/courses');
  
  try {
    // 1. Alle Dateien im Ordner lesen
    const files = await fs.readdir(coursesDir);
    
    let fullContext = "Hier ist das aktuelle Wissen der Smart Mana Tool School:\n\n";

    for (const file of files) {
      const filePath = path.join(coursesDir, file);
      const content = await fs.readFile(filePath, 'utf-8');

      if (file.endsWith('.json')) {
        // JSON kompakt einfügen
        try {
          const data = JSON.parse(content);
          fullContext += `### Metadaten (${file}):\n${JSON.stringify(data, null, 2)}\n\n`;
        } catch (e) {
          console.error(`Failed to parse JSON file ${file}:`, e);
        }
      } else if (file.endsWith('.md')) {
        // Markdown direkt übernehmen
        fullContext += `### Kursdetails aus ${file}:\n${content}\n\n`;
      }
    }

    return fullContext;
  } catch (error) {
    console.error('Error loading knowledge context:', error);
    return "Hier ist das aktuelle Wissen der Smart Mana Tool School:\n\nKeine Kursdetails verfügbar.";
  }
}