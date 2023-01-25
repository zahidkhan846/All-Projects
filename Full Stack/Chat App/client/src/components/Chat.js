import React from "react";
import styles from "../styles/chat.module.css";
import classNames from "classnames";
import { useMessage } from "../contexts/MessageProvider";

function Chat({ user }) {
  const { setSelectedUser, selectedUser } = useMessage();

  const currentChat = selectedUser?.email === user.email;

  const handleChatSelect = () => {
    setSelectedUser(user);
  };

  return (
    <li
      className={classNames(styles.chatList, { active: currentChat })}
      onClick={handleChatSelect}
    >
      <div className={styles.image}>
        <img src={user.imageUrl} alt={user.username} />
      </div>
      <div className={styles.chatInfo}>
        <h3>{user.username}</h3>
        <p>{user.latestMessage?.content || "No messages available..."}</p>
      </div>
    </li>
  );
}

export default Chat;
