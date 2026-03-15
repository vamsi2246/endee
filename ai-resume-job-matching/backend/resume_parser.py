import io

def parse_pdf(content: bytes) -> str:
    """
    Extracts text from a PDF file.
    Uses PyMuPDF if available, falls back to pypdf.
    """
    extracted_text = ""
    try:
        # Try PyMuPDF first (faster, better extraction)
        import fitz
        pdf_document = fitz.open(stream=content, filetype="pdf")
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            extracted_text += page.get_text() + "\n"
    except ImportError:
        # Fallback to pypdf
        try:
            from pypdf import PdfReader
            reader = PdfReader(io.BytesIO(content))
            for page in reader.pages:
                text = page.extract_text()
                if text:
                    extracted_text += text + "\n"
        except Exception as e:
            print(f"Error parsing PDF with pypdf: {e}")
    except Exception as e:
        print(f"Error parsing PDF: {e}")
    return extracted_text

def parse_image(content: bytes) -> str:
    """
    Extracts text from an image using Tesseract OCR if available.
    Returns a message if Tesseract is not installed.
    """
    extracted_text = ""
    try:
        import pytesseract
        from PIL import Image
        image = Image.open(io.BytesIO(content))
        extracted_text = pytesseract.image_to_string(image)
    except ImportError:
        extracted_text = "Image OCR is not available on this server. Please upload a PDF or paste your resume text."
    except Exception as e:
        print(f"Error parsing Image: {e}")
        extracted_text = "Could not process this image. Please upload a PDF or paste your resume text."
    return extracted_text
