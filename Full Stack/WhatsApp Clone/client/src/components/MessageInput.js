import React, { useRef } from "react";
import styles from "../styles/chat.module.css";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { IconButton } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MicIcon from "@material-ui/icons/Mic";

function MessageInput() {
  const textRef = useRef();

  const handleSubmit = async (e) => {
    const text = textRef.current.value;

    e.preventDefault();
    await fetch("http://localhost:8080/add-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        createdBy: "Zahid Khan",
      }),
    });
  };

  return (
    <div className={styles.sendNewMessage}>
      <IconButton>
        <InsertEmoticonIcon className={styles.miIcon} />
      </IconButton>
      <IconButton>
        <AttachFileIcon className={styles.miIcon} />
      </IconButton>
      <form onSubmit={handleSubmit} className={styles.messageInput}>
        <input type="text" placeholder="Type a message" ref={textRef} />
        <button type="submit" style={{ display: "none" }}></button>
      </form>
      <IconButton>
        <MicIcon className={styles.miIcon} />
      </IconButton>
    </div>
  );
}

export default MessageInput;
