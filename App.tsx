import React, { useState, useCallback, useEffect, useRef } from 'react';
import { PREDEFINED_DECKS, CARD_BACK_URL } from './constants';
import { EmotionCard } from './types';
import { generateQuestionsForCard, generateImageForCard } from './services/geminiService';
import { CardDisplay } from './components/CardDisplay';
import { QuestionList } from './components/QuestionList';
import { Feather, Sparkles, RotateCcw, ArrowRight, Volume2, VolumeX } from 'lucide-react';

const BACKGROUND_MUSIC_URL = "https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3";

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentCard, setCurrentCard] = useState<EmotionCard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [cardBackUrl, setCardBackUrl] = useState<string>(CARD_BACK_URL);

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleMute = () => {
    if (audioRef.current) {
        if (isMuted) {
            audioRef.current.play().catch(e => console.error("Play failed", e));
            setIsMuted(false);
        } else {
            audioRef.current.pause();
            setIsMuted(true);
        }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
        setIsMuted(false);
        audioRef.current?.play().catch(e => console.error("Play failed", e));
    }
  };

  const handleStart = () => {
    if (audioRef.current) {
        audioRef.current.volume = volume;
        if (!isMuted) {
            audioRef.current.play().catch(error => console.log("Audio autoplay prevented", error));
        }
    }
    setHasStarted(true);
    window.scrollTo(0, 0);
  };

  const handleResetToWelcome = () => {
    // Scroll to top first to prevent "empty view" feeling on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Full state reset
    setHasStarted(false);
    setCurrentCard(null);
    setIsFlipped(false);
    setIsDrawing(false);
    setIsGeneratingImage(false);
    setQuestions([]);
    setIsLoadingQuestions(false);
  };

  const handleDrawCard = useCallback(async () => {
    if (isDrawing || isLoadingQuestions || isGeneratingImage) return;

    const previousCardId = currentCard?.id;
    setIsDrawing(true);
    
    if (isFlipped) {
        setIsFlipped(false);
        await new Promise(r => setTimeout(r, 600)); 
    }
    
    setCurrentCard(null);
    setQuestions([]);

    const currentDeck = PREDEFINED_DECKS[0];
    let randomIndex = Math.floor(Math.random() * currentDeck.cards.length);
    let selectedCard = { ...currentDeck.cards[randomIndex] };

    if (previousCardId && currentDeck.cards.length > 1) {
      let attempts = 0;
      while (selectedCard.id === previousCardId && attempts < 5) {
          randomIndex = Math.floor(Math.random() * currentDeck.cards.length);
          selectedCard = { ...currentDeck.cards[randomIndex] };
          attempts++;
      }
    }
    
    setCurrentCard(selectedCard);
    setIsFlipped(true);
    setIsDrawing(false);
    setIsGeneratingImage(true);

    try {
      const [imageUrl, generatedQuestions] = await Promise.all([
        generateImageForCard(selectedCard),
        generateQuestionsForCard(selectedCard)
      ]);
      
      setCurrentCard(prev => prev ? { ...prev, imageUrl } : null);
      setQuestions(generatedQuestions);
    } catch (error) {
      console.error("Card drawing failed", error);
    } finally {
      setIsGeneratingImage(false);
    }
  }, [isDrawing, isFlipped, isLoadingQuestions, isGeneratingImage, currentCard]);

  return (
    <div className="min-h-screen bg-texture">
      <audio ref={audioRef} src={BACKGROUND_MUSIC_URL} loop preload="auto" />

      {!hasStarted ? (
        <div className="min-h-screen text-stone-200 font-sans flex items-center justify-center p-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-red-900/10 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

           <div className="max-w-2xl w-full text-center space-y-12 relative z-10 animate-fade-in">
              <div className="inline-block p-5 bg-[#2a3832] rounded-full shadow-2xl border border-[#3a4a42]">
                  <Feather className="w-12 h-12 text-amber-500/80" />
              </div>
              
              <div className="space-y-6">
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-stone-100 leading-tight">
                  Witaj w Punkcie Przejścia.
                </h1>
                <p className="text-xl text-stone-300 font-serif">
                  To jest krótka chwila tylko dla Ciebie.
                </p>
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-red-800 to-transparent mx-auto opacity-50"></div>
                
                <div className="space-y-4 text-stone-400 text-lg leading-relaxed font-light font-serif max-w-xl mx-auto">
                  <p>Zatrzymaj się na moment. Znajdź spokojne miejsce, weź kilka głębokich oddechów i pozwól sobie na szczerość wobec siebie – bez oceniania, bez poprawiania czegokolwiek.</p>
                  <p>To ćwiczenie nie jest po to, żeby „coś naprawić”. Jest po to, żeby zobaczyć, co jest teraz w Tobie żywe i co próbuje zostać nazwane.</p>
                </div>
              </div>

              <button 
                onClick={handleStart}
                className="group bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-stone-100 px-10 py-4 rounded-full font-medium text-lg transition-all shadow-xl hover:shadow-red-900/40 border border-red-700/50 flex items-center gap-3 mx-auto transform hover:-translate-y-1 active:scale-95"
              >
                <span>Zaczynam</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      ) : (
        <div className="min-h-screen text-stone-200 font-sans selection:bg-red-900 selection:text-white flex flex-col">
          <header className="bg-[#0f1513] border-b border-[#2a3832] sticky top-0 z-50 shadow-md">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3 cursor-pointer group" onClick={handleResetToWelcome}>
                <div className="bg-gradient-to-br from-red-900 to-red-700 p-2 rounded-lg text-white shadow-lg shadow-red-900/20 ring-1 ring-red-800/50 group-hover:scale-105 transition-transform">
                    <Feather className="w-6 h-6" />
                </div>
                <h1 className="font-serif text-xl font-bold text-stone-200 tracking-tight leading-none group-hover:text-white transition-colors">Punkt Przejścia</h1>
              </div>

              <div className="flex items-center gap-3 bg-[#1c2622] pl-3 pr-2 py-1 rounded-full border border-[#2a3832]">
                <input type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume} onChange={handleVolumeChange} className="w-20 md:w-32 h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-600 focus:outline-none" />
                <button onClick={toggleMute} className="w-8 h-8 flex items-center justify-center rounded-full text-stone-400 hover:text-amber-500 hover:bg-[#2a3832] transition-all">
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </header>

          <main className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
            <div className="animate-fade-in flex flex-col gap-12">
                <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
                    <div className="w-full lg:w-1/3 flex flex-col items-center relative lg:sticky lg:top-24 z-10">
                        <CardDisplay 
                            card={currentCard} 
                            isFlipped={isFlipped} 
                            onDraw={handleDrawCard}
                            disabled={isDrawing || isGeneratingImage}
                            backImageUrl={cardBackUrl}
                            isGeneratingImage={isGeneratingImage}
                        />
                        
                        {currentCard && isFlipped && (
                        <div className="w-full bg-[#fdfbf7] p-6 rounded-xl shadow-lg shadow-black/20 border border-stone-200 text-center animate-fade-in relative mt-6">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900 opacity-80 rounded-t-xl"></div>
                            <p className="text-slate-800 font-serif text-lg italic leading-relaxed">
                                "{currentCard.question}"
                            </p>
                        </div>
                        )}
                    </div>

                    <div className="w-full lg:w-2/3 space-y-6">
                        {!currentCard && !isDrawing && (
                            <div className="flex flex-col items-center justify-center h-full min-h-[300px] border-2 border-dashed border-[#2a3832] rounded-2xl text-stone-600 p-8 text-center bg-[#1c2622]/50 w-full">
                                <Sparkles className="w-12 h-12 mb-4 opacity-50 text-amber-500" />
                                <h3 className="font-serif text-xl text-stone-300 mb-2">Gotowy do wglądu?</h3>
                                <p className="font-serif text-stone-500 max-w-sm">Kliknij w kartę lub przycisk poniżej, aby wylosować emocję na ten moment.</p>
                            </div>
                        )}

                        {(currentCard || isGeneratingImage) && (
                            <div className="animate-fade-in-up space-y-6">
                                <div className="bg-gradient-to-r from-red-950 to-[#2e0f0f] text-white rounded-2xl p-6 shadow-xl border border-red-900/30 relative overflow-hidden">
                                    <h2 className="font-serif text-2xl mb-2 text-red-50">Analiza Karty</h2>
                                    <p className="text-red-200/80 text-sm">
                                        Emocja: <strong className="text-white">{currentCard?.name || '...'}</strong>. 
                                    </p>
                                </div>
                                
                                <QuestionList 
                                    questions={questions} 
                                    isLoading={isGeneratingImage} 
                                    cardName={currentCard?.name}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="sticky bottom-4 z-40 flex justify-center pb-4 pt-2 pointer-events-none">
                    <div className="pointer-events-auto shadow-2xl shadow-black/50 rounded-full">
                        {!isDrawing && !isGeneratingImage ? (
                            <button 
                                onClick={handleDrawCard}
                                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white px-10 py-4 rounded-full font-medium transition-all shadow-xl flex items-center gap-3 transform hover:-translate-y-1 active:scale-95 border-2 border-amber-400/30"
                            >
                                {isFlipped ? (
                                    <>
                                        <RotateCcw className="w-5 h-5" />
                                        <span className="text-lg font-serif">Wylosuj kolejną kartę</span>
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5 text-amber-200" />
                                        <span className="text-lg font-serif">Wylosuj kartę</span>
                                    </>
                                )}
                            </button>
                        ) : (
                            <button disabled className="bg-[#2a3832] text-stone-400 px-10 py-4 rounded-full font-medium shadow-lg flex items-center gap-3 cursor-wait border border-stone-600">
                            <Sparkles className="w-5 h-5 animate-spin" />
                            <span className="text-lg font-serif">Tasowanie kart...</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default App;