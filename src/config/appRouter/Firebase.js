// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCyyFTUrffVq97FP9W6K1-PABudGYfn3Xw",
    authDomain: "login-signup-f66b5.firebaseapp.com",
    projectId: "login-signup-f66b5",
    storageBucket: "login-signup-f66b5.firebasestorage.app",
    messagingSenderId: "512011647658",
    appId: "1:512011647658:web:2d8ecc61e9a05e83daeed3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
