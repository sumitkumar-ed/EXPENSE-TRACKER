import React from "react";
import Card from "../Card/Card";
import Button from "../Button/Button";
import "./ExpenseCard.css";

const ExpenseCard = ({ totalExpense, onAddExpense }) => (
  <Card>
    <div className="expense-card">
      <div className="card-header">
        <h3>Expenses :</h3>
        <p>₹{totalExpense}</p>
      </div>
      <Button
        onClick={onAddExpense}
        color="red"
        style={{ borderRadius: "20px" }}
      >
        + Add Expense
      </Button>
    </div>
  </Card>
);

export default ExpenseCard;
