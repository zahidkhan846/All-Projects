import { useQuery, useSubscription } from "@apollo/client";
import React, { useEffect } from "react";
import styles from "../styles/dashboard.module.css";
import Chat from "./Chat";
import { useMessage } from "../contexts/MessageProvider";
import Messages from "./Messages";
import { GET_USERS, NEW_MESSAGE, NEW_REACTION } from "../utils/GraphqlQuery";
import AddMessage from "./AddMessage";
import ChatHeader from "./UI/ChatHeader";

function DashBoard() {
  const {
    setUsers,
    users,
    addNewUserMessage,
    selectedUser,
    addNewUserReaction,
  } = useMessage();

  const { data, error } = useSubscription(NEW_MESSAGE);
  const { data: reactionData } = useSubscription(NEW_REACTION);

  useEffect(() => {
    if (reactionData) {
      const reaction = reactionData.newReaction;
      addNewUserReaction(selectedUser.email, reaction);
    }
  }, [reactionData]);

  useEffect(() => {
    if (error) console.log(error);
    if (data) {
      const message = data.newMessage;
      addNewUserMessage(selectedUser.email, message);
    }
  }, [data, error]);

  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) => setUsers(data.getUsers),
    onError: (err) => console.log(err),
  });

  let usersMarkup;

  if (!users || loading) {
    usersMarkup = <p>Loading...</p>;
  } else if (users.length === 0) {
    usersMarkup = <h2>No usersMarkup foumd.</h2>;
  } else if (users.length > 0) {
    usersMarkup = users.map((user) => <Chat key={user.id} user={user} />);
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.gridContainer}>
        <div className={styles.col1}>
          <ChatHeader />
          <ul>{usersMarkup}</ul>
        </div>
        <div className={styles.col2}>
          <Messages />
          <AddMessage />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
