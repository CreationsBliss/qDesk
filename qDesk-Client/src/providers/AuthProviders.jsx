import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext(null)

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  // console.log(user);

  // Create user
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // Login user
  const logInUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Google login 
  const googleLoginUser = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  // Logout user
  const logOutUser = () => {
    setLoading(true)
    axios.get(`${import.meta.env.VITE_SERVER_URL}/log-out`, { withCredentials: true })
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const authInfo = {
    user,
    loading,
    createUser,
    logInUser,
    googleLoginUser,
    logOutUser,
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProviders;