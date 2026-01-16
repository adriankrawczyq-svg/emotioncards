import React from 'react';
import { EmotionCard } from '../types';
import { Sparkles, Feather } from 'lucide-react';

interface CardDisplayProps {
  card: EmotionCard | null;
  isFlipped: boolean;
  onDraw: () => void;
  disabled: boolean;
  backImageUrl?: string;
  isGeneratingImage?: boolean;
}

export const CardDisplay: React.FC<CardDisplayProps> = ({ 
  card, 
  isFlipped, 
  onDraw, 
  disabled, 
  isGeneratingImage 
}) => {
  return (
    <div className="flex flex-col items-center justify-center my-4 perspective-1000">
      <div
        className={`relative w-72 h-96 transition-all duration-700 transform-style-3d shadow-2xl rounded-xl ${
          isFlipped ? 'rotate-y-180' : 'cursor-pointer hover:scale-[1.02]'
        }`}
        onClick={!isFlipped && !disabled ? onDraw : undefined}
      >
        {/* REWERS (Card Back) - Butelkowa zieleń z logo piórka i złotą ramką */}
        <div 
            className="absolute inset-0 w-full h-full rounded-xl backface-hidden overflow-hidden bg-[#0a1812] border-[3px] border-[#1e2e24]"
            style={{ backfaceVisibility: 'hidden', zIndex: isFlipped ? 1 : 2 }}
        >
           {/* Gładki gradient dla głębi koloru (bez kropek) */}
           <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5 pointer-events-none"></div>
           
           {/* Złota ozdobna ramka */}
           <div className="absolute inset-3 border border-amber-500/20 rounded-lg pointer-events-none"></div>
           <div className="absolute inset-4 border border-amber-500/10 rounded-lg pointer-events-none"></div>
           
           {/* Logo - Czerwone piórko w ciemnym kole */}
           <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
               <div className="w-16 h-16 bg-[#151d1a] border border-red-900/50 rounded-full flex items-center justify-center shadow-inner">
                  <Feather className="w-8 h-8 text-red-800 drop-shadow-[0_0_8px_rgba(153,27,27,0.4)]" />
               </div>
               <div className="space-y-1 text-center">
                  <p className="text-[9px] font-serif font-bold uppercase tracking-[0.4em] text-amber-500/60">Punkt Przejścia</p>
                  <p className="text-[7px] font-serif uppercase tracking-[0.2em] text-stone-600">Karta prawdy na teraz</p>
               </div>
           </div>

           {/* Przycisk wylosuj po najechaniu */}
           <div className="absolute inset-0 flex items-center justify-center group">
               <div className="bg-black/80 backdrop-blur-md text-white px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 border border-white/10 shadow-2xl">
                  <span className="text-[10px] font-serif font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Wylosuj kartę
                  </span>
               </div>
           </div>
        </div>

        {/* AWERS (Card Front) */}
        <div 
            className="absolute inset-0 w-full h-full bg-[#050807] rounded-xl backface-hidden overflow-hidden border-2 border-green-900/40"
            style={{ 
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
              zIndex: isFlipped ? 2 : 1
            }}
        >
          {card && (
            <div className="h-full w-full relative">
              {(isGeneratingImage || !card.imageUrl) ? (
                <div className="absolute inset-0 bg-[#080c0a] flex flex-col items-center justify-center p-8 text-center gap-6">
                  <div className="absolute inset-0 bg-gradient-to-b from-green-950/40 via-black to-black"></div>
                  <div className="relative z-10 flex flex-col items-center gap-5">
                    <div className="w-12 h-12 rounded-full border-2 border-red-700 border-t-transparent animate-spin"></div>
                    <div className="space-y-1">
                        <p className="font-serif text-lg text-stone-200 tracking-widest uppercase">Przejście...</p>
                        <p className="text-[9px] text-stone-500 tracking-[0.2em] uppercase">Malarstwo Wewnętrzne</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <img 
                    src={card.imageUrl} 
                    alt={card.name} 
                    className="w-full h-full object-cover animate-fade-in duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90"></div>
                  
                  <div className="absolute bottom-8 left-0 right-0 text-center px-6 pointer-events-none">
                      <p className="text-[9px] uppercase tracking-[0.4em] text-stone-500 mb-2 font-bold">Punkt Przejścia</p>
                      <h2 className="text-3xl font-serif font-bold text-white tracking-widest uppercase drop-shadow-lg">{card.name}</h2>
                      <div className="w-8 h-0.5 bg-red-700/60 mx-auto mt-4"></div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};