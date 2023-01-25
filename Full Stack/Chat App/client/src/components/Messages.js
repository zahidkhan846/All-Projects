import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useMessage } from "../contexts/MessageProvider";
import styles from "../styles/messages.module.css";
import { GET_MESSAGES } from "../utils/GraphqlQuery";
import Message from "./Message";

function Messages() {
  const { setUserMessages, selectedUser } = useMessage();

  const messages = selectedUser?.messages;

  const [getMessages, { loading, data }] = useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser.email } });
    }
  }, [selectedUser, getMessages]);

  useEffect(() => {
    if (data) {
      setUserMessages(selectedUser.email, data.getMessages);
    }
  }, [data]);

  let selectedChatMessages;

  if (!messages && !loading) {
    selectedChatMessages = <li>Select a chat to view the messages.</li>;
  } else if (loading) {
    selectedChatMessages = <li>Loading...</li>;
  } else if (messages.length > 0) {
    selectedChatMessages = messages.map((message) => {
      return (
        <Message
          key={message.uuid}
          message={message}
          createdBy={selectedUser.username}
        />
      );
    });
  } else if (messages.length === 0) {
    selectedChatMessages = <li>Your messages will appear here.</li>;
  }
  return <ul className={styles.messagesList}>{selectedChatMessages}</ul>;
}

export default Messages;
