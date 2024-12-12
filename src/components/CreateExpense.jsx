import { useState } from "react";

export default function CreateExpense({onSubmit, categories, users}){
    const userList = Object.values(users);

    const [form, setForm] = useState({
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

        if (onSubmit) {
          onSubmit(form); // Pass data up
        }

        setForm({ 
            category: '',
            userId: '',
            cost: 0,
            description: '' 
        }); // reset
      };

    return (<div>
        <form onSubmit={handleSubmit}>
            <label>
                Category
                <select name='category' type='text' value={form.category} onChange={handleChange} required>
                    <option value='' disabled>Select Category</option>
                    {
                        categories.map( (category, index) => (
                            <option key={`catCE-${index}`} value={index}>{category} - {index}</option>
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
                            <option key={`userCE-${user.id}`} value={user.id}>{user.first} {user.last} - {user.id}</option>
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
            <button type='submit'>Create Expense</button>
        </form>
        
    </div>);
}