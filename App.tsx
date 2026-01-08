
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import AIChat from './views/AIChat';
import Courses from './views/Courses';
import Community from './views/Community';
import Library from './views/Library';
import Profile from './views/Profile';
import LessonView from './views/Lesson';
import Login from './views/Login';
import Signup from './views/Signup';
import LandingPage from './views/LandingPage';
import Pricing from './views/Pricing';
import Settings from './views/Settings';
import AboutUs from './views/AboutUs';
import { User, NavigationTab } from './types';

const MOCK_USER: User = {
  id: 'user-123',
  name: 'Ana Silva',
  email: 'ana.silva@unitel.ao',
  avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80&w=150',
  xp: 4520,
  streak: 12,
  level: 'B1 - Intermédio'
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [authScreen, setAuthScreen] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.DASHBOARD);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('speakeasy_auth');
    if (saved === 'true') {
      setIsAuthenticated(true);
      setShowLanding(false);
      setUser(MOCK_USER);
    }
  }, []);

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setShowLanding(false);
    setUser({ ...MOCK_USER, email });
    localStorage.setItem('speakeasy_auth', 'true');
  };

  const handleSignup = (userData: Partial<User>) => {
    setIsAuthenticated(true);
    setShowLanding(false);
    setUser({ ...MOCK_USER, ...userData } as User);
    localStorage.setItem('speakeasy_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLanding(true);
    setUser(null);
    localStorage.removeItem('speakeasy_auth');
    setActiveTab(NavigationTab.DASHBOARD);
  };

  const navigateToAuth = (screen: 'login' | 'signup') => {
    setAuthScreen(screen);
    setShowLanding(false);
  };

  if (showLanding && !isAuthenticated) {
    return (
      <LandingPage 
        onStart={() => navigateToAuth('signup')} 
        onLogin={() => navigateToAuth('login')} 
      />
    );
  }

  if (!isAuthenticated) {
    return authScreen === 'login' ? (
      <Login 
        onLogin={handleLogin} 
        onSwitchToSignup={() => setAuthScreen('signup')} 
      />
    ) : (
      <Signup 
        onSignup={handleSignup} 
        onSwitchToLogin={() => setAuthScreen('login')} 
      />
    );
  }

  const renderContent = () => {
    if (!user) return null;
    switch (activeTab) {
      case NavigationTab.DASHBOARD:
        return <Dashboard user={user} onStartLesson={() => setActiveTab(NavigationTab.LESSON)} />;
      case NavigationTab.AI_CHAT:
        return <AIChat user={user} />;
      case NavigationTab.COURSES:
        return <Courses onSelectCourse={() => setActiveTab(NavigationTab.LESSON)} />;
      case NavigationTab.COMMUNITY:
        return <Community />;
      case NavigationTab.LIBRARY:
        return <Library />;
      case NavigationTab.PROFILE:
        return <Profile user={user} onLogout={handleLogout} />;
      case NavigationTab.LESSON:
        return <LessonView onFinish={() => setActiveTab(NavigationTab.DASHBOARD)} />;
      case NavigationTab.PRICING:
        return <Pricing />;
      case NavigationTab.SETTINGS:
        return <Settings user={user} />;
      case NavigationTab.ABOUT_US:
        return <AboutUs />;
      default:
        return <Dashboard user={user} onStartLesson={() => setActiveTab(NavigationTab.LESSON)} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden animate-in fade-in duration-500">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user!} />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 lg:px-10 py-5 bg-background sticky top-0 shrink-0 z-20">
          <div className="flex-1" />
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-white rounded-2xl px-4 py-2.5 shadow-soft w-80 border border-slate-50 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
              <span className="material-symbols-outlined text-text-muted">search</span>
              <input 
                className="bg-transparent border-none text-sm w-full focus:ring-0 text-text-main placeholder:text-slate-400 ml-2 font-medium" 
                placeholder="Pesquisar lições, vocabulário..." 
                type="text"
              />
            </div>
            
            <button className="relative size-11 bg-white rounded-2xl shadow-soft border border-slate-50 text-text-muted hover:text-primary transition-all active:scale-95">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <button onClick={() => setActiveTab(NavigationTab.PROFILE)} className="lg:hidden p-1 border-2 border-primary rounded-full">
               <div className="size-8 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${user!.avatar})` }} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10 hide-scrollbar">
          <div className="max-w-6xl mx-auto h-full">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
