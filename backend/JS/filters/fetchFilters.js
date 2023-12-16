
function removeFilteredElements(filter) {
  let words = filter.split(" ");

// Get the first word
let firstWord = words[0];
    const elementsToRemove = document.querySelectorAll(`.${firstWord}`);
  
    elementsToRemove.forEach((element) => {
      element.remove();
    });
    var input = document.getElementById('form').querySelectorAll('input');
    var cmp = 0 ;
    input.forEach((inp)=>{
      if(inp.checked){
       cmp++;
       
    }}
    );
    if(cmp==0){
      displayProd("block");
            
          }
  }
function getFilters(filter,value,type) {
  var xhr = new XMLHttpRequest();
  var classe = '';
  var src = '';

  
  if(type=="phone"){
    classe = "ListProducts";
    src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/PHONE/";
  var url =
   `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/filters/phoneFilter.php`; // Update the URL construction
  // Remplacez ceci par l'URL de votre script PHP
  }else  if(type=="pc"){
    var classe = "PcLists";
    src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/PC/";
    var url =
      `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/filters/pcFilter.php?filter=${filter}&value=${value}`; // Remplacez ceci par l'URL de votre script PHP
    }else  if(type=="watch"){
      classe="WatchLists";
      src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/WATCH/";
      var url =
        `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/filters/watchFilter.php?filter=${filter}&value=${value}`; // Remplacez ceci par l'URL de votre script PHP
      }else  if(type=="tv"){
        src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/TV/";
        classe="TvLists";
        var url =
          `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/filters/tvFilter.php?filter=${filter}&value=${value}`; // Remplacez ceci par l'URL de votre script PHP
        }else{
          alert("hhh");
        }

 
  
  const container = document.querySelector(`.${classe}`);
  // Ouverture de la requête POST vers le script PHP
  xhr.open("GET", url);
    // Envoi des données
 
  xhr.onload = function () {
    if (xhr.readyState === 4 || xhr.status === 200) {
      try {
        // La requête s'est terminée avec succès, traitez la réponse
        console.log(xhr.response)
        var data = JSON.parse(xhr.responseText);

        data.forEach((item) => {
          const divi = document.createElement("div");
          divi.className = value;
          divi.classList.add('Element')
          const a = document.createElement("a");
          const img = document.createElement("img");

          console.log(item.image);
          a.appendChild(img);
          divi.appendChild(a);
          const button = document.createElement("button");
          button.textContent = "Ajouter au Panier";
          button.style.display="none"
          
          button.type = "button";
          const spanMarque = document.createElement('span');
          spanMarque.className="productMarque itm"
          const spanId = document.createElement("span");
          spanId.style.display = "none";
          spanId.id = "id_prod";
          const spanName = document.createElement("span");
          spanName.className = "productName itm"
          if(type=="phone"){
            spanName.textContent = item.nom_tele;
          
            spanId.textContent = item.id_tel;
          }else  if(type=="pc"){
            spanName.textContent = item.nom_pc;
          
            spanId.textContent = item.id_pc;
            }else  if(type=="watch"){
              spanName.textContent = item.nom_watch;
              spanId.textContent = item.id_watch;
             
              }else  if(type=="tv"){
                spanName.textContent = item.nom_tv;
          
            spanId.textContent = item.id_tv;
                }
                img.src = src + item.image;
                spanMarque.textContent = item.marque

          divi.appendChild(spanId);
          divi.appendChild(spanName);
          divi.appendChild(spanMarque)

          const spanPrice = document.createElement("span");
          spanPrice.textContent = item.prix + " DH";
          spanPrice.className="productPrice itm"
          divi.appendChild(spanPrice);

          const spanStock = document.createElement("span");
          spanStock.textContent = item.stock;
          
          if (item.stock >= 1) {
            spanStock.textContent = "En Stock";
            spanStock.style.color = "green";
          } else {
            spanStock.textContent = "Epuise";
            spanStock.style.color = "red";
          }
          spanStock.className = "Pprice itm";
          divi.appendChild(spanStock);
          divi.appendChild(button);

          // Event listener to redirect to the details page on click
          divi.addEventListener("click", function () {
            const id = this.querySelector("span#id_prod").textContent;
            window.location.href =
              "http://localhost/EcomWebSite-main2/Site%20Web%20Ecommerce/Frontend/Html/PhoneDetails.html?id=" +
              id;
          });

          container.appendChild(divi);
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("no responde : ");
    }
  };

  xhr.send();
}
