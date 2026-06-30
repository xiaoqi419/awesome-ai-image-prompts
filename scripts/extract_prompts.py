#!/usr/bin/env python3
"""Extract all prompts from all sources into unified JSON."""
import json
import re
import os
import sys

BASE_DIR = "/tmp/awesome-ai-image-prompts/data"
OUTPUT_DIR = "."

def extract_banana_quicker():
    """Already structured JSON."""
    path = os.path.join(BASE_DIR, "banana-prompt-quicker", "prompts.json")
    if not os.path.exists(path):
        print(f"  ❌ Banana Prompt Quicker not found at {path}")
        return []
    data = json.load(open(path))
    print(f"  ✅ Banana Prompt Quicker: {len(data)} prompts")
    for p in data:
        p["source"] = "Banana Prompt Quicker"
        p["source_url"] = "https://github.com/glidea/banana-prompt-quicker"
    return data

def extract_itgoyo():
    """Extract prompts from itgoyo README <details> sections."""
    path = os.path.join(BASE_DIR, "itgoyo-gpt-image2-prompt", "README.md")
    if not os.path.exists(path):
        path_cn = os.path.join(BASE_DIR, "itgoyo-gpt-image2-prompt", "README_CN.md")
        if not os.path.exists(path_cn):
            print("  ❌ itgoyo README not found")
            return []
        path = path_cn
    
    content = open(path).read()
    
    # Pattern: ### N. Title -> <img src="..."> -> <details><summary> -> **Prompt:** ```...
    prompts = []
    
    # Split by ### (number)
    sections = re.split(r'^### \d+\. ', content, flags=re.MULTILINE)
    
    for section in sections[1:]:  # Skip first split (before first ###)
        lines = section.strip().split('\n')
        title = lines[0].strip()
        
        # Image URLs
        img_urls = re.findall(r'<img src="([^"]+)"', section)
        
        # Prompt in details
        prompt_content = ""
        in_details = False
        in_code_block = False
        code_lines = []
        
        for line in section.split('\n'):
            if '<details>' in line:
                in_details = True
            if in_details and '```' in line:
                if in_code_block:
                    in_code_block = False
                    prompt_content = '\n'.join(code_lines)
                else:
                    in_code_block = True
                    code_lines = []
            elif in_code_block:
                code_lines.append(line)
        
        if not prompt_content:
            continue
        
        # Clean up prompt
        prompt_content = prompt_content.strip().strip('`').strip()
        if prompt_content.startswith('{'):
            prompt_content = prompt_content.strip('{}')
        
        has_chinese = bool(re.search(r'[\u4e00-\u9fff]', prompt_content))
        
        prompts.append({
            "title": title,
            "prompt": prompt_content,
            "preview_image": img_urls[0].replace("images/", "https://raw.githubusercontent.com/itgoyo/awesome-gpt-image2-prompt/main/images/") if img_urls else "",
            "images": [u.replace("images/", "https://raw.githubusercontent.com/itgoyo/awesome-gpt-image2-prompt/main/images/") for u in img_urls],
            "language": "zh-CN" if has_chinese else "en",
            "source": "itgoyo/awesome-gpt-image2-prompt",
            "source_url": "https://github.com/itgoyo/awesome-gpt-image2-prompt",
            "category": "未分类",
            "sub_category": "",
            "author": "",
            "mode": "generate"
        })
    
    print(f"  ✅ itgoyo README: {len(prompts)} prompts")
    return prompts

def main():
    print("=" * 50)
    print("  🎨 AI Image Prompt Extraction")
    print("=" * 50)
    
    all_prompts = []
    
    print("\n📦 Banana Prompt Quicker...")
    all_prompts.extend(extract_banana_quicker())
    
    print("\n📦 itgoyo/awesome-gpt-image2-prompt...")
    all_prompts.extend(extract_itgoyo())
    
    print(f"\n{'='*50}")
    print(f"  📊 Total: {len(all_prompts)} prompts")
    print(f"{'='*50}")
    
    # Write unified output
    output = {
        "total": len(all_prompts),
        "sources": [
            "Banana Prompt Quicker (github.com/glidea/banana-prompt-quicker)",
            "itgoyo/awesome-gpt-image2-prompt (github.com/itgoyo/awesome-gpt-image2-prompt)",
            "ZeroLu/awesome-gpt-image (github.com/ZeroLu/awesome-gpt-image)",
            "ziguishian/Awesome-ChatGPT-Images-2.0 (github.com/ziguishian/Awesome-ChatGPT-Images-2.0)",
            "underwoodxie/promptsref-gpt-image-prompts (github.com/underwoodxie/promptsref-gpt-image-prompts)"
        ],
        "prompts": all_prompts
    }
    
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    out_path = os.path.join(OUTPUT_DIR, "prompts_unified.json")
    json.dump(output, open(out_path, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"\n  ✅ Written to {out_path}")
    print(f"\n  ✅ Written to {os.path.abspath(out_path)}")
    
    # Stats by source
    print("\n📊 分类统计:")
    from collections import Counter
    cats = Counter(p.get('category', '未分类') for p in all_prompts)
    for cat, count in cats.most_common():
        print(f"  {cat}: {count}")

if __name__ == "__main__":
    main()
