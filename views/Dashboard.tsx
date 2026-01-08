
import React from 'react';
import { User, NavigationTab } from '../types';

interface DashboardProps {
  user: User;
  onStartLesson: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onStartLesson }) => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <header className="flex flex-col">
        <h2 className="text-3xl font-extrabold text-text-main tracking-tight">Boa tarde, {user.name.split(' ')[0]} 👋</h2>
        <p className="text-text-muted font-medium">Pronto para dominar sua apresentação de negócios?</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-min">
        {/* Progress Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-soft relative overflow-hidden flex flex-col sm:flex-row border border-slate-50">
          <div className="flex-1 p-8 flex flex-col justify-center z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">Módulo Atual</span>
              <span className="text-text-muted text-xs font-semibold">Business English</span>
            </div>
            <h3 className="text-3xl font-extrabold text-text-main mb-2">Level {user.level}</h3>
            <p className="text-text-muted mb-6">Tópico: <span className="text-primary font-semibold">Mastering the Elevator Pitch</span>. Estás a 75% do próximo nível!</p>
            <div className="flex items-center gap-4">
              <button 
                onClick={onStartLesson}
                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-7 rounded-2xl transition-all shadow-lg shadow-primary/30 active:scale-95"
              >
                <span className="material-symbols-outlined filled-icon">play_arrow</span>
                <span>Iniciar Lição</span>
              </button>
              <span className="text-xs text-text-muted font-bold flex items-center gap-1 uppercase tracking-widest">
                <span className="material-symbols-outlined text-[16px]">schedule</span> 15 mins
              </span>
            </div>
          </div>
          
          <div className="w-full sm:w-64 h-48 sm:h-auto bg-slate-50 flex items-center justify-center p-6 shrink-0">
            <div className="relative size-36">
              <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="75, 100" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-text-main">75%</span>
                <span className="text-[10px] font-black text-text-muted uppercase tracking-tighter">Completo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Streak Card */}
        <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-50 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-bold text-text-main">Sequência Diária</h4>
              <p className="text-sm text-text-muted font-medium">Não pares, {user.name.split(' ')[0]}!</p>
            </div>
            <div className="bg-accent/20 text-yellow-700 px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-bold shadow-sm">
              <span className="material-symbols-outlined text-lg filled-icon">local_fire_department</span>
              <span>{user.streak}</span>
            </div>
          </div>
          
          <div className="relative flex-1 min-h-[160px] mt-4 rounded-2xl bg-slate-50 overflow-hidden group">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-700"
              style={{ backgroundImage: "url('https://picsum.photos/seed/map/400/300')" }}
            />
            {/* Simulated Map Markers */}
            <div className="absolute top-[30%] left-[30%] animate-bounce">
              <div className="size-4 bg-primary rounded-full ring-4 ring-white shadow-lg" />
            </div>
          </div>
          <p className="text-xs text-center text-text-muted mt-3 font-medium">Próxima paragem: <span className="font-bold text-text-main">Benguela</span> em 3 dias</p>
        </div>

        {/* Quick Practice */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-text-main">Prática Rápida</h4>
            <button className="text-sm font-bold text-primary hover:text-primary-dark">Ver tudo</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-soft border border-slate-50 flex items-start gap-4 cursor-pointer hover:border-primary/30 transition-all group">
              <div className="size-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div className="flex flex-col">
                <h5 className="font-bold text-text-main group-hover:text-primary transition-colors">Emails em 5-min</h5>
                <p className="text-xs text-text-muted mt-1 font-medium">Aprenda saudações formais vs informais.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-soft border border-slate-50 flex items-start gap-4 cursor-pointer hover:border-primary/30 transition-all group">
              <div className="size-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">record_voice_over</span>
              </div>
              <div className="flex flex-col">
                <h5 className="font-bold text-text-main group-hover:text-primary transition-colors">Roleplay: Entrevista</h5>
                <p className="text-xs text-text-muted mt-1 font-medium">Simule a resposta a "Fale sobre si".</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vocabulary */}
        <div className="bg-white rounded-3xl p-6 shadow-soft flex flex-col border border-slate-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">book_2</span>
              </div>
              <h4 className="text-lg font-bold text-text-main">Vocabulário</h4>
            </div>
            <button className="text-xs font-bold text-text-muted hover:text-primary">Rever</button>
          </div>
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto hide-scrollbar max-h-[180px]">
            {['Networking', 'Draft', 'Synergy'].map((word, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white transition-all">
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-text-main">{word}</span>
                  <span className="text-[10px] text-text-muted italic">Definição rápida aqui...</span>
                </div>
                <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors text-lg">volume_up</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-text-muted hover:bg-slate-50 transition-colors">
            + Adicionar palavra
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
