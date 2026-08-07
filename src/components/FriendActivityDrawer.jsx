import React from 'react';
import { X, Users, Music2, Disc } from 'lucide-react';
import { FRIEND_ACTIVITY } from '../data/songs';

export const FriendActivityDrawer = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full max-w-xs glass-panel bg-slate-950/95 border-l border-slate-800 p-5 flex flex-col justify-between shadow-2xl animate-fade-in">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base" style={{ fontFamily: 'Outfit' }}>
          <Users className="w-5 h-5" />
          <span>Friend Activity</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800/60 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-4">
        {FRIEND_ACTIVITY.map(friend => (
          <div key={friend.id} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full object-cover border border-sky-400/40" />
            <div className="flex-1 truncate">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-200 truncate">{friend.name}</span>
                <span className="text-[10px] text-slate-500 font-mono">{friend.timeAgo}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-sky-400">
                <Disc className="w-3.5 h-3.5 animate-spin-slow" />
                <span className="text-xs font-semibold truncate">{friend.songTitle}</span>
              </div>
              <span className="text-[11px] text-slate-400 block truncate">{friend.artist}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
