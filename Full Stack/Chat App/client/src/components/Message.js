import React, { useState } from "react";
import styles from "../styles/message.module.css";
import moment from "moment";
import { useAuth } from "../contexts/AuthProvider";
import { useMutation } from "@apollo/client";
import { REACT_ON_MESSAGE } from "../utils/GraphqlQuery";

function Message({ message, createdBy }) {
  const [reactOnMessage] = useMutation(REACT_ON_MESSAGE, {
    onError: (err) => console.error(err),
  });

  const { user } = useAuth();
  const [showEmotes, setShowEmotes] = useState(false);

  const reactionIcon = [...new Set(message.reactions.map((r) => r.content))];

  const handleShowEmots = () => {
    setShowEmotes((prevState) => !prevState);
  };

  const handleEmoteSelect = (reaction) => {
    reactOnMessage({
      variables: { uuid: message.uuid, content: reaction },
    });
  };

  const reactions = ["❤️", "😆", "😯", "😢", "😡", "👍", "👎"];

  const me = message.from === user.email;

  return (
    <li className={styles.li}>
      <div
        onClick={handleShowEmots}
        className={`${styles.message} ${me && styles.myMessage}`}
      >
        <p className={styles.content}>{message.content}</p>
        <div className={styles.info}>
          <p className={styles.time}>
            {moment(message.createdAt).startOf("minuts").fromNow()}
          </p>
          <p className={styles.username}>{me ? "Me" : createdBy}</p>
        </div>
        {message.reactions.length > 0 && (
          <div className={me ? styles.selectedEmote : styles.otherEmote}>
            {reactionIcon} {message.reactions.length}
          </div>
        )}
        {showEmotes && (
          <div className={styles.emoji}>
            {reactions.map((reaction) => (
              <button
                onClick={() => handleEmoteSelect(reaction)}
                key={reaction}
              >
                {reaction}
              </button>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

export default Message;
