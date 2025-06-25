import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dropdown from './components/Dropdown.jsx'
import SpotifyWebApi from 'spotify-web-api-js'


function App() {
  const spotify = new SpotifyWebApi()

  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
  const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET
  const SPACE_DELIMITER = "%20"
  const AUTH_END_POINT = "https://accounts.spotify.com/authorize"
  const SCOPES = [
    "user-read-private"
  ]
  const SCOPES_URL_PARM = SCOPES.join(SPACE_DELIMITER)
  const REDIRECT_URL = "https://6puy02-ip-173-173-201-74.tunnelmole.net"

  const login = () => {
    window.location = `${AUTH_END_POINT}?response_type=code&client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${REDIRECT_URL}&show_dialog=true`
  }
  const[token, setToken] = useState("")
  const[code, setCode] = useState("")
  
  const get_uri_code = () => {
    const PARAM = new URLSearchParams(window.location.search)
    const code_needed = PARAM.get("code")

    if (code_needed){
      setCode(code_needed)
    }
  }

  /*
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
*/

  //i think i was getting code here but lowkey i dont remember and i just want to finish it my way
  /*
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
  */

  useEffect(() => {
    const body = new URLSearchParams({
      code: get_uri_code(),
      redirect_uri: REDIRECT_URL,
      grant_type : 'authorization_code'
    })

    var authParameters = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
      },
      body: body.toString()
    }

    fetch('https://accounts.spotify.com/api/token', authParameters)
    .then(result => result.json())
    .then(data => setToken(data.access_token))
    console.log(token)
  }, [])


  /*
  useEffect(()=>{
    console.log("What is in the URLL ", getTheToken(window.location.href))
    console.log("What is the URL but in hereee: " + window.location.hash)
    const _spotifyToken = getTheToken(window.location.hash).access_token
    window.location.hash = ""

    console.log("Spotify token: ", _spotifyToken)
    getTheWindowHash()

    if (_spotifyToken){
      setToken(_spotifyToken)

      spotify.setAccessToken(_spotifyToken)

    }
  });
  */

  const data = [
    {value: "0", name: "Select"},
    {value: "1", name: "Song 1"},
    {value: "2", name: "Song 2"},
    {value: "3", name: "Song 3"}

  ];


  return (
    <>
   
    <div className="flex h-screen">
      <div className="m-auto">
        <Dropdown options={data}></Dropdown>
        <div className='bg-green-400 w-50 h-20 rounded-xl flex items-center justify-center'>
          
        </div>
        <button onClick={login} className="m-auto">Sign into Spotify!</button>
        </div>
      </div>
      
    </>
    
    
  )
}

export default App
