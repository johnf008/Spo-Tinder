import { useState } from 'react'
import axios from 'axios'

function Dropdown({options}) {

    const[selectedValue, setSelectedValue] = useState("");
    return (
        <>
        <select value={selectedValue} onChange={e => setSelectedValue(e.target.value)} className="bg-radial from-black from 40% to-gray-500 rounded-sm text-white w-50 text-center">
            <option value={options[0].value} className="text-black">{options[0].name}</option>
            <option value={options[1].value} className="text-black">{options[1].name}</option>
            <option value={options[2].value} className="text-black">{options[2].name}</option>
            <option value={options[3].value} className="text-black">{options[3].name}</option>

        </select>
        <p className='bg-radial from-black from 40% to-gray-500 rounded-sm text-white w-50 text-center mt-3 mb-5'>{selectedValue}</p>
        </>
    )
}


export default Dropdown