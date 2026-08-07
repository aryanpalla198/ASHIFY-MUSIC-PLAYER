import React from 'react';
import { 
  Home, Search, Library, Heart, PlusSquare, Disc3, Music2, 
  Radio, Mic, Trophy, Users, User 
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ activeTab, setActiveTab, toggleFriends }) => {
  const { playlists, likedSongIds, createPlaylist } = usePlayer();
  const { user, setIsAuthModalOpen } = useAuth();

  const handleCreatePlaylist = () => {
    const title = prompt("Enter new playlist name:", "ASH Night Mix #" + (playlists.length + 1));
    if (title) {
      createPlaylist(title);
    }
  };

  return (
    <aside className="sidebar-container glass-panel flex flex-col justify-between p-4 z-20 border-r border-slate-800" style={{ background: '#0a0f1d' }}>
      <div className="flex flex-col gap-5">
        
        {/* ASH Brand Logo Emblem & Window Controls */}
        <div className="flex items-center justify-between px-2">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-400 via-cyan-300 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:scale-105 transition-transform border border-sky-300/40">
              <span className="text-slate-950 font-black text-2xl tracking-tighter" style={{ fontFamily: 'Outfit' }}>A</span>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-200 to-blue-400" style={{ fontFamily: 'Outfit' }}>
                ASHIFY
              </h1>
              <span className="text-[10px] tracking-widest uppercase text-slate-400 font-bold block -mt-1">
                ARYAN
              </span>
            </div>
          </div>
          
          {/* Mock Windows Controls */}
          <div className="flex items-center gap-1">
            <button className="w-6 h-6 rounded border border-slate-700 hover:border-sky-400 bg-slate-950 flex items-center justify-center text-slate-400 hover:text-sky-400 text-xs font-bold transition-colors" title="Minimize">-</button>
            <button className="w-6 h-6 rounded border border-slate-700 hover:border-sky-400 bg-slate-950 flex items-center justify-center text-slate-400 hover:text-sky-400 text-[10px] font-bold transition-colors" title="Maximize">▢</button>
            <button className="w-6 h-6 rounded border border-slate-700 hover:border-red-500 hover:bg-red-500/20 bg-slate-950 flex items-center justify-center text-slate-400 hover:text-red-400 text-xs font-bold transition-colors" title="Close">✕</button>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="flex flex-col gap-1">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-4 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'home'
                ? 'bg-slate-800/90 text-sky-400 border-l-4 border-sky-400 shadow-md shadow-sky-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-4 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'search'
                ? 'bg-slate-800/90 text-sky-400 border-l-4 border-sky-400 shadow-md shadow-sky-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-4 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'library'
                ? 'bg-slate-800/90 text-sky-400 border-l-4 border-sky-400 shadow-md shadow-sky-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Library className="w-5 h-5" />
            <span>Your Library</span>
          </button>

          <button
            onClick={() => setActiveTab('podcasts')}
            className={`flex items-center gap-4 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'podcasts'
                ? 'bg-slate-800/90 text-sky-400 border-l-4 border-sky-400 shadow-md shadow-sky-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Mic className="w-5 h-5" />
            <span>Podcasts & Shows</span>
          </button>

          <button
            onClick={() => setActiveTab('charts')}
            className={`flex items-center gap-4 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'charts'
                ? 'bg-slate-800/90 text-sky-400 border-l-4 border-sky-400 shadow-md shadow-sky-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span>Top 50 Global</span>
          </button>

          <button
            onClick={toggleFriends}
            className="flex items-center gap-4 px-4 py-2.5 rounded-xl font-medium text-sm transition-all text-slate-400 hover:text-sky-300 hover:bg-slate-800/40"
          >
            <Users className="w-5 h-5" />
            <span>Friend Activity</span>
          </button>
        </nav>

        {/* Library Shortcuts */}
        <div className="pt-3 border-t border-slate-800/80">
          <div className="px-4 pb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">PLAYLISTS</span>
            <button 
              onClick={handleCreatePlaylist}
              className="text-slate-400 hover:text-sky-400 transition-colors"
              title="Create Playlist"
            >
              <PlusSquare className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
            <button
              onClick={() => setActiveTab('liked')}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-xs transition-all ${
                activeTab === 'liked'
                  ? 'bg-sky-500/10 text-sky-400 font-bold'
                  : 'text-slate-300 hover:bg-slate-800/30'
              }`}
            >
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-sm">
                <Heart className="w-3 h-3 text-white fill-white" />
              </div>
              <span className="truncate">Liked Songs ({likedSongIds.length})</span>
            </button>

            {playlists.map(pl => (
              <button
                key={pl.id}
                onClick={() => setActiveTab(`playlist-${pl.id}`)}
                className={`flex items-center gap-3 px-4 py-2 text-xs transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 rounded-lg`}
              >
                <Music2 className="w-3.5 h-3.5 text-slate-500" />
                <span className="truncate">{pl.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* User Auth Section (No lady avatar photo) */}
      <div className="pt-3 border-t border-slate-800/80">
        {user ? (
          <div 
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 cursor-pointer transition-all"
          >
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-8 h-8 rounded-full object-cover border border-sky-400/50 shadow-sm" 
            />
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-slate-200 truncate">{user.name}</span>
              <span className="text-[10px] text-sky-400 font-semibold">{user.plan}</span>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full btn-primary justify-center text-xs py-2.5"
          >
            <User className="w-4 h-4" />
            <span>Login to ASH</span>
          </button>
        )}
      </div>
    </aside>
  );
};
