import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStoredUserToken, getStoredUserProfile, clearStoredData } from '../utils/storage';

type AuthContextType = {
  isLoggedIn: boolean;
  userId: string | null;
  login: (id: string) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Check for stored authentication data on app start
  useEffect(() => {
    checkStoredAuth();
  }, []);

  const checkStoredAuth = async () => {
    try {
      const storedToken = await getStoredUserToken();
      const storedUser = await getStoredUserProfile();
      
      if (storedToken && storedUser) {
        setIsLoggedIn(true);
        setUserId(storedToken);
      }
    } catch (error) {
      console.error('Error checking stored auth:', error);
    }
  };

  const login = (id: string) => {
    setIsLoggedIn(true);
    setUserId(id);
    // Token is already stored in signin.tsx
  };

  const logout = async () => {
    try {
      // Clear all stored data using utility function
      await clearStoredData();
      setIsLoggedIn(false);
      setUserId(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
