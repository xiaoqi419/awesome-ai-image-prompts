"use client";
import { Chip } from "@nextui-org/react";

interface Props {
  categories: { name: string; count: number }[];
  selected: string;
  onSelect: (cat: string) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Chip
        variant={selected === "" ? "solid" : "flat"}
        color="primary"
        size="sm"
        radius="full"
        onClick={() => onSelect("")}
        className={`cursor-pointer transition-all duration-200 ${selected === "" ? "shadow-sm" : "opacity-75 hover:opacity-100"}`}
      >
        全部
      </Chip>
      {categories.map((cat) => {
        const active = selected === cat.name;
        return (
          <Chip
            key={cat.name}
            variant={active ? "solid" : "flat"}
            color="primary"
            size="sm"
            radius="full"
            onClick={() => onSelect(cat.name)}
            className={`cursor-pointer transition-all duration-200 ${active ? "shadow-sm" : "opacity-75 hover:opacity-100"}`}
          >
            {cat.name}
            <span className={`ml-1 ${active ? "text-primary-foreground/80" : "text-stone-500"}`}>{cat.count}</span>
          </Chip>
        );
      })}
    </div>
  );
}
