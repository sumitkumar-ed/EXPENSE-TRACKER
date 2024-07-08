import React, { useState } from "react";
import "./TransactionList.css";
import { ReactComponent as EditIcon } from "../../assets/edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { ReactComponent as FoodIcon } from "../../assets/food.svg";
import { ReactComponent as TravelIcon } from "../../assets/travel.svg";
import { ReactComponent as EntertainmentIcon } from "../../assets/entertainment.svg";
import { ReactComponent as RightArrow } from "../../assets/rightArrow.svg";
import { ReactComponent as LeftArrow } from "../../assets/leftArrow.svg";

const TransactionList = ({ expenses, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const renderCategoryIcon = (category) => {
    switch (category) {
      case "Food":
        return <FoodIcon className="info-icon" />;
      case "Travel":
        return <TravelIcon className="info-icon" />;
      case "Entertainment":
        return <EntertainmentIcon className="info-icon" />;
      default:
        return null;
    }
  };

  const handlePageChange = (direction) => {
    if (
      direction === "next" &&
      currentPage < Math.ceil(expenses.length / itemsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentExpenses = sortedExpenses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <h3 className="recent-transaction-title">Recent Transactions</h3>
      <div className="recentTransactions">
        {sortedExpenses.length === 0 ? (
          <div className="no-data">
            <p>No transactions available.</p>
          </div>
        ) : (
          <ul className="transaction-list">
            {currentExpenses.map((expense) => (
              <li key={expense.id}>
                <div className="transaction-item">
                  <div className="transaction-details">
                    <div>{renderCategoryIcon(expense.category)}</div>
                    <div className="transaction-info">
                      <h4 className="transaction-title">{expense.title}</h4>
                      <p className="transaction-date">
                        {formatDate(expense.date)}
                      </p>
                    </div>
                  </div>
                  <div className="transaction-icon">
                    <div className="transaction-amount">₹{expense.amount}</div>
                    <EditIcon
                      className="edit-icon"
                      onClick={() => onEdit(expense.id)}
                    />
                    <DeleteIcon
                      className="delete-icon"
                      onClick={() => onDelete(expense.id)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {sortedExpenses.length > 0 && (
          <div className="pagination">
            <LeftArrow
              className="left-arrow"
              onClick={() => handlePageChange("prev")}
            />
            <div className="page-no">{currentPage}</div>
            <RightArrow
              className="right-arrow"
              onClick={() => handlePageChange("next")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
