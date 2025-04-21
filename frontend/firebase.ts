import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAiCg0VDUATwz0dKKsFhS0GrYpYqyVHQrc",
    authDomain: "family-task-manager-51606.firebaseapp.com",
    projectId: "family-task-manager-51606",
    storageBucket: "family-task-manager-51606.firebasestorage.app",
    messagingSenderId: "343002635950",
    appId: "1:343002635950:web:3f6428c860026a45ca573f"
};

let firebaseApp = null;
if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export { firebaseApp, auth};