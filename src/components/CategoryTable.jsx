import { FixedSizeList as List } from 'react-window';
import '../style/categoryTable.css';

export default function Category({data, categories}){

    //Create row from data
    const Row = ({ index, style }) => {
        const categoryTotal = data[index];

        return (
        <div style={style} className='expense-row'>
            <div className='cell'>{categories[index]}</div>
            <div className='cell'>{categoryTotal}</div>
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
            itemCount={categories.length} // Total number of users
            itemSize={50} // Row height
            width='100%' // Width of the container
            >
            {Row}
        </List>
    </div>)
}