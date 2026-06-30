# 🎨 Awesome AI Image Prompts Collection

> 精选AI图像生成提示词合集 | Aggregated collection of exceptional AI image generation prompts

[![GitHub stars](https://img.shields.io/github/stars/xiaoqi419/awesome-ai-image-prompts)](https://github.com/xiaoqi419/awesome-ai-image-prompts/stargazers)

## 📋 概述 | Overview

本仓库聚合了多个开源项目中的高质量 AI 图像生成提示词（Prompt），主要面向 **GPT Image 2 (gpt-image-2)**、ChatGPT Images、Gemini、DALL-E、FLUX 等图像生成模型。

This repository aggregates high-quality AI image generation prompts from multiple open-source projects, targeting **GPT Image 2 (gpt-image-2)**, ChatGPT Images, Gemini, DALL-E, FLUX and other image generation models.

## 📦 数据来源 | Sources

| # | 来源 | 提示词数量 | 格式 | 状态 |
|---|------|-----------|------|------|
| 1 | [Banana Prompt Quicker](https://github.com/glidea/banana-prompt-quicker) 🍌 | 323 | JSON结构化 | ✅ 已收录 |
| 2 | [ZeroLu/awesome-gpt-image](https://github.com/ZeroLu/awesome-gpt-image) | 精选合集 | README | ✅ 已收录 |
| 3 | [itgoyo/awesome-gpt-image2-prompt](https://github.com/itgoyo/awesome-gpt-image2-prompt) | 612 | JSON | ⏳ 待收录 |
| 4 | [ziguishian/Awesome-ChatGPT-Images-2.0](https://github.com/ziguishian/Awesome-ChatGPT-Images-2.0) | 示例集 | README | ✅ 已收录 |
| 5 | [underwoodxie/promptsref-gpt-image-prompts](https://github.com/underwoodxie/promptsref-gpt-image-prompts) | 示例集 | README | ✅ 已收录 |
| 6 | [EddieTYP/image-prompt-library](https://github.com/EddieTYP/image-prompt-library) | Prompt库 | - | ⏳ 待收录 |

## 📁 目录结构

```
awesome-ai-image-prompts/
├── README.md                           # 本文件
├── sources/                            # 来源说明
│   └── SOURCES.md                      # 各来源详情
├── data/
│   ├── banana-prompt-quicker/
│   │   └── prompts.json                # 323条中文/多语言提示词
│   └── awesome-gpt-image/              # ZeroLu 精选提示词
├── scripts/
│   └── format-check.py                 # 提示词格式检查工具
└── images/                             # 预览图（部分来源包含）
```

## 🎯 提示词格式说明

每个提示词包含以下字段：

```json
{
  "title": "标题",
  "preview": "预览图URL",
  "prompt": "提示词正文",
  "author": "作者",
  "category": "分类",
  "sub_category": "子分类",
  "mode": "generate | edit",
  "link": "来源链接",
  "created": "创建时间"
}
```

## 🚀 快速使用

### 直接查询
浏览 `data/` 目录下的 JSON 文件，或用脚本提取：

```bash
# 统计提示词数量
python3 -c "import json; d=json.load(open('data/banana-prompt-quicker/prompts.json')); print(f'总提示词数: {len(d)}')"
```

### 分类筛选
```bash
python3 -c "
import json
d = json.load(open('data/banana-prompt-quicker/prompts.json'))
for p in d:
    if 'PPT' in p.get('title','') or 'ppt' in p.get('category','').lower():
        print(p['title'], '-', p.get('category',''), '/', p.get('sub_category',''))
"
```

## 📜 许可

本仓库内容遵循各来源项目的开源许可协议：
- Banana Prompt Quicker: MIT
- ZeroLu/awesome-gpt-image: MIT
- 其他来源：详见各仓库 LICENSE

## 🤝 贡献

欢迎通过 Issue 或 PR 推荐更多高质量的提示词资源！
