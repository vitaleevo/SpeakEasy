
import React, { useState } from 'react';
import { User } from '../types';

interface SignupProps {
  onSignup: (userData: Partial<User>) => void;
  onSwitchToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup, onSwitchToLogin }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    level: 'A1 - Iniciante'
  });

  const levels = [
    { id: 'A1', label: 'A1 - Iniciante', desc: 'Nunca estudei inglês ou sei o básico.' },
    { id: 'A2', label: 'A2 - Pré-Intermédio', desc: 'Entendo frases simples e rotinas.' },
    { id: 'B1', label: 'B1 - Intermédio', desc: 'Consigo viajar e trabalhar em inglês.' },
    { id: 'B2', label: 'B2 - Intermédio Superior', desc: 'Fluência em conversas técnicas.' },
    { id: 'C1', label: 'C1 - Avançado', desc: 'Uso profissional e académico total.' },
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) setStep(step + 1);
    else onSignup(formData);
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 font-sans">
      <div className="hidden lg:flex w-2/5 bg-primary relative p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-white text-primary flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined">graphic_eq</span>
            </div>
            <h1 className="text-xl font-black text-white tracking-tight">SpeakEasy</h1>
          </div>
        </div>

        <div className="relative z-10">
          <div className="size-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center text-4xl mb-8">
            ✨
          </div>
          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            A tua jornada <br />começa aqui.
          </h2>
          <p className="text-white/80 font-medium">
            Adapta-se ao teu nível. Foca no teu objetivo. <br />Domina o idioma.
          </p>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
          <p className="text-white text-sm italic">
            "Desde que comecei o SpeakEasy, a minha confiança nas reuniões com clientes americanos triplicou."
          </p>
          <div className="flex items-center gap-3 mt-4">
            <div className="size-8 rounded-full bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100')" }} />
            <div>
              <p className="text-xs font-bold text-white">Carlos Mendes</p>
              <p className="text-[10px] text-white/60">Gestor de Projectos na Sonangol</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-lg">
          {/* Progress indicators */}
          <div className="flex items-center gap-4 mb-12">
            {[1, 2].map(i => (
              <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${i <= step ? 'bg-primary' : 'bg-slate-200'}`} />
            ))}
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-soft border border-slate-100">
            {step === 1 ? (
              <div className="animate-in fade-in slide-in-from-right-4">
                <header className="mb-10">
                  <h2 className="text-3xl font-black text-text-main mb-2">Cria a tua conta</h2>
                  <p className="text-text-muted font-medium">Leva menos de 1 minuto.</p>
                </header>

                <form onSubmit={handleNext} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-text-main uppercase tracking-widest">Nome Completo</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ex: Ana Silva"
                      required
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl py-4 px-6 transition-all font-semibold outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-text-main uppercase tracking-widest">Email Profissional</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="exemplo@unitel.ao"
                      required
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl py-4 px-6 transition-all font-semibold outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-text-main uppercase tracking-widest">Palavra-passe</label>
                    <input 
                      type="password" 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="Mínimo 8 caracteres"
                      required
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl py-4 px-6 transition-all font-semibold outline-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    Próximo Passo
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-right-4">
                <header className="mb-8">
                  <h2 className="text-3xl font-black text-text-main mb-2">Qual o seu nível?</h2>
                  <p className="text-text-muted font-medium">Iremos personalizar o Professor Kamba para si.</p>
                </header>

                <div className="space-y-3 mb-8">
                  {levels.map((lvl) => (
                    <button
                      key={lvl.id}
                      onClick={() => setFormData({...formData, level: lvl.label})}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all group ${
                        formData.level === lvl.label 
                          ? 'border-primary bg-primary/5' 
                          : 'border-slate-50 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className={`font-black text-sm uppercase tracking-widest ${formData.level === lvl.label ? 'text-primary' : 'text-text-main'}`}>
                          {lvl.id}
                        </span>
                        {formData.level === lvl.label && (
                          <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                        )}
                      </div>
                      <p className={`font-bold text-sm ${formData.level === lvl.label ? 'text-primary' : 'text-text-main'}`}>{lvl.label}</p>
                      <p className="text-xs text-text-muted font-medium">{lvl.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-text-muted font-black py-4 rounded-2xl transition-all"
                  >
                    Voltar
                  </button>
                  <button 
                    onClick={() => onSignup(formData)}
                    className="flex-[2] bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    Concluir Registo
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="mt-8 text-center text-text-muted font-medium">
            Já tem uma conta?{' '}
            <button 
              onClick={onSwitchToLogin}
              className="text-primary font-black hover:underline"
            >
              Fazer Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
