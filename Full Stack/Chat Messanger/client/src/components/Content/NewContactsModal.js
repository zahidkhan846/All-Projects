import React, { Fragment, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContacts } from "../../contexts/ContactsProvider";

function NewContactsModal({ closeModal }) {
  const { createContact } = useContacts();

  const uIdRef = useRef();
  const uNameRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    createContact(uIdRef.current.value, uNameRef.current.value);
    closeModal();
  };
  return (
    <Fragment>
      <Modal.Header closeButton>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>User Id</Form.Label>
              <Form.Control type="text" ref={uIdRef} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" ref={uNameRef} required />
            </Form.Group>
            <Button type="submit">Add Contact</Button>
          </Form>
        </Modal.Body>
      </Modal.Header>
    </Fragment>
  );
}

export default NewContactsModal;
