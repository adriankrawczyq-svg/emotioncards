import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, RotateCcw, Check } from 'lucide-react';
import { CARD_BACK_URL } from '../constants';

interface SettingsViewProps {
  currentCardBack: string;
  onUpdateCardBack: (url: string | null) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ currentCardBack, onUpdateCardBack }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Proszę wybrać plik obrazka (JPG, PNG).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
       setError('Plik jest za duży. Maksymalny rozmiar to 2MB.');
       return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onUpdateCardBack(result);
      setError(null);
    };
    reader.onerror = () => {
      setError('Błąd podczas odczytu pliku.');
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    onUpdateCardBack(null);
    setError(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const isDefault = currentCardBack === CARD_BACK_URL;

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="bg-[#fdfbf7] rounded-2xl shadow-xl border border-stone-800 p-8">
        <h3 className="font-serif text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-600" />
            Wygląd Karty (Rewers)
        </h3>
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Preview */}
            <div className="w-48 h-64 rounded-xl shadow-lg overflow-hidden border-2 border-amber-900/10 shrink-0 relative group">
                <img 
                    src={currentCardBack} 
                    alt="Current Back" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors pointer-events-none"></div>
            </div>

            {/* Controls */}
            <div className="flex-1 w-full space-y-6">
                <div className="space-y-2">
                    <p className="text-sm text-stone-600">
                        Możesz wgrać własny obrazek, który będzie widoczny na odwrocie wszystkich kart. Obrazek zostanie zapisany w Twojej przeglądarce.
                    </p>
                    <p className="text-xs text-stone-400">
                        Zalecany format: Pionowy (proporcje ok. 2:3). Max 2MB.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm border border-red-100">
                        {error}
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                    
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all font-medium shadow-md active:scale-95"
                    >
                        <Upload className="w-4 h-4" />
                        Wgraj własny rewers
                    </button>

                    {!isDefault && (
                        <button 
                            onClick={handleReset}
                            className="flex items-center justify-center gap-2 w-full py-3 bg-stone-100 text-stone-600 rounded-lg hover:bg-stone-200 transition-all font-medium border border-stone-200"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Przywróć domyślny
                        </button>
                    )}
                </div>

                {!isDefault && (
                    <div className="flex items-center gap-2 text-green-700 text-sm bg-green-50 p-3 rounded-lg border border-green-100">
                        <Check className="w-4 h-4" />
                        Twój własny obrazek jest aktywny.
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};