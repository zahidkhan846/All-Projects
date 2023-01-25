import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  const logoutHandler = async () => {
    try {
      const token = await localStorage.removeItem("token");
      const userId = await localStorage.removeItem("userId");
      await localStorage.removeItem("expiryDate");
      setToken(token);
      setUserId(userId);
    } catch (err) {}
  };

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  const login = (email, password) => {
    const graphqlQuery = {
      query: `
        {
          login(email: "${email}", password: "${password}"){
            token
            userId
          }
        }
      `,
    };

    setError("");
    setLoading(true);
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.errors && resData.errors[0].status === 422) {
          throw new Error("Validation failed!");
        }
        if (resData.errors) {
          throw new Error("Signin failed,  Email already exists!");
        }
        localStorage.setItem("token", resData.data.login.token);
        localStorage.setItem("userId", resData.data.login.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        setAutoLogout(remainingMilliseconds);
        setToken(resData.data.login.token);
        setUserId(resData.data.login.userId);
        setLoading(false);
      })
      .catch((err) => {
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
      const remainingMilliseconds =
        new Date(expiryDate).getTime() - new Date().getTime();
      setToken(token);
      setUserId(useId);
      setAutoLogout(remainingMilliseconds);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setUser();
  }, []);

  const value = { login, logoutHandler, error, token, userId };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
