"use client";
import { Select, SelectItem } from "@nextui-org/react";
import { useMemo } from "react";

interface Props {
  sources: { name: string; count: number }[];
  selected: string;
  onSelect: (val: string) => void;
}

interface ItemData {
  key: string;
  label: string;
}

export default function SourceFilter({ sources, selected, onSelect }: Props) {
  const items = useMemo<ItemData[]>(() => {
    const list: ItemData[] = [{ key: "", label: "全部来源" }];
    for (const s of sources) {
      list.push({ key: s.name, label: `${s.name} — ${s.count} 条` });
    }
    return list;
  }, [sources]);

  return (
    <Select
      items={items}
      size="sm"
      radius="lg"
      placeholder="全部来源"
      selectedKeys={selected ? [selected] : []}
      onChange={(e) => onSelect(e.target.value)}
      classNames={{
        trigger:
          "bg-white shadow-sm border transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] data-[open=true]:border-blue-600",
      }}
    >
      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
    </Select>
  );
}
