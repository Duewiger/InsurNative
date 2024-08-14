import os
import openai
from django.conf import settings
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .models import AssistantInteraction
from .serializers import AssistantInteractionSerializer


@method_decorator(csrf_exempt, name='dispatch')
class AssistantAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = request.user
        user_message = request.POST.get('message', '')

        # Save the file temporary if available
        file_response = None
        if 'file' in request.FILES:
            uploaded_file = request.FILES['file']
            file_path = default_storage.save(uploaded_file .name, uploaded_file )
            full_file_path = os.path.join(settings.MEDIA_ROOT, file_path)
            file_response = open(full_file_path, "rb")

        try:
            openai.api_key = settings.OPENAI_API_KEY

            response = openai.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": "You are an insurance assistant and advise customers in their language. Further translated documents and messages for him into his language or the language he desires."},
                    {"role": "user", "content": user_message}
                ],
            )

            if file_response:
                default_storage.delete(file_path)
                
            interaction = AssistantInteraction.objects.create(
                user=user,
                message=user_message,
                file=request.FILES.get('file') if 'file' in request.FILES else None,
                response=response.choices[0].message.content.strip()
            )

            serializer = AssistantInteractionSerializer(interaction)
            return JsonResponse(serializer.data)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)