from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np


class EmbeddingModel:
    """
    Lightweight embedding model using TF-IDF.
    Falls back from sentence-transformers (needs PyTorch/2GB+) to sklearn TF-IDF
    which works on Render free tier (512MB RAM).
    """
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(EmbeddingModel, cls).__new__(cls)
            cls._instance._vectorizer = TfidfVectorizer(
                max_features=384,
                stop_words='english',
                ngram_range=(1, 2)
            )
            cls._instance._fitted = False
            print("EmbeddingModel: Using lightweight TF-IDF (sklearn)")
        return cls._instance

    def encode(self, text: str):
        if not self._fitted:
            self._vectorizer.fit([text])
            self._fitted = True
        vector = self._vectorizer.transform([text]).toarray()[0]
        return vector.tolist()

    def encode_batch(self, texts: list):
        if not self._fitted:
            self._vectorizer.fit(texts)
            self._fitted = True
        vectors = self._vectorizer.transform(texts).toarray()
        return vectors.tolist()


def get_embedding_model():
    return EmbeddingModel()
