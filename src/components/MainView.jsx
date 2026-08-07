import React from 'react';
import { 
  Play, Pause, Heart, Clock, Music, Sparkles, Disc, User, Flame, 
  Trophy, Mic, Radio, PlayCircle, Star 
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { 
  FEATURED_PLAYLISTS, 
  CATEGORIES, 
  MADE_FOR_YOU_MIXES, 
  PODCAST_EPISODES 
} from '../data/songs';

export const MainView = ({ activeTab, searchQuery, selectedCategory, setActiveTab }) => {
  const {
    songs,
    currentSong,
    isPlaying,
    playSong,
    togglePlay,
    likedSongIds,
    toggleLikeSong,
    playlists
  } = usePlayer();

  const starboyTrack = songs.find(s => s.id === 'weeknd-starboy') || songs[0];

  const formatDuration = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const filteredSongs = songs.filter(song => {
    const matchesSearch = 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.genre.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || song.genre === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const likedSongs = songs.filter(s => likedSongIds.includes(s.id));

  // Determine current active view content
  const renderContent = () => {
    if (activeTab === 'podcasts') {
      return (
        <div className="flex flex-col gap-6 animate-fade-in">
          <div className="flex items-end gap-6 p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-slate-800">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-700 flex items-center justify-center shadow-xl">
              <Mic className="w-14 h-14 text-slate-950" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">SPOTIFY PODCASTS</span>
              <h2 className="text-4xl font-black text-white" style={{ fontFamily: 'Outfit' }}>
                Podcasts & Shows
              </h2>
              <p className="text-xs text-slate-300 mt-1">Deep dives into Starboy, synthwave, and audio sound engineering.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PODCAST_EPISODES.map(pod => (
              <div key={pod.id} className="glass-card p-5 rounded-2xl border border-slate-800 flex gap-4">
                <img src={pod.coverUrl} alt={pod.title} className="w-24 h-24 rounded-xl object-cover" />
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-400">{pod.show} • {pod.host}</span>
                    <h4 className="font-bold text-base text-white mt-0.5">{pod.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">{pod.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-slate-500 font-mono">{formatDuration(pod.duration)}</span>
                    <button
                      onClick={() => playSong({
                        id: pod.id,
                        title: pod.title,
                        artist: pod.host,
                        album: pod.show,
                        duration: pod.duration,
                        coverUrl: pod.coverUrl,
                        audioUrl: pod.audioUrl,
                        lyrics: [{ time: 0, text: pod.description }]
                      })}
                      className="btn-primary py-1.5 px-4 text-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Listen Episode</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'charts') {
      return (
        <div className="flex flex-col gap-6 animate-fade-in">
          <div className="flex items-end gap-6 p-8 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 border border-slate-800">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-600 flex items-center justify-center shadow-xl">
              <Trophy className="w-14 h-14 text-slate-950" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">GLOBAL CHARTS</span>
              <h2 className="text-4xl font-black text-white" style={{ fontFamily: 'Outfit' }}>
                Top 50 Global (#1 Starboy)
              </h2>
              <p className="text-xs text-slate-300 mt-1">The most played tracks worldwide on ASH.</p>
            </div>
          </div>

          <TrackTable songsList={songs} showRank={true} />
        </div>
      );
    }

    if (activeTab === 'search') {
      return (
        <div className="flex flex-col gap-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-extrabold text-white mb-2" style={{ fontFamily: 'Outfit' }}>
              Search Results {searchQuery ? `for "${searchQuery}"` : ''}
            </h2>
            <p className="text-xs text-slate-400">Discover Starboy, The Weeknd, synthwave, and chill audio tracks on ASH.</p>
          </div>

          {filteredSongs.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredSongs.map(song => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 bg-slate-900/40 rounded-3xl border border-slate-800">
              <Music className="w-12 h-12 mx-auto mb-3 stroke-[1.5]" />
              <p className="text-lg font-bold text-slate-300">No songs found matching your search</p>
            </div>
          )}
        </div>
      );
    }

    if (activeTab === 'library' || activeTab === 'liked') {
      const displaySongs = activeTab === 'liked' ? likedSongs : songs;
      return (
        <div className="flex flex-col gap-6 animate-fade-in">
          <div className="flex items-end gap-6 p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950/60 to-slate-900 border border-slate-800 shadow-xl">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl">
              <Heart className="w-16 h-16 text-slate-950 fill-slate-950" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">PLAYLIST</span>
              <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: 'Outfit' }}>
                {activeTab === 'liked' ? 'Liked Songs' : 'Your ASH Library'}
              </h2>
              <p className="text-xs text-slate-300 font-medium">
                {displaySongs.length} tracks • Saved by you
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => displaySongs.length > 0 && playSong(displaySongs[0])}
              className="btn-primary"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>Play All</span>
            </button>
          </div>

          <TrackTable songsList={displaySongs} />
        </div>
      );
    }

    if (activeTab.startsWith('playlist-')) {
      const plId = activeTab.replace('playlist-', '');
      const pl = playlists.find(p => p.id === plId);
      const plSongs = songs.filter(s => pl?.songIds.includes(s.id));

      return (
        <div className="flex flex-col gap-6 animate-fade-in">
          <div className="flex items-end gap-6 p-8 rounded-3xl bg-slate-900/90 border border-slate-800">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-700 flex items-center justify-center text-3xl font-black text-white">
              {pl?.title[0]}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">PLAYLIST</span>
              <h2 className="text-3xl font-bold text-white mt-1">{pl?.title || "Custom Playlist"}</h2>
              <p className="text-xs text-slate-400 mt-2">{plSongs.length} tracks saved by you</p>
            </div>
          </div>

          <TrackTable songsList={plSongs} />
        </div>
      );
    }

    // Default Home View
    return (
      <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
        
        {/* Starboy Featured Hero Banner */}
        <div className="relative p-5 md:p-10 rounded-3xl overflow-hidden glass-panel border border-sky-500/40 bg-gradient-to-r from-slate-950 via-sky-950 to-slate-900 shadow-2xl">
          <div className="relative z-10 max-w-xl flex flex-col gap-2 md:gap-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-400/40 text-red-300 text-[10px] md:text-xs font-extrabold w-max shadow-sm">
              <Star className="w-3.5 h-3.5 fill-red-400 text-red-400" />
              <span>FEATURED TRACK — THE WEEKND</span>
            </div>
            <h2 className="text-2xl md:text-5xl font-black text-white leading-tight" style={{ fontFamily: 'Outfit' }}>
              Starboy (Midnight R&B)
            </h2>
            <p className="hidden md:block text-xs md:text-sm text-slate-300">
              Listen to Starboy by The Weeknd with 808 sub-bass drops, synced karaoke lyrics, live spectrum visualizer, and 3-band parametric equalizer.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <button 
                onClick={() => playSong(starboyTrack)} 
                className="btn-primary py-3 px-6 text-base"
              >
                <Play className="w-5 h-5 fill-slate-950" />
                <span>Play Starboy Now</span>
              </button>
              <button onClick={() => setActiveTab('charts')} className="btn-secondary">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>#1 On Global Charts</span>
              </button>
            </div>
          </div>

          {/* Album Art Glow Backdrop */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block w-44 h-44 rounded-2xl overflow-hidden border-2 border-sky-400/40 shadow-2xl shadow-sky-500/30">
            <img src={starboyTrack.coverUrl} alt="Starboy Cover" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Quick Play Grid */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit' }}>
            Quick Play
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {songs.map(song => (
              <div
                key={song.id}
                onClick={() => {
                  if (currentSong.id === song.id) {
                    togglePlay();
                  } else {
                    playSong(song);
                  }
                }}
                className="flex items-center gap-4 p-2.5 rounded-2xl glass-card border border-slate-800 hover:border-sky-500/40 cursor-pointer group transition-all"
              >
                <img src={song.coverUrl} alt={song.title} className="w-14 h-14 rounded-xl object-cover shadow-md" />
                <div className="flex-1 truncate">
                  <h4 className="font-bold text-sm text-white truncate group-hover:text-sky-300 transition-colors">{song.title}</h4>
                  <p className="text-xs text-slate-400 truncate">{song.artist}</p>
                </div>
                <div className={`w-10 h-10 rounded-full bg-sky-400 text-slate-950 flex items-center justify-center transition-all scale-90 group-hover:scale-100 shadow-md ${currentSong.id === song.id && isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  {currentSong.id === song.id && isPlaying ? (
                    <Pause className="w-5 h-5 fill-slate-950" />
                  ) : (
                    <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Playlists */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit' }}>Featured Collections</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURED_PLAYLISTS.map(pl => (
              <div
                key={pl.id}
                onClick={() => playSong(starboyTrack)}
                className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-sky-500/30 cursor-pointer group flex items-center gap-4"
              >
                <img src={pl.coverUrl} alt={pl.title} className="w-20 h-20 rounded-xl object-cover shadow-lg" />
                <div>
                  <h4 className="font-bold text-lg text-white group-hover:text-sky-300">{pl.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{pl.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Hits Table */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-sky-400" />
            <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit' }}>Top 50 Global Songs</h3>
          </div>
          <TrackTable songsList={filteredSongs} showRank={true} />
        </div>
      </div>
    );
  };

  const SongCard = ({ song }) => (
    <div
      onClick={() => playSong(song)}
      className="glass-card p-3 rounded-2xl border border-slate-800/80 hover:border-sky-500/40 cursor-pointer group flex flex-col gap-2"
    >
      <img src={song.coverUrl} alt={song.title} className="w-full aspect-square rounded-xl object-cover" />
      <h4 className="font-bold text-sm text-white truncate group-hover:text-sky-300">{song.title}</h4>
      <p className="text-xs text-slate-400 truncate">{song.artist}</p>
    </div>
  );

  const TrackTable = ({ songsList, showRank = false }) => (
    <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/60">
      <table className="w-full text-left text-xs">
        <thead className="border-b border-slate-800 text-slate-400 uppercase font-bold tracking-wider">
          <tr>
            <th className="p-4 w-12 text-center">#</th>
            <th className="p-4">Title</th>
            <th className="p-4 hidden sm:table-cell">Album</th>
            <th className="p-4 hidden md:table-cell">Plays</th>
            <th className="p-4 w-16 text-center"><Clock className="w-4 h-4 mx-auto" /></th>
            <th className="p-4 w-16 text-center">Fav</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {songsList.map((song, index) => {
            const isCurrent = currentSong.id === song.id;
            const isLiked = likedSongIds.includes(song.id);
            return (
              <tr
                key={song.id}
                className={`hover:bg-slate-800/40 transition-colors group cursor-pointer ${
                  isCurrent ? 'bg-sky-500/10 text-sky-300 font-bold' : 'text-slate-300'
                }`}
              >
                <td className="p-4 text-center font-medium" onClick={() => playSong(song)}>
                  {showRank && index === 0 ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs">1</span>
                  ) : showRank && index === 1 ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-300 text-slate-950 font-black text-xs">2</span>
                  ) : showRank && index === 2 ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-700 text-white font-black text-xs">3</span>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </td>

                <td className="p-4 flex items-center gap-3" onClick={() => playSong(song)}>
                  <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="truncate">
                    <p className={`font-semibold text-sm truncate ${isCurrent ? 'text-sky-300' : 'text-white'}`}>
                      {song.title}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{song.artist}</p>
                  </div>
                </td>

                <td className="p-4 hidden sm:table-cell text-slate-400 truncate" onClick={() => playSong(song)}>
                  {song.album}
                </td>

                <td className="p-4 hidden md:table-cell text-slate-400 font-mono" onClick={() => playSong(song)}>
                  {song.plays}
                </td>

                <td className="p-4 text-center text-slate-400 font-mono" onClick={() => playSong(song)}>
                  {formatDuration(song.duration)}
                </td>

                <td className="p-4 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLikeSong(song.id);
                    }}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'text-sky-400 fill-sky-400' : 'text-slate-500 hover:text-slate-300'}`} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950">
      {renderContent()}
    </main>
  );
};
