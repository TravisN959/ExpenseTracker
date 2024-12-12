import { useState } from "react";

export default function EditExpense({onSubmit, categories, users, expenses}){
    const expenseList = Object.values(expenses);
    const userList = Object.values(users);

    const [form, setForm] = useState({
        id: -1,
        category: '',
        userId: '',
        cost: 0,
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (onSubmit && form.id !== -1) {
          onSubmit(form); // Pass data up
        }

        setForm({
            id: -1, 
            category: '',
            userId: '',
            cost: 0,
            description: '' 
        }); // reset
      };

    return (<div>
        <form onSubmit={handleSubmit}>
            <label>
                Expense ID
                <select name='id' type='text' value={form.id} onChange={handleChange} required>
                    <option value={-1} disabled>Select Expense</option>
                    {
                        expenseList.map( (expense) => (
                            <option key={`catEE-${expense.id}`} value={expense.id}>{expense.description} - {expense.id}</option>
                        ))
                    }
                </select>
            </label>
            <label>
                Category
                <select name='category' type='text' value={form.category} onChange={handleChange} required>
                    <option value='' disabled>Select Category</option>
                    {
                        categories.map( (category, index) => (
                            <option key={`catEE-${index}`} value={index}>{category} - {index}</option>
                        ))
                    }
                </select>
            </label>
            <label>
                User
                <select name='userId' type='text' value={form.userId} onChange={handleChange} required>
                    <option value='' disabled>Select User</option>
                    {
                        userList.map( (user) => (
                            <option key={`userEE-${user.id}`} value={user.id}>{user.first} {user.last} - {user.id}</option>
                        ))
                    }
                </select>
            </label>
            <label>
                Description
                <input name='description' type='text' value={form.description} onChange={handleChange} required/>
            </label>
            <label>
                Cost
                <input name='cost' type='number' value={form.cost} onChange={handleChange} required/>
            </label>
            <button type='submit'>Edit Expense</button>
        </form>
        
    </div>);
}