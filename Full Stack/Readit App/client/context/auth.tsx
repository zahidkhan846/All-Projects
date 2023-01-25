import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { axiosConnect } from "../config/axios";
import { User } from "../utils/typeDefs";

interface AuthState {
  authenticated: boolean;
  user: User | undefined;
  login?: any;
  logout?: any;
}

interface AuthAction {
  type: string;
  payload?: any;
}

interface Children {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthState>({
  authenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

const initialState = {
  authenticated: false,
  user: null,
};

const reducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

function AuthProvider({ children }: Children) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (user) => {
    dispatch({
      type: actionTypes.LOGIN,
      payload: user,
    });
  };

  const logout = () => {
    dispatch({
      type: actionTypes.LOGOUT,
    });
  };

  const [loading, setLoading] = useState(true);

  const handleUserData = async () => {
    try {
      const res = await axiosConnect.get("/auth/user");
      login(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUserData();
  }, []);

  const value: any = {
    login,
    logout,
    user: state.user,
    authenticated: state.authenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
