import React, { createContext, useContext, useReducer, useState } from "react";

const AuthContext = createContext();
export const useMessage = () => useContext(AuthContext);

const actionTypes = {
  SET_USERS: "SET_USERS",
  SELECTED_USER: "SELECTED_USER",
  SET_USER_MESSAGES: "SET_USER_MESSAGES",
  ADD_NEW_USER_MESSAGE: "ADD_NEW_USER_MESSAGE",
  ADD_NEW_USER_REACTION: "ADD_NEW_USER_REACTION",
};

const initialState = {
  users: null,
  selectedUser: null,
};

const reducer = (state, action) => {
  const { email, messages, message, reaction } = action.payload;
  let selectedUserCopy;
  let usersCopy;
  let userIndex;

  switch (action.type) {
    case actionTypes.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case actionTypes.SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };

    case actionTypes.SET_USER_MESSAGES:
      selectedUserCopy = { ...state.selectedUser };

      if (email === selectedUserCopy.email) {
        selectedUserCopy = { ...selectedUserCopy, messages };
      }

      return {
        ...state,
        selectedUser: selectedUserCopy,
      };

    case actionTypes.ADD_NEW_USER_MESSAGE:
      selectedUserCopy = { ...state.selectedUser };

      if (email === selectedUserCopy.email) {
        selectedUserCopy = {
          ...selectedUserCopy,
          messages: [message, ...selectedUserCopy.messages],
        };
      }

      message.reactions = [];

      usersCopy = [...state.users];
      userIndex = usersCopy.findIndex((user) => user.email === email);

      const updatedUser = {
        ...usersCopy[userIndex],
        latestMessage: message,
      };

      usersCopy[userIndex] = updatedUser;
      return {
        ...state,
        users: usersCopy,
        selectedUser: selectedUserCopy,
      };

    case actionTypes.ADD_NEW_USER_REACTION:
      selectedUserCopy = { ...state.selectedUser };

      if (!email === selectedUserCopy.email) {
        return;
      }

      const messageIndex = selectedUserCopy.messages?.findIndex(
        (m) => m.uuid === reaction.message.uuid
      );

      if (messageIndex > -1) {
        let messagesCopy = [...selectedUserCopy.messages];
        let reactionsCopy = [...messagesCopy[messageIndex].reactions];

        const reactionIndex = reactionsCopy.findIndex(
          (r) => r.uuid === reaction.uuid
        );

        if (reactionIndex > -1) {
          reactionsCopy[reactionIndex] = reaction;
        } else {
          reactionsCopy = [...reactionsCopy, reaction];
        }

        messagesCopy[messageIndex] = {
          ...messagesCopy[messageIndex],
          reactions: reactionsCopy,
        };

        selectedUserCopy = { ...selectedUserCopy, messages: messagesCopy };
      }

      return {
        ...state,
        selectedUser: selectedUserCopy,
      };

    default:
      return state;
  }
};

function MessageProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUsers = (users) => {
    dispatch({
      type: actionTypes.SET_USERS,
      payload: users,
    });
  };

  const setSelectedUser = (user) => {
    dispatch({
      type: actionTypes.SELECTED_USER,
      payload: user,
    });
  };

  const setUserMessages = (email, messages) => {
    dispatch({
      type: actionTypes.SET_USER_MESSAGES,
      payload: {
        email: email,
        messages: messages,
      },
    });
  };

  const addNewUserMessage = (email, message) => {
    dispatch({
      type: actionTypes.ADD_NEW_USER_MESSAGE,
      payload: {
        email: email,
        message: message,
      },
    });
  };

  const addNewUserReaction = (email, reaction) => {
    dispatch({
      type: actionTypes.ADD_NEW_USER_REACTION,
      payload: {
        email: email,
        reaction: reaction,
      },
    });
  };

  const value = {
    setSelectedUser,
    setUsers,
    setUserMessages,
    addNewUserMessage,
    addNewUserReaction,
    users: state.users,
    selectedUser: state.selectedUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default MessageProvider;
