// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANuWObbp8oF74yeTfHtuwvZCC9OxeyvZI",
  authDomain: "e-commerce-dac99.firebaseapp.com",
  projectId: "e-commerce-dac99",
  storageBucket: "e-commerce-dac99.appspot.com",
  messagingSenderId: "1038253053203",
  appId: "1:1038253053203:web:0aed724642ed949c7bb6e6",
  measurementId: "G-1PK0Y5DKNF"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const db = getFirestore(app)

// try to add analytics
const analytics =
  app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;

export {auth, db, analytics}
export const provider = new GoogleAuthProvider();