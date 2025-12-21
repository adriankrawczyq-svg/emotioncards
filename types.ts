export interface EmotionCard {
  id: string;
  name: string;
  description: string; // Used for AI context and Image generation
  question: string; // Specific question displayed on the card
  imageUrl: string;
  intensity?: 'Niska' | 'Średnia' | 'Wysoka';
}

export interface QuestionResponse {
  questions: string[];
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  cards: EmotionCard[];
  isCustom: boolean;
}

export interface Session {
  id: string;
  timestamp: number;
  deckName: string;
  card: EmotionCard;
  questions: string[];
  notes: string;
}