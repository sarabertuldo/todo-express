require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const todoRoutes = require("./routes/todos.routes");

const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
app.use(express.static(__dirname + "/build"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

app.get("/", (req, res) => res.send("This is a server apparently"));
// app.get("*", (req, res) => res.redirect("/"));
app.get("*", (req, res) => {
    res.sendFile("/build/index.html", { root: __dirname + "/" });
  });

app.listen(port, () => console.log(`This app is listening on port ${port}!`));
