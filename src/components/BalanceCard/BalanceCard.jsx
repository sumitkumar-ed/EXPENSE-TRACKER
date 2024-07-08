import React from "react";
import Card from "../Card/Card";
import Button from "../Button/Button";
import "./BalanceCard.css";

const BalanceCard = ({ balance, onAddBalance }) => (
  <Card>
    <div className="balanceCard">
      <div className="card-header">
        <h3>Wallet Balance :</h3>
        <p>₹{balance}</p>
      </div>

      <Button
        onClick={onAddBalance}
        color="green"
        style={{ borderRadius: "20px" }}
      >
        + Add Income
      </Button>
    </div>
  </Card>
);

export default BalanceCard;
