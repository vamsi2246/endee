import io
import fitz  # PyMuPDF
import pytesseract
from PIL import Image

def parse_pdf(content: bytes) -> str:
    """
    Extracts text from a PDF file using PyMuPDF.
    """
    extracted_text = ""
    try:
        pdf_document = fitz.open(stream=content, filetype="pdf")
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            extracted_text += page.get_text() + "\n"
    except Exception as e:
        print(f"Error parsing PDF: {e}")
    return extracted_text

def parse_image(content: bytes) -> str:
    """
    Extracts text from an image using Tesseract OCR.
    """
    extracted_text = ""
    try:
        image = Image.open(io.BytesIO(content))
        extracted_text = pytesseract.image_to_string(image)
    except Exception as e:
        print(f"Error parsing Image: {e}")
    return extracted_text
