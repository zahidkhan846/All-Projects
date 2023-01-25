import React, { createContext, useContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  REGISTER: "REGISTER",
};

const initialState = {
  user: null,
};

const TOKEN = localStorage.getItem("token");
if (TOKEN) {
  const decodedToken = jwtDecode(TOKEN);
  const expireTime = new Date(decodedToken.exp * 1000);

  const currentTime = new Date();

  if (currentTime > expireTime) {
    localStorage.removeItem("token");
  } else {
    initialState.user = decodedToken;
  }
} else {
  console.log("No token found!");
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.LOGOUT:
      localStorage.removeItem("token");

      return initialState;
    default:
      return state;
  }
};

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loginAction = (userData) => {
    dispatch({ type: actionTypes.LOGIN, payload: userData });
  };

  const logoutAction = () => {
    dispatch({ type: actionTypes.LOGOUT });
  };

  const value = {
    user: state.user,
    loginAction,
    logoutAction,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
