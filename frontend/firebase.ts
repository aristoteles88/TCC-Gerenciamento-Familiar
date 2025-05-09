import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";
import { initializeApp } from "firebase/app";
import api from "./api/client";
import { getToken, removeToken, storeToken } from "./services/auth/authService";
import firebaseConfig from "./firebase_data";


// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



const handleGoogleLogin = async () => {
  try {
    let token = await getToken();
    if (token === null) {
      // Autentica com Google
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      token = await result.user.getIdToken();
      await storeToken(token);
    }
    return sendTokenToBackend('login', null);
    
  } catch (error) {
    alert('Login error: ' + error.message);
  }
};

const handleEmailAndPasswordLogin = async (email: string, password: string) => {
  try {
    let token = await getToken();
    if (token === null) {
      // Autentica com email e senha
      const result = await signInWithEmailAndPassword(auth, email, password);
      token = await result.user.getIdToken();
      await storeToken(token);
    }
    return sendTokenToBackend('login', token, null);
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      alert('User not found');
    } else if (error.code === 'auth/invalid-email') {
      alert('Invalid email');
    } else {
      alert('Login error: ' + error.message);
    }
  }
};

const registerUser = async (email: string, password: string, fullName: string) => {
  try {
    // Cria usuário com email e senha
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();
    await storeToken(token);
    return sendTokenToBackend('register', {"name": fullName});
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('Email already in use');
    } else if (error.code === 'auth/invalid-email') {
      alert('Invalid email');
    } else if (error.code === 'auth/weak-password') {
      alert('Weak password');
    } else if (error.code === 'auth/missing-email') {
      alert('Email is required');
    } else if (error.code === 'auth/missing-password') {
      alert('Password is required');
    } else {
      alert('Registration error: ' + error.message);
    }
  }
}

const sendTokenToBackend = async (endpoint: string, body) => {
  try {
    // Envia o token para o backend
    if (body === null) {
      body = {};
    }
    const response = await api.post('auth/' + endpoint, body);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    alert('Error sending token to backend: ' + error.message);
    return null;
  }
}

const logout = async () => {
  try {
    await signOut(auth);
    await removeToken();
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};

export { app, auth, handleGoogleLogin, handleEmailAndPasswordLogin, registerUser, logout};
