import React, { useState } from 'react';
import { Deck, EmotionCard } from '../types';
import { Plus, Layers, Trash2, Check, X } from 'lucide-react';

interface DeckManagerProps {
  decks: Deck[];
  currentDeckId: string;
  onSelectDeck: (deckId: string) => void;
  onCreateDeck: (deck: Deck) => void;
  onDeleteDeck: (deckId: string) => void;
}

export const DeckManager: React.FC<DeckManagerProps> = ({ 
  decks, 
  currentDeckId, 
  onSelectDeck, 
  onCreateDeck,
  onDeleteDeck 
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newDeckName, setNewDeckName] = useState('');
  const [newDeckDesc, setNewDeckDesc] = useState('');
  const [newCards, setNewCards] = useState<Partial<EmotionCard>[]>([
    { id: 'new-1' }
  ]);

  const handleAddCardRow = () => {
    setNewCards([...newCards, { id: `new-${Date.now()}` }]);
  };

  const handleCardChange = (index: number, field: keyof EmotionCard, value: string) => {
    const updated = [...newCards];
    updated[index] = { ...updated[index], [field]: value };
    setNewCards(updated);
  };

  const handleRemoveCardRow = (index: number) => {
    const updated = newCards.filter((_, i) => i !== index);
    setNewCards(updated);
  };

  const handleSaveDeck = () => {
    if (!newDeckName.trim() || newCards.length === 0) return;

    const validCards: EmotionCard[] = newCards
      .filter(c => c.name && c.description && c.question)
      .map((c, idx) => {
        // Updated prompt to match the new emotional watercolor aesthetic
        const prompt = `A deeply emotional and metaphorical watercolor painting representing '${c.name}'. Visual context: ${c.description}. Ethereal style, soft bleeding colors, expressive brushstrokes, dreamlike atmosphere, psychological depth, masterpiece, artistic, wet-on-wet technique, high quality art.`;
        
        const descriptionEncoded = encodeURIComponent(prompt);
        // Generate a static seed so the image remains constant for this card instance
        const seed = Math.floor(Math.random() * 1000000);
        return {
          id: `custom-${Date.now()}-${idx}`,
          name: c.name!,
          description: c.description!,
          question: c.question!,
          imageUrl: `https://image.pollinations.ai/prompt/${descriptionEncoded}?width=400&height=600&nologo=true&seed=${seed}&model=flux` 
        };
      });

    if (validCards.length === 0) {
        alert("Wypełnij wszystkie pola dla przynajmniej jednej karty (Nazwa, Opis symbolu, Pytanie).");
        return;
    }

    const newDeck: Deck = {
      id: `deck-custom-${Date.now()}`,
      name: newDeckName,
      description: newDeckDesc || 'Talia użytkownika',
      cards: validCards,
      isCustom: true,
    };

    onCreateDeck(newDeck);
    setIsCreating(false);
    setNewDeckName('');
    setNewDeckDesc('');
    setNewCards([{ id: 'new-1' }]);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {!isCreating ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Deck Cards */}
          {decks.map((deck) => (
            <div 
              key={deck.id}
              onClick={() => onSelectDeck(deck.id)}
              className={`relative cursor-pointer group p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
                currentDeckId === deck.id 
                  ? 'border-amber-600 bg-amber-900/20 ring-1 ring-amber-500/50' 
                  : 'border-[#2a3832] bg-[#1c2622] hover:border-amber-700/50 hover:bg-[#232e2a]'
              }`}
            >
               <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${currentDeckId === deck.id ? 'bg-amber-700 text-white' : 'bg-[#2a3832] text-stone-400 group-hover:bg-amber-900/50 group-hover:text-amber-500'}`}>
                     <Layers className="w-6 h-6" />
                  </div>
                  {deck.isCustom && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onDeleteDeck(deck.id); }}
                      className="text-stone-500 hover:text-red-500 transition-colors p-1"
                      title="Usuń talię"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
               </div>
               <h3 className={`text-lg font-serif font-bold mb-1 ${currentDeckId === deck.id ? 'text-amber-500' : 'text-stone-300'}`}>{deck.name}</h3>
               <p className="text-sm text-stone-500 mb-4 min-h-[40px] line-clamp-2">{deck.description}</p>
               <div className="flex items-center justify-between text-xs text-stone-600 font-medium">
                  <span>{deck.cards.length} kart</span>
                  {currentDeckId === deck.id && (
                      <span className="text-amber-500 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Wybrana
                      </span>
                  )}
               </div>
            </div>
          ))}

          {/* Add New Deck Button */}
          <button 
            onClick={() => setIsCreating(true)}
            className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-[#2a3832] text-stone-500 hover:border-amber-700/50 hover:text-amber-600 hover:bg-amber-900/10 transition-all duration-300 min-h-[200px]"
          >
             <Plus className="w-8 h-8 mb-2" />
             <span className="font-medium">Stwórz własną talię</span>
          </button>
        </div>
      ) : (
        /* Creation Form */
        <div className="bg-[#fdfbf7] rounded-2xl p-8 shadow-2xl border border-stone-800 max-w-3xl mx-auto">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-stone-800">Nowa Talia</h2>
              <button onClick={() => setIsCreating(false)} className="text-stone-400 hover:text-red-600">
                 <X className="w-6 h-6" />
              </button>
           </div>

           <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Nazwa talii</label>
                    <input 
                      type="text" 
                      value={newDeckName}
                      onChange={(e) => setNewDeckName(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-600 outline-none transition-all text-slate-800"
                      placeholder="np. Moje Emocje"
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Opis</label>
                    <input 
                      type="text" 
                      value={newDeckDesc}
                      onChange={(e) => setNewDeckDesc(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-600 outline-none transition-all text-slate-800"
                      placeholder="Krótki opis przeznaczenia"
                    />
                 </div>
              </div>

              <div>
                 <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-stone-700">Karty ({newCards.length})</label>
                    <button onClick={handleAddCardRow} className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded hover:bg-amber-100 transition-colors">
                       + Dodaj kartę
                    </button>
                 </div>
                 <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {newCards.map((card, idx) => (
                       <div key={idx} className="flex flex-col gap-2 bg-stone-50 p-4 rounded-lg group border border-stone-200">
                          <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-stone-400 uppercase">Karta #{idx + 1}</span>
                              <button 
                                 onClick={() => handleRemoveCardRow(idx)}
                                 className="text-stone-300 hover:text-red-500 p-1"
                                 disabled={newCards.length === 1}
                              >
                                 <Trash2 className="w-4 h-4" />
                              </button>
                          </div>
                          
                          <input 
                             type="text" 
                             placeholder="Nazwa emocji"
                             value={card.name || ''}
                             onChange={(e) => handleCardChange(idx, 'name', e.target.value)}
                             className="w-full px-3 py-2 text-sm rounded border border-stone-300 focus:border-amber-500 outline-none text-slate-800"
                          />
                          <input 
                             type="text" 
                             placeholder="Opis symbolu (np. wzburzone morze)"
                             value={card.description || ''}
                             onChange={(e) => handleCardChange(idx, 'description', e.target.value)}
                             className="w-full px-3 py-2 text-sm rounded border border-stone-300 focus:border-amber-500 outline-none text-slate-800"
                          />
                          <input 
                             type="text" 
                             placeholder="Pytanie na karcie (np. Co czujesz gdy...)"
                             value={card.question || ''}
                             onChange={(e) => handleCardChange(idx, 'question', e.target.value)}
                             className="w-full px-3 py-2 text-sm rounded border border-stone-300 focus:border-amber-500 outline-none bg-amber-50/50 text-slate-800"
                          />
                       </div>
                    ))}
                 </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                 <button 
                    onClick={() => setIsCreating(false)}
                    className="px-6 py-2 text-stone-600 font-medium hover:bg-stone-100 rounded-lg transition-colors"
                 >
                    Anuluj
                 </button>
                 <button 
                    onClick={handleSaveDeck}
                    className="px-6 py-2 bg-red-800 text-white font-medium rounded-lg shadow hover:bg-red-700 transition-all transform hover:scale-105 border border-red-900"
                 >
                    Zapisz talię
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};