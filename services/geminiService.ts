
import { GoogleGenAI, Type } from "@google/genai";
import { EmotionCard } from "../types";

export interface GenerationResult<T> {
  data: T | null;
  error?: string;
}

/**
 * Generates therapeutic questions for an emotion card using the Gemini model.
 * Adheres to @google/genai guidelines by initializing the client right before usage
 * and obtaining the API key exclusively from process.env.API_KEY.
 */
export const generateQuestionsForCard = async (card: EmotionCard): Promise<GenerationResult<string[]>> => {
  try {
    // Initialize GoogleGenAI directly before usage with the required named parameter.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
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

    // Extract text using the .text property (not a method).
    const text = response.text;
    if (text) {
      return { data: JSON.parse(text.trim()) };
    }
    return { data: null, error: "Pusta odpowiedź z modelu (Text)." };
  } catch (error: any) {
    console.error("Gemini Questions Error:", error);
    return { 
      data: null, 
      error: error.message || "Błąd komunikacji z AI (Pytania)."
    };
  }
};

/**
 * Generates an image for an emotion card using the gemini-2.5-flash-image model.
 * Iterates through response parts to correctly extract the base64 image data.
 */
export const generateImageForCard = async (card: EmotionCard): Promise<GenerationResult<string>> => {
  try {
    // Initialize GoogleGenAI directly before usage.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [{ text: `Watercolor art: ${card.name}, ${card.description}. Ethereal, mystical style. NO TEXT.` }] 
      },
    });

    // Iterate through all parts to find the image part as per guidelines.
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          return { data: `data:image/png;base64,${base64EncodeString}` };
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
