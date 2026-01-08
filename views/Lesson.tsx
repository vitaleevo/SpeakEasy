
import React, { useState, useRef, useEffect } from 'react';
import { generateSpeech, decodeBase64, decodeAudioData } from '../services/geminiService';

interface LessonProps {
  onFinish: () => void;
}

const LessonView: React.FC<LessonProps> = ({ onFinish }) => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<string | null>(null);
  const [recordedAudio, setRecordedAudio] = useState<{ [key: string]: string | null }>({});
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);

  const keyPhrases = [
    { id: 'p1', text: "I look forward to meeting you.", translation: "Aguardo ansiosamente pelo nosso encontro." },
    { id: 'p2', text: "It was a pleasure talking to you today.", translation: "Foi um prazer falar consigo hoje." },
    { id: 'p3', text: "Thank you for the opportunity.", translation: "Obrigado pela oportunidade." }
  ];

  const quizOptions = [
    "I look forward to meeting you.",
    "I am looking for you.",
    "I will wait for you.",
    "See you soon."
  ];

  const handleListen = async (phrase: string, id: string) => {
    if (isPlaying) return;
    setIsPlaying(id);
    
    const base64Audio = await generateSpeech(phrase);
    if (base64Audio) {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      
      const ctx = audioContextRef.current;
      const audioBuffer = await decodeAudioData(decodeBase64(base64Audio), ctx, 24000, 1);
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => setIsPlaying(null);
      source.start();
    } else {
      setIsPlaying(null);
    }
  };

  const startRecording = async (id: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedAudio(prev => ({ ...prev, [id]: url }));
        setIsRecording(null);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(id);
    } catch (err) {
      console.error("Microphone access denied", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const playUserRecording = (id: string) => {
    const url = recordedAudio[id];
    if (url) {
      const audio = new Audio(url);
      audio.play();
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col gap-8 pb-10">
      {/* Progress Top Bar */}
      <div className="flex items-center gap-6 shrink-0">
        <button onClick={onFinish} className="text-text-muted hover:text-text-main">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
        </div>
        <div className="flex items-center gap-2 text-xs font-black text-primary">
          <span className="material-symbols-outlined text-lg">bolt</span> 450 XP
        </div>
      </div>

      {step === 1 && (
        <div className="flex-1 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 overflow-y-auto hide-scrollbar">
          <div className="aspect-video bg-slate-900 rounded-[32px] overflow-hidden relative shadow-2xl shrink-0">
            <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-60" alt="Lesson" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="size-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-5xl filled-icon">play_arrow</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
             <h3 className="text-2xl font-black text-text-main">Apresentações Profissionais</h3>
             <p className="text-text-muted font-medium leading-relaxed">
               Nesta lição, você aprenderá a encerrar um email ou conversa de forma polida. 
               Pratique a pronúncia destas frases-chave:
             </p>

             {/* Interactive Audio Practice */}
             <div className="space-y-4">
                {keyPhrases.map((phrase) => (
                  <div key={phrase.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-primary/20 transition-all">
                    <div className="flex-1">
                      <p className="font-bold text-text-main text-lg">{phrase.text}</p>
                      <p className="text-sm text-text-muted font-medium italic">{phrase.translation}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleListen(phrase.text, phrase.id)}
                        disabled={isPlaying !== null}
                        className={`size-12 rounded-2xl flex items-center justify-center transition-all ${
                          isPlaying === phrase.id ? 'bg-primary text-white scale-110' : 'bg-slate-50 text-primary hover:bg-primary/10'
                        }`}
                      >
                        <span className={`material-symbols-outlined ${isPlaying === phrase.id ? 'animate-pulse filled-icon' : ''}`}>
                          {isPlaying === phrase.id ? 'graphic_eq' : 'volume_up'}
                        </span>
                      </button>

                      <button 
                        onMouseDown={() => startRecording(phrase.id)}
                        onMouseUp={stopRecording}
                        onTouchStart={() => startRecording(phrase.id)}
                        onTouchEnd={stopRecording}
                        className={`size-12 rounded-2xl flex items-center justify-center transition-all ${
                          isRecording === phrase.id ? 'bg-red-500 text-white scale-110 shadow-lg shadow-red-200' : 'bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                      >
                        <span className="material-symbols-outlined filled-icon">
                          {isRecording === phrase.id ? 'stop' : 'mic'}
                        </span>
                      </button>

                      {recordedAudio[phrase.id] && (
                        <button 
                          onClick={() => playUserRecording(phrase.id)}
                          className="size-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-all"
                        >
                          <span className="material-symbols-outlined filled-icon">play_circle</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <p className="text-center text-[10px] font-bold text-text-muted uppercase tracking-widest mt-2">
                  Segure o microfone para gravar e comparar
                </p>
             </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 flex flex-col gap-10 animate-in fade-in slide-in-from-right-4">
          <div className="text-center">
            <h3 className="text-3xl font-black text-text-main mb-4">Traduza a frase</h3>
            <p className="text-xl font-bold text-primary">"Aguardo ansiosamente pelo nosso encontro."</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {quizOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelectedOption(i)}
                className={`p-6 rounded-3xl border-2 text-left font-bold transition-all flex items-center justify-between ${
                  selectedOption === i 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-slate-100 bg-white text-text-muted hover:border-slate-200'
                }`}
              >
                <span>{opt}</span>
                {selectedOption === i && <span className="material-symbols-outlined">check_circle</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in-95">
          <div className="size-40 bg-accent/20 rounded-full flex items-center justify-center text-7xl mb-8 animate-bounce">
            🏆
          </div>
          <h3 className="text-4xl font-black text-text-main mb-2">Lição Concluída!</h3>
          <p className="text-text-muted font-medium mb-8">Excelente progresso, Ana. Ganhaste +450 XP!</p>
          <div className="flex gap-4 w-full max-w-sm">
             <div className="flex-1 bg-white p-4 rounded-2xl border border-slate-100">
               <p className="text-[10px] font-black text-text-muted uppercase">Combo</p>
               <p className="text-xl font-black text-text-main">x1.2</p>
             </div>
             <div className="flex-1 bg-white p-4 rounded-2xl border border-slate-100">
               <p className="text-[10px] font-black text-text-muted uppercase">Precisão</p>
               <p className="text-xl font-black text-text-main">100%</p>
             </div>
          </div>
        </div>
      )}

      {/* Footer Nav */}
      <div className="flex justify-between items-center pt-8 border-t border-slate-100 shrink-0 mt-auto">
        <button 
           onClick={() => step > 1 && setStep(step - 1)}
           disabled={step === 1}
           className="text-text-muted font-bold text-sm disabled:opacity-30"
        >
          Anterior
        </button>
        <button 
           onClick={() => step < 3 ? setStep(step + 1) : onFinish()}
           disabled={step === 2 && selectedOption === null}
           className="bg-primary hover:bg-primary-dark text-white font-black py-4 px-10 rounded-2xl shadow-lg shadow-primary/30 transition-all active:scale-95 disabled:opacity-50"
        >
          {step === 3 ? 'Finalizar' : 'Continuar'}
        </button>
      </div>
    </div>
  );
};

export default LessonView;
