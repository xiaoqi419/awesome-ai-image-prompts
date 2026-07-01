# 🎨 Awesome AI Image Prompts Collection

> 精选AI图像生成提示词合集 + 高级搜索应用 | Aggregated collection with advanced Next.js search app

[![GitHub](https://img.shields.io/badge/GitHub-xiaoqi419%2Fawesome--ai--image--prompts-blue)](https://github.com/xiaoqi419/awesome-ai-image-prompts)

## 🚀 在线体验

👉 **http://111.170.175.46:15000**（演示站）

## 🐳 Docker 部署

```bash
docker build -t prompt-search .
docker run -d -p 15000:3000 prompt-search
```

## 📦 数据规模

| 来源 | 提示词数 | 格式 |
|------|---------|------|
| 🍌 Banana Prompt Quicker | **323** | JSON结构化 |
| ⭐ ZeroLu/awesome-gpt-image | 精选集 | README |
| ✨ freestylefly/awesome-gpt-image-2 | 精选集 | README |
| 📝 itgoyo/awesome-gpt-image2-prompt | **612** | README+689图 |
| 📖 underwoodxie/promptsref-gpt-image-prompts | 示例集 | README |
| 🖥️ wuyoscar/gpt_image_2_skill | 精选集 | README |
| 🌟 ziguishian/Awesome-ChatGPT-Images-2.0 | 示例集 | README |

**总计: 1691 条提示词，7 个来源，支持关键词/分类/来源搜索**

## 🔍 功能特点

- **关键词搜索**: 搜索标题、提示词内容、分类、作者（服务端 API 分页）
- **分类筛选**: Chip 标签按品类筛选
- **来源筛选**: 下拉选择按来源过滤
- **图片预览**: Lightbox 查看参考图/效果图
- **一键复制**: 复制提示词到剪贴板
- **骨架屏加载**: native skeleton 加载体验
- **响应式设计**: 适配桌面/移动端
- **DM Sans + Noto Sans SC 字体**
- **OKLCH 暖调色彩系统**

## 🏗️ 技术栈

- **Next.js 15** (React 19)
- **NextUI (HeroUI v2)**
- **Tailwind CSS v3**
- **TypeScript**

## 📁 目录结构

```
├── src/
│   ├── app/
│   │   ├── page.tsx                  # 🔍 主页面
│   │   ├── layout.tsx                # 布局
│   │   ├── globals.css               # 全局样式
│   │   ├── providers.tsx             # NextUI Provider
│   │   └── api/
│   │       ├── search/route.ts       # 📡 搜索 API（分页+筛选）
│   │       └── stats/route.ts        # 📡 统计数据 API
│   ├── components/
│   │   ├── SearchBar.tsx             # 🔍 搜索输入框
│   │   ├── CategoryFilter.tsx        # 🏷️ 分类筛选 Chip
│   │   ├── SourceFilter.tsx          # 📚 来源筛选 Select
│   │   ├── PromptCard.tsx            # 🃏 提示词卡片
│   │   ├── PageNav.tsx               # 📄 分页导航
│   │   └── Lightbox.tsx              # 🖼️ 图片灯箱
│   └── lib/
│       ├── types.ts                  # 类型定义
│       └── load-prompts.ts           # 数据加载
├── public/
│   └── prompts_unified.json          # 📊 1691 条聚合提示词
├── Dockerfile                        # 🐳 多阶段构建
└── prompts_unified.json              # 📊 根目录副本
```

## 🖥️ 开发

```bash
npm install
npm run dev     # http://localhost:3000
```

## 📜 许可

各来源内容遵循其原始仓库的开源许可协议。
聚合数据整理脚本和搜索应用采用 MIT 许可。
