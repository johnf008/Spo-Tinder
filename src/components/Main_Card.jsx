import { useEffect, useState } from "react"

function Main_Card({token}) { 

    const [artists, updateArtists] = useState("")
    const [artistIDS, updateArtistsIDS] = useState("")
    const [tracks, updateTracks] = useState({})
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

            console.log([...new Set(data.items.flatMap(artist => artist.id))])
            updateArtistsIDS([...new Set(data.items.flatMap(artist => artist.id))])
            
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
    }, [artists])

    useEffect(() => {
        console.log("Tracks", tracks.tracks[0])


    }, [tracks])



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