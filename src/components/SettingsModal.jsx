import React from 'react';
import { X, Settings, Radio, Sliders, Volume2, ShieldCheck } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export const SettingsModal = () => {
  const { 
    showSettings, 
    setShowSettings, 
    audioQuality, 
    setAudioQuality, 
    crossfade, 
    setCrossfade,
    setShowEqualizer
  } = usePlayer();

  if (!showSettings) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md p-6 glass-panel rounded-3xl border border-sky-500/30 shadow-2xl bg-slate-900/90 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={() => setShowSettings(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-400/30">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white" style={{ fontFamily: 'Outfit' }}>
              ASH Player Settings
            </h3>
            <p className="text-xs text-slate-400">Audio playback preferences & quality</p>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {/* Audio Streaming Quality */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Streaming Audio Quality</label>
            <select
              value={audioQuality}
              onChange={(e) => setAudioQuality(e.target.value)}
              className="w-full bg-slate-950/80 text-sm text-slate-100 p-3 rounded-xl border border-slate-700 focus:border-sky-400 focus:outline-none"
            >
              <option value="Standard 160kbps">Standard (160 kbps MP3)</option>
              <option value="High 320kbps">High (320 kbps High Quality)</option>
              <option value="Ultra HD Lossless">Ultra HD Lossless (FLAC 24-bit/96kHz)</option>
            </select>
          </div>

          {/* Crossfade Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Track Crossfade</label>
              <span className="text-xs font-mono text-sky-400 font-bold">{crossfade} seconds</span>
            </div>
            <input
              type="range"
              min="0"
              max="12"
              value={crossfade}
              onChange={(e) => setCrossfade(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-[11px] text-slate-500 mt-1">Fades out current track while fading in next track.</p>
          </div>

          {/* Equalizer Shortcut */}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setShowSettings(false);
                setShowEqualizer(true);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-sm font-semibold text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-sky-400" />
                <span>Open Audio Equalizer & FX</span>
              </div>
              <span className="text-xs text-sky-400">Configure</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
