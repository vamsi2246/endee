# AI Resume – Job Matching System using Endee Vector Database

## Project Overview
This AI-powered application automatically matches a candidate's resume to the most relevant job descriptions using NLP embeddings and semantic vector search. At its core, it leverages the **Endee Vector Database** for sub-millisecond similarity search bridging candidates to ideal tech roles effortlessly.

## Problem Statement
Finding the right role based on a resume is traditionally a keyword-matching task, which often discards the nuance and meaning behind a person's experience. By utilizing dense vector embeddings and semantic similarity, we enable a deeper, more context-aware matching system that aligns unstructured resumes directly with job requirements intelligently.

## System Architecture

```text
User Resume -> [Streamlit Frontend]
                       |
                       v
             [FastAPI Backend]
                       |
                       v
        [Embedding Model: all-MiniLM-L6-v2] -> (Converts texts to Vectors)
                       |
                       v
      [Endee Vector Database (Vector Search)]
                       |
                       v
              [Top 5 Matching Jobs]
                       |
                       v
              [Frontend Display]
```

## How Vector Search Works
Vector search, unlike traditional inverted-index search, works by mapping textual features into a high-dimensional continuous space. Both resumes and job descriptions are transformed into vectors (mathematical arrays of numbers). 
1. **Embedding**: Text is fed through a transformer model (`sentence-transformers/all-MiniLM-L6-v2`) which captures semantic meaning.
2. **Indexing**: Job embeddings are stored in Endee.
3. **Similarity**: The input resume is converted to a vector. Endee computes the Cosine Similarity between this vector and all vectors in the DB, quickly retrieving the top `k` (e.g., 5) jobs that closely map to the candidate’s semantic footprint.

## How Endee is Used
Endee is a high-performance open-source vector database optimal for AI applications.
In this project, Endee handles:
1. Storing 384-dimensional dense vectors created from job descriptions.
2. Persisting jobs metadata (job title, job description, etc.) alongside the vectors.
3. Executing highly-optimized cosine similarity search to retrieve matches fast and efficiently.

---

## Installation Steps
**Prerequisites:** Python 3.9+ and pip. Ensure Endee Vector Database is installed/running.
```bash
# Clone/Download this project
cd ai-resume-job-matching

# 1. Provide an isolated Virtual Environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 2. Install Project Dependencies
pip install -r requirements.txt
```

### Endee Installation
Make sure Endee is running on `http://localhost:8080`. 
From the `endee` repository:
```bash
./install.sh --release --neon  # Apple silicon (Use --avx2 on linux/windows x86)
./run.sh
```
*Alternatively*, use Docker: `docker compose up -d` in the root of the Endee project directory.

---

## Running the Application

### 1. Embed Job Data (One-Time Setup)
Run this script to vectorize current job listings in `data/jobs.csv` and push them to Endee:
```bash
python backend/embed_jobs.py
```
*Expected console output:* 'Successfully embedded and stored jobs!'

### 2. Run Backend (FastAPI)
```bash
uvicorn backend.main:app --reload --port 8000
```
This serves the API endpoint locally at `http://127.0.0.1:8000`.

### 3. Run Frontend (Streamlit)
In a **new terminal window** (with virtual environment activated):
```bash
streamlit run frontend/app.py
```

---

## Example Query & Results

**Input Resume Text:**
> "Python developer with experience in machine learning and APIs. Familiar with FastAPI, Django, and Tensorflow."

**Expected Top Match Results:**
1. **Backend Python Developer** (Match ~0.65+)
2. **Machine Learning Engineer** (Match ~0.55+)
3. **AI Engineer** (Match ~0.45+)
