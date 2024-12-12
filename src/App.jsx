import './App.css';
import React, { useState, useEffect } from 'react';
import Users from './components/UserTable';
import Expense from './components/ExpenseTable';
import Category from './components/CategoryTable';
import CreateUser from './components/CreateUser';
import CreateExpense from './components/CreateExpense';
import EditUser from './components/EditUser';
import EditExpense from './components/EditExpense';

function App() {
  const CATEGORIES = ['Meals', 'Rent', 'Recreational', 'Utilities', 'Transportation', 'Health', 'Subscriptions' ,'Other'];
  
  const [users, setUsers] = useState({}); //{ 0: {id:0, first:'bob', last: 'john', total: 0, expenses: [2, 33, ..]}}
  const [userCount, setUserCount] = useState(0);
  const [expenses, setExpenses] = useState({});//{0: {id: 0, category: 1, userId: 0, cost: 5, description: 'test'}}
  const [expenseCount, setExpenseCount] = useState(0);
  const [categoryTotals, setCategoryTotals] = useState(Array(CATEGORIES.length).fill(0)); // [0, 4, 2, ..]

  const incrementUserCount = () => setUserCount((counter)=>counter + 1);
  const incrementExpenseCount = () => setExpenseCount((counter)=>counter + 1);

  const addUser = (newUser) => {
    incrementUserCount();
    const newEntry = {
      id: userCount,
      total: 0,
      expenses: [],
      ...newUser,
    };

    setUsers( (prevUsers) => ({
      ...prevUsers,
      [newEntry.id] : newEntry,
    }));
  };

  const addExpense = (newExpense) => {

    //update expense id and make sure its used properly
    incrementExpenseCount();
    const newEntry = {
      id: expenseCount,
      ...newExpense,
    };

    // Add expense to expenses
    setExpenses( (prevExpenses) => ({
      ...prevExpenses,
      [newEntry.id] : newEntry,
    }));

    // Add expense to user
    setUsers( (prevUsers) => ({
      ...prevUsers,
      [newEntry.userId] : {...prevUsers[newEntry.userId], 
                          total: parseInt(prevUsers[newEntry.userId].total) + parseInt(newEntry.cost), 
                          expenses: prevUsers[newEntry.userId].expenses.concat([newEntry.id]),
                        },
    }));

    // Add expense to category
    const newTotal = [...categoryTotals]; 
    newTotal[newEntry.category] = parseInt(newTotal[newEntry.category]) + parseInt(newEntry.cost);
    setCategoryTotals( () => newTotal);
  };

  const deleteUser = (userId) => {
    // Remove expenses with this userID
    // Will also remove expense from category totals
    // Keep track of category totals and subtract at end
    const expenseList = users[userId]['expenses'];
    const catTotalsRemoval = Array(CATEGORIES.length).fill(0);
    const oldCategoryTotals = [...categoryTotals];
    const newExpenses = {...expenses};
    expenseList.forEach( (expenseId) => {
      const expenseCat = expenses[expenseId].category;
      catTotalsRemoval[expenseCat] = parseInt(catTotalsRemoval[expenseCat]) - parseInt(expenses[expenseId].cost);
      delete newExpenses[expenseId];
    });

    // Update expense table to have new expenses
    setExpenses( () => newExpenses );

    //Add subtracted catTotals with current category totals to get new totals
    const newCatTotals = catTotalsRemoval.map( (value, index) => value + oldCategoryTotals[index]);

    // Update category table to have new category totals
    setCategoryTotals( () => newCatTotals );

    //Delete user from users table
    setUsers((prevUsers) => {
      const newUsers = {...prevUsers};
      delete newUsers[userId];
      return newUsers;
    });
  };

  const deleteExpense = (expenseId) => {
    const delExpenseCost = parseInt(expenses[expenseId].cost);
    const delExpenseUserId = expenses[expenseId].userId;
  
    // Update User table to update user's total and list of expenses
    setUsers( (prevUsers) => ({
      ...prevUsers,
      [delExpenseUserId] : {...users[delExpenseUserId], 
                            total: parseInt(users[delExpenseUserId].total) - delExpenseCost,
                            expenses: users[delExpenseUserId].expenses.filter( (val) => parseInt(val) !== parseInt(expenseId)),},
    }));

    // Update Category totals to remove cost
    const delExpenseCat = expenses[expenseId].category;
    const newCatTotals = [...categoryTotals];
    newCatTotals[delExpenseCat] = parseInt(newCatTotals[delExpenseCat]) - delExpenseCost;
    setCategoryTotals( () => newCatTotals);

    //Delete expense from expense table
    setExpenses( (prevExpenses) => {
      const newExpenses = {...prevExpenses};
      delete newExpenses[expenseId];
      return newExpenses;
    });
  };

  const editUser = (updateUser) => {
      setUsers( (prevUser) => ({
        ...prevUser,
        [updateUser.id] : {...updateUser, 
                          total: prevUser[updateUser.id].total,
                          expenses: [...prevUser[updateUser.id].expenses]},
      }));
  };

  const editExpense = (updateExpense) => {

    // Change Category - Update category totals
    // Change User - Update both users totals and expense list
    // Change Cost - Update user's total and category totals
    // Therefore: Update category totals and update user totals and expense lists
    const originalExpenseInfo = expenses[updateExpense.id];
    const originalUserId = originalExpenseInfo.userId;
    const newUserId = updateExpense.userId;


    //Update original user
    setUsers( (prevUsers) => {
      const originalInfo = prevUsers[originalUserId];
      return ({
      ...prevUsers,
      [originalUserId] : {...prevUsers[originalUserId], 
                        total: parseInt(originalInfo.total) - parseInt(originalExpenseInfo.cost),
                        expenses: originalInfo.expenses.filter( (val) => parseInt(val) !== parseInt(updateExpense.id)),
                      }
      })
    });

    //Update new user
    setUsers( (prevUsers) => {
      const newInfo = prevUsers[newUserId];
      return ({
      ...prevUsers,
      [newUserId] : {...prevUsers[newUserId], 
                        total: parseInt(newInfo.total) + parseInt(updateExpense.cost),
                        expenses: newInfo.expenses.concat([updateExpense.id]),
                      }
      })
    });

    //Update category totals
    const newCats = [...categoryTotals];
    newCats[originalExpenseInfo.category] = parseInt(newCats[originalExpenseInfo.category]) - parseInt(originalExpenseInfo.cost);
    newCats[updateExpense.category] = parseInt(newCats[updateExpense.category]) + parseInt(updateExpense.cost);
    setCategoryTotals( () => newCats);

    // Update expense table
    setExpenses( (prevExpenses) => ({
      ...prevExpenses,
      [updateExpense.id] : {...updateExpense},
    }));
  };

  return (<>
    <h1>User Management</h1>
    <h3>Create New User</h3>
    <CreateUser onSubmit={addUser}/>
    <br></br>
    <h3>Edit User</h3>
    <EditUser onSubmit={editUser} users={users}/>
    <br></br>
    <Users data={users} onDelete={deleteUser}/>
    
    <br></br><br></br>
    
    <h1>Expense Management</h1>
    <h3>Create New Expense</h3>
    <CreateExpense onSubmit={addExpense} categories={CATEGORIES} users={users} />
    <br></br>
    <h3>Edit Expense</h3>
    <EditExpense onSubmit={editExpense} categories={CATEGORIES} users={users} expenses={expenses}/>
    <br></br>
    <Expense data={expenses} users={users} categories={CATEGORIES} onDelete={deleteExpense} />
    
    <br></br><br></br>

    <h1>Total Cost by Category</h1>
    <Category data={categoryTotals} categories={CATEGORIES}/>
  </>)
}

export default App
