import React from 'react';
import { X, ListMusic, Play } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export const QueueDrawer = () => {
  const { queue, currentSong, playSong, showQueue, setShowQueue } = usePlayer();

  if (!showQueue) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full max-w-sm glass-panel bg-slate-950/95 border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl animate-fade-in">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-lg" style={{ fontFamily: 'Outfit' }}>
          <ListMusic className="w-5 h-5" />
          <span>Play Queue ({queue.length})</span>
        </div>
        <button
          onClick={() => setShowQueue(false)}
          className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Now Playing</span>
        
        {/* Currently Playing Card */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-sky-500/10 border border-sky-400/30">
          <img src={currentSong.coverUrl} alt={currentSong.title} className="w-12 h-12 rounded-xl object-cover" />
          <div className="flex-1 truncate">
            <h4 className="font-bold text-sm text-sky-300 truncate">{currentSong.title}</h4>
            <p className="text-xs text-slate-400 truncate">{currentSong.artist}</p>
          </div>
          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-sky-400 text-slate-950">Active</span>
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-4 mb-1">Up Next</span>

        {queue.map((song, index) => {
          const isCurrent = song.id === currentSong.id;
          return (
            <div
              key={song.id + '-' + index}
              onClick={() => playSong(song)}
              className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                isCurrent
                  ? 'bg-slate-800/60 opacity-60 pointer-events-none'
                  : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
              }`}
            >
              <span className="text-xs font-bold text-slate-500 w-4 text-center">{index + 1}</span>
              <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded-lg object-cover" />
              <div className="flex-1 truncate">
                <p className="font-semibold text-xs truncate">{song.title}</p>
                <p className="text-[11px] text-slate-400 truncate">{song.artist}</p>
              </div>
              <Play className="w-3.5 h-3.5 text-slate-500 opacity-0 group-hover:opacity-100" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
