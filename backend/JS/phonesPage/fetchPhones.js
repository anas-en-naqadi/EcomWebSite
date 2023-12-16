

window.addEventListener('onload', function(event) {
  // Check if the event is being triggered due to window closing
  if (event.clientY < 0) {
    localStorage.clear();
  }
});
showSpinner();
window.onload = function () {
  nom = localStorage.getItem('user_name');
  if(nom){
  document.getElementById('LoginB').style.display = "none";
  document.getElementById('user').style.display = "block";
  document.getElementById('nom-user').textContent=nom;
  }
  setTimeout(()=>{
    pcPage();
    phonePage();
  
    tvPage();
    watchPage();
  },2000)

};



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
function ShowLogInForm(){
  document.getElementById("OverLayID").style.display = 'block';
  document.getElementById("OverLayID2").style.display = 'none';
  document.body.style.overflowY = 'hidden';
}

function goToCartProd(){

  const id = localStorage.getItem('id_user');

  if(id){
    location.href="http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/Frontend/Html/Cart.html";
  }else{
    ShowLogInForm();
  }
}


function showSpinner() {
  // This code will execute after the entire document and spinner element are fully loaded
  document.getElementById("spinner").style.display = "block"; // Show the spinner
  // Optionally, show the spinner container as well if needed
  document.querySelector(".spinner-container").style.display = "block";
  // Perform any other operations after the document has fully loaded
}

function hideSpinner() {
  document.getElementById("spinner").style.display = "none"; // Hide the spinner
  document.querySelector(".spinner-container").style.display = "none";
}

function tvPage() {
 
 
  
  dataFetch('.TvLists', 'Television',0, currentPage, productsPerPage);
  dataFetch('.headTv', 'Television',1, currentPage, productsPerPage);
}
function pcPage() {
 

  dataFetch('.PcLists', 'Ordinateurs',0, currentPage, productsPerPage);
  dataFetch('.headPc', 'Ordinateurs',1, currentPage, productsPerPage);
}
function watchPage() {
  
  dataFetch('.WatchLists', 'SmartWatch',0, currentPage, productsPerPage);
  dataFetch('.headWatch', 'SmartWatch',1, currentPage, productsPerPage);
  
  
}
function phonePage() {
 
  

  dataFetch('.ListProducts', 'Telephone',0, currentPage, productsPerPage);
  dataFetch('.headPhones', 'Telephone',1, currentPage, productsPerPage);
}

function dataFetch(productClass, type,li, pageNumber, productsPerPage) {
  
  const startIndex = (pageNumber - 1) * productsPerPage;
  const container = document.querySelector(productClass);

  const req = new XMLHttpRequest();
  req.open(
    "GET",
    `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/index.php/fetch.php?type=${type}`
  );
  req.send();

  req.onload =async function () {
    if (req.status == 200 || req.readyState === 4) {
      try {
        const data = await JSON.parse(req.responseText);

        if(data.length>16){
          document.getElementById('add_more').style.display="block"
        }
        
        if (container.children.length >= data.length) {
          document.getElementById('add_more').style.display = "none";
        }
       
        const paginatedData = data.slice(startIndex, startIndex + productsPerPage);

        if (paginatedData.length === 0) {
          alert('No more products to display.');
          return;
        }
        if(data.length==paginatedData.length){
          document.getElementById('add_more').style.display="block"
        }
        paginatedData.forEach((item) => {
          
          const divi = document.createElement("div");
          divi.className = "Element";
          const spanMarque = document.createElement("span");
          spanMarque.textContent = item.marque;
          
          spanMarque.className = "productMarque itm";

          const img = document.createElement("img");
          img.id = "img";
          img.addEventListener("click", function () {

            
           
            var parent = img.closest('.Element');
            if(parent){
              var id = parent.querySelector("#id_prod").textContent;
            }else{
              var parent1 =img.closest(".headPhone");
              var id = parent1.querySelector("#id_prod").textContent;
            }
           

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

          divi.appendChild(img);
          const button = document.createElement("button");
          button.textContent = "Ajouter au Panier";
          button.type = "button";
          button.addEventListener("click", function () {
            
           
            inserToCart(this);}
            
          );
          const spanId = document.createElement("span");
          spanId.style.display = "none";
          spanId.id = "id_prod";
          const spanName = document.createElement("span");
          if (type === "Telephone") {
            spanName.textContent = item.nom_tele;
            spanName.className = "productName itm";
            img.src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/PHONE/" + item.image;
            spanId.textContent = item.id_tel;
          } else if (type === "Ordinateurs") {
            spanName.textContent = item.nom_pc;
            spanName.className = "productName itm";
            img.src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/PC/" + item.image;
            spanId.textContent = item.id_pc;
            spanName.className = "productName itm";
          } else if (type === "Television") {
            spanName.textContent = item.nom_tv;
            img.src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/TV/" + item.image;
            spanId.textContent = item.id_tv;
            spanName.className = "productName itm";
          } else if (type === "SmartWatch") {
            spanName.textContent = item.nom_watch;
            spanName.className = "productName itm";
            img.src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/WATCH/" + item.image;
            spanId.textContent = item.id_watch;
          }
          divi.appendChild(spanId);
          divi.appendChild(spanName);
          divi.appendChild(spanMarque);
          const spanPrice = document.createElement("span");
          spanPrice.textContent = item.prix + " DH";
          spanPrice.className = "productPrice itm";
          divi.appendChild(spanPrice);

          const spanStock = document.createElement("span");
        
          if(item.stock >=1){
            spanStock.textContent = "En Stock"
            spanStock.style.color="green"
          }else{
            spanStock.textContent  = "Epuise";
            spanStock.style.color="red"
            button.style.display="none";
          }

          divi.appendChild(spanStock);
          divi.appendChild(button);

      
         
          container.appendChild(divi);

         

          if (li == 1) {
            const ul = document.querySelector(productClass);
            const lii = document.createElement("li");
            divi.className = "headPhone";
            divi.removeChild(button);
            lii.appendChild(divi);
            ul.appendChild(lii);
          
          }
        
          hideSpinner();
        });
      } catch (error) {
        console.error("check " + error);
        hideSpinner();
      }
    }
  };

  req.onerror = function(error){
    console.error(error);
  }
}

 

function deleteProd(button) {
  const parent = button.closest(".pro1");
  
 

  // Get the product details from the deleted element (assuming it has an ID attribute)
  const productName = parent.querySelector('.#nomProduit').textContent ;
  const productData = JSON.parse(localStorage.getItem("cartItems")) || [];
  const updatedData = productData.filter((product) => product.name !== productName);
  localStorage.setItem("cartItems", JSON.stringify(updatedData));
   // Remove the parent element from the DOM
   parent.remove();
}
function resetFilter (){
  document.querySelector("#MinPriceInput").value = 0;
  document.querySelector("#MaxPriceInput").value =  0;
  const elements = document.querySelectorAll('.Element');

  elements.forEach(element => {
    element.style.display = 'flex';
  });
  const FiltersPrices = document.querySelectorAll('.price');

      FiltersPrices.forEach(element => {
        element.remove();
      });
}
function filterByPrice(type,classe){
 
  const container = document.querySelector(`.${classe}`);
  
  const min = document.querySelector("#MinPriceInput").value;
  const max = document.querySelector("#MaxPriceInput").value;
  
  const form = new FormData();
  form.append("min", min);
  form.append('max',max);
  form.append('type',type);
  const req = new XMLHttpRequest();
  req.open('POST','http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/filters/prixfilter.php')
  req.onload = async function (){

    if(req.status===200 || req.readyState === 4){
      const elements = document.querySelectorAll('.Element');

      elements.forEach(element => {
        element.style.display = 'none';
      });
      const FiltersPrices = document.querySelectorAll('.price');

      FiltersPrices.forEach(element => {
        element.remove();
      });
     
      const data = JSON.parse(req.response);
      if(data.length<16){
        document.getElementById('add_more').style.display="none"
      }else{
        document.getElementById('add_more').style.display="block"
      }
      data.forEach((item) => {
        const divi = document.createElement("div");
        divi.className = "Element";
        const spanMarque = document.createElement("span");
        spanMarque.textContent = item.marque;
      
        spanMarque.className = "productMarque itm";

        const img = document.createElement("img");
        img.id = "img";
        img.addEventListener("click", function () {
          var parent = img.closest('.Element');
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

        divi.appendChild(img);
        const button = document.createElement("button");
        button.textContent = "Ajouter au Panier";
        button.type = "button";
        button.addEventListener("click", function () {
          addToCart(this);
          if(localStorage.getItem('id_user')){
          inserToCart(this);}else{
            console.log('you are not log in');
          }
        });
        const spanId = document.createElement("span");
        spanId.style.display = "none";
        spanId.id = "id_prod";
        const spanName = document.createElement("span");
        if (type === "phone") {
          spanName.textContent = item.nom_tele;
          spanName.className = "productName itm";
          img.src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/PHONE/" + item.image;
          spanId.textContent = item.id_tel;
        } else if (type === "pc") {
          spanName.textContent = item.nom_pc;
          spanName.className = "productName itm";
          img.src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/PC/" + item.image;
          spanId.textContent = item.id_pc;
          spanName.className = "productName itm";
        } else if (type === "tv") {
          spanName.textContent = item.nom_tv;
          img.src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/TV/" + item.image;
          spanId.textContent = item.id_tv;
          spanName.className = "productName itm";
        } else if (type === "watch") {
          spanName.textContent = item.nom_watch;
          spanName.className = "productName itm";
          img.src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/WATCH/" + item.image;
          spanId.textContent = item.id_watch;
        }
        divi.appendChild(spanId);
        divi.appendChild(spanName);
        divi.appendChild(spanMarque);
        const spanPrice = document.createElement("span");
        spanPrice.textContent = item.prix + " DH";
        spanPrice.className = "productPrice itm";
        divi.appendChild(spanPrice);

        const spanStock = document.createElement("span");
      
        if(item.stock >=1){
          spanStock.textContent = "En Stock"
          spanStock.style.color="green"
        }else{
          spanStock.textContent  = "Epuise";
          spanStock.style.color="red"
          button.style.display="none";
        }

        divi.appendChild(spanStock);
        divi.appendChild(button);

      
       
        container.appendChild(divi);
      });
    }
  }

  hideSpinner();


req.send(form);


}