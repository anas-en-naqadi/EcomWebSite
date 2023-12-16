function pannier() {
  if(localStorage.getItem('id_user')){
    window.location.href =
    "http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/Frontend/Html/Cart.html";
  }else{
    ShowLogInForm()
  }
 
}
document.addEventListener('DOMContentLoaded',function(){
 if( localStorage.getItem('count') != null){
  document.getElementById('panierCount').textContent = `(${localStorage.getItem('count')})`;
 }else{
  document.getElementById('panierCount').textContent = `(0)`;
 }

  
})
// Event listener for beforeunload
window.addEventListener("unload", function (event) {
  // Check if the event is being triggered due to window closing
  if (event.clientY < 0) {
    localStorage.clear();
  }
});

function goToCartProd(){

  const id = localStorage.getItem('id_user');

  if(id){
    location.href="http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/Frontend/Html/Cart.html";
  }else{
    ShowLogInForm();
  }
}

let count = localStorage.getItem('count');
function inserToCart(element) {
  const form = new FormData();

  const id = localStorage.getItem('id_user');
  if(id){

  var div = element.closest(".Element");
  if (!div) {
    div = element.parentElement.parentElement;
    quantity = div.querySelector("input").value;

    spans = div.querySelectorAll("span");
    var marque = div.querySelector("span:nth-child(4)").textContent;
    var prix = div.querySelector("span:nth-child(5)").textContent;
   
  } else {
    spans = div.querySelectorAll("span");

    var marque = spans[2].textContent;
    var prix = spans[3].textContent;

    quantity = 1;
  }

  
  form.append("quantite", quantity);
 

  var id_prod = spans[0].textContent;
  var img = div.querySelector("img").src;
  var nom = spans[1].textContent;
  form.append("id_user",id);
  form.append("nom", nom);
  form.append("marque", marque);
  form.append("prix", prix);
  form.append("id_prod", id_prod);
  form.append("image", img);
  
  let req = new XMLHttpRequest();
  req.open(
    "POST",
    "http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/CartData/insertToCart.php"
  );   
 

  req.onload = function () {
    if (req.status === 200 || req.readyState === 4) {
      const data = req.responseText;
      count++;
   localStorage.setItem('count',count);
      alert(data);
      document.getElementById('panierCount').textContent = `(${localStorage.getItem('count')})`;
    }
  };

  req.onerror = function (error) {
    console.error(error);
  };

  req.send(form);}else{
    
    ShowLogInForm();
  }
}

let totalPrice = 0;
function addToCart(button) {
  var productElement = button.closest(".Element");

  if (!productElement) {
    productElement = button.parentElement.parentElement;
    var prodQuantity =productElement.querySelector("#QantiteProduitID").value;
  }

  const productName = productElement.querySelector(".productName").textContent;
  const productMarque =
    productElement.querySelector(".productMarque").textContent;
  const productPrice = parseFloat(productElement.querySelector(".productPrice").textContent
    
  );

  const productId = productElement.querySelector("#id_prod").textContent;
  const productImage = productElement.querySelector("#img").src;

  if (prodQuantity) {
    addProductToCart(
      productId,
      productName,
      productPrice,
      productMarque,
      productImage,
      prodQuantity
    );
  } else {
    addProductToCart(
      productId,
      productName,
      productPrice,
      productMarque,
      productImage
    );
  }
 
}

function addProductToCart(
  productId,
  productName,
  productPrice,
  productMarque,
  productImage,
  prodQuantity
) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const existingProduct = cartItems.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    if (prodQuantity) {
      cartItems.push({
        id: productId,
        name: productName,
        price: productPrice,
        quantity: prodQuantity,
        marque: productMarque,
        image: productImage,
      });
    } else {
      cartItems.push({
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1,
        marque: productMarque,
        image: productImage,
      });
    }
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  updateCartDisplay("PanierDivProdectsID");
  
}

function updateCartDisplay(container) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartContainer = document.getElementById(container);
  cartContainer.innerHTML = "";

  cartItems.forEach((item) => {
    const productElement = document.createElement("div");
    productElement.className = "pro1";
    const div = document.createElement("div");

    const nom = document.createElement("span");
    nom.textContent = item.name;
    nom.id = "nomProduit";
    const marque = document.createElement("span");
    marque.textContent = item.marque;
    marque.id = "marqueProduit";
    const prix = document.createElement("span");
    prix.textContent = item.price;
    prix.id = "prixProduit";
    div.className = "Names";
    const id_span = document.createElement('span');
    id_span.style.display="none"
    id_span.id="id_prod";
    div.appendChild(id_span)
    div.appendChild(nom);
    div.appendChild(marque);
    div.appendChild(prix);
    const image = document.createElement("img");
    image.src = item.image;
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
    input.value = 1;
    input.readOnly=true
    input.className = "QantiteProduit";
    input.id = "QantiteProduitID";
    const removBut = document.createElement("div");
    removBut.className = "DeleteProdectBTN";
    removBut.addEventListener("click", function () {
      deleteProd(this);
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
   
  });

  if (cartItems.length > 0) {
    const cartContainer = document.getElementById(container);
    // Show the cart container
    cartContainer.style.display = 'block';
  } else {
    // If the cart is empty, you might want to handle this case accordingly
   alert('The cart is empty.');
  }
  if (container == "PanierDivProdectsID") {
    const totalPriceElement = document.getElementById("PanierTotalPriceID");
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    totalPriceElement.textContent = `${totalPrice} DH`;
   
  }else{
    const totalPannier = document.getElementById("SousTotalPriceID");

    totalPrice = cartItems.reduce(
     (total, item) => total + item.price * item.quantity,
     0
   );
   totalPannier.textContent = `${totalPrice} DH`;
   document.getElementById("TotalPriceID").textContent = `${totalPrice} DH`;
 
  }

  
}


function showCart() {
  updateCartDisplay('PanierDivProdectsID'); // Pass the ID of your cart container
}

function deleteProd(button) {
  var parent = button.closest(".pro1");
  
  

 

  const id = parent.querySelector("#id_prod").textContent;

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
          
  // Get the product details from the deleted element (assuming it has an ID attribute)
  const productName = parent.querySelector('#nomProduit').textContent ;
 
  const productData = JSON.parse(localStorage.getItem("cartItems")) || [];
  const updatedData = productData.filter((product) => product.name !== productName);
  localStorage.setItem("cartItems", JSON.stringify(updatedData));
          parent.remove();  
          alert(data);
          total=0
         updateCartDisplay('PanierDivProdectsID');
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

function togglePanier1() {
  updateCartDisplay('PanierDivProdectsID');
  var panierDiv = document.getElementById("PanierDivParentID");
  if (panierDiv.style.display === "block" || panierDiv.style.display === "") {
      panierDiv.style.display = "none";
  } else {
      panierDiv.style.display = "block";
  }
}