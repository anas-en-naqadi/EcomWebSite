function ShowForm() {
  document.getElementById("AjouterProduitFormeID").style.visibility = "visible";
}

function HideForm() {
  document.getElementById("AjouterProduitFormeID").style.visibility = "hidden";
}
function ShowLogInForm(){
  document.getElementById("OverLayID").style.display = 'block';
  document.getElementById("OverLayID2").style.display = 'none';
  document.body.style.overflowY = 'hidden';
}

function HideLoginForm(){
  document.getElementById('OverLayID').style.display = 'none';
  document.body.style.overflowY = 'scroll';

}
function HideSignInForm(){
  document.getElementById('OverLayID2').style.display = 'none';
  document.body.style.overflowY = 'scroll';
}
function ShowSignInForm(){
  document.getElementById('OverLayID').style.display = 'none';
  document.getElementById("OverLayID2").style.display = 'block';
  document.body.style.overflowY = 'hidden';

}
function ChangeInput(){
  const email = document.getElementById("EmailInp") ;
  const nom = document.getElementById("NomInp");
  const prenom = document.getElementById("PrenomInp");
  const pass = document.getElementById("PassInp");
  const Phone = document.getElementById("PhoneID")
  if(email.style.display == 'block'){
      if(email != '' && email.value.indexOf('@') != -1 && email.value.indexOf('.') != -1){
          document.getElementById("EmailInp").style.display = 'none'
          document.getElementById("PassInp").style.display = 'none'
          document.getElementById("PrenomInp").style.display = 'none'
          document.getElementById("NomInp").style.display = 'block'
          document.getElementById("Messg").style.display = "none";
          document.getElementById("Messg").innerText = "";
      }else{
          document.getElementById("Messg").innerText = "*Email non valide";
      }
  }
  else if(nom.style.display == 'block'){
      if(nom.value !=''){
          document.getElementById("EmailInp").style.display = 'none'
          document.getElementById("NomInp").style.display = 'none'
          document.getElementById("PrenomInp").style.display = 'block'
          document.getElementById("PassInp").style.display = 'none'
          document.getElementById("Messg").style.display = "none";
          document.getElementById("Messg").innerText = "";
      }else{
          document.getElementById("Messg").style.display = "block";
          document.getElementById("Messg").innerText = "*Nom non valid";
      }

  }
  else if(prenom.style.display == 'block'){
      if(prenom.value != ''){
          document.getElementById("EmailInp").style.display = 'none'
          document.getElementById("NomInp").style.display = 'none'
          document.getElementById("PrenomInp").style.display = 'none'
          document.getElementById("PassInp").style.display = 'none';
          document.getElementById("Messg").style.display = "none";
          document.getElementById("Messg").innerText = "";
          document.getElementById("PhoneID").style.display = 'block'
      }else{
          document.getElementById("Messg").innerText = "*Prenom non valid";
          document.getElementById("Messg").style.display = 'block'
      }


  }
  else if(Phone.style.display == 'block'){
      if(Phone.value != ''){
          document.getElementById("PhoneID").style.display = 'none'
          document.getElementById("EmailInp").style.display = 'none'
          document.getElementById("NomInp").style.display = 'none'
          document.getElementById("PrenomInp").style.display = 'none'
          document.getElementById("PassInp").style.display = 'block';
          document.getElementById("Messg").style.display = "none";
          document.getElementById("Messg").innerText = "";
      }
      else{
          document.getElementById("Messg").style.display = "block";
          document.getElementById("Messg").innerText = "*Numéro non valid";
      }
  }
  else if(pass.style.display == 'block'){

      if(pass.value != ''){
          document.getElementById("SubmitID").style.display = 'block'
          document.getElementById("NextID").style.display = 'none'
          document.getElementById("Messg").style.display = "none";
          document.getElementById("Messg").innerText = "";
      }
      else {
          document.getElementById("Messg").style.display = "block";
          document.getElementById("Messg").innerText = "*Mot de pass non valid";
      }
  }
}
function HideDetailsFormPhone() {
  document.getElementById("AjouterProduitDetailsPhone").style.visibility = "hidden";
}

function HideDetailsFormPC() {
  document.getElementById("AjouterProduitDetailsPC").style.visibility = "hidden";
}

document.getElementsByClassName('close')[0].addEventListener('click', function() {
  document.getElementById('myModal').style.display = 'none';
});



function ClosePanier(){
  document.getElementById("PanierDivParentID").style.visibility = "hidden"
}







function IncrementTotalPrice(currentTotal, productPrice, quantity) {
  return currentTotal + productPrice * quantity;
}
function DicrementTotalPrice(currentTotal, productPrice, quantity) {
  return  productPrice * quantity - currentTotal ;
}

function AddProdect() {
  document.getElementById("PanierDivParentID").style.visibility = "visible"


  var MainQantiteProduit = document.getElementById("MainQantiteProduitID")
  let ProdectContainer = document.getElementById("PanierDivProdectsID");
  var x = document.getElementsByClassName("isAlreadyAdded")

  const MainProdectImg = document.getElementById("ImgPanier").getAttribute("src");
  const MainProdectName = document.getElementById("ProdectNameID").innerText;
  const MainProdectMarque = document.getElementById("ProdectMarqueID").innerText;
  const MainProdectPrice = document.getElementById("ProdectPriceID").innerText;
  var price = Number(MainProdectPrice);

  if (x.length === 0) {
      let ul = document.createElement("ul");
      ul.classList.add("isAlreadyAdded")
      let li1 = document.createElement("li");
      let img = document.createElement("img");
      img.src = MainProdectImg;
      img.alt = "Prodect Img";
      img.classList.add("ProdectImg");
      li1.appendChild(img);

      let li2 = document.createElement("li");
      let ulNested = document.createElement("ul");
      ulNested.classList.add("u2");

      let pMarque = document.createElement("li");
      pMarque.classList.add("pMarque");
      pMarque.id = "pMarqueID";
      pMarque.textContent = "TELEVISION DE " + MainProdectMarque.toUpperCase();

      let pName = document.createElement("li");
      pName.classList.add("pName");
      pName.id = "pNameID";
      pName.textContent = MainProdectName;

      let pPrice = document.createElement("li");
      pPrice.classList.add("PanierProdectPrice");
      pPrice.id = "PanierProdectPriceID";
      pPrice.textContent = price.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

      let qDIV = document.createElement("div")
      qDIV.classList.add("qDIV");

      let qteLabel = document.createElement("label");
      qteLabel.textContent = "Qantité\u2009\u2009";

      let qteDiv = document.createElement("div");
      qteDiv.classList.add("InpCont");

      let decrementBtn = document.createElement("button");
      decrementBtn.classList.add("DecrementQ");
      decrementBtn.textContent = "-";
      decrementBtn.onclick = function() {
          DicrementInput(this);
      };

      var qteInput = document.createElement("input");
      qteInput.type = "number";
      qteInput.name = "QantiteProduit";
      qteInput.classList.add("QantiteProduit");
      qteInput.id = "QantiteProduitID";
      qteInput.value = MainQantiteProduit.value;
      qteInput.min = 0;
      qteInput.required = true;
      qteInput.readOnly = true;

      let incrementBtn = document.createElement("button");
      incrementBtn.classList.add("IncrimentQ");
      incrementBtn.textContent = "+";
      incrementBtn.onclick = function() {
          IncrementInput(this);
      };

      let li3 = document.createElement("li");
      let deleteBtn = document.createElement("button");
      deleteBtn.classList.add("DeleteProdect");

      qteDiv.appendChild(decrementBtn);
      qteDiv.appendChild(qteInput);
      qteDiv.appendChild(incrementBtn);
      qDIV.appendChild(qteLabel)
      qDIV.appendChild(qteDiv);


      li2.appendChild(ulNested);
      ulNested.appendChild(pMarque);
      ulNested.appendChild(pName);
      ulNested.appendChild(pPrice);
      ulNested.appendChild(document.createElement("li").appendChild(qDIV));

      li3.appendChild(deleteBtn);
      ul.appendChild(li1);
      ul.appendChild(li2);
      ul.appendChild(li3);
      ProdectContainer.appendChild(ul);
      ProdectContainer.appendChild(document.createElement("hr"));
      document.getElementById("PanierTotalPriceID").innerText = IncrementTotalPrice(TotalPrice, price, document.querySelector(".isAlreadyAdded .QantiteProduit").value ) + " DH"
  }
  else{  
      document.querySelector(".isAlreadyAdded .QantiteProduit").value =MainQantiteProduit.value
      document.getElementById("PanierTotalPriceID").innerText = IncrementTotalPrice(TotalPrice, price, document.querySelector(".isAlreadyAdded .QantiteProduit").value ) + " DH"
  }

}