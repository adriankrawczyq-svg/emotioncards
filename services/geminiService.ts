import { EmotionCard } from "../types";

// Note: We are no longer using the Gemini API for this specific feature as per the user's request 
// to use universal static questions. The import is kept if needed for future features, 
// but the function below is now synchronous and template-based.

export const generateQuestionsForCard = async (card: EmotionCard): Promise<string[]> => {
  // Simulate a very short delay for UX consistency (optional)
  await new Promise(resolve => setTimeout(resolve, 300));

  // Universal therapeutic questions for metaphor cards
  // Updated to 4 specific questions as requested.
  const questions = [
    `Pierwsze poruszenie\n\nCo pojawia się w Tobie jako pierwsze, gdy widzisz tę kartę (obraz, słowo)? Jakie myśli, obrazy, emocje lub wspomnienia przychodzą spontanicznie – bez analizowania?\nTu nie chodzi o „ładną odpowiedź”, tylko o prawdziwą reakcję.`,
    
    `Związek z Twoim „teraz”\n\nJak to odnosi się do Twojej obecnej sytuacji życiowej? W jakim obszarze czujesz, że dotyka Cię najmocniej: decyzji, relacji, pracy, zdrowia, poczucia sensu?\nCzy to słowo / obraz miało dla Ciebie kiedyś inne znaczenie niż teraz? Jeśli tak – co się zmieniło?`,
    
    `Co ta karta mówi o Twoim sposobie działania?\n\nCzy pokazuje dziś napięcie, kierunek czy potwierdzenie?\nCo się dzieje, gdy to ignorujesz – a co mogłoby się zmienić, gdybyś był/a na to uważny/a?`,
    
    `Integracja – najważniejsze pytanie\n\nCo te odpowiedzi mówią Ci o Tobie i o sytuacji, z którą tu przyszłaś/przyszedłeś? Jaki jeden mały, ale konkretny krok mógłbyś/mogłabyś podjąć w najbliższych dniach lub tygodniach, żeby to przesłanie zaczęło realnie działać w Twoim życiu?\nNie „na zawsze”. Na teraz.`
  ];

  return questions;
};