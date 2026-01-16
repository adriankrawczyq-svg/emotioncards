
import { GoogleGenAI, Type } from "@google/genai";
import { EmotionCard } from "../types";

export interface GenerationResult<T> {
  data: T | null;
  error?: string;
}

export const generateQuestionsForCard = async (card: EmotionCard): Promise<GenerationResult<string[]>> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Jesteś doświadczonym terapeutą pracującym z kartami metaforycznymi. Twoim zadaniem jest wygenerowanie 4 konkretnych i głębokich pytań dla osoby, która właśnie wylosowała kartę: "${card.name}". 
      Metafora wizualna tej karty to: ${card.description}.
      
      Struktura pytań MUSI odpowiadać tym czterem etapom:
      1. Pierwsze poruszenie (skup się na tym, co pojawia się jako pierwsze: obraz, słowo, spontaniczna reakcja bez analizowania).
      2. Związek z Twoim „teraz” (skup się na obecnej sytuacji życiowej, relacjach, pracy lub zmianie znaczenia tego symbolu w czasie).
      3. Mechanizm pod spodem (skup się na sposobie działania, napięciu między siłami lub tym, co się dzieje, gdy ta emocja jest ignorowana).
      4. Integracja – najważniejsze pytanie (skup się na jednym małym, konkretnym kroku 'na teraz', który pozwoli temu przesłaniu zadziałać).

      Zwróć TYLKO tablicę 4 stringów w formacie JSON, gdzie każdy string zawiera nagłówek etapu i samo pytanie.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const text = response.text;
    if (text) {
      return { data: JSON.parse(text.trim()) };
    }
    return { data: null, error: "Model zwrócił pustą odpowiedź." };
  } catch (error: any) {
    console.error("Gemini Questions Error:", error);
    return { 
      data: null, 
      error: "Nie udało się pobrać pytań. Sprawdź połączenie lub klucz API."
    };
  }
};

export const generateImageForCard = async (card: EmotionCard): Promise<GenerationResult<string>> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [{ text: `High-quality watercolor masterpiece, ethereal and mystical style. Visual metaphor: ${card.description}. Soft textures, dreamlike lighting, psychological depth. NO TEXT.` }] 
      },
    });

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return { data: `data:image/png;base64,${part.inlineData.data}` };
        }
      }
    }
    return { data: null, error: "Model nie wygenerował obrazu." };
  } catch (error: any) {
    console.error("Gemini Image Error:", error);
    return { 
      data: null, 
      error: "Błąd generowania obrazu. Spróbuj ponownie za chwilę."
    };
  }
};

export const getFallbackQuestions = () => [
  "1. Pierwsze poruszenie: Co pojawia się w Tobie jako pierwsze, gdy widzisz tę kartę (obraz, słowo)?",
  "2. Związek z Twoim „teraz”: Jak ta emocja odnosi się do Twojej obecnej sytuacji życiowej lub relacji?",
  "3. Mechanizm pod spodem: Co ta karta mówi o Twoim sposobie działania i ewentualnym napięciu wewnątrz?",
  "4. Integracja – najważniejsze pytanie: Jaki jeden mały, konkretny krok możesz zrobić dzisiaj, by to przesłanie zadziałało?"
];
