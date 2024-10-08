import os
from pathlib import Path
from environs import Env
from datetime import timedelta


env = Env()
env.read_env()


BASE_DIR = Path(__file__).resolve().parent.parent


SECRET_KEY = env("DJANGO_SECRET_KEY")


DEBUG = env.bool("DJANGO_DEBUG", default=False)


DJANGO_SECURE_SSL_REDIRECT = env("DJANGO_SECURE_SSL_REDIRECT")
DJANGO_SECURE_HSTS_SECONDS = env("DJANGO_SECURE_HSTS_SECONDS")
DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS = env("DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS")
DJANGO_SECURE_HSTS_PRELOAD = env("DJANGO_SECURE_HSTS_PRELOAD")
DJANGO_SESSION_COOKIE_SECURE = env("DJANGO_SESSION_COOKIE_SECURE")
DJANGO_CSRF_COOKIE_SECURE = env("DJANGO_CSRF_COOKIE_SECURE")


# include possible subdomains via (".") as well
ALLOWED_HOSTS = [
    ".duewiger-projects.com",
    ".duewiger.com",
    "duewiger-projects.com",
    "duewiger.com",
    "*",
]



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
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "storages",
    # Local
    "accounts.apps.AccountsConfig",
    "assistant.apps.AssistantConfig",
]


MIDDLEWARE = [
    "django.middleware.cache.UpdateCacheMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "django.middleware.cache.FetchFromCacheMiddleware",
    "allauth.account.middleware.AccountMiddleware",
    "django_auto_logout.middleware.auto_logout",
    "axes.middleware.AxesMiddleware",
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
                "django_auto_logout.context_processors.auto_logout_client",
            ],
        },
    },
]

WSGI_APPLICATION = "insurnative_backend.wsgi.application"


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": env("DATABASE_NAME"),
        "USER": env("DATABASE_USER"),
        "PASSWORD": env("DATABASE_PASSWORD"),
        "HOST": env("DATABASE_HOST"),
        "PORT": env("DATABASE_PORT", default="5432"),
    }
}


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


LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


CSRF_TRUSTED_ORIGINS = [
    "https://www.duewiger-projects.com",
    "https://duewiger-projects.com",
    "https://www.duewiger.com",
    "https://duewiger.com",
]

CORS_ALLOWED_ORIGINS = [
    "https://www.duewiger-projects.com",
    "https://duewiger-projects.com",
    "https://www.duewiger.com",
    "https://duewiger.com",
]

# CORS_ORIGIN_ALLOW_ALL = False -> For Production ofc
CORS_ORIGIN_ALLOW_ALL = True # Never use this just if you have to ^^

CORS_ALLOW_CREDENTIALS = True

# I REALLY SHOULD NOT USE THIS ^^
# CSRF_COOKIE_SECURE = False 

ACCOUNT_SESSION_REMEMBER = True
ACCOUNT_SIGNUP_PASSWORD_ENTER_TWICE = False
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True


EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
DEFAULT_FROM_EMAIL = env("DEFAULT_FROM_EMAIL")
EMAIL_HOST = env("EMAIL_HOST")
EMAIL_PORT = env("EMAIL_PORT")
EMAIL_USE_TLS = env("EMAIL_USE_TLS")
EMAIL_USE_SSL = env("EMAIL_USE_SSL")
EMAIL_HOST_USER = env("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")


AUTO_LOGOUT = {
    'SESSION_TIME': 3600,
    'REDIRECT_TO_LOGIN_IMMEDIATELY': True,
    'MESSAGE': 'The session has expired. Please login again to continue.',
}


AXES_FAILURE_LIMIT: 3
AXES_COOLOFF_TIME: 1
AXES_RESET_ON_SUCCESS = True


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


OPENAI_API_KEY = env("OPENAI_API_KEY")


SENDGRID_API_KEY = env("SENDGRID_API_KEY")


# AWS S3 settings
AWS_ACCESS_KEY_ID = env("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = env("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = env("AWS_STORAGE_BUCKET_NAME")
AWS_S3_REGION_NAME = "eu-central-1"
AWS_LOCATION = 'media'

# Static Files via S3
STATICFILES_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
STATIC_URL = f"https://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/static/"

# Media Files via S3
DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
MEDIA_URL = f"https://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Setup for production logfiles only
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
        },
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'django_debug.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'assistant': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'accounts': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}