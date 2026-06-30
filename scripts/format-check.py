#!/usr/bin/env python3
"""Check and validate prompt JSON files in the collection."""
import json
import os
import sys

def check_prompts(filepath):
    print(f"\n📄 {filepath}")
    try:
        data = json.load(open(filepath, encoding='utf-8'))
    except Exception as e:
        print(f"  ❌ 无法解析: {e}")
        return
    
    if not isinstance(data, list):
        print(f"  ❌ 不是数组格式")
        return
    
    print(f"  总条数: {len(data)}")
    
    # Check fields
    required_fields = ['title', 'prompt']
    optional_fields = ['category', 'sub_category', 'author', 'mode', 'preview', 'link', 'created']
    
    missing = {}
    categories = {}
    modes = set()
    
    for i, p in enumerate(data):
        for field in required_fields:
            if field not in p:
                missing[field] = missing.get(field, 0) + 1
        cat = p.get('category', '未分类')
        sub = p.get('sub_category', '其他')
        categories[f"{cat}/{sub}"] = categories.get(f"{cat}/{sub}", 0) + 1
        if 'mode' in p:
            modes.add(p['mode'])
    
    if missing:
        print(f"  ⚠️ 缺失字段:")
        for f, c in sorted(missing.items()):
            print(f"    - {f}: {c}条缺失")
    
    if modes:
        print(f"  模式: {', '.join(sorted(modes))}")
    
    print(f"  分类分布:")
    for cat, count in sorted(categories.items(), key=lambda x: -x[1]):
        print(f"    {cat}: {count}条")
    
    # Check for None/empty titles
    empty = sum(1 for p in data if not p.get('title'))
    if empty:
        print(f"  ⚠️ {empty}条标题为空")

# Run checks
base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data_dir = os.path.join(base, 'data')

for root, dirs, files in os.walk(data_dir):
    for f in files:
        if f.endswith('.json'):
            check_prompts(os.path.join(root, f))

print("\n✅ 检查完成!")
