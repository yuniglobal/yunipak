import os

exclude_dirs = {'.git', 'node_modules', '.venv', 'dist', '.vite'}

def is_emoji(char):
    codepoint = ord(char)
    if 0x1F300 <= codepoint <= 0x1F9FF:
        return True
    if 0x2600 <= codepoint <= 0x26FF:
        return True
    if 0x2700 <= codepoint <= 0x27BF:
        return True
    if 0x1F1E6 <= codepoint <= 0x1F1FF:
        return True
    return False

for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in exclude_dirs]
    for file in files:
        if file.endswith(('.ts', '.tsx', '.json', '.html', '.css', '.js')):
            path = os.path.join(root, file)
            if 'find_emojis.py' in path:
                continue
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    lines = f.readlines()
                for idx, line in enumerate(lines):
                    emojis = [c for c in line if is_emoji(c)]
                    if emojis:
                        print(f"{path}:{idx+1}: {' '.join(emojis)} -> {line.strip()}")
            except Exception as e:
                pass
