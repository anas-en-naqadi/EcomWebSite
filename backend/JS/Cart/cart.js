window.addEventListener("DOMContentLoaded", function () {
showSpinner()

  var id = localStorage.getItem("id_user");
  nom = localStorage.getItem("user_name");
  if (nom && id) {
    document.getElementById("LoginB").style.display = "none";
    document.getElementById("user").style.display = "block";
    document.getElementById("nom-user").textContent = nom;
  }
  if (id) {
    setTimeout(() => {
      
      fetchToCart();
      

    }, 1500);
  } else {
    setTimeout(() => {
      updateCartDisplay("ProdectsContainer");
    }, 1500);
  }

  
 
});

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

function clearCart() {
  var cartContainer = document.querySelector("#ProdectsContainer");
  while (cartContainer.firstChild) {
    cartContainer.removeChild(cartContainer.firstChild);
  }
}

function checkLogin() {
 
    window.location.href =
      "http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/Frontend/Html/Order.html";

}

let total = 0;
function fetchToCart() {
  var id = localStorage.getItem("id_user");
  var cartContainer = document.querySelector("#ProdectsContainer");

  let req = new XMLHttpRequest();
  req.open(
    "GET",
    `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/CartData/fetchToCart.php?id=${id}`
  );
  req.send();
  req.onload = function () {
    if (req.status == 200 || req.status == 304) {
      try {
        const data = JSON.parse(this.responseText);
        
        for(let i = 0 ;i<data.length;i++){
          const productElement = document.createElement("div");
    productElement.className = "pro1";
    const div = document.createElement("div");

    const id_prod = document.createElement('span');
    id_prod.id="id_prod";
    id_prod.textContent=data[i].id_prod
    id_prod.style.display="none"
    const nom = document.createElement("span");
    nom.textContent = data[i].nom_prod;
    nom.id = "nomProduit";
    const marque = document.createElement("span");
    marque.textContent = data[i].marque_prod;
    marque.id = "marqueProduit";
    const prix = document.createElement("span");
    prix.textContent = data[i].prix_prod;
    prix.id = "prixProduit";
    div.className = "Names";
    div.appendChild(id_prod)
    div.appendChild(nom);
    div.appendChild(marque);
    div.appendChild(prix);
    const image = document.createElement("img");
    image.src = data[i].image;
    image.id = "imageProduit";

    const countDiv = document.createElement("div");
    countDiv.className = "InpCont";
    countDiv.id = "InpContP"
    const divInc = document.createElement("div");
    divInc.className = "DecrementQ";
    divInc.textContent = "-";
    divInc.onclick = function() {
      DecrimentInput2(this);
    };
    
    const divDec = document.createElement("div");
    divDec.className = "IncrimentQ";
    divDec.onclick = function() {
      IncrimentInput1(this);
    };
    divDec.textContent = "+";
    
    const input = document.createElement("input");
    input.type = "number";
    input.value = data[i].quantite;
    input.readOnly=true
    input.className = "QantiteProduit";
    input.id = "QantiteProduitID";
    const removBut = document.createElement("div");
    removBut.className = "DeleteProdectBTN";
    removBut.addEventListener("click", function () {
      deteletProdUser(this);
    });
    const QuaniteDiv = document.createElement('div');
    QuaniteDiv.className="QantiteDiv";
    QuaniteDiv.id="QantiteDivID"
    const label = document.createElement('label');
    label.textContent="Quantite"
    countDiv.appendChild(divInc);
    countDiv.appendChild(input);
    countDiv.appendChild(divDec);
    QuaniteDiv.appendChild(label);
    QuaniteDiv.appendChild(countDiv)
    div.appendChild(QuaniteDiv)
    productElement.appendChild(image);
    productElement.appendChild(div);
    productElement.appendChild(removBut);
    const hr = document.createElement('hr');
    cartContainer.appendChild(productElement);
    cartContainer.appendChild(hr);
  
         
            total += data[i].prix_prod * data[i].quantite;
         
        
        };

       checkEmptyCart();
        
       
        if (total) {
         
          const totalPannier = document.getElementById("SousTotalPriceID");
          totalPannier.textContent = total.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          document.getElementById("TotalPriceID").textContent = total.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, " ");

            localStorage.setItem('total',parseFloat(total.toFixed(2)));
        }
      
      hideSpinner()
      } catch (error) {
        hideSpinner();
        console.error(error);
      }
    }
  };

  req.onerror = function (error) {
    hideSpinner();
    console.error(error);
  };
}

function deteletProdUser(element) {
  const prod = element.closest(".pro1");

  const id = prod.querySelector("#id_prod").textContent;

  var select = "pannier";

  let req = new XMLHttpRequest();

  req.open(
    "GET",
    `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/Admin/delete.php?type=${select}&idi=${id}`
  );

  req.send();

  req.onload = function () {
    if (req.status === 200 || req.readyState === 4) {
      try {
        const data = req.responseText;
        if (data) {
          alert(data);
  // Get the product details from the deleted element (assuming it has an ID attribute)
  const productName = prod.querySelector('#nomProduit').textContent ;
  const productData = JSON.parse(localStorage.getItem("cartItems")) || [];
  const updatedData = productData.filter((product) => product.name !== productName);
  localStorage.setItem("cartItems", JSON.stringify(updatedData));
          prod.remove();
          checkEmptyCart();
          clearCart();
          total=0
          
          fetchToCart();
         
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  req.onerror = function (error) {
    console.error(error);
  };
}

function checkEmptyCart() {
  const cartContainer = document.getElementById('ProdectsContainer');
  if (cartContainer.innerHTML.trim() === '') {
    const div = document.createElement('div');
    div.textContent = "The Cart Is Empty";
    div.className = "empty";
    cartContainer.appendChild(div);
    total=0
    const totalPannier = document.getElementById("SousTotalPriceID");
          totalPannier.textContent = total.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          document.getElementById("TotalPriceID").textContent = total.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
}

function changeQuantity(id,op,nom){
  let req = new XMLHttpRequest();
  req.open('GET',`http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/CartData/updateQuantite.php?id=${id}&case=${op}&n=${nom}`);
req.send();
req.onload=function(){
  if(req.status===200){
   
    const data = JSON.parse(req.response);

    if(data.message=="Vous avez arriver le nombre du stock"){
      alert(data.message);
    }
    localStorage.setItem('total',parseFloat(data.total.toFixed(2)));
    const totalPannier = document.getElementById("SousTotalPriceID");
    totalPannier.textContent = data.total
      .toFixed(2)
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      document.getElementById("TotalPriceID").textContent = data.total
      .toFixed(2)
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")

    
  }else{
    console.log("erreur 404")
  }
}

}