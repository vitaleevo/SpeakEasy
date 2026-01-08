
import React from 'react';
import { NavigationTab, User } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, user }) => {
  const navItems = [
    { id: NavigationTab.DASHBOARD, icon: 'dashboard', label: 'Dashboard' },
    { id: NavigationTab.COURSES, icon: 'school', label: 'Meus Cursos' },
    { id: NavigationTab.AI_CHAT, icon: 'chat_bubble', label: 'Conversas IA' },
    { id: NavigationTab.COMMUNITY, icon: 'groups', label: 'Comunidade' },
    { id: NavigationTab.LIBRARY, icon: 'book_2', label: 'Recursos' },
    { id: NavigationTab.PRICING, icon: 'payments', label: 'Planos' },
    { id: NavigationTab.ABOUT_US, icon: 'info', label: 'Sobre Nós' },
  ];

  return (
    <aside className="hidden lg:flex w-72 flex-col bg-white border-r border-slate-100 h-screen p-6 justify-between shrink-0 sticky top-0">
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-3 px-2">
          <div className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-primary to-emerald-400 text-white shadow-glow">
            <span className="material-symbols-outlined text-[24px]">graphic_eq</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-text-main">SpeakEasy</h1>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-semibold ${
                activeTab === item.id 
                  ? 'bg-primary/10 text-primary shadow-sm' 
                  : 'text-text-muted hover:bg-slate-50 hover:text-text-main'
              }`}
            >
              <span className={`material-symbols-outlined ${activeTab === item.id ? 'filled-icon' : ''}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        <div 
          onClick={() => setActiveTab(NavigationTab.PRICING)}
          className="p-4 rounded-2xl bg-slate-900 text-white relative overflow-hidden group cursor-pointer transition-all hover:bg-slate-800 active:scale-95"
        >
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-6xl">workspace_premium</span>
          </div>
          <p className="font-bold text-sm mb-1">SpeakEasy Pro</p>
          <p className="text-xs text-slate-300 mb-3">Prática de IA ilimitada.</p>
          <button className="text-xs font-semibold bg-primary text-white px-3 py-2 rounded-lg w-full hover:bg-primary-dark transition-colors shadow-glow">
            Ver Planos
          </button>
        </div>

        <div className="flex items-center gap-3 px-2 py-2 mt-2 border-t border-slate-100 pt-4">
          <button onClick={() => setActiveTab(NavigationTab.PROFILE)} className="flex items-center gap-3 w-full text-left group">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-white shadow-sm shrink-0 group-hover:border-primary transition-colors"
              style={{ backgroundImage: `url(${user.avatar})` }}
            />
            <div className="flex flex-col overflow-hidden">
              <p className="text-sm font-bold leading-none truncate group-hover:text-primary transition-colors">{user.name}</p>
              <p className="text-xs text-text-muted mt-1 truncate">{user.email}</p>
            </div>
          </button>
          <button 
            onClick={() => setActiveTab(NavigationTab.SETTINGS)}
            className={`ml-auto text-text-muted hover:text-primary transition-colors ${activeTab === NavigationTab.SETTINGS ? 'text-primary' : ''}`}
          >
            <span className={`material-symbols-outlined ${activeTab === NavigationTab.SETTINGS ? 'filled-icon' : ''}`}>settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
