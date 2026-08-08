import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Custom SVG Monogram Avatars in Navy & Cyan (No external lady photos)
export const ASH_AVATARS = [
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="50" fill="%230a0f1d"/><circle cx="50" cy="50" r="45" fill="none" stroke="%2338bdf8" stroke-width="4"/><path d="M30 65 L50 25 L70 65 M38 52 L62 52" stroke="%2300f2fe" stroke-width="7" stroke-linecap="round" fill="none"/></svg>`,
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="50" fill="%230f172a"/><circle cx="50" cy="50" r="45" fill="none" stroke="%2360a5fa" stroke-width="4"/><path d="M35 35 H65 V48 C65 60 35 60 35 65 H65" stroke="%2338bdf8" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="50" fill="%231e293b"/><circle cx="50" cy="50" r="45" fill="none" stroke="%2300f2fe" stroke-width="4"/><path d="M35 25 V75 M35 50 H65 M65 25 V75" stroke="%2338bdf8" stroke-width="7" stroke-linecap="round" fill="none"/></svg>`,
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="50" fill="%23060a12"/><circle cx="50" cy="50" r="45" fill="none" stroke="%2338bdf8" stroke-width="4"/><path d="M30 50 L45 30 L60 70 L75 50" stroke="%2300f2fe" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`
];

const DEFAULT_USER = {
  id: "user-ash-vip",
  name: "Ash Premium Member",
  email: "ash.vip@spotifyclone.app",
  avatar: ASH_AVATARS[0],
  plan: "ASH VIP Navy",
  joined: "2026"
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ash_user_session');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Replace any legacy unsplash lady avatars
      if (!parsed.avatar || parsed.avatar.includes('unsplash')) {
        parsed.avatar = ASH_AVATARS[0];
      }
      return parsed;
    }
    return DEFAULT_USER;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('ash_user_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('ash_user_session');
    }
  }, [user]);

  const login = (email, name = "Ash Member") => {
    const newUser = {
      id: "user-" + Date.now(),
      name: name || email.split('@')[0],
      email: email,
      avatar: ASH_AVATARS[Math.floor(Math.random() * ASH_AVATARS.length)],
      plan: "ASH VIP Navy",
      joined: new Date().getFullYear().toString()
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const updateAvatar = (avatarUrl) => {
    if (user) {
      setUser({ ...user, avatar: avatarUrl });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      updateAvatar,
      isAuthModalOpen,
      setIsAuthModalOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
