import React from "react";
import styles from "../styles/chat.module.css";
import { Avatar, IconButton } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";

function Chat(props) {
  return (
    <div className={styles.chat}>
      <div className={styles.chatHeader}>
        <div className={styles.headerLeft}>
          <Avatar />
          <div className={styles.headerInfo}>
            <h3>Room Name</h3>
            <p>Last seen 1hrs ago</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <main className={styles.chatMain}>
        <ul className={styles.chatBody}>
          {props.messages.map((message) => (
            <ChatMessage key={message._id} message={message} />
          ))}
        </ul>
      </main>
      <footer>
        <MessageInput />
      </footer>
    </div>
  );
}

export default Chat;
