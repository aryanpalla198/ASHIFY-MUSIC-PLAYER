import React from 'react';
import { ChevronLeft, ChevronRight, Search, User, LogOut, Disc, Home, Library, Mic, Trophy, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePlayer } from '../context/PlayerContext';
import { CATEGORIES } from '../data/songs';

export const Navbar = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, activeTab, setActiveTab }) => {
  const { user, logout, setIsAuthModalOpen } = useAuth();
  const { sidebarState, setSidebarState } = usePlayer();

  return (
    <header className="sticky top-0 z-10 flex flex-col gap-3 px-4 py-3 md:px-6 md:py-4 glass-panel border-b border-slate-800/80 bg-slate-950/80">
      
      {/* Mobile Top Row: Logo & Profile */}
      <div className="mobile-only-flex items-center justify-between w-full">
        {/* ASHIFY Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center font-black text-slate-950 text-base shadow-sm shadow-sky-500/10">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg leading-none tracking-wider text-white animate-pulse" style={{ fontFamily: 'Outfit' }}>
              ASHIFY
            </span>
            <span className="text-[9px] font-extrabold tracking-widest text-sky-400 uppercase -mt-0.5 leading-none">
              ARYAN
            </span>
          </div>
        </div>
        {/* Profile wrapper on mobile */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[10px] text-slate-200 font-medium"
              >
                <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover" />
                <span className="truncate max-w-[60px]">{user.name}</span>
              </button>
              <button
                onClick={logout}
                className="w-7 h-7 rounded-full bg-slate-800/80 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-slate-400"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="btn-primary text-xs py-1 px-3"
            >
              <User className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>



      <div className="flex items-center justify-between gap-4 w-full">
        {/* Navigation History & Search */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="desktop-only-flex items-center gap-2">
            <button 
              onClick={() => setSidebarState(sidebarState === 'closed' ? 'normal' : 'closed')}
              className={`w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-all mr-1 ${sidebarState !== 'closed' ? 'text-sky-400' : ''}`}
              title={sidebarState === 'closed' ? "Show Sidebar" : "Hide Sidebar"}
            >
              <Menu className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('home')}
              className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('search')}
              className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Search Box */}
          <div className={`relative flex-1 lg:max-w-md w-full ${activeTab === 'search' ? 'block' : 'hidden lg:block'}`}>
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search songs, artists, mixes..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'search' && e.target.value.trim().length > 0) {
                  setActiveTab('search');
                }
              }}
              className="w-full bg-slate-900/90 text-slate-100 text-sm pl-10 pr-4 py-2.5 rounded-full border border-slate-700/80 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* User Auth Action (Desktop only) */}
        <div className="desktop-only-flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-sm text-slate-200 font-medium transition-all"
              >
                <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                <span className="truncate max-w-[100px]">{user.name}</span>
              </button>
              <button
                onClick={logout}
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-slate-400 transition-all"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="btn-primary text-sm py-2 px-5"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Genre Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-sky-400 text-slate-950 font-bold shadow-md shadow-sky-400/20 scale-105'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </header>
  );
};
