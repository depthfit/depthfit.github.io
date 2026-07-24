import os
import glob
import re

src_dir = r"C:\Users\Peter Yue\Desktop\三川流域誌\_js_backup\frontend\src\pages"
dest_dir = r"C:\Users\Peter Yue\Desktop\三川流域誌\mycms\home\templates\home"

os.makedirs(dest_dir, exist_ok=True)

files = glob.glob(os.path.join(src_dir, "*.astro"))

for filepath in files:
    filename = os.path.basename(filepath)
    if filename == "index.astro":
        continue
        
    new_filename = filename.replace(".astro", ".html")
    dest_path = os.path.join(dest_dir, new_filename)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Inject wagtail static tags
    if "{% load static" not in content:
        content = "{% load static wagtailcore_tags %}\n" + content
        
    # Fix static paths
    content = re.sub(r'href="style\.css"', r'href="{% static \'home/style.css\' %}"', content)
    content = re.sub(r'src="script\.js"', r'src="{% static \'home/script.js\' %}"', content)
    
    # Fix assets
    # E.g. src="assets/img.png" -> src="{% static 'home/assets/img.png' %}"
    content = re.sub(r'src="assets/([^"]+)"', r'src="{% static \'home/assets/\1\' %}"', content)
    
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("HTML files migrated to Django templates.")

urls_path = r"C:\Users\Peter Yue\Desktop\三川流域誌\mycms\mycms\urls.py"
with open(urls_path, 'r', encoding='utf-8') as f:
    urls_content = f.read()

# Only inject if not already injected
if "TemplateView" not in urls_content:
    injection = """
from django.views.generic import TemplateView

urlpatterns = [
    path("01_story.html", TemplateView.as_view(template_name="home/01_story.html")),
    path("02_survey.html", TemplateView.as_view(template_name="home/02_survey.html")),
    path("03_guard.html", TemplateView.as_view(template_name="home/03_guard.html")),
    path("04_ecology.html", TemplateView.as_view(template_name="home/04_ecology.html")),
    path("05_engineering.html", TemplateView.as_view(template_name="home/05_engineering.html")),
    path("06_cooperation.html", TemplateView.as_view(template_name="home/06_cooperation.html")),
    path("contact.html", TemplateView.as_view(template_name="home/contact.html")),
] + urlpatterns
"""
    # Insert right before 'if settings.DEBUG:'
    urls_content = urls_content.replace('if settings.DEBUG:', injection + '\nif settings.DEBUG:')
    
    with open(urls_path, 'w', encoding='utf-8') as f:
        f.write(urls_content)
        
print("urls.py updated.")
