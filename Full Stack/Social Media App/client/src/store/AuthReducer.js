import { createContext, useContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const JWT_TOKEN = "MEGNET_CHAT_TOKEN";

const initialState = {
  user: null,
};

const token = localStorage.getItem(JWT_TOKEN);

if (token) {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem(JWT_TOKEN);
  } else {
    initialState.user = decodedToken;
  }
}

const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const login = (cred) => {
    localStorage.setItem(JWT_TOKEN, cred.token);
    dispatch({
      type: actionTypes.LOGIN,
      payload: cred,
    });
  };

  const logout = () => {
    localStorage.removeItem(JWT_TOKEN);
    dispatch({
      type: actionTypes.LOGOUT,
    });
  };

  const value = {
    user: state.user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
