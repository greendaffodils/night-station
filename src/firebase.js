import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC9oz6KeW5gyIdZM6SK24lme-1iCUI67Ps",
  authDomain: "night-station-81a0f.firebaseapp.com",
  databaseURL: "https://night-station-81a0f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "night-station-81a0f",
  storageBucket: "night-station-81a0f.firebasestorage.app",
  messagingSenderId: "530357162178",
  appId: "1:530357162178:web:51fd0920c9b45aa90bab5b",
  measurementId: "G-QR5VPSTW49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Database instance
export const db = getDatabase(app);








