from django.conf import settings
from django.urls import include, path
from django.contrib import admin

from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls

from search import views as search_views

urlpatterns = [
    path("django-admin/", admin.site.urls),
    path("admin/", include(wagtailadmin_urls)),
    path("documents/", include(wagtaildocs_urls)),
    path("search/", search_views.search, name="search"),
]



from django.views.generic import TemplateView, RedirectView

urlpatterns = [
    path("01_story.html", TemplateView.as_view(template_name="home/01_story.html")),
    path("02_survey.html", TemplateView.as_view(template_name="home/02_survey.html")),
    path("03_guard.html", TemplateView.as_view(template_name="home/03_guard.html")),
    path("04_ecology.html", TemplateView.as_view(template_name="home/04_ecology.html")),
    path("05_engineering.html", TemplateView.as_view(template_name="home/05_engineering.html")),
    path("06_cooperation.html", TemplateView.as_view(template_name="home/06_cooperation.html")),
    path("contact.html", TemplateView.as_view(template_name="home/contact.html")),
    path("index.html", RedirectView.as_view(url="/", permanent=True)),
] + urlpatterns

if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns = urlpatterns + [
    # For anything not caught by a more specific rule above, hand over to
    # Wagtail's page serving mechanism. This should be the last pattern in
    # the list:
    path("", include(wagtail_urls)),
    # Alternatively, if you want Wagtail pages to be served from a subpath
    # of your site, rather than the site root:
    #    path("pages/", include(wagtail_urls)),
]
