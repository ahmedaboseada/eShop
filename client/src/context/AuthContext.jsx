import { createContext, useContext, useEffect, useState } from 'react';
import { api, setToken } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('eshop_token');
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .me()
      .then((res) => setUser(res.data))
      .catch(() => {
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function signup(form) {
    const res = await api.signup(form);
    setToken(res.data.accessToken);
    setUser(res.data.user);
    return res.data.user;
  }

  async function signin(form) {
    const res = await api.signin(form);
    setToken(res.data.accessToken);
    setUser(res.data.user);
    return res.data.user;
  }

  async function signout() {
    try {
      await api.signout();
    } catch {
      /* ignore */
    }
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
