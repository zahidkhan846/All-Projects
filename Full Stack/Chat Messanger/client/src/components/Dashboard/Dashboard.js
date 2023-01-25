import React from "react";
import ConversationsProvider, {
  useConversations,
} from "../../contexts/ConvertationsProvider";
import { SocketProvider } from "../../contexts/SocketProvider";
import OpenConversation from "../Content/OpenConversation";
import Sidebar from "../Sidebar/Sidebar";

export default function Dashboard({ id }) {
  const { selectedConversation } = useConversations();

  return (
    <SocketProvider id={id}>
      <ConversationsProvider id={id}>
        <div className="d-flex" style={{ height: "100vh" }}>
          <Sidebar id={id} />
          {selectedConversation && <OpenConversation />}
        </div>
      </ConversationsProvider>
    </SocketProvider>
  );
}
