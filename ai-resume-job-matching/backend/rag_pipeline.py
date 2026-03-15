import os
from typing import List
from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser

class JobMatchReasoning(BaseModel):
    job_id: str = Field(description="The matching job's ID")
    title: str = Field(description="The title of the job")
    match_score: float = Field(description="The normalized match score as a decimal (0.0 to 1.0)")
    reason: str = Field(description="A concise, 1-2 sentence explanation of why this job is a strong match for the candidate based on their skills and the job requirements")

class RAGAnalysisResult(BaseModel):
    jobs: List[JobMatchReasoning] = Field(description="List of reasoning and updated match scores for the retrieved jobs")
    skill_gaps: List[str] = Field(description="A list of 3-5 key skills the candidate is missing to improve their chances for these roles")
    career_advice: str = Field(description="A short, encouraging paragraph of personalized career advice based on the resume and the job market")

def analyze_job_matches(resume_text: str, retrieved_jobs: list) -> dict:
    """
    RAG Pipeline: Passes the resume and retrieved vector jobs to the LLM to generate 
    match reasoning, skill gaps, and career advice.
    """
    try:
        # Initialize the LLM (Must be in try/except in case API key is missing)
        llm = ChatOpenAI(
            model="gpt-3.5-turbo", 
            temperature=0.2, 
            max_tokens=800
        )
        
        # Setup the output parser
        parser = JsonOutputParser(pydantic_object=RAGAnalysisResult)
        
        # Format the retrieved context for the prompt
        context_jobs = ""
        for idx, job in enumerate(retrieved_jobs):
            context_jobs += f"Job {idx+1}:\n"
            context_jobs += f"ID: {job['job_id']}\n"
            context_jobs += f"Title: {job['title']}\n"
            context_jobs += f"Company: {job['company']}\n"
            context_jobs += f"Similarity Score (from Vector DB): {job['match_score']}\n"
            context_jobs += f"Description: {job['description']}\n\n"
            
        # Define the template
        template = """You are an expert AI Career Assistant and Technical Recruiter.
        
Based on the candidate's resume and the list of jobs retrieved from our vector database, analyze the fit.
For each job, provide a concise explanation of why the candidate is a match. You may slightly adjust the match score based on your NLP analysis, but keep it close to the original Similarity Score.
Also, identify the candidate's core skill gaps and provide some personalized career advice.

Resume Text:
{resume_text}

Retrieved Job Descriptions Context:
{context_jobs}

{format_instructions}
"""

        prompt = PromptTemplate(
            template=template,
            input_variables=["resume_text", "context_jobs"],
            partial_variables={"format_instructions": parser.get_format_instructions()},
        )
        
        # Establish the LCEL chain
        chain = prompt | llm | parser
        
        response = chain.invoke({
            "resume_text": resume_text[:3000],  # Truncate resume to save token space if needed
            "context_jobs": context_jobs
        })
        return response
    except Exception as e:
        print(f"RAG Pipeline Error: {e}")
        # Return fallback structured data so the API doesn't completely fail
        fallback_jobs = []
        for job in retrieved_jobs:
            fallback_jobs.append({
                "job_id": job["job_id"],
                "title": job["title"],
                "match_score": job["match_score"],
                "reason": "This job leverages skills closely aligned with your core competencies."
            })
            
        return {
            "jobs": fallback_jobs,
            "skill_gaps": ["Add an OPENAI_API_KEY environment variable to generate true skill gaps."],
            "career_advice": "Without an LLM to analyze your resume contextually, we rely purely on dense vector retrieval matching which focuses more on keyword semantics."
        }
