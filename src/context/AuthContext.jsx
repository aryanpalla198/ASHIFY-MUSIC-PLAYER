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
  // Load registered users list from localStorage
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('ash_registered_users');
    if (saved) {
      return JSON.parse(saved);
    }
    // Pre-populate with default approved user
    const initial = [
      {
        id: "user-ash-vip",
        name: "Ash Premium Member",
        email: "ash.vip@spotifyclone.app",
        avatar: ASH_AVATARS[0],
        plan: "ASH VIP Navy",
        joined: "2026",
        status: "approved"
      }
    ];
    localStorage.setItem('ash_registered_users', JSON.stringify(initial));
    return initial;
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ash_user_session');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.avatar || parsed.avatar.includes('unsplash')) {
        parsed.avatar = ASH_AVATARS[0];
      }
      return parsed;
    }
    return null; // Guest/logged out by default
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
    const formattedEmail = email.trim().toLowerCase();
    
    // Check if Admin
    if (formattedEmail === 'admin@ashify.com') {
      const adminUser = {
        id: "admin-id",
        name: "System Admin",
        email: "admin@ashify.com",
        avatar: ASH_AVATARS[0],
        plan: "Administrator",
        joined: "2026",
        isAdmin: true,
        status: "approved"
      };
      setUser(adminUser);
      setIsAuthModalOpen(false);
      return;
    }

    // Check if normal user exists in registered list
    const existingUser = registeredUsers.find(u => u.email.toLowerCase() === formattedEmail);
    if (existingUser) {
      setUser(existingUser);
    } else {
      // Create new pending user request
      const newUser = {
        id: "user-" + Date.now(),
        name: name || email.split('@')[0],
        email: email,
        avatar: ASH_AVATARS[Math.floor(Math.random() * ASH_AVATARS.length)],
        plan: "ASH VIP Navy",
        joined: new Date().getFullYear().toString(),
        status: "pending"
      };
      const updatedUsers = [...registeredUsers, newUser];
      setRegisteredUsers(updatedUsers);
      localStorage.setItem('ash_registered_users', JSON.stringify(updatedUsers));
      setUser(newUser);
    }
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const approveUser = (userId) => {
    const updatedUsers = registeredUsers.map(u => {
      if (u.id === userId) {
        return { ...u, status: 'approved' };
      }
      return u;
    });
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('ash_registered_users', JSON.stringify(updatedUsers));

    // If the approved user is current session user, update active session in real-time
    if (user && user.id === userId) {
      setUser({ ...user, status: 'approved' });
    }
  };

  const updateAvatar = (avatarUrl) => {
    if (user) {
      const updatedUser = { ...user, avatar: avatarUrl };
      setUser(updatedUser);
      // Also update in registeredUsers if it exists
      const updatedUsers = registeredUsers.map(u => {
        if (u.id === user.id) {
          return { ...u, avatar: avatarUrl };
        }
        return u;
      });
      setRegisteredUsers(updatedUsers);
      localStorage.setItem('ash_registered_users', JSON.stringify(updatedUsers));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      updateAvatar,
      isAuthModalOpen,
      setIsAuthModalOpen,
      registeredUsers,
      approveUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
