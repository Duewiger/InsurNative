"""
Django settings for insurnative_backend project.

Generated by 'django-admin startproject' using Django 5.0.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
from environs import Env
from datetime import timedelta

env = Env()
env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("DJANGO_SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool("DJANGO_DEBUG", default=False)

# ALLOWED_HOSTS = [".herokuapp.com", "localhost", "127.0.0.1"]
ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # External
    "axes",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "corsheaders",
    "debug_toolbar",
    "dj_rest_auth",
    "dj_rest_auth.registration",
    "django_twilio",
    "drf_spectacular",
    "rest_framework",
    "rest_framework.authtoken",
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    # Local
    "accounts.apps.AccountsConfig",
    "assistant.apps.AssistantConfig",
]

MIDDLEWARE = [
    "django.middleware.cache.UpdateCacheMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    # place corsheaders before any middleware that can generate responses
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "django.middleware.cache.FetchFromCacheMiddleware",
    "allauth.account.middleware.AccountMiddleware",
    "django_auto_logout.middleware.auto_logout", # Auto logout
    "axes.middleware.AxesMiddleware", # Brute Force
]

ROOT_URLCONF = "insurnative_backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                # Auto logout
                "django_auto_logout.context_processors.auto_logout_client",
            ],
        },
    },
]

WSGI_APPLICATION = "insurnative_backend.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "insurnativedb",
        "USER": "postgres",
        "PASSWORD": "rXyfgf7i",
        "HOST": "localhost",
        "PORT": "5432",
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = "/static/"
STATICFILES_DIRS = [
    BASE_DIR / "static",
]
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "django.contrib.staticfiles.storage.StaticFilesStorage"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"


CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True

# Cross-origin resource sharing (CORS)
CORS_ORIGIN_WHITELIST = (
    # React regular
    "http://localhost:3000",
    # Backend regular
    "http://localhost:8000",
)

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://192.168.2.130:8000",
    "http://localhost:8000"
]

# Cross-Site Request Forgery (CSRF)
CSRF_TRUSTED_ORIGINS = ["http://localhost:3000"]


ACCOUNT_SESSION_REMEMBER = True
ACCOUNT_SIGNUP_PASSWORD_ENTER_TWICE = False
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True


EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
DEFAULT_FROM_EMAIL = "no_reply@duewiger.com"
EMAIL_HOST = "w01c2459.kasserver.com"
EMAIL_PORT = 587  # Der Port kann je nach Anforderungen variieren
EMAIL_USE_TLS = True  # Aktiviere dies, wenn du TLS verwenden möchtest
EMAIL_USE_SSL = False  # Deaktiviere dies, wenn du SSL verwenden möchtest
EMAIL_HOST_USER = "kd@duewiger.com"
EMAIL_HOST_PASSWORD = "rXyfgf7i"


AUTO_LOGOUT = {
    'SESSION_TIME': 3600,
    'REDIRECT_TO_LOGIN_IMMEDIATELY': True,
    'MESSAGE': 'The session has expired. Please login again to continue.',
}  # logout after 15 seconds


# AXES CONFIGURATION
AXES_FAILURE_LIMIT: 3 # How many times a user can fail login
AXES_COOLOFF_TIME: 1 # Wait 1 hour before attempting to login again
AXES_RESET_ON_SUCCESS = True # Reset failed login attempts
# AXES_LOCKOUT_TEMPLATE = 'accounts/account_locked.html' # Add a custom template

# python manage.py axes_reset for manually reset
# Reset on success to set back the attempts to 0

# # Other AXES Configurations - Blocking User instead of IP-Adress
# AXES_FAILURE_LIMIT = 5  # Anzahl der erlaubten fehlgeschlagenen Versuche
# AXES_COOLOFF_TIME = 1  # Abkühlzeit in Stunden
# AXES_LOCK_OUT_BY_COMBINATION_USER_AND_IP = True  # Sperre pro Kombination aus Benutzername und IP
# AXES_RESET_ON_SUCCESS = True  # Rücksetzen der fehlgeschlagenen Versuche bei erfolgreicher Anmeldung
# AXES_LOCKOUT_TEMPLATE = 'accounts/account_locked.html'  # Sperrvorlage
# AXES_LOGGER = 'axes.watch_login'  # Protokollierung
# AXES_VERBOSE = True  # Ausführliche Protokollierung


# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'handlers': {
#         'console': {
#             'class': 'logging.StreamHandler',
#         },
#     },
#     'loggers': {
#         'django': {
#             'handlers': ['console'],
#             'level': 'DEBUG',
#         },
#     },
# }


# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTH_USER_MODEL = "accounts.CustomUser"

AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
    "axes.backends.AxesStandaloneBackend",
)

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=120),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}


# OpenAI Integration API
OPENAI_API_KEY = env("OPENAI_API_KEY")

# Twilio SendGrid Integration API
SENDGRID_API_KEY = env("SENDGRID_API_KEY")