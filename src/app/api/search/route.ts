import { NextRequest, NextResponse } from 'next/server';
import { loadPrompts, getCategories, getSources } from '@/lib/load-prompts';
import { Prompt } from '@/lib/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase() || '';
  const source = searchParams.get('source') || '';
  const category = searchParams.get('category') || '';
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const pageSize = Math.min(50, Math.max(1, parseInt(searchParams.get('pageSize') || '24')));

  try {
    const data = await loadPrompts();
    let results: Prompt[] = data.prompts;

    if (source) {
      results = results.filter(p => p.source?.toLowerCase().includes(source.toLowerCase()));
    }
    if (category) {
      results = results.filter(p => (p.category || '未分类') === category);
    }
    if (q) {
      results = results.filter(p => {
        const searchText = [p.title, p.prompt, p.category, p.sub_category, p.author, p.source]
          .filter(Boolean).join(' ').toLowerCase();
        return searchText.includes(q);
      });
    }

    const total = results.length;
    const totalPages = Math.ceil(total / pageSize);
    const paginated = results.slice((page - 1) * pageSize, page * pageSize);

    return NextResponse.json({
      total,
      page,
      pageSize,
      totalPages,
      prompts: paginated,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to load prompts data', total: 0, page: 1, pageSize, totalPages: 0, prompts: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const q = (body.q || '').toLowerCase();
  const source = body.source || '';
  const category = body.category || '';
  const page = Math.max(1, body.page || 1);
  const pageSize = Math.min(50, Math.max(1, body.pageSize || 24));

  try {
    const data = await loadPrompts();
    let results: Prompt[] = data.prompts;

    if (source) results = results.filter(p => p.source?.toLowerCase().includes(source.toLowerCase()));
    if (category) results = results.filter(p => (p.category || '未分类') === category);
    if (q) {
      results = results.filter(p => {
        const searchText = [p.title, p.prompt, p.category, p.sub_category, p.author, p.source]
          .filter(Boolean).join(' ').toLowerCase();
        return searchText.includes(q);
      });
    }

    const total = results.length;
    const totalPages = Math.ceil(total / pageSize);
    const paginated = results.slice((page - 1) * pageSize, page * pageSize);
    const categories = getCategories(data);
    const sources = getSources(data);

    return NextResponse.json({ total, page, pageSize, totalPages, prompts: paginated, categories, sources });
  } catch (error) {
    return NextResponse.json({ error: 'Failed', total: 0, page: 1, pageSize, totalPages: 0, prompts: [] });
  }
}
