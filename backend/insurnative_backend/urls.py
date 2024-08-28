from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

def health_check(request):
    return HttpResponse("OK")

urlpatterns = [
    path("insuradmin/", admin.site.urls),
    # External apps
    # # User management
    path("accounts/", include("allauth.urls")),
    # # JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Local apps
    path("accounts/", include("accounts.urls")),
    path("assistant/", include("assistant.urls")),
    # AWS Health-Check
    path('', health_check),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)