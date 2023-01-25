import React from "react";
import styles from "../../styles/dashboard.module.css";
import { IconButton } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import CreateIcon from "@material-ui/icons/Create";

function IconButtons() {
  return (
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
  );
}

export default IconButtons;
