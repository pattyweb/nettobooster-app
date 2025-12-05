// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

type Role = 'admin' | 'employee';

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithCode: (code: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // TODO: replace with API call
    setUser({
      id: '1',
      name: 'Max Mustermann',
      email,
      role: 'admin',
    });
  };

  const loginWithCode = async (code: string) => {
    // TODO: replace with API call
    setUser({
      id: '2',
      name: 'Anna Employee',
      email: 'anna@example.com',
      role: 'employee',
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginWithCode,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};