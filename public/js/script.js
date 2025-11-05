document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  let search = document.querySelector(".url");
  alert(search.value);
});
