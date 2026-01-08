
import React from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  return (
    <div className="flex flex-col gap-10">
      {/* Hero Section */}
      <div className="bg-white p-8 rounded-[40px] shadow-soft border border-slate-50 flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <div className="size-32 rounded-full border-4 border-primary/20 p-1">
            <div className="size-full rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${user.avatar})` }} />
          </div>
          <button className="absolute bottom-1 right-1 size-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-sm">edit</span>
          </button>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-black text-text-main">{user.name}</h2>
          <p className="text-text-muted font-bold mt-1">{user.email}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">{user.level}</span>
            <span className="bg-accent/20 text-yellow-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1">
               <span className="material-symbols-outlined text-sm filled-icon">local_fire_department</span> {user.streak} Dias
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={onLogout}
            className="bg-slate-50 text-text-muted px-6 py-3 rounded-2xl font-bold text-sm border border-slate-100 hover:bg-white hover:text-red-500 transition-all active:scale-95"
          >
            Sair
          </button>
          <button className="bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
            Editar Perfil
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total XP', value: '4.5k', icon: 'bolt', color: 'text-orange-500' },
              { label: 'Lições', value: '128', icon: 'school', color: 'text-blue-500' },
              { label: 'Words', value: '1.2k', icon: 'translate', color: 'text-emerald-500' },
              { label: 'Ranking', value: '#12', icon: 'military_tech', color: 'text-purple-500' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-3xl border border-slate-50 shadow-sm text-center">
                <span className={`material-symbols-outlined ${stat.color} mb-1`}>{stat.icon}</span>
                <p className="text-2xl font-black text-text-main">{stat.value}</p>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-soft border border-slate-50">
             <h4 className="text-xl font-bold text-text-main mb-6">Atividade Semanal</h4>
             <div className="h-40 flex items-end justify-between gap-2">
                {[40, 70, 45, 90, 65, 30, 80].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3">
                    <div className="w-full bg-slate-50 rounded-lg overflow-hidden relative" style={{ height: '100%' }}>
                       <div className="absolute bottom-0 w-full bg-primary rounded-lg transition-all duration-1000" style={{ height: `${h}%` }} />
                    </div>
                    <span className="text-[10px] font-bold text-text-muted uppercase">
                      {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][i]}
                    </span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white p-8 rounded-3xl shadow-soft border border-slate-50">
          <h4 className="text-xl font-bold text-text-main mb-6">Conquistas</h4>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: '🔥', label: '10 Days' },
              { icon: '🧠', label: 'Word Master' },
              { icon: '🌍', label: 'Traveler' },
              { icon: '🎤', label: 'Speaker' },
              { icon: '🚀', label: 'Fast' },
              { icon: '⭐', label: 'Top 10' },
            ].map((badge, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group cursor-help">
                <div className="size-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {badge.icon}
                </div>
                <p className="text-[10px] font-bold text-text-muted text-center uppercase tracking-tighter leading-none">{badge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
