from backend.embedding_model import get_embedding_model
from backend.vector_database import get_vector_db
import warnings

# Suppress warnings for cleaner output
warnings.filterwarnings('ignore')


def search_jobs(resume_text: str, top_k: int = 5):
    """
    Search for jobs matching the resume text.
    Uses the lightweight TF-IDF embedding model and Endee vector database.
    """
    model = get_embedding_model()
    db = get_vector_db()

    # Generate embedding for the given resume text
    resume_embedding = model.encode(resume_text)

    # Query Endee vector database
    raw_matches = db.search(vector=resume_embedding, top_k=top_k)

    matches = []
    for res in raw_matches:
        meta = res.get("metadata", {})
        score = res.get("similarity_score", 0.0)
        job_id = res.get("job_id", "")

        matches.append({
            "job_id": job_id,
            "title": meta.get('title', 'Unknown Title'),
            "description": meta.get('description', ''),
            "similarity_score": score
        })

    return matches
