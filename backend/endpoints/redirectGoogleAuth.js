const redirectGoogleAuth = async (req, res) => {
   try {
      const secrets = require("../assets/client_secret.json");
      const CLIENT_ID = secrets.web.client_id;
      const REDIRECT_URI = secrets.web.redirect_uris[0];
      const SCOPES = ["https://www.googleapis.com/auth/youtube"];
      console.log("redirecting...");
      const googleOAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
         "%20"
      )}&access_type=offline`;
      res.redirect(googleOAuthURL);
   } catch (err) {
      console.log("err", err);
      res.send({ Error: "Error Redirecting", Data: err });
   }
};
module.exports = redirectGoogleAuth;
