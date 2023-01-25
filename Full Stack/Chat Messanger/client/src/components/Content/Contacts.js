import React from "react";
import { ListGroup } from "react-bootstrap";
import { useContacts } from "../../contexts/ContactsProvider";
import "./style.css";

function Contacts() {
  const { contacts } = useContacts();
  return (
    <ListGroup variant="flush">
      {contacts.map((contact) => (
        <ListGroup.Item className="lists" key={contact.id}>
          {contact.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Contacts;
