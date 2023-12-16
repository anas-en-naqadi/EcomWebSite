

function ClosePanier() {

  document.getElementById("PanierDivParentID").style.visibility="hidden";
}

// Function to close the shopping cart

function ShowLogInForm(){
  document.getElementById("OverLayID").style.display = 'block';
  document.getElementById("OverLayID2").style.display = 'none';
  document.body.style.overflowY = 'hidden';
}
function dataFetch(productClass, type) {
  const req = new XMLHttpRequest();
  req.open(
    "GET",
    `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/index.php/fetch.php?type=${type}`
  );
  req.send();

  req.onload = function () {
    if (req.status == 200 || req.readyState === 4) {
      try {
        const data = JSON.parse(req.responseText);
        const firstSeven = data.slice(0, 7);
        firstSeven.forEach((item) => {
          const divi = document.createElement("div");
          divi.className = "Element";
          const spanMarque = document.createElement("span");
          spanMarque.textContent = item.marque;
      
          spanMarque.className = "productMarque";

          const img = document.createElement("img");
          img.id = "img";

          divi.appendChild(img);
          
          
          const spanId = document.createElement("span");
          spanId.style.display = "none";
          spanId.id = "id_prod";
          const spanName = document.createElement("span");
          if (type === "Telephone") {
            spanName.textContent = item.nom_tele;
            spanName.className = "productName";
            img.src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/PHONE/" + item.image;
            spanId.textContent = item.id_tel;
          } else if (type === "Ordinateurs") {
            spanName.textContent = item.nom_pc;
            spanName.className = "productName";
            img.src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/PC/" + item.image;
            spanId.textContent = item.id_pc;
            spanName.className = "productName";
          } else if (type === "Television") {
            spanName.textContent = item.nom_tv;
            img.src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/TV/" + item.image;
            spanId.textContent = item.id_tv;
            spanName.className = "productName";
          } else if (type === "SmartWatch") {
            spanName.textContent = item.nom_watch;
            spanName.className = "productName";
            img.src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/WATCH/" + item.image;
            spanId.textContent = item.id_watch;
          }
          divi.appendChild(spanId);
          divi.appendChild(spanName);
          divi.appendChild(spanMarque);
          const spanPrice = document.createElement("span");
          spanPrice.textContent = item.prix + " DH";
          spanPrice.className = "productPrice";
          divi.appendChild(spanPrice);

          const spanStock = document.createElement("span");
         spanStock.classList.add('stock')
          if(item.stock >=1){
            spanStock.textContent = "En Stock"
            spanStock.style.color="green"
          }else{
            spanStock.textContent  = "Epuise";
            spanStock.style.color="red"
           
          }
          divi.appendChild(spanStock);
          

          img.addEventListener("click", function () {
            var parent = img.closest(".Element");
            var id = parent.querySelector("#id_prod").textContent;

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

          const ul = document.querySelector(productClass);
          const lii = document.createElement("li");
          divi.className = "Element";
          lii.appendChild(divi);
          ul.appendChild(lii);
         

          hideSpinner();
        });
      } catch (error) {
        console.error("check " + error);
        hideSpinner();
      }
    }
  };

  req.onerror = function (error) {
    console.error(error);
  };
}
