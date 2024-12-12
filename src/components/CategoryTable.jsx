import { FixedSizeList as List } from 'react-window';
import '../style/categoryTable.css';

export default function Category({data, categories}){

    //Map to array for output, array of key,value
    const entries = Object.values(data);

    //Create row from data
    const Row = ({ index, style }) => {
        const category = entries[index];

        return (
        <div style={style} className='expense-row'>
            <div className='cell'>{categories[category.id]}</div>
            <div className='cell'>{category.total}</div>
        </div>
      )};


    return (
    <div className='table-container'>
        <div className='table-header'>
            <div className='header-cell'>Category</div>
            <div className='header-cell'>Total</div>
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