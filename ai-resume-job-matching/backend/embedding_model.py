from sentence_transformers import SentenceTransformer
import functools

class EmbeddingModel:
    _instance = None
    
    def __new__(cls, model_name="all-MiniLM-L6-v2"):
        if cls._instance is None:
            cls._instance = super(EmbeddingModel, cls).__new__(cls)
            print(f"Loading SentenceTransformer model: {model_name}...")
            # Load the model only once
            cls._instance.model = SentenceTransformer(model_name)
        return cls._instance

    def encode(self, text: str):
        """
        Generate embedding for a single text string.
        """
        return self.model.encode(text).tolist()
        
    def encode_batch(self, texts: list):
        """
        Generate embeddings for a batch of text strings.
        """
        return self.model.encode(texts).tolist()

# Singleton accessor
def get_embedding_model():
    return EmbeddingModel()
