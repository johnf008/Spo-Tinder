
function Main_Card() {

    return (
        <>
        <div className="block border-red-500 place-items-center mt-5 text-center m-auto w-100 h-125 bg-zinc-900 rounded-xl text-white ">
            <img className="block border border-red-500 m-0 p-0" src="https://placehold.co/250"></img>
            
                <p className="text-left text-3xl border border-red-500 mt-5 leading-none w-80 font-bold">Song name</p>
                <p className="text-left text-2xl border border-red-500 mt-5 leading-none w-80">Artist</p>
        </div>

        <div className="flex justify g">
            <button className="bg-green-200 mt-5 text-center m-auto w-40 h-15 rounded-xl cursor-pointer hover:bg-green-300">Add To Playlist</button>
             <button className="bg-green-200 mt-5 text-center m-auto w-40 h-15 rounded-xl cursor-pointer hover:bg-green-300">Add To Playlist</button>
        </div>
        </>
    )
}
export default Main_Card