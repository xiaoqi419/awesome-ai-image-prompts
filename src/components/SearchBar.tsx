"use client";
import { Input, Button } from "@nextui-org/react";
import { Search } from "lucide-react";

interface Props {
  query: string;
  onQueryChange: (v: string) => void;
  onSearch: () => void;
  fetching: boolean;
}

export default function SearchBar({ query, onQueryChange, onSearch, fetching }: Props) {
  return (
    <div className="flex gap-3 w-full max-w-2xl mx-auto">
      <Input
        classNames={{
          inputWrapper: "bg-white shadow-sm border border-stone-200 data-[focus=true]:border-indigo-500 data-[focus=true]:ring-4 data-[focus=true]:ring-indigo-500/15 transition-all duration-200",
          input: "text-sm placeholder:text-stone-400 font-sans",
        }}
        placeholder="搜索提示词、分类、作者…"
        value={query}
        onValueChange={onQueryChange}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        startContent={<Search className="w-4 h-4 text-stone-400 shrink-0" />}
        size="lg"
        radius="lg"
        aria-label="搜索提示词"
      />
      <Button
        color="primary"
        radius="lg"
        size="lg"
        onPress={onSearch}
        isLoading={fetching}
        isDisabled={fetching}
        startContent={fetching ? null : <Search className="w-4 h-4" />}
        className="font-medium shadow-sm active:scale-[0.97] transition-transform"
      >
        搜索
      </Button>
    </div>
  );
}
