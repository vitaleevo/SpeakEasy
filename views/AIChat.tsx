
import React, { useState, useEffect, useRef } from 'react';
import { Message, User } from '../types';
import { getAITutorResponse, getPronunciationFeedback } from '../services/geminiService';

interface AIChatProps {
  user: User;
}

const AIChat: React.FC<AIChatProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! Let's start. Imagine you are in an interview in Luanda.\n\nCan you tell me about your experience working with large teams?",
      translation: "Olá! Vamos começar. Imagine que está numa entrevista em Luanda. Pode falar-me sobre a sua experiência em trabalhar com grandes equipas?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, feedback]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);
    setFeedback(null);

    // Get detailed pronunciation/grammar feedback
    const feedbackResult = await getPronunciationFeedback(userMsg.text);
    setFeedback(feedbackResult);

    // Get AI tutor response
    const history = messages.map(m => ({
      role: m.sender === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: m.text }]
    }));

    const responseText = await getAITutorResponse(userMsg.text, history);
    
    setIsTyping(false);
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: responseText,
      timestamp: new Date()
    }]);
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-slate-50 rounded-3xl border border-slate-100 shadow-soft">
      {/* Header */}
      <div className="p-5 bg-white flex items-center gap-4 border-b border-slate-100 z-10 shrink-0">
        <div className="relative">
          <div 
            className="size-14 rounded-full bg-cover bg-center border-2 border-white shadow-sm"
            style={{ backgroundImage: "url('https://picsum.photos/seed/kamba/100')" }}
          />
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg">Professor Kamba</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">AI Tutor</span>
          </div>
          <p className="text-text-muted text-sm">{isTyping ? 'Professor está a pensar...' : 'Ouvindo...'}</p>
        </div>
        <button className="p-2.5 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>

      {/* Chat Stream */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar pb-32">
        <div className="flex justify-center">
          <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">Hoje, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} gap-2 group`}>
            <div className={`flex gap-3 max-w-[85%] sm:max-w-[70%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`p-4 rounded-2xl shadow-sm text-base leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-white text-text-main border border-slate-100 rounded-tl-none'
              }`}>
                {msg.text.split('\n').map((line, i) => <p key={i} className={i > 0 ? 'mt-3' : ''}>{line}</p>)}
              </div>
            </div>
            {msg.translation && (
              <div className="flex items-center gap-2 px-2 mt-1">
                <span className="material-symbols-outlined text-sm text-primary">translate</span>
                <p className="text-xs text-text-muted font-semibold">Tradução: {msg.translation}</p>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-primary p-4 bg-white/50 rounded-2xl w-fit">
            <div className="size-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="size-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="size-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        )}

        {/* Improved Detailed Feedback Widget */}
        {feedback && (
          <div className="flex justify-end w-full animate-in slide-in-from-bottom-4 fade-in">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl max-w-[85%] overflow-hidden">
              <div className="bg-slate-900 px-5 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="size-2 bg-accent rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Análise do Lab Fonético</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score</span>
                  <span className={`text-sm font-black ${feedback.accuracy > 85 ? 'text-emerald-400' : feedback.accuracy > 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                    {feedback.accuracy}%
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="text-[9px] font-black text-text-muted uppercase tracking-widest block mb-2">Deteção de Pronúncia</label>
                  <p className="text-lg font-bold leading-relaxed tracking-wide text-slate-800" dangerouslySetInnerHTML={{ __html: feedback.highlightedText }} />
                </div>

                {feedback.phoneticGuide && feedback.phoneticGuide !== "N/A" && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2 text-primary">
                      <span className="material-symbols-outlined text-lg">record_voice_over</span>
                      <span className="text-[10px] font-black uppercase tracking-widest">Guia de Fonemas</span>
                    </div>
                    <p className="text-sm font-mono font-bold text-slate-600 bg-white px-3 py-2 rounded-lg inline-block border border-slate-100">
                      {feedback.phoneticGuide}
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-50">
                  <div className="flex items-start gap-3">
                    <div className="size-8 rounded-xl bg-accent/20 text-yellow-700 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-lg">lightbulb</span>
                    </div>
                    <div>
                      <p className="text-xs font-black text-text-main uppercase tracking-tight mb-1">Dica do Professor</p>
                      <p className="text-xs text-text-muted font-medium leading-relaxed">{feedback.tip}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent z-10">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-4">
          <div className="flex items-center gap-4 bg-white p-2 rounded-3xl shadow-lg border border-slate-100">
            <button className="p-3 text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">keyboard</span>
            </button>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite ou fale em Inglês..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-semibold"
            />
            <button 
              onClick={handleSend}
              className={`size-12 rounded-2xl flex items-center justify-center transition-all shadow-md ${
                inputValue.trim() ? 'bg-primary text-white scale-100' : 'bg-slate-100 text-slate-300 scale-90'
              }`}
            >
              <span className="material-symbols-outlined text-2xl">mic</span>
            </button>
          </div>
          <p className="text-center text-[10px] text-text-muted font-bold uppercase tracking-widest">Feedback instantâneo de fonemas ativo</p>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
