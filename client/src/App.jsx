import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Dropdown from './components/Dropdown.jsx'
import NavBar from './components/NavBar.jsx'
import Main_Card from './components/Main_Card.jsx'
import axios from "axios"

function App() {

  //*-*- PLEASE REPLACE THE "import.meta.env.VITE_CLIENT_ID" WITH THE CLIENT ID THAT THE SPOTIFY DASHBOARD PROVIDES YOU -*-*
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

  //*-*- PLEASE REPLACE THE STRING WITH THE FIRST LINK TUNNELMOLE PROVIDES YOU -*-*
  const REDIRECT_URL = "https://johnf008.github.io/Spo-Tinder"

  const [array, setArray] = useState([])

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api/users")
    console.log(response.data.users)
    setArray(response.data.users)
  }

  useEffect(() => {
    fetchAPI()
  },[])

  const[token, setToken] = useState("")
  const[code, setCode] = useState("")


  //const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET
  const SPACE_DELIMITER = "%20"
  const AUTH_END_POINT = "https://accounts.spotify.com/authorize"
  const SCOPES = [
    "user-read-private",
    "user-top-read",
    "playlist-modify-public",
    "playlist-modify-private"
  ]
  const SCOPES_URL_PARM = SCOPES.join(SPACE_DELIMITER)
  

  const randStringGenerator = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const values = crypto.getRandomValues(new Uint8Array(length))
    return values.reduce((acc,x) => acc + possible[x % possible.length], "")
  }

  const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }

  const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}



  const login = () => {
    //window.location = `${AUTH_END_POINT}?response_type=code&client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${REDIRECT_URL}&show_dialog=true`
    const run = async () =>{
      const CODE_VERIFIER = randStringGenerator(64)
      const HASHED = await sha256(CODE_VERIFIER)
      const CODE_CHALLENGE = base64encode(HASHED)

      const params = {
        response_type: 'code', 
        client_id: CLIENT_ID, 
        scope: SCOPES.join(" "),
        code_challenge_method: 'S256',
        code_challenge: CODE_CHALLENGE, 
        redirect_uri: REDIRECT_URL
      }

      const AUTH_URL = new URL(AUTH_END_POINT)
      AUTH_URL.search = new URLSearchParams(params).toString()

      localStorage.setItem("code_verifier", CODE_VERIFIER)

      window.location.href = AUTH_URL.toString()
      /*
      const urlParams = new URLSearchParams(window.location.search)
      let cool_code = urlParams.get('code')
      setCode(cool_code)
      console.log("Cool code: ", cool_code)
      */
  }
  run()
  }
  
  
  useEffect(() => {
    if (!code) return

    const CODE_VERIFIER = localStorage.getItem('code_verifier')

    const url = "https://accounts.spotify.com/api/token"
    const payload = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'authorization_code', 
        code: code, 
        redirect_uri: REDIRECT_URL, 
        code_verifier: CODE_VERIFIER,
      }),
    }

    const fetchToken = async () => {
      const body = await fetch(url, payload)
      const response = await body.json()

      localStorage.setItem('access_token', response.access_token)
      //console.log("Access token: ", response.access_token)


      setToken(response.access_token)
    }
    
    fetchToken()
  }, [code])
  
  
  useEffect(() => {
    const PARAM = new URLSearchParams(window.location.search)
    const code_needed = PARAM.get("code")

    if (code_needed){
      setCode(code_needed)
    }
    //console.log(code_needed)
  }, [])

  useEffect(() => {
    if (token) {
    }
  }, [token])
  
/*
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
  */


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
        {token && token !== "undefined" ?
        <Main_Card token={token}>

        </Main_Card>
         : 
         <div className="block place-items-center mt-40 items-center m-auto">
          <button onClick={login} className="bg-green-600 w-50 h-20 rounded-xl flex items-center justify-center cursor-pointer hover:bg-green-700 font-bold text-white">Sign into Spotify!</button>
        </div>
        }
        
      
          {array.map((user, index) => (
              <div key={index}>
                <span>{user}</span>
                <br></br>
              </div>
            ))
          }
    

        </div>
        
        
      </div>
    </div>
      
    </>
    
    
  )
}

export default App
