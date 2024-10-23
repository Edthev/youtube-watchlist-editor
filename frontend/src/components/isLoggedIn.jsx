import { useEffect, useState } from "react";
import axios from "axios";
export default function isLoggedIn() {
   const [playlistArr, setPlaylistArr] = useState([]);
   useEffect(() => {
      const handlePlaylists = async () => {
         const getToken = (name) => {
            const cookieArr = document.cookie.split(";");
            for (let cookie of cookieArr) {
               if (cookie.trim().startsWith(name + "=")) {
                  return cookie.trim().slice(name.length + 1);
               }
            }
            return false;
         };
         const API_TOKEN = getToken("access_token");
         try {
            await axios
               .get("https://youtube.googleapis.com/youtube/v3/playlists", {
                  params: {
                     part: "snippet,contentDetails",
                     maxResults: 25,
                     mine: true,
                  },
                  headers: {
                     Authorization: `Bearer ${API_TOKEN}`,
                     Accept: "application/json",
                  },
               })
               .then(async (response) => {
                  const data = response.data.items;
                  console.log("test", data);
                  setPlaylistArr(data);
                  return { data, test: "ya" };
               });
         } catch (err) {
            console.error("err", err);
            return { Error: "Can't fetch playlists", response: err };
         }
      };
      handlePlaylists();
   }, []);
   return (
      <div>
         <p>logged in</p>
         <div>
            {playlistArr.map((playlist) => {
               const name = playlist.snippet.title;
               const imageURL = playlist.snippet.thumbnails.standard.url;
               return (
                  <div>
                     <img src={imageURL} />
                     <p>{name}</p>
                  </div>
               );
            })}
         </div>
      </div>
   );
}
