from django import template
from home.models import JournalArticlePage

register = template.Library()

@register.simple_tag
def get_journal_articles(category_slug):
    return JournalArticlePage.objects.live().public().filter(category__slug=category_slug).order_by('-date')

@register.simple_tag
def get_article_tags(articles):
    tags = set()
    for article in articles:
        for tag in article.tags.all():
            tags.add(tag)
    return sorted(list(tags), key=lambda x: x.name)
