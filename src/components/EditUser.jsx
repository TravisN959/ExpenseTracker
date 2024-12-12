import { useState } from "react";
import '../style/forms.css';

export default function EditUser({onSubmit, users}){
    const userList = Object.values(users);

    const [form, setForm] = useState({
        id: -1,
        first: '',
        last: '',
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
        setForm({ id: -1, first: '', last: '' }); // reset
      };

    return (<div>
        <form onSubmit={handleSubmit}>
            <label className='inputLabel'>
                User ID
                <select className='inputBox' name='id' type='text' value={form.id || -1} onChange={handleChange} required>
                    <option value={-1} disabled>Select User</option>
                    {
                        userList.map( (user) => (
                            <option key={`userEU-${user.id}`} value={user.id}>{user.first} {user.last} - {user.id}</option>
                        ))
                    }
                </select>
            </label>
            <label className='inputLabel'>
                First Name
                <input className='inputBox' name='first' type='text' value={form.first} onChange={handleChange} required/>
            </label>
            <label className='inputLabel'>
                Last Name
                <input className='inputBox' name='last' type='text' value={form.last} onChange={handleChange} required/>
            </label>
            <button type='submit'>Edit</button>
        </form>
        
    </div>);
}