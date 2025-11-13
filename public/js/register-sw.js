const stockSW = "/js/sw.js";
const swAllowedHostnames = ["localhost", "127.0.0.1"];

// async function registerSW() {
//   if (!navigator.serviceWorker) {
//     if (
//       location.protocol !== "https:" &&
//       !swAllowedHostnames.includes(location.hostname)
//     ) {
//       throw new Error("Service workers cannot be registered without https.");
//     }

//     throw new Error("Your browser doesn't support service workers.");
//   }

//   return await navigator.serviceWorker.register(stockSW);
// }
async function registerSW() {
  if ("serviceWorker" in navigator) {
    // Register a service worker hosted at the root of the
    // site using the default scope.
    navigator.serviceWorker
      .register("/js/sw.js", {
        updateViaCache: "none",
        scope: "/",
      })
      .then(
        (registration) => {
          console.log("Service worker registration succeeded:", registration);
        },
        (error) => {
          console.error(`Service worker registration failed: ${error}`);
        }
      );
  } else {
    console.error("Service workers are not supported.");
  }
}
