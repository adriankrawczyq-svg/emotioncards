import { GoogleGenAI } from "@google/genai";
import { EmotionCard } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuestionsForCard = async (card: EmotionCard): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const questions = [
    `Pierwsze poruszenie\n\nCo pojawia się w Tobie jako pierwsze, gdy widzisz tę kartę (obraz, słowo)? Jakie myśli, obrazy, emocje lub wspomnienia przychodzą spontanicznie – bez analizowania?\nTu nie chodzi o „ładną odpowiedź”, tylko o prawdziwą reakcję.`,
    
    `Związek z Twoim „teraz”\n\nJak to odnosi się do Twojej obecnej sytuacji życiowej? W jakim obszarze czujesz, że dotyka Cię najmocniej: decyzji, relacji, pracy, zdrowia, poczucia sensu?\nCzy to słowo / obraz miało dla Ciebie kiedyś inne znaczenie niż teraz? Jeśli tak – co się zmieniło?`,
    
    `Mechanizm pod spodem\n\nCo ta karta mówi o Twoim sposobie działania?\nCzy pokazuje dziś napięcie, kierunek czy potwierdzenie?\nCo się dzieje, gdy to ignorujesz –\na co mogłoby się zmienić, gdybyś był/a na to uważny/a?`,
    
    `Integracja – najważniejsze pytanie\n\nCo te odpowiedzi mówią Ci o Tobie i o sytuacji, z którą tu przyszłaś/przyszedłeś? Jaki jeden mały, ale konkretny krok mógłbyś/mogłabyś podjąć w najbliższych dniach lub tygodniach, żeby to przesłanie zaczęło realnie działać w Twoim życiu?\nNie „na zawsze”. Na teraz.`
  ];

  return questions;
};

export const generateImageForCard = async (card: EmotionCard): Promise<string> => {
  try {
    // Proven prompt for high-quality metaphorical art (watercolor and ink)
    const prompt = `A mystical fine-art watercolor and ink illustration representing the emotion '${card.name}'. 
    Visual metaphor: ${card.description}. 
    Style: dark atmospheric watercolor, ink bleeding, ethereal lighting, psychological depth. 
    NO TEXT.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned");
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    return `https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop`;
  }
};