import React, { useState, useEffect } from 'react';
import { MessageCircleQuestion, Brain, Send, User, Mail, Phone, Calendar, CheckCircle, Heart, PenTool, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

// --- KONFIGURACJA EMAIL ---
// Zarejestruj się na https://www.emailjs.com/
// Utwórz Service (np. Gmail) i Template
const EMAIL_CONFIG = {
  SERVICE_ID: 'service_bpst954',   
  TEMPLATE_ID: 'template_u5172bb', 
  PUBLIC_KEY: 'f9Vj1_DeGaLrqDCl0'    
};

interface QuestionListProps {
  questions: string[];
  isLoading: boolean;
  cardName?: string;
  onRegenerate?: () => void;
}

interface ContactForm {
  name: string;
  gender: string;
  age: string;
  email: string;
  phone: string;
}

export const QuestionList: React.FC<QuestionListProps> = ({ questions, isLoading, cardName }) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [contact, setContact] = useState<ContactForm>({
    name: '',
    gender: '',
    age: '',
    email: '',
    phone: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Reset form when card changes
  useEffect(() => {
    setAnswers({});
    setStatus('idle');
    setErrorMessage('');
  }, [cardName, questions]);

  if (!cardName && !isLoading) return null;

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const handleContactChange = (field: keyof ContactForm, value: string) => {
    setContact(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    // Mapowanie płci na język polski dla czytelności w mailu
    const genderMap: Record<string, string> = {
      'female': 'Kobieta',
      'male': 'Mężczyzna',
      'other': 'Inna',
      '': 'Nie podano'
    };

    // 1. Budowanie treści wiadomości (Dane + Odpowiedzi)
    // Dzięki temu, nawet jeśli w EmailJS masz tylko zmienną {{message}}, wszystkie dane tam będą.
    let fullMessageBody = "=== DANE UCZESTNIKA ===\n";
    fullMessageBody += `Imię: ${contact.name}\n`;
    fullMessageBody += `Wiek: ${contact.age}\n`;
    fullMessageBody += `Płeć: ${genderMap[contact.gender] || contact.gender}\n`;
    fullMessageBody += `Telefon: ${contact.phone || 'Nie podano'}\n`;
    fullMessageBody += `Email: ${contact.email}\n\n`;
    
    fullMessageBody += `=== PRACA Z KARTĄ: ${cardName} ===\n\n`;

    questions.forEach((q, idx) => {
      fullMessageBody += `PYTANIE ${idx + 1}: ${q}\n`;
      fullMessageBody += `ODPOWIEDŹ: ${answers[idx] || '--- brak odpowiedzi ---'}\n\n`;
    });

    // 2. Przygotowanie parametrów do EmailJS
    const templateParams = {
      name: contact.name,           // {{name}}
      email: contact.email,         // {{email}}
      message: fullMessageBody,     // {{message}} - teraz zawiera też dane osobowe
      card_name: cardName,          // {{card_name}}
      
      // Przesyłamy też osobno, na wypadek gdybyś chciał użyć {{phone}} w temacie maila itp.
      phone: contact.phone,
      age: contact.age,
      gender: contact.gender
    };

    try {
      await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAIL_CONFIG.PUBLIC_KEY
      );
      
      setStatus('sent');
    } catch (error: any) {
      console.error('Błąd wysyłania emaila:', error);
      setStatus('error');
      setErrorMessage(error.text || error.message || 'Wystąpił nieoczekiwany błąd podczas wysyłania.');
    }
  };

  if (status === 'sent') {
    return (
      <div className="max-w-2xl mx-auto w-full bg-[#fdfbf7] rounded-2xl shadow-xl border border-red-900/10 overflow-hidden mt-4 p-12 text-center animate-fade-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-700" />
        </div>
        <h3 className="font-serif text-2xl text-slate-800 font-bold mb-4">Dziękuję, {contact.name}!</h3>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Twoje odpowiedzi dotyczące karty <strong>"{cardName}"</strong> zostały bezpiecznie wysłane na wskazany adres e-mail.<br/>
          Holistyczny Mentor przeanalizuje je i skontaktuje się z Tobą wkrótce.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-red-700 font-medium hover:underline text-sm"
        >
          Wróć do pytań
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full bg-[#fdfbf7] rounded-2xl shadow-xl border border-stone-300 overflow-hidden mt-4">
      <div className="bg-stone-100/50 p-4 border-b border-stone-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <PenTool className="w-5 h-5 text-red-800" />
           <h3 className="font-serif text-slate-800 font-semibold">Twój Dziennik Pracy</h3>
        </div>
      </div>

      <div className="p-6 min-h-[200px]">
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-200 shrink-0"></div>
                <div className="h-4 bg-stone-200 rounded w-3/4 mt-2"></div>
            </div>
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-200 shrink-0"></div>
                <div className="h-4 bg-stone-200 rounded w-1/2 mt-2"></div>
            </div>
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-200 shrink-0"></div>
                <div className="h-4 bg-stone-200 rounded w-5/6 mt-2"></div>
            </div>
            <p className="text-center text-stone-400 text-sm mt-6">
              Przygotowuję przestrzeń do pracy z kartą...
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-8">
              {questions.map((q, idx) => (
                <div key={idx} className="group animate-fade-in">
                  <div className="flex gap-4 mb-3">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-red-50 text-red-800 border border-red-100 flex items-center justify-center font-serif font-bold text-sm group-hover:bg-red-100 transition-colors shadow-sm">
                        {idx + 1}
                    </div>
                    <p className="text-slate-800 leading-relaxed pt-1 font-medium font-serif">
                        {q}
                    </p>
                  </div>
                  <div className="pl-12">
                    <textarea 
                      value={answers[idx] || ''}
                      onChange={(e) => handleAnswerChange(idx, e.target.value)}
                      placeholder="Tutaj wpisz swoją odpowiedź..."
                      className="w-full min-h-[100px] p-4 rounded-lg border border-stone-300 bg-white focus:bg-white focus:ring-2 focus:ring-red-900/20 focus:border-red-800 outline-none text-sm transition-all resize-y placeholder:text-stone-400 text-slate-800 shadow-inner"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form Section */}
            <div className="border-t border-stone-200 pt-8 mt-8">
              <div className="bg-gradient-to-br from-stone-50 to-red-50/20 rounded-xl p-8 border border-stone-200">
                <div className="flex items-center gap-2 mb-6 text-red-900">
                   <Heart className="w-5 h-5 text-red-700 fill-red-700" />
                   <h3 className="font-serif font-bold text-lg">Wyślij do Holistycznego Mentora</h3>
                </div>
                
                <p className="text-sm text-stone-600 mb-8 leading-relaxed">
                  Podziel się swoimi wglądami. Wypełnij poniższy formularz, aby przesłać swoje odpowiedzi. Mentor zapozna się z nimi i wróci do Ciebie z informacją zwrotną.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" /> Twoje Imię
                      </label>
                      <input 
                        required
                        type="text" 
                        value={contact.name}
                        onChange={(e) => handleContactChange('name', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-red-700 focus:ring-2 focus:ring-red-900/10 outline-none transition-all bg-white text-slate-800 placeholder:text-stone-400"
                        placeholder="Wpisz imię"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Płeć</label>
                        <select 
                          required
                          value={contact.gender}
                          onChange={(e) => handleContactChange('gender', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-red-700 focus:ring-2 focus:ring-red-900/10 outline-none transition-all bg-white text-slate-800"
                        >
                          <option value="">Wybierz</option>
                          <option value="female">Kobieta</option>
                          <option value="male">Mężczyzna</option>
                          <option value="other">Inna</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                           <Calendar className="w-3.5 h-3.5" /> Wiek
                        </label>
                        <input 
                          required
                          type="number" 
                          min="1" max="120"
                          value={contact.age}
                          onChange={(e) => handleContactChange('age', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-red-700 focus:ring-2 focus:ring-red-900/10 outline-none transition-all bg-white text-slate-800"
                          placeholder="Lat"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" /> Email
                      </label>
                      <input 
                        required
                        type="email" 
                        value={contact.email}
                        onChange={(e) => handleContactChange('email', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-red-700 focus:ring-2 focus:ring-red-900/10 outline-none transition-all bg-white text-slate-800"
                        placeholder="twoj@email.pl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" /> Telefon
                      </label>
                      <input 
                        type="tel" 
                        value={contact.phone}
                        onChange={(e) => handleContactChange('phone', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-red-700 focus:ring-2 focus:ring-red-900/10 outline-none transition-all bg-white text-slate-800"
                        placeholder="(opcjonalnie)"
                      />
                    </div>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-start gap-3 bg-red-100 border border-red-200 p-4 rounded-lg text-red-800 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <div>
                            <p className="font-bold">Wystąpił błąd przy wysyłaniu:</p>
                            <p>{errorMessage}</p>
                            <p className="mt-2 text-xs opacity-75">Sprawdź czy wpisałeś poprawne klucze API w kodzie (SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY).</p>
                        </div>
                    </div>
                  )}

                  <div className="pt-6">
                    <button 
                      type="submit" 
                      disabled={status === 'sending'}
                      className="w-full bg-gradient-to-r from-red-800 to-red-900 text-white font-medium py-4 rounded-xl shadow-lg hover:shadow-red-900/30 hover:from-red-700 hover:to-red-800 transition-all transform hover:-translate-y-0.5 active:scale-[0.99] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-wait border border-red-700"
                    >
                      {status === 'sending' ? (
                        'Wysyłanie zgłoszenia...'
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span className="font-serif tracking-wide">Wyślij do Holistycznego Mentora</span>
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-stone-400 mt-4">
                        Twoje dane są bezpieczne i służą wyłącznie do kontaktu zwrotnego.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};