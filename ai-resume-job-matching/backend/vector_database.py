from endee import Endee
import warnings

# Suppress urllib3 SSL warnings on older macOS setups
warnings.filterwarnings('ignore')

class VectorDatabase:
    def __init__(self, index_name="jobs", vector_dim=384):
        self.index_name = index_name
        self.vector_dim = vector_dim
        self.client = Endee()
        self.index = self._get_or_create_index()
        
    def _get_or_create_index(self):
        try:
            return self.client.get_index(name=self.index_name)
        except Exception:
            # Create if it doesn't exist
            self.client.create_index(
                name=self.index_name,
                space_type="cosine",
                dim=self.vector_dim,
                m=16,
                ef_construction=100,
                precision="INT8"
            )
            return self.client.get_index(name=self.index_name)
            
    def insert(self, record_id: str, vector: list, metadata: dict):
        """
        Insert a single document vector.
        """
        # Endee expects a list of dictionaries for upsert
        self.index.upsert([
            {
                "id": record_id,
                "vector": vector,
                "meta": metadata
            }
        ])
        
    def search(self, vector: list, top_k: int = 5):
        """
        Search for similar vectors in the database.
        """
        results = self.index.query(vector=vector, top_k=top_k)
        
        matches = []
        for res in results:
            meta = res.get('meta', {}) if isinstance(res, dict) else getattr(res, 'meta', {})
            score = res.get('similarity', res.get('score', 0.0)) if isinstance(res, dict) else getattr(res, 'similarity', getattr(res, 'score', 0.0))
            job_id = res.get('id', '') if isinstance(res, dict) else getattr(res, 'id', '')
            
            matches.append({
                "job_id": job_id,
                "metadata": meta,
                "similarity_score": score
            })
            
        return matches

# Singleton instance
db_instance = None

def get_vector_db():
    global db_instance
    if db_instance is None:
        db_instance = VectorDatabase()
    return db_instance
