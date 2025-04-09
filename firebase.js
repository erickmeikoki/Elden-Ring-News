// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTxk8tVJ82CNQxfu24HkelhLGg0qJZCO0",
  authDomain: "eldenringnewsfeed.firebaseapp.com",
  projectId: "eldenringnewsfeed",
  storageBucket: "eldenringnewsfeed.firebasestorage.app",
  messagingSenderId: "395847304528",
  appId: "1:395847304528:web:2e7ad9efa1fce38c7a9855",
  measurementId: "G-MYY4NE6M9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

