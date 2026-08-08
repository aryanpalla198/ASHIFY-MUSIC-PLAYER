import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { INITIAL_SONGS } from '../data/songs';
import { useAuth } from './AuthContext';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const { user } = useAuth();
  const [songs, setSongs] = useState(INITIAL_SONGS);
  const [currentSong, setCurrentSong] = useState(INITIAL_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(INITIAL_SONGS[0].duration);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [queue, setQueue] = useState(INITIAL_SONGS);

  // Settings & Audio FX
  const [audioQuality, setAudioQuality] = useState('High 320kbps');
  const [crossfade, setCrossfade] = useState(2);
  const [eqPreset, setEqPreset] = useState('Flat');
  const [eqGains, setEqGains] = useState({ low: 0, mid: 0, high: 0 });

  // Overlays
  const [showLyrics, setShowLyrics] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [showFullScreenPlayer, setShowFullScreenPlayer] = useState(false);
  const [showEqualizer, setShowEqualizer] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [audioError, setAudioError] = useState(null);

  // Sidebar State ('normal' | 'minimized' | 'closed')
  const [sidebarState, setSidebarState] = useState(() => {
    const saved = localStorage.getItem('ash_sidebar_state');
    return saved ? saved : 'normal';
  });

  const updateSidebarState = (state) => {
    setSidebarState(state);
    localStorage.setItem('ash_sidebar_state', state);
  };

  // User Playlists & Likes
  const [likedSongIds, setLikedSongIds] = useState(() => {
    const saved = localStorage.getItem('ash_liked_songs');
    return saved ? JSON.parse(saved) : ["weeknd-1", "weeknd-2", "song-1"];
  });

  const [playlists, setPlaylists] = useState(() => {
    const saved = localStorage.getItem('ash_playlists');
    return saved ? JSON.parse(saved) : [
      { id: "custom-1", title: "Midnight Drive", songIds: ["weeknd-1", "weeknd-2", "song-1"] }
    ];
  });

  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const checkPlaybackAllowed = () => {
    if (!user) {
      alert("Please sign in or register to play songs.");
      return false;
    }
    if (user.isAdmin) {
      return true;
    }
    // Read from localStorage to check real-time approval status
    const savedUsers = localStorage.getItem('ash_registered_users');
    if (savedUsers) {
      const usersList = JSON.parse(savedUsers);
      const dbUser = usersList.find(u => u.email.toLowerCase() === user.email.toLowerCase());
      if (dbUser) {
        if (dbUser.status === 'approved') {
          // Sync current session status if it changed
          if (user.status !== 'approved') {
            user.status = 'approved';
            localStorage.setItem('ash_user_session', JSON.stringify(user));
          }
          return true;
        }
      }
    }
    
    if (user.status !== 'approved') {
      alert("Your login request is pending admin approval. You can play songs once approved by the admin.");
      return false;
    }
    return true;
  };

  const audioRef = useRef(new Audio());
  const synthTimerRef = useRef(null);

  // Web Audio Context & Synth Fallback
  const audioCtxRef = useRef(null);

  // Initialize Web Audio Context on User Gesture
  const ensureAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Play Synthetic Melody if CDN audio stream is blocked by CORS/network
  const playSyntheticAudioPreview = () => {
    try {
      ensureAudioContext();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      if (synthTimerRef.current) clearInterval(synthTimerRef.current);

      const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
      let step = 0;

      synthTimerRef.current = setInterval(() => {
        if (!isPlaying) {
          clearInterval(synthTimerRef.current);
          return;
        }
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(notes[step % notes.length], ctx.currentTime);
        
        gainNode.gain.setValueAtTime((isMuted ? 0 : volume) * 0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.4);
        step++;
      }, 400);
    } catch (err) {
      console.warn("Synth Audio notice:", err);
    }
  };

  // Sync HTML5 Audio Object
  useEffect(() => {
    const audio = audioRef.current;
    audio.crossOrigin = "anonymous";
    audio.src = currentSong.audioUrl;
    audio.volume = isMuted ? 0 : volume;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      handleNextTrack();
    };

    const handlePlay = () => {
      setAudioError(null);
      if (synthTimerRef.current) {
        clearInterval(synthTimerRef.current);
        synthTimerRef.current = null;
      }
    };

    const handleError = (e) => {
      console.warn("Audio stream blocked or CDN network error, starting fallback audio synth...", e);
      setAudioError("Stream fallback synth activated");
      if (isPlaying) {
        playSyntheticAudioPreview();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('playing', handlePlay);

    if (isPlaying) {
      if (!checkPlaybackAllowed()) {
        setIsPlaying(false);
        return;
      }
      ensureAudioContext();
      audio.play().then(() => {
        handlePlay();
      }).catch(err => {
        console.warn("Autoplay deferred, starting audio synth fallback:", err);
        playSyntheticAudioPreview();
      });
    } else {
      if (synthTimerRef.current) {
        clearInterval(synthTimerRef.current);
        synthTimerRef.current = null;
      }
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('playing', handlePlay);
    };
  }, [currentSong]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (!checkPlaybackAllowed()) return;
    ensureAudioContext();
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      if (synthTimerRef.current) {
        clearInterval(synthTimerRef.current);
        synthTimerRef.current = null;
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      audio.play().then(() => {
        setAudioError(null);
        if (synthTimerRef.current) {
          clearInterval(synthTimerRef.current);
          synthTimerRef.current = null;
        }
        setRecentlyPlayed(prev => [currentSong, ...prev.filter(s => s.id !== currentSong.id)].slice(0, 15));
      }).catch(err => {
        console.warn("Browser play deferred, running audio synth:", err);
        playSyntheticAudioPreview();
      });
    }
  };

  const playSong = (song) => {
    if (!checkPlaybackAllowed()) return;
    ensureAudioContext();
    setCurrentSong(song);
    setIsPlaying(true);

    const audio = audioRef.current;
    audio.src = song.audioUrl;
    audio.play().then(() => {
      setAudioError(null);
      if (synthTimerRef.current) {
        clearInterval(synthTimerRef.current);
        synthTimerRef.current = null;
      }
      setRecentlyPlayed(prev => [song, ...prev.filter(s => s.id !== song.id)].slice(0, 15));
    }).catch(err => {
      console.warn("Play song audio error, running synth preview:", err);
      playSyntheticAudioPreview();
    });
  };

  const handleSeek = (newTime) => {
    const audio = audioRef.current;
    try {
      audio.currentTime = newTime;
    } catch (e) {}
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    audioRef.current.volume = newVolume;
  };

  const toggleMute = () => {
    setIsMuted(prev => {
      const next = !prev;
      audioRef.current.volume = next ? 0 : volume;
      return next;
    });
  };

  const handleNextTrack = () => {
    if (isRepeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => playSyntheticAudioPreview());
      return;
    }
    const currentIndex = queue.findIndex(s => s.id === currentSong.id);
    let nextIndex = isShuffle
      ? Math.floor(Math.random() * queue.length)
      : (currentIndex + 1) % queue.length;
    playSong(queue[nextIndex]);
  };

  const handlePrevTrack = () => {
    if (currentTime > 4) {
      handleSeek(0);
      return;
    }
    const currentIndex = queue.findIndex(s => s.id === currentSong.id);
    let prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    playSong(queue[prevIndex]);
  };

  const toggleLikeSong = (songId) => {
    setLikedSongIds(prev => {
      const next = prev.includes(songId)
        ? prev.filter(id => id !== songId)
        : [...prev, songId];
      localStorage.setItem('ash_liked_songs', JSON.stringify(next));
      return next;
    });
  };

  const createPlaylist = (title) => {
    const newPl = {
      id: "pl-" + Date.now(),
      title,
      songIds: [currentSong.id]
    };
    setPlaylists(prev => {
      const next = [...prev, newPl];
      localStorage.setItem('ash_playlists', JSON.stringify(next));
      return next;
    });
  };

  return (
    <PlayerContext.Provider value={{
      songs,
      currentSong,
      isPlaying,
      currentTime,
      duration,
      volume,
      isMuted,
      isShuffle,
      isRepeat,
      queue,
      likedSongIds,
      playlists,
      recentlyPlayed,
      audioQuality,
      crossfade,
      eqPreset,
      eqGains,
      sidebarState,
      setSidebarState: updateSidebarState,
      showLyrics,
      showVisualizer,
      showQueue,
      showFullScreenPlayer,
      showEqualizer,
      showSettings,
      audioError,
      audioRef,
      togglePlay,
      playSong,
      handleSeek,
      handleVolumeChange,
      toggleMute,
      handleNextTrack,
      handlePrevTrack,
      setIsShuffle,
      setIsRepeat,
      toggleLikeSong,
      createPlaylist,
      setAudioQuality,
      setCrossfade,
      setShowLyrics,
      setShowVisualizer,
      setShowQueue,
      setShowFullScreenPlayer,
      setShowEqualizer,
      setShowSettings
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
