from django.db import models
from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.snippets.models import register_snippet
from modelcluster.fields import ParentalKey, ParentalManyToManyField
from modelcluster.contrib.taggit import ClusterTaggableManager
from taggit.models import TaggedItemBase
from django import forms

class HomePage(Page):
    def get_context(self, request):
        context = super().get_context(request)
        context['articles'] = JournalArticlePage.objects.live().public().order_by('-date')[:6]
        return context

class ContactPage(Page):
    body = RichTextField("聯絡資訊內容", blank=True)
    
    content_panels = Page.content_panels + [
        FieldPanel('body'),
    ]
    
    # Only allow under HomePage, and no subpages allowed
    parent_page_types = ['home.HomePage']
    subpage_types = []

# --- 標籤系統 (Tags) ---
class JournalArticleTag(TaggedItemBase):
    content_object = ParentalKey(
        'JournalArticlePage',
        related_name='tagged_items',
        on_delete=models.CASCADE
    )

# --- 分類系統 (六誌) ---
@register_snippet
class JournalCategory(models.Model):
    name = models.CharField("分類名稱", max_length=255)
    slug = models.SlugField("代稱(英文)", unique=True, max_length=255)

    panels = [
        FieldPanel('name'),
        FieldPanel('slug'),
    ]

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "六誌分類"
        verbose_name_plural = "六誌分類"

# --- 文章頁面 (Article) ---
class JournalArticlePage(Page):
    date = models.DateField("發布日期")
    intro = models.CharField("簡介 (Intro)", max_length=250, blank=True)
    body = RichTextField("文章內容", blank=True)
    cover_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="封面圖片"
    )
    
    # 標籤與分類
    tags = ClusterTaggableManager(through=JournalArticleTag, blank=True, verbose_name="自定義標籤")
    category = models.ForeignKey(
        'home.JournalCategory',
        null=True,
        blank=False,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="選擇所屬六誌 (下拉選單)"
    )

    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel('date'),
            FieldPanel('category'),
            FieldPanel('tags'),
        ], heading="分類與標籤資訊"),
        FieldPanel('cover_image'),
        FieldPanel('intro'),
        FieldPanel('body'),
    ]

    # 設定此頁面只能建立在 HomePage 底下
    parent_page_types = ['home.HomePage']
    subpage_types = []
