import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzqfwYItA6e4jn3lUbDtAoHHRZlhgZE34",
  authDomain: "auctionwebsite-f6e0a.firebaseapp.com",
  projectId: "auctionwebsite-f6e0a",
  storageBucket: "auctionwebsite-f6e0a.firebasestorage.app",
  messagingSenderId: "3987669352",
  appId: "1:3987669352:web:38b83fcadbce53b1e356dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
