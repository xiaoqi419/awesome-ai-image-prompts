export interface Prompt {
  title: string;
  prompt: string;
  preview?: string;
  preview_image?: string;
  reference_image_urls?: string[];
  images?: string[];
  author?: string;
  source: string;
  source_url?: string;
  category?: string;
  sub_category?: string;
  mode?: string;
  created?: string;
  link?: string;
  language?: string;
}

export interface UnifiedData {
  total: number;
  sources: string[];
  prompts: Prompt[];
}

export interface SearchResult {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  prompts: Prompt[];
}
