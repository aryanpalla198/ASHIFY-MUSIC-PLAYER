import React, { useEffect, useRef } from 'react';
import { X, Mic2, Music } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export const LyricsModal = () => {
  const { currentSong, currentTime, showLyrics, setShowLyrics, handleSeek } = usePlayer();
  const activeLineRef = useRef(null);

  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentTime]);

  if (!showLyrics) return null;

  const getActiveLyricIndex = () => {
    if (!currentSong.lyrics || currentSong.lyrics.length === 0) return -1;
    let index = 0;
    for (let i = 0; i < currentSong.lyrics.length; i++) {
      if (currentTime >= currentSong.lyrics[i].time) {
        index = i;
      } else {
        break;
      }
    }
    return index;
  };

  const activeIndex = getActiveLyricIndex();

  return (
    <div className="fixed inset-0 z-40 flex flex-col p-6 bg-slate-950/95 backdrop-blur-2xl animate-fade-in">
      {/* Background Cover Glow */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none filter blur-3xl scale-125 transition-all duration-1000"
        style={{
          backgroundImage: `url(${currentSong.coverUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-400/30">
            <Mic2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white" style={{ fontFamily: 'Outfit' }}>
              Live Synced Lyrics
            </h3>
            <p className="text-xs text-sky-400 font-medium">{currentSong.title} — {currentSong.artist}</p>
          </div>
        </div>
        <button
          onClick={() => setShowLyrics(false)}
          className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Lyrics Content */}
      <div className="relative z-10 flex-1 overflow-y-auto my-8 px-4 flex flex-col items-center justify-start gap-8 no-scrollbar">
        {currentSong.lyrics && currentSong.lyrics.length > 0 ? (
          currentSong.lyrics.map((line, idx) => {
            const isActive = idx === activeIndex;
            return (
              <p
                key={idx}
                ref={isActive ? activeLineRef : null}
                onClick={() => handleSeek(line.time)}
                className={`text-center font-extrabold text-2xl md:text-3xl lg:text-4xl cursor-pointer transition-all duration-300 max-w-2xl px-4 py-2 rounded-2xl ${
                  isActive
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-white scale-110 drop-shadow-[0_0_20px_rgba(56,189,248,0.5)] font-black'
                    : 'text-slate-500 hover:text-slate-300 opacity-60'
                }`}
                style={{ fontFamily: 'Outfit' }}
              >
                {line.text}
              </p>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-slate-500 gap-3">
            <Music className="w-12 h-12 stroke-[1.5]" />
            <p className="text-base font-semibold">Instrumental track — No lyrics available</p>
          </div>
        )}
      </div>
    </div>
  );
};
