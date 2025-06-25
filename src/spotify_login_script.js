export const AUTH_END_POINT = "https://accounts.spotify.com/authorize"

const REDIRECT_URL = "https://6puy02-ip-173-173-201-74.tunnelmole.net"

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

const SCOPES = [
    "user-read-private"
]

export const LOGIN_URL = `${AUTH_END_POINT}?
client_id=${CLIENT_ID}
&redirect_uri=${REDIRECT_URL}
&scope=${SCOPES.join("%20")}
&response_type=code
&show_dialog=true`

export const getTheToken = () => {
    return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item)=> {

        if (!item) return initial;
        
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);

        return initial
    }, {})
}
