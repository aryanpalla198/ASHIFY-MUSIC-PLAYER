import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
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
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFriends, setShowFriends] = useState(false);

  return (
    <div className="app-container">
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

      {/* Mobile Bottom Navigation (6 Side-by-Side Tabs) */}
      <div className="botnav-container bg-slate-950/95 border-t border-slate-800/80 flex items-center justify-around px-2 z-30">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center gap-1 transition-all ${
            activeTab === 'home' ? 'text-sky-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-4.5 h-4.5" />
          <span className="text-[9px] font-semibold">Home</span>
        </button>

        <button
          onClick={() => setActiveTab('search')}
          className={`flex flex-col items-center justify-center gap-1 transition-all ${
            activeTab === 'search' ? 'text-sky-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search className="w-4.5 h-4.5" />
          <span className="text-[9px] font-semibold">Search</span>
        </button>

        <button
          onClick={() => setActiveTab('library')}
          className={`flex flex-col items-center justify-center gap-1 transition-all ${
            activeTab === 'library' ? 'text-sky-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Library className="w-4.5 h-4.5" />
          <span className="text-[9px] font-semibold">Library</span>
        </button>

        <button
          onClick={() => setActiveTab('podcasts')}
          className={`flex flex-col items-center justify-center gap-1 transition-all ${
            activeTab === 'podcasts' ? 'text-sky-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Mic className="w-4.5 h-4.5" />
          <span className="text-[9px] font-semibold">Podcasts</span>
        </button>

        <button
          onClick={() => setActiveTab('charts')}
          className={`flex flex-col items-center justify-center gap-1 transition-all ${
            activeTab === 'charts' ? 'text-sky-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trophy className="w-4.5 h-4.5" />
          <span className="text-[9px] font-semibold">Charts</span>
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
