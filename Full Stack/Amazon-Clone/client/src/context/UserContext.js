import React, { createContext, useContext, useReducer } from "react";
import { firestore } from "../config/firebaseConfig";

const actionTypes = {
  GET_USER_INFO: "GET_USER_INFO",
  GET_USER_INFO_FAILED: "GET_USER_INFO_FAILED",
};

const initialState = {
  user: [],
  userError: [],
};

const UserContext = createContext({
  user: [],
  userError: [],
  getUserData: () => {},
});

export const useUserData = () => useContext(UserContext);

const userReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.GET_USER_INFO_FAILED:
      return {
        ...state,
        userError: action.payload,
      };

    default:
      return state;
  }
};

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const getUserData = (id) => {
    firestore
      .doc(`users/${id}`)
      .get()
      .then((snapshot) => {
        const userDoc = snapshot.data();
        dispatch({
          type: actionTypes.GET_USER_INFO,
          payload: userDoc,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.GET_USER_INFO_FAILED,
          payload: err.message,
        });
      });
  };

  const value = {
    user: state.user,
    userError: state.userError,
    getUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
