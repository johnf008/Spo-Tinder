# Spo-Tinder

One day, I was reminiscing about how addictive the design of some apps is, and was trying to figure out how I could mimic it with a unique spin. Then, I came up with an idea: the Tinder layout but for Spotify tracks. After several hours of typing, freaking out over how terrible the Spotify API is, and metaphorical tears being shed, I present to you Spo-Tinder! Get matched to different songs and add them to a playlist to listen to!

<p align="center">
   

https://github.com/user-attachments/assets/44e91924-1545-4790-be96-a3fb375bea66


</p>




## Where to Use

You can use Spo-Tinder by clicking <a href="https://johnf008.github.io/Spo-Tinder/" target="_blank">HERE</a>. However, the Spotify Web API only allows me to add users manually. If you would like to try it out, dm me on Slack @John, or you will need to install it locally. 

## How to Use
1. Press the "Login To Spotify Button" (The only data I'm collecting is your profile picture, artists, and getting access to make playlists"
2. Log in to Spotify
3. Press the "Add to Playlist" button to add the song to the Spo-Tinder Playlist. If you don't like it, press the "EWWWW" button to reject it
4. Click the "Check Out Your Playlist!" button to look at your new playlist!

## Installation
1. Clone the repo
   ```sh
   git clone https://github.com/johnf008/Spo-Tinder.git
   ```
2. Install Node.js to get access to "npm" if you don't have it already
3. Open the repository and install Tunnelmole by running this command (It allows you to run your website publicly so you can input a redirect link into Spotify, and you can read the documentation <a href="https://tunnelmole.com/docs/" target="_blank">HERE</a>)
   ```sh
   npm install -g tunnelmole
   ```
4. Make a Spotify Developer account and create an app with the Spotify Web API from the Developer Dashboard
![image](https://github.com/user-attachments/assets/61b58fcc-de1e-4d25-8623-a4c309ab406f)

6. Copy & Paste the client id into the CLIENT_ID variable at the top of the App.jsx file (root -> src -> components -> App.jsx)
![image](https://github.com/user-attachments/assets/fc77c2d1-0cf6-49e4-89e4-23797e19bfc8)

8. Run this command in your terminal, and don't close it!
   ```sh
   npm run dev
   ```
9. Open a new terminal and run
 ```sh
   tmole 5173
   ```
11. Copy and paste the first link tunnelmole provides into the REDIRECT_URI variable at the top of the App.jsx file (root -> src -> components -> App.jsx)
12. Copy and paste the tunnelmole link into the "Redirect URI" bar in the Spotify dashboard
13. Go to the vite.config.js file and paste the tmole link into the allowedHosts (root -> vite.config.js) (You will also need to input it like this: bwxiax-ip-173-173-201-74.tunnelmole.net)
14. Open the tmole link in your browser to access the website!
