import React, { useState } from "react";
import Modal from "react-modal";
import Button from "../Button/Button";
import "./BalanceModal.css";

Modal.setAppElement("#root"); // This is important for accessibility

const BalanceModal = ({ isOpen, onRequestClose, onAddBalance }) => {
  const [amount, setAmount] = useState("");

  const handleAddBalance = () => {
    onAddBalance(Number(amount));
    setAmount("");
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Balance"
      className="balance-modal"
      overlayClassName="Overlay"
    >
      <h2>Add Balance</h2>
      <div className="balance-modal-body">
        <div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div className="balance-modal-buttons">
          <Button
            onClick={handleAddBalance}
            boxShadow="true"
            color="orange"
            style={{ borderRadius: "10px" }}
          >
            Add Income
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
      </div>
    </Modal>
  );
};

export default BalanceModal;
