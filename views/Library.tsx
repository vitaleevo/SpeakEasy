
import React, { useState } from 'react';

const Library: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloading, setDownloading] = useState<string | null>(null);

  const resources = [
    { id: '1', name: 'Guia: Inglês para Petróleo e Gás', type: 'PDF', size: '4.2 MB', category: 'Negócios', icon: 'description', date: 'Jan 2025' },
    { id: '2', name: 'Podcast: Networking em Luanda', type: 'Audio', size: '22.5 MB', category: 'Viagens', icon: 'podcasts', date: 'Dez 2024' },
    { id: '3', name: 'Templates de Email Formal', type: 'DOCX', size: '1.1 MB', category: 'Gramática', icon: 'article', date: 'Jan 2025' },
    { id: '4', name: 'Vídeo: Pitch de 30 segundos', type: 'Vídeo', size: '45.0 MB', category: 'Negócios', icon: 'video_library', date: 'Nov 2024' },
    { id: '5', name: 'Dicionário de Termos Bancários', type: 'PDF', size: '3.8 MB', category: 'Vocabulário', icon: 'menu_book', date: 'Jan 2025' },
    { id: '6', name: 'Guia de Pronúncia: Fonemas Difíceis', type: 'Audio', size: '12.2 MB', category: 'Vocabulário', icon: 'graphic_eq', date: 'Out 2024' },
    { id: '7', name: 'Contratos em Inglês (Drafts)', type: 'PDF', size: '2.5 MB', category: 'Negócios', icon: 'contract', date: 'Jan 2025' },
  ];

  const handleDownload = (id: string) => {
    setDownloading(id);
    setTimeout(() => setDownloading(null), 2000);
  };

  const filteredResources = resources.filter(res => {
    const matchesFilter = activeFilter === 'Todos' || res.category === activeFilter;
    const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-text-main tracking-tight">Recursos & Biblioteca</h2>
          <p className="text-text-muted font-medium">Aprofunda o teu conhecimento com materiais exclusivos para Angola.</p>
        </div>
        
        <div className="relative w-full lg:w-96">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">search</span>
          <input 
            type="text"
            placeholder="Pesquisar manuais, áudios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 shadow-soft outline-none focus:ring-2 focus:ring-primary/20 font-medium text-sm transition-all"
          />
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
        {['Todos', 'Negócios', 'Viagens', 'Gramática', 'Vocabulário'].map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
              activeFilter === cat 
                ? 'bg-primary text-white shadow-glow' 
                : 'bg-white text-text-muted border border-slate-200 hover:border-primary/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Manuais Práticos', count: '12 Arquivos', icon: 'auto_stories', color: 'bg-blue-50 text-blue-600' },
          { title: 'Laboratório de Áudio', count: '45 Podcasts', icon: 'record_voice_over', color: 'bg-emerald-50 text-emerald-600' },
          { title: 'Central de Vídeo', count: '28 Tutoriais', icon: 'smart_display', color: 'bg-rose-50 text-rose-600' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] shadow-soft border border-slate-100 group cursor-pointer hover:-translate-y-1 transition-all">
            <div className={`size-14 rounded-2xl ${item.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 shadow-sm`}>
              <span className="material-symbols-outlined text-3xl">{item.icon}</span>
            </div>
            <h3 className="text-xl font-black text-text-main">{item.title}</h3>
            <p className="text-sm text-text-muted font-bold mt-1 uppercase tracking-widest text-[10px]">{item.count}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h4 className="text-xl font-bold text-text-main mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary filled-icon">list_alt</span>
          Documentos Recentes
        </h4>
        
        {/* Responsive Table/Grid */}
        <div className="bg-white rounded-[32px] overflow-hidden shadow-soft border border-slate-100">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-text-muted tracking-widest">Recurso</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-text-muted tracking-widest text-center">Formato</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-text-muted tracking-widest">Categoria</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-text-muted tracking-widest">Tamanho</th>
                  <th className="px-8 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredResources.map((file) => (
                  <tr key={file.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">{file.icon}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-text-main">{file.name}</span>
                          <span className="text-[10px] text-text-muted font-bold uppercase">{file.date}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className="px-3 py-1 bg-slate-100 text-[10px] font-black text-text-muted rounded-lg uppercase">
                        {file.type}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm text-text-muted font-semibold">{file.category}</td>
                    <td className="px-8 py-5 text-sm text-text-muted font-medium">{file.size}</td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => handleDownload(file.id)}
                        className={`size-10 rounded-xl flex items-center justify-center transition-all ${
                          downloading === file.id ? 'bg-emerald-500 text-white' : 'text-slate-300 hover:bg-primary hover:text-white'
                        }`}
                      >
                        <span className="material-symbols-outlined text-xl">
                          {downloading === file.id ? 'check' : 'download'}
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile List View */}
          <div className="md:hidden divide-y divide-slate-100">
             {filteredResources.map((file) => (
               <div key={file.id} className="p-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">{file.icon}</span>
                    </div>
                    <div>
                      <p className="font-bold text-text-main text-sm leading-tight mb-1">{file.name}</p>
                      <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">{file.type} • {file.size}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDownload(file.id)}
                    className="size-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined">{downloading === file.id ? 'check' : 'download'}</span>
                  </button>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
