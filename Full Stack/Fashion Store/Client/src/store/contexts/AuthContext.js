import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "../../config/axios";

const initialState = {
  currentUser: null,
  authenticated: false,
  error: null,
};

const AuthContext = createContext({
  currentUser: null,
  authenticated: false,
  error: null,
});

export const useAuth = () => useContext(AuthContext);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        authenticated: true,
        currentUser: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        authenticated: false,
        currentUser: null,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get("/user/current-user");
        console.log(res.data);
        dispatch({
          type: "LOGIN",
          payload: res.data.user,
        });
        setLoading(false);
      } catch (error) {
        dispatch({
          type: "ERROR",
          payload: error.response.data,
        });
      }
      setLoading(false);
    }
    getUser();
  }, []);

  const login = (user) => {
    dispatch({
      type: "LOGIN",
      payload: user,
    });
    setLoading(false);
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    setLoading(false);
  };

  const value = {
    currentUser: state.currentUser,
    authenticated: state.authenticated,
    error: state.error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
