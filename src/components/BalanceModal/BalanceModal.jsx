import React, { useState } from 'react';
import Modal from 'react-modal';
import './BalanceModal.css';

Modal.setAppElement('#root'); // This is important for accessibility

const BalanceModal = ({ isOpen, onRequestClose, onAddBalance }) => {
  const [amount, setAmount] = useState('');

  const handleAddBalance = () => {
    onAddBalance(Number(amount));
    setAmount('');
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Balance"
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>Add Balance</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <div className="modal-buttons">
        <button onClick={handleAddBalance}>Add</button>
        <button onClick={onRequestClose}>Cancel</button>
      </div>
    </Modal>
  );
};

export default BalanceModal;
