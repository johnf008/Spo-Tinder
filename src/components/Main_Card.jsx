import { useEffect, useState } from "react"

function Main_Card({token}) { 

    const [artists, updateArtists] = useState("")
    const [artistIDS, updateArtistsIDS] = useState([])
    const [tracks, updateTracks] = useState({})
    const [startApp, updateStart] = useState(false)

    const [albumCover, updateCover] = useState("")
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
        updateTracks({tracks: []})

        console.log("Artist IDS: ", artistIDS)
        console.log("Artist IDS: ", artistIDS.map)
        Promise.all(artistIDS.map(id =>{
            console.log(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`)
            fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`, parms_2)
            .then(result_1=> result_1.json())
            .then(all_the_tracks => {
                const flat_tracks = all_the_tracks.flat();
                updateTracks({tracks: flat_tracks})
                updateTheCard();
            })
        }
        ))
        
    }, [artistIDS])

    useEffect(() => {
        if (tracks.tracks && tracks.tracks.length > 0){
            updateTheCard()
        }
    }, [tracks])

    function updateTheCard(){
        console.log("Tracks.tracks: ", tracks.tracks)
        let randomTrack = tracks[Math.floor(Math.random() * tracks.length)]
        console.log("Random track: ", randomTrack)
        updateCover(randomTrack.album.images)
    }



    return (
        <>
        <div className="block place-items-center mt-5 text-center m-auto w-100 h-125 bg-zinc-900 rounded-xl text-white ">

            <img className="block m-0 pt-10" src="https://placehold.co/250"></img>
            
                <div className="text-left text-3xl mt-5 leading-none w-80 font-bold">Song name</div>
                <div className="text-left text-2xl mt-5 leading-none w-80">Artist</div>
        </div>

        <div className="flex justify-center gap-6">
            <button className="bg-green-200 mt-5 text-center w-40 h-15 rounded-xl cursor-pointer hover:bg-green-300 ">Add To Playlist</button>
             <button className="bg-red-200 mt-5 text-center w-40 h-15 rounded-xl cursor-pointer hover:bg-red-300">EWWWWW</button>
        </div>
        </>
    )
}
export default Main_Card