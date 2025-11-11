document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();
  let search = document.querySelector(".url");
  try {
    await registerSW();
  } catch (err) {
    throw err;
  }
  let newURL = "";
  if (isValidUrl(search.value)) {
    newURL = search.value;
  } else {
    newURL = "https://duckduckgo.com/search?q=" + search.value;
  }
  let iframe = document.querySelector("iframe");
  iframe.src = "/notuv/" + uv.encode(newURL);
  iframe.hidden = false;
});
