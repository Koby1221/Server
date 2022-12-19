console.log("welcome user");
const express = require("express");
const http = require("http");
const morgan = require("morgan");
require("./db/mongo");
require("dotenv").config();
const { routesInit } = require("./public/routes/confing_routes");
const path = require("path");
const port = "3050";
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.all("*", function (req, res, next) {
  if (!req.get("Origin")) return next();
  res.set("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.set(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type,auth-token,x-api-key"
  );
  next();
});

routesInit(app);

server.listen(port);
