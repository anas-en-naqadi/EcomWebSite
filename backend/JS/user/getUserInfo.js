window.onload = function () {
  nom = localStorage.getItem('user_name');

  if(nom){
  document.getElementById('LoginL').style.display = "none";
  document.getElementById('user').style.display = "block";
  document.getElementById('nom-user').textContent=nom;
  }
  getUserInfo("user");
  getUserInfo("addresse");
  showHistory();
  showAllAdresse("allAdresse");
};
function clearTable() {
  const tbody = document.getElementById("tbody");
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
}

function addAddresse() {
  const form = document.querySelector(".UserAdresse");
  const id = localStorage.getItem("id_user");
  let req = new XMLHttpRequest();
  req.open(
    "POST",
    "http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/UserInfo/fetchUserInfo.php"
  );

  req.onload = function () {
    if (req.status === 200 || req.readyState === 4) {
      const data = JSON.parse(req.response);
      console.log(data.status);
      alert("adresse inserted successfully");
    }
  };

  req.onerror = function (error) {
    console.error(error);
  };

  const formData = new FormData(form);
  formData.append("id_user", id);
  req.send(formData);
}
function getUserInfo(type) {
  var id = localStorage.getItem("id_user");

  let req = new XMLHttpRequest();
  req.open(
    "GET",
    `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/UserInfo/fetchUserInfo.php?id=${id}&type=${type}`
  );
  req.send();

  req.onload = function () {
    if (this.status == 200 || this.readyState === 4) {
      try {
        const data = JSON.parse(req.response);

        switch (type) {
          case "user":
            document.querySelector(".UserName").textContent =
              data[0].nom + " " + data[0].prenom;
            document.querySelector(".UserNom").textContent = data[0].nom;
            document.querySelector(".UserPrenom").textContent = data[0].prenom;
            document.querySelector(".UserEmail").textContent = data[0].email;
            document.querySelector(".UserPhone").textContent = data[0].phone;
            document.getElementById("UserNomInputID").value = data[0].nom;
            document.getElementById("UserPrenomInputID").value = data[0].prenom;
            document.getElementById("UserEmaiID").value = data[0].email;
            break;
          case "addresse":
            document.querySelector(".UserAddPay").textContent = data[0].pays;
            document.querySelector(".UserVillAdd").textContent = data[0].ville;
            document.querySelector(".UserAdd").textContent =
              data[0].address_line_1;
            document.querySelector(".UserCP").textContent = data[0].code_postal;
            break;

          case "allAdresse":
            const container = document.querySelector(".container");
            if (data) {
              console.log("hani tal2");
              for (let i = 0; i < data.length; i++) {
                const s0 = document.createElement("span");
                s0.className = "idAdd";
                s0.style.display = "none";

                const s1 = document.createElement("span");
                s1.className = "UserName";

                const s2 = document.createElement("span");
                s2.className = "AdresseUser";
                const s3 = document.createElement("span");
                s3.className = "UserVille";
                const s4 = document.createElement("span");
                s4.className = "UserRegion";
                const s5 = document.createElement("span");
                s5.className = "UserPhone";
                const inp = document.createElement("input");
                inp.type = "radio";
                inp.id = "AdresseRadioID";
                inp.name = "radioCheck";
                inp.onchange = function () {
                  ChangeBorderAdresse(this);
                };
                const div1 = document.createElement("div");
                div1.className = "UserAdresseDiv";
                const div2 = document.createElement("div");
                div2.className = "AllInfos";
                const div3 = document.createElement("div");
                div3.className = "UserInfos";
                const div6 = document.createElement("div");
                
                div6.className = "LocalisationIcon";
              
                s0.textContent = data[i].address_id;
                s4.textContent = data[i].province;
                s3.textContent = data[i].ville;
                s2.textContent = data[i].address_line_1 + "   ,   ";
                s1.textContent = data[i].nom + " " + data[i].prenom;
                s5.textContent = data[i].phone;
                div1.appendChild(s2);
                div1.appendChild(s3);
                div1.appendChild(s4);

                div3.appendChild(s1);
                div3.appendChild(div1);
                div3.appendChild(s5);
                const div4 = document.createElement("div");
                div4.className = "AdresseDiv";
                div2.appendChild(inp);
                div2.appendChild(div6);
                div2.appendChild(div3);
                div4.appendChild(div2);
                const button = document.createElement("button");
                button.className = "MfBtn";
                button.textContent = "SUPPRIMER";
                button.addEventListener("click", function () {
                  const parent = this.closest(".AdresseDiv");
                  const id_add =
                    parent.querySelector("span:nth-child(1)").textContent;
                  deleteAdd(id_add);
                });
                div4.appendChild(button);
                div4.appendChild(s0);
                container.appendChild(div4);
              }
            } else {
              alert("no addresse available");
            }

            break;

          default:
            throw "Erreur de chargement des informations";
        }

        hideSpinner();
      } catch (error) {
        console.log(error);
        hideSpinner();
      }
    }
  };
}

function updateUserInfo() {
  var id = localStorage.getItem("id_user");
  let req = new XMLHttpRequest();
  req.open(
    "PUT",
    `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/UserInfo/fetchUserInfo.php?id=${id}`
  );

  var data = {
    nom: document.getElementById("UserNomInputID").value,
    prenom: document.getElementById("UserPrenomInputID").value,
    email: document.getElementById("UserEmaiID").value,
  };

  if (document.getElementById("PassWordcheckboxID").checked) {
    if (
      document.getElementById("UserPassWordInputID2").value ===
      document.getElementById("UserPassWordInputID3").value
    ) {
      data.actPass = document.getElementById("UserPassWordInputID").value;
      data.newPass = document.getElementById("UserPassWordInputID2").value;
    } else {
      alert("Passwords don't match");
      return; // Exit function if passwords don't match
    }
  }

  req.setRequestHeader("Content-Type", "application/json");

  req.onload = function () {
    if (req.status === 200 || req.readyState === 4) {
      const rep = JSON.parse(req.response);
      if (rep.status == true) {
        alert("Successfully updated");
      } else {
        alert(rep.status);
      }
    } else {
      alert("Error updating data");
    }
  };

  req.onerror = function (error) {
    console.error(error);
  };

  req.send(JSON.stringify(data));

  getUserInfo();
}

function showHistory() {
  const id_user = localStorage.getItem("id_user");
  let req = new XMLHttpRequest();
  req.open(
    "GET",
    `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/UserInfo/historique.php?id=${id_user}`
  );
  req.send();

  req.onload = async function () {
    if (req.status === 200 || req.readyState === 4) {
      try {
        console.log(req.response)
        const data = await JSON.parse(req.response);
        if (data.length >= 1) {
          const container = document.getElementsByClassName("OrdTable")[0];

          for (let i = 0; i < data.length; i++) {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");

            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const td5 = document.createElement("td");
            const td6 = document.createElement("td");
            const td7 = document.createElement("td");
            const button = document.createElement("button");
            button.textContent = "Voir Details";
            button.addEventListener("click", function () {
              const parent = this.parentElement.parentElement;

              const id_user = localStorage.getItem("id_user");
              const id_cmd =
                parent.querySelector("td:nth-child(1)").textContent;
              clearTable();
              setOrderDetails("orderDetails", id_user, id_cmd);
              setOrderDetails("OrderProd", 0, id_cmd);
              showDetails();
            });
            button.className = "ViewOrderDetails";

            td7.appendChild(button);

            td1.textContent = i+1;

            td3.textContent = data[i].tracking_no;
            td4.textContent = data[i].total;
            td5.textContent = data[i].created_at;
            td6.textContent = data[i].status;

            tr.appendChild(td1);

            tr.appendChild(td3);

            tr.appendChild(td4);

            tr.appendChild(td5);

            tr.appendChild(td6);
            tr.appendChild(td7);

            container.appendChild(tr);
          }
        } else {
          document.getElementById("order-mess").textContent = data.status;
        }
      } catch (error) {
        console.error(error);
        console.log("error")
      }
    }
  };
}

function showAllAdresse(type) {
  var id = localStorage.getItem("id_user");

  let req = new XMLHttpRequest();
  req.open(
    "GET",
    `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/UserInfo/fetchUserInfo.php?id=${id}&type=${type}`
  );
  req.send();

  req.onload = function () {
    if (this.status == 200 || this.readyState === 4) {
      try {
        const data = JSON.parse(req.response);

        if (data.length >= 1) {
          const container = document.querySelector(".UserInfoo");
          for (let i = 0; i < data.length; i++) {
            // Create elements
            const div1 = document.createElement("div");
            div1.classList.add("UserAdresses");

            const innerDiv1 = document.createElement("div");
            const h4 = document.createElement("h4");
            h4.textContent = "Adresse de livraison " + (i + 1);
            innerDiv1.appendChild(h4);

            const button = document.createElement("button");
            button.textContent = "Supprimer";
            button.setAttribute("id", "m2");
            button.classList.add("mBtn");
            innerDiv1.appendChild(button);

            div1.appendChild(innerDiv1);

            const div2 = document.createElement("div");
            const span1 = document.createElement("span");
            span1.textContent = "Pays : ";
            const span2 = document.createElement("span");
            span2.classList.add("UserAddPay");
            span2.textContent = data[i].pays;

            div2.appendChild(span1);
            div2.appendChild(span2);
            div1.appendChild(div2);

            const div3 = document.createElement("div");
            const span3 = document.createElement("span");
            span3.textContent = "Ville : ";
            const span4 = document.createElement("span");
            span4.classList.add("UserVillAdd");
            span4.textContent = data[i].ville;
            div3.appendChild(span3);
            div3.appendChild(span4);
            div1.appendChild(div3);

            const div4 = document.createElement("div");
            const span5 = document.createElement("span");
            span5.textContent = "Adresse : ";
            const span6 = document.createElement("span");
            span6.classList.add("UserAdd");
            span6.textContent = data[i].address_line_1;

            div4.appendChild(span5);
            div4.appendChild(span6);
            div1.appendChild(div4);

            const div5 = document.createElement("div");
            const span7 = document.createElement("span");
            span7.textContent = "Code Postal : ";
            const span8 = document.createElement("span");
            span8.textContent = data[i].code_postal;
            span8.classList.add("UserCP");

            div5.appendChild(span7);
            div5.appendChild(span8);
            div1.appendChild(div5);

            // Append the created elements to the body or any other container
            container.appendChild(div1);
          }
        } else if (data.length === 1 && data[0].status === "no data found") {
          document.querySelector(".no-data").textContent = "no Addresse Found";
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
}

function prodDetails() {
  setOrderDetails("orderDetails", id_user, id_cmd);
}
function setOrderDetails(type, id_user, id_cmd) {
  let req = new XMLHttpRequest();
  let total = 0;
  req.open(
    "GET",
    `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/Admin/orderCheck.php?id=${id_user}&type=${type}&cmd=${id_cmd}`
  );

  req.onload = function () {
    if (req.status === 200 || req.readyState === 4) {
      const data = JSON.parse(req.response);

      if (data) {
        if (type == "orderDetails") {
          document.getElementsByName("UserName")[0].value =
            data[0].nom + " " + data[0].prenom;
          document.getElementById("UserEmailID").value = data[0].email;

          document.getElementsByName("UserPhone")[0].value = data[0].phone;
          document.getElementsByName("TrackingNo")[0].value =
            data[0].tracking_no;
          document.getElementsByName("UserVille")[0].value = data[0].ville;
          document.getElementsByName("UserAdresse")[0].value =
            data[0].address_line_1;
          document.getElementsByName("UserCP")[0].value = data[0].code_postal;
          document.getElementsByName("OrderDate")[0].value = data[0].created_at;
          document.getElementsByName("Payment")[0].value = data[0].methode_pay;
          document.getElementsByClassName("TotalPriceValue")[0].value =
            data[0].total;
          document.getElementById("status").value = data[0].status;
        } else if (type == "OrderProd") {
          const container = document.getElementById("tbody");
          for (let i = 0; i < data.length; i++) {
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let img = document.createElement("img");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            td1.className = "ProdectIMG";
            img.src = data[i].image;
            td1.appendChild(img);

            td2.className = "ProdectName";
            td2.textContent = data[i].nom_prod;
            td3.className = "ProdectPrice";
            td3.textContent = data[i].prix;
            td4.className = "ProdectQuantite";
            td4.textContent = data[i].qty;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            container.appendChild(tr);
            total = data[i].prix * data[i].qty + total;
          }

          document.querySelector(".TotalPriceValue").textContent = total;
        }
      } else {
        alert(data.status);
      }
    }
  };
  req.send();
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

function logout(){

  var conf = confirm("voules vous deconnecter de votre compte !!  ");
  if(conf){
  localStorage.clear();
  window.location.href="http://localhost/EcomWebSite-main2/Site%20Web%20Ecommerce/Frontend/Html/index.html"
  }
}