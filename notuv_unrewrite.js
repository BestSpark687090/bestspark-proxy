async function rewrite(req, res) {
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
        url.endsWith(",plg") ||
        url.startsWith("//")
      ) &&
      url.startsWith("http")
    ) {
      currentBaseURL = url;
    }
    // if (url.endsWith(".hs") || url.endsWith(",cqs")) {
    //   url = funcs.decode(url);
    // }
    if (url.startsWith("//")) {
      url = "https:" + url;
    }
    // let aslice = funcs.decode(req.url.slice(7));
    console.log(currentBaseURL);
    // Wait... why am I doing it **twice**?
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
    for (let i = 0; i < hrefMatches.length; i++) {
      txt = txt.replaceAll(
        hrefMatches[i][0],
        `href="${funcs.encode(hrefMatches[i][1])}"`
      );
    }
    let srcMatches = [...txt.matchAll(/src="([a-zA-Z:\/?&0-9_#-.]*)"/g)];
    for (let i = 0; i < srcMatches.length; i++) {
      txt = txt.replaceAll(
        srcMatches[i][0],
        `src="${funcs.encode(srcMatches[i][1])}"`
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
}
module.exports = rewrite;
