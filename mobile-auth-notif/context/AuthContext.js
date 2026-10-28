import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { apiFetch } from '../services/api';

const AuthContext = createContext();
const TOKEN_KEY = 'my-jwt-token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadToken() {
      try {
        const savedToken = await SecureStore.getItemAsync(TOKEN_KEY);
        if (savedToken) {
          const response = await apiFetch('/auth/me', {
            headers: { Authorization: `Bearer ${savedToken}` }
          });
          if (response) {
            setToken(savedToken);
            setUser(response);
          }
        }
      } catch (e) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadToken();
  }, []);

  const signIn = async (email, password) => {
    const response = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    const jwtToken = response?.token;
    if (!jwtToken) {
      throw new Error('Token tidak ditemukan dalam respons server.');
    }

    await SecureStore.setItemAsync(TOKEN_KEY, jwtToken);
    setToken(jwtToken);
    setUser(response?.user || null);
    return true;
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, setUser, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}