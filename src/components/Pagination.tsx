"use client";
import { Pagination as NextPagination } from "@nextui-org/react";

interface Props {
  page: number;
  totalPages: number;
  total: number;
  onChange: (page: number) => void;
}

export default function PageNav({ page, totalPages, total, onChange }: Props) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex flex-col items-center gap-3 py-10">
      <NextPagination
        total={totalPages}
        page={page}
        onChange={onChange}
        showControls
        size="lg"
        radius="full"
        color="primary"
      />
      <p className="text-xs" style={{ color: "oklch(0.6 0.03 75)" }}>
        共 {total} 条结果，{totalPages} 页
      </p>
    </div>
  );
}
