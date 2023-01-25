import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ContactContext = createContext();

export const useContacts = () => useContext(ContactContext);

function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  const createContact = (id, name) => {
    setContacts((prevState) => {
      return [...prevState, { id, name }];
    });
  };

  const value = {
    contacts,
    createContact,
  };

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
}

export default ContactsProvider;
