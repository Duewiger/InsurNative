from django.urls import path
from .views import DocumentDownloadView, DocumentListView, DocumentSearchView, LoginPageView, LogoutPageView, RepresentativeEditView, RepresentativeEmailView, RepresentativePageView, SignupPageView, AccountPageView, AccountDataEditView, AccountDeleteView, DocumentUploadView, DocumentDeleteView, UserSettingsEditView, UserSettingsView, ForgotPasswordPageView


urlpatterns = [
    path('api/login/', LoginPageView.as_view(), name='login'),
    path('api/logout/', LogoutPageView.as_view(), name='logout'),
    path('api/signup/', SignupPageView.as_view(), name='signup'),
    path('api/account/', AccountPageView.as_view(), name='account'),
    path('api/account/edit/', AccountDataEditView.as_view(), name='account_edit'),
    path('api/account/delete/', AccountDeleteView.as_view(), name='account_delete'),
    path('api/documents/', DocumentListView.as_view(), name='documents'),
    path('api/document/upload/', DocumentUploadView.as_view(), name='document_upload'),
    path('api/document/download/<uuid:pk>/', DocumentDownloadView.as_view(), name='document_download'),
    path('api/document/delete/<uuid:pk>/', DocumentDeleteView.as_view(), name='document_delete'),
    path('api/document/search/', DocumentSearchView.as_view(), name='document-search'),
    path('api/user-settings/', UserSettingsView.as_view(), name='user_settings'),
    path('api/user-settings/edit/', UserSettingsEditView.as_view(), name='user_settings_edit'),
    path('api/forgot-password/', ForgotPasswordPageView.as_view(), name='forgot_password'),
    path('api/representative/', RepresentativePageView.as_view(), name='user_representative'),
    path('api/representative/edit/', RepresentativeEditView.as_view(), name='representative_edit'),
    path('api/representative/sendmail/', RepresentativeEmailView.as_view(), name='representative_sendmail')
]