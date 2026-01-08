
import React from 'react';
import { User } from '../types';

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  return (
    <div className="flex flex-col gap-10 pb-16 animate-in fade-in duration-700">
      <div>
        <h2 className="text-3xl font-extrabold text-text-main">Definições</h2>
        <p className="text-text-muted font-medium">Gere a tua conta, privacidade e preferências de estudo.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Navigation Tabs */}
        <div className="lg:col-span-1 space-y-2">
           {[
             { label: 'Conta & Perfil', icon: 'person', active: true },
             { label: 'Notificações', icon: 'notifications', active: false },
             { label: 'Privacidade', icon: 'lock', active: false },
             { label: 'Faturação', icon: 'credit_card', active: false },
             { label: 'Idioma da App', icon: 'translate', active: false },
           ].map((tab, i) => (
             <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
               tab.active ? 'bg-primary/10 text-primary' : 'text-text-muted hover:bg-slate-50 hover:text-text-main'
             }`}>
               <span className="material-symbols-outlined text-lg">{tab.icon}</span>
               {tab.label}
             </button>
           ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white p-8 rounded-[32px] shadow-soft border border-slate-50 space-y-8">
            <h4 className="text-xl font-bold text-text-main border-b border-slate-50 pb-4">Informação Geral</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text-muted tracking-widest">Nome de Exibição</label>
                <input 
                  type="text" 
                  defaultValue={user.name}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 rounded-2xl py-3 px-4 outline-none font-semibold text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text-muted tracking-widest">Email</label>
                <input 
                  type="email" 
                  defaultValue={user.email}
                  disabled
                  className="w-full bg-slate-50/50 border-2 border-transparent rounded-2xl py-3 px-4 outline-none font-semibold text-sm text-slate-400 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text-muted tracking-widest">Objetivo de Estudo</label>
                <select className="w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 rounded-2xl py-3 px-4 outline-none font-semibold text-sm appearance-none">
                  <option>Inglês de Negócios</option>
                  <option>Preparação para IELTS/TOEFL</option>
                  <option>Conversação Diária</option>
                  <option>Viagens Profissionais</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text-muted tracking-widest">Timezone</label>
                <select className="w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 rounded-2xl py-3 px-4 outline-none font-semibold text-sm appearance-none">
                  <option>GMT+1 (Luanda, Angola)</option>
                  <option>GMT+0 (Londres, UK)</option>
                  <option>GMT-5 (New York, USA)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] shadow-soft border border-slate-50 space-y-8">
            <h4 className="text-xl font-bold text-text-main border-b border-slate-50 pb-4">Preferências de Notificação</h4>
            
            <div className="space-y-6">
              {[
                { title: 'Lembrete de Lição Diária', desc: 'Avisar-me para não perder a minha sequência.', enabled: true },
                { title: 'Progresso da Comunidade', desc: 'Novas interações nos meus tópicos e salas de estudo.', enabled: false },
                { title: 'Dicas do Professor Kamba', desc: 'Dicas semanais de vocabulário e gramática por IA.', enabled: true },
                { title: 'Ofertas & Promoções', desc: 'Descontos em planos Pro e novos cursos.', enabled: true },
              ].map((pref, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                   <div className="flex-1">
                      <p className="font-bold text-text-main text-sm">{pref.title}</p>
                      <p className="text-xs text-text-muted mt-0.5">{pref.desc}</p>
                   </div>
                   <button className={`w-12 h-6 rounded-full relative transition-colors ${pref.enabled ? 'bg-primary' : 'bg-slate-200'}`}>
                      <div className={`absolute top-1 size-4 bg-white rounded-full transition-transform ${pref.enabled ? 'left-7' : 'left-1'}`} />
                   </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
             <button className="px-8 py-3 rounded-2xl font-bold text-sm text-text-muted hover:bg-slate-50 transition-all">Cancelar</button>
             <button className="px-8 py-3 rounded-2xl font-bold text-sm bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">Guardar Alterações</button>
          </div>

          <div className="pt-8 border-t border-slate-100">
             <button className="text-red-500 font-bold text-sm flex items-center gap-2 hover:underline">
                <span className="material-symbols-outlined text-lg">delete</span> Eliminar Conta Permanentemente
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
