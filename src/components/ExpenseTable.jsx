import { FixedSizeList as List } from 'react-window';
import '../style/tables.css';

export default function Expense({data, users, categories, onDelete}){

    //Get values from object
    const entries = Object.values(data);

    //Create row from data
    const Row = ({ index, style }) => {
        const expense = entries[index];
        const userData = users[expense.userId];
        return (
        <div style={style} className='expense-row'>
            <div className='cell'>{expense.id}</div>
            <div className='cell'>{categories[expense.category]}</div>
            <div className='cell'>{expense.description}</div>
            <div className='cell'>{expense.cost}</div>
            <div className='cell'>{userData.first} {userData.last}</div>
            <div className='cell'>
                <button onClick={() => onDelete(expense.id)}>
                    Delete
                </button>
            </div>
        </div>
      )};


    return (
    <div className='table-container'>
        <div className='table-header'>
            <div className='header-cell'>ID</div>
            <div className='header-cell'>Category</div>
            <div className='header-cell'>Description</div>
            <div className='header-cell'>Cost</div>
            <div className='header-cell'>User</div>
            <div className='header-cell'>Delete</div>
        </div>
        <List
            height={400} // Height of the container
            itemCount={entries.length} // Total number of users
            itemSize={50} // Row height
            width='100%' // Width of the container
            >
            {Row}
        </List>
    </div>)
}