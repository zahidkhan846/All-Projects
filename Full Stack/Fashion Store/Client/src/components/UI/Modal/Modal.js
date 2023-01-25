import React, { useState } from "react";
import reactDom from "react-dom";
import { firestore, storage } from "../../../config/firebase";
import { useAuth } from "../../../store/contexts/AuthContext";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./Modal.module.css";

function Modal({ closeModal }) {
  const { currentUser } = useAuth();

  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storageRef = await storage.ref("users/" + currentUser.uid);

    storageRef.put(image);

    const imageUrl = await storageRef.getDownloadURL();

    firestore.collection("users").doc(currentUser.uid).set({
      email: email,
      phone: phone,
      name: name,
      pin: pin,
      address: address,
      imageUrl: imageUrl,
    });
    closeModal();
  };

  return reactDom.createPortal(
    <div className={styles.modalContainer}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <Input
            type="text"
            label="Name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Input
            type="email"
            label="Email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type="number"
            label="Phone"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <Input
            type="number"
            label="PIN"
            id="pin"
            onChange={(e) => setPin(e.target.value)}
            value={pin}
          />
          <div className={styles.formControl}>
            <label htmlFor="file" className={styles.label}>
              Profile Picture
            </label>
            <input
              type="file"
              id="file"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="address">Address</label>
            <textarea
              name="address"
              id="address"
              rows="5"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            ></textarea>
          </div>
          <div className={styles.buttons}>
            <Button customstyle="full-width btn-primary" type="submit">
              Submit
            </Button>
            <Button customstyle="full-width btn-primary" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
