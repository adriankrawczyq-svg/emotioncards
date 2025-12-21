import { EmotionCard } from "../types";

// Note: We are no longer using the Gemini API for this specific feature as per the user's request 
// to use universal static questions. The import is kept if needed for future features, 
// but the function below is now synchronous and template-based.

export const generateQuestionsForCard = async (card: EmotionCard): Promise<string[]> => {
  // Simulate a very short delay for UX consistency (optional)
  await new Promise(resolve => setTimeout(resolve, 300));

  // Universal therapeutic questions for metaphor cards
  // Model: Observation -> Emotion -> Reflection -> Insight
  const questions = [
    `Co widzisz na obrazku? Opisz to, co dostrzegasz na pierwszym planie i w tle, bez interpretowania. Jakie kolory i kształty przyciągają Twoją uwagę?`,
    `Co czujesz patrząc na tę kartę? Jakie emocje pojawiają się w Twoim ciele? Czy obraz budzi w Tobie spokój, napięcie, czy może coś innego?`,
    `W jaki sposób ten obraz odnosi się do Twojej obecnej sytuacji życiowej? Czy dostrzegasz tu jakąś metaforę tego, co dzieje się teraz u Ciebie?`,
    `Jaka jest dla Ciebie wskazówka płynąca z tej karty? Jaki jeden mały krok możesz wykonać, aby zadbać o siebie w tym obszarze?`
  ];

  return questions;
};