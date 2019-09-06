require("dotenv-safe").config();
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const mongoose = require("mongoose");
const morgan = require("morgan");

require("./src/schema/user");
const routes = require("./src/routes/routes");

const app = express();

// conecta com o DB
mongoose.connect("mongodb+srv://muriloSouza:bti0zahpj12@cluster0-jfgky.mongodb.net/27017", { useNewUrlParser: true });

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/sign_up", routes);
app.use("/sign_in", routes);
app.use("/search", routes);
app.use("/update", routes)

const server = http.createServer(app);
server.listen(3000, console.log("Server iniciado"));