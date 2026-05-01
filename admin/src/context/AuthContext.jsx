// admin/src/context/AuthContext.jsx
import { createContext, useState, useEffect, useCallback } from 'react';
import { getMeApi, loginApi, logoutApi } from '../api/auth';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      // Only attempt auth check if we have a stored token
      const token = localStorage.getItem('himflax_token');
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      const res = await getMeApi();
      setUser(res.data);
    } catch {
      localStorage.removeItem('himflax_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { checkAuth(); }, [checkAuth]);

  const login = async (credentials) => {
    const res = await loginApi(credentials);
    // Store token from response body for cross-domain auth
    if (res.token) {
      localStorage.setItem('himflax_token', res.token);
    }
    setUser(res.data);
    return res;
  };

  const logout = async () => {
    await logoutApi();
    localStorage.removeItem('himflax_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
