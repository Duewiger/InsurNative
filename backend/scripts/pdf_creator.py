import aspose.pdf as ap

# Dokumentenobjekt initialisieren
document = ap.Document()

# Seite hinzufügen
page = document.pages.add()

# Simulierte ChatGPT Ausgabe
gpt_prompt = str(input("Gib den Text ein: "))

# Textfragment Objekt initialisieren
text_fragment = ap.text.TextFragment(gpt_prompt)

# Textfragment zu neuer Seite hinzufügen
page.paragraphs.add(text_fragment)

# Aktualisiertes PDF speichern -- Hier einfaches hashed UUID verwenden
document.save("output.pdf")