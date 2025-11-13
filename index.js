var http = require("http");
var fs = require("fs");

const express = require("express");
const app = express();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const funcs = require("./public/js/funcs.min.js");
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
let currentBaseURL = "";
app.get("/notuv/:params", async function (req, res) {
  try {
    // todo: log urls for further testing
    // const fetch = await import("node-fetch");
    let url = decodeURIComponent(funcs.encode(req.params.params));
    // console.log(req.url);
    if (
      !(
        url.endsWith(".js") ||
        url.endsWith(".css") ||
        url.endsWith(".png") ||
        url.endsWith(".hs") || // encoded types.
        url.endsWith(",cqs") ||
        url.endsWith(",plg")
      ) ||
      url.startsWith("http")
    ) {
      currentBaseURL = url;
    }
    if (url.endsWith(".hs") || url.endsWith(",cqs")) {
      url = funcs.decode(url);
    }
    // let aslice = funcs.decode(req.url.slice(7));
    console.log(currentBaseURL);
    if (url.includes(".hs") || url.includes(",cqs")) {
      url = funcs.encode(currentBaseURL + url);
    }
    // console.log(url);
    // todo, make the urls actually have the current url path's stuff :/
    // res.send(`<a href="https://google.com/script.js">HEY</a>`);

    if (!url.includes("http")) {
      url = currentBaseURL + url;
    }
    console.log(url, "final URL");
    let resf = await fetch(url);
    let txt = await resf.text();
    // For now, just href.
    let hrefMatches = [...txt.matchAll(/href="([a-zA-Z:\/?&0-9_#-.]*)"/g)];
    // console.log(hrefMatches[1][1])
    for (let i = 0; i < hrefMatches.length; i++) {
      break;
      // console.log("match")
      txt = txt.replaceAll(
        hrefMatches[i][0],
        `href="${funcs.encode(hrefMatches[i][1])}"`
      );
    }
    res.send(txt);
    res.end();
  } catch (e) {
    // I DONT CARE
    if (e.message != "Invalid URL") {
      // oh.
      throw e;
    }
  }
});
