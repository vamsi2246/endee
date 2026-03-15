import json
import os
import sys

# Add the parent directory to sys.path so we can import 'backend'
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.embedding_model import get_embedding_model
from backend.vector_database import get_vector_db

def embed_jobs():
    data_path = "data/jobs.json"
    
    if not os.path.exists(data_path):
        print(f"Error: {data_path} not found.")
        return
        
    print(f"Loading jobs from {data_path}...")
    with open(data_path, 'r') as f:
        jobs = json.load(f)
        
    print(f"Loaded {len(jobs)} jobs. Initializing ML Model and Vector DB...")
    
    model = get_embedding_model()
    db = get_vector_db()
    
    # Process each job
    for i, job in enumerate(jobs):
        job_id = str(i + 1)
        # We embed the concatenated title, company, description, and skills for best search semantics
        skills_text = ", ".join(job.get("skills", []))
        content_to_embed = f"{job['title']} at {job['company']}\n{job['description']}\nSkills: {skills_text}"
        
        print(f"Generating embedding for Job ID {job_id}: {job['title']}")
        vector = model.encode(content_to_embed)
        
        # Insert into Endee Vector DB
        db.insert(record_id=job_id, vector=vector, metadata=job)
        
    print("Successfully populated the Endee vector database with job embeddings!")

if __name__ == "__main__":
    embed_jobs()
