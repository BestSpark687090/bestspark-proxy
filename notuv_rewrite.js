const funcs = require("./public/js/funcs.min.js");
let currentBaseURL = "";
async function rewrite(req, res) {
  try {
    // todo: log urls for further testing
    // const fetch = await import("node-fetch");
    let url = decodeURIComponent(funcs.encode(req.params.params));
    // console.log(req.url);
    console.log(url, ":");
    if (
      !(
        url.endsWith(".js") ||
        url.endsWith(".css") ||
        url.endsWith(".png") ||
        url.endsWith(".hs") || // encoded types.
        url.endsWith(",cqs") ||
        url.endsWith(",plg") ||
        url.startsWith("//")
      ) &&
      url.startsWith("http")
    ) {
      currentBaseURL = url;
    }
    console.log("\t", currentBaseURL, "Base");
    // if (url.endsWith(".hs") || url.endsWith(",cqs")) {
    //   url = funcs.decode(url);
    // }
    if (url.startsWith("//")) {
      url = "https:" + url;
    }

    // let aslice = funcs.decode(req.url.slice(7));
    // console.log(currentBaseURL);
    if (
      url.endsWith(".hs") || // encoded types.
      url.endsWith(",cqs") ||
      url.endsWith(",plg")
    ) {
      url = currentBaseURL + funcs.decode(url);
    }
    // console.log(url);
    // todo, make the urls actually have the current url path's stuff :/
    // res.send(`<a href="https://google.com/script.js">HEY</a>`);

    if (!url.includes("http")) {
      url = currentBaseURL + url;
    }
    console.log("\t", url, "final");
    let resf = await fetch(url);
    let txt = await resf.text();
    // console.log(txt);
    let m;
    const regex =
      /(?:http(?:s))?:(\/\/[A-Za-z0-9\-._~:\/?#\[\]@!$&'()*+,;=]*)/g;
    while ((m = regex.exec(txt)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        // if (match != "s") {
        // continue;
        // bro... i keep forgetting
        txt = txt.replaceAll(match, funcs.encode(match));
        // console.log(match, "Match");
      });
    }
    // for (let i = 0; i < MATCHES.length; i++) {
    //   console.log(MATCHES[i][0]);
    //   txt.replace(MATCHES[i][0], funcs.encode(MATCHES[i][2]));
    // }
    txt = txt.replaceAll(
      "</body>",
      `<script src="https://cdn.jsdelivr.net/npm/eruda"></script>
    <script>
      eruda.init();
    </script>
    </body>`
    );
    res.send(txt);
    // matches all caps because its the better ones (i hope...)
    res.end();
  } catch (e) {
    // I DONT CARE
    if (e.message != "Invalid URL") {
      // oh.
      throw e;
    }
  }
}
module.exports = rewrite;
