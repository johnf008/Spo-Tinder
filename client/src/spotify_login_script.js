/*
export const AUTH_END_POINT = "https://accounts.spotify.com/authorize"

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

const SCOPES = [
    "user-read-private"
]

export const LOGIN_URL = `${AUTH_END_POINT}?
client_id=${CLIENT_ID}
&redirect_uri=${REDIRECT_URL}
&scope=${SCOPES.join("%20")}
&response_type=token
&show_dialog=true`


export const getTheToken = (windowlocationhash) => {
    return windowlocationhash
    .substring(1)
    .split('&')
    .reduce((initial, item)=> {
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);

        return initial
    }, {})
}

export const getTheWindowHash = () => {
    console.log("Window Hash: " + window.location.hash);
}
*/