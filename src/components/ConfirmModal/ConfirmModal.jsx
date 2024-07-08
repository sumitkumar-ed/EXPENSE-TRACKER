import React from 'react';
import Modal from 'react-modal';
import './ConfirmModal.css';

Modal.setAppElement('#root');

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm, header, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>{header}</h2>
      <p>{message}</p>
      <div className="modal-buttons">
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onRequestClose}>Cancel</button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
