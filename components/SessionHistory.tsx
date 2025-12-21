import React, { useState } from 'react';
import { Session } from '../types';
import { Calendar, Clock, ChevronDown, ChevronUp, FileText, MessageCircle } from 'lucide-react';

interface SessionHistoryProps {
  sessions: Session[];
  onDeleteSession: (sessionId: string) => void;
}

export const SessionHistory: React.FC<SessionHistoryProps> = ({ sessions, onDeleteSession }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (sessions.length === 0) {
    return (
      <div className="text-center py-20 bg-[#1c2622] rounded-2xl border border-[#2a3832]">
        <div className="bg-[#2a3832] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
           <FileText className="w-8 h-8 text-stone-500" />
        </div>
        <h3 className="text-lg font-medium text-stone-300">Brak zapisanych sesji</h3>
        <p className="text-stone-500 mt-1">Przeprowadź sesję z kartami i zapisz ją, aby zobaczyć historię tutaj.</p>
      </div>
    );
  }

  // Sort by newest first
  const sortedSessions = [...sessions].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
      {sortedSessions.map((session) => {
        const date = new Date(session.timestamp);
        const isExpanded = expandedId === session.id;

        return (
          <div key={session.id} className="bg-[#fdfbf7] rounded-xl border border-stone-300 shadow-md overflow-hidden transition-all hover:shadow-lg">
            <div 
              className="p-4 flex items-center justify-between cursor-pointer bg-stone-50 hover:bg-white border-b border-stone-200"
              onClick={() => setExpandedId(isExpanded ? null : session.id)}
            >
               <div className="flex gap-4 items-center">
                  <img 
                    src={session.card.imageUrl} 
                    alt={session.card.name} 
                    className="w-12 h-12 rounded-lg object-cover shadow-sm border border-stone-200"
                  />
                  <div>
                     <h3 className="font-serif font-bold text-slate-800">{session.card.name}</h3>
                     <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {date.toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        <span className="px-1.5 py-0.5 bg-red-50 text-red-800 rounded border border-red-100">{session.deckName}</span>
                     </div>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-amber-600" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
               </div>
            </div>

            {isExpanded && (
               <div className="p-6 space-y-6 bg-white">
                  
                  {/* Card Details */}
                  <div className="flex gap-4 bg-amber-50/30 p-4 rounded-lg border border-amber-100/50">
                     <div className="flex-1">
                        <h4 className="text-xs font-bold uppercase text-amber-800 tracking-wide mb-1">Wylosowana karta</h4>
                        <p className="text-slate-700 italic">"{session.card.description}"</p>
                     </div>
                  </div>

                  {/* Notes */}
                  {session.notes && (
                    <div>
                        <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-2">
                            <FileText className="w-4 h-4 text-red-700" /> Notatki Terapeuty
                        </h4>
                        <div className="bg-stone-50 p-4 rounded-lg text-slate-700 text-sm whitespace-pre-wrap border border-stone-200 font-serif">
                            {session.notes}
                        </div>
                    </div>
                  )}

                  {/* Questions */}
                  <div>
                      <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-2">
                          <MessageCircle className="w-4 h-4 text-red-700" /> Pytania Pomocnicze
                      </h4>
                      <ul className="space-y-3">
                          {session.questions.map((q, idx) => (
                              <li key={idx} className="text-sm text-slate-700 flex gap-3 leading-relaxed">
                                  <span className="text-red-800 font-bold shrink-0">{idx + 1}.</span>
                                  {q}
                              </li>
                          ))}
                      </ul>
                  </div>

                  <div className="flex justify-end pt-2 border-t border-stone-100">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onDeleteSession(session.id); }}
                        className="text-xs text-stone-400 hover:text-red-600 hover:underline transition-colors mt-2"
                      >
                        Usuń wpis z historii
                      </button>
                  </div>
               </div>
            )}
          </div>
        );
      })}
    </div>
  );
};