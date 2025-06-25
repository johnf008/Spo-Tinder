import { useState } from "react"

function NavBar({token}) {
    const [profileSrc, setProfile] = useState("")

    useEffect(() => {
        if(!token) return

        const params = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        fetch("https://api.spotify.com/v1/me", params)
        .then(result => result.json())
        .then(data => {
            setProfile(data.images[0].url)
        })

    }, [token])
    
    return (
        <>
        <div className="container mx-auto bg-black text-white">
            <div className="sm: flex justify-around">
                <p className="text-3x1 font-bold p-3">Spo-Tinder</p>
            <div className="ml-auto">
            <img className="object-scale-down m-auto" src="https://placehold.co/50"></img>
            </div>
        </div>
        </div>
        </>
    )
}


export default NavBar