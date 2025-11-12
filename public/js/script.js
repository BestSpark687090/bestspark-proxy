document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();
  let url = document.querySelector(".url");
  try {
    await registerSW();
  } catch (err) {
    throw err;
  }
  let newURL = search(url.value, "https://www.duckduckgo.com/search?q=%s");
  let iframe = document.querySelector("iframe");
  iframe.src = "/notuv/" + uv.encode(newURL);
  let iframeWin =
    iframe.contentWindow ||
    iframe.contentDocument.document ||
    iframe.contentDocument;
  let iDoc = iframeWin.document;
  // setInterval(function () {
  // iDoc.write("broooo");
  // iDoc.open();
  // Function to create an event listener for DOMContentLoaded on an element
  // Function to safely add an event listener, checking if the event has already passed
  function addSafeListener(target, eventType, alertMessage, cb) {
    if (!target) {
      console.error("Target element is null for event:", alertMessage);
      return;
    }

    const listener = function (e) {
      alert(alertMessage);
      cb();
    };

    // For DOMContentLoaded, check if it's already "interactive" or "complete"
    if (
      eventType === "DOMContentLoaded" &&
      (target.readyState === "interactive" || target.readyState === "complete")
    ) {
      // If it has already fired, run the listener immediately
      listener({ type: eventType });
    } else {
      // Otherwise, add the event listener as usual
      target.addEventListener(eventType, listener);
    }
  }
  addSafeListener(
    iframe.contentWindow.document,
    "DOMContentLoaded",
    "Alert 2 & 3 & 5: DOMContentLoaded on iframe.contentWindow.document/contentDocument",
    loader
  );
  iframe.addEventListener("load", loader);
  function loader(e) {
    alert("goob!");
    let all = iDoc.querySelectorAll("*[href]"); // when ready, change ts to *[src], *[href]
    all.forEach(function (e) {
      // js href for now.
      let attrib = e.getAttribute("href");
      let attribURL = new URL(attrib);
      let url = new URL(
        attrib,
        uv.decode(iframeWin.location.pathname.slice(7))
      );
      e.href = location.host + "/notuv/" + uv.encode(url.href);
    });
  }
  // iDoc.close();
  // }, 100);
  iframe.hidden = false;
});
/*
// Source - https://stackoverflow.com/a
// Posted by SoniCoder, modified by community. See post 'Timeline' for change history
// Retrieved 2025-11-11, License - CC BY-SA 3.0

var iframe = document.getElementById('iframeID');
iframe = iframe.contentWindow || ( iframe.contentDocument.document || iframe.contentDocument);

iframe.document.open();
iframe.document.write('Hello World!');
iframe.document.close();
*/
