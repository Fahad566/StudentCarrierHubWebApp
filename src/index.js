// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyCwSlDjIVwKSUi5VD0Lmrsm4nUmnAtE3jw",
  authDomain: "student-career-hub.firebaseapp.com",
  projectId: "student-career-hub",
  storageBucket: "student-career-hub.firebasestorage.app",
  messagingSenderId: "251652620592",
  appId: "1:251652620592:web:e6d23957f20ce380de88f5",
  measurementId: "G-YN08PTMZG7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Firestore
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export default app;
