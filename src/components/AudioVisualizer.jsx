import React, { useEffect, useRef } from 'react';
import { X, Sparkles, Activity } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export const AudioVisualizer = () => {
  const { currentSong, isPlaying, showVisualizer, setShowVisualizer } = usePlayer();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!showVisualizer || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Navy background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#0a0f1d');
      bgGrad.addColorStop(1, '#060a12');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const numBars = 64;
      const barWidth = width / numBars;
      const time = Date.now() * 0.003;

      for (let i = 0; i < numBars; i++) {
        // Dynamic frequency simulation if web audio context isn't cross-origin connected
        const noise = isPlaying ? (Math.sin(i * 0.2 + time) * 0.5 + 0.5) * (Math.cos(i * 0.1 + time * 1.5) * 0.5 + 0.5) : 0.05;
        const barHeight = Math.max(8, noise * (height * 0.65));

        const x = i * barWidth;
        const y = height / 2 - barHeight / 2;

        // Gradient for bars (Cyan to Ice Blue to Navy)
        const barGrad = ctx.createLinearGradient(0, y, 0, y + barHeight);
        barGrad.addColorStop(0, '#00f2fe');
        barGrad.addColorStop(0.5, '#38bdf8');
        barGrad.addColorStop(1, '#1b2a4a');

        ctx.fillStyle = barGrad;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.4)';
        ctx.shadowBlur = 10;
        ctx.fillRect(x + 2, y, barWidth - 4, barHeight);

        // Mirrored bottom glow
        ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.fillRect(x + 2, height / 2 + barHeight / 2 + 4, barWidth - 4, barHeight * 0.3);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [showVisualizer, isPlaying]);

  if (!showVisualizer) return null;

  return (
    <div className="fixed inset-0 z-40 flex flex-col justify-between p-6 bg-slate-950/90 backdrop-blur-xl animate-fade-in">
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-sky-400 animate-pulse" />
          <h3 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: 'Outfit' }}>
            ASH Real-Time Spectrum Visualizer
          </h3>
        </div>
        <button
          onClick={() => setShowVisualizer(false)}
          className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="relative flex-1 w-full my-4 rounded-3xl overflow-hidden border border-sky-500/20 shadow-2xl">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute bottom-8 left-8 flex items-center gap-4 p-4 rounded-2xl glass-panel bg-slate-900/80 border border-slate-700/60">
          <img src={currentSong.coverUrl} alt={currentSong.title} className="w-14 h-14 rounded-xl object-cover shadow-md" />
          <div>
            <h4 className="font-bold text-base text-white">{currentSong.title}</h4>
            <p className="text-xs text-sky-400 font-medium">{currentSong.artist} — {currentSong.album}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
