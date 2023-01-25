import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import styles from "../styles/messanger.module.css";
import { useAuth } from "../context/AuthContext";
import { Redirect } from "react-router";
import Pusher from "pusher-js";

function Messanger() {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getAllMessages = async () => {
      const res = await fetch("http://localhost:8080/get-messages");
      const data = await res.json();
      setMessages(data.messages);
    };
    getAllMessages();
  }, []);

  useEffect(() => {
    const pusher = new Pusher("9d78fbf334d7c5481dde", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      console.log(data);
      setMessages([...messages, data]);
    });

    return () => {
      pusher.unbind_all();
      pusher.unsubscribe();
    };
  }, [messages]);

  if (!currentUser) {
    return <Redirect to="/signin" />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.appBody}>
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default Messanger;
