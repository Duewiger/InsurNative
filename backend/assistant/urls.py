from django.urls import path
from .views import AssistantAPIView

urlpatterns = [
    path('upload/', AssistantAPIView.as_view(), name='gpt_file_and_text_upload'),
]