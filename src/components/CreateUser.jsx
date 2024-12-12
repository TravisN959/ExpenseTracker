import { useState } from "react";

export default function CreateUser({onSubmit}){
    const [form, setForm] = useState({
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
        if (onSubmit) {
          onSubmit(form); // Pass data up
        }
        setForm({ first: '', last: '' }); // reset
      };

    return (<div>
        <form onSubmit={handleSubmit}>
            <label>
                First Name
                <input name='first' type='text' value={form.first} onChange={handleChange} required/>
            </label>
            <label>
                Last Name
                <input name='last' type='text' value={form.last} onChange={handleChange} required/>
            </label>
            <button type='submit'>Create User</button>
        </form>
        
    </div>);
}