
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string) => void;
  onSwitchToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      {/* Left Side: Branding & Image */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover" 
            alt="Students collaborating"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/40 to-transparent" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-glow">
              <span className="material-symbols-outlined text-3xl">graphic_eq</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">SpeakEasy</h1>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-5xl font-extrabold text-white leading-tight mb-6">
            Abre as portas para o <br />
            <span className="text-primary">Mundo</span> com Inglês.
          </h2>
          <p className="text-lg text-slate-300 max-w-md font-medium">
            Junta-te a mais de 10.000 profissionais angolanos que estão a dominar o mercado global através da nossa tutoria por IA.
          </p>
        </div>

        <div className="relative z-10 flex gap-12">
          <div className="flex flex-col">
            <span className="text-3xl font-black text-white">4.8</span>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Rating App Store</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-black text-white">100k+</span>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Lições Concluídas</span>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 md:p-20">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="lg:hidden flex items-center gap-2 mb-12">
            <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined">graphic_eq</span>
            </div>
            <h1 className="text-xl font-black text-text-main">SpeakEasy</h1>
          </div>

          <header className="mb-10">
            <h2 className="text-3xl font-black text-text-main mb-2">Bem-vindo de volta!</h2>
            <p className="text-text-muted font-medium">Insira as suas credenciais para continuar.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-black text-text-main uppercase tracking-widest">Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">mail</span>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@unitel.ao"
                  required
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl py-4 pl-12 pr-4 transition-all font-semibold outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-black text-text-main uppercase tracking-widest">Palavra-passe</label>
                <a href="#" className="text-xs font-bold text-primary hover:text-primary-dark">Esqueceu-se?</a>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">lock</span>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl py-4 pl-12 pr-4 transition-all font-semibold outline-none"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Entrar na Conta
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4 text-slate-300">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-xs font-bold uppercase">Ou continuar com</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-slate-50 hover:border-slate-100 transition-all font-bold text-sm">
              <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" className="size-5" alt="Google" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-slate-50 hover:border-slate-100 transition-all font-bold text-sm">
              <img src="https://www.svgrepo.com/show/303114/facebook-3-logo.svg" className="size-5" alt="Facebook" />
              Facebook
            </button>
          </div>

          <p className="mt-10 text-center text-text-muted font-medium">
            Ainda não tem conta?{' '}
            <button 
              onClick={onSwitchToSignup}
              className="text-primary font-black hover:underline"
            >
              Criar conta gratuita
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
