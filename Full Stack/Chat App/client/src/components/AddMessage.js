import { IconButton } from "@material-ui/core";
import React, { useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import styles from "../styles/addMessage.module.css";
import { useMutation } from "@apollo/client";
import { useMessage } from "../contexts/MessageProvider";
import { SEND_MESSAGE } from "../utils/GraphqlQuery";

function AddMessage() {
  const { selectedUser } = useMessage();

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: (err) => console.log(err),
  });

  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedUser) return;
    if (content.trim() === "") return;

    sendMessage({ variables: { to: selectedUser.email, content } });
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addMessage}>
      <input
        type="text"
        placeholder="Type your message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <IconButton type="submit" className={styles.addMessageIcon}>
        <SendIcon />
      </IconButton>
    </form>
  );
}

export default AddMessage;
