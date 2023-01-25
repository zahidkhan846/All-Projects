import React, { Fragment, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useContacts } from "../../contexts/ContactsProvider";
import { useConversations } from "../../contexts/ConvertationsProvider";

function NewConversationsModal({ closeModal }) {
  const { createConversation } = useConversations();
  const { contacts } = useContacts();
  const [selectedContactIds, setSelectedContactIds] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createConversation(selectedContactIds);
    closeModal();
  };

  const handleCheckboxChange = (id) => {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(id)) {
        return prevSelectedContactIds.filter((c) => c !== id);
      } else {
        return [...prevSelectedContactIds, id];
      }
    });
  };
  return (
    <Fragment>
      <Modal.Header closeButton>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {contacts.map((contact) => (
              <Form.Group controlId={contact.id} key={contact.id}>
                <Form.Check
                  type="checkbox"
                  value={selectedContactIds.includes(contact.id)}
                  label={contact.name}
                  onChange={() => handleCheckboxChange(contact.id)}
                />
              </Form.Group>
            ))}
            <Button type="submit">Add</Button>
          </Form>
        </Modal.Body>
      </Modal.Header>
    </Fragment>
  );
}

export default NewConversationsModal;
