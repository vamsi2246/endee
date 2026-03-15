import spacy
from spacy.matcher import PhraseMatcher

class SkillExtractor:
    _instance = None
    
    def __new__(cls, model_name="en_core_web_sm"):
        if cls._instance is None:
            cls._instance = super(SkillExtractor, cls).__new__(cls)
            try:
                cls._instance.nlp = spacy.load(model_name)
            except OSError:
                print(f"Model '{model_name}' not found. Downloading...")
                from spacy.cli import download
                download(model_name)
                cls._instance.nlp = spacy.load(model_name)
                
            cls._instance.matcher = PhraseMatcher(cls._instance.nlp.vocab, attr="LOWER")
            cls._instance._load_skills()
            
        return cls._instance
        
    def _load_skills(self):
        # A comprehensive list of technical skills for the tech industry
        # In a real app, this would be loaded from a database or JSON file
        skills = [
            "Python", "JavaScript", "TypeScript", "Java", "C++", "C#", "Go", "Rust", "Ruby", "PHP",
            "Machine Learning", "Deep Learning", "NLP", "Computer Vision", "TensorFlow", "PyTorch", "Scikit-Learn", "Keras",
            "React", "Angular", "Vue", "Next.js", "Node.js", "Express", "Django", "Flask", "FastAPI", "Spring Boot",
            "SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "Cassandra", "Vector Database", "Endee",
            "AWS", "Azure", "GCP", "Google Cloud", "Docker", "Kubernetes", "Terraform", "CI/CD", "Jenkins", "GitHub Actions",
            "Data Analysis", "Data Science", "Pandas", "NumPy", "Spark", "Hadoop", "Airflow", "Kafka",
            "Agile", "Scrum", "Git", "Linux", "REST API", "GraphQL", "Microservices", "System Design"
        ]
        
        patterns = [self.nlp.make_doc(text) for text in skills]
        self.matcher.add("SKILLS", patterns)
        
    def extract_skills(self, text: str) -> list[str]:
        """
        Uses spaCy PhraseMatcher to extract known skills from the resume text.
        """
        doc = self.nlp(text)
        matches = self.matcher(doc)
        
        extracted_skills = set()
        for match_id, start, end in matches:
            span = doc[start:end]
            # Capitalize properly based on our known list if possible, or title case
            extracted_skills.add(span.text.title())
            
        # De-duplicate case variations (e.g. Node.js vs Node.Js)
        # Note: In a production app you'd map back to the canonical name in the skills list
        return list(extracted_skills)

def get_skill_extractor():
    return SkillExtractor()
