import os
import uuid
import openai
import base64
import PyPDF2
import logging
from django.conf import settings
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from io import BytesIO
import fitz  # PyMuPDF

from .models import AssistantInteraction
from .serializers import AssistantInteractionSerializer
from accounts.models import Document as UserDocument

client = openai.OpenAI()

logger = logging.getLogger(__name__)

@method_decorator(csrf_exempt, name='dispatch')
class AssistantAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user
            logger.debug(f"Received request from user: {request.user}")
            logger.debug(f"Request data: {request.data}")
            user_message = request.POST.get('message', '')
            logger.debug(f"User message: {user_message}")

            encoded_image = None
            extracted_text = None
            file_path = None

            # Save file temporarily and encode in Base64 if available
            if 'file' in request.FILES:
                uploaded_file = request.FILES['file']
                file_path = default_storage.save(uploaded_file.name, uploaded_file)

                if uploaded_file.name.endswith('.pdf'):
                    with default_storage.open(file_path, 'rb') as file:
                        reader = PyPDF2.PdfReader(file)
                        extracted_text = " ".join([page.extract_text() for page in reader.pages])
                    logger.debug(f"Extracted text from PDF: {extracted_text}")
                else:
                    # Encode the image
                    with default_storage.open(file_path, "rb") as file:
                        encoded_image = base64.b64encode(file.read()).decode('utf-8')
                    logger.debug(f"Encoded image: {encoded_image[:100]}...")  # Log the beginning of the image data

            openai.api_key = settings.OPENAI_API_KEY
            logger.debug("API Key and configuration set.")

            # Previous Chat Interactions of the user with ChatGPT
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

            # GPT-4o-mini API call
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                max_tokens=300,
            )
            
            gpt_response = response.choices[0].message.content.strip()
            logger.debug(f"GPT-4o-mini response: {gpt_response}")

            # Generate PDF using PyMuPDF
            document = fitz.open()
            page = document.new_page()

            text_rect = fitz.Rect(0, 0, 595, 842)  # A4 size
            page.insert_textbox(text_rect, gpt_response)

            # Save the document to a BytesIO object
            temp_stream = BytesIO()
            document.save(temp_stream)
            temp_stream.seek(0)  # Reset stream position to the beginning

            # Save the file to S3
            pdf_filename = f"user_files/translated_document_{uuid.uuid4()}.pdf"
            with default_storage.open(pdf_filename, 'wb') as pdf_file:
                pdf_file.write(temp_stream.getvalue())
            logger.debug(f"PDF generated and saved at: {pdf_filename}")

            # Save the path in the database
            document_instance = UserDocument.objects.create(
                user=user,
                file=pdf_filename
            )
            logger.debug(f"Document saved in database: {document_instance.id}")

            if file_path:
                default_storage.delete(file_path)
                logger.debug(f"Temporary file deleted: {file_path}")

            # Save interaction in DB
            interaction = AssistantInteraction.objects.create(
                user=user,
                message=user_message,
                file=request.FILES.get('file') if 'file' in request.FILES else None,
                response=gpt_response
            )

            serializer = AssistantInteractionSerializer(interaction)
            return JsonResponse(serializer.data)

        except Exception as e:
            logger.error(f"Error in AssistantAPIView: {str(e)}")
            return JsonResponse({'error': str(e)}, status=500)