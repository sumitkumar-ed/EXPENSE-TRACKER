import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import "./PieChart.css";


const ExpensePieChart = ({ expenses }) => {
  const data = expenses.reduce((acc, expense) => {
    const existing = acc.find(item => item.name === expense.category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  const COLORS = ['#FDE006', '#FF9304', '#A000FF'];

  return (
    <PieChart width={250} height={250}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend align="center" />
    </PieChart>
  );
};

export default ExpensePieChart;
