import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dropdown from './components/Dropdown.jsx'
import { LOGIN_URL } from './spotify_login_script.js'


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
   
    <div className="flex h-screen">
      <div className="m-auto">
        <Dropdown options={data}></Dropdown>
        <div className='bg-green-400 w-50 h-20 rounded-xl flex items-center justify-center'>
          <a href={LOGIN_URL} className="m-auto">Sign Into Spotify!</a>
        </div>
        </div>
      </div>
      
    </>
    
    
  )
}

export default App
