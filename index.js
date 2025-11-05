var http = require("http");
var fs = require("fs");
const express = require("express");
const app = express();
const port = 8080;
//create a server object
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.use(express.static("public"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.get("/service/:params", function (req, res) {
  res.send(req.params);
});
