import React from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, 
  Volume2, VolumeX, Heart, Mic2, Activity, ListMusic, 
  Maximize2, Sliders, Settings, Volume1 
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export const PlayerBar = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    isRepeat,
    likedSongIds,
    showLyrics,
    showVisualizer,
    showQueue,
    audioError,
    togglePlay,
    handleSeek,
    handleVolumeChange,
    toggleMute,
    handleNextTrack,
    handlePrevTrack,
    setIsShuffle,
    setIsRepeat,
    toggleLikeSong,
    setShowLyrics,
    setShowVisualizer,
    setShowQueue,
    setShowFullScreenPlayer,
    setShowEqualizer,
    setShowSettings
  } = usePlayer();

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const isLiked = likedSongIds.includes(currentSong.id);

  return (
    <footer className="col-span-2 glass-panel z-30 flex items-center justify-between px-4 md:px-6 border-t border-slate-800 bg-slate-950/95 relative" style={{ height: '100%', gridArea: 'player' }}>
      
      {/* Mobile Top Progress Bar Line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-slate-800/80 md:hidden">
        <div 
          className="h-full bg-sky-400 transition-all duration-100" 
          style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
        />
      </div>

      {/* Left: Track Information */}
      <div className="flex items-center gap-3 flex-1 md:flex-initial md:w-1/4 min-w-0">
        <div 
          onClick={() => setShowFullScreenPlayer(true)}
          className="relative group cursor-pointer flex-shrink-0"
          title="Click for Spotify Fullscreen View"
        >
          <img
            src={currentSong.coverUrl}
            alt={currentSong.title}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-xl object-cover border border-slate-700/80 shadow-md transition-all group-hover:scale-105 ${isPlaying ? 'shadow-sky-500/20' : ''}`}
          />
          <div className="absolute inset-0 bg-slate-950/40 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <Maximize2 className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="flex flex-col truncate flex-1 min-w-0" onClick={() => setShowFullScreenPlayer(true)}>
          <h4 className="font-bold text-sm text-slate-100 truncate hover:text-sky-300 cursor-pointer" style={{ fontFamily: 'Outfit' }}>
            {currentSong.title}
          </h4>
          <span className="text-xs text-slate-400 truncate hover:text-slate-200 cursor-pointer">
            {currentSong.artist}
          </span>
        </div>

        <button
          onClick={() => toggleLikeSong(currentSong.id)}
          className={`p-2 rounded-full transition-colors flex-shrink-0 ${
            isLiked ? 'text-sky-400 hover:text-sky-300' : 'text-slate-500 hover:text-slate-300'
          }`}
          title={isLiked ? "Unlike Song" : "Like Song"}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-sky-400' : ''}`} />
        </button>
      </div>

      {/* Center: Controls & Seek Bar (Desktop only) */}
      <div className="hidden md:flex flex-col items-center gap-1.5 flex-1 max-w-xl px-4">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsShuffle(!isShuffle)}
            className={`p-1.5 rounded-full transition-colors ${
              isShuffle ? 'text-sky-400 bg-sky-500/10' : 'text-slate-400 hover:text-white'
            }`}
            title="Shuffle"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrevTrack}
            className="text-slate-300 hover:text-sky-400 transition-colors"
            title="Previous Track"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          {/* Big Glowing Play/Pause Button */}
          <button
            onClick={togglePlay}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              isPlaying 
                ? 'bg-gradient-to-tr from-sky-400 to-blue-500 text-slate-950 shadow-lg shadow-sky-500/40 scale-105' 
                : 'bg-sky-400 text-slate-950 shadow-md shadow-sky-400/30 hover:scale-110 animate-bounce'
            }`}
            title={isPlaying ? "Pause" : "Click to Play Audio"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-slate-950" />
            ) : (
              <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
            )}
          </button>

          <button
            onClick={handleNextTrack}
            className="text-slate-300 hover:text-sky-400 transition-colors"
            title="Next Track"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsRepeat(!isRepeat)}
            className={`p-1.5 rounded-full transition-colors ${
              isRepeat ? 'text-sky-400 bg-sky-500/10' : 'text-slate-400 hover:text-white'
            }`}
            title="Repeat"
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        {/* Seek Bar */}
        <div className="flex items-center gap-3 w-full text-xs text-slate-400 font-medium">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime || 0}
            onChange={(e) => handleSeek(Number(e.target.value))}
            className="flex-1"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Mobile Play/Pause & Skip Controls */}
      <div className="flex md:hidden items-center gap-3 flex-shrink-0">
        <button
          onClick={() => setIsShuffle(!isShuffle)}
          className={`p-1 transition-colors ${
            isShuffle ? 'text-sky-400' : 'text-slate-400 hover:text-white'
          }`}
          title="Shuffle"
        >
          <Shuffle className="w-4 h-4" />
        </button>
        <button
          onClick={handlePrevTrack}
          className="text-slate-300 hover:text-sky-400 active:scale-95 transition-transform p-1"
          title="Previous Track"
        >
          <SkipBack className="w-4 h-4" />
        </button>
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-sky-400 text-slate-950 flex items-center justify-center shadow-md active:scale-95 transition-transform"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-slate-950" />
          ) : (
            <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
          )}
        </button>
        <button
          onClick={handleNextTrack}
          className="text-slate-300 hover:text-sky-400 active:scale-95 transition-transform p-1"
          title="Next Track"
        >
          <SkipForward className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsRepeat(!isRepeat)}
          className={`p-1 transition-colors ${
            isRepeat ? 'text-sky-400' : 'text-slate-400 hover:text-white'
          }`}
          title="Repeat"
        >
          <Repeat className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Extra Controls (Desktop only) */}
      <div className="hidden md:flex items-center justify-end gap-2 w-1/4 min-w-[200px]">
        <button
          onClick={() => setShowLyrics(!showLyrics)}
          className={`p-2 rounded-xl transition-all ${
            showLyrics ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
          title="Synced Karaoke Lyrics"
        >
          <Mic2 className="w-4 h-4" />
        </button>

        <button
          onClick={() => setShowVisualizer(!showVisualizer)}
          className={`p-2 rounded-xl transition-all ${
            showVisualizer ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
          title="Spectrum Audio Visualizer"
        >
          <Activity className="w-4 h-4" />
        </button>

        <button
          onClick={() => setShowEqualizer(true)}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
          title="Audio Equalizer & FX"
        >
          <Sliders className="w-4 h-4" />
        </button>

        <button
          onClick={() => setShowSettings(true)}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
          title="ASH Player Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        <button
          onClick={() => setShowQueue(!showQueue)}
          className={`p-2 rounded-xl transition-all ${
            showQueue ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
          title="Play Queue"
        >
          <ListMusic className="w-4 h-4" />
        </button>

        {/* Volume Slider */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <button onClick={toggleMute} className="text-slate-400 hover:text-slate-200">
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(Number(e.target.value))}
            className="w-16"
          />
        </div>
      </div>
    </footer>
  );
};
