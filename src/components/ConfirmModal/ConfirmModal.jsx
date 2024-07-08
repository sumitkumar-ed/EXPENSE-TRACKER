import React from "react";
import Modal from "react-modal";
import Button from "../Button/Button";
import "./ConfirmModal.css";

Modal.setAppElement("#root");

const ConfirmModal = ({
  isOpen,
  onRequestClose,
  onConfirm,
  header,
  message,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Modal"
      className="confirm-modal"
      overlayClassName="Overlay"
    >
      <h2>{header}</h2>
      <p>{message}</p>
      <div className="confirm-modal-buttons">
        <Button
          onClick={onConfirm}
          boxShadow="true"
          color="orange"
          style={{ borderRadius: "10px" }}
        >
          Confirm
        </Button>

        <Button
          onClick={onRequestClose}
          boxShadow="true"
          color="gray"
          style={{ borderRadius: "10px", color: "black" }}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
