import { useState } from "react";
import '../style/forms.css';

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
            <label className='inputLabel'>
                First Name
                <input className='inputBox' name='first' type='text' value={form.first} onChange={handleChange} required/>
            </label>
            <label className='inputLabel'>
                Last Name
                <input className='inputBox' name='last' type='text' value={form.last} onChange={handleChange} required/>
            </label>
            <button type='submit'>Create</button>
        </form>
        
    </div>);
}