import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";
import { initializeApp } from "firebase/app";
import api from "./api/client";
import { getToken, removeToken, storeToken } from "./services/auth/authService";

const firebaseConfig = {
    apiKey: "AIzaSyAiCg0VDUATwz0dKKsFhS0GrYpYqyVHQrc",
    authDomain: "family-task-manager-51606.firebaseapp.com",
    projectId: "family-task-manager-51606",
    storageBucket: "family-task-manager-51606.firebasestorage.app",
    messagingSenderId: "343002635950",
    appId: "1:343002635950:web:3f6428c860026a45ca573f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const handleGoogleLogin = async (navigation) => {
  try {
    let token = await getToken();
    if (token === null) {
      // Sign in with Google
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      token = await result.user.getIdToken();
      await storeToken(token);
    }
    sendTokenToBackend('login', null ,navigation);
  } catch (error) {
    alert('Login error: ' + error.message);
  }
};

const handleEmailAndPasswordLogin = async (email: string, password: string, navigation) => {
  try {
    let token = await getToken();
    if (token === null) {
      // Sign in with email and password
      const result = await signInWithEmailAndPassword(auth, email, password);
      token = await result.user.getIdToken();
      await storeToken(token);
    }
    sendTokenToBackend('login', token, null, navigation);
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

const registerUser = async (email: string, password: string, fullName: string, navigation) => {
  try {
    // Create user with email and password
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();
    await storeToken(token);
    sendTokenToBackend('register', token, {"name": fullName}, navigation);
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

const sendTokenToBackend = async (endpoint: string, body, navigation) => {
  try {
    // Send token to your backend
    if (body !== null) {
      body = {};
    }
    const response = await api.post('auth/' + endpoint);
    const userData = await response.data;
    if (userData['family_id'] === null) {
      navigation.navigate('FamilyGroup');
    } else {
      navigation.navigate('Home');
    }
  } catch (error) {
    alert('Error sending token to backend: ' + error.message);
  }
}

const logout = async () => {
  try {
    await signOut(auth);
    return true; // Success
  } catch (error) {
    console.error('Logout error:', error);
    return false; // Failed
  }
};

export { app, auth, handleGoogleLogin, handleEmailAndPasswordLogin, registerUser, logout};