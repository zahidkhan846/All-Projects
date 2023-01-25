import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useContacts } from "../contexts/ContactsProvider";
import { useSocket } from "./SocketProvider";
import { arrayEquality } from "./HelperFunctions";

const ConversationContext = createContext();

export const useConversations = () => useContext(ConversationContext);

function ConversationsProvider({ children, id }) {
  const [selectedConvoIndex, setSelectedConvoIndex] = useState(0);

  const { contacts } = useContacts();

  const socket = useSocket();

  const [conversations, setConvetations] = useLocalStorage("conversation", []);

  const createConversation = (recipients) => {
    setConvetations((prevState) => {
      return [...prevState, { recipients, messages: [] }];
    });
  };

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((c) => {
        return c.id === recipient;
      });
      const name = (contact && contact.name) || recipient;

      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });

      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;

      return { ...message, senderName: name, fromMe };
    });
    const selected = index === selectedConvoIndex;

    return { ...conversation, messages, recipients, selected };
  });

  const addMessageToConversations = useCallback(
    ({ recipients, text, sender }) => {
      setConvetations((prevConversations) => {
        let madeChanges = false;

        const newMessage = {
          sender,
          text,
        };

        const newConversations = prevConversations.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChanges = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });

        if (madeChanges) {
          return newConversations;
        } else {
          return [
            ...prevConversations,
            {
              recipients,
              messages: [newMessage],
            },
          ];
        }
      });
    },
    [setConvetations]
  );

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", addMessageToConversations);
    return () => socket.off("receive-message");
  }, [socket, addMessageToConversations]);

  const sendMessage = (recipients, text) => {
    socket.emit("send-message", { recipients, text });

    addMessageToConversations({ recipients, text, sender: id });
  };

  const value = {
    selectedConversation: formattedConversations[selectedConvoIndex],
    formattedConversations,
    createConversation,
    setSelectedConvoIndex,
    sendMessage,
  };

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
}

export default ConversationsProvider;
