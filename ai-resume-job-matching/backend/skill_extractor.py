import re


SKILLS_LIST = [
    "Python", "JavaScript", "TypeScript", "Java", "C++", "C#", "Go", "Rust", "Ruby", "PHP",
    "Machine Learning", "Deep Learning", "NLP", "Computer Vision", "TensorFlow", "PyTorch", "Scikit-Learn", "Keras",
    "React", "Angular", "Vue", "Next.js", "Node.js", "Express", "Django", "Flask", "FastAPI", "Spring Boot",
    "SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "Cassandra", "Vector Database", "Endee",
    "AWS", "Azure", "GCP", "Google Cloud", "Docker", "Kubernetes", "Terraform", "CI/CD", "Jenkins", "GitHub Actions",
    "Data Analysis", "Data Science", "Pandas", "NumPy", "Spark", "Hadoop", "Airflow", "Kafka",
    "Agile", "Scrum", "Git", "Linux", "REST API", "GraphQL", "Microservices", "System Design",
    "HTML", "CSS", "Tailwind", "SASS", "Figma", "Tableau", "Power BI",
]


class SkillExtractor:
    """
    Extracts skills from resume text using regex pattern matching.
    Lightweight alternative to spaCy for Render free tier deployment.
    """
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(SkillExtractor, cls).__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def _init_if_needed(self):
        if self._initialized:
            return
        self._initialized = True
        print("SkillExtractor: Using regex pattern matching")

    def extract_skills(self, text: str) -> list[str]:
        self._init_if_needed()
        return self._extract_regex(text)

    def _extract_regex(self, text: str) -> list[str]:
        extracted = set()
        text_lower = text.lower()
        for skill in SKILLS_LIST:
            pattern = r'\b' + re.escape(skill.lower()) + r'\b'
            if re.search(pattern, text_lower):
                extracted.add(skill)
        return list(extracted)


def get_skill_extractor():
    return SkillExtractor()
