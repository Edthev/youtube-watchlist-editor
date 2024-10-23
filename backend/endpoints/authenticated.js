const { default: axios } = require("axios");
const authenticated = async (req, res) => {
   const url = new URL(req.url, `http://${req.headers.host}`);
   const params = {};
   url.searchParams.forEach((value, key) => {
      params[key] = value;
   });
   const { code } = params;
   // grab auth code
   // post to google to get token
   // give token to user in frontend and redirect
   try {
      const secrets = require("../assets/client_secret.json");
      const CLIENT_ID = secrets.web.client_id;
      const REDIRECT_URI = secrets.web.redirect_uris[0];
      const CLIENT_SECRET = secrets.web.client_secret;
      console.log("posting to google...");
      const response = await axios.post("https://oauth2.googleapis.com/token", {
         code: code,
         client_id: CLIENT_ID,
         client_secret: CLIENT_SECRET,
         redirect_uri: REDIRECT_URI,
         grant_type: "authorization_code",
      });
      const { access_token, id_token } = response.data;
      console.log("successfully received tokens");

      res.cookie("access_token", access_token, {
         httpOnly: false, // TODO less secure and accessible from JS
         sameSite: "Lax", // TODO does not offer a robust defense against CSRF as a general category of attack
      });
      res.cookie("id_token", id_token, {
         httpOnly: false,
         sameSite: "Lax",
      });
      res.redirect("http://localhost:5174");
      //   res.send({ Access: access_token, ID: id_token, URL: url });
   } catch (err) {
      console.log("Err:", err);
      //TODO remove the .send and instead send to frontend with error query
      res.send({
         Error: "Error Posting Code To Google For Token",
         Response: err,
      });
   }
};
module.exports = authenticated;
