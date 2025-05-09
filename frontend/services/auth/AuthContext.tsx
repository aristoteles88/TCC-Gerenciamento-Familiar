import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { handleGoogleLogin, handleEmailAndPasswordLogin, registerUser } from '../../firebase';
import { AuthContextType, Auth, User } from './types';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userAuth, setUserAuth] = useState<Auth | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setUserAuth(firebaseUser? {uid: firebaseUser.uid, email: firebaseUser.email} : null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const redirectOnSuccessfulLogin = () => {
    if (!user) {
      navigation.navigate('Login');
      return;
    }
    console.log('user', user);
    console.log('user.family_id', user?.family_id);
    if (!user?.family_id) {
      navigation.navigate('FamilyGroup');

    } else {
      navigation.navigate('Home');
    }
    return;
  }

  const value = {
    userAuth,
    loading,
    login: async (type: string, email: string, password: string) => {
      if (type === 'google') {
        setUser(await handleGoogleLogin());
        redirectOnSuccessfulLogin();
      }
      if (type === 'email') {
        setUser(await handleEmailAndPasswordLogin(email, password));
        redirectOnSuccessfulLogin();
      }
    },
    register: async (email: string, password: string, fullName: string) => {
      setUser(await registerUser(email, password, fullName));
      redirectOnSuccessfulLogin();
    },
    logout: async () => {
      await signOut(auth);
      navigation.navigate('Login');
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