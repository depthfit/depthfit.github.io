import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mycms.settings.dev')
django.setup()

from home.models import JournalCategory

categories = [
    ("流域故事誌", "01-story"),
    ("川行踏查誌", "02-survey"),
    ("守護行動誌", "03-guard"),
    ("三川生態誌", "04-ecology"),
    ("治水與工程誌", "05-engineering"),
    ("公私協力誌", "06-cooperation"),
]

for name, slug in categories:
    JournalCategory.objects.get_or_create(name=name, slug=slug)

print("Pre-populated 6 Journal Categories!")
