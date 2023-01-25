import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../../contexts/ConvertationsProvider";
import "./style.css";

export default function Conversations() {
  const { formattedConversations, setSelectedConvoIndex } = useConversations();

  return (
    <ListGroup variant="flush">
      {formattedConversations.map((conversation, index) => (
        <ListGroup.Item
          action
          onClick={() => setSelectedConvoIndex(index)}
          active={conversation.selected}
          className="lists"
          key={index}
        >
          {conversation.recipients
            .map((recipient) => recipient.name)
            .join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
