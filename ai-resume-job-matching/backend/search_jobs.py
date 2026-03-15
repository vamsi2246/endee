from sentence_transformers import SentenceTransformer
from endee import Endee
import warnings

# Suppress warnings for cleaner output
warnings.filterwarnings('ignore')

model = SentenceTransformer("all-MiniLM-L6-v2")
client = Endee()

def search_jobs(resume_text: str, top_k: int = 5):
    """
    Search for jobs matching the resume text.
    """
    try:
        index = client.get_index(name="jobs")
    except Exception as e:
        raise RuntimeError(f"Failed to connect to Endee or get 'jobs' index. Is Endee running? Error: {e}")

    # Generate embedding for the given resume text
    resume_embedding = model.encode(resume_text).tolist()
    
    # Query Endee
    results = index.query(vector=resume_embedding, top_k=top_k)
    
    # Results are usually returned as objects with attributes or dicts. 
    # Endee python client returns a list of objects with properties like `id`, `score`, `meta`.
    
    matches = []
    # Depending on client version, it might be a dict or attribute access
    # Endee Go client returns ID, Similarity, Meta. The Python client likely works smoothly via dict or attribute
    for res in results:
        meta = res.get('meta', {}) if isinstance(res, dict) else getattr(res, 'meta', {})
        score = res.get('similarity', res.get('score', 0.0)) if isinstance(res, dict) else getattr(res, 'similarity', getattr(res, 'score', 0.0))
        job_id = res.get('id', '') if isinstance(res, dict) else getattr(res, 'id', '')
        
        matches.append({
            "job_id": job_id,
            "title": meta.get('title', 'Unknown Title'),
            "description": meta.get('description', ''),
            "similarity_score": score
        })
        
    return matches
