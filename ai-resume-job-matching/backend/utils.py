import re
import json

def clean_text(text: str) -> str:
    """
    Cleans extracted text by removing extra whitespaces, newlines, and special characters.
    """
    if not text:
        return ""
    # Replace newlines with spaces
    text = text.replace('\n', ' ')
    # Remove excessive spaces
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def extract_experience_level(text: str) -> str:
    """
    A simple rule-based approach to determine experience level from text.
    In a real system, this would be a classification model.
    """
    text_lower = text.lower()
    
    senior_keywords = ['senior', 'staff', 'principal', 'lead', 'architect', 'head of']
    mid_keywords = ['mid-level', 'intermediate', 'years of experience', 'experienced']
    entry_keywords = ['junior', 'entry-level', 'entry', 'intern', 'graduate', 'fresh']
    
    # Check for senior
    if any(kw in text_lower for kw in senior_keywords):
        return "Senior Level"
        
    # Check for mid
    if any(kw in text_lower for kw in mid_keywords):
        return "Mid Level"
        
    # Check for entry
    if any(kw in text_lower for kw in entry_keywords):
        return "Entry Level"
        
    # Default fallback
    return "Mid Level"
