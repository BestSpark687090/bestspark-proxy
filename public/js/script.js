document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();
  let search = document.querySelector(".url");
  try {
    await registerSW();
  } catch (err) {
    throw err;
  }
});
