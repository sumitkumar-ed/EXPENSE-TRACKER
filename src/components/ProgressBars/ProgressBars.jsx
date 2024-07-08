import React from "react";
import "./ProgressBars.css";

const ProgressBars = ({ expenses }) => {
  // Calculate total value of all categories
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  // Create an array of categories with their total amounts
  const categories = expenses.reduce((acc, expense) => {
    const existing = acc.find((item) => item.name === expense.category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  // Sort categories by percentage value (high to low)
  categories.sort((a, b) => b.value / total - a.value / total);

  return (
    <div className="progress-bars-container">
      <h3 className="top-expenses-title">Top Expenses</h3>

      <div className="top-expenses">
        {categories.length === 0 ? (
          <div className="no-data">
            <p>No expenses available.</p>
          </div>
        ) : (
          <>
            {categories.map((category, index) => (
              <div key={index} className="top-expenses-item">
                <div className="top-expenses-content">
                  <p>{category.name}</p>
                  <div className="progress-bar-wrapper">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${(category.value / total) * 100}%`,
                        backgroundColor: "#8784D2",
                      }}
                    >
                      ₹ {category.value}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProgressBars;
