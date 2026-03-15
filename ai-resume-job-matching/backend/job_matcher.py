from backend.utils import clean_text, extract_experience_level
from backend.embedding_model import get_embedding_model
from backend.vector_database import get_vector_db
from backend.skill_extractor import get_skill_extractor
from backend.rag_pipeline import analyze_job_matches

def process_and_match_resume(raw_text: str, top_k: int = 5):
    """
    Core business logic: cleans text, extracts skills/experience,
    generates embeddings, and queries the vector database for matching jobs.
    Passes contextual retrieved data to the LangChain RAG pipeline for reasoning.
    """
    # 1. Clean Text
    cleaned_text = clean_text(raw_text)
    
    # 2. Extract Skills and Experience
    skill_extractor = get_skill_extractor()
    skills = skill_extractor.extract_skills(cleaned_text)
    exp_level = extract_experience_level(cleaned_text)
    
    # 3. Generate Embedding
    model = get_embedding_model()
    resume_embedding = model.encode(cleaned_text)
    
    # 4. Query Vector Database
    db = get_vector_db()
    raw_matches = db.search(vector=resume_embedding, top_k=top_k)
    
    # 5. Format Output for RAG Pipeline
    jobs_for_rag = []
    
    for match in raw_matches:
        meta = match["metadata"]
        score = match["similarity_score"]
        
        job_info = {
            "title": meta.get("title", "Unknown Role"),
            "company": meta.get("company", "Unknown Company"),
            "match_score": round(score, 4),
            "description": meta.get("description", ""),
            "job_id": match["job_id"]
        }
        jobs_for_rag.append(job_info)
        
    # 6. Execute RAG Pipeline for Job Matching Reasoning
    rag_results = analyze_job_matches(cleaned_text, jobs_for_rag)
    
    final_jobs = []
    recommended_roles = []
    
    # Create a lookup for the original jobs to map company info back
    original_jobs_lookup = {j["job_id"]: j for j in jobs_for_rag}
    
    # Merge LLM reasoning output with original DB context
    for rag_job in rag_results.get("jobs", []):
        job_id = rag_job.get("job_id")
        orig_job = original_jobs_lookup.get(job_id, {})
        
        final_jobs.append({
            "title": rag_job.get("title", orig_job.get("title")),
            "company": orig_job.get("company", "Unknown Company"),
            "match_score": rag_job.get("match_score", orig_job.get("match_score", 0)),
            "reason": rag_job.get("reason", ""),
            "job_id": job_id
        })
        
        if rag_job.get("title") and rag_job.get("title") not in recommended_roles:
            recommended_roles.append(rag_job.get("title"))

    # Fallback if LLM didn't return roles properly
    if not recommended_roles:
        for job in final_jobs:
            if job["title"] not in recommended_roles:
                recommended_roles.append(job["title"])

    # Final API Response Structure
    return {
        "resume_skills": skills,
        "experience_level": exp_level,
        "recommended_roles": recommended_roles[:3],
        "jobs": final_jobs,
        "skill_gaps": rag_results.get("skill_gaps", []),
        "career_advice": rag_results.get("career_advice", "")
    }
