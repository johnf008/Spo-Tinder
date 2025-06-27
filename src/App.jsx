import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Dropdown from './components/Dropdown.jsx'
import NavBar from './components/NavBar.jsx'
import Main_Card from './components/Main_Card.jsx'
import SpotifyWebApi from 'spotify-web-api-js'


function App() {
  const spotify = new SpotifyWebApi()

  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
  const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET
  const SPACE_DELIMITER = "%20"
  const AUTH_END_POINT = "https://accounts.spotify.com/authorize"
  const SCOPES = [
    "user-read-private",
    "user-top-read",
    "playlist-modify-public",
    "playlist-modify-private"
  ]
  const SCOPES_URL_PARM = SCOPES.join(SPACE_DELIMITER)
  const REDIRECT_URL = "https://johnf008.github.io/Spo-Tinder"

  const login = () => {
    window.location = `${AUTH_END_POINT}?response_type=code&client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${REDIRECT_URL}&show_dialog=true`
  }
  const[token, setToken] = useState("")
  const[code, setCode] = useState("")
  
  useEffect(() => {
    const PARAM = new URLSearchParams(window.location.search)
    const code_needed = PARAM.get("code")

    if (code_needed){
      setCode(code_needed)
    }
  }, [])

  useEffect(() => {
    if (!code) return; 
    const body = new URLSearchParams({
      code: code,
      redirect_uri: REDIRECT_URL,
      grant_type : 'authorization_code'
    })

    const authParameters = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
      },
      body: body.toString()
    }

    fetch('https://accounts.spotify.com/api/token', authParameters)
    .then(result => result.json())
    .then(data => {
      setToken(data.access_token)
    if(data.access_token){
      setToken(data.access_token);
      spotify.setAccessToken(data.access_token)
    } else{
      console.error("Couldn't get token: ", data)
    }
    })

  }, [code])


  const data_hi = [
    {value: "0", name: "Select"},
    {value: "1", name: "Song 1"},
    {value: "2", name: "Song 2"},
    {value: "3", name: "Song 3"}

  ];


  return (
    <>
    <div className="bg-green-500">
    <NavBar token={token}></NavBar>
    <div className="h-screen">
      
      
      <div className="h-screen m-auto justify-center items-center">
        
        {token ? 
        <Main_Card token={token}></Main_Card>
         : 
         <div className="block place-items-center mt-40 items-center m-auto">
          <button onClick={login} className="bg-green-600 w-50 h-20 rounded-xl flex items-center justify-center cursor-pointer hover:bg-green-700 font-bold text-white">Sign into Spotify!</button>
        </div>
        }
        

        </div>
        
        
      
      
      </div>
    </div>
      
    </>
    
    
  )
}

export default App
