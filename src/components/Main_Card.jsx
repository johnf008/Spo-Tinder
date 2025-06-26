import { useEffect, useState } from "react"

function Main_Card({token}) { 

    const [genres, updateGenres] = useState({})

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
            console.log(data.items.flatMap(artist => artist.genres))
            
    })
    }, [token])


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