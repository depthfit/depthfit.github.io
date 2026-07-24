const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'legacy_html');
const destStaticDir = path.join(__dirname, 'mycms/home/static/home');
const destTemplateDir = path.join(__dirname, 'mycms/home/templates/home');

// Ensure static dirs
fs.mkdirSync(destStaticDir, { recursive: true });
fs.cpSync(path.join(srcDir, 'assets'), path.join(destStaticDir, 'assets'), { recursive: true, force: true });
if (fs.existsSync(path.join(srcDir, 'style.css'))) fs.cpSync(path.join(srcDir, 'style.css'), path.join(destStaticDir, 'style.css'));
if (fs.existsSync(path.join(srcDir, 'script.js'))) fs.cpSync(path.join(srcDir, 'script.js'), path.join(destStaticDir, 'script.js'));

// Read index.html
let html = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf-8');

// Inject wagtail tags
html = `{% load static wagtailcore_tags %}
` + html;

// Replace static assets
html = html.replace(/href="style\.css"/g, `href="{% static 'home/style.css' %}"`);
html = html.replace(/src="script\.js"/g, `src="{% static 'home/script.js' %}"`);
html = html.replace(/src="assets\//g, `src="{% static 'home/assets/`);
// Fix the missing closing quote for assets replacement
html = html.replace(/src="{% static 'home\/assets\/([^"]+)"/g, `src="{% static 'home/assets/$1' %}"`);

// Overwrite home_page.html
fs.writeFileSync(path.join(destTemplateDir, 'home_page.html'), html);
console.log('Django template created successfully.');
