import aspose.pdf as ap

def create_translated_pdf_document(file_content, save_path):
    # Dokumentenobjekt initialisieren
    document = ap.Document()
    # Seite hinzufügen
    page = document.pages.add()
    # Textfragment Objekt initialisieren
    text_fragment = ap.text.TextFragment(file_content)
    # Textfragment zu neuer Seite hinzufügen
    page.paragraphs.add(text_fragment)
    # PDF an angegebener Speicherposition speichern
    document.save(save_path)