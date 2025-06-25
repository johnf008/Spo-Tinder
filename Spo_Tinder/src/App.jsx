import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dropdown from './components/Dropdown.jsx'
import LoginButton from './components/LoginButton.jsx'

function App() {

  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
  const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET
  
    const[token, setToken] = useState("")

  useEffect(() => {
    var authParameters = {
      method: 'POST',
      headers: {
       'Content-Type' : 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setToken(data.access_token))
  }, [])
  

  const data = [
    {value: "0", name: "Select"},
    {value: "1", name: "Song 1"},
    {value: "2", name: "Song 2"},
    {value: "3", name: "Song 3"}

  ];

  console.log("Rendering app js");
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">

        
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Dropdown options={data}></Dropdown>
      <LoginButton></LoginButton>
    </>
    
  )
}

export default App
