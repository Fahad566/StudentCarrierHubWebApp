// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Import storage too

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCwSlDjIVwKSUi5VD0Lmrsm4nUmnAtE3jw",
  authDomain: "student-career-hub.firebaseapp.com",
  projectId: "student-career-hub",
  storageBucket: "student-career-hub.appspot.com",  // ✅ Corrected ".app" ➔ ".app**spot.com**"
  messagingSenderId: "251652620592",
  appId: "1:251652620592:web:e6d23957f20ce380de88f5",
  measurementId: "G-YN08PTMZG7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Authentication, Firestore, and Storage
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app); // ✅ Initialize storage

export default app;
