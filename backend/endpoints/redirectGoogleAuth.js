const redirectGoogleAuth = async (req, res) => {
   try {
      res.redirect("https://www.example.com");
   } catch (err) {
      res.send({ Error: "Redirect Error", Data: err });
   }
};
module.exports = redirectGoogleAuth;
