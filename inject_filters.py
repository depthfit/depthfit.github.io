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
            {% get_article_tags articles as unique_tags %}
            
            <div class="controls-bar">
                <div class="filters">
                    <button class="filter-btn active" data-tag="all">全部 {{ articles|length }}</button>
                    {% for tag in unique_tags %}
                    <button class="filter-btn" data-tag="{{ tag.name }}">{{ tag.name }}</button>
                    {% endfor %}
                </div>
                <div class="view-options">
                    <span class="sort-label">排序</span>
                    <select class="sort-select">
                        <option>最新發佈</option>
                    </select>
                    <span class="view-icons">
                        <span class="view-label">檢視</span>
                        <i class="fas fa-th-large active"></i>
                        <i class="fas fa-list"></i>
                    </span>
                </div>
            </div>

            <div class="article-grid">
                {% for article in articles %}
                <article class="article-card" data-tags="{% for tag in article.tags.all %}{{ tag.name }}{% if not forloop.last %},{% endif %}{% endfor %}">
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
            </div>
            
            <script>
            document.addEventListener('DOMContentLoaded', function() {
                const filterBtns = document.querySelectorAll('.filter-btn');
                const articles = document.querySelectorAll('.article-card');
                
                filterBtns.forEach(btn => {
                    btn.addEventListener('click', function() {
                        filterBtns.forEach(b => b.classList.remove('active'));
                        this.classList.add('active');
                        
                        const selectedTag = this.getAttribute('data-tag');
                        
                        articles.forEach(article => {
                            if (selectedTag === 'all') {
                                article.style.display = '';
                            } else {
                                const tagAttr = article.getAttribute('data-tags');
                                const tags = tagAttr ? tagAttr.split(',') : [];
                                if (tags.includes(selectedTag)) {
                                    article.style.display = '';
                                } else {
                                    article.style.display = 'none';
                                }
                            }
                        });
                    });
                });
            });
            </script>
"""

for fname, slug in files.items():
    filepath = os.path.join(d, fname)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Matches from <div class="controls-bar"> down to the first </div></main>
    # Note: we injected the loop previously, so it has {% get_journal_articles ... %}
    # We will replace from <div class="controls-bar"> to the end of the <div class="article-grid"> ... </div>
    # Let's match from <div class="controls-bar"> to </div>\s*</main>
    pattern = re.compile(r'<div class="controls-bar">.*?(</div>\s*</main>)', re.DOTALL)
    
    replacement = loop_template.replace('SLUG', slug) + "\n        " + r'\1'
    
    content = pattern.sub(replacement, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated all templates to include dynamic tags and frontend filtering script!")
