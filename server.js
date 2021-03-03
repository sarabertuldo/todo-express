require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("This is a server apparently"));
app.get("*", (req, res) => res.redirect("/"));

app.listen(port, () => console.log(`This app is listening on port ${port}!`));
