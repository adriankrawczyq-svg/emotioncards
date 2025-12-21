import React from 'react';
import { EmotionCard } from '../types';
import { Sparkles } from 'lucide-react';
import { CARD_BACK_URL } from '../constants';

interface CardDisplayProps {
  card: EmotionCard | null;
  isFlipped: boolean;
  onDraw: () => void;
  disabled: boolean;
  backImageUrl?: string;
}

export const CardDisplay: React.FC<CardDisplayProps> = ({ card, isFlipped, onDraw, disabled, backImageUrl }) => {
  // Use passed backImageUrl or fallback to default constant
  const backImage = backImageUrl || CARD_BACK_URL;

  return (
    <div className="flex flex-col items-center justify-center my-4 perspective-1000">
      <div
        className={`relative w-72 h-96 transition-all duration-700 transform-style-3d ${
          isFlipped 
            ? 'rotate-y-180 cursor-default' 
            : 'cursor-pointer hover:scale-105 hover:rotate-1'
        }`}
        onClick={!isFlipped && !disabled ? onDraw : undefined}
      >
        {/* Card Back (Deck) */}
        <div 
            className="absolute inset-0 w-full h-full rounded-xl shadow-2xl shadow-black/60 backface-hidden overflow-hidden bg-[#1a2321] border border-[#2a3832]"
            style={{ transform: 'rotateY(0deg) translateZ(1px)' }}
        >
           <img 
             src={backImage} 
             alt="Rewers karty" 
             className="w-full h-full object-cover"
           />
           {/* Subtle overlay to indicate interactivity without obscuring the art too much */}
           <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center group">
               <div className="bg-black/60 backdrop-blur-md text-amber-100 px-5 py-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-95 group-hover:scale-100 border border-amber-500/30">
                  <span className="text-xs font-serif font-bold uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Wylosuj
                  </span>
               </div>
           </div>
        </div>

        {/* Card Front (Revealed) */}
        <div 
            className="absolute inset-0 w-full h-full bg-stone-100 rounded-xl shadow-2xl shadow-black/40 backface-hidden overflow-hidden border-2 border-[#e7e5e4]"
            style={{ transform: 'rotateY(180deg) translateZ(1px)' }}
        >
          {card && (
            <>
              {/* Image Area - Now Full Height */}
              <div className="h-full w-full relative">
                <img 
                  src={card.imageUrl} 
                  alt={card.name} 
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 pointer-events-none"></div>
                
                {/* Emotion Name Overlay */}
                <div className="absolute bottom-6 left-0 right-0 text-center px-4 pointer-events-none">
                    <p className="text-[10px] uppercase tracking-widest text-amber-200/80 mb-1 font-medium drop-shadow-md">Emocja</p>
                    <h2 className="text-3xl font-serif font-bold text-white tracking-wide drop-shadow-lg">{card.name}</h2>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};