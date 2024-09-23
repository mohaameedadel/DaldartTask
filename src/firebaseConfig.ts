// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbwjGw1ec76QxwUTyUv0XvLC5IGYKt-eE",
  authDomain: "daldart-28800.firebaseapp.com",
  projectId: "daldart-28800",
  storageBucket: "daldart-28800.appspot.com",
  messagingSenderId: "746259843759",
  appId: "1:746259843759:web:3a4c5e6781a9e7d06d225a",
  measurementId: "G-NBJN6THXTH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
