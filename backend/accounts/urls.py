from django.urls import path
from .views import LoginPageView, LogoutPageView, SignupPageView, AccountPageView, AccountDataEditView, AccountDataDeleteView, DocumentUploadView, DocumentDeleteView, UserSettingsView, ForgotPasswordPageView

urlpatterns = [
    path('api/login/', LoginPageView.as_view(), name='login'),
    path('api/logout/', LogoutPageView.as_view(), name='logout'),
    path('api/signup/', SignupPageView.as_view(), name='signup'),
    path('api/account/', AccountPageView.as_view(), name='account'),
    path('api/account/edit/', AccountDataEditView.as_view(), name='account_edit'),
    path('api/account/delete/', AccountDataDeleteView.as_view(), name='account_delete'),
    path('api/document/upload/', DocumentUploadView.as_view(), name='document_upload'),
    path('api/document/delete/<str:pk>/', DocumentDeleteView.as_view(), name='document_delete'),
    path('api/user-settings/', UserSettingsView.as_view(), name='user_settings'),
    path('api/forgot-password/', ForgotPasswordPageView.as_view(), name='forgot_password'),
]