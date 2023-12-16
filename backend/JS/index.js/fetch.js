document.addEventListener("DOMContentLoaded", function () {
  showSpinner();
  nom = localStorage.getItem("user_name");
  if (nom) {
    document.getElementById("LoginL").style.display = "none";
    document.getElementById("user").style.display = "block";
    document.getElementById("nom-user").textContent = nom;
  }
});
window.onload = function () {
  setTimeout(() => {
    phone();
    watch();
    tv();
    pc();
    phonePage();
  }, 1500);

  
};
// Function to toggle the visibility of the shopping cart
function togglePanier() {
  var panierDiv = document.getElementById("PanierDivParentID");
  if (panierDiv.style.display === "block" || panierDiv.style.display === "") {
    panierDiv.style.display = "none";
  } else {
    panierDiv.style.display = "block";
  }
}
// Function to close the shopping cart
function closePanier() {
  var panierDiv = document.getElementById("PanierDivParentID");
  panierDiv.style.display = "none";
}

window.addEventListener("unload", function (event) {
  // Check if the event is being triggered due to window closing
  if (event.clientY < 0) {
    localStorage.clear();
  }
});

function showSpinner() {
  document.getElementById("spinner").style.display = "block"; // Show the spinner
  // Optionally, show the spinner container as well if needed
  document.querySelector(".spinner-container").style.display = "block";
  // Perform any other operations after the document has fully loaded
}

function hideSpinner() {
  document.getElementById("spinner").style.display = "none"; // Hide the spinner
  document.querySelector(".spinner-container").style.display = "none";
}
function phone() {
  const prod = "ElementPhone";
  const type = "Telephone";
  dataFetch(prod, type);
}
function watch() {
  const prod = "ElementWatch";
  const type = "SmartWatch";
  dataFetch(prod, type);
}
function tv() {
  const prod = "ElementTv";
  const type = "Television";
  dataFetch(prod, type);
}
function pc() {
  const prod = "ElementPc";
  const type = "Ordinateurs";
  dataFetch(prod, type);
}

function phonePage() {
  const prod = "ElementPh";
  const type = "Telephone";
  dataFetch(prod, type);
 
}
function dataFetch(product, type) {
  const products = document.getElementsByClassName(product)[0];

  const req = new XMLHttpRequest();

  req.open(
    "GET",
    `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/index.php/fetch.php?type=${type}`
  );
  req.send();

  req.onload = async function () {
    try {
      if (req.status == 200 || req.readyState === 4) {
        const data = await JSON.parse(req.responseText);

        let i = 0;
        const maxProducts = Math.min(data.length, products.children.length); // Get the minimum between data rows and products

        while (i < maxProducts) {
          const productItem = products.children[i];
          const prodDivs = productItem.querySelector('.Element')
          const spans = prodDivs.querySelectorAll("span");
          
          if (spans.length >= 3) {
            const id_span = document.createElement("span");
            id_span.style.display = "none";
            id_span.id = "id_prod";

            if (type == "Telephone") {
              spans[1].textContent = data[i].marque;
              prodDivs.querySelector("img").src =
                "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/PHONE/" + data[i].image;
              spans[0].textContent = data[i].nom_tele;
              id_span.textContent = data[i].id_tel;
            } else if (type == "Ordinateurs") {
              spans[1].textContent = data[i].marque;
              prodDivs.querySelector("img").src =
                "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/PC/" + data[i].image;
              spans[0].textContent = data[i].nom_pc;
              id_span.textContent = data[i].id_pc;
            } else if (type == "Television") {
              spans[1].textContent = data[i].marque;
              prodDivs.querySelector("img").src =
                "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/TV/" + data[i].image;
              spans[0].textContent = data[i].nom_tv;
              id_span.textContent = data[i].id_tv;
            } else if (type == "SmartWatch") {
              spans[1].textContent = data[i].marque;
              prodDivs.querySelector("img").src =
                "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/WATCH/" + data[i].image;
              spans[0].textContent = data[i].nom_watch;
              id_span.textContent = data[i].id_watch;
            }

            prodDivs.querySelector("img").addEventListener("click", function () {
              id = id_span.textContent;

              if (type == "Telephone") {
                window.location.href =
                  "http://localhost/EcomWebSite-main2/Site%20Web%20Ecommerce/Frontend/Html/PhoneDetails.html?id=" +
                  id;
              } else if (type == "Ordinateurs") {
                window.location.href =
                  "http://localhost/EcomWebSite-main2/Site%20Web%20Ecommerce/Frontend/Html/PcDetails.html?id=" +
                  id;
              } else if (type == "Television") {
                window.location.href =
                  "http://localhost/EcomWebSite-main2/Site%20Web%20Ecommerce/Frontend/Html/TvDetails.html?id=" +
                  id;
              } else if (type == "SmartWatch") {
                window.location.href =
                  "http://localhost/EcomWebSite-main2/Site%20Web%20Ecommerce/Frontend/Html/WatchDetails.html?id=" +
                  id;
              }
            });

            spans[2].textContent = data[i].prix + " DH";
            const span = document.createElement("span");
            if (data[i].stock >= 1) {
              span.textContent = "En Stock";
              span.style.color = "green";
            } else {
              span.textContent = "Epuise";
              span.style.color = "red";
            }
            span.className = "Pprice itm";
            prodDivs.appendChild(id_span);
            prodDivs.appendChild(span);
          } else {
            console.error("Not enough spans found for product", i);
          }

          i++;
        }
      } else {
        alert("Error getting data");
      }

      hideSpinner();
    } catch (error) {
      console.error("check " + error);
      hideSpinner();
    }
  };

  req.onerror = function (error) {
    console.error(error);
    hideSpinner();
  };
}


function searchProd() {
  let search = document.getElementById("in1").value;
  if (search) {
    let req = new XMLHttpRequest();
    let dropdown = document.getElementById("dropdown");
    dropdown.innerHTML = ""; // Clear previous dropdown items

    req.onreadystatechange = async function () {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          const data = await JSON.parse(req.responseText);

          for (let i = 0; i < data.length && i < 5; i++) {
            const div = document.createElement("div");
            div.textContent = data[i].name; // Assuming data is an array of product names
            div.classList.add("dropdown-item"); // Apply a class for styling if needed
            div.addEventListener("click", function () {
              localStorage.setItem("search", data[i]);
              document.getElementById("in1").value = this.textContent;
              dropdown.style.display = "none"; // Hide dropdown on selection
              const table = data[i].table;
              const id = data[i].id;

              if (table == "telephone") {
                window.location.href =
                  "http://localhost/EcomWebSite-main2/Site%20Web%20Ecommerce/Frontend/Html/PhoneDetails.html?id=" +
                  id;
              } else if (table == "pc") {
                window.location.href =
                  "http://localhost/EcomWebSite-main2/Site%20Web%20Ecommerce/Frontend/Html/PcDetails.html?id=" +
                  id;
              } else if (table == "tv") {
                window.location.href =
                  "http://localhost/EcomWebSite-main2/Site%20Web%20Ecommerce/Frontend/Html/TvDetails.html?id=" +
                  id;
              } else if (table == "watch") {
                window.location.href =
                  "http://localhost/EcomWebSite-main2/Site%20Web%20Ecommerce/Frontend/Html/WatchDetails.html?id=" +
                  id;
              }
            });
            // Limit the array to the last 5 clicked results

            dropdown.appendChild(div);
          }

          if (data.length > 0) {
            dropdown.style.display = "block"; // Show dropdown if data is available
          } else {
            const div = document.createElement("div");
            div.className = "dropdown-item";
            div.textContent = "No result Match This";
            dropdown.appendChild(div); // Hide dropdown if no data is available
          }
        } else {
          console.error("error show data in drop down");
        }
      }
    };

    req.open(
      "GET",
      `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/index.php/fetch.php?name=${search}`,
      true
    );
    req.send();
  } else {
    dropdown.innerHTML = "";
    dropdown.style.display = "none";
  }
}
