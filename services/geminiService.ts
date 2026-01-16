
import { GoogleGenAI, Type } from "@google/genai";
import { EmotionCard } from "../types";

/**
 * Zwraca klucz API z otoczenia. 
 * Na Vercelu musi być on dodany w zakładce Environment Variables jako API_KEY.
 */
const API_KEY = process.env.API_KEY;

export const generateQuestionsForCard = async (card: EmotionCard): Promise<string[]> => {
  if (!API_KEY) {
    console.warn("Gemini: Brak klucza API. Używam pytań domyślnych.");
    return getFallbackQuestions();
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
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
      return JSON.parse(response.text.trim());
    }
  } catch (error) {
    console.error("Gemini (Questions) Error:", error);
  }

  return getFallbackQuestions();
};

export const generateImageForCard = async (card: EmotionCard): Promise<string> => {
  const fallbackImg = `https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop`;
  
  if (!API_KEY) {
    console.warn("Gemini: Brak klucza API. Używam obrazu domyślnego.");
    return fallbackImg;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    // Ustawiamy limit czasu (timeout) na poziomie logiki, by nie blokować UI
    const generatePromise = ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [{ text: `Watercolor art: ${card.name}, ${card.description}. Ethereal, mystical style. NO TEXT.` }] 
      },
    });

    // Prosty "wyścig" z czasem - jeśli API nie odpowie w 15s, używamy fallbacku
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Timeout")), 15000)
    );

    const response: any = await Promise.race([generatePromise, timeoutPromise]);

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
  } catch (error) {
    console.error("Gemini (Image) Error:", error);
  }

  return fallbackImg;
};

const getFallbackQuestions = () => [
  "Co czujesz, gdy patrzysz na tę kartę po raz pierwszy?",
  "Jak ta emocja przejawia się w Twoim ciele w tej chwili?",
  "O czym ta karta próbuje Cię poinformować w kontekście Twoich relacji?",
  "Jaki mały krok możesz zrobić dzisiaj, by zaopiekować się tą częścią siebie?"
];
