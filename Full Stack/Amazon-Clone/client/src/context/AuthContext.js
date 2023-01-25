import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, firestore } from "../config/firebaseConfig";

const AuthContext = createContext({
  currentUser: null,
  signIn: () => {},
  signUp: () => {},
  signOutUser: () => {},
  resetPassword: () => {},
});

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const signUp = (newUser) => {
    return auth
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((res) =>
        firestore.collection("users").doc(res.user.uid).set({
          userName: newUser.userName,
          phone: newUser.phone,
          createdDate: new Date(),
        })
      )
      .catch((err) => console.log(err));
  };

  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const signOutUser = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    signIn,
    signOutUser,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
