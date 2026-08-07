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
import { FriendActivityDrawer } from './components/FriendActivityDrawer';

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
      <div className="flex flex-col flex-1 overflow-hidden relative">
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

      {/* Overlays and Modals */}
      <AuthModal />
      <AudioVisualizer />
      <LyricsModal />
      <QueueDrawer />
      <EqualizerModal />
      <FullScreenPlayer />
      <SettingsModal />
      <FriendActivityDrawer isOpen={showFriends} setIsOpen={setShowFriends} />
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
