function showDetailsForme() {
  let selectedValue = document.getElementById("selectProd").value;

  switch (selectedValue) {
    case "Ordinateurs":
      document.getElementById("PcForm").style.display =
        "block";
      document.getElementById("PhoneForm").style.display =
        "none";
      document.getElementById("TvForm").style.display =
       "none";
       document.getElementById("WatchForm").style.display =
       "none";
      break;
    case "Telephone":
      document.getElementById("PhoneForm").style.display =
        "block";
      document.getElementById("PcForm").style.display =
        "none";
        document.getElementById("TvForm").style.display =
        "none";
        document.getElementById("WatchForm").style.display =
        "none";
      break;
    case "Smart Watch":
      document.getElementById("WatchForm").style.display =
        "block";
      document.getElementById("PcForm").style.display =
        "none";
        document.getElementById("PhoneForm").style.display =
        "none";
      document.getElementById("TvForm").style.display =
      "none";
      break;
    case "Television":
      document.getElementById("TvForm").style.display =
      "block";
      document.getElementById("PhoneForm").style.display =
      "none";
      document.getElementById("PcForm").style.display =
      "none";
      document.getElementById("WatchForm").style.display =
      "none";
      break;
    case "vide":
      document.getElementById("WatchForm").style.display =
      "none";
      document.getElementById("PcForm").style.display =
      "none";
      document.getElementById("PhoneForm").style.display =
      "none";
      document.getElementById("TvForm").style.display =
      "none";
      alert("Choisir une categorie");
      break;
  }
}