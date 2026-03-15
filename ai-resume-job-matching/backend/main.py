from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

from backend.resume_parser import parse_pdf, parse_image
from backend.skill_extractor import get_skill_extractor
from backend.job_matcher import process_and_match_resume
from backend.career_ai import (
    analyze_skill_gaps,
    generate_resume_tips,
    generate_career_roadmap,
    generate_interview_questions
)
from backend.utils import clean_text, extract_experience_level

app = FastAPI(title="AI Career Assistant Platform", version="3.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResumeTextRequest(BaseModel):
    resume_text: str

# ─── Helper: extract skills from text ────────────────────────

def _extract_skills_and_level(text: str):
    cleaned = clean_text(text)
    extractor = get_skill_extractor()
    skills = extractor.extract_skills(cleaned)
    level = extract_experience_level(cleaned)
    return cleaned, skills, level

# ─── Existing Endpoints ──────────────────────────────────────

@app.post("/upload_resume")
async def upload_resume(file: UploadFile = File(...)):
    try:
        content = await file.read()
        filename = file.filename.lower()
        if filename.endswith(".pdf"):
            extracted_text = parse_pdf(content)
        elif filename.endswith((".png", ".jpg", ".jpeg")):
            extracted_text = parse_image(content)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format.")
        return {"extracted_text": extracted_text.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze_resume")
def analyze_resume(request: ResumeTextRequest):
    if not request.resume_text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")
    _, skills, level = _extract_skills_and_level(request.resume_text)
    return {"skills": skills, "experience_level": level}

@app.post("/match_jobs")
def match_jobs(request: ResumeTextRequest):
    if not request.resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text cannot be empty.")
    try:
        results = process_and_match_resume(request.resume_text, top_k=5)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to match jobs: {str(e)}")

# ─── New Career Assistant Endpoints ──────────────────────────

@app.post("/skill_gap_analysis")
def skill_gap_analysis(request: ResumeTextRequest):
    if not request.resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text cannot be empty.")
    try:
        cleaned, skills, _ = _extract_skills_and_level(request.resume_text)
        result = analyze_skill_gaps(cleaned, skills)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Skill gap analysis failed: {str(e)}")

@app.post("/resume_improvement")
def resume_improvement(request: ResumeTextRequest):
    if not request.resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text cannot be empty.")
    try:
        cleaned, skills, _ = _extract_skills_and_level(request.resume_text)
        result = generate_resume_tips(cleaned, skills)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Resume improvement failed: {str(e)}")

@app.post("/career_roadmap")
def career_roadmap(request: ResumeTextRequest):
    if not request.resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text cannot be empty.")
    try:
        cleaned, skills, level = _extract_skills_and_level(request.resume_text)
        result = generate_career_roadmap(cleaned, skills, level)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Career roadmap generation failed: {str(e)}")

@app.post("/interview_questions")
def interview_questions(request: ResumeTextRequest):
    if not request.resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text cannot be empty.")
    try:
        cleaned, skills, _ = _extract_skills_and_level(request.resume_text)
        result = generate_interview_questions(cleaned, skills)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Interview prep failed: {str(e)}")

@app.get("/health")
def health_check():
    return {"status": "healthy", "version": "3.0.0"}
