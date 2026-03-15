import warnings
warnings.filterwarnings('ignore')

_db_instance = None


class VectorDatabase:
    def __init__(self, index_name="jobs", vector_dim=384):
        self.index_name = index_name
        self.vector_dim = vector_dim
        self._client = None
        self._index = None

    def _ensure_connected(self):
        if self._index is not None:
            return
        try:
            from endee import Endee
            self._client = Endee()
            try:
                self._index = self._client.get_index(name=self.index_name)
            except Exception:
                self._client.create_index(
                    name=self.index_name,
                    space_type="cosine",
                    dim=self.vector_dim,
                    m=16,
                    ef_construction=100,
                    precision="INT8"
                )
                self._index = self._client.get_index(name=self.index_name)
            print(f"VectorDatabase: Connected to Endee index '{self.index_name}'")
        except Exception as e:
            print(f"VectorDatabase: Could not connect to Endee ({e})")
            self._index = None

    def insert(self, record_id: str, vector: list, metadata: dict):
        self._ensure_connected()
        if self._index is None:
            return
        self._index.upsert([{
            "id": record_id,
            "vector": vector,
            "meta": metadata
        }])

    def search(self, vector: list, top_k: int = 5):
        self._ensure_connected()
        if self._index is None:
            return []

        results = self._index.query(vector=vector, top_k=top_k)
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


def get_vector_db():
    global _db_instance
    if _db_instance is None:
        _db_instance = VectorDatabase()
    return _db_instance
