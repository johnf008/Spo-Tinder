import { useState, useEffect } from "react"

function NavBar({token}) {
    const [profileSrc, setProfile] = useState("https://placehold.co/50")
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
            if(data.images[0].url){
            setProfile(data.images[0].url)
            }
            else{
                setProfile("https://cdna.artstation.com/p/assets/images/images/084/124/296/large/matthew-blank-profile-photo-1.jpg?1737590038")
            }

        })

    }, [token])

    return (
        <>
        <div className="container mx-auto bg-black text-white">
            <div className="sm: flex justify-around">
                <p className="text-3x1 font-bold p-3">Spo-Tinder</p>
                <img className="h-[50px] w-[50px]" src={profileSrc}></img>
            <div className="ml-auto">
            
            </div>
        </div>
        </div>
        
        </>
    )
}


export default NavBar
