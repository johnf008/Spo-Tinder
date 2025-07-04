import { useState, useEffect } from "react";
import axios from "axios"

function EmailBox({ sendThis }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState("")
    const [register, setRegisterStatus] = useState("This will only be used to add you to the allowed users :)")

    const handleSubmit= (event) => {
        event.preventDefault()
        if (!name || !email){
            alert("You haven't typed your email or name yet")
        }else if (!email.includes("@")){
            alert("Your email needs an @")
        } 
        else{
            setRegisterStatus("The script to add you to the allowed users is now running! Please be patient! (It should take 30-45 seconds)")
            sendToFlask()
        }
        
    }

    const sendToFlask = async () => {
                try {
                    const response = await axios.post('http://localhost:8080/api/data', {
                        name : name,
                        email : email
                    })
                    console.log(response.data)
                    setStatus(response.data.Status)
                    sendThis(response.data.Status)
                } catch (error){
                    console.log("We (yes WE) have an error: ", error)
                    sendThis("Error")
                }
            }

    return (
        <>
        <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit}>

            <div className="mb-4 mt-4">
            <label>Enter your name: </label>
            <input
            type="text"
            id="name"
            autoComplete="given-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-amber-700" />
            </div>

            <div className="">
            <label>Enter your email: </label>
            <input
            type="text"
            id="email"
            autoComplete="given-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-amber-700" />
            </div>

            <div className="flex justify-center mt-4">
                <input
                type="submit"
                className="bg-green-600 w-25 h-10 m-auto rounded-xl cursor-pointer hover:bg-green-700 font-bold text-white" />
            </div>

            <h3 className="mt-4">{register}</h3>
            
            </form>

            
        </div>
        
        
        
        </>
    )
}

export default EmailBox