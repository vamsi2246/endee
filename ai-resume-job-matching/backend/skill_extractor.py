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
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(SkillExtractor, cls).__new__(cls)
            cls._instance._initialized = False
            cls._instance._use_spacy = False
        return cls._instance

    def _init_if_needed(self):
        if self._initialized:
            return
        self._initialized = True
        try:
            import spacy
            from spacy.matcher import PhraseMatcher
            try:
                nlp = spacy.load("en_core_web_sm")
            except OSError:
                from spacy.cli import download
                download("en_core_web_sm")
                nlp = spacy.load("en_core_web_sm")
            self.nlp = nlp
            self.matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
            patterns = [nlp.make_doc(text) for text in SKILLS_LIST]
            self.matcher.add("SKILLS", patterns)
            self._use_spacy = True
            print("SkillExtractor: Using spaCy PhraseMatcher")
        except Exception as e:
            print(f"SkillExtractor: spaCy not available ({e}), using regex fallback")
            self._use_spacy = False

    def extract_skills(self, text: str) -> list[str]:
        self._init_if_needed()
        if self._use_spacy:
            return self._extract_spacy(text)
        return self._extract_regex(text)

    def _extract_spacy(self, text: str) -> list[str]:
        doc = self.nlp(text)
        matches = self.matcher(doc)
        extracted = set()
        for match_id, start, end in matches:
            span = doc[start:end]
            extracted.add(span.text.title())
        return list(extracted)

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
