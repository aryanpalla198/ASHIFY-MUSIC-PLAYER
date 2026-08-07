import React from 'react';
import { X, Sliders, Volume2, Sparkles } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

const PRESETS = ['Flat', 'Bass Boost', 'Electronic / Synth', 'Vocal Boost', 'Club / Dance'];

export const EqualizerModal = () => {
  const { 
    showEqualizer, 
    setShowEqualizer, 
    eqPreset, 
    applyEqPreset, 
    eqGains, 
    setEqBandGains 
  } = usePlayer();

  if (!showEqualizer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg p-6 glass-panel rounded-3xl border border-sky-500/30 shadow-2xl bg-slate-900/90 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={() => setShowEqualizer(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-400/30">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white" style={{ fontFamily: 'Outfit' }}>
              ASH Audio Equalizer & FX
            </h3>
            <p className="text-xs text-slate-400">Web Audio API 3-Band Parametric Filter</p>
          </div>
        </div>

        {/* EQ Presets */}
        <div className="mb-6">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Preset Profiles</label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map(preset => (
              <button
                key={preset}
                onClick={() => applyEqPreset(preset)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  eqPreset === preset
                    ? 'bg-sky-400 text-slate-950 shadow-md shadow-sky-400/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Frequency Sliders */}
        <div className="flex justify-around items-end h-48 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 my-4">
          {/* Low / Bass */}
          <div className="flex flex-col items-center gap-3 h-full justify-between">
            <span className="text-xs font-bold text-sky-400">{eqGains.low > 0 ? `+${eqGains.low}dB` : `${eqGains.low}dB`}</span>
            <input
              type="range"
              min="-12"
              max="12"
              value={eqGains.low}
              onChange={(e) => setEqBandGains(Number(e.target.value), eqGains.mid, eqGains.high)}
              className="h-28 -rotate-90 origin-center my-auto cursor-pointer"
            />
            <span className="text-[11px] font-bold text-slate-400">Bass (250Hz)</span>
          </div>

          {/* Mid */}
          <div className="flex flex-col items-center gap-3 h-full justify-between">
            <span className="text-xs font-bold text-sky-400">{eqGains.mid > 0 ? `+${eqGains.mid}dB` : `${eqGains.mid}dB`}</span>
            <input
              type="range"
              min="-12"
              max="12"
              value={eqGains.mid}
              onChange={(e) => setEqBandGains(eqGains.low, Number(e.target.value), eqGains.high)}
              className="h-28 -rotate-90 origin-center my-auto cursor-pointer"
            />
            <span className="text-[11px] font-bold text-slate-400">Mids (1.5kHz)</span>
          </div>

          {/* High / Treble */}
          <div className="flex flex-col items-center gap-3 h-full justify-between">
            <span className="text-xs font-bold text-sky-400">{eqGains.high > 0 ? `+${eqGains.high}dB` : `${eqGains.high}dB`}</span>
            <input
              type="range"
              min="-12"
              max="12"
              value={eqGains.high}
              onChange={(e) => setEqBandGains(eqGains.low, eqGains.mid, Number(e.target.value))}
              className="h-28 -rotate-90 origin-center my-auto cursor-pointer"
            />
            <span className="text-[11px] font-bold text-slate-400">Treble (4kHz)</span>
          </div>
        </div>

        <button
          onClick={() => applyEqPreset('Flat')}
          className="w-full btn-secondary justify-center py-2 text-xs"
        >
          Reset to Flat EQ
        </button>
      </div>
    </div>
  );
};
