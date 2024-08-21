# import os
# import openai
# import base64
# import PyPDF2
# from django.conf import settings
# from django.http import JsonResponse
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.views import APIView
# from django.core.files.storage import default_storage
# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator

# from .models import AssistantInteraction
# from .serializers import AssistantInteractionSerializer

# from openai import OpenAI

# client = OpenAI()

# @method_decorator(csrf_exempt, name='dispatch')
# class AssistantAPIView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         user = request.user
#         user_message = request.POST.get('message', '')
#         encoded_image = None
#         extracted_text = None
#         file_path = None

#         # Datei temporär speichern und in Base64 codieren, falls vorhanden
#         if 'file' in request.FILES:
#             uploaded_file = request.FILES['file']
#             file_path = default_storage.save(uploaded_file.name, uploaded_file)
#             full_file_path = os.path.join(settings.MEDIA_ROOT, file_path)

#             # Überprüfe den Dateityp
#             if uploaded_file.name.endswith('.pdf'):
#                 # Extrahiere Text aus dem PDF
#                 with open(full_file_path, 'rb') as file:
#                     reader = PyPDF2.PdfReader(file)
#                     extracted_text = " ".join([page.extract_text() for page in reader.pages])
#             else:
#                 # Bild in Base64 codieren
#                 with open(full_file_path, "rb") as file:
#                     encoded_image = base64.b64encode(file.read()).decode('utf-8')

#         try:
#             openai.api_key = settings.OPENAI_API_KEY
#             print("API Key und Konfiguration gesetzt.")

#             # Erstelle die Nachrichtenliste mit dem bisherigen Verlauf
#             previous_interactions = AssistantInteraction.objects.filter(user=user).order_by('-timestamp')[:10][::-1]
#             messages = [{"role": "system", "content": "You are a specialized insurance assistant. Your role is to advise customers on insurance-related queries, translating documents and messages related to insurance matters."}]

#             for interaction in previous_interactions:
#                 messages.append({"role": "user", "content": interaction.message})
#                 messages.append({"role": "assistant", "content": interaction.response})

#             # Backend-Logik anpassen, um reine Textnachrichten zu unterstützen
#             if not encoded_image and not extracted_text:
#                 # Wenn weder Bild noch PDF vorhanden ist, verarbeite nur die Textnachricht
#                 user_input = {"role": "user", "content": [{"type": "text", "text": user_message}]}
#             else:
#                 # Ansonsten füge den Inhalt für Bilder oder PDF-Text hinzu, wie du es bereits getan hast
#                 if encoded_image:
#                     user_input["content"].append({
#                         "type": "image_url",
#                         "image_url": {"url": f"data:image/jpeg;base64,{encoded_image}"}
#                     })
#                 if extracted_text:
#                     user_input["content"].append({"type": "text", "text": extracted_text})

#             messages.append(user_input)


#             # GPT-4 API-Aufruf mit Vision-Funktionalität
#             response = client.chat.completions.create(
#             model="gpt-4o-mini",
#             messages=[
#                 {
#                 "role": "user",
#                 "content": [
#                     {"type": "text", "text": user_message},
#                     {
#                         "type": "image_url",
#                         "image_url": {"url": f"data:image/jpeg;base64,{encoded_image}"}
#                     }
#                 ],
#                 }
#             ],
#             max_tokens=300,
#             )

#             # Lösche die hochgeladene Datei nach Verarbeitung
#             if file_path:
#                 default_storage.delete(file_path)

#             # Speichere die aktuelle Interaktion
#             interaction = AssistantInteraction.objects.create(
#                 user=user,
#                 message=user_message,
#                 file=request.FILES.get('file') if 'file' in request.FILES else None,
#                 response=response.choices[0].message.content.strip()
#             )

#             serializer = AssistantInteractionSerializer(interaction)
#             return JsonResponse(serializer.data)

#         except Exception as e:
#             print("Fehler beim API-Aufruf: ", str(e))
#             return JsonResponse({'error': str(e)}, status=500)


import os
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

        # Datei temporär speichern und in Base64 codieren, falls vorhanden
        if 'file' in request.FILES:
            uploaded_file = request.FILES['file']
            file_path = default_storage.save(uploaded_file.name, uploaded_file)
            full_file_path = os.path.join(settings.MEDIA_ROOT, file_path)

            # Überprüfe den Dateityp
            if uploaded_file.name.endswith('.pdf'):
                # Extrahiere Text aus dem PDF
                with open(full_file_path, 'rb') as file:
                    reader = PyPDF2.PdfReader(file)
                    extracted_text = " ".join([page.extract_text() for page in reader.pages])
            else:
                # Bild in Base64 codieren
                with open(full_file_path, "rb") as file:
                    encoded_image = base64.b64encode(file.read()).decode('utf-8')

        try:
            openai.api_key = settings.OPENAI_API_KEY
            print("API Key und Konfiguration gesetzt.")

            # Erstelle die Nachrichtenliste mit dem bisherigen Verlauf
            previous_interactions = AssistantInteraction.objects.filter(user=user).order_by('-timestamp')[:10][::-1]
            messages = [{"role": "system", "content": "You are a specialized insurance assistant. Your role is to advise customers on insurance-related queries, translating documents and messages related to insurance matters."}]

            for interaction in previous_interactions:
                messages.append({"role": "user", "content": interaction.message})
                messages.append({"role": "assistant", "content": interaction.response})

            # Initialisiere user_input
            user_input = {"role": "user", "content": [{"type": "text", "text": user_message}]}

            # Ansonsten füge den Inhalt für Bilder oder PDF-Text hinzu
            if encoded_image:
                user_input["content"].append({
                    "type": "image_url",
                    "image_url": {"url": f"data:image/jpeg;base64,{encoded_image}"}
                })
            if extracted_text:
                user_input["content"].append({"type": "text", "text": extracted_text})

            messages.append(user_input)

            # GPT-4 API-Aufruf mit Vision-Funktionalität
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                max_tokens=300,
            )

            # Lösche die hochgeladene Datei nach Verarbeitung
            if file_path:
                default_storage.delete(file_path)

            # Speichere die aktuelle Interaktion
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