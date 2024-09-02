import logging
import fitz
from io import BytesIO
from django.core.files.storage import default_storage

logger = logging.getLogger(__name__)

def create_translated_pdf_document(file_content, save_path):
    document = fitz.open()
    page = document.new_page()

    # Add the text to the page
    text_rect = fitz.Rect(0, 0, 595, 842)  # A4 size
    page.insert_textbox(text_rect, file_content)

    # Save the document to a BytesIO stream
    temp_stream = BytesIO()
    document.save(temp_stream)

    # Move to the start of the stream
    temp_stream.seek(0)

    # Save the stream to S3
    with default_storage.open(save_path, 'wb') as s3_file:
        s3_file.write(temp_stream.getvalue())
    
    logger.debug(f"PDF successfully saved to: {save_path}")