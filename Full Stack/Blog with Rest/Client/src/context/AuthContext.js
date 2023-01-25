import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [userAuth, setUserAuth] = useState(false);
  const [userId, setUserId] = useState("");

  const logoutHandler = async () => {
    try {
      const token = await localStorage.removeItem("token");
      const userId = await localStorage.removeItem("userId");
      const userAuth = await localStorage.removeItem("userAuth");
      await localStorage.removeItem("expiryDate");
      setToken(token);
      setUserId(userId);
      setUserAuth(userAuth);
    } catch (err) {
      console.log(err);
    }
  };

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  const login = (email, password) => {
    setError("");
    setLoading(true);
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed!");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then((resData) => {
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        localStorage.setItem("userAuth", true);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        const userAuth = localStorage.getItem("userAuth");
        setAutoLogout(remainingMilliseconds);
        setToken(resData.token);
        setUserId(resData.userId);
        setUserAuth(userAuth);
        setLoading(false);
      })
      .catch((err) => {
        setUserAuth(false);
        setError(err.message);
        setLoading(false);
      });
    setLoading(false);
  };

  const setUser = async () => {
    try {
      setLoading(true);
      const token = await localStorage.getItem("token");
      const expiryDate = await localStorage.getItem("expiryDate");
      if (!token || !expiryDate) {
        const err = new Error("Unable to fetch user.");
        throw err;
      }
      if (new Date(expiryDate) <= new Date()) {
        const err = new Error("Unable to fetch user.");
        throw err;
      }
      const useId = await localStorage.getItem("userId");
      const userAuth = await localStorage.getItem("userAuth");
      const remainingMilliseconds =
        new Date(expiryDate).getTime() - new Date().getTime();
      setUserAuth(userAuth);
      setToken(token);
      setUserId(useId);
      setAutoLogout(remainingMilliseconds);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    setUser();
  }, []);

  const value = { login, error, token, userAuth, userId, logoutHandler };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
