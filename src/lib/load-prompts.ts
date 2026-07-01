import { promises as fs } from 'fs';
import path from 'path';
import { UnifiedData } from './types';

let cachedData: UnifiedData | null = null;

export async function loadPrompts(): Promise<UnifiedData> {
  if (cachedData) return cachedData;
  const filePath = path.join(process.cwd(), 'public', 'prompts_unified.json');
  const raw = await fs.readFile(filePath, 'utf-8');
  cachedData = JSON.parse(raw);
  return cachedData!;
}

export function getCategories(data: UnifiedData): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of data.prompts) {
    const cat = p.category || '未分类';
    map.set(cat, (map.get(cat) || 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getSources(data: UnifiedData): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of data.prompts) {
    const src = p.source || '未知';
    map.set(src, (map.get(src) || 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
