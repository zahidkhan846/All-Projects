import React, { useState } from "react";
import { Nav, Tab, Button, Modal } from "react-bootstrap";
import Conversations from "../Content/Conversations";
import Contacts from "../Content/Contacts";
import NewContactsModal from "../Content/NewContactsModal";
import NewConversationsModal from "../Content/NewConversationsModal";

const CONVERSATIONS = "conversations";
const CONTACTS = "contacts";

export default function Sidebar({ id }) {
  const [active, setActive] = useState(CONVERSATIONS);
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const convoIsOpen = active === CONVERSATIONS;

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container activeKey={active} onSelect={setActive}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small">
          Your Id: <span className="text-muted">{id && id}</span>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          className="rounded-0"
          variant="dark"
        >
          New {convoIsOpen ? "Conversations" : "Contacts"}
        </Button>
        <Modal show={modalOpen} onHide={closeModal}>
          {convoIsOpen ? (
            <NewConversationsModal closeModal={closeModal} />
          ) : (
            <NewContactsModal closeModal={closeModal} />
          )}
        </Modal>
      </Tab.Container>
    </div>
  );
}
