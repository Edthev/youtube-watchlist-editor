import axios from "axios";

export default makeRequest = async (endpoint) => {
   const bearer = {};
   const res = await axios.get("https://www.googleapis.com/auth/" + endpoint, bearer);
};
