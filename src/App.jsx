import './App.css';
import React, { createContext, useState } from 'react';
import Users from './components/UserTable';
import Expense from './components/ExpenseTable';
import Category from './components/CategoryTable';


function App() {
  const [users, setUsers] = useState({ 1: {id:1, first:'bob', last: 'john', total: 0}});
  const [expenses, setExpenses] = useState({1: {id: 1, category: 1, userId: 1, cost: 5, description: 'test'}});
  const [categoryTotals, setCategoryTotals] = useState({1: {id: 1, total: 100}});

  // Table stored as object where key is id and value is data object
  // setUsers( () => {return { '1': {id:1, first:'bob', last: 'john', total: 0}} });

  const CATEGORIES = ['Food', 'Rent', 'Recreational', 'Utilities', 'Transportation', 'Health', 'Other'];

  return (<>
    <Users data={users} />
    <Expense data={expenses} users={users} categories={CATEGORIES}/>
    <Category data={categoryTotals} categories={CATEGORIES}/>
  </>)
}

export default App
