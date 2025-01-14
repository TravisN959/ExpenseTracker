import { FixedSizeList as List } from 'react-window';
import '../style/tables.css';

export default function Users({data, onDelete}){

    //Get values from object
    const entries = Object.values(data);

    //Create row from data
    const Row = ({ index, style }) => {
        const user = entries[index];

        return (
        <div style={style} className='user-row'>
            <div className='cell'>{user.id}</div>
            <div className='cell'>{user.first}</div>
            <div className='cell'>{user.last}</div>
            <div className='cell'>{user.total}</div>
            <div className='cell'>
                <button onClick={() => onDelete(user.id)}>
                    Delete
                </button>
            </div>
        </div>
      )};


    return (
    <div className='table-container'>
        <div className='table-header'>
            <div className='header-cell'>ID</div>
            <div className='header-cell'>First Name</div>
            <div className='header-cell'>Last Name</div>
            <div className='header-cell'>Total Expenses</div>
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