// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-138cd.firebaseapp.com",
  projectId: "mern-blog-138cd",
  storageBucket: "mern-blog-138cd.firebasestorage.app",
  messagingSenderId: "1024647702316",
  appId: "1:1024647702316:web:bb0f7df68dce55ff162e89"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
