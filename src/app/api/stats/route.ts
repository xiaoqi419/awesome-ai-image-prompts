import { NextResponse } from 'next/server';
import { loadPrompts, getCategories, getSources } from '@/lib/load-prompts';

export async function GET() {
  try {
    const data = await loadPrompts();
    return NextResponse.json({
      total: data.total,
      categories: getCategories(data),
      sources: getSources(data),
    });
  } catch {
    return NextResponse.json({ total: 0, categories: [], sources: [] });
  }
}
