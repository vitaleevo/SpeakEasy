
import React from 'react';

const Community: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-text-main">Comunidade</h2>
          <p className="text-text-muted font-medium">Aprenda com outros estudantes em Angola.</p>
        </div>
        <button className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-primary/20 flex items-center gap-2">
          <span className="material-symbols-outlined">add</span> Novo Tópico
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left column: Feed */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-50 shadow-soft">
             <div className="flex gap-4">
                <div className="size-12 rounded-full bg-slate-100 bg-cover bg-center shrink-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100')" }} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-text-main">Mário Kabila</span>
                    <span className="text-xs text-text-muted">• há 2 horas</span>
                  </div>
                  <p className="text-sm text-text-main mt-2 leading-relaxed">
                    Alguém para praticar conversação sobre "Supply Chain"? Estou a preparar uma apresentação para a Unitel Money. 🇦🇴📈
                  </p>
                  <div className="mt-4 flex gap-6 text-text-muted">
                    <button className="flex items-center gap-1.5 text-xs font-bold hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-lg">thumb_up</span> 24
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-bold hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-lg">chat_bubble</span> 8 respostas
                    </button>
                  </div>
                </div>
             </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-50 shadow-soft">
             <div className="flex gap-4">
                <div className="size-12 rounded-full bg-slate-100 bg-cover bg-center shrink-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100')" }} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-text-main">Helena Costa</span>
                    <span className="text-xs text-text-muted">• há 4 horas</span>
                  </div>
                  <p className="text-sm text-text-main mt-2 leading-relaxed">
                    Achei esta lista de verbos irregulares focada em finanças muito útil. Link na bio! 💼
                  </p>
                  <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">description</span>
                        <span className="text-xs font-bold">Financial_Verbs_2025.pdf</span>
                     </div>
                     <button className="text-primary font-bold text-xs">Download</button>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right column: Study Rooms */}
        <div className="space-y-6">
           <h4 className="text-lg font-bold text-text-main flex items-center gap-2">
             <span className="material-symbols-outlined text-primary">record_voice_over</span> Salas de Estudo
           </h4>
           <div className="space-y-3">
             {[
               { name: 'Business Luanda', members: 45, icon: '🏢' },
               { name: 'Estudantes UAN', members: 128, icon: '🎓' },
               { name: 'Grammar Masters', members: 89, icon: '📝' },
               { name: 'Casual Chat', members: 32, icon: '☕' },
             ].map((room, i) => (
               <div key={i} className="p-4 rounded-2xl bg-white border border-slate-50 shadow-sm hover:border-primary/40 transition-all cursor-pointer group">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <span className="text-2xl">{room.icon}</span>
                     <div>
                       <p className="font-bold text-sm text-text-main group-hover:text-primary transition-colors">{room.name}</p>
                       <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">{room.members} Membros</p>
                     </div>
                   </div>
                   <span className="material-symbols-outlined text-slate-300 text-lg">chevron_right</span>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
