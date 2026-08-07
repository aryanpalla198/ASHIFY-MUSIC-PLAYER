import React from 'react';
import { 
  ChevronDown, Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, 
  Heart, Mic2, Activity, Volume2, VolumeX, ListMusic 
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export const FullScreenPlayer = () => {
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
    showFullScreenPlayer,
    setShowFullScreenPlayer,
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
    setShowQueue
  } = usePlayer();

  if (!showFullScreenPlayer) return null;

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const isLiked = likedSongIds.includes(currentSong.id);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between p-8 bg-slate-950/95 backdrop-blur-3xl animate-fade-in text-white">
      {/* Background Image Blur */}
      <div 
        className="absolute inset-0 opacity-25 filter blur-3xl scale-125 pointer-events-none"
        style={{
          backgroundImage: `url(${currentSong.coverUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between">
        <button
          onClick={() => setShowFullScreenPlayer(false)}
          className="p-2.5 rounded-full bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-all"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
        
        <div className="text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-sky-400">PLAYING FROM ALBUM</span>
          <h3 className="font-bold text-sm text-slate-200">{currentSong.album}</h3>
        </div>

        <button
          onClick={() => setShowQueue(true)}
          className="p-2.5 rounded-full bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-all"
        >
          <ListMusic className="w-5 h-5" />
        </button>
      </div>

      {/* Main Cover & Details */}
      <div className="relative z-10 flex flex-col items-center gap-6 my-auto max-w-md mx-auto">
        <div className="relative group w-72 h-72 md:w-80 md:h-80">
          <img
            src={currentSong.coverUrl}
            alt={currentSong.title}
            className={`w-full h-full rounded-3xl object-cover border border-slate-700/80 shadow-2xl transition-all duration-500 ${
              isPlaying ? 'scale-105 shadow-sky-500/30 ring-4 ring-sky-400/20' : 'scale-95 opacity-80'
            }`}
          />
        </div>

        <div className="flex items-center justify-between w-full">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white" style={{ fontFamily: 'Outfit' }}>
              {currentSong.title}
            </h2>
            <p className="text-sm font-semibold text-sky-400 mt-1">{currentSong.artist}</p>
          </div>

          <button
            onClick={() => toggleLikeSong(currentSong.id)}
            className="p-3 rounded-full hover:bg-slate-800/40 transition-transform active:scale-95"
          >
            <Heart className={`w-7 h-7 ${isLiked ? 'text-sky-400 fill-sky-400' : 'text-slate-500'}`} />
          </button>
        </div>

        {/* Seek Bar */}
        <div className="w-full flex flex-col gap-1.5 mt-2">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime || 0}
            onChange={(e) => handleSeek(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs font-semibold text-slate-400 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Big Control Buttons */}
        <div className="flex items-center justify-between w-full max-w-xs mt-2">
          <button
            onClick={() => setIsShuffle(!isShuffle)}
            className={`p-2 rounded-full ${isShuffle ? 'text-sky-400' : 'text-slate-400'}`}
          >
            <Shuffle className="w-5 h-5" />
          </button>

          <button onClick={handlePrevTrack} className="text-slate-200 hover:text-sky-400">
            <SkipBack className="w-7 h-7" />
          </button>

          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-sky-400 to-blue-500 text-slate-950 flex items-center justify-center shadow-xl shadow-sky-500/40 hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? <Pause className="w-8 h-8 fill-slate-950" /> : <Play className="w-8 h-8 fill-slate-950 ml-1" />}
          </button>

          <button onClick={handleNextTrack} className="text-slate-200 hover:text-sky-400">
            <SkipForward className="w-7 h-7" />
          </button>

          <button
            onClick={() => setIsRepeat(!isRepeat)}
            className={`p-2 rounded-full ${isRepeat ? 'text-sky-400' : 'text-slate-400'}`}
          >
            <Repeat className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Quick Toggles */}
      <div className="relative z-10 flex items-center justify-center gap-6 max-w-xs mx-auto">
        <button
          onClick={() => {
            setShowFullScreenPlayer(false);
            setShowLyrics(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-xs font-bold text-sky-400 border border-sky-400/30"
        >
          <Mic2 className="w-4 h-4" />
          <span>Synced Lyrics</span>
        </button>

        <button
          onClick={() => {
            setShowFullScreenPlayer(false);
            setShowVisualizer(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-xs font-bold text-sky-400 border border-sky-400/30"
        >
          <Activity className="w-4 h-4" />
          <span>Spectrum Wave</span>
        </button>
      </div>
    </div>
  );
};
