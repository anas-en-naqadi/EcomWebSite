

function IncrimentInput(stock){
   
    let x =parseInt( document.querySelector("#QantiteProduitID").value)
  if(x<=stock-1){
    if(stock >1  ){
    document.querySelector("#QantiteProduitID").value = ++x
    document.querySelector('.DecrementQ').disabled = false;
    }else{
        alert("Vous ne pouvez pas acheter plus de 1")
    }}else{
        alert("Vous ne pouvez pas acheter plus de "+stock)
    }
}
function DecrimentInput(stock){
    let x = parseInt(document.querySelector("#QantiteProduitID").value);
    if(x !=1){
    if(stock >1 ){
        
        document.querySelector("#QantiteProduitID").value = --x
        }else{
            alert("Vous ne pouvez pas acheter plus de 1")
        }}else{
          document.querySelector('.DecrementQ').disabled = true;
        }
}



function IncrimentInput1(elt){

  
  const parent = elt.closest('.pro1');
  console.log(parent)
   
    let x = parseInt(parent.querySelector("#QantiteProduitID").value)
   
   
  
   
    if(localStorage.getItem('id_user')){
      let id = parent.querySelector('span:nth-child(1)').textContent;
   
      let nom = parent.querySelectorAll('span')[1].textContent;
      parent.querySelector("#QantiteProduitID").value = ++x
      if(id && nom){
      changeQuantity(id,"plus",nom);
      }
      
    }else{
      parent.querySelector("#QantiteProduitID").value = ++x
    
    
     
    }
    
}
function DecrimentInput2(elt){
    const parent = elt.closest('.pro1');

    let x = parseInt(parent.querySelector("#QantiteProduitID").value)
   
    if(x >= 2){
  
    if(localStorage.getItem('id_user')){
      let id = parent.querySelector('span:nth-child(1)').textContent;
      parent.querySelector("#QantiteProduitID").value = --x
      let nom = parent.querySelectorAll('span')[1].textContent;
      if(id && nom){
        changeQuantity(id,"moins",nom);
        }
    
      
    }else{
      parent.querySelector("#QantiteProduitID").value = --x
    
    }
   

    }
 
}
function searchProd() {
    let search = document.getElementById("in1").value;
  if(search){
    let req = new XMLHttpRequest();
    let dropdown = document.getElementById("dropdown");
    dropdown.innerHTML = ""; // Clear previous dropdown items
  
    req.onreadystatechange = async function () {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          const data = JSON.parse(req.responseText);
  
          for (let i = 0; i < data.length && i < 5; i++) {
            const div = document.createElement("div");
            div.textContent = data[i].name; // Assuming data is an array of product names
            div.classList.add("dropdown-item"); // Apply a class for styling if needed
            div.addEventListener("click", function () {
              localStorage.setItem('search',data[i]);
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
        
            const div = document.createElement('div');
            div.className ="dropdown-item"
            div.textContent="No result Match This"
            dropdown.appendChild(div) // Hide dropdown if no data is available
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
  }else{
    dropdown.innerHTML='';
      dropdown.style.display = "none"; 
  
  }
  }