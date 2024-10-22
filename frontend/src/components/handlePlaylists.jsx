import axios from "axios";
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
               maxResults: 5,
               mine: true,
               // pageToken: "",
            },
            headers: {
               Authorization: `Bearer ${API_TOKEN}`,
               Accept: "application/json",
            },
         })
         .then((response) => {
            const data = response.data;
            console.log("test data", data);
            return { data, test: "ya" };
         });
   } catch (err) {
      console.error("err", err);
      return { Error: "Can't fetch playlists", response: err };
   }
};
export default handlePlaylists;
