import { GoogleGenAI, Type } from "@google/genai";
import { EmotionCard } from "../types";

/**
 * Zwraca klucz API. Jeśli nie istnieje, wyrzuca błąd, który UI może przechwycić.
 */
const getApiKey = () => {
  const key = process.env.API_KEY;
  if (!key || key === "") {
    throw new Error("BRAK_KLUCZA: Zmienna API_KEY nie została znaleziona w środowisku (Vercel).");
  }
  return key;
};

export interface GenerationResult<T> {
  data: T | null;
  error?: string;
}

export const generateQuestionsForCard = async (card: EmotionCard): Promise<GenerationResult<string[]>> => {
  try {
    const apiKey = getApiKey();
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Jesteś terapeutą. Wygeneruj 4 pytania do karty "${card.name}". Metafora: ${card.description}. Format: JSON array of strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    if (response.text) {
      return { data: JSON.parse(response.text.trim()) };
    }
    return { data: null, error: "Pusta odpowiedź z modelu (Text)." };
  } catch (error: any) {
    console.error("Gemini Questions Error:", error);
    return { 
      data: null, 
      error: error.message?.includes("BRAK_KLUCZA") 
        ? "Błąd konfiguracji: Klucz API nie jest ustawiony na Vercelu." 
        : `Błąd API: ${error.message || "Nieznany błąd sieci."}`
    };
  }
};

export const generateImageForCard = async (card: EmotionCard): Promise<GenerationResult<string>> => {
  try {
    const apiKey = getApiKey();
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [{ text: `Watercolor art: ${card.name}, ${card.description}. Ethereal, mystical style. NO TEXT.` }] 
      },
    });

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return { data: `data:image/png;base64,${part.inlineData.data}` };
        }
      }
    }
    return { data: null, error: "Model nie zwrócił danych obrazu." };
  } catch (error: any) {
    console.error("Gemini Image Error:", error);
    return { 
      data: null, 
      error: `Błąd obrazu: ${error.message || "Problem z generowaniem grafiki."}`
    };
  }
};

export const getFallbackQuestions = () => [
  "Co czujesz, gdy patrzysz na tę kartę po raz pierwszy?",
  "Jak ta emocja przejawia się w Twoim ciele w tej chwili?",
  "O czym ta karta próbuje Cię poinformować w kontekście Twoich relacji?",
  "Jaki mały krok możesz zrobić dzisiaj, by zaopiekować się tą częścią siebie?"
];
