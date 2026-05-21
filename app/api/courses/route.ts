import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') ?? 'de';
  const safeLocale = ['de', 'en', 'fr'].includes(locale) ? locale : 'de';

  let filePath = path.join(process.cwd(), `app/api/data/courses.${safeLocale}.json`);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), 'app/api/data/courses.json');
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  return NextResponse.json(JSON.parse(raw));
}
