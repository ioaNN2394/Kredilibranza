import openai
from app.core import ports

class OpenAIAdapter(ports.LlmPort):
    def __init__(self, api_key: str, model: str, max_tokens: int, temperature: float):
        openai.api_key = api_key
        self._model = model
        self._max_tokens = max_tokens
        self._temperature = temperature

    def generate_text(self, prompt: str, retrieval_context: str) -> str:
        messages = [
            {
                "role": "system",
                "content": "Eres un asistente que proporciona respuestas basadas en el contexto proporcionado.",
            },
            {"role": "user", "content": f"Contexto: {retrieval_context}\n\nPregunta: {prompt}"},
        ]
        response = openai.ChatCompletion.create(
            model=self._model,
            messages=messages,
            max_tokens=self._max_tokens,
            temperature=self._temperature,
        )
        return response.choices[0].message.content.strip()
