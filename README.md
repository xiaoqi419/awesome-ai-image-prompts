# 🎨 Awesome AI Image Prompts Collection

> 精选AI图像生成提示词合集 | Aggregated collection of exceptional AI image generation prompts

[![GitHub stars](https://img.shields.io/github/stars/xiaoqi419/awesome-ai-image-prompts)](https://github.com/xiaoqi419/awesome-ai-image-prompts/stargazers)

## 📋 概述 | Overview

本仓库聚合了多个开源项目中高质量 AI 图像生成提示词（Prompt）。
目前共收录 **323 条结构化 JSON 提示词 + 612 条 Markdown 提示词 + 多个精选合集**，主要面向 **GPT Image 2 (gpt-image-2)**、ChatGPT Images、Gemini、DALL-E、FLUX 等模型。

## 📦 数据来源 | Sources

| # | 来源 | ⭐ | 数量 | 格式 | 说明 |
|---|------|---|------|------|------|
| 1 | [Banana Prompt Quicker](https://github.com/glidea/banana-prompt-quicker) 🍌 | - | **323** | ✅ JSON结构化 | 唯一提供结构化JSON数据的源，含分类、作者、预览图 |
| 2 | [ZeroLu/awesome-gpt-image](https://github.com/ZeroLu/awesome-gpt-image) | 1823 | 精选集 | README | 精选 GPT Image 2 提示词，X平台创作者 |
| 3 | [itgoyo/awesome-gpt-image2-prompt](https://github.com/itgoyo/awesome-gpt-image2-prompt) | 98 | **612** | README+图片 | 中文提示词，689张效果图（75MB） |
| 4 | [ziguishian/Awesome-ChatGPT-Images-2.0](https://github.com/ziguishian/Awesome-ChatGPT-Images-2.0) | 24 | 示例集 | README | ChatGPT-Images-2.0 提示词示例 |
| 5 | [underwoodxie/promptsref-gpt-image-prompts](https://github.com/underwoodxie/promptsref-gpt-image-prompts) | 12 | 示例集 | README | GPT Image 提示词模板 |
| 6 | [EddieTYP/image-prompt-library](https://github.com/EddieTYP/image-prompt-library) | 121 | - | Electron应用 | 本地提示词库工具（非纯集合） |

> **提示**: 除 Banana Prompt Quicker 外，其他源提示词以 README 形式展示。
> 图片文件因体积较大（约 75MB）未全部收录，需直接访问源仓库。

## 📁 目录结构

```
awesome-ai-image-prompts/
├── README.md
├── sources/
│   └── SOURCES.md                          # 来源详情
├── data/
│   ├── banana-prompt-quicker/
│   │   └── prompts.json                    # 323条结构化提示词 ⭐核心
│   ├── awesome-gpt-image/                  # ZeroLu 精选
│   ├── awesome-chatgpt-images2/            # ziguishian 示例
│   ├── promptsref/                         # underwoodxie 示例
│   ├── itgoyo-gpt-image2-prompt/           # 612条提示词 README
│   └── image-prompt-library/               # EddieTYP 应用
└── scripts/
    └── format-check.py                     # 格式检查工具
```

## 🎯 结构化提示词格式（Banana Prompt Quicker）

```json
{
  "title": "渐变玻璃风格PPT",
  "preview": "https://...",
  "prompt": "你是一位专家级UI UX演示设计师...",
  "author": "@op7418",
  "category": "工作",
  "sub_category": "PPT",
  "mode": "generate",
  "created": "2025-12-21T12:37:02Z"
}
```

## 🚀 快速使用

```bash
# 查看结构化的323条提示词
python3 -c "
import json
d = json.load(open('data/banana-prompt-quicker/prompts.json'))
print(f'总提示词数: {len(d)}')
cats = {}
for p in d:
    cats[p.get('category','?')] = cats.get(p.get('category','?'), 0) + 1
for c, n in sorted(cats.items(), key=lambda x:-x[1]):
    print(f'  {c}: {n}条')
"
```

## 📜 许可

各来源内容遵循其原始仓库的开源许可协议。本聚合仓库整理脚本采用 MIT 许可。

## 🤝 贡献

欢迎通过 Issue 或 PR 推荐更多高质量的提示词资源！
