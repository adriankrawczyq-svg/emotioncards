
import { GoogleGenAI, Type } from "@google/genai";
import { EmotionCard } from "../types";

/**
 * Generates psychological questions for a given emotion card using Gemini 3 Flash.
 * Follows guidelines for text tasks and structured JSON response.
 */
export const generateQuestionsForCard = async (card: EmotionCard): Promise<string[]> => {
  // Initialize AI client right before use with the externally managed API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Jesteś doświadczonym terapeutą pracującym z kartami metaforycznymi. Twoim zadaniem jest wygenerowanie 4 głębokich, introspekcyjnych pytań do pracy z kartą o nazwie "${card.name}". 
      Opis wizualny karty (metafora): ${card.description}.
      Pytania muszą być podzielone na następujące obszary:
      1. Pierwsza, spontaniczna reakcja na obraz i słowo.
      2. Odniesienie do obecnej sytuacji życiowej lub relacji.
      3. Głębszy mechanizm działania lub ukryte potrzeby.
      4. Integracja i jeden konkretny "mały krok" na teraz.
      
      Zwracaj się do użytkownika ciepło, bezpośrednio i z empatią. Używaj języka inkluzywnego.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
            description: "Psychologiczne pytanie terapeutyczne."
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text.trim());
    }
  } catch (error) {
    console.error("Gemini Questions Generation Error:", error);
  }

  // Fallback to high-quality static questions if AI generation fails or is offline
  return [
    `Pierwsze poruszenie\n\nCo pojawia się w Tobie jako pierwsze, gdy widzisz tę kartę (obraz, słowo)? Jakie myśli, obrazy, emocje lub wspomnienia przychodzą spontanicznie – bez analizowania?`,
    `Związek z Twoim „teraz”\n\nJak to odnosi się do Twojej obecnej sytuacji życiowej? W jakim obszarze czujesz, że dotyka Cię najmocniej: decyzji, relacji, pracy, zdrowia, poczucia sensu?`,
    `Mechanizm pod spodem\n\nCo ta karta mówi o Twoim sposobie działania? Czy pokazuje dziś napięcie, kierunek czy potwierdzenie?`,
    `Integracja – najważniejsze pytanie\n\nCo te odpowiedzi mówią Ci o Tobie i o sytuacji, z którą tu przyszłaś/przyszedłeś? Jaki jeden mały, ale konkretny krok mógłbyś/mogłabyś podjąć w najbliższych dniach?`
  ];
};

/**
 * Generates an artistic metaphor image for an emotion card using gemini-2.5-flash-image.
 * Follows guidelines for image generation and result part iteration.
 */
export const generateImageForCard = async (card: EmotionCard): Promise<string> => {
  try {
    // API key is handled externally and injected into process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `A mystical fine-art watercolor and ink illustration representing the emotion '${card.name}'. 
    Visual metaphor: ${card.description}. 
    Style: dark atmospheric watercolor, ink bleeding, ethereal lighting, psychological depth. 
    NO TEXT. High artistic quality.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
    });

    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      // Find the image part in the response as per guidelines, do not assume it is the first part
      for (const part of candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    throw new Error("No image data returned from Gemini");
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    // Safe fallback image for robust user experience
    return `https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop`;
  }
};
