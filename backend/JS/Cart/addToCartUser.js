document.addEventListener("DOMContentLoaded", function () {
  nom = localStorage.getItem("user_name");

  if (nom) {
    document.getElementById("user").style.visibility = "visible";
    document.getElementById("nom-user").textContent = nom;
  }
});
window.addEventListener("beforeunload", function (event) {
  // Check if the event is being triggered due to window closing
  if (event.clientY < 0) {
    localStorage.clear();
  }
});