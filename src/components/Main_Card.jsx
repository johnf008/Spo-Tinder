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
            console.log("Complete user data: ", data)

            console.log([...new Set(data.items.flatMap(artist => artist.name))])
            updateArtists([...new Set(data.items.flatMap(artist => artist.name))])

            console.log([...new Set(data.items.map(artist => artist.id))])
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

        console.log("WYM no token" + token)

        console.log("Artist IDS: ", artistIDS)
        console.log("Artist IDS: ", artistIDS.map)

        updateTracks({tracks: []})

        for(let x in artistIDS){
            console.log("Artist ID: ", artistIDS)
            fetch(`https://api.spotify.com/v1/artists/${artistIDS[count]}/top-tracks`, parms_2)
            .then(result_1=> result_1.json())
            .then(data_1 => {
                console.log("After ids ", data_1.tracks)
                updateTracks(prev_data => ({
                    ...prev_data,
                    tracks: [...prev_data.tracks, ...data_1.tracks]
                }))
            })
            count += 1
    }   
        
    }, [artistIDS])

    useEffect(() => {
        if (tracks.tracks && tracks.tracks.length > 0){
            updateTheCard()
        }
    }, [tracks])

    function updateTheCard(){
        console.log("Tracks: ", tracks)
        console.log("Tracks.tracks: ", tracks.tracks)
        console.log(tracks.tracks[Math.floor(Math.random() * tracks.tracks.length)])
        
        let rand_num = Math.floor(Math.random() * tracks.tracks.length)
        let randomTrack = tracks.tracks[rand_num]

        console.log("Random track: ", randomTrack)    
        console.log("Random track.album.images[0] ", randomTrack.album.images[0].url)

        updateCover(randomTrack.album.images[1].url)
        updateArtistName(randomTrack.artists[0].name)
        updateSongName(randomTrack.name)

        if(rand_num != -1){
            tracks.tracks.splice(rand_num, 1)
        }

        console.log("Tracks.tracks after deletion: ", tracks)
    }

    useEffect(() =>{
        console.log("Album cover ", albumCover)
    
    }, [albumCover])

    useEffect(() => {
        console.log("Artist name: ", artistName)
    })



    return (
        <>
        <div className="block place-items-center mt-5 text-center m-auto w-100 h-125 bg-zinc-900 rounded-xl text-white ">

            <img className="block m-0 pt-10" src={albumCover}></img>
            
                <div className="text-left text-3xl mt-5 leading-none w-80 font-bold">{songName}</div>
                <div className="text-left text-2xl mt-5 leading-none w-80">{artistName}</div>
        </div>

        <div className="flex justify-center gap-6">
            <button className="bg-green-200 mt-5 text-center w-40 h-15 rounded-xl cursor-pointer hover:bg-green-300" onClick={updateTheCard}>Add To Playlist</button>
             <button className="bg-red-200 mt-5 text-center w-40 h-15 rounded-xl cursor-pointer hover:bg-red-300">EWWWWW</button>
        </div>
        </>
    )
}
export default Main_Card