const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;
app.use(express.json());

app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
   res.send({ Status: "Service Running" });
});
