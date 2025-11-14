var http = require("http");
var fs = require("fs");

const express = require("express");
const app = express();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const rewrite = require("./notuv_unrewrite.js");
const port = 8080;
//create a server object
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/js/sw.js", function (req, res) {
  res.setHeader("Service-Worker-Allowed", "/");
  res.sendFile(__dirname + "/public/js/sw.js");
});
app.use(express.static("public"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/notuv/:params", rewrite);
/*
app.get("/notuv/:params", );
*/
