"use client";
import { useState, useCallback, useEffect } from "react";
import { Search, Sparkles, Filter } from "lucide-react";
import CategoryFilter from "@/components/CategoryFilter";
import SourceFilter from "@/components/SourceFilter";
import PromptCard from "@/components/PromptCard";
import PageNav from "@/components/Pagination";
import Lightbox from "@/components/Lightbox";
import { Prompt } from "@/lib/types";

interface StatsInfo {
  total: number;
  categories: { name: string; count: number }[];
  sources: { name: string; count: number }[];
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="aspect-[4/3] skeleton" />
          <div className="p-5 space-y-3">
            <div className="h-4 skeleton rounded w-3/4" />
            <div className="h-3.5 skeleton rounded w-1/3" />
            <div className="space-y-2">
              <div className="h-3 skeleton rounded" />
              <div className="h-3 skeleton rounded w-5/6" />
              <div className="h-3 skeleton rounded w-2/3" />
            </div>
            <div className="h-7 skeleton rounded-full w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ q, cat, src }: { q: string; cat: string; src: string }) {
  const hasFilter = q || cat || src;
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-14 h-14 rounded-full flex items-center justify-center bg-amber-50">
        <Search className="w-6 h-6 text-amber-500" />
      </div>
      <p className="text-base font-medium text-stone-700">没有找到匹配结果</p>
      <p className="text-sm text-stone-400">{hasFilter ? "试试换个关键词，或者调整筛选条件" : "暂无数据"}</p>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<Prompt[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [stats, setStats] = useState<StatsInfo | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => setStats(d))
      .catch(() => {});
  }, []);

  const doSearch = useCallback(
    async (p: number, cat: string, src: string) => {
      setFetching(true);
      try {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ q: query, category: cat, source: src, page: p, pageSize: 18 }),
        });
        const data = await res.json();
        setResults(data.prompts || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 0);
      } catch {
        setResults([]);
        setTotal(0);
        setTotalPages(0);
      }
      setFetching(false);
    },
    [query]
  );

  useEffect(() => { doSearch(1, "", ""); }, [doSearch]);

  const handleSearch = () => { setPage(1); doSearch(1, category, source); };
  const handleCategory = (cat: string) => { setCategory(cat); setPage(1); doSearch(1, cat, source); };
  const handleSource = (val: string) => { setSource(val); setPage(1); doSearch(1, category, val); };
  const handlePage = (p: number) => { setPage(p); doSearch(p, category, source); };

  const copyPrompt = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast("已复制到剪贴板");
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setToast("已复制到剪贴板");
      } catch {
        setToast("复制失败，请手动选取");
      }
    }
    setTimeout(() => setToast(""), 2500);
  };

  const hasFilters = !!stats;

  return (
    <div className="min-h-screen bg-white">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            {/* Logo + Title */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-7 h-7 rounded-md bg-amber-500 flex items-center justify-center">
                <Search className="w-3.5 h-3.5 text-white" />
              </div>
              <h1 className="text-sm font-semibold text-stone-800 whitespace-nowrap tracking-tight">
                提示词库
              </h1>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                <input
                  className="w-full h-8 pl-8 pr-3 text-xs bg-stone-100 border border-stone-200 rounded-md text-stone-700 placeholder:text-stone-400 outline-none focus:border-stone-400 focus:bg-white transition-all font-sans"
                  placeholder="搜索提示词、分类…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  aria-label="搜索提示词"
                />
              </div>
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              disabled={fetching}
              className="h-8 px-3 rounded-md bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-60 shrink-0"
            >
              {fetching ? (
                <div className="animate-spin w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full" />
              ) : (
                <Search className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">搜索</span>
            </button>

            {/* Stats */}
            {stats && (
              <span className="hidden md:block text-xs text-stone-400 whitespace-nowrap ml-auto">
                {stats.total} 条
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ── Filter Bar ── */}
      {hasFilters && (
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4">
          <div className="flex flex-wrap items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-stone-100">
            <div className="flex items-center gap-2 shrink-0 pt-0.5">
              <Filter className="w-4 h-4 text-stone-400" />
              <span className="text-xs font-medium text-stone-500">筛选</span>
            </div>
            <div className="flex-1 min-w-0">
              <CategoryFilter categories={stats!.categories} selected={category} onSelect={handleCategory} />
            </div>
            <div className="w-48 shrink-0">
              <SourceFilter sources={stats!.sources} selected={source} onSelect={handleSource} />
            </div>
          </div>
        </div>
      )}

      {/* ── Main ── */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-6">
        {fetching ? (
          <SkeletonGrid />
        ) : results.length === 0 ? (
          <EmptyState q={query} cat={category} src={source} />
        ) : (
          <>
            <p className="text-xs text-stone-400 mb-5">共 {total} 条结果</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map((p, i) => (
                <PromptCard key={`${p.title}-${p.source}-${i}`} prompt={p} onCopy={copyPrompt} onImageClick={setLightboxSrc} />
              ))}
            </div>
            <PageNav page={page} totalPages={totalPages} total={total} onChange={handlePage} />
          </>
        )}
      </main>

      <Lightbox src={lightboxSrc} isOpen={!!lightboxSrc} onClose={() => setLightboxSrc("")} />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-xl text-sm shadow-lg z-[100] bg-stone-900 text-white toast-enter">
          {toast}
        </div>
      )}
    </div>
  );
}
