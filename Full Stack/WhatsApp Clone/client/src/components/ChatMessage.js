import React from "react";
import styles from "../styles/chat.module.css";
import moment from "moment";

function ChatMessage({ message }) {
  let receiver;
  if (message.status === true) {
    receiver = false;
  }
  return (
    <li
      className={`${styles.chatMessage} ${
        receiver ? `${styles.receiver}` : null
      }`}
    >
      <p
        className={`${styles.messageText}  ${
          receiver ? `${styles.receiverMessageText}` : null
        }`}
      >
        {message.text}
        <span className={styles.time}>
          {moment(message.createdOn).startOf("hour").fromNow()}
        </span>
      </p>
      <p className={styles.user}>{message.createdBy}</p>
    </li>
  );
}

export default ChatMessage;
