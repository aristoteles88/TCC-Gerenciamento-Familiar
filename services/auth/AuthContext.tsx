import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { AuthContextType, User } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser ? { uid: firebaseUser.uid, email: firebaseUser.email } : null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    login: async (email: string, password: string) => {
      await signInWithEmailAndPassword(auth, email, password);
    },
    register: async (email: string, password: string) => {
      await createUserWithEmailAndPassword(auth, email, password);
    },
    logout: async () => {
      await signOut(auth);
    },
    resetPassword: async (email: string) => {
      await sendPasswordResetEmail(auth, email);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};