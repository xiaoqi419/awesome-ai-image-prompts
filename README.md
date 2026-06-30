# 🎨 Awesome AI Image Prompts Collection

> 精选AI图像生成提示词合集 + 关键词搜索工具 | Aggregated collection with search

[![GitHub](https://img.shields.io/badge/GitHub-xiaoqi419%2Fawesome--ai--image--prompts-blue)](https://github.com/xiaoqi419/awesome-ai-image-prompts)

## 🚀 一键试用

```bash
# 使用 Python 标准库（无需安装依赖）
python3 serve.py

# 或使用 Flask（功能更完整）
pip install flask && python3 server.py
```

然后访问 **http://localhost:5000** 即可搜索提示词 🎉

## 📦 数据规模

| 来源 | ⭐ | 提示词数 | 格式 |
|------|---|---------|------|
| 🍌 Banana Prompt Quicker | - | **323** | JSON结构化 |
| ⭐ ZeroLu/awesome-gpt-image | 1823 | 精选集 | README |
| 📝 itgoyo/awesome-gpt-image2-prompt | 98 | **612** | README+689图 |
| 🌟 Awesome-ChatGPT-Images-2.0 | 24 | 示例集 | README |
| 📖 promptsref-gpt-image-prompts | 12 | 示例集 | README |
| 🖥️ image-prompt-library | 121 | 工具 | README |

**总计: 935 条提示词，支持关键词/分类/来源搜索**

## 🔍 功能特点

- **关键词搜索**: 搜索标题、提示词内容、分类、作者
- **分类筛选**: 按来源、按品类（有趣/生活/工作/学习/NSFW）
- **图片预览**: 含参考图/效果图（来自原仓库 CDN）
- **一键复制**: 复制提示词到剪贴板
- **多图浏览**: itgoyo 的 689 张效果图可直接查看
- **即时响应**: 纯前端搜索，无需后端依赖

## 📁 目录结构

```
├── index.html                       # 🔍 搜索界面（主入口）
├── prompts_unified.json             # 📊 聚合的 935 条提示词
├── serve.py                         # 🖥️ 简易 HTTP 服务器（零依赖）
├── server.py                        # 🖥️ Flask 服务器
├── scripts/
│   ├── extract_prompts.py           # 🔧 从各源提取提示词
│   └── format-check.py              # 🔧 JSON 格式检查
├── data/                            # 📚 原始来源文件
│   ├── banana-prompt-quicker/
│   ├── awesome-gpt-image/
│   ├── awesome-chatgpt-images2/
│   ├── promptsref/
│   ├── itgoyo-gpt-image2-prompt/
│   └── image-prompt-library/
└── sources/
    └── SOURCES.md
```

## 🎯 搜索使用技巧

- 搜索 **"PPT"** → 找到所有 PPT 相关提示词
- 搜索 **"op7418"** → 找到特定作者作品
- 选择来源 **"Banana"** → 只看结构化 JSON 数据
- 点击分类标签 → 按品类筛选
- 点击提示词 → 展开/收起完整内容
- 点击 **📋 复制** → 复制提示词

## 📜 许可

各来源内容遵循其原始仓库的开源许可协议。
聚合数据整理脚本采用 MIT 许可。
