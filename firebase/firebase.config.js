// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4kKV5LOpqJWZJKXfRpl9atF9Mi1dfS2Q",
  authDomain: "login-with-firebase-1552e.firebaseapp.com",
  projectId: "login-with-firebase-1552e",
  storageBucket: "login-with-firebase-1552e.appspot.com",
  messagingSenderId: "524585752816",
  appId: "1:524585752816:web:8327369701ce5a2b964a35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);