import { useState } from 'react'

function Dropdown() {

    const data = [
        {value: "1", name: "Song 1"},
        {value: "2", name: "Song 2"},
        {value: "3", name: "Song 3"}
    ]

    return (
        <>
        <select name="dropdown">
            <option value={data[0].value}>{data[0].name}</option>
            <option value={data[1].value}>{data[1].name}</option>
            <option value={data[2].value}>{data[2].name}</option>
        </select>
        </>
    )
}


export default Dropdown