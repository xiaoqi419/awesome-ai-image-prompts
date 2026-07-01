import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "AI 图像提示词搜索",
  description: "聚合 935 条 AI 图像生成提示词，支持关键词搜索与分类浏览",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        style={{ fontFamily: "var(--font-sans)" }}
        className="antialiased"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
