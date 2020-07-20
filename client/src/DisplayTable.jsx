import React, {useState} from 'react';
import './displayTable.css';

const DisplayTable = ({data}) => {
const [state, updatestate] = useState({lines:2, dlimiter:','});
const handleInputChange = (e)=>{
    const {name, value} = e.target;
    updatestate({...state, [name]:value});
}
const renderRows = ()=>{
    let rows = [];
    const arraySet = data.split("\n");
    arraySet.forEach((el,index)=>{
        if(index < state.lines){
            let tdRows = [];
            const displayItems = el.split(state.dlimiter);
            displayItems.forEach((item,i)=> {
                if(i<5){
                    tdRows.push(<td>{item}</td>)
                }
            })
            rows.push(<tr>{tdRows}</tr>)
        }
    })
    return rows;
};

return(
    <div>
    <div className="filterSection">
    <span>
        <label>Delimiter: <input name="dlimiter" type="text" value={state.dlimiter} onChange={handleInputChange}/>
        </label>
    </span>
    <span>
        <label>Lines: <input name="lines" type="text" value={state.lines} onChange={handleInputChange}/>
        </label>
    </span>
    </div>
    <table className="tableWrap">
        {data && renderRows()}
    </table>
</div>
);
}
export default DisplayTable;