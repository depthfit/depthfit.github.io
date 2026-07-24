import os
import re

d = r'C:\Users\Peter Yue\Desktop\三川流域誌\mycms\home\templates\home'
files = {
    '01_story.html': '01-story',
    '02_survey.html': '02-survey',
    '03_guard.html': '03-guard',
    '04_ecology.html': '04-ecology',
    '05_engineering.html': '05-engineering',
    '06_cooperation.html': '06-cooperation',
}

loop_template = """
                {% get_journal_articles 'SLUG' as articles %}
                {% for article in articles %}
                <article class="article-card">
                    <a href="{% pageurl article %}" style="text-decoration: none; color: inherit; display: block;">
                        <div class="img-wrapper">
                            {% if article.cover_image %}
                                {% image article.cover_image fill-500x350 as img %}
                                <img src="{{ img.url }}" alt="{{ article.title }}">
                            {% else %}
                                <img src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="{{ article.title }}">
                            {% endif %}
                        </div>
                        <div class="article-content">
                            <div class="category">
                                {% for tag in article.tags.all %}
                                    {{ tag.name }}{% if not forloop.last %} · {% endif %}
                                {% empty %}
                                    三川流域誌
                                {% endfor %}
                            </div>
                            <h3 class="serif">{{ article.title }}</h3>
                            <p style="color: #666; font-size: 0.9rem; margin-top: 0.5rem; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">{{ article.intro }}</p>
                            <div class="article-footer">
                                <span class="read-more">開始閱讀 &rarr;</span>
                                <span class="date">{{ article.date|date:"Y.m.d" }}</span>
                            </div>
                        </div>
                    </a>
                </article>
                {% empty %}
                <p style="grid-column: 1 / -1; text-align: center; color: #666; padding: 2rem; font-size: 1.1rem;">目前還沒有發布任何文章喔！</p>
                {% endfor %}
"""

for fname, slug in files.items():
    filepath = os.path.join(d, fname)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Add {% load wagtailcore_tags wagtailimages_tags home_tags %} at the top
    content = content.replace('{% load static wagtailcore_tags %}', '{% load static wagtailcore_tags wagtailimages_tags home_tags %}')
    
    # 2. Replace the contents inside <div class="article-grid"> ... </div>
    # It matches <div class="article-grid"> up to </div></main>
    pattern = re.compile(r'(<div class="article-grid">).*?(</div>\s*</main>)', re.DOTALL)
    
    replacement = r'\1' + "\n" + loop_template.replace('SLUG', slug) + "\n            " + r'\2'
    
    content = pattern.sub(replacement, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
print("Updated all 6 journal pages to load articles dynamically!")
