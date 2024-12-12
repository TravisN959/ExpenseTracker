import { useState } from "react";
import '../style/forms.css';

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
            <label className='inputLabel'>
                Category
                <select className='inputBox' name='category' type='text' value={form.category} onChange={handleChange} required>
                    <option value='' disabled>Select Category</option>
                    {
                        categories.map( (category, index) => (
                            <option key={`catCE-${index}`} value={index}>{category} - {index}</option>
                        ))
                    }
                </select>
            </label>
            <label className='inputLabel'>
                User
                <select className='inputBox' name='userId' type='text' value={form.userId} onChange={handleChange} required>
                    <option value='' disabled>Select User</option>
                    {
                        userList.map( (user) => (
                            <option key={`userCE-${user.id}`} value={user.id}>{user.first} {user.last} - {user.id}</option>
                        ))
                    }
                </select>
            </label>
            <label className='inputLabel'>
                Description
                <input className='inputBox' name='description' type='text' value={form.description} onChange={handleChange} required/>
            </label>
            <label className='inputLabel'>
                Cost
                <input className='inputBox' name='cost' type='number' value={form.cost} onChange={handleChange} required/>
            </label>
            <button type='submit'>Create</button>
        </form>
        
    </div>);
}