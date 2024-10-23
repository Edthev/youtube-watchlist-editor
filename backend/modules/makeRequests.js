const { default: axios } = require("axios");

const makeRequests = async (endpoint, API_TOKEN, params) => {
   if (endpoint.length < 1) {
      return { Error: "No endpoint" };
   }
   if (API_TOKEN.length < 1) {
      return { Error: "No Token" };
   }
   try {
      return await axios.get("https://developers.google.com" + endpoint, {
         headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            Accept: "application/json",
         },
         params: params,
      });
   } catch (err) {
      console.log("err", err);
      return { Error: "Error getting request", Data: err };
   }
};
