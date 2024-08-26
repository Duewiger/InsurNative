import aspose.pdf as ap

def create_translated_pdf_document(file_content, save_path):
    document = ap.Document()
    page = document.pages.add()
    text_fragment = ap.text.TextFragment(file_content)
    page.paragraphs.add(text_fragment)
    document.save(save_path)