import { useEffect, useState } from "react"

function Main_Card({token}) { 
    {/*Gonna comment this file out bc if i don't, im gonna forget what everything does when i come back in a couple days */}
    
    {/*Used to get the artists top tracks*/}
    const [artists, updateArtists] = useState("")
    const [artistIDS, updateArtistsIDS] = useState([])
    const [tracks, updateTracks] = useState({})

    {/*Used to get the visuals*/}
    const [albumCover, updateCover] = useState("https://placehold.co/250")
    const [songName, updateSongName] = useState("Song Name")
    const [artistName, updateArtistName] = useState("Artist")

    const [userID, setUserID] = useState("")
    const [playlistID, setPlaylistID] = useState("")
    const [playlistLink, setPlaylistLink] = useState("")

    const [theRandomTrack, setRandomTrack] = useState()

    useEffect(() => {
        if (!token) return
        const parms = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        fetch("https://api.spotify.com/v1/me/top/artists", parms)
        .then(result => result.json())
        .then(data => {
            updateArtists([...new Set(data.items.flatMap(artist => artist.name))])

            updateArtistsIDS([...new Set(data.items.map(artist => artist.id))])
            
    })
    }, [token])

    
    useEffect(() => {
        if (!token) return
        let count = 0

        const parms_2 = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }


        updateTracks({tracks: []})

        for(let x in artistIDS){
            fetch(`https://api.spotify.com/v1/artists/${artistIDS[count]}/top-tracks`, parms_2)
            .then(result_1=> result_1.json())
            .then(data_1 => {
                updateTracks(prev_data => ({
                    ...prev_data,
                    tracks: [...prev_data.tracks, ...data_1.tracks]
                }))
            })
            count += 1
    }   
        
    }, [artistIDS])

    function createPlaylist() {
        if (!token) return
        if (!userID) return
    
        const parms_3 = {
            method: 'POST',
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                "name": "Spo-Tinder Playlist",
                "description": "A playlist made by Spo-Tinder",
                "public": false
            })
        }

        fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, parms_3)
        .then(result_2 => result_2.json())
        .then(data_2 => {
            setPlaylistID(data_2.id)
            setPlaylistLink(data_2.external_urls.spotify)
        })
    }
    

    useEffect(() => {
        if (tracks.tracks && tracks.tracks.length > 0){
            updateTheCard("no")
        }
    }, [tracks])

    useEffect(() => {
        if(!token) return

        const params = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        fetch("https://api.spotify.com/v1/me", params)
        .then(result_5 => result_5.json())
        .then(data_5 => {
            if(data_5.id){
            setUserID(data_5.id)
            }
        })

    }, [token])



    function updateTheCard(button_type){
        if(button_type == "add"){
            const params_7 = {
                method: 'POST', 
                headers: {
                    "Authorization": 'Bearer ' + token,
                    "Content-Type": 'application/json' 
                },
                body: JSON.stringify({
                    "uris" : [theRandomTrack.uri]
                })
            }
            fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, params_7)
            .then(result_7 => result_7.json())
            .then(data_7 => {
                console.log("Data_7 ", data_7)
            })
        }
        
        let rand_num = Math.floor(Math.random() * tracks.tracks.length)
        let randomTrack = tracks.tracks[rand_num]
        setRandomTrack(randomTrack)


        updateCover(randomTrack.album.images[1].url)
        updateArtistName(randomTrack.artists[0].name)
        updateSongName(randomTrack.name)
        

        if(rand_num != -1){
            tracks.tracks.splice(rand_num, 1)
        }

    }

    function getPlaylistLink(){
        
    }

    

    useEffect(() => {
        createPlaylist()
    }, [userID])




    return (
        <>
        <div className="block place-items-center mt-5 text-center m-auto w-100 h-125 bg-zinc-900 rounded-xl text-white ">

            <img className="block m-0 pt-10" src={albumCover}></img>
            
                <div className="text-left mt-5 leading-none w-80 font-bold">{songName}</div>
                <div className="text-left mt-5 leading-none w-80">{artistName}</div>
        </div>

        <div className="flex justify-center gap-6">
            <button className="bg-green-200 mt-5 text-center w-40 h-15 rounded-xl cursor-pointer hover:bg-green-300" onClick={() => updateTheCard("add")}>Add To Playlist</button>
            <button className="bg-red-200 mt-5 text-center w-40 h-15 rounded-xl cursor-pointer hover:bg-red-300" onClick={() => updateTheCard("no")}>EWWWWW</button>
        </div>
        <div className="flex justify-center gap-6">
            <a href={playlistLink} target="_blank">
             <button className="bg-blue-200 mt-5 text-center w-40 h-15 rounded-xl cursor-pointer hover:bg-blue-300">Check Out Your Playlist!</button>
             </a>
        </div>
           
        </>
    )
}
export default Main_Card