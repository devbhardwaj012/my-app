// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth ,GoogleAuthProvider}  from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXyTJ5RWUIqsdbi3OCwqrbYSBJUhi55g4",
  authDomain: "weee-2d1bd.firebaseapp.com",
  projectId: "weee-2d1bd",
  storageBucket: "weee-2d1bd.appspot.com",
  messagingSenderId: "999432740407",
  appId: "1:999432740407:web:86146e70acf9b7b3de29b2",
  measurementId: "G-K3T307WMEZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();        // provider set to google
export const db = getFirestore(app);