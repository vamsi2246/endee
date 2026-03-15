"""
career_ai.py — LangChain-powered AI Career Assistant module.
Houses 4 LLM chains for skill gap analysis, resume improvement,
career roadmap generation, and interview question preparation.
All chains use graceful fallbacks when no API key is set.
"""
import os
from typing import List
from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser


# ─── Pydantic Models ────────────────────────────────────────

class SkillGapResult(BaseModel):
    matched_skills: List[str] = Field(description="Skills the candidate already has that match the target roles")
    missing_skills: List[str] = Field(description="Important skills the candidate is missing for their target roles")
    priority_skills: List[str] = Field(description="Top 3 skills to learn first, ordered by impact")

class ResumeImprovementResult(BaseModel):
    improvements: List[str] = Field(description="5-7 specific, actionable suggestions to improve the resume")
    strength_summary: str = Field(description="A 1-2 sentence summary of the resume's strongest points")

class CareerRoadmapStep(BaseModel):
    step_number: int = Field(description="The step number in the roadmap")
    title: str = Field(description="Short title for this step")
    description: str = Field(description="A concise description of what to do in this step")
    duration: str = Field(description="Estimated time to complete, e.g. '2-4 weeks'")

class CareerRoadmapResult(BaseModel):
    target_role: str = Field(description="The recommended target role based on the resume")
    steps: List[CareerRoadmapStep] = Field(description="4-6 ordered steps forming a career roadmap")

class InterviewQuestion(BaseModel):
    skill: str = Field(description="The skill category this question tests")
    question: str = Field(description="The interview question")
    difficulty: str = Field(description="Easy, Medium, or Hard")

class InterviewPrepResult(BaseModel):
    questions: List[InterviewQuestion] = Field(description="8-12 interview questions grouped by skill")
    tips: List[str] = Field(description="3-4 general interview tips for this candidate")


# ─── Shared LLM Helper ──────────────────────────────────────

def _get_llm():
    return ChatOpenAI(model="gpt-3.5-turbo", temperature=0.3, max_tokens=1000)


# ─── 1. Skill Gap Analysis ──────────────────────────────────

def analyze_skill_gaps(resume_text: str, skills: list, jobs: list = None) -> dict:
    try:
        llm = _get_llm()
        parser = JsonOutputParser(pydantic_object=SkillGapResult)

        job_context = ""
        if jobs:
            for j in jobs[:3]:
                job_context += f"- {j.get('title','')}: {j.get('description','')}\n"

        template = """You are an AI Career Advisor specializing in tech skills analysis.

Analyze the candidate's skills against current industry demands and the matched job descriptions.
Identify which skills they have, which they're missing, and which 3 skills to prioritize learning first.

Candidate Skills: {skills}
Resume: {resume_text}
Top Matched Jobs:
{job_context}

{format_instructions}"""

        prompt = PromptTemplate(
            template=template,
            input_variables=["resume_text", "skills", "job_context"],
            partial_variables={"format_instructions": parser.get_format_instructions()},
        )
        chain = prompt | llm | parser
        return chain.invoke({
            "resume_text": resume_text[:2000],
            "skills": ", ".join(skills),
            "job_context": job_context or "No specific jobs matched yet."
        })
    except Exception as e:
        print(f"Skill Gap Analysis Error: {e}")
        return {
            "matched_skills": skills[:5],
            "missing_skills": ["Docker", "Kubernetes", "AWS", "CI/CD", "System Design"],
            "priority_skills": ["Docker", "AWS", "CI/CD"]
        }


# ─── 2. Resume Improvement ──────────────────────────────────

def generate_resume_tips(resume_text: str, skills: list) -> dict:
    try:
        llm = _get_llm()
        parser = JsonOutputParser(pydantic_object=ResumeImprovementResult)

        template = """You are a professional Resume Coach and Technical Recruiter.

Review the candidate's resume and provide specific, actionable improvement suggestions.
Focus on: quantifiable achievements, technical project highlights, formatting, keyword optimization, and impact statements.

Resume:
{resume_text}

Detected Skills: {skills}

{format_instructions}"""

        prompt = PromptTemplate(
            template=template,
            input_variables=["resume_text", "skills"],
            partial_variables={"format_instructions": parser.get_format_instructions()},
        )
        chain = prompt | llm | parser
        return chain.invoke({
            "resume_text": resume_text[:2500],
            "skills": ", ".join(skills)
        })
    except Exception as e:
        print(f"Resume Improvement Error: {e}")
        return {
            "improvements": [
                "Add measurable achievements (e.g., 'Reduced API latency by 40%')",
                "Include links to GitHub projects or portfolio",
                "Highlight AI/ML projects with specific frameworks used",
                "Add a concise professional summary at the top",
                "Mention deployment tools like Docker & CI/CD pipelines",
                "Use action verbs: Built, Designed, Optimized, Deployed",
                "Tailor skills section to match target job descriptions"
            ],
            "strength_summary": "Your resume shows solid technical skills. Focus on quantifying impact and adding project details."
        }


# ─── 3. Career Roadmap ──────────────────────────────────────

def generate_career_roadmap(resume_text: str, skills: list, experience_level: str) -> dict:
    try:
        llm = _get_llm()
        parser = JsonOutputParser(pydantic_object=CareerRoadmapResult)

        template = """You are an AI Career Strategist.

Based on the candidate's current skills and experience level, create a personalized career roadmap.
Generate 4-6 concrete steps they should follow to advance their career, with realistic time estimates.

Resume: {resume_text}
Current Skills: {skills}
Experience Level: {experience_level}

{format_instructions}"""

        prompt = PromptTemplate(
            template=template,
            input_variables=["resume_text", "skills", "experience_level"],
            partial_variables={"format_instructions": parser.get_format_instructions()},
        )
        chain = prompt | llm | parser
        return chain.invoke({
            "resume_text": resume_text[:2000],
            "skills": ", ".join(skills),
            "experience_level": experience_level
        })
    except Exception as e:
        print(f"Career Roadmap Error: {e}")
        return {
            "target_role": "Senior Software Engineer",
            "steps": [
                {"step_number": 1, "title": "Master Docker & Containerization", "description": "Learn Docker fundamentals, build multi-container apps with Docker Compose", "duration": "2-3 weeks"},
                {"step_number": 2, "title": "Build 2 Portfolio Projects", "description": "Create end-to-end projects showcasing your core skills with deployment", "duration": "4-6 weeks"},
                {"step_number": 3, "title": "Learn Cloud Fundamentals", "description": "Get AWS or GCP basics certified, deploy a project to the cloud", "duration": "3-4 weeks"},
                {"step_number": 4, "title": "Contribute to Open Source", "description": "Make meaningful contributions to 2-3 repos in your domain", "duration": "Ongoing"},
                {"step_number": 5, "title": "Practice System Design", "description": "Study distributed systems, practice whiteboard design interviews", "duration": "2-4 weeks"}
            ]
        }


# ─── 4. Interview Questions ─────────────────────────────────

def generate_interview_questions(resume_text: str, skills: list) -> dict:
    try:
        llm = _get_llm()
        parser = JsonOutputParser(pydantic_object=InterviewPrepResult)

        template = """You are a Senior Technical Interviewer at a top tech company.

Based on the candidate's skills, generate 8-12 relevant interview questions they should prepare for.
Mix easy, medium, and hard questions. Group them by skill area.
Also provide 3-4 practical interview tips for this specific candidate.

Candidate Skills: {skills}
Resume Summary: {resume_text}

{format_instructions}"""

        prompt = PromptTemplate(
            template=template,
            input_variables=["resume_text", "skills"],
            partial_variables={"format_instructions": parser.get_format_instructions()},
        )
        chain = prompt | llm | parser
        return chain.invoke({
            "resume_text": resume_text[:2000],
            "skills": ", ".join(skills)
        })
    except Exception as e:
        print(f"Interview Questions Error: {e}")
        questions = []
        for skill in skills[:4]:
            questions.append({"skill": skill, "question": f"Explain a project where you used {skill} and the challenges you faced.", "difficulty": "Medium"})
            questions.append({"skill": skill, "question": f"What are the best practices for working with {skill}?", "difficulty": "Easy"})
        return {
            "questions": questions[:10],
            "tips": [
                "Practice explaining your projects using the STAR method",
                "Be ready to write code on a whiteboard or shared editor",
                "Prepare 2-3 questions to ask the interviewer",
                "Review fundamentals of your core technical skills"
            ]
        }
