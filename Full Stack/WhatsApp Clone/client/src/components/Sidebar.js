import React from "react";
import styles from "../styles/sidebar.module.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import ChatListButton from "./ChatListButton";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.headerLeft}>
          <div>
            <Avatar src="https://picsum.photos/50" atl="avatar" />
          </div>
          <div className={styles.leftIcons}>
            <div>
              <IconButton>
                <DonutLargeIcon />
              </IconButton>
            </div>
            <div>
              <IconButton>
                <ChatIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
      </div>

      <div className={styles.sidebarSearch}>
        <div className={styles.searchContainer}>
          <SearchIcon className={styles.searchIcon} />
          <input type="text" placeholder="Search or start new chat..." />
        </div>
      </div>
      <ul className={styles.chat}>
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
        <ChatListButton />
      </ul>
    </div>
  );
};

export default Sidebar;
