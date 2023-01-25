import React from "react";
import styles from "../../styles/dashboard.module.css";
import { IconButton } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import CreateIcon from "@material-ui/icons/Create";

function ChatHeader() {
  return (
    <div className={styles.headerLeft}>
      <h2 className={styles.heading}>Chats</h2>
      <div className={styles.headerIcons}>
        <div className={styles.headerButtons}>
          <IconButton>
            <MoreHorizIcon className={styles.icon} />
          </IconButton>
          <IconButton>
            <VideoCallIcon className={styles.icon} />
          </IconButton>
          <IconButton>
            <CreateIcon className={styles.icon} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
