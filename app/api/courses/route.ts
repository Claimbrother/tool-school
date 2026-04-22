import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  const filePath = path.join(process.cwd(), 'app/api/data/courses.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return NextResponse.json(JSON.parse(raw));
}
