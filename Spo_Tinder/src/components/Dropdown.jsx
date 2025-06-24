import { useState } from 'react'
import axios from 'axios'

function Dropdown({options}) {

    const[selectedValue, setSelectedValue] = useState("");
    return (
        <>
        <select value={selectedValue} onChange={e => setSelectedValue(e.target.value)}>
            <option value={options[0].value}>{options[0].name}</option>
            <option value={options[1].value}>{options[1].name}</option>
            <option value={options[2].value}>{options[2].name}</option>
            <option value={options[3].value}>{options[3].name}</option>

        </select>
        <p>{selectedValue}</p>
        </>
    )
}


export default Dropdown