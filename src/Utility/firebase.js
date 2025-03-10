
import firebase from "firebase/compat/app";
import {getAuth} from 'firebase/auth';
import "firebase/compat/firestore"
import "firebase/compat/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcbJlep8n0MEzldm8tG2bE4z2q_llLnPw",
  authDomain: "clone-244b7.firebaseapp.com",
  projectId: "clone-244b7",
  storageBucket: "clone-244b7.firebasestorage.app",
  messagingSenderId: "1040952121919",
  appId: "1:1040952121919:web:1160c5ad54b95223d9768a"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = app.firestore()