import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import BalanceCard from '../components/BalanceCard/BalanceCard';
import ExpenseCard from '../components/ExpenseCard/ExpenseCard';
import ExpensePieChart from '../components/PieChart/PieChart';
import TransactionList from '../components/TransactionList/TransactionList';
import ProgressBars from '../components/ProgressBars/ProgressBars';
import BalanceModal from '../components/BalanceModal/BalanceModal';
import ExpenseModal from '../components/ExpenseModal/ExpenseModal';
import ConfirmModal from '../components/ConfirmModal/ConfirmModal'; 
import { loadState, saveState } from '../services/db';
import './HomePage.css';

const HomePage = () => {
  const initialState = {
    walletBalance: 5000,
    expenses: [],
  };

  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useState(loadState() || initialState);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const addBalance = (amount) => {
    setState((prevState) => ({
      ...prevState,
      walletBalance: prevState.walletBalance + amount,
      balanceHistory: [
        ...prevState.balanceHistory,
        { id: Date.now(), amount, created_at: new Date().toISOString() },
      ],
    }));
  };

  const handleAddBalanceClick = () => {
    setIsBalanceModalOpen(true);
  };

  const handleCloseBalanceModal = () => {
    setIsBalanceModalOpen(false);
  };

  const addExpense = (expense) => {
    if (expense.amount > state.walletBalance) {
      enqueueSnackbar('Insufficient balance', { variant: 'error' });
      return;
    }

    const newExpense = {
      id: Date.now(),
      ...expense,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setState((prevState) => ({
      ...prevState,
      walletBalance: prevState.walletBalance - expense.amount,
      expenses: [...prevState.expenses, newExpense],
    }));
  };

  const handleAddExpenseClick = () => {
    setEditingExpense(null);
    setIsExpenseModalOpen(true);
  };

  const handleCloseExpenseModal = () => {
    setIsExpenseModalOpen(false);
  };

  const editExpense = (id) => {
    const expense = state.expenses.find((exp) => exp.id === id);
    setEditingExpense(expense);
    setIsExpenseModalOpen(true);
  };

  const saveExpense = (expense) => {
    if (editingExpense) {
      const updatedExpenses = state.expenses.map((exp) =>
        exp.id === editingExpense.id ? { ...exp, ...expense, updated_at: new Date().toISOString() } : exp
      );
      setState((prevState) => ({
        ...prevState,
        expenses: updatedExpenses,
      }));
    } else {
      addExpense(expense);
    }
  };

  const deleteExpense = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = () => {
    setState((prevState) => {
      const expense = prevState.expenses.find((exp) => exp.id === deleteId);
      return {
        ...prevState,
        walletBalance: prevState.walletBalance + expense.amount,
        expenses: prevState.expenses.filter((exp) => exp.id !== deleteId),
      };
    });
    setConfirmDeleteOpen(false);
    enqueueSnackbar('Expense deleted successfully', { variant: 'success' });
  };

  const closeConfirmModal = () => {
    setConfirmDeleteOpen(false);
  };

  // Calculate total expenses
  const totalExpense = state.expenses.reduce((acc, expense) => acc + expense.amount, 0);

  return (
    <div>
      <div className="top-section">
        <BalanceCard balance={state.walletBalance} onAddBalance={handleAddBalanceClick} />
        <ExpenseCard totalExpense={totalExpense} onAddExpense={handleAddExpenseClick} />
        <ExpensePieChart expenses={state.expenses} />
      </div>
      <div className="bottom-section">
        <div className="left-column">
          <TransactionList expenses={state.expenses} onEdit={editExpense} onDelete={deleteExpense} />
        </div>
        <div className="right-column">
          <ProgressBars expenses={state.expenses} />
        </div>
      </div>
      <BalanceModal isOpen={isBalanceModalOpen} onRequestClose={handleCloseBalanceModal} onAddBalance={addBalance} />
      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onRequestClose={handleCloseExpenseModal}
        onSave={saveExpense}
        expense={editingExpense}
      />
      <ConfirmModal
        isOpen={confirmDeleteOpen}
        onRequestClose={closeConfirmModal}
        onConfirm={confirmDelete}
        header="Delete Expense"
        message="Are you sure you want to delete this expense?"
      />
    </div>
  );
};

export default HomePage;
