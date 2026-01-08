
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col gap-20 pb-20 animate-in fade-in duration-700 max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto pt-10 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">A Nossa Jornada</span>
        </div>
        <h2 className="text-4xl lg:text-7xl font-black text-text-main leading-tight tracking-tight">
          A quebrar barreiras para o <span className="text-primary italic">Talento Angolano</span>.
        </h2>
        <p className="text-xl text-text-muted font-medium leading-relaxed">
          A SpeakEasy nasceu em Luanda para resolver um problema real: a falta de acesso a um ensino de inglês que entenda o contexto profissional de Angola. 
          Damos-lhe as ferramentas para liderar no mercado global, sem sair de casa.
        </p>
      </section>

      {/* Stats with local impact */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {[
          { label: 'Utilizadores Ativos', value: '15.000+', icon: 'groups' },
          { label: 'Cidades em Angola', value: '18', icon: 'location_on' },
          { label: 'Feedback Positivo', value: '98%', icon: 'sentiment_very_satisfied' },
          { label: 'Bolsas Atribuídas', value: '150', icon: 'workspace_premium' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-soft text-center group">
            <span className="material-symbols-outlined text-primary mb-3 text-3xl opacity-50 group-hover:opacity-100 transition-opacity">{stat.icon}</span>
            <p className="text-3xl lg:text-4xl font-black text-text-main mb-1">{stat.value}</p>
            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Storytelling Section */}
      <section className="bg-slate-900 rounded-[60px] overflow-hidden flex flex-col lg:flex-row items-stretch mx-4">
        <div className="flex-1 p-12 lg:p-20 space-y-8 flex flex-col justify-center">
          <h3 className="text-3xl lg:text-5xl font-black text-white leading-tight">Uma IA que conhece a <br /><span className="text-primary">Ilha de Luanda</span>.</h3>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            O Professor Kamba não é apenas um chatbot genérico. Ele foi treinado para entender as necessidades específicas de quem trabalha na Sonangol, Unitel, ou no Porto de Luanda. 
            Ele sabe a diferença entre o inglês formal de escritório e a conversa relaxada num almoço na Talatona.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
             <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10 flex-1 w-full">
                <div className="size-14 rounded-full border-2 border-primary overflow-hidden shrink-0">
                   <img src="https://picsum.photos/seed/kamba/100" alt="Kamba" />
                </div>
                <div>
                   <p className="text-white font-bold">Professor Kamba</p>
                   <p className="text-xs text-primary font-black uppercase tracking-widest">Tutor de IA Cultural</p>
                </div>
             </div>
          </div>
        </div>
        <div className="flex-1 h-full min-h-[500px] relative">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay" 
            alt="Colaboração em Angola"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        </div>
      </section>

      {/* Values & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {[
          { 
            icon: 'verified', 
            title: 'Qualidade Global', 
            desc: 'Currículo alinhado com o CEFR, focado em resultados práticos e certificação internacional.' 
          },
          { 
            icon: 'rocket_launch', 
            title: 'Aceleração Profissional', 
            desc: 'Focamos no "Business English" que as multinacionais em Angola exigem hoje.' 
          },
          { 
            icon: 'volunteer_activism', 
            title: 'Impacto na Juventude', 
            desc: 'Parcerias com a UAN e o ITEL para oferecer licenças gratuitas a estudantes de mérito.' 
          }
        ].map((item, i) => (
          <div key={i} className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-soft hover:border-primary/20 transition-all text-center md:text-left">
            <div className="size-16 rounded-3xl bg-slate-50 text-primary flex items-center justify-center mb-8 mx-auto md:mx-0 shadow-sm">
              <span className="material-symbols-outlined text-4xl">{item.icon}</span>
            </div>
            <h4 className="text-2xl font-black text-text-main mb-4">{item.title}</h4>
            <p className="text-text-muted text-base font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Team CTA */}
      <section className="text-center bg-primary/5 rounded-[60px] p-16 lg:p-24 mx-4 space-y-8 border border-primary/10">
         <h3 className="text-3xl lg:text-5xl font-black text-text-main">Queres fazer parte desta revolução?</h3>
         <p className="text-text-muted font-medium max-w-2xl mx-auto text-lg">
           Estamos sempre à procura de mentes brilhantes para ajudar a construir o futuro da educação em Angola. 
           Vem trabalhar connosco!
         </p>
         <button className="bg-primary hover:bg-primary-dark text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-primary/30 transition-all active:scale-95 text-lg">
            Ver Vagas Abertas
         </button>
      </section>
      
      <p className="text-center text-xs font-black text-text-muted uppercase tracking-widest opacity-40">
        SpeakEasy Angola • Luanda, 2025
      </p>
    </div>
  );
};

export default AboutUs;
