const express = require("express");
const app = express();
require("dotenv").config();

const redirectGoogleAuth = require("./endpoints/redirectGoogleAuth");
const authenticated = require("./endpoints/authenticated");

const PORT = process.env.PORT;
app.use(express.json());

app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
   res.send({ Status: "Service Running" });
});

app.get("/auth", (req, res) => {
   redirectGoogleAuth(req, res);
});

app.get("/authenticated", (req, res) => {
   authenticated(req, res);
});
