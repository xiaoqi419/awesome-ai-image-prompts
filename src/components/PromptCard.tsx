"use client";
import { Card, Chip, Button, Image } from "@nextui-org/react";
import { Copy, ChevronDown, ChevronUp, Images } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { Prompt } from "@/lib/types";

interface Props {
  prompt: Prompt;
  onCopy: (text: string) => void;
  onImageClick: (src: string) => void;
}

export default function PromptCard({ prompt, onCopy, onImageClick }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [textTruncated, setTextTruncated] = useState(false);
  const visRef = useRef<HTMLParagraphElement>(null);
  const hidRef = useRef<HTMLDivElement>(null);

  const preview = prompt.preview_image || prompt.preview || prompt.images?.[0] || prompt.reference_image_urls?.[0] || "";
  const allImgs = getImages(prompt);
  const hasExtraImgs = allImgs.length > 1;
  const txt = prompt.prompt || "";

  const measure = useCallback(() => {
    const v = visRef.current;
    const h = hidRef.current;
    if (!v || !h) return false;
    return h.getBoundingClientRect().height > v.getBoundingClientRect().height + 1;
  }, []);

  useEffect(() => {
    if (expanded) return;
    const id = requestAnimationFrame(() => setTextTruncated(measure()));
    return () => cancelAnimationFrame(id);
  }, [txt, expanded, measure]);

  return (
    <Card className="group overflow-hidden bg-white border-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" radius="lg" shadow="md">
      {/* Color accent bar */}
      <div className="h-0.5 w-full bg-amber-500/40" />

      {/* Image */}
      <div
        className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer bg-stone-100"
        onClick={() => preview && onImageClick(preview)}
      >
        {preview ? (
          <Image
            src={preview}
            alt={prompt.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            radius="none"
            removeWrapper
            fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiLz4="
          />
        ) : (
          <div className="flex items-center justify-center h-full text-stone-300">
            <Images className="w-10 h-10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        <div className="absolute top-3 right-3">
          <Chip size="sm" variant="flat" className="bg-white/90 backdrop-blur-sm shadow-sm text-xs font-medium text-stone-700">
            {prompt.source || "未知"}
          </Chip>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3">
        {/* Title */}
        <h3 className="font-semibold text-[15px] leading-snug line-clamp-1 text-stone-800">
          {prompt.title || "未命名提示词"}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          <Chip size="sm" variant="flat" color="primary" className="cursor-pointer text-xs">
            {prompt.category || "未分类"}{prompt.sub_category ? ` / ${prompt.sub_category}` : ""}
          </Chip>
          {prompt.author && (
            <Chip size="sm" variant="flat" color="success" className="cursor-pointer text-xs">
              {prompt.author}
            </Chip>
          )}
        </div>

        {/* Prompt text */}
        <div className="relative">
          <p
            ref={visRef}
            className={`text-sm leading-relaxed whitespace-pre-wrap text-stone-600 ${expanded ? "" : "line-clamp-3"}`}
          >
            {txt}
          </p>
          <div
            ref={hidRef}
            className="text-sm leading-relaxed whitespace-pre-wrap absolute -z-50 opacity-0 pointer-events-none w-full"
            aria-hidden="true"
          >
            {txt}
          </div>
          {textTruncated && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
            >
              {expanded ? <><ChevronUp className="w-3 h-3" /> 收起</> : <><ChevronDown className="w-3 h-3" /> 展开全部</>}
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <Button
            size="sm"
            variant="flat"
            radius="full"
            startContent={<Copy className="w-3.5 h-3.5" />}
            onPress={() => onCopy(txt)}
            className="text-xs transition-all active:scale-95"
          >
            复制提示词
          </Button>
          {hasExtraImgs && (
            <Button
              size="sm"
              variant="flat"
              radius="full"
              startContent={<Images className="w-3.5 h-3.5" />}
              onPress={() => setShowImages(!showImages)}
              className="text-xs transition-all active:scale-95"
            >
              参考图 ({allImgs.length - 1})
            </Button>
          )}
        </div>

        {/* Extra images */}
        {hasExtraImgs && showImages && (
          <div className="flex flex-wrap gap-2 pt-3 border-t border-stone-100">
            {allImgs.slice(1).map((src, i) => (
              <Image
                key={i}
                src={src}
                alt="参考图"
                className="w-16 h-14 object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity duration-150 ring-1 ring-stone-200"
                onClick={() => onImageClick(src)}
                radius="lg"
                fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiLz4="
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

function getImages(p: Prompt): string[] {
  const out: string[] = [];
  const pre = p.preview_image || p.preview;
  if (pre && !out.includes(pre)) out.push(pre);
  if (p.images) p.images.forEach((u) => { if (!out.includes(u)) out.push(u); });
  if (p.reference_image_urls) p.reference_image_urls.forEach((u) => { if (!out.includes(u)) out.push(u); });
  return out;
}
