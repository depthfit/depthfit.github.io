from .base import *

import os

DEBUG = False
SECRET_KEY = os.environ.get("SECRET_KEY", "django-insecure-k*f*g$09q3j%k3&2(d%y+x^t$f^m70f#g+&3u9g(x+46l10^2c")
ALLOWED_HOSTS = ['*']
CSRF_TRUSTED_ORIGINS = ['https://*.up.railway.app']

# WhiteNoise for serving static files in production
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")
STORAGES["staticfiles"]["BACKEND"] = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Support Railway Volume for Persistent Storage (SQLite + Media)
DATA_DIR = os.environ.get("RAILWAY_VOLUME_MOUNT_PATH", "")
if DATA_DIR:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": os.path.join(DATA_DIR, "db.sqlite3"),
        }
    }
    MEDIA_ROOT = os.path.join(DATA_DIR, "media")

try:
    from .local import *
except ImportError:
    pass
