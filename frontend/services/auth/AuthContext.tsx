import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { handleGoogleLogin, handleEmailAndPasswordLogin, registerUser } from '../../firebase';
import { AuthContextType, User } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser ? { uid: firebaseUser.uid, email: firebaseUser.email } : null); // TODO obter dados do usuário via api.
        setLoading(false);
      } else {
        console.log('User is logged out');
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    login: async (type: string, email: string, password: string, navigation) => {
      if (type === 'google') {
        await handleGoogleLogin(navigation);
      }
      if (type === 'email') {
        await handleEmailAndPasswordLogin(email, password, navigation);
      }
    },
    register: async (email: string, password: string, fullName: string, navigation) => {
      await registerUser(email, password, fullName, navigation);
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
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};