#!/usr/bin/env python3
"""Simple Flask server for the prompt search app."""
from flask import Flask, jsonify, send_from_directory, request
import json

app = Flask(__name__, static_url_path='')

# Load prompts
with open('prompts_unified.json') as f:
    data = json.load(f)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/prompts_unified.json')
def serve_data():
    return send_from_directory('.', 'prompts_unified.json')

@app.route('/api/search')
def search():
    q = request.args.get('q', '').lower()
    source = request.args.get('source', '')
    category = request.args.get('category', '')
    
    results = data['prompts']
    if q:
        results = [p for p in results if q in json.dumps(p, ensure_ascii=False).lower()]
    if source:
        results = [p for p in results if source.lower() in p.get('source', '').lower()]
    if category:
        results = [p for p in results if category == p.get('category', '')]
    
    return jsonify({
        'total': len(results),
        'prompts': results[:100]  # Limit to 100
    })

@app.route('/api/stats')
def stats():
    from collections import Counter
    cats = Counter(p.get('category', '未分类') for p in data['prompts'])
    sources = Counter(p.get('source', '未知') for p in data['prompts'])
    return jsonify({
        'total': data['total'],
        'categories': dict(cats.most_common()),
        'sources': dict(sources.most_common())
    })

if __name__ == '__main__':
    print("\n  🎨 AI Prompt Search Server")
    print("  =========================")
    print(f"  📦 {data['total']} prompts loaded")
    print("  🌐 http://localhost:5000")
    print("  =========================")
    app.run(host='0.0.0.0', port=5000, debug=True)
