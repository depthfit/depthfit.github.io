import os
import shutil
import re

src_index = r"C:\Users\Peter Yue\Desktop\三川流域誌\_js_backup\frontend\src\pages\index.astro"
dest_template = r"C:\Users\Peter Yue\Desktop\三川流域誌\mycms\home\templates\home\home_page.html"

# 1. Read index.astro
with open(src_index, 'r', encoding='utf-8') as f:
    content = f.read()

# 2. Inject Wagtail tags
content = "{% load static wagtailcore_tags %}\n" + content

# 3. Replace paths
content = re.sub(r'href="style\.css"', r'href="{% static \'home/style.css\' %}"', content)
content = re.sub(r'src="script\.js"', r'src="{% static \'home/script.js\' %}"', content)
content = re.sub(r'src="assets/([^"]+)"', r'src="{% static \'home/assets/\1\' %}"', content)

# 4. Save to home_page.html
with open(dest_template, 'w', encoding='utf-8') as f:
    f.write(content)

print("Home page template fixed.")

# 5. Copy static assets
public_dir = r"C:\Users\Peter Yue\Desktop\三川流域誌\_js_backup\backend\public"
static_dir = r"C:\Users\Peter Yue\Desktop\三川流域誌\mycms\home\static\home"

os.makedirs(static_dir, exist_ok=True)

# Copy style.css
shutil.copy(os.path.join(public_dir, 'style.css'), os.path.join(static_dir, 'style.css'))
# Copy script.js
shutil.copy(os.path.join(public_dir, 'script.js'), os.path.join(static_dir, 'script.js'))
# Copy assets dir
assets_dest = os.path.join(static_dir, 'assets')
if os.path.exists(assets_dest):
    shutil.rmtree(assets_dest)
shutil.copytree(os.path.join(public_dir, 'assets'), assets_dest)

print("Static assets copied.")
