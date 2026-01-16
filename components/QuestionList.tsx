
import React, { useState, useEffect } from 'react';
import { CheckCircle, Heart, PenTool, AlertCircle, Send, User, Mail, Phone, Calendar } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAIL_CONFIG = {
  SERVICE_ID: 'service_bpst954',   
  TEMPLATE_ID: 'template_u5172bb', 
  PUBLIC_KEY: 'f9Vj1_DeGaLrqDCl0'    
};

interface QuestionListProps {
  questions: string[];
  isLoading: boolean;
  cardName?: string;
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

  useEffect(() => {
    setAnswers({});
    setStatus('idle');
  }, [cardName]);

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

    let fullMessageBody = `=== PRACA Z KARTĄ: ${cardName} ===\n\n`;
    questions.forEach((q, idx) => {
      fullMessageBody += `PYTANIE ${idx + 1}: ${q}\n`;
      fullMessageBody += `ODPOWIEDŹ: ${answers[idx] || '--- brak odpowiedzi ---'}\n\n`;
    });

    const templateParams = {
      name: contact.name,           
      email: contact.email,         
      message: fullMessageBody,     
      card_name: cardName,          
      phone: contact.phone,
      age: contact.age,
      gender: contact.gender
    };

    try {
      await emailjs.send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATE_ID, templateParams, EMAIL_CONFIG.PUBLIC_KEY);
      setStatus('sent');
    } catch (error: any) {
      console.error('Błąd EmailJS:', error);
      setStatus('error');
      setErrorMessage('Nie udało się wysłać odpowiedzi. Spróbuj później.');
    }
  };

  if (status === 'sent') {
    return (
      <div className="max-w-2xl mx-auto w-full bg-[#fdfbf7] rounded-2xl shadow-xl border border-red-900/10 p-12 text-center animate-fade-in mt-4">
        <CheckCircle className="w-16 h-16 text-green-700 mx-auto mb-6" />
        <h3 className="font-serif text-2xl text-slate-800 font-bold mb-4">Dziękuję, {contact.name}!</h3>
        <p className="text-slate-600 mb-6 leading-relaxed">Twoje odpowiedzi zostały wysłane. Odezwę się z krótkim feedbackiem wkrótce.</p>
        <button onClick={() => setStatus('idle')} className="text-red-700 font-medium hover:underline text-sm">Zacznij od nowa</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full bg-[#fdfbf7] rounded-2xl shadow-xl border border-stone-300 overflow-hidden mt-4">
      <div className="bg-stone-100/50 p-4 border-b border-stone-200 flex items-center gap-2">
           <PenTool className="w-5 h-5 text-red-800" />
           <h3 className="font-serif text-slate-800 font-semibold">Twój Dziennik Pracy</h3>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-stone-200 rounded w-3/4"></div>
            <div className="h-32 bg-stone-100 rounded w-full"></div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-10">
              {questions.map((q, idx) => (
                <div key={idx} className="animate-fade-in">
                  <p className="text-slate-800 leading-relaxed mb-3 font-serif font-bold text-lg border-l-4 border-red-800/20 pl-4">
                      {q}
                  </p>
                  <textarea 
                    value={answers[idx] || ''}
                    onChange={(e) => handleAnswerChange(idx, e.target.value)}
                    placeholder="Tu nie chodzi o „ładną odpowiedź”, tylko o prawdziwą reakcję..."
                    className="w-full min-h-[120px] p-4 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-red-900/20 focus:border-red-800 outline-none text-slate-800 shadow-inner"
                  />
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 pt-8 mt-8">
              <div className="bg-gradient-to-br from-stone-50 to-red-50/20 rounded-xl p-8 border border-stone-200">
                <div className="flex items-center gap-2 mb-6 text-red-900">
                   <Heart className="w-5 h-5 text-red-700 fill-red-700" />
                   <h3 className="font-serif font-bold text-lg">ZAPROSZENIE DO KONTAKTU</h3>
                </div>
                
                <p className="text-sm text-stone-600 mb-8 leading-relaxed italic">
                  Jeśli po odpowiedziach poczujesz, że to, co się pojawiło, jest dla Ciebie ważne i chcesz spojrzeć na to z zewnątrz, możesz zostawić swoje dane i przesłać mi refleksje. Odezwę się z krótkim feedbackiem – i wtedy zobaczymy, czy to moment, w którym mogę Cię realnie wesprzeć.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-500 uppercase flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Twoje Imię</label>
                      <input required type="text" value={contact.name} onChange={(e) => handleContactChange('name', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-red-700 outline-none text-slate-800" />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-500 uppercase">Płeć</label>
                        <select required value={contact.gender} onChange={(e) => handleContactChange('gender', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-stone-300 text-slate-800">
                          <option value="">Wybierz</option>
                          <option value="Kobieta">Kobieta</option>
                          <option value="Mężczyzna">Mężczyzna</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-500 uppercase flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Wiek</label>
                        <input required type="number" value={contact.age} onChange={(e) => handleContactChange('age', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-stone-300 text-slate-800" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-500 uppercase flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email</label>
                      <input required type="email" value={contact.email} onChange={(e) => handleContactChange('email', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-stone-300 text-slate-800" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-500 uppercase flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Telefon</label>
                      <input type="tel" value={contact.phone} onChange={(e) => handleContactChange('phone', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-stone-300 text-slate-800" />
                    </div>
                  </div>

                  {status === 'error' && (
                    <div className="bg-red-100 border border-red-200 p-4 rounded-lg text-red-800 text-sm flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p>{errorMessage}</p>
                    </div>
                  )}

                  <button type="submit" disabled={status === 'sending'} className="w-full bg-gradient-to-r from-red-800 to-red-900 text-white font-medium py-4 rounded-xl shadow-lg hover:from-red-700 transition-all flex items-center justify-center gap-3">
                    {status === 'sending' ? 'Przesyłanie...' : <><Send className="w-5 h-5" /><span className="font-serif tracking-wide text-lg">Wyślij odpowiedzi</span></>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
