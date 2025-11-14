// Pre-unregister SW because I want you ONLY when the time comes
document.addEventListener("DOMContentLoaded", async function () {
  let regs = await navigator.serviceWorker.getRegistrations();
  for (let reg of regs) {
    if (reg.active.scriptURL.includes("/js/")) {
      reg.unregister();
      console.log("done!");
      break;
    }
  }
});
var currentURL = "";
document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();
  let url = document.querySelector(".url");
  try {
    var sw = await registerSW();
    console.log("registered sw");
  } catch (err) {
    console.log("didnt register :(");
    throw err;
  }
  let newURL = search(
    url.value || "https://bestspark.onrender.com",
    "https://www.duckduckgo.com/search?q=%s"
  );
  let iframe = document.querySelector("iframe");
  iframe.src = "/notuv/" + uv.encode(newURL);
  currentURL = newURL;
  // let iframeWin =
  //   iframe.contentWindow ||
  //   iframe.contentDocument.document ||
  //   iframe.contentDocument;
  // let iDoc = iframeWin.document;
  // setInterval(function () {
  // iDoc.write("broooo");
  // iDoc.open();
  // Function to create an event listener for DOMContentLoaded on an element
  // Function to safely add an event listener, checking if the event has already passed
  // function addSafeListener(target, eventType, alertMessage, cb) {
  //   if (!target) {
  //     console.error("Target element is null for event:", alertMessage);
  //     return;
  //   }
  /**
 * var frameElement = document.getElementById('frame');
    var frameDocument = frameElement.contentWindow ? frameElement.contentWindow : frameElement.contentDocument.defaultView;

    var x = frameDocument.getElementsByClassName("text");
    x[0].style.backgroundColor = "pink";
 */
  //   const listener = function (e) {
  //     cb();
  //   };

  //   // For DOMContentLoaded, check if it's already "interactive" or "complete"
  //   if (
  //     eventType === "DOMContentLoaded" &&
  //     (target.readyState === "interactive" || target.readyState === "complete")
  //   ) {
  //     // If it has already fired, run the listener immediately
  //     listener({ type: eventType });
  //   } else {
  //     // Otherwise, add the event listener as usual
  //     target.addEventListener(eventType, listener);
  //   }
  // }
  // addSafeListener(
  //   iframe.contentWindow.document,
  //   "DOMContentLoaded",
  //   "Alert 2 & 3 & 5: DOMContentLoaded on iframe.contentWindow.document/contentDocument",
  //   loader
  // );
  // iframe.addEventListener("load", loader);
  // function loader(e) {
  //   let all = iDoc.querySelectorAll("*[href]"); // when ready, change ts to *[src], *[href]
  //   all.forEach(function (e) {
  //     // js href for now.
  //     let attrib = e.getAttribute("href");
  //     let attribURL = new URL(attrib);
  //     let url = new URL(
  //       attrib,
  //       uv.decode(iframeWin.location.pathname.slice(7))
  //     );
  // e.href = location.host + "/notuv/" + uv.encode(url.href);
  //   });
  // }
  // iDoc.close();
  // }, 100);
  iframe.hidden = false;
});
