import React from "react";
import { Avatar } from "@material-ui/core";
import styles from "../styles/sidebar.module.css";

function ChatListButton() {
  return (
    <li className={styles.chatListButton}>
      <div>
        <Avatar src="https://picsum.photos/50" atl="avatar" />
      </div>
      <div>
        <h3>Chat Room</h3>
        <p>Lorem ipsum dolor sit.</p>
      </div>
    </li>
  );
}

export default ChatListButton;
