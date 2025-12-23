import React from 'react';
import { EmotionCard } from '../types';
import { ArrowRight, Eye } from 'lucide-react';

interface CardGalleryProps {
  cards: EmotionCard[];
  onSelectCard: (card: EmotionCard) => void;
}

export const CardGallery: React.FC<CardGalleryProps> = ({ cards, onSelectCard }) => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-serif font-bold text-stone-200">Pełna Talia Emocji</h2>
        <p className="text-stone-500">Przeglądaj wszystkie 55 kart, ich metafory i przypisane pytania.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div 
            key={card.id}
            onClick={() => onSelectCard(card)}
            className="group bg-[#1c2622] border border-[#2a3832] rounded-xl overflow-hidden hover:border-amber-700/50 hover:bg-[#232e2a] transition-all cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-serif text-xl font-bold text-amber-500 group-hover:text-amber-400 transition-colors">
                  {card.name}
                </h3>
                <span className="text-xs text-stone-600 font-mono border border-stone-700 px-2 py-0.5 rounded">
                  #{card.id}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Opis wizualny</p>
                <p className="text-sm text-stone-400 italic line-clamp-2 group-hover:text-stone-300">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800">
                <p className="text-xs font-bold text-red-900/70 uppercase tracking-wider mb-2 group-hover:text-red-800">Pytanie na karcie</p>
                <p className="text-sm text-stone-300 font-serif leading-relaxed">
                  "{card.question}"
                </p>
              </div>
            </div>
            
            <div className="bg-[#151d1a] p-3 flex justify-center items-center gap-2 text-xs font-medium text-stone-500 group-hover:text-amber-500 transition-colors border-t border-stone-800/50">
               <Eye className="w-3.5 h-3.5" />
               Przejdź do pracy z tą kartą
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};