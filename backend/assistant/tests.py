from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import logging
import openai
from django.conf import settings

logger = logging.getLogger(__name__)

def test_file_storage():
    try:
        path = default_storage.save('test.txt', ContentFile('This is a test content'))
        logger.debug(f"File saved to: {path}")
        with default_storage.open(path, 'r') as file:
            content = file.read()
            logger.debug(f"File content: {content}")
        default_storage.delete(path)
        logger.debug(f"File deleted: {path}")
    except Exception as e:
        logger.error(f"Error in file storage test: {str(e)}")

def test_openai_connection():
    try:
        openai.api_key = settings.OPENAI_API_KEY
        response = openai.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "user", "content": "Test"}
            ],
            max_tokens=100,
            timeout=10
        )
        logger.debug(f"OpenAI response: {response.choices[0].message.content.strip()}")
    except Exception as e:
        logger.error(f"Error in OpenAI connection: {str(e)}")

def test_middleware_order():
    try:
        middleware = settings.MIDDLEWARE
        logger.debug(f"Middleware order: {middleware}")
    except Exception as e:
        logger.error(f"Error in middleware configuration: {str(e)}")