import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider, usePlayer } from './context/PlayerContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { MainView } from './components/MainView';
import { PlayerBar } from './components/PlayerBar';
import { AuthModal } from './components/AuthModal';
import { AudioVisualizer } from './components/AudioVisualizer';
import { LyricsModal } from './components/LyricsModal';
import { QueueDrawer } from './components/QueueDrawer';
import { EqualizerModal } from './components/EqualizerModal';
import { FullScreenPlayer } from './components/FullScreenPlayer';
import { SettingsModal } from './components/SettingsModal';
import { Home, Search, Library, Mic, Trophy } from 'lucide-react';

export function AppContent() {
  const { sidebarState } = usePlayer();
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFriends, setShowFriends] = useState(false);

  return (
    <div className={`app-container ${
      sidebarState === 'closed'
        ? 'no-sidebar'
        : sidebarState === 'minimized'
          ? 'sidebar-minimized'
          : ''
    }`}>
      {/* Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        toggleFriends={() => setShowFriends(!showFriends)} 
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden relative" style={{ gridArea: 'main' }}>
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <MainView
          activeTab={activeTab}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Persistent Player Controls Bar */}
      <PlayerBar />

      {/* Mobile Bottom Navigation Bar */}
      <div 
        className="flex lg:hidden items-center justify-around bg-slate-950/95 border-t border-slate-900/50 py-2 z-30" 
        style={{ gridArea: 'mobile-nav' }}
      >
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'home' ? 'text-sky-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Home</span>
        </button>

        <button
          onClick={() => setActiveTab('search')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'search' ? 'text-sky-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Search</span>
        </button>

        <button
          onClick={() => setActiveTab('library')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'library' ? 'text-sky-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Library className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Your Library</span>
        </button>
      </div>

      {/* Overlays and Modals */}
      <AuthModal />
      <AudioVisualizer />
      <LyricsModal />
      <QueueDrawer />
      <EqualizerModal />
      <FullScreenPlayer />
      <SettingsModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <AppContent />
      </PlayerProvider>
    </AuthProvider>
  );
}
