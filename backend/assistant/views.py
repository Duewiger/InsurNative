import os
import uuid
import openai
import base64
import PyPDF2
from django.conf import settings
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .models import AssistantInteraction
from .serializers import AssistantInteractionSerializer
from scripts.pdf_creator import create_translated_pdf_document
from accounts.models import Document


client = openai.OpenAI()

@method_decorator(csrf_exempt, name='dispatch')
class AssistantAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        user_message = request.POST.get('message', '')
        encoded_image = None
        extracted_text = None
        file_path = None

        # Save file temporarily and encode in Base64 if available
        if 'file' in request.FILES:
            uploaded_file = request.FILES['file']
            file_path = default_storage.save(uploaded_file.name, uploaded_file)

            if uploaded_file.name.endswith('.pdf'):
                with open(file_path, 'rb') as file:
                    reader = PyPDF2.PdfReader(file)
                    extracted_text = " ".join([page.extract_text() for page in reader.pages])
            else:
                # encode the image
                with open(file_path, "rb") as file:
                    encoded_image = base64.b64encode(file.read()).decode('utf-8')

        try:
            openai.api_key = settings.OPENAI_API_KEY
            print("API Key und Konfiguration gesetzt.")

            # Previouse Chat Interactions of the user with ChatGPT
            previous_interactions = AssistantInteraction.objects.filter(user=user).order_by('-timestamp')[:10][::-1]
            messages = [{"role": "system", "content": "You are a specialized insurance assistant. Your role is to advise customers on insurance-related queries, translating documents and messages related to insurance matters."}]

            for interaction in previous_interactions:
                messages.append({"role": "user", "content": interaction.message})
                messages.append({"role": "assistant", "content": interaction.response})

            user_input = {"role": "user", "content": [{"type": "text", "text": user_message}]}

            if encoded_image:
                user_input["content"].append({
                    "type": "image_url",
                    "image_url": {"url": f"data:image/jpeg;base64,{encoded_image}"}
                })
            if extracted_text:
                user_input["content"].append({"type": "text", "text": extracted_text})

            messages.append(user_input)

            # 4o-mini with computer-vision || OCR better in future due to text?
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                max_tokens=300,
            )
            
            gpt_response = response.choices[0].message.content.strip()

            # generate a pdf for the user of gpt_respone
            pdf_filename = os.path.join(settings.MEDIA_ROOT, 'user_files', f"translated_document_{uuid.uuid4()}.pdf")
            create_translated_pdf_document(gpt_response, pdf_filename)
            
            print(f"Länge des Dateipfads: {len(pdf_filename)} Zeichen")
            
            document_instance = Document.objects.create(
                user=user,
                file=pdf_filename
            )

            if file_path:
                default_storage.delete(file_path)

            # save interaction in db
            interaction = AssistantInteraction.objects.create(
                user=user,
                message=user_message,
                file=request.FILES.get('file') if 'file' in request.FILES else None,
                response=response.choices[0].message.content.strip()
            )

            serializer = AssistantInteractionSerializer(interaction)
            return JsonResponse(serializer.data)

        except Exception as e:
            print("Fehler beim API-Aufruf: ", str(e))
            return JsonResponse({'error': str(e)}, status=500)