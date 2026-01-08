
import React, { useState } from 'react';

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'free',
      name: 'Explorador',
      price: '0',
      description: 'Perfeito para começar a sua jornada sem custos.',
      features: [
        { text: '5 Conversas IA por dia', included: true },
        { text: 'Cursos Básicos', included: true },
        { text: 'Comunidade de Alunos', included: true },
        { text: 'Feedback Avançado', included: false },
        { text: 'Modo Offline', included: false },
      ],
      buttonText: 'Plano Atual',
      highlight: false,
    },
    {
      id: 'pro',
      name: 'SpeakEasy Pro',
      price: billingCycle === 'monthly' ? '4.500' : '3.600',
      totalPrice: billingCycle === 'monthly' ? '4.500/mês' : '43.200/ano',
      description: 'O caminho mais rápido para a fluência total.',
      features: [
        { text: 'Conversas IA Ilimitadas', included: true },
        { text: 'Todos os Cursos & Trilhas', included: true },
        { text: 'Feedback Fonético Detalhado', included: true },
        { text: 'Certificados Oficiais', included: true },
        { text: 'Acesso Offline no Telemóvel', included: true },
      ],
      buttonText: 'Subscrever Pro',
      highlight: true,
    },
    {
      id: 'biz',
      name: 'Empresarial',
      price: 'Personalizado',
      description: 'Soluções corporativas para equipas em Angola.',
      features: [
        { text: 'Tudo do Plano Pro', included: true },
        { text: 'Gestor de Conta em Luanda', included: true },
        { text: 'Relatórios de Progresso', included: true },
        { text: 'Workshops ao Vivo', included: true },
        { text: 'Integração via API', included: true },
      ],
      buttonText: 'Contactar Vendas',
      highlight: false,
    }
  ];

  const handleSubscribe = (id: string) => {
    if (id === 'free') return;
    setLoadingPlan(id);
    setTimeout(() => {
      setLoadingPlan(null);
      alert('Simulação de Sucesso: Redirecionando para o pagamento via Multicaixa Express...');
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-12 pb-20 animate-in fade-in duration-700 max-w-6xl mx-auto px-4">
      <div className="text-center space-y-6 pt-10">
        <h2 className="text-4xl lg:text-6xl font-black text-text-main tracking-tight">Investe na tua <span className="text-primary">Carreira</span>.</h2>
        <p className="text-xl text-text-muted font-medium max-w-2xl mx-auto leading-relaxed">
          Planos flexíveis pensados para a realidade angolana. Poupa 20% com a faturação anual.
        </p>
        
        <div className="flex items-center justify-center gap-6 pt-6">
          <span className={`text-sm font-black transition-colors ${billingCycle === 'monthly' ? 'text-text-main' : 'text-text-muted'}`}>MENSAL</span>
          <button 
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-16 h-8 bg-slate-200 rounded-full relative p-1.5 transition-all hover:bg-slate-300"
          >
            <div className={`size-5 bg-white rounded-full shadow-md transition-transform duration-300 transform ${billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-0'}`} />
          </button>
          <span className={`text-sm font-black transition-colors ${billingCycle === 'yearly' ? 'text-text-main' : 'text-text-muted'}`}>
            ANUAL <span className="text-primary text-[10px] bg-primary/10 px-2 py-0.5 rounded-full ml-1">-20%</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`relative bg-white rounded-[48px] p-10 flex flex-col border-2 transition-all hover:scale-[1.03] ${
              plan.highlight 
                ? 'border-primary shadow-2xl shadow-primary/10 scale-105 z-10' 
                : 'border-slate-100 shadow-soft'
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-glow">
                MAIS POPULAR EM ANGOLA
              </div>
            )}

            <div className="mb-10 text-center md:text-left">
              <h4 className="text-2xl font-black text-text-main mb-2">{plan.name}</h4>
              <div className="flex items-baseline justify-center md:justify-start gap-1">
                <span className="text-4xl lg:text-5xl font-black text-text-main">
                  {plan.price !== 'Personalizado' && <span className="text-lg font-bold mr-1">Kz</span>}
                  {plan.price}
                </span>
                {plan.price !== 'Personalizado' && plan.price !== '0' && (
                  <span className="text-text-muted text-sm font-bold">/mês*</span>
                )}
              </div>
              {plan.totalPrice && (
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-2">{plan.totalPrice}</p>
              )}
              <p className="text-text-muted text-sm mt-4 font-medium leading-relaxed">{plan.description}</p>
            </div>

            <div className="flex-1 space-y-5 mb-12">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className={`size-6 rounded-full flex items-center justify-center shrink-0 ${feature.included ? 'bg-primary/10 text-primary' : 'bg-slate-50 text-slate-300'}`}>
                    <span className="material-symbols-outlined text-sm font-black">
                      {feature.included ? 'check' : 'close'}
                    </span>
                  </div>
                  <span className={`text-sm font-semibold ${feature.included ? 'text-text-main' : 'text-slate-400'}`}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleSubscribe(plan.id)}
              disabled={plan.id === 'free' || loadingPlan !== null}
              className={`w-full py-5 rounded-[24px] font-black text-base transition-all active:scale-95 flex items-center justify-center gap-2 ${
              plan.highlight 
                ? 'bg-primary text-white shadow-xl shadow-primary/20 hover:bg-primary-dark' 
                : plan.id === 'free' 
                  ? 'bg-slate-50 text-text-muted cursor-default' 
                  : 'bg-white border-2 border-slate-200 text-text-main hover:border-primary/40'
            }`}>
              {loadingPlan === plan.id ? (
                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                plan.buttonText
              )}
            </button>
            {plan.id === 'pro' && billingCycle === 'yearly' && (
              <p className="text-[10px] text-center mt-4 text-text-muted font-bold italic">*Cobrado anualmente como 43.200 Kz</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-20 bg-slate-50 rounded-[60px] p-12 lg:p-20">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
               <h3 className="text-3xl font-black text-text-main mb-6">Ainda tens dúvidas?</h3>
               <div className="space-y-6">
                  {[
                    { q: "Quais os métodos de pagamento locais?", a: "Aceitamos Multicaixa Express, Cartões de Débito Angolanos (BAI, BFA, etc.) e Transferência Direta por IBAN." },
                    { q: "Posso cancelar em qualquer altura?", a: "Sim. A SpeakEasy não tem fidelização obrigatória. Cancelas quando quiseres e manténs o acesso até ao fim do período pago." },
                    { q: "Têm descontos para estudantes da UAN?", a: "Sim! Estudantes com cartão válido têm 50% de desconto no plano mensal. Contacta-nos para o código promocional." }
                  ].map((faq, i) => (
                    <div key={i} className="group">
                       <p className="font-bold text-text-main mb-2 text-lg group-hover:text-primary transition-colors">{faq.q}</p>
                       <p className="text-text-muted leading-relaxed font-medium">{faq.a}</p>
                    </div>
                  ))}
               </div>
            </div>
            <div className="bg-white p-10 rounded-[40px] shadow-soft border border-slate-100 flex flex-col items-center text-center space-y-6">
               <div className="size-20 bg-accent/20 rounded-full flex items-center justify-center text-4xl shadow-sm">🎓</div>
               <h4 className="text-2xl font-black text-text-main">Plano Universitário</h4>
               <p className="text-text-muted font-medium">És estudante universitário em Angola? Temos condições especiais para te ajudar a brilhar.</p>
               <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-black transition-colors">
                 Validar Estudante
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Pricing;
