import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { clearToken, getToken, setToken } from '../lib/auth';
import { getMe, login as loginApi, register as registerApi, type User } from '../lib/api/auth';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (input: { username: string; password: string }) => Promise<void>;
  register: (input: {
    username: string;
    password: string;
    nickname?: string;
    hotel_name?: string;
  }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    getMe()
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        clearToken();
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    isAuthenticated: Boolean(user && getToken()),
    async login(input) {
      const response = await loginApi(input);
      setToken(response.token);
      setUser(response.user);
    },
    async register(input) {
      const response = await registerApi(input);
      setToken(response.token);
      setUser(response.user);
    },
    logout() {
      clearToken();
      setUser(null);
    },
  }), [loading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
