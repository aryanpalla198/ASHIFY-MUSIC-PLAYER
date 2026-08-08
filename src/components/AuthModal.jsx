import React, { useState } from 'react';
import { X, User, Mail, Lock, Sparkles, Check, Disc3 } from 'lucide-react';
import { useAuth, ASH_AVATARS } from '../context/AuthContext';

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    user, 
    login, 
    logout, 
    updateAvatar
  } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    login(email, name);
  };

  const handleDemoLogin = () => {
    login("demo.ash@spotifyclone.app", "Ash VIP Fan");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md p-6 glass-panel rounded-3xl border border-sky-500/30 shadow-2xl shadow-sky-500/10 bg-slate-900/90 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/50 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/30 mb-1">
            <Disc3 className="w-7 h-7 text-slate-950" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            {user ? 'Your ASH Profile' : (isSignUp ? 'Join ASH Music' : 'Welcome Back to ASH')}
          </h2>
          <p className="text-xs text-slate-400">
            {user ? 'Manage your account & navy theme settings' : 'Stream unlimited high quality music, create playlists & sync lyrics.'}
          </p>
        </div>

        {/* Logged In View */}
        {user ? (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full object-cover border border-sky-400 shadow-md bg-slate-950 p-1" />
              <div>
                <h3 className="font-bold text-lg text-white">{user.name}</h3>
                <p className="text-xs text-slate-400">{user.email}</p>
                <span className="inline-block px-2.5 py-0.5 mt-1 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-400 border border-sky-400/30">
                  {user.plan || "ASH VIP Navy"} Active
                </span>
              </div>
            </div>

            {/* Avatar Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Choose Avatar</label>
              <div className="flex items-center gap-3">
                {ASH_AVATARS.map((av, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => updateAvatar(av)}
                    className={`relative w-11 h-11 rounded-full overflow-hidden border-2 transition-all p-0.5 bg-slate-950 ${
                      user.avatar === av ? 'border-sky-400 scale-105 shadow-md shadow-sky-400/30' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={av} alt="avatar" className="w-full h-full object-cover" />
                    {user.avatar === av && (
                      <div className="absolute inset-0 bg-sky-500/40 flex items-center justify-center rounded-full">
                        <Check className="w-4 h-4 text-white stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="flex-1 btn-secondary justify-center py-2.5 text-sm"
              >
                Close
              </button>
              <button
                onClick={logout}
                className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold border border-red-500/30 rounded-full py-2.5 text-sm transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          /* Form Login / Signup View */
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isSignUp && (
              <div>
                <label className="text-xs font-semibold text-slate-400 mb-1 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Alex Mercer"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950/80 text-sm text-slate-100 pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 focus:border-sky-400 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/80 text-sm text-slate-100 pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 focus:border-sky-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  placeholder="•••••••• (Optional for Demo)"
                  className="w-full bg-slate-950/80 text-sm text-slate-100 pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 focus:border-sky-400 focus:outline-none"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary justify-center py-3 text-sm mt-2">
              {isSignUp ? 'Create Free Account' : 'Sign In to ASH'}
            </button>

            {/* Quick Demo Button */}
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Quick 1-Click Demo Login</span>
            </button>

            <div className="text-center pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-slate-400 hover:text-sky-400 transition-colors"
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
