import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBx6Rr_9lRyqSaR_ziLikIswwfwpq3m4X0",
  authDomain: "qwork-4bf25.firebaseapp.com",
  projectId: "qwork-4bf25",
  storageBucket: "qwork-4bf25.firebasestorage.app",
  messagingSenderId: "1083466194245",
  appId: "1:1083466194245:web:52ce21a31ecbb9f5b4722c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;