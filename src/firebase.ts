import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAoNEcFb7vwghr_x8BkQGOHP3Q49FiEF3M",
  authDomain: "manipal-6615f.firebaseapp.com",
  projectId: "manipal-6615f",
  storageBucket: "manipal-6615f.firebasestorage.app",
  messagingSenderId: "1096582879957",
  appId: "1:1096582879957:web:a383ea0aa24851d3a1605c",
  measurementId: "G-YT79QE1KST"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
