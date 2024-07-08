import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Button from "../Button/Button";
import "./ExpenseModal.css";

Modal.setAppElement("#root");

const ExpenseModal = ({ isOpen, onRequestClose, onSave, expense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (expense) {
      setTitle(expense.title);
      setAmount(expense.amount);
      setCategory(expense.category);
      setDate(expense.date);
    } else {
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
    }
  }, [expense]);

  const handleSave = () => {
    const newExpense = {
      title,
      amount: Number(amount),
      category,
      date,
    };
    onSave(newExpense);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Expense Modal"
      className="expense-modal"
      overlayClassName="Overlay"
    >
      <h2>{expense ? "Edit Expense" : "Add Expense"}</h2>
      <>
        <div className="expense-modal-body">
          <div className="input-container">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>
          <div className="input-container">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <div className="input-container">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="Travel">Travel</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Food">Food</option>
            </select>
          </div>
          <div className="input-container">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="expense-modal-buttons">
          <Button
            onClick={handleSave}
            boxShadow="true"
            color="orange"
            style={{ borderRadius: "10px" }}
          >
            {expense ? "Update Expense" : "Add Expense"}
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
      </>
    </Modal>
  );
};

export default ExpenseModal;
