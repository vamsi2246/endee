from sentence_transformers import SentenceTransformer


class EmbeddingModel:
    _instance = None

    def __new__(cls, model_name="all-MiniLM-L6-v2"):
        if cls._instance is None:
            cls._instance = super(EmbeddingModel, cls).__new__(cls)
            cls._instance._model = None
            cls._instance._model_name = model_name
        return cls._instance

    def _load_model(self):
        if self._model is None:
            print(f"Loading SentenceTransformer model: {self._model_name}...")
            self._model = SentenceTransformer(self._model_name)

    def encode(self, text: str):
        self._load_model()
        return self._model.encode(text).tolist()

    def encode_batch(self, texts: list):
        self._load_model()
        return self._model.encode(texts).tolist()


def get_embedding_model():
    return EmbeddingModel()
