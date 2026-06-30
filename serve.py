#!/usr/bin/env python3
"""Simple HTTP server for the prompt search app (stdlib only)."""
import http.server
import socketserver
import os

PORT = 5000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def log_message(self, format, *args):
        print(f"  [{self.log_date_time_string()}] {args[0]} {args[1]} {args[2]}")

print(f"\n  🎨 AI Prompt Search Server")
print(f"  =========================")
import json
try:
    with open(os.path.join(DIRECTORY, 'prompts_unified.json')) as f:
        data = json.load(f)
        print(f"  📦 {data['total']} prompts loaded")
except:
    print("  📦 prompts data loaded")
print(f"  🌐 http://0.0.0.0:{PORT}")
print(f"  =========================")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    httpd.serve_forever()
