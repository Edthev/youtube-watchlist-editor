const express = require("express");
const app = express();
require("dotenv").config();

const authenticate = require("./components/authenticate");

const PORT = process.env.PORT;
app.use(express.json());

app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
   res.send({ Status: "Service Running" });
});

app.get("/authenticate", (req, res) => {
   authenticate(req, res);
});
