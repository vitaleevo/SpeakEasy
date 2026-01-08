
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onLogin }) => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-glow">
              <span className="material-symbols-outlined text-2xl">graphic_eq</span>
            </div>
            <h1 className="text-xl font-black text-text-main tracking-tight">SpeakEasy</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-bold text-text-muted hover:text-primary transition-colors">Recursos</a>
            <a href="#about" className="text-sm font-bold text-text-muted hover:text-primary transition-colors">Sobre Nós</a>
            <a href="#pricing" className="text-sm font-bold text-text-muted hover:text-primary transition-colors">Preços</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onLogin}
              className="px-6 py-2.5 text-sm font-bold text-text-main hover:bg-slate-50 rounded-xl transition-all"
            >
              Login
            </button>
            <button 
              onClick={onStart}
              className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95"
            >
              Começar Grátis
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 lg:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Líder em Angola</span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-black text-text-main leading-tight tracking-tight">
              Domina o Inglês com o teu <span className="text-primary italic">Professor IA</span> angolano.
            </h2>
            
            <p className="text-xl text-text-muted font-medium max-w-xl leading-relaxed">
              Diz adeus às aulas tradicionais aborrecidas. Aprende com o Professor Kamba, focado em situações reais do mercado de trabalho de Luanda ao mundo.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={onStart}
                className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary-dark transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                Criar Conta Gratuita
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <div className="flex -space-x-3 items-center">
                {[1,2,3,4].map(i => (
                  <div key={i} className="size-10 rounded-full border-2 border-white bg-cover bg-center" style={{ backgroundImage: `url('https://i.pravatar.cc/100?img=${i+10}')` }} />
                ))}
                <div className="ml-5 text-xs font-bold text-text-muted">
                  <span className="text-text-main font-black">+10,000</span> alunos ativos
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 relative animate-in fade-in slide-in-from-right-8 duration-1000">
             <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-auto aspect-[4/3] object-cover"
                  alt="Students using SpeakEasy"
                />
             </div>
             {/* Floating Elements */}
             <div className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 animate-bounce">
                <div className="flex items-center gap-3">
                   <div className="size-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <span className="material-symbols-outlined">check</span>
                   </div>
                   <div>
                      <p className="text-xs font-black">Pronúncia Perfeita</p>
                      <p className="text-[10px] text-text-muted">Excelente trabalho, Ana!</p>
                   </div>
                </div>
             </div>
             <div className="absolute -bottom-10 -left-10 bg-slate-900 p-6 rounded-3xl shadow-xl text-white max-w-[200px]">
                <p className="text-xs font-bold mb-2">"O melhor investimento para a minha carreira na Sonangol."</p>
                <p className="text-[10px] text-slate-400">— Pedro Miguel</p>
             </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-10">Empresas que confiam no nosso método</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all">
            {['UNITEL', 'SONANGOL', 'BAI', 'ENDE', 'TOTAL'].map(brand => (
              <span key={brand} className="text-2xl font-black text-slate-900 tracking-tighter">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
             <h3 className="text-4xl lg:text-5xl font-black text-text-main">Aprende de forma inteligente, não árdua.</h3>
             <p className="text-lg text-text-muted font-medium">Combinamos inteligência artificial de ponta com o contexto cultural de Angola para resultados 3x mais rápidos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: 'auto_awesome', 
                title: 'Professor IA 24/7', 
                desc: 'Pratica conversação a qualquer hora com o Professor Kamba. Sem julgamentos, apenas progresso.',
                color: 'bg-emerald-50 text-emerald-600'
              },
              { 
                icon: 'local_library', 
                title: 'Contexto Local', 
                desc: 'Lições desenhadas para o mercado angolano: reuniões, viagens e networking em Luanda.',
                color: 'bg-blue-50 text-blue-600'
              },
              { 
                icon: 'analytics', 
                title: 'Feedback em Tempo Real', 
                desc: 'Recebe correções instantâneas de gramática e pronúncia enquanto falas.',
                color: 'bg-orange-50 text-orange-600'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-soft hover:border-primary/30 transition-all group">
                <div className={`size-16 rounded-2xl ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                </div>
                <h4 className="text-2xl font-black text-text-main mb-4">{feature.title}</h4>
                <p className="text-text-muted font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[50px] p-12 lg:p-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-primary opacity-5 mix-blend-overlay" />
          <div className="relative z-10 space-y-10">
            <h3 className="text-4xl lg:text-6xl font-black text-white leading-tight">Preparado para levar o teu <br />Inglês ao próximo nível?</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={onStart}
                className="px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95"
              >
                Começar Agora
              </button>
              <button className="px-10 py-5 bg-white/10 text-white font-black rounded-2xl hover:bg-white/20 transition-all">
                Ver Planos
              </button>
            </div>
            <p className="text-slate-400 text-sm font-bold">Sem cartões de crédito. Começa grátis hoje.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-xl">graphic_eq</span>
            </div>
            <h1 className="text-lg font-black text-text-main tracking-tight">SpeakEasy</h1>
          </div>

          <div className="flex gap-8 text-sm font-bold text-text-muted">
            <a href="#" className="hover:text-primary transition-colors">Termos</a>
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Suporte</a>
          </div>

          <p className="text-xs font-bold text-slate-400">© 2025 SpeakEasy Angola. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
